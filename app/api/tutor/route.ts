import { NextResponse } from "next/server";

// Runs on the server only, so your API key is never sent to the browser.
const MODEL = "claude-sonnet-5-5";

const SYSTEM = `You are Asteria, a friendly astronomy tutor inside a learning app.
- Explain simply, in 2 to 4 short sentences, unless the learner asks for more.
- Match the learner's level and use the lesson context you are given.
- Use everyday analogies. Never talk down to the learner.
- Only answer astronomy and space science questions. For anything else, say you can only help with astronomy.
- If you are not sure of a fact, say so instead of guessing.`;

type Msg = { role: "user" | "assistant"; content: string };

export async function POST(req: Request) {
  const key = process.env.ANTHROPIC_API_KEY;
  if (!key) return NextResponse.json({ error: "Missing ANTHROPIC_API_KEY on the server." }, { status: 500 });

  let body: { messages?: Msg[]; level?: string; lesson?: string; context?: string };
  try { body = await req.json(); } catch { return NextResponse.json({ error: "Bad request." }, { status: 400 }); }

  // Keep requests small and well-formed
  const messages = (body.messages ?? [])
    .filter((m) => (m.role === "user" || m.role === "assistant") && typeof m.content === "string")
    .slice(-10)
    .map((m) => ({ role: m.role, content: m.content.slice(0, 1000) }));
  if (messages.length === 0 || messages[messages.length - 1].role !== "user")
    return NextResponse.json({ error: "No question provided." }, { status: 400 });

  const system = `${SYSTEM}\n\nLearner level: ${String(body.level ?? "beginner").slice(0, 20)}.\nCurrent lesson: ${String(body.lesson ?? "").slice(0, 120)}.\nLesson text so far:\n${String(body.context ?? "").slice(0, 2500)}`;

  try {
    const res = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: { "content-type": "application/json", "x-api-key": key, "anthropic-version": "2023-06-01" },
      body: JSON.stringify({ model: MODEL, max_tokens: 400, system, messages }),
    });
    if (!res.ok) return NextResponse.json({ error: "The tutor is unavailable right now. Try again soon." }, { status: 502 });
    const data = await res.json();
    const reply = (data.content ?? []).map((c: { type: string; text?: string }) => (c.type === "text" ? c.text : "")).join("");
    return NextResponse.json({ reply });
  } catch {
    return NextResponse.json({ error: "Could not reach the tutor. Check your connection." }, { status: 502 });
  }
}
