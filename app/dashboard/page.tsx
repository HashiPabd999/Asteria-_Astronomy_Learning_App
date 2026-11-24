"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Nav from "@/components/Nav";
import { Progress } from "@/components/ui";
import { LESSONS, TOPICS, lessonsFor } from "@/lib/data";
import { useHydrated, useStore } from "@/lib/store";

export default function Dashboard() {
  const router = useRouter();
  const ready = useHydrated();
  const { onboarded, completed, xp, level, goal, reset } = useStore();

  useEffect(() => { if (ready && !onboarded) router.replace("/"); }, [ready, onboarded, router]);
  if (!ready || !onboarded) return null;

  const results = Object.values(completed);
  const doneCount = results.length;
  const pct = (doneCount / LESSONS.length) * 100;
  const right = results.reduce((a, r) => a + r.correct, 0);
  const asked = results.reduce((a, r) => a + r.total, 0);
  const accuracy = asked ? Math.round((right / asked) * 100) : 0;

  const R = 54, C = 2 * Math.PI * R;

  return (
    <main className="space-y-8 pb-10">
      <Nav />
      <h1 className="text-3xl font-semibold md:text-5xl">Your progress</h1>

      <div className="grid gap-8 lg:grid-cols-2 lg:items-start">
      <section className="flex items-center gap-6 rounded-3xl border border-line bg-panel/70 p-5">
        <svg width="128" height="128" viewBox="0 0 128 128" role="img" aria-label={`${Math.round(pct)} percent of lessons complete`}>
          <circle cx="64" cy="64" r={R} fill="none" stroke="#23264a" strokeWidth="10" />
          <circle cx="64" cy="64" r={R} fill="none" stroke="#a99bff" strokeWidth="10" strokeLinecap="round"
            strokeDasharray={C} strokeDashoffset={C - (C * pct) / 100} transform="rotate(-90 64 64)" />
          <text x="64" y="72" textAnchor="middle" fill="#fff" fontSize="24" fontWeight="600">{Math.round(pct)}%</text>
        </svg>
        <div className="space-y-1 text-sm">
          <p><span className="text-xl font-semibold">{doneCount}</span> of {LESSONS.length} lessons</p>
          <p><span className="text-xl font-semibold">{xp}</span> XP</p>
          <p><span className="text-xl font-semibold">{accuracy}%</span> check accuracy</p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold">By topic</h2>
        {TOPICS.map((t) => {
          const ls = lessonsFor(t.id);
          const d = ls.filter((l) => completed[l.id]).length;
          return (
            <div key={t.id} className="space-y-2">
              <div className="flex justify-between text-sm"><span>{t.title}</span><span className="text-mist">{d}/{ls.length}</span></div>
              <Progress value={(d / ls.length) * 100} />
            </div>
          );
        })}
      </section>

      </div>

      <section className="rounded-2xl border border-line p-4 text-sm text-mist lg:max-w-xl">
        <p>Level: <span className="capitalize text-white">{level}</span>. Daily goal: <span className="text-white">{goal} min</span>.</p>
        <button onClick={() => { reset(); router.replace("/"); }} className="mt-3 text-rose-300 hover:underline">
          Reset all progress and settings
        </button>
      </section>
    </main>
  );
}
