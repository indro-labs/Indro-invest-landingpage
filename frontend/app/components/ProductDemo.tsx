"use client";

import { useEffect, useRef, useState } from "react";

const POINTS = [
  { x: 28, y: 82 },
  { x: 112, y: 70 },
  { x: 196, y: 76 },
  { x: 280, y: 44 },
  { x: 364, y: 58 },
  { x: 448, y: 88 },
  { x: 532, y: 32 },
];

const INSIGHTS = [
  {
    date: "Apr 1",
    label: "Behavior baseline",
    text: "Performance is consistent but cautious. Emotional baseline is normal. No active biases detected.",
    conf: 62,
    rec: "Continue your current routine. No behavioral interventions needed at this stage.",
    tag: "Stable baseline",
    color: "var(--good)",
  },
  {
    date: "Apr 30",
    label: "Overconfidence spike",
    text: "Win rate jumped to 74% this week, but position sizing crept up 40% beyond plan. Classic overconfidence signal.",
    conf: 87,
    rec: "Enforce your max position size rule mechanically. Log your rationale before every size increase.",
    tag: "Overconfidence",
    color: "var(--info)",
  },
  {
    date: "May 28",
    label: "Reversion to mean",
    text: "Performance pulled back after the overconfidence phase. Hesitation entered your entries. You missed 4 valid setups.",
    conf: 78,
    rec: "Reframe missed setups as data. Use the checklist before every entry to bypass hesitation.",
    tag: "Fear of loss",
    color: "var(--bad)",
  },
  {
    date: "Jun 17",
    label: "Peak discipline",
    text: "Best behavioral stretch of the quarter. Risk adherence at 100%, execution scores above 90. You followed the process.",
    conf: 94,
    rec: "Document exactly what you did this week. These conditions are reproducible. Protect them.",
    tag: "Peak state",
    color: "var(--good)",
  },
  {
    date: "Jun 24",
    label: "Post-win complacency",
    text: "Two consecutive large wins preceded a 3-trade revenge sequence. Overconfidence, loss, revenge. The full pattern, in order.",
    conf: 91,
    rec: "Introduce a mandatory 5-minute cooldown after winning streaks before entering the next position.",
    tag: "Revenge trading",
    color: "var(--bad)",
  },
  {
    date: "Jun 28",
    label: "Rule violation cluster",
    text: "Three stop-loss violations in two days. Emotional override during drawdown is your most consistent failure mode.",
    conf: 89,
    rec: "Set hard stops at the broker level, not just mentally. Remove discretion from the exit decision entirely.",
    tag: "Rule violations",
    color: "var(--bad)",
  },
  {
    date: "Jul 3",
    label: "Behavioral recovery",
    text: "After applying the cooldown rule, behavior score reached its highest point this year. The intervention is working.",
    conf: 96,
    rec: "This is the result of deliberate practice. Keep the cooldown rule active and extend it to all streak conditions.",
    tag: "Positive trend",
    color: "var(--good)",
  },
];

const KPIS = [
  { label: "Consistency", value: "87", delta: "↑ +4pts", good: true },
  { label: "Emotional", value: "73", delta: "↓ −2pts", good: false },
  { label: "Risk Discip.", value: "91", delta: "↑ +7pts", good: true },
  { label: "Win Rate", value: "64%", delta: "↑ +3%", good: true },
  { label: "Avg R", value: "2.3R", delta: "↑ +0.4R", good: true },
];

const NAV_TABS = ["Dashboard", "Routines", "Patterns", "Psychology"] as const;

function linePoints(count: number) {
  return POINTS.slice(0, count)
    .map((p) => `${p.x},${p.y}`)
    .join(" ");
}

/* Types the insight out character by character, so the panel reads as
   the engine writing its analysis rather than a static card. */
function useTypewriter(text: string, speed = 14) {
  const [shown, setShown] = useState("");
  useEffect(() => {
    setShown("");
    let i = 0;
    const id = setInterval(() => {
      i += 1;
      setShown(text.slice(0, i));
      if (i >= text.length) clearInterval(id);
    }, speed);
    return () => clearInterval(id);
  }, [text, speed]);
  return { shown, doneTyping: shown.length >= text.length };
}

