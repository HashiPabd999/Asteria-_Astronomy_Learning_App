"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { GOALS, LEVELS, TOPICS } from "@/lib/data";
import { useStore } from "@/lib/store";
import { Option, PillButton, Progress } from "@/components/ui";

export default function Onboarding() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const { level, interests, goal, setLevel, toggleInterest, setGoal, finishOnboarding } = useStore();

  // Show topics at the chosen level first, but let people pick anything
  const order = { beginner: 0, intermediate: 1, expert: 2 } as const;
  const topics = [...TOPICS].sort(
    (a, b) => Math.abs(order[a.level] - order[level ?? "beginner"]) - Math.abs(order[b.level] - order[level ?? "beginner"])
  );

  const canContinue = step === 0 ? !!level : step === 1 ? interests.length > 0 : true;
  const next = () => {
    if (step < 2) return setStep(step + 1);
    finishOnboarding();
    router.push("/home");
  };

  return (
    <main className="mx-auto flex min-h-[calc(100dvh-3rem)] w-full max-w-2xl flex-col">
      <div className="mb-8 space-y-3">
        <Progress value={((step + 1) / 3) * 100} />
        {step > 0 && <button onClick={() => setStep(step - 1)} className="text-sm text-mist hover:text-white">Back</button>}
      </div>

      <div className="flex-1 space-y-3">
        {step === 0 && (<>
          <h1 className="text-3xl font-semibold md:text-4xl">How much do you know about space?</h1>
          <p className="pb-2 text-mist">We'll pick where you start. You can change this any time.</p>
          {LEVELS.map((l) => (
            <Option key={l.id} selected={level === l.id} onClick={() => setLevel(l.id)} title={l.title} desc={l.desc} />
          ))}
        </>)}

        {step === 1 && (<>
          <h1 className="text-3xl font-semibold">What do you want to learn?</h1>
          <p className="pb-2 text-mist">Pick one or more topics.</p>
          <div className="grid gap-3 md:grid-cols-2">
          {topics.map((t) => (
            <Option key={t.id} selected={interests.includes(t.id)} onClick={() => toggleInterest(t.id)} title={t.title} desc={t.blurb} />
          ))}
          </div>
        </>)}

        {step === 2 && (<>
          <h1 className="text-3xl font-semibold">How long each day?</h1>
          <p className="pb-2 text-mist">A small daily habit beats a long weekly session.</p>
          {GOALS.map((g) => (
            <Option key={g} selected={goal === g} onClick={() => setGoal(g)} title={`${g} minutes a day`} />
          ))}
        </>)}
      </div>

      <div className="pt-6">
        <PillButton onClick={next} disabled={!canContinue}>{step === 2 ? "Start learning" : "Continue"}</PillButton>
      </div>
    </main>
  );
}
