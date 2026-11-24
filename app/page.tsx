"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Chip, Logo, PillButton } from "@/components/ui";
import { useHydrated, useStore } from "@/lib/store";

function Orbits() {
  return (
    <svg viewBox="0 0 400 400" className="w-full max-w-md" aria-hidden="true">
      <g fill="none" stroke="#23264a" strokeWidth="1.5">
        <circle cx="200" cy="200" r="70" />
        <circle cx="200" cy="200" r="115" />
        <circle cx="200" cy="200" r="160" />
        <circle cx="200" cy="200" r="195" strokeDasharray="3 7" />
      </g>
      <circle cx="200" cy="200" r="22" fill="#a99bff" />
      <circle cx="200" cy="200" r="34" fill="#a99bff" opacity="0.15" />
      <circle cx="270" cy="200" r="7" fill="#fff" />
      <circle cx="108" cy="148" r="10" fill="#cfc8ff" />
      <circle cx="285" cy="318" r="8" fill="#ffd9e6" />
      <circle cx="42" cy="236" r="5" fill="#fff" />
    </svg>
  );
}

export default function Welcome() {
  const router = useRouter();
  const ready = useHydrated();
  const onboarded = useStore((s) => s.onboarded);

  useEffect(() => { if (ready && onboarded) router.replace("/home"); }, [ready, onboarded, router]);

  return (
    <main className="flex min-h-[calc(100dvh-3rem)] flex-col md:min-h-[calc(100dvh-4rem)]">
      <Logo />
      <div className="flex flex-1 flex-col justify-between gap-10 py-8 lg:grid lg:grid-cols-2 lg:items-center lg:justify-normal lg:gap-16">
        <section className="space-y-5 lg:space-y-6">
          <Chip>Your universe awaits</Chip>
          <h1 className="text-5xl font-semibold leading-[1.05] tracking-tight md:text-7xl">
            Go beyond <br /><span className="text-violet">the familiar.</span>
          </h1>
          <p className="max-w-sm text-mist md:max-w-md md:text-lg">
            Chart distant worlds, follow celestial events, and make the night sky yours to explore.
          </p>
          <div className="hidden max-w-sm space-y-4 pt-4 lg:block">
            <PillButton href="/onboarding">Begin exploration</PillButton>
            <p className="text-center text-sm text-mist">
              Already an explorer? <Link href="/onboarding" className="font-semibold text-white underline-offset-4 hover:underline">Sign in</Link>
            </p>
          </div>
        </section>

        <div className="hidden justify-center lg:flex"><Orbits /></div>

        <section className="space-y-4 md:mx-auto md:w-full md:max-w-sm lg:hidden">
          <PillButton href="/onboarding">Begin exploration</PillButton>
          <p className="text-center text-sm text-mist">
            Already an explorer? <Link href="/onboarding" className="font-semibold text-white underline-offset-4 hover:underline">Sign in</Link>
          </p>
        </section>
      </div>
    </main>
  );
}