export default function ProductDemo() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (paused) return;
    timer.current = setInterval(() => {
      setActive((i) => (i + 1) % INSIGHTS.length);
    }, 4000);
    return () => {
      if (timer.current) clearInterval(timer.current);
    };
  }, [paused, active]);

  const insight = INSIGHTS[active];
  const { shown, doneTyping } = useTypewriter(insight.text);

  return (
    <div
      className="rounded-[20px] border border-line-soft bg-[#080908] p-4 shadow-[0_56px_100px_rgba(0,0,0,0.6)]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* browser chrome */}
      <div className="overflow-hidden rounded-t-[11px] border border-[#1c1e1b] bg-[#0e0f0e]">
        <div className="flex h-[38px] items-center gap-2 border-b border-[#1a1c19] bg-[#121412] px-4">
          <span className="h-3 w-3 rounded-full bg-[#2b2d2a]" />
          <span className="h-3 w-3 rounded-full bg-[#2b2d2a]" />
          <span className="h-3 w-3 rounded-full bg-[#2b2d2a]" />
          <div className="flex flex-1 items-center justify-center">
            <div className="inline-flex items-center gap-1.5 rounded-md bg-[#1a1c19] px-4 py-1">
              <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="#53544f" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
              <span className="text-[11px] text-[#53544f]">app.selnite.io/dashboard</span>
            </div>
          </div>
        </div>
        {/* dashboard */}
        <div className="flex flex-col bg-[#101110] font-sans md:flex-row">
          {/* sidebar (desktop only) */}
          <div className="hidden w-[58px] shrink-0 flex-col items-center gap-2 bg-[#0b0c0b] py-5 md:flex">
            <div className="mb-5 grid h-[26px] w-[26px] grid-cols-2 gap-[3px]">
              <div className="rounded-[2px] bg-[#a855f7]" />
              <div className="rounded-[2px] bg-[#a855f7]/30" />
              <div className="rounded-[2px] bg-[#a855f7]/30" />
              <div className="rounded-[2px] bg-[#a855f7]/15" />
            </div>
            <div className="h-9 w-9 rounded-lg bg-white/8" />
            <div className="h-9 w-9 rounded-lg" />
            <div className="h-9 w-9 rounded-lg" />
            <div className="h-9 w-9 rounded-lg" />
          </div>

          <div className="flex flex-1 flex-col overflow-hidden">
            {/* top nav */}
            <div className="flex h-[50px] shrink-0 items-center gap-2 overflow-x-auto border-b border-[#1a1c19] bg-[#121412] px-5 sm:gap-3.5 sm:px-7">
              <span className="mr-1 text-sm font-bold tracking-tight text-ink">Selnite</span>
              {NAV_TABS.map((tab) => (
                <span
                  key={tab}
                  className={`select-none rounded-md px-3 py-1 text-xs transition-colors ${
                    tab === "Dashboard"
                      ? "bg-[#ececea] font-medium text-[#111]"
                      : "text-ink-soft hover:bg-white/5 hover:text-ink"
                  }`}
                >
                  {tab}
                </span>
              ))}
            </div>

            {/* content */}
            <div className="flex flex-1 flex-col gap-4 overflow-hidden px-5 py-5 sm:px-7">
              <div>
                <p className="mb-1 text-[10px] uppercase tracking-wide text-ink-soft">
                  Thursday, July 3 · 2026 · Market opens in 32 min
                </p>
                <h3 className="mb-1 text-xl font-bold tracking-tight text-ink sm:text-2xl">
                  Good Morning, Alex.
                </h3>
                <div className="flex items-center gap-1.5">
                  <span className="h-3.5 w-[3px] rounded-sm bg-accent" />
                  <p className="text-xs text-[#c4c4c0]">
                    Today&apos;s focus: <strong>Maintain discipline over prediction.</strong> Pre-market routine 3/5.
                  </p>
                </div>
              </div>

              {/* KPI cards */}
              <div className="grid grid-cols-3 gap-2 sm:grid-cols-6">
                {KPIS.map((k) => (
                  <div key={k.label} className="rounded-[11px] border border-[#20221f] bg-[#161816] p-3">
                    <p className="mb-2 truncate text-[8px] uppercase tracking-wide text-ink-soft">
                      {k.label}
                    </p>
                    <p className="text-lg font-bold tracking-tight text-ink sm:text-[22px]">{k.value}</p>
                    <p
                      className="mt-0.5 text-[8px] font-semibold"
                      style={{ color: k.good ? "var(--good)" : "var(--bad)" }}
                    >
                      {k.delta}
                    </p>
                  </div>
                ))}
                <div className="rounded-[11px] bg-[#ececea] p-3">
                  <p className="mb-2 text-[8px] uppercase tracking-wide text-[#6b6b67]">Behavior</p>
                  <p className="text-lg font-bold tracking-tight text-[#111] sm:text-[22px]">A–</p>
                  <p className="mt-0.5 text-[8px] font-semibold text-[#4f7d5e]">↑ improving</p>
                </div>
              </div>

              {/* chart + insight */}
              <div className="grid flex-1 grid-cols-1 gap-3.5 lg:grid-cols-[1fr_300px]">
                {/* chart */}
                <div className="flex flex-col rounded-[13px] border border-[#20221f] bg-[#161816] p-4">
                  <div className="mb-1 flex items-start justify-between">
                    <div>
                      <p className="mb-0.5 text-xs font-semibold text-ink">Emotional Consistency</p>
                      <p className="text-[9px] text-ink-soft">Click any point to see the behavioral insight</p>
                    </div>
                    <span className="text-[9px] font-medium text-[#8a8a86]">{insight.date}</span>
                  </div>
                  <div className="relative min-h-[90px] flex-1">
                    <svg
                      viewBox="0 0 560 120"
                      preserveAspectRatio="none"
                      className="h-full w-full overflow-visible"
                    >
                      <defs>
                        <linearGradient id="demoAreaGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#a855f7" stopOpacity="0.13" />
                          <stop offset="100%" stopColor="#a855f7" stopOpacity="0" />
                        </linearGradient>
                      </defs>
                      <line x1="0" y1="24" x2="560" y2="24" stroke="#1e201d" strokeWidth="1" />
                      <line x1="0" y1="60" x2="560" y2="60" stroke="#1e201d" strokeWidth="1" />
                      <line x1="0" y1="96" x2="560" y2="96" stroke="#1e201d" strokeWidth="1" />
                      <polygon
                        points={`${linePoints(7)} 532,120 28,120`}
                        fill="url(#demoAreaGrad)"
                      />
                      <polyline
                        points={linePoints(7)}
                        fill="none"
                        stroke="#33352f"
                        strokeWidth="0.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <polyline
                        points={linePoints(active + 1)}
                        fill="none"
                        stroke="#a855f7"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        style={{ transition: "all 0.5s ease" }}
                      />
                      <line
                        x1={POINTS[active].x}
                        y1="0"
                        x2={POINTS[active].x}
                        y2="120"
                        stroke="#a855f7"
                        strokeWidth="1"
                        strokeDasharray="3,3"
                        opacity="0.3"
                      />
                    </svg>
                    {POINTS.map((p, i) => (
                      <button
                        key={i}
                        type="button"
                        aria-label={`Point ${i + 1}`}
                        onClick={() => setActive(i)}
                        className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer rounded-full border-2 border-[#161816] transition-all"
                        style={{
                          left: `${(p.x / 560) * 100}%`,
                          top: `${(p.y / 120) * 100}%`,
                          width: i === active ? 14 : 9,
                          height: i === active ? 14 : 9,
                          background:
                            i === active ? insight.color : i < active ? "#7c6bb5" : "#2a2c29",
                        }}
                      />
                    ))}
                  </div>
                  <div className="mt-1.5 flex justify-between">
                    <span className="text-[8px] text-ink-faint">Apr 1</span>
                    <span className="text-[8px] text-ink-faint">Apr 30</span>
                    <span className="text-[8px] text-ink-faint">May 28</span>
                    <span className="text-[8px] text-ink-faint">Jun 17</span>
                    <span className="text-[8px] text-ink-faint">Jun 24</span>
                    <span className="text-[8px] text-ink-faint">·</span>
                    <span className="text-[8px] font-semibold text-ink">Jul 3</span>
                  </div>
                </div>

                {/* insight panel */}
                <div className="flex flex-col rounded-[13px] border border-[#20221f] bg-[#0b0c0b] p-5">
                  <div className="mb-3.5 flex items-center gap-1.5">
                    <span
                      className="h-[5px] w-[5px] rounded-full"
                      style={{ background: insight.color }}
                    />
                    <span className="text-[9px] font-semibold uppercase tracking-wide text-[#63645f]">
                      Psychology Insight
                    </span>
                  </div>
                  <p className="mb-2 text-[9px] font-medium text-[#63645f]">
                    {insight.date} · {insight.label}
                  </p>
                  <p className="mb-3.5 min-h-[72px] text-xs font-semibold leading-relaxed text-white">
                    &ldquo;{shown}&rdquo;
                    {!doneTyping && <span className="caret ml-0.5" />}
                  </p>
                  <div className="mb-3 flex items-center gap-1.5">
                    <div className="h-[2.5px] flex-1 rounded-full bg-[#242622]">
                      <div
                        className="h-full rounded-full transition-all duration-700"
                        style={{
                          width: doneTyping ? `${insight.conf}%` : "0%",
                          background: insight.color,
                        }}
                      />
                    </div>
                    <span
                      className="whitespace-nowrap text-[10px] font-semibold transition-opacity duration-500"
                      style={{ color: insight.color, opacity: doneTyping ? 1 : 0.25 }}
                    >
                      {insight.conf}% confidence
                    </span>
                  </div>
                  <div
                    className="flex-1 rounded-md bg-[#141514] p-3 transition-opacity duration-500"
                    style={{ opacity: doneTyping ? 1 : 0.35 }}
                  >
                    <p className="mb-1 text-[8px] uppercase tracking-wide text-[#63645f]">
                      Recommendation
                    </p>
                    <p className="text-[10px] leading-relaxed text-[#a5a5a1]">{insight.rec}</p>
                  </div>
                  <div className="mt-2.5 flex items-center gap-1.5">
                    <span className="h-1 w-1 rounded-full" style={{ background: insight.color }} />
                    <span className="text-[9px] font-medium text-[#63645f]">Pattern: {insight.tag}</span>
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
