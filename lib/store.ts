"use client";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { useEffect, useState } from "react";
import type { Level } from "./data";

interface Result { correct: number; total: number }

interface State {
  level: Level | null;
  interests: string[];
  goal: number;
  onboarded: boolean;
  xp: number;
  completed: Record<string, Result>;
  setLevel: (l: Level) => void;
  toggleInterest: (id: string) => void;
  setGoal: (g: number) => void;
  finishOnboarding: () => void;
  completeLesson: (id: string, r: Result) => void;
  reset: () => void;
}

const initial = { level: null, interests: [], goal: 10, onboarded: false, xp: 0, completed: {} };

export const useStore = create<State>()(
  persist(
    (set) => ({
      ...initial,
      setLevel: (level) => set({ level }),
      toggleInterest: (id) =>
        set((s) => ({
          interests: s.interests.includes(id) ? s.interests.filter((i) => i !== id) : [...s.interests, id],
        })),
      setGoal: (goal) => set({ goal }),
      finishOnboarding: () => set({ onboarded: true }),
      completeLesson: (id, r) =>
        set((s) => ({
          completed: { ...s.completed, [id]: r },
          xp: s.completed[id] ? s.xp : s.xp + 10 + r.correct * 5,
        })),
      reset: () => set(initial),
    }),
    { name: "asteria-store" }
  )
);

/** Persisted state only exists in the browser, so wait for it before rendering. */
export function useHydrated() {
  const [ready, setReady] = useState(false);
  useEffect(() => setReady(true), []);
  return ready;
}
