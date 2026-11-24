"use client";
import { useState } from "react";

type Msg = { role: "user" | "assistant"; content: string };

export default function AskAsteria({ lesson, context, level }: { lesson: string; context: string; level: string }) {
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function send() {
    const q = input.trim();
    if (!q || loading) return;
    const next: Msg[] = [...msgs, { role: "user", content: q }];
    setMsgs(next); setInput(""); setError(""); setLoading(true);
    try {
      const res = await fetch("/api/tutor", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ messages: next, lesson, context, level }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Something went wrong.");
      setMsgs([...next, { role: "assistant", content: data.reply }]);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed bottom-4 right-4 z-10 w-[calc(100%-2rem)] max-w-sm">
      {open && (
        <div className="mb-3 flex max-h-[60dvh] flex-col rounded-3xl border border-line bg-panel shadow-xl">
          <div className="flex items-center justify-between border-b border-line px-4 py-3">
            <span className="font-semibold">Ask Asteria</span>
            <button onClick={() => setOpen(false)} className="text-sm text-mist hover:text-white">Close</button>
          </div>
          <div className="flex-1 space-y-3 overflow-y-auto p-4 text-sm" aria-live="polite">
            {msgs.length === 0 && <p className="text-mist">Stuck on something in this lesson? Ask me anything about it.</p>}
            {msgs.map((m, i) => (
              <p key={i} className={m.role === "user" ? "ml-8 rounded-2xl bg-violet/15 p-3" : "mr-8 rounded-2xl bg-white/5 p-3"}>{m.content}</p>
            ))}
            {loading && <p className="text-mist">Thinking...</p>}
            {error && <p className="text-rose-300">{error}</p>}
          </div>
          <div className="flex gap-2 border-t border-line p-3">
            <input value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && send()}
              placeholder="Ask a question" maxLength={300} aria-label="Your question"
              className="min-w-0 flex-1 rounded-full border border-line bg-space px-4 py-2 text-sm outline-none focus:border-violet" />
            <button onClick={send} disabled={loading || !input.trim()}
              className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-space disabled:opacity-40">Send</button>
          </div>
        </div>
      )}
      <div className="flex justify-end">
        <button onClick={() => setOpen(!open)} className="rounded-full bg-violet px-5 py-3 text-sm font-semibold text-space shadow-lg hover:bg-white">
          {open ? "Hide tutor" : "Ask Asteria"}
        </button>
      </div>
    </div>
  );
}
