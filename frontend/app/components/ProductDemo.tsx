"use client";

import { useEffect, useRef, useState } from "react";

const DATES = [
  { label: "Apr 30", x: 138, y: 123 },
  { label: "May 28", x: 246, y: 72 },
  { label: "Jun 17", x: 354, y: 102 },
  { label: "Jul 3", x: 570, y: 60 },
];

const INSIGHTS = [
  { type: "Behavior baseline", text: "Performance is consistent but cautious. Emotional baseline is normal. No active biases detected.", confidence: 62, rec: "Continue your current routine. No behavioral corrections needed right now." },
  { type: "Risk pattern", text: "Three stop-loss violations in two days. Emotional override during drawdown is your most consistent failure mode.", confidence: 89, rec: "Set hard stops at the broker level, not just mentally. Remove discretion from the exit decision entirely." },
  { type: "Consistency signal", text: "Your Monday trades outperform your weekly average by 20%. Consistency matters.", confidence: 74, rec: "Weight Monday setups slightly heavier when sizing. The edge is real, not noise." },
  { type: "Overconfidence flag", text: "After two consecutive wins, your discipline drops 34%. Overconfidence is costing you.", confidence: 91, rec: "Introduce a mandatory 5-minute cooldown after winning streaks before entering the next position." },
];

const KPIS = [
  { label: "Consistency", value: "87", delta: "+4pts", up: true },
  { label: "Emotional", value: "73", delta: "−2pts", up: false },
  { label: "Risk Discip.", value: "91", delta: "+7pts", up: true },
  { label: "Win Rate", value: "64%", delta: "+3%", up: true },
  { label: "Avg R", value: "2.3R", delta: "+0.4R", up: true },
];

const NAV_TABS = ["Dashboard", "Routines", "Patterns", "Psychology"];

const CHART_POINTS = "30,140 80,110 130,130 180,85 230,75 280,65 330,95 380,110 430,80 480,70 520,50 570,60";
const AXIS_LABELS = ["Apr 1", "Apr 30", "May 28", "Jun 17", "Jun 24", "Jul 3"];
const GREY_DOTS = [
  { label: "Apr 1", x: 30, y: 140 },
  { label: "Jun 24", x: 462, y: 74 },
];

function SidebarMark() {
  return (
    <div className="grid grid-cols-2 gap-1">
      <span className="h-2 w-2 rounded-[2px]" style={{ background: "rgba(124,58,237,0.9)" }} />
      <span className="h-2 w-2 rounded-[2px]" style={{ background: "rgba(124,58,237,0.6)" }} />
      <span className="h-2 w-2 rounded-[2px]" style={{ background: "rgba(124,58,237,0.6)" }} />
      <span className="h-2 w-2 rounded-[2px]" style={{ background: "rgba(124,58,237,0.35)" }} />
    </div>
  );
}

