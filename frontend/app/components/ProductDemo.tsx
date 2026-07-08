"use client";

import { useEffect, useRef, useState } from "react";

const DATES = [
  { label: "Apr 30", x: 138, y: 123 },
  { label: "May 28", x: 246, y: 72 },
  { label: "Jun 17", x: 354, y: 102 },
  { label: "Jul 3", x: 570, y: 60 },
];

const INSIGHTS = [
  "Three stop-loss violations in two days. Emotional override during drawdown is your most consistent failure mode.",
  "Your Monday trades outperform your weekly average by 20%. Consistency matters.",
  "After two consecutive wins, your discipline drops 34%. Overconfidence is costing you.",
  "You're most likely to revenge trade within 30 minutes after a loss. Set a timer.",
];

const KPIS = [
  { label: "Consistency", value: "87", delta: "+4pts", up: true, rgb: "167,139,250" },
  { label: "Emotional", value: "73", delta: "−2pts", up: false, rgb: "167,139,250" },
  { label: "Risk Discip.", value: "91", delta: "+7pts", up: true, rgb: "99,102,241" },
  { label: "Win Rate", value: "64%", delta: "+3%", up: true, rgb: "34,197,94" },
  { label: "Avg R", value: "2.3R", delta: "+0.4R", up: true, rgb: "124,58,237" },
  { label: "Selnite Score", value: "84/100", delta: "+12pts", up: true, rgb: "240,239,244", labelOpacity: 0.5 },
];

const CHART_POINTS = "30,140 80,110 130,130 180,85 230,75 280,65 330,95 380,110 430,80 480,70 520,50 570,60";
const AXIS_LABELS = ["Apr 1", "Apr 30", "May 28", "Jun 17", "Jun 24", "Jul 3"];
const GREY_DOTS = [
  { label: "Apr 1", x: 30, y: 140 },
  { label: "Jun 24", x: 462, y: 74 },
];

