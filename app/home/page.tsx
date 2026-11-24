"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Nav from "@/components/Nav";
import { Progress } from "@/components/ui";
import { LESSONS, TOPICS, lessonsFor } from "@/lib/data";
import { useHydrated, useStore } from "@/lib/store";

export default function Home() {
  const router = useRouter();
  const ready = useHydrated();
  const { onboarded, level, interests, completed, xp, goal } = useStore();

  useEffect(() => { if (ready && !onboarded) router.replace("/"); }, [ready, onboarded, router]);
  if (!ready || !onboarded) return null;

  const mine = TOPICS.filter((t) => interests.includes(t.id));
  const others = TOPICS.filter((t) => !interests.includes(t.id));
  const pool = LESSONS.filter((l) => interests.includes(l.topic));
  const next = pool.find((l) => !completed[l.id]);

  const card = (t: (typeof TOPICS)[number]) => {
    const ls = lessonsFor(t.id);
    const done = ls.filter((l) => completed[l.id]).length;
    return (
      <Link key={t.id} href={`/topic/${t.id}`} className="block rounded-2xl border border-line bg-panel/70 p-4 transition hover:border-violet">
        <div className="flex items-baseline justify-between">
          <h3 className="font-semibold">{t.title}</h3>
          <span className="text-xs capitalize text-mist">{t.level}</span>
        </div>
        <p className="mb-3 mt-1 text-sm text-mist">{t.blurb}</p>
        <Progress value={(done / ls.length) * 100} />
      </Link>
    );
  };

  return (
    <main className="space-y-8 pb-10">
      <Nav />
      <section>
        <h1 className="text-3xl font-semibold md:text-5xl">Ready to look up?</h1>
        <p className="mt-1 text-mist">Starting at {level} level. Goal: {goal} minutes a day. {xp} XP so far.</p>
      </section>

      {next ? (
        <Link href={`/lesson/${next.id}`} className="block rounded-3xl border border-violet/50 bg-violet/10 p-5 md:max-w-xl md:p-6">
          <p className="text-sm text-violet">{Object.keys(completed).length ? "Continue where you left off" : "Your first lesson"}</p>
          <h2 className="mt-1 text-xl font-semibold">{next.title}</h2>
          <p className="mt-1 text-sm text-mist">{next.minutes} min read</p>
        </Link>
      ) : (
        <div className="rounded-3xl border border-line bg-panel/70 p-5">All lessons in your topics are done. Pick another topic below.</div>
      )}

      <section className="space-y-3">
        <h2 className="text-lg font-semibold">Your topics</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">{mine.map(card)}</div>
      </section>
      {others.length > 0 && (
        <section className="space-y-3">
          <h2 className="text-lg font-semibold">Explore more</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">{others.map(card)}</div>
        </section>
      )}
    </main>
  );
}
