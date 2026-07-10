"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const ANALYZING_STEPS = [
  "Mapping your trading style…",
  "Cross-referencing your answers…",
  "Identifying your edge…",
  "Building your snapshot…",
];

const STEP_INTERVAL_MS = 750;

function SparkleIcon() {
  return (
    <svg width="30" height="30" viewBox="0 0 24 24" fill="none">
      <path
        d="M12 3l1.6 5.4L19 10l-5.4 1.6L12 17l-1.6-5.4L5 10l5.4-1.6L12 3z"
        fill="white"
      />
      <circle cx="19" cy="5" r="1.4" fill="white" />
    </svg>
  );
}

function CheckIcon({ done }: { done: boolean }) {
  return (
    <span
      className="flex h-5 w-5 items-center justify-center rounded-full border shrink-0"
      style={{
        borderColor: done ? "var(--accent)" : "var(--line)",
        color: "var(--accent-light)",
      }}
    >
      {done && (
        <svg width="11" height="11" viewBox="0 0 24 24" fill="none">
          <path
            d="M5 13l4 4L19 7"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )}
    </span>
  );
}

export type ProfileData = {
  label: string;
  archetype: string;
  description: string;
  winRateRange: string;
  strengths: string[];
  watchOuts: string[];
  edgeSentence: string;
  scores: { discipline: number; aggression: number; patience: number };
};

export default function TraderTypeReveal({ profile }: { profile: ProfileData }) {
  const router = useRouter();
  const [phase, setPhase] = useState<"analyzing" | "revealed">("analyzing");
  const [doneCount, setDoneCount] = useState(0);

  useEffect(() => {
    const stepTimer = setInterval(() => {
      setDoneCount((n) => Math.min(n + 1, ANALYZING_STEPS.length));
    }, STEP_INTERVAL_MS);
    const revealTimer = setTimeout(
      () => setPhase("revealed"),
      STEP_INTERVAL_MS * (ANALYZING_STEPS.length + 1)
    );
    return () => {
      clearInterval(stepTimer);
      clearTimeout(revealTimer);
    };
  }, []);

  if (phase === "analyzing") {
    return (
      <div className="flex flex-col items-center text-center py-16">
        <div
          className="glow-pulse mb-7 flex h-16 w-16 items-center justify-center rounded-full"
          style={{
            background: "linear-gradient(135deg, var(--accent), var(--accent-light))",
            boxShadow: "0 0 32px 4px var(--accent-line)",
          }}
        >
          <SparkleIcon />
        </div>
        <h1 className="display text-2xl md:text-3xl mb-7">Analyzing your profile</h1>
        <div className="w-full max-w-sm flex flex-col gap-2.5">
          {ANALYZING_STEPS.map((step, i) => (
            <div
              key={step}
              className="rise flex items-center gap-3 rounded-xl border px-4 py-3 text-sm"
              style={{
                borderColor: "var(--line)",
                color: i < doneCount ? "var(--ink)" : "var(--ink-faint)",
              }}
            >
              <CheckIcon done={i < doneCount} />
              {step}
            </div>
          ))}
        </div>
      </div>
    );
  }

  const { label, archetype, description, winRateRange, strengths, watchOuts, edgeSentence, scores } =
    profile;

  return (
    <div className="rise">
      <div className="flex justify-center mb-5">
        <span className="section-label rounded-full border border-line px-3 py-1.5 inline-flex items-center gap-1.5">
          ✨ Your results are ready
        </span>
      </div>

      <div className="text-center mb-8">
        <p className="text-ink-faint mb-1">You are…</p>
        <h1
          className="display text-4xl md:text-5xl leading-tight mb-3"
          style={{
            background: "linear-gradient(135deg, var(--accent-light), var(--accent))",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            color: "transparent",
          }}
        >
          {label}
        </h1>
        <p className="text-ink-soft text-lg">{description}</p>
      </div>

      <div
        className="rounded-3xl surface overflow-hidden mb-6"
        style={{ boxShadow: "var(--shadow)" }}
      >
        <p className="section-label px-6 md:px-7 pt-6">Your Trader Profile · Preview</p>

        <div className="grid grid-cols-2 gap-4 px-6 md:px-7 pt-5">
          <div className="rounded-2xl bg-bg-sunk p-4">
            <p className="text-xs text-ink-faint mb-1">Archetype</p>
            <p className="font-semibold">{archetype}</p>
          </div>
          <div className="rounded-2xl bg-bg-sunk p-4">
            <p className="text-xs text-ink-faint mb-1">Typical win-rate range</p>
            <p className="font-semibold">{winRateRange}</p>
          </div>
        </div>

        <div className="px-6 md:px-7 pt-6 flex flex-col gap-4">
          {(
            [
              ["Discipline", scores.discipline],
              ["Aggression", scores.aggression],
              ["Patience", scores.patience],
            ] as const
          ).map(([name, value]) => (
            <div key={name}>
              <div className="flex justify-between text-sm mb-1.5">
                <span className="text-ink-soft">{name}</span>
                <span className="text-ink-faint">{value}</span>
              </div>
              <div className="h-1.5 rounded-full bg-bg-sunk overflow-hidden">
                <div
                  className="h-full rounded-full"
                  style={{
                    width: `${value}%`,
                    background: "linear-gradient(90deg, var(--accent), var(--accent-light))",
                  }}
                />
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 px-6 md:px-7 py-7">
          <div>
            <p className="section-label mb-3">Strengths</p>
            <ul className="flex flex-col gap-2">
              {strengths.map((s) => (
                <li key={s} className="flex items-start gap-2 text-sm text-ink-soft">
                  <span style={{ color: "var(--good)" }} aria-hidden="true">✓</span>
                  {s}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="section-label mb-3" style={{ color: "var(--info)" }}>
              Watch-outs
            </p>
            <ul className="flex flex-col gap-2">
              {watchOuts.map((w) => (
                <li key={w} className="flex items-start gap-2 text-sm text-ink-soft">
                  <span style={{ color: "var(--info)" }} aria-hidden="true">•</span>
                  {w}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div
        className="rounded-3xl border border-line-soft p-6 md:p-7 text-center mb-6"
        style={{ background: "var(--bg-sunk)" }}
      >
        <p className="text-ink font-medium mb-1">Your full playbook is locked</p>
        <p className="text-sm text-ink-faint max-w-sm mx-auto">
          Upload your trade history to unlock the specific trades behind this
          pattern and the rule that catches it next time.
        </p>
      </div>

      <div
        className="rounded-2xl border p-5 mb-8"
        style={{ borderColor: "var(--accent-line)", background: "var(--accent-soft)" }}
      >
        <p className="text-sm font-medium text-ink mb-1">Your edge, in one sentence</p>
        <p className="text-sm text-ink-soft">{edgeSentence}</p>
      </div>

      <button
        type="button"
        onClick={() => router.push("/onboarding/upload")}
        className="btn-solid w-full inline-flex items-center justify-center gap-2 px-7 py-4 text-base"
      >
        Unlock my full playbook
        <span aria-hidden="true">→</span>
      </button>
    </div>
  );
}
