"use client";
import Link from "next/link";
import { notFound, useRouter } from "next/navigation";
import { useEffect } from "react";
import Nav from "@/components/Nav";
import { getTopic, lessonsFor } from "@/lib/data";
import { useHydrated, useStore } from "@/lib/store";

export default function TopicPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const ready = useHydrated();
  const { onboarded, completed } = useStore();
  const topic = getTopic(params.id);

  useEffect(() => { if (ready && !onboarded) router.replace("/"); }, [ready, onboarded, router]);
  if (!topic) notFound();
  if (!ready) return null;

  const lessons = lessonsFor(topic.id);
  const currentIdx = lessons.findIndex((l) => !completed[l.id]);

  return (
    <main className="mx-auto w-full max-w-2xl space-y-6 pb-10">
      <Nav />
      <Link href="/home" className="text-sm text-mist hover:text-white">Back to topics</Link>
      <div>
        <h1 className="text-3xl font-semibold">{topic.title}</h1>
        <p className="mt-1 text-mist">{topic.blurb}</p>
      </div>

      <ol className="space-y-3">
        {lessons.map((l, i) => {
          const done = !!completed[l.id];
          const locked = currentIdx !== -1 && i > currentIdx;
          const body = (
            <div className={`flex items-center gap-4 rounded-2xl border p-4 ${
              done ? "border-line bg-panel/70" : locked ? "border-line opacity-50" : "border-violet bg-violet/10"
            }`}>
              <span className={`grid h-9 w-9 shrink-0 place-items-center rounded-full text-sm font-semibold ${
                done ? "bg-violet text-space" : "border border-mist text-mist"
              }`}>{done ? "✓" : locked ? "🔒" : i + 1}</span>
              <div>
                <div className="font-semibold">{l.title}</div>
                <div className="text-sm text-mist">
                  {l.minutes} min{done ? `, ${completed[l.id].correct}/${completed[l.id].total} correct` : ""}
                </div>
              </div>
            </div>
          );
          return <li key={l.id}>{locked ? body : <Link href={`/lesson/${l.id}`}>{body}</Link>}</li>;
        })}
      </ol>
    </main>
  );
}