export default function ProductDemo() {
  const [dateIndex, setDateIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState(INSIGHTS[0]);
  const [paused, setPaused] = useState(false);
  const typeTimer = useRef<ReturnType<typeof setInterval> | null>(null);

  const playInsight = (next: number) => {
    const text = INSIGHTS[next];
    setDateIndex(next);
    setDisplayedText("");
    if (typeTimer.current) clearInterval(typeTimer.current);
    let charIndex = 0;
    typeTimer.current = setInterval(() => {
      charIndex++;
      setDisplayedText(text.slice(0, charIndex));
      if (charIndex >= text.length && typeTimer.current) {
        clearInterval(typeTimer.current);
      }
    }, 50);
  };

  useEffect(() => {
    if (paused) return;
    const advance = setInterval(() => {
      setDateIndex((i) => {
        const next = (i + 1) % DATES.length;
        playInsight(next);
        return next;
      });
    }, 9000);
    return () => {
      clearInterval(advance);
      if (typeTimer.current) clearInterval(typeTimer.current);
    };
  }, [paused]);

  const dot = DATES[dateIndex];

  return (
    <div className="relative z-[2] rounded-2xl border border-white/10 bg-[#0b0b0b] p-3 shadow-[0_56px_100px_rgba(0,0,0,0.4)] sm:p-4">
      {/* mac window chrome */}
      <div className="overflow-hidden rounded-xl border border-white/10">
        <div className="flex h-10 items-center gap-2 border-b border-white/10 bg-[#111111] px-4">
          <span className="h-3 w-3 rounded-full bg-[#3a3a3a]" />
          <span className="h-3 w-3 rounded-full bg-[#3a3a3a]" />
          <span className="h-3 w-3 rounded-full bg-[#3a3a3a]" />
          <div className="flex flex-1 items-center justify-center">
            <div className="inline-flex items-center gap-1.5 rounded-md bg-white/10 px-4 py-1">
              <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="#666" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
              <span className="text-[11px] text-white/40">app.selnite.io/dashboard</span>
            </div>
          </div>
        </div>

        {/* scrollable dashboard content */}
        <div
          className="max-h-[560px] overflow-y-auto sm:max-h-[640px]"
          style={{ background: "linear-gradient(135deg, rgba(8,7,12,0.95) 0%, rgba(12,8,20,0.8) 100%)" }}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div className="p-6 sm:p-10">
            {/* header */}
            <div
              className="mb-10 flex items-start justify-between border-b pb-8"
              style={{ borderColor: "var(--line-soft)" }}
            >
              <div>
                <div className="mb-3 text-[15px] text-ink-faint">Thursday, July 3 · 2026</div>
                <h3 className="text-3xl font-bold text-white sm:text-[2.6rem]">Good Morning, Alex.</h3>
                <div className="mt-3 text-base text-ink-soft">
                  <span
                    className="border-l-[3px] pl-3 font-semibold"
                    style={{ color: "rgba(124,58,237,0.8)", borderColor: "rgba(124,58,237,0.8)" }}
                  >
                    Today&apos;s focus: Maintain discipline over prediction. Pre-market routine 3/5.
                  </span>
                </div>
              </div>
            </div>

            {/* KPI row */}
            <div className="mb-10 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
              {KPIS.map((k) => (
                <div
                  key={k.label}
                  className="rounded-xl border p-4 text-center sm:p-5"
                  style={{ background: `rgba(${k.rgb},0.08)`, borderColor: `rgba(${k.rgb},0.15)` }}
                >
                  <div
                    className="mb-2 truncate text-[12px] font-bold sm:text-sm"
                    style={{ color: `rgba(${k.rgb},${k.labelOpacity ?? 0.6})` }}
                  >
                    {k.label}
                  </div>
                  <div className="mb-1 text-2xl font-bold text-white sm:text-[2.4rem]">{k.value}</div>
                  <div className="text-sm" style={{ color: k.up ? "var(--good)" : "var(--bad)" }}>
                    {k.up ? "↑" : "↓"} {k.delta}
                  </div>
                </div>
              ))}
            </div>

            {/* chart + insight */}
            <div className="grid grid-cols-1 gap-5 lg:grid-cols-[2fr_1fr]">
              <div
                className="flex flex-col rounded-xl border p-6 sm:p-7"
                style={{ borderColor: "var(--line-soft)", background: "var(--bg-sunk)" }}
              >
                <div className="mb-5 flex items-center justify-between">
                  <h4 className="text-lg font-bold text-white sm:text-xl">Emotional Consistency</h4>
                  <span className="text-sm text-ink-faint">{dot.label}</span>
                </div>
                <div className="mb-4 text-sm text-ink-faint">Click any point to see the behavioral insight</div>
                <div className="relative mb-4 min-h-[200px] flex-1">
                  <svg className="h-full w-full overflow-visible" viewBox="0 0 600 240" preserveAspectRatio="none">
                    <defs>
                      <linearGradient id="chartGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="rgba(124,58,237,0.25)" />
                        <stop offset="100%" stopColor="rgba(124,58,237,0.01)" />
                      </linearGradient>
                    </defs>
                    <line x1="0" y1="60" x2="600" y2="60" stroke="rgba(255,255,255,0.05)" />
                    <line x1="0" y1="120" x2="600" y2="120" stroke="rgba(255,255,255,0.05)" />
                    <line x1="0" y1="180" x2="600" y2="180" stroke="rgba(255,255,255,0.05)" />
                    <polyline
                      points={CHART_POINTS}
                      fill="none"
                      stroke="rgba(124,58,237,0.8)"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <polygon points={`${CHART_POINTS} 570,240 30,240`} fill="url(#chartGrad)" />
                    {GREY_DOTS.map((d) => (
                      <circle key={d.label} cx={d.x} cy={d.y} r="5" fill="#4a4a52" stroke="#050505" strokeWidth="2" />
                    ))}
                    {DATES.map((d, i) => (
                      <circle
                        key={d.label}
                        cx={d.x}
                        cy={d.y}
                        r={i === dateIndex ? 7 : 5}
                        fill={i === dateIndex ? "rgba(124,58,237,0.9)" : "#4a4a52"}
                        stroke="#050505"
                        strokeWidth="2"
                        className="cursor-pointer transition-all duration-300"
                        onClick={() => playInsight(i)}
                      />
                    ))}
                  </svg>
                </div>
                <div className="flex justify-between text-[13px] text-ink-ghost">
                  {AXIS_LABELS.map((l) => (
                    <span key={l}>{l}</span>
                  ))}
                </div>
              </div>

              <div
                className="flex flex-col rounded-xl border p-6 sm:p-7"
                style={{ borderColor: "var(--accent-line)", background: "var(--accent-soft)" }}
              >
                <div className="mb-5 flex items-center gap-2.5">
                  <div className="h-2.5 w-2.5 rounded-full" style={{ background: "rgba(124,58,237,0.9)" }} />
                  <span className="section-label" style={{ color: "rgba(124,58,237,0.6)" }}>
                    Psychology Insight
                  </span>
                </div>
                <h4 className="mb-5 min-h-[88px] text-xl font-bold leading-snug text-white sm:text-[1.4rem]">
                  &ldquo;{displayedText}&rdquo;
                </h4>
                <div
                  className="mb-3.5 h-1.5 rounded-full"
                  style={{
                    background:
                      "linear-gradient(to right, rgba(124,58,237,0.8), rgba(124,58,237,0.8) 89%, rgba(255,255,255,0.1) 89%)",
                  }}
                />
                <div className="mb-6 text-base font-semibold" style={{ color: "rgba(124,58,237,0.9)" }}>
                  89% confidence
                </div>
                <div className="flex flex-1 flex-col border-t pt-5" style={{ borderColor: "var(--line-soft)" }}>
                  <div className="mb-2.5 text-xs font-bold text-ink-faint">RECOMMENDATION</div>
                  <p className="mb-4 flex-shrink-0 text-base leading-relaxed text-ink-soft">
                    Set hard stops at the broker level, not just mentally. Remove discretion from the exit decision
                    entirely.
                  </p>
                  <div className="mt-auto flex items-center gap-2 text-sm text-ink-soft">
                    <span style={{ color: "rgba(124,58,237,0.8)" }}>●</span>
                    <span>Pattern: Rule violations</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
