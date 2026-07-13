"use client";

import { useState } from "react";
import type { TraderType } from "@/lib/trader-types";
import Modal from "./Modal";

type Scores = { discipline: number; aggression: number; patience: number };

// Discipline/Patience are framed as strengths (green). Aggression is the
// trait to watch. Mirrors app/components/onboarding/TraderTypeReveal.tsx.
function axisColor(axis: keyof Scores) {
  return axis === "aggression"
    ? { fill: "var(--bad)", glow: "rgba(239,68,68,0.5)" }
    : { fill: "var(--good)", glow: "rgba(34,197,94,0.5)" };
}

const AXES: [label: string, key: keyof Scores][] = [
  ["Discipline", "discipline"],
  ["Aggression", "aggression"],
  ["Patience", "patience"],
];

// TraderType.score is a classification function — it can't cross the
// server→client prop boundary (Next.js will throw at render time), so this
// component only accepts the serializable display fields.
type TraderTypeDisplay = Omit<TraderType, "score">;

export default function AssessmentSummary({
  traderType,
  scores,
}: {
  traderType: TraderTypeDisplay;
  scores: Scores;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="rounded-3xl backdrop-blur-xl p-7"
      style={{ border: "1px solid var(--line-soft)", background: "rgba(255,255,255,0.04)" }}
    >
      <p className="section-label mb-3" style={{ color: "var(--accent-light)" }}>
        Behavioural Assessment
      </p>
      <h2
        className="display mb-2 text-2xl md:text-3xl leading-tight"
        style={{
          background: "linear-gradient(135deg, var(--accent-light), #fff, var(--accent))",
          WebkitBackgroundClip: "text",
          backgroundClip: "text",
          color: "transparent",
        }}
      >
        You are {traderType.label}.
      </h2>
      <p className="mb-6 max-w-lg text-ink-soft leading-relaxed">{traderType.description}</p>

      <div className="mb-6 grid grid-cols-2 gap-3">
        <div className="rounded-xl p-4" style={{ background: "rgba(124,58,237,0.08)", border: "1px solid rgba(167,139,250,0.15)" }}>
          <p className="mb-1 text-xs text-ink-faint">Archetype</p>
          <p className="font-semibold text-white">{traderType.archetype}</p>
        </div>
        <div className="rounded-xl p-4" style={{ background: "rgba(124,58,237,0.08)", border: "1px solid rgba(167,139,250,0.15)" }}>
          <p className="mb-1 text-xs text-ink-faint">Typical win-rate</p>
          <p className="font-semibold text-white">{traderType.winRateRange}</p>
        </div>
      </div>

      <button type="button" onClick={() => setOpen(true)} className="btn-ghost inline-flex items-center px-5 py-2.5 text-sm">
        View Assessment
      </button>

      <Modal open={open} onClose={() => setOpen(false)} title="Trader Profile">
        <h3 className="display mb-4 text-xl text-white">{traderType.label}</h3>

        <div className="flex flex-col gap-3.5 mb-6">
          {AXES.map(([label, key]) => {
            const { fill, glow } = axisColor(key);
            const value = scores[key];
            return (
              <div key={key}>
                <div className="mb-1.5 flex justify-between text-sm">
                  <span className="text-ink-soft">{label}</span>
                  <span className="font-semibold text-white">{value}</span>
                </div>
                <div className="h-1.5 overflow-hidden rounded-full bg-white/[0.06]">
                  <div
                    className="h-full rounded-full"
                    style={{ width: `${value}%`, background: fill, boxShadow: `0 0 10px 1px ${glow}` }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-2 gap-5 mb-6">
          <div>
            <p className="section-label mb-2.5">Strengths</p>
            <ul className="flex flex-col gap-2">
              {traderType.strengths.map((s) => (
                <li key={s} className="flex items-start gap-2 text-sm text-ink-soft">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="mt-0.5 shrink-0" style={{ color: "var(--good)" }}>
                    <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  {s}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="section-label mb-2.5" style={{ color: "var(--info)" }}>
              Watch for
            </p>
            <ul className="flex flex-col gap-2">
              {traderType.watchOuts.map((w) => (
                <li key={w} className="flex items-start gap-2 text-sm text-ink-soft">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="mt-0.5 shrink-0" style={{ color: "var(--info)" }}>
                    <path
                      d="M12 9v4M12 17h.01M10.3 3.9L2.6 17.3a1.5 1.5 0 001.3 2.2h16.2a1.5 1.5 0 001.3-2.2L13.7 3.9a1.5 1.5 0 00-2.6 0z"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  {w}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="rounded-2xl p-5" style={{ border: "1px solid rgba(167,139,250,0.3)", background: "rgba(124,58,237,0.08)" }}>
          <p className="mb-1 text-sm font-medium text-white">Your edge, in one sentence</p>
          <p className="text-sm text-ink-soft">{traderType.edgeSentence}</p>
        </div>
      </Modal>
    </div>
  );
}
