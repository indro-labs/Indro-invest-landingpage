"use client";

import { useState } from "react";

/**
 * Obsidian "Spark ideas"-style showcase: one calm claim per feature,
 * a live mockup you can actually touch on the right.
 */

const TABS = [
  {
    id: "routines",
    label: "Routines",
    title: "Ritual beats willpower.",
    body: "Discipline isn't a personality trait — it's a checklist you wrote before the market opened. Selnite tracks pre-market, in-session, and review routines, then feeds follow-through into your Behavior Score.",
  },
  {
    id: "timing",
    label: "Timing",
    title: "Your edge keeps hours.",
    body: "Most traders have a window where they're sharp, and hours where they give it back. Selnite breaks win rate, average R, and rule adherence down by hour and session.",
  },
  {
    id: "patterns",
    label: "Patterns",
    title: "Every trade is a confession.",
    body: "Your trading history is the most honest record of your psychology. Selnite flags what repeats — revenge trades, size creep, fear exits — each with a confidence score and the last time it cost you.",
  },
  {
    id: "insights",
    label: "Insights",
    title: "Calmness is an edge.",
    body: "The insight engine waits for evidence before it speaks. Grounded in behavioral finance and your own data, it delivers one concrete recommendation at a time.",
  },
  {
    id: "score",
    label: "Score",
    title: "Discipline compounds.",
    body: "One number for psychological fitness: consistency, emotional control, risk discipline, rule adherence. It moves on evidence, not on a single good day.",
  },
] as const;

type TabId = (typeof TABS)[number]["id"];