export default function ProductDemo() {
  const [dateIndex, setDateIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState(INSIGHTS[0].text);
  const [paused, setPaused] = useState(false);
  const typeTimer = useRef<ReturnType<typeof setInterval> | null>(null);

  const playInsight = (next: number) => {
    const text = INSIGHTS[next].text;
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
  const insight = INSIGHTS[dateIndex];

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

        {/* app shell: icon sidebar + content */}
        <div className="flex" style={{ background: "#0a0a0a" }}>
          {/* icon sidebar */}
          <div className="hidden w-16 shrink-0 flex-col items-center gap-4 border-r py-6 sm:flex" style={{ borderColor: "var(--line-soft)" }}>
            <SidebarMark />
            <div className="flex h-9 w-9 items-center justify-center rounded-lg" style={{ background: "var(--bg-raise)" }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--ink-faint)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="7" height="7" rx="1.5" />
                <rect x="14" y="3" width="7" height="7" rx="1.5" />
                <rect x="3" y="14" width="7" height="7" rx="1.5" />
                <rect x="14" y="14" width="7" height="7" rx="1.5" />
              </svg>
            </div>
          </div>

          {/* main column */}
          <div className="min-w-0 flex-1">
            {/* in-app top nav */}
            <div className="flex items-center gap-1 overflow-x-auto border-b px-6 py-4 sm:px-10" style={{ borderColor: "var(--line-soft)" }}>
              <span className="mr-6 shrink-0 text-[15px] font-bold text-white">Selnite</span>
              {NAV_TABS.map((t, i) => (
                <span
                  key={t}
                  className="shrink-0 rounded-md px-3.5 py-1.5 text-sm font-semibold"
                  style={i === 0 ? { background: "#fff", color: "#0a0a0a" } : { color: "var(--ink-faint)" }}
                >
                  {t}
                </span>
              ))}
            </div>

            {/* scrollable dashboard content */}
            <div
              className="max-h-[560px] overflow-y-auto sm:max-h-[640px]"
              onMouseEnter={() => setPaused(true)}
              onMouseLeave={() => setPaused(false)}
            >
              <div className="p-6 sm:p-10">
                {/* header */}
                <div className="mb-8 border-b pb-8" style={{ borderColor: "var(--line-soft)" }}>
                  <div className="mb-3 text-[11px] font-semibold uppercase tracking-wider text-ink-faint">
                    Thursday, July 3 · 2026 · Market opens in 32 min
                  </div>
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

                {/* KPI row */}
                <div className="mb-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
                  {KPIS.map((k) => (
                    <div key={k.label} className="rounded-xl border p-4" style={{ background: "var(--bg-raise)", borderColor: "var(--line)" }}>
                      <div className="mb-2 truncate text-[11px] font-bold uppercase tracking-wide text-ink-faint">{k.label}</div>
                      <div className="mb-1 text-2xl font-bold text-white">{k.value}</div>
                      <div className="text-xs" style={{ color: k.up ? "var(--good)" : "var(--bad)" }}>
                        {k.up ? "↑" : "↓"} {k.delta}
                      </div>
                    </div>
                  ))}
                  <div className="rounded-xl p-4" style={{ background: "#ececec" }}>
                    <div className="mb-2 truncate text-[11px] font-bold uppercase tracking-wide text-black/50">Behavior</div>
                    <div className="mb-1 text-2xl font-bold text-black">A−</div>
                    <div className="text-xs font-medium text-black/60">↑ improving</div>
                  </div>
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
                        <line
                          x1={GREY_DOTS[0].x}
                          y1="0"
                          x2={GREY_DOTS[0].x}
                          y2="240"
                          stroke="rgba(124,58,237,0.5)"
                          strokeWidth="1.5"
                          strokeDasharray="4 4"
                        />
                        <polyline
                          points={CHART_POINTS}
                          fill="none"
                          stroke="rgba(124,58,237,0.8)"
                          strokeWidth="3"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <polygon points={`${CHART_POINTS} 570,240 30,240`} fill="url(#chartGrad)" />
                        <circle cx={GREY_DOTS[0].x} cy={GREY_DOTS[0].y} r="5" fill="var(--good)" stroke="#050505" strokeWidth="2" />
                        <circle cx={GREY_DOTS[1].x} cy={GREY_DOTS[1].y} r="5" fill="#4a4a52" stroke="#050505" strokeWidth="2" />
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
                    style={{ borderColor: "var(--line-soft)", background: "var(--bg-raise)" }}
                  >
                    <div className="mb-1 flex items-center gap-2.5">
                      <div className="h-2 w-2 rounded-full" style={{ background: "var(--good)" }} />
                      <span className="section-label" style={{ color: "var(--ink-faint)" }}>
                        Psychology Insight
                      </span>
                    </div>
                    <div className="mb-5 text-sm text-ink-faint">
                      {dot.label} · {insight.type}
                    </div>
                    <h4 className="mb-5 min-h-[88px] text-xl font-medium leading-snug text-white sm:text-[1.4rem]">
                      &ldquo;{displayedText}&rdquo;
                    </h4>
                    <div
                      className="mb-3.5 h-1.5 rounded-full"
                      style={{
                        background: `linear-gradient(to right, rgba(124,58,237,0.8), rgba(124,58,237,0.8) ${insight.confidence}%, rgba(255,255,255,0.1) ${insight.confidence}%)`,
                      }}
                    />
                    <div className="mb-6 text-base font-semibold" style={{ color: "rgba(124,58,237,0.9)" }}>
                      {insight.confidence}% confidence
                    </div>
                    <div className="flex flex-1 flex-col border-t pt-5" style={{ borderColor: "var(--line-soft)" }}>
                      <div className="mb-2.5 text-xs font-bold uppercase tracking-wide text-ink-faint">Recommendation</div>
                      <p className="mb-4 flex-shrink-0 text-base leading-relaxed text-ink-soft">{insight.rec}</p>
                    </div>
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
