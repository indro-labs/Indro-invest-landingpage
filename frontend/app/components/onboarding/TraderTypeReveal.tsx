"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const TOTAL_ANALYZING_MS = 2600;

function SparkleIcon() {
  return (
    <svg width="38" height="38" viewBox="0 0 24 24" fill="none">
      <path d="M12 3l1.6 5.4L19 10l-5.4 1.6L12 17l-1.6-5.4L5 10l5.4-1.6L12 3z" fill="white" />
      <circle cx="19" cy="5" r="1.4" fill="white" />
    </svg>
  );
}

function GlassCard({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`rounded-2xl backdrop-blur-xl ${className}`}
      style={{ border: "1px solid var(--line-soft)", background: "rgba(255,255,255,0.04)" }}
    >
      {children}
    </div>
  );
}

// Discipline/Patience are framed as strengths (green). Aggression is
// framed as the trait to watch in these archetypes (red).
function axisColor(axis: "discipline" | "aggression" | "patience") {
  return axis === "aggression"
    ? { fill: "var(--bad)", glow: "rgba(239,68,68,0.5)" }
    : { fill: "var(--good)", glow: "rgba(34,197,94,0.5)" };
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

function RadarPing({ delay }: { delay: number }) {
  return (
    <span
      className="absolute inset-0 rounded-full"
      style={{
        border: "1.5px solid rgba(167,139,250,0.5)",
        animation: `radarPing 2.4s ease-out ${delay}s infinite`,
      }}
    />
  );
}

export default function TraderTypeReveal({ profile }: { profile: ProfileData }) {
  const router = useRouter();
  const [phase, setPhase] = useState<"analyzing" | "revealed">("analyzing");

  useEffect(() => {
    const revealTimer = setTimeout(() => setPhase("revealed"), TOTAL_ANALYZING_MS);
    return () => clearTimeout(revealTimer);
  }, []);

  if (phase === "analyzing") {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center text-center">
        <style>{`
          @keyframes radarPing {
            0% { transform: scale(1); opacity: 0.7; }
            100% { transform: scale(2.6); opacity: 0; }
          }
          @keyframes coreBreathe {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.06); }
          }
        `}</style>
        <div className="relative mb-8 flex h-32 w-32 items-center justify-center">
          <div
            className="absolute inset-0 rounded-full"
            style={{
              background: "radial-gradient(circle, rgba(124,58,237,0.4) 0%, transparent 70%)",
              filter: "blur(16px)",
            }}
          />
          <RadarPing delay={0} />
          <RadarPing delay={0.9} />
          <RadarPing delay={1.8} />
          <div
            className="relative flex h-20 w-20 items-center justify-center rounded-full"
            style={{
              background: "linear-gradient(135deg, var(--accent), var(--accent-light))",
              boxShadow: "0 0 50px 10px rgba(124,58,237,0.55)",
              animation: "coreBreathe 2.4s ease-in-out infinite",
            }}
          >
            <SparkleIcon />
          </div>
        </div>
        <h1 className="display text-2xl text-white">Analyzing your profile</h1>
      </div>
    );
  }

  const { label, archetype, description, winRateRange, strengths, watchOuts, edgeSentence, scores } =
    profile;

  return (
    <div className="rise">
      <div className="relative text-center mb-8">
        <div
          className="pointer-events-none absolute left-1/2 top-1/2 h-[280px] w-[280px] -translate-x-1/2 -translate-y-1/2"
          style={{
            background: "radial-gradient(circle, rgba(124,58,237,0.35) 0%, transparent 70%)",
            filter: "blur(20px)",
          }}
        />
        <p className="relative text-ink-faint mb-1">You are</p>
        <h1
          className="display relative text-4xl md:text-5xl leading-tight mb-3"
          style={{
            background: "linear-gradient(135deg, var(--accent-light), #fff, var(--accent))",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            color: "transparent",
          }}
        >
          {label}
        </h1>
        <p className="relative text-ink-soft text-lg">{description}</p>
      </div>

      <GlassCard className="overflow-hidden mb-6">
        <div
          className="px-6 pt-6 pb-4"
          style={{ borderBottom: "1px solid var(--line-soft)" }}
        >
          <p className="section-label" style={{ color: "var(--accent-light)" }}>
            Trader Profile
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 px-6 pt-5">
          <div
            className="rounded-xl p-4"
            style={{ background: "rgba(124,58,237,0.08)", border: "1px solid rgba(167,139,250,0.15)" }}
          >
            <p className="text-xs text-ink-faint mb-1">Archetype</p>
            <p className="font-semibold text-white">{archetype}</p>
          </div>
          <div
            className="rounded-xl p-4"
            style={{ background: "rgba(124,58,237,0.08)", border: "1px solid rgba(167,139,250,0.15)" }}
          >
            <p className="text-xs text-ink-faint mb-1">Typical win-rate</p>
            <p className="font-semibold text-white">{winRateRange}</p>
          </div>
        </div>

        <div className="px-6 pt-6 flex flex-col gap-3.5">
          {(
            [
              ["Discipline", scores.discipline, "discipline"],
              ["Aggression", scores.aggression, "aggression"],
              ["Patience", scores.patience, "patience"],
            ] as const
          ).map(([name, value, axis]) => {
            const { fill, glow } = axisColor(axis);
            return (
              <div key={name}>
                <div className="flex justify-between text-sm mb-1.5">
                  <span className="text-ink-soft">{name}</span>
                  <span className="font-semibold text-white">{value}</span>
                </div>
                <div className="h-1.5 rounded-full bg-white/[0.06] overflow-hidden">
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: `${value}%`,
                      background: fill,
                      boxShadow: `0 0 10px 1px ${glow}`,
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-2 gap-6 px-6 py-6 mt-2">
          <div>
            <p className="section-label mb-2.5">Strengths</p>
            <ul className="flex flex-col gap-2">
              {strengths.map((s) => (
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
            <p className="section-label mb-2.5" style={{ color: "var(--info)" }}>Watch for</p>
            <ul className="flex flex-col gap-2">
              {watchOuts.map((w) => (
                <li key={w} className="flex items-start gap-2 text-sm text-ink-soft">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="mt-0.5 shrink-0" style={{ color: "var(--info)" }}>
                    <path d="M12 9v4M12 17h.01M10.3 3.9L2.6 17.3a1.5 1.5 0 001.3 2.2h16.2a1.5 1.5 0 001.3-2.2L13.7 3.9a1.5 1.5 0 00-2.6 0z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  {w}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </GlassCard>

      <div
        className="rounded-2xl p-5 mb-6"
        style={{ border: "1px solid rgba(167,139,250,0.3)", background: "rgba(124,58,237,0.08)" }}
      >
        <p className="text-sm font-medium text-white mb-1">Your edge, in one sentence</p>
        <p className="text-sm text-ink-soft">{edgeSentence}</p>
      </div>

      <div
        className="rounded-3xl p-7 mb-8"
        style={{
          border: "1px solid rgba(167,139,250,0.3)",
          background: "linear-gradient(160deg, rgba(124,58,237,0.16), rgba(124,58,237,0.03))",
        }}
      >
        <p className="text-white font-semibold mb-1">What&apos;s in your full report</p>
        <p className="text-sm text-ink-faint mb-4">
          Analyzed and made by traders who <strong className="text-ink-soft font-semibold">specialize in psychology</strong>.
        </p>
        <ul className="flex flex-col gap-3.5">
          {[
            "The trades that best reflect your trading psychology",
            "The situations where you're most likely to make impulsive decisions",
            "Your biggest strengths and recurring blind spots",
            "Clear rules to catch it before your next trade",
            "Clear, actionable feedback you can apply to your next trading session",
          ].map((item) => (
            <li key={item} className="flex items-start gap-3 text-sm text-ink-soft">
              <span
                className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full"
                style={{
                  background: "linear-gradient(135deg, var(--accent), var(--accent-light))",
                  boxShadow: "0 0 10px 1px rgba(167,139,250,0.5)",
                }}
              >
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none">
                  <path d="M5 13l4 4L19 7" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              {item}
            </li>
          ))}
        </ul>
      </div>

      <button
        type="button"
        onClick={() => router.push("/onboarding/sign-up")}
        className="btn-solid w-full inline-flex items-center justify-center gap-2 px-7 py-4 text-base"
        style={{ boxShadow: "0 20px 45px -18px rgba(124,58,237,0.7)" }}
      >
        Unlock my full report
        <span aria-hidden="true">→</span>
      </button>
    </div>
  );
}
