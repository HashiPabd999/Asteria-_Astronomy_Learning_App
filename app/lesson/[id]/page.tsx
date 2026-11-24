"use client";
import Link from "next/link";
import { notFound, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { PillButton, Progress } from "@/components/ui";
import AskAsteria from "@/components/AskAsteria";
import { getLesson, lessonsFor } from "@/lib/data";
import { useHydrated, useStore } from "@/lib/store";

export default function LessonPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const ready = useHydrated();
  const { onboarded, completeLesson, level } = useStore();
  const lesson = getLesson(params.id);

  const [i, setI] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [correct, setCorrect] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => { if (ready && !onboarded) router.replace("/"); }, [ready, onboarded, router]);
  if (!lesson) notFound();
  if (!ready) return null;

  const total = lesson.blocks.filter((b) => b.type === "checkpoint").length;
  const block = lesson.blocks[i];
  const siblings = lessonsFor(lesson.topic);
  const nextLesson = siblings[siblings.findIndex((l) => l.id === lesson.id) + 1];

  const advance = () => {
    setPicked(null);
    if (i + 1 < lesson.blocks.length) return setI(i + 1);
    completeLesson(lesson.id, { correct, total });
    setDone(true);
  };

  if (done) {
    return (
      <main className="mx-auto flex min-h-[calc(100dvh-3rem)] w-full max-w-md flex-col justify-center space-y-6 text-center">
        <h1 className="text-4xl font-semibold">Lesson complete</h1>
        <p className="text-mist">
          {total > 0 ? `You answered ${correct} of ${total} checks correctly.` : "Nice work."} You earned {10 + correct * 5} XP.
        </p>
        <div className="space-y-3">
          {nextLesson && <PillButton href={`/lesson/${nextLesson.id}`}>Next lesson</PillButton>}
          <Link href="/home" className="block text-sm text-mist hover:text-white">Back to home</Link>
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto flex min-h-[calc(100dvh-3rem)] w-full max-w-2xl flex-col">
      <div className="mb-8 space-y-3">
        <div className="flex items-center justify-between text-sm text-mist">
          <Link href={`/topic/${lesson.topic}`} className="hover:text-white">Exit</Link>
          <span>{lesson.title}</span>
        </div>
        <Progress value={(i / lesson.blocks.length) * 100} />
      </div>

      <div className="flex-1 space-y-4">
        {block.type === "text" && (<>
          {block.title && <h1 className="text-3xl font-semibold md:text-4xl">{block.title}</h1>}
          <p className="text-lg leading-relaxed text-white/85 md:text-xl">{block.body}</p>
        </>)}

        {block.type === "fact" && (
          <div className="rounded-3xl border border-violet/50 bg-violet/10 p-5">
            <p className="text-sm text-violet">Did you know?</p>
            <p className="mt-2 text-lg">{block.body}</p>
          </div>
        )}

        {block.type === "checkpoint" && (<>
          <p className="text-sm text-violet">Quick check</p>
          <h1 className="text-2xl font-semibold md:text-3xl">{block.question}</h1>
          <div className="space-y-3 pt-2">
            {block.options.map((o, idx) => {
              const answered = picked !== null;
              const right = idx === block.answer;
              const style = !answered ? "border-line bg-panel/70 hover:border-mist"
                : right ? "border-emerald-400 bg-emerald-400/10"
                : idx === picked ? "border-rose-400 bg-rose-400/10" : "border-line opacity-60";
              return (
                <button key={o} disabled={answered} className={`w-full rounded-2xl border p-4 text-left transition ${style}`}
                  onClick={() => { setPicked(idx); if (right) setCorrect((c) => c + 1); }}>
                  {o}
                </button>
              );
            })}
          </div>
          {picked !== null && (
            <p className="rounded-2xl bg-panel p-4 text-sm text-white/85">
              {picked === block.answer ? "Correct. " : "Not quite. "}{block.explanation}
            </p>
          )}
        </>)}
      </div>

      <div className="space-y-3 pt-6">
        {block.type === "checkpoint" && picked === null && (
          <button onClick={advance} className="w-full text-center text-sm text-mist hover:text-white">Skip this check</button>
        )}
        <PillButton onClick={advance} disabled={block.type === "checkpoint" && picked === null}>
          {i + 1 === lesson.blocks.length ? "Finish" : "Continue"}
        </PillButton>
      </div>
      <AskAsteria
        lesson={lesson.title}
        level={level ?? "beginner"}
        context={lesson.blocks.slice(0, i + 1).map((b) => (b.type === "text" ? `${b.title ?? ""}: ${b.body}` : b.type === "fact" ? b.body : "")).filter(Boolean).join("\n")}
      />
    </main>
  );
}