export default function FeatureShowcase() {
  const [active, setActive] = useState<TabId>("routines");
  const tab = TABS.find((t) => t.id === active)!;

  return (
    <div>
      <div className="mb-14 flex flex-wrap justify-center gap-2">
        {TABS.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => setActive(t.id)}
            className={`rounded-full px-4 py-2 text-[14px] transition-colors ${
              t.id === active
                ? "bg-[#ececea] font-semibold text-[#111]"
                : "text-ink-soft hover:text-ink"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div key={tab.id} className="rise grid items-center gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
        <div>
          <p className="section-label mb-3">{tab.label}</p>
          <h3 className="display mb-4 text-[1.65rem] leading-tight sm:text-3xl">{tab.title}</h3>
          <p className="max-w-md text-[15px] leading-relaxed text-ink-soft">{tab.body}</p>
        </div>

        <div className="min-h-[360px]">
          {tab.id === "routines" && <RoutineMock />}
          {tab.id === "timing" && <TimingMock />}
          {tab.id === "patterns" && <PatternsMock />}
          {tab.id === "insights" && <InsightMock />}
          {tab.id === "score" && <ScoreMock />}
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Routines — a checklist you can actually tick                       */
/* ------------------------------------------------------------------ */

const ROUTINE_ITEMS = [
  "Review the economic calendar: Fed, CPI, earnings",
  "Check overnight moves on the watchlist",
  "Mark today's key levels before the open",
  "Confirm max loss and position size limits",
  "Name today's emotional triggers, in writing",
];

function RoutineMock() {
  const [done, setDone] = useState<boolean[]>([true, true, false, false, false]);
  const count = done.filter(Boolean).length;
  const complete = count === ROUTINE_ITEMS.length;

  return (
    <div className="surface rounded-2xl p-7">
      <div className="mb-5 flex items-start justify-between">
        <div>
          <p className="mb-1 text-[13px] font-semibold text-ink">Pre-market routine</p>
          <p className="text-[11px] text-ink-soft">Weekdays · 9:00 AM · before first trade</p>
        </div>
        <span className="rounded-md bg-bg-sunk px-2.5 py-1 text-[11px] font-semibold text-ink-soft">
          12-day streak
        </span>
      </div>

      <div className="mb-5 flex flex-col gap-1.5">
        {ROUTINE_ITEMS.map((item, i) => (
          <button
            key={item}
            type="button"
            aria-pressed={done[i]}
            onClick={() =>
              setDone((d) => d.map((v, j) => (j === i ? !v : v)))
            }
            className={`flex items-center gap-3 rounded-[10px] border px-4 py-3 text-left transition-colors ${
              done[i]
                ? "border-line-soft bg-bg-sunk"
                : "border-line bg-transparent hover:border-ink-faint"
            }`}
          >
            <span
              className={`flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-[5px] border transition-colors ${
                done[i] ? "border-accent bg-accent" : "border-ink-faint"
              }`}
            >
              {done[i] && (
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#0c0d0c" strokeWidth="3">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              )}
            </span>
            <span
              className={`text-[13.5px] leading-snug transition-colors ${
                done[i] ? "text-ink-soft line-through decoration-ink-faint" : "text-ink"
              }`}
            >
              {item}
            </span>
          </button>
        ))}
      </div>

      <div className="flex items-center gap-3">
        <div className="h-[3px] flex-1 rounded-full bg-line-soft">
          <div
            className="h-full rounded-full bg-accent transition-all duration-300"
            style={{ width: `${(count / ROUTINE_ITEMS.length) * 100}%` }}
          />
        </div>
        <span className="whitespace-nowrap text-[12px] font-semibold text-ink-soft">
          {count}/{ROUTINE_ITEMS.length}
        </span>
      </div>
      <p className="mt-3 text-[12px] text-ink-faint">
        {complete ? "Logged to your Consistency score." : "Completion feeds your Consistency score."}
      </p>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Timing — your day, hour by hour. Click a bar.                      */
/* ------------------------------------------------------------------ */

const HOURS = [
  { time: "9:30", pnl: 0.92, win: "71%", avgR: "2.8R", note: "Peak window opens. Your best decisions live here.", tone: "peak" },
  { time: "10:30", pnl: 1.0, win: "68%", avgR: "2.6R", note: "Still sharp. 63% of your weekly P&L is made by 11:00.", tone: "peak" },
  { time: "11:30", pnl: 0.45, win: "55%", avgR: "1.4R", note: "Edge fading. Win rate drops 13 points from the open.", tone: "flat" },
  { time: "12:30", pnl: 0.3, win: "52%", avgR: "1.1R", note: "Lunch chop. You already trade less here. Keep it that way.", tone: "flat" },
  { time: "1:30", pnl: 0.38, win: "48%", avgR: "0.9R", note: "Below breakeven expectancy. First hour you go negative.", tone: "flat" },
  { time: "2:30", pnl: 0.22, win: "34%", avgR: "−0.6R", note: "The give-back zone. 61% of your revenge trades start here.", tone: "worst" },
  { time: "3:30", pnl: 0.5, win: "58%", avgR: "1.6R", note: "Partial recovery into the close, but only on green days.", tone: "flat" },
] as const;

function TimingMock() {
  const [sel, setSel] = useState(1);
  const hour = HOURS[sel];
  return (
    <div className="surface rounded-2xl p-7">
      <div className="mb-6 flex items-start justify-between">
        <div>
          <p className="mb-1 text-[13px] font-semibold text-ink">Performance by hour</p>
          <p className="text-[11px] text-ink-soft">Last 90 days · 214 trades</p>
        </div>
        <span className="rounded-md bg-bg-sunk px-2.5 py-1 text-[11px] font-semibold text-ink-soft">
          ET
        </span>
      </div>

      <div className="mb-2 flex h-28 items-end gap-1.5">
        {HOURS.map((h, i) => (
          <button
            key={h.time}
            type="button"
            aria-label={`${h.time} performance`}
            onClick={() => setSel(i)}
            className="group flex flex-1 flex-col items-center gap-1.5 self-stretch justify-end"
          >
            <div
              className="w-full rounded-sm transition-all"
              style={{
                height: `${Math.max(10, h.pnl * 100)}%`,
                background:
                  i === sel
                    ? h.tone === "worst"
                      ? "var(--bad)"
                      : h.tone === "peak"
                        ? "var(--good)"
                        : "var(--ink)"
                    : h.tone === "peak"
                      ? "color-mix(in srgb, var(--good) 45%, var(--line))"
                      : "var(--line)",
                outline: i === sel ? "none" : undefined,
              }}
            />
          </button>
        ))}
      </div>
      <div className="mb-5 flex gap-1.5">
        {HOURS.map((h, i) => (
          <span
            key={h.time}
            className={`flex-1 text-center text-[9px] ${i === sel ? "font-semibold text-ink" : "text-ink-faint"}`}
          >
            {h.time}
          </span>
        ))}
      </div>

      <div key={sel} className="rise rounded-[10px] bg-bg-sunk px-5 py-4">
        <div className="mb-2 flex items-center justify-between">
          <span className="text-[13px] font-semibold text-ink">
            {hour.time} to {sel === HOURS.length - 1 ? "close" : HOURS[sel + 1].time}
          </span>
          <span className="text-[11px] text-ink-soft">
            Win {hour.win} · Avg {hour.avgR}
          </span>
        </div>
        <p className="text-[13px] leading-relaxed text-ink-soft">{hour.note}</p>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Patterns                                                           */
/* ------------------------------------------------------------------ */

const PATTERNS = [
  {
    name: "Revenge Trading",
    score: "83%",
    meta: "Last: 2d ago",
    trend: "↑ High",
    color: "var(--bad)",
    detail: "After a red day your average size jumps 2.1× beyond plan. 61% of these start between 2:00 and 3:30 PM.",
  },
  {
    name: "Overconfidence",
    score: "91%",
    meta: "Last: 2d ago",
    trend: "→ Stable",
    color: "var(--info)",
    detail: "Two consecutive wins and your stop discipline drops by a third, usually within 25 minutes of the second win.",
  },
  {
    name: "Late Entries",
    score: "54%",
    meta: "Last: 9d ago",
    trend: "↓ Improving",
    color: "var(--good)",
    detail: "Hesitation entries are fading since you added the checklist. Now mostly confined to the first 15 minutes after the open.",
  },
];

function PatternsMock() {
  const [open, setOpen] = useState(0);
  return (
    <div className="surface rounded-2xl p-7">
      <p className="mb-4 text-[11px] font-semibold uppercase tracking-wide text-ink-soft">
        Detected patterns
      </p>
      <div className="flex flex-col gap-2.5">
        {PATTERNS.map((p, i) => (
          <button
            key={p.name}
            type="button"
            onClick={() => setOpen(i)}
            className={`rounded-[10px] border px-4 py-3.5 text-left transition-colors ${
              open === i ? "border-ink-faint bg-bg-sunk" : "border-line-soft bg-bg-sunk/50 hover:border-ink-faint"
            }`}
          >
            <div className="flex items-center gap-3">
              <span className="h-2 w-2 shrink-0 rounded-full" style={{ background: p.color }} />
              <div className="flex-1">
                <div className="mb-0.5 flex items-center justify-between">
                  <span className="text-sm font-semibold text-ink">{p.name}</span>
                  <span className="text-[13px] font-bold text-ink">{p.score}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[11px] text-ink-faint">{p.meta}</span>
                  <span className="text-[11px] font-semibold" style={{ color: p.color }}>
                    {p.trend}
                  </span>
                </div>
              </div>
            </div>
            {open === i && (
              <p className="rise mt-3 border-t border-line-soft pt-3 text-[13px] leading-relaxed text-ink-soft">
                {p.detail}
              </p>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Insights — apply the rule, watch it stick                          */
/* ------------------------------------------------------------------ */

function InsightMock() {
  const [applied, setApplied] = useState(false);
  return (
    <div className="surface rounded-2xl p-8">
      <p className="mb-2 text-[10px] font-semibold uppercase tracking-wide text-ink-faint">
        Psychology Insight · Jul 3
      </p>
      <p className="mb-5 text-lg font-semibold leading-relaxed text-ink">
        &ldquo;Your performance decreases significantly after two consecutive wins.&rdquo;
      </p>
      <div className="mb-5 flex items-center gap-2.5">
        <div className="h-[3px] flex-1 rounded-full bg-line">
          <div className="h-full w-[91%] rounded-full bg-good" />
        </div>
        <span className="whitespace-nowrap text-[13px] font-semibold text-good">
          91% confidence
        </span>
      </div>
      <div className="mb-5 rounded-[10px] bg-bg-sunk px-5 py-4.5">
        <p className="mb-2 text-[10px] font-semibold uppercase tracking-wide text-ink-faint">
          Recommendation
        </p>
        <p className="text-sm leading-relaxed text-ink-soft">
          Introduce a mandatory 5-minute cooldown after winning streaks before entering
          the next position.
        </p>
      </div>
      {applied ? (
        <div className="rise flex items-center justify-between rounded-lg border border-line py-2.5 pl-4 pr-3">
          <span className="text-sm font-medium text-good">Rule active.</span>
          <button
            type="button"
            onClick={() => setApplied(false)}
            className="text-[12px] text-ink-faint transition-colors hover:text-ink"
          >
            Undo
          </button>
        </div>
      ) : (
        <div className="flex gap-2.5">
          <button type="button" className="flex-1 rounded-lg border border-line py-2.5 text-center text-sm font-medium text-ink-soft transition-colors hover:text-ink">
            Dismiss
          </button>
          <button
            type="button"
            onClick={() => setApplied(true)}
            className="btn-solid flex-1 py-2.5 text-center text-sm font-semibold"
          >
            Apply Rule
          </button>
        </div>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Score                                                              */
/* ------------------------------------------------------------------ */

function ScoreMock() {
  return (
    <div className="surface rounded-2xl p-7">
      <div className="mb-5 flex items-start justify-between">
        <div>
          <p className="mb-1 text-[13px] font-semibold text-ink">Behavior Score</p>
          <p className="text-[11px] text-ink-soft">90-day trend</p>
        </div>
        <span className="text-sm font-bold text-good">+12pts this quarter</span>
      </div>
      <svg viewBox="0 0 500 120" preserveAspectRatio="none" className="mb-6 h-[120px] w-full">
        <line x1="0" y1="25" x2="500" y2="25" stroke="var(--line-soft)" strokeWidth="1" />
        <line x1="0" y1="65" x2="500" y2="65" stroke="var(--line-soft)" strokeWidth="1" />
        <line x1="0" y1="105" x2="500" y2="105" stroke="var(--line-soft)" strokeWidth="1" />
        <defs>
          <linearGradient id="scoreGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#6b9e78" stopOpacity="0.16" />
            <stop offset="100%" stopColor="#6b9e78" stopOpacity="0" />
          </linearGradient>
        </defs>
        <polygon
          points="0,90 70,78 130,82 200,60 260,65 320,88 380,72 440,52 500,40 500,120 0,120"
          fill="url(#scoreGrad)"
        />
        <polyline
          points="0,90 70,78 130,82 200,60 260,65 320,88 380,72 440,52 500,40"
          fill="none"
          stroke="#86b493"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="500" cy="40" r="4" fill="#86b493" />
      </svg>
      <div className="grid grid-cols-4 gap-4 border-t border-line-soft pt-5">
        {[
          ["Consistency", "87"],
          ["Emotional", "73"],
          ["Risk", "91"],
          ["Overall", "A–"],
        ].map(([label, value]) => (
          <div key={label}>
            <p className="mb-1.5 text-[10px] uppercase tracking-wide text-ink-soft">{label}</p>
            <p className="text-xl font-bold tracking-tight text-ink">{value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
