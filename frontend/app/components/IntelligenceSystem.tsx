"use client";

import { useEffect, useRef, useState } from "react";

const NAV_ITEMS = [
  { n: "01", title: "Recognize your decisions" },
  { n: "02", title: "Discover your edge" },
  { n: "03", title: "Build your routine" },
];

const NAV_ITEM_HEIGHT = 104; // px, keep in sync with the fixed-height nav item wrapper below

const PATTERNS = [
  {
    name: "Revenge trading",
    score: "83%",
    meta: "Last: 2d ago · ↑ High",
    color: "var(--bad)",
    desc: "After a red day your average size jumps 2.1× beyond plan. 61% between 2–3:30 PM.",
  },
  {
    name: "Overconfidence",
    score: "91%",
    meta: "Last: 2d ago · → Stable",
    color: "var(--info)",
  },
  {
    name: "Late entries",
    score: "54%",
    meta: "Last: 9d ago · ↓ Improving",
    color: "var(--accent-light)",
  },
];

const HOURS = [
  { time: "9:30", h: 45, rgb: "34,197,94", op0: 0.7, op1: 0.2 },
  { time: "10:30", h: 72, rgb: "34,197,94", op0: 0.9, op1: 0.25 },
  { time: "11:30", h: 28, rgb: "60,60,60", op0: 0.5, op1: 0.2 },
  { time: "12:30", h: 22, rgb: "60,60,60", op0: 0.4, op1: 0.15 },
  { time: "1:30", h: 20, rgb: "60,60,60", op0: 0.4, op1: 0.15 },
  { time: "2:30", h: 25, rgb: "60,60,60", op0: 0.4, op1: 0.15 },
];

const SCORE_STATS = [
  { label: "CONSISTENCY", value: "87" },
  { label: "EMOTIONAL", value: "73" },
  { label: "RISK", value: "91" },
  { label: "OVERALL", value: "84/100" },
];

type Insight = { label: string; text: string; tone: "accent" | "good" | "bad" };
type PopupPosition = "top-right" | "bottom-right";

function InsightRow({ label, text, tone }: Insight) {
  const toneColor = tone === "good" ? "rgba(45,212,191,0.85)" : tone === "bad" ? "rgba(244,63,94,0.85)" : "rgba(129,140,248,0.95)";
  return (
    <div className="flex gap-2 py-1 first:pt-0 last:pb-0 sm:gap-3">
      <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: toneColor }} />
      <p className="text-[10.5px] leading-relaxed text-ink-soft sm:text-[13px]">
        <span className="font-semibold text-white">{label} </span>
        {text}
      </p>
    </div>
  );
}

function InsightPopup({ insights }: { insights: Insight[] }) {
  return (
    <div
      className="rounded-xl px-2.5 py-2.5 backdrop-blur-xl sm:rounded-2xl sm:px-5 sm:py-5"
      style={{
        border: "1px solid rgba(129,140,248,0.45)",
        background: "linear-gradient(135deg, rgba(99,102,241,0.3) 0%, rgba(124,58,237,0.32) 55%, rgba(49,20,110,0.4) 100%)",
        boxShadow: "0 25px 60px rgba(79,70,229,0.35)",
      }}
    >
      <div className="mb-1 text-[8px] font-bold uppercase tracking-wider text-white/60 sm:mb-2 sm:text-[10px]">AI Feedback</div>
      <div className="space-y-1">
        {insights.map((ins) => (
          <InsightRow key={ins.label} {...ins} />
        ))}
      </div>
    </div>
  );
}

function AppChrome({ tabs }: { tabs: string[] }) {
  return (
    <div className="mb-4 flex items-center justify-between border-b pb-3" style={{ borderColor: "var(--line-soft)" }}>
      <div className="flex items-center gap-1.5">
        <span className="h-2.5 w-2.5 rounded-full" style={{ background: "#3a3a3a" }} />
        <span className="h-2.5 w-2.5 rounded-full" style={{ background: "#3a3a3a" }} />
        <span className="h-2.5 w-2.5 rounded-full" style={{ background: "#3a3a3a" }} />
      </div>
      <div className="flex items-center gap-1 rounded-md bg-white/5 p-1">
        {tabs.map((t, i) => (
          <span
            key={t}
            className="rounded px-2.5 py-1 text-[11px] font-semibold"
            style={{
              background: i === 0 ? "rgba(124,58,237,0.7)" : "transparent",
              color: i === 0 ? "#ffffff" : "var(--ink-faint)",
            }}
          >
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}

function FeatureCard({
  active,
  glow,
  title,
  subtitle,
  tabs,
  preview,
  aiPopup,
  footer,
}: {
  active: boolean;
  glow: string;
  title: string;
  subtitle: string;
  tabs: string[];
  preview: React.ReactNode;
  aiPopup?: { insights: Insight[]; position: PopupPosition };
  footer: string;
}) {
  const popupWrapClass = !aiPopup
    ? "relative mb-6 mt-3 sm:mb-8 sm:mt-4"
    : aiPopup.position === "top-right"
      ? "relative mb-6 mt-3 sm:mb-8 sm:mt-11"
      : "relative mb-6 mt-3 sm:mb-20 sm:mt-4";

  // Mobile: the popup sits in normal flow below the preview (no overlap at all).
  // sm+: it becomes an absolutely-positioned card overlapping the preview's corner.
  const popupPosClass =
    aiPopup?.position === "top-right" ? "sm:-top-10 sm:-right-3" : "sm:-bottom-10 sm:-right-3";

  return (
    <div className="relative transition-all duration-700 ease-out" style={{ opacity: active ? 1 : 0.45, transform: active ? "scale(1)" : "scale(0.97)" }}>
      <div
        className="pointer-events-none absolute -inset-10 rounded-[40px] blur-3xl transition-opacity duration-700"
        style={{ background: glow, opacity: active ? 1 : 0.3 }}
      />
      <div
        className="pointer-events-none absolute -inset-3 rotate-2 rounded-[28px] opacity-40"
        style={{ border: "1px solid rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.02)" }}
      />
      <div
        className="relative overflow-hidden rounded-[26px] p-6 backdrop-blur-xl transition-shadow duration-700 sm:p-8"
        style={{
          border: active ? "1px solid rgba(167,139,250,0.35)" : "1px solid rgba(255,255,255,0.12)",
          background: "linear-gradient(160deg, rgba(255,255,255,0.06) 0%, rgba(10,8,15,0.75) 55%, rgba(10,8,15,0.9) 100%)",
          boxShadow: active ? "0 40px 100px rgba(0,0,0,0.55), 0 0 0 1px rgba(167,139,250,0.08)" : "0 30px 80px rgba(0,0,0,0.4)",
        }}
      >
        {/* Feature title + explanation */}
        <div className="mb-6">
          <h3 className="mb-2 text-2xl font-bold text-white sm:text-[1.75rem]">{title}</h3>
          <p className="text-[15px] leading-relaxed text-ink-soft">{subtitle}</p>
        </div>

        {/* Product UI preview — pulled straight from "Your trade behavior analyzed" */}
        <div className={popupWrapClass}>
          <div
            className="relative z-[1] overflow-hidden rounded-2xl p-5 sm:p-6"
            style={{ border: "1px solid var(--line-soft)", background: "rgba(0,0,0,0.3)" }}
          >
            <div
              className="pointer-events-none absolute inset-x-0 top-0 h-px"
              style={{ background: "linear-gradient(90deg, transparent, rgba(196,148,249,0.7), transparent)" }}
            />
            <AppChrome tabs={tabs} />
            {preview}
          </div>

          {/* AI feedback popup */}
          {aiPopup && (
            <div className={`relative z-[2] mt-4 w-full sm:absolute sm:mt-0 sm:w-[62%] ${popupPosClass}`}>
              <InsightPopup insights={aiPopup.insights} />
            </div>
          )}
        </div>

        {/* Small supporting details */}
        <div className="text-[12px] text-ink-ghost">{footer}</div>
      </div>
    </div>
  );
}

function DetectedPatternsPreview() {
  return (
    <div>
      <div className="section-label mb-4" style={{ color: "rgba(167,139,250,0.6)" }}>
        Detected Patterns
      </div>
      <div className="flex flex-col gap-3">
        {PATTERNS.map((p) => (
          <div
            key={p.name}
            className="rounded-xl p-4"
            style={{ border: `1px solid color-mix(in srgb, ${p.color} 20%, transparent)`, background: `color-mix(in srgb, ${p.color} 4%, transparent)` }}
          >
            <div className="mb-2 flex items-start justify-between">
              <div className="flex items-center gap-2.5">
                <span className="h-2.5 w-2.5 shrink-0 rounded-full" style={{ background: p.color }} />
                <h4 className="text-base font-bold text-white sm:text-lg">{p.name}</h4>
              </div>
              <span className="text-base font-bold sm:text-lg" style={{ color: p.color }}>
                {p.score}
              </span>
            </div>
            <div className="mb-2 text-xs text-ink-faint sm:text-sm">{p.meta}</div>
            {p.desc && <p className="text-sm leading-relaxed text-ink-soft">{p.desc}</p>}
          </div>
        ))}
      </div>
    </div>
  );
}

function PerformanceByHourPreview() {
  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h4 className="mb-1 text-base font-bold text-white sm:text-lg">Performance by hour</h4>
          <div className="text-xs text-ink-faint sm:text-sm">Last 90 days · 214 trades</div>
        </div>
        <span className="text-xs text-ink-faint sm:text-sm">ET</span>
      </div>
      <div className="mb-4 flex h-[100px] items-end gap-2">
        {HOURS.map((b) => (
          <div
            key={b.time}
            className="min-w-5 flex-1 rounded"
            style={{ height: `${b.h}%`, background: `linear-gradient(to top, rgba(${b.rgb},${b.op0}), rgba(${b.rgb},${b.op1}))` }}
          />
        ))}
      </div>
      <div className="mb-4 flex justify-between text-[10px] text-ink-ghost sm:text-xs">
        {HOURS.map((b) => (
          <span key={b.time}>{b.time}</span>
        ))}
      </div>
      <div className="border-t pt-3" style={{ borderColor: "var(--line-soft)" }}>
        <div className="mb-1 text-base font-bold text-white sm:text-lg">10:30 to 11:30</div>
        <div className="text-sm text-ink-soft">Win 68% · Avg 2.6R</div>
        <div className="mt-1 text-xs text-ink-faint">Still sharp. 63% of your weekly P&amp;L by 11:00.</div>
      </div>
    </div>
  );
}

function PsychologyInsightPreview() {
  return (
    <div>
      <div className="section-label mb-2" style={{ color: "rgba(167,139,250,0.6)" }}>
        Psychology Insight · Jul 3
      </div>
      <h4 className="mb-4 text-lg font-bold leading-snug text-white">
        &ldquo;Your performance decreases significantly after two consecutive wins.&rdquo;
      </h4>
      <div
        className="mb-3 h-1 rounded-full"
        style={{ background: "linear-gradient(to right, rgba(34,197,94,0.8), rgba(34,197,94,0.8) 60%, rgba(255,255,255,0.1) 60%)" }}
      />
      <div className="mb-4 text-sm font-semibold text-good">91% confidence</div>
      <div className="mb-5 rounded-lg p-3.5" style={{ background: "rgba(124,58,237,0.08)", borderLeft: "3px solid rgba(124,58,237,0.6)" }}>
        <div className="mb-1.5 text-xs font-semibold" style={{ color: "rgba(124,58,237,0.6)" }}>
          RECOMMENDATION
        </div>
        <p className="text-sm leading-relaxed text-ink-soft">
          Introduce a mandatory 5-minute cooldown after winning streaks before entering the next position.
        </p>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div className="btn-ghost pointer-events-none px-4 py-2.5 text-center text-sm">Dismiss</div>
        <div className="btn-solid pointer-events-none px-4 py-2.5 text-center text-sm">Apply Rule</div>
      </div>
    </div>
  );
}

function BehaviorScorePreview() {
  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <h4 className="text-base font-bold text-white sm:text-lg">Behavior score</h4>
        <span className="text-xs font-semibold text-good sm:text-sm">+12pts this quarter</span>
      </div>
      <div className="mb-4 text-xs text-ink-faint sm:text-sm">90-day trend</div>
      <div className="relative mb-4 h-[90px]">
        <svg className="h-full w-full" viewBox="0 0 400 100" preserveAspectRatio="none">
          <defs>
            <linearGradient id="scoreGradIS" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="rgba(124,58,237,0.3)" />
              <stop offset="100%" stopColor="rgba(124,58,237,0.05)" />
            </linearGradient>
          </defs>
          <polyline
            points="0,70 20,65 40,60 60,55 80,48 100,42 120,45 140,40 160,35 180,38 200,30 220,32 240,28 260,25 280,22 300,18 320,20 340,15 360,12 380,8 400,5"
            fill="none"
            stroke="rgba(124,58,237,0.8)"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <polygon
            points="0,70 20,65 40,60 60,55 80,48 100,42 120,45 140,40 160,35 180,38 200,30 220,32 240,28 260,25 280,22 300,18 320,20 340,15 360,12 380,8 400,5 400,100 0,100"
            fill="url(#scoreGradIS)"
          />
        </svg>
      </div>
      <div className="grid grid-cols-4 gap-2">
        {SCORE_STATS.map((s) => (
          <div key={s.label} className="text-center">
            <div className="mb-1 text-[10px] text-ink-faint">{s.label}</div>
            <div className="text-lg font-bold text-white sm:text-xl">{s.value}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function StrategyStackedPreview() {
  return (
    <div className="flex flex-col gap-6">
      <PsychologyInsightPreview />
      <div className="border-t" style={{ borderColor: "var(--line-soft)" }} />
      <BehaviorScorePreview />
    </div>
  );
}

const FEATURES = [
  {
    n: "01",
    title: "AI trading analyst",
    subtitle: "Understand why your trades succeed or fail.",
    tabs: ["Today", "This Week"],
    glow: "radial-gradient(circle, rgba(124,58,237,0.25) 0%, transparent 70%)",
    preview: <DetectedPatternsPreview />,
    aiPopup: {
      position: "top-right" as PopupPosition,
      insights: [
        { label: "AI Insight:", text: "Revenge Trading is your highest-risk pattern, flagged with high confidence.", tone: "bad" as const },
        { label: "Behavior detected:", text: "Late Entries are trending down — now your most improved pattern.", tone: "good" as const },
      ],
    },
    footer: "Analyzed from 214 trades · Last updated today",
  },
  {
    n: "02",
    title: "Edge finder",
    subtitle: "Find the setups, conditions, and behaviors that create your best results.",
    tabs: ["Setups", "Conditions"],
    glow: "radial-gradient(circle, rgba(45,212,191,0.2) 0%, transparent 70%)",
    preview: <PerformanceByHourPreview />,
    aiPopup: {
      position: "bottom-right" as PopupPosition,
      insights: [
        { label: "AI Insight:", text: "63% of your weekly P&L lands before 11:00 AM.", tone: "good" as const },
        { label: "Behavior detected:", text: "Performance fades sharply after 12:30 PM.", tone: "bad" as const },
      ],
    },
    footer: "Based on 90 days of trade history",
  },
  {
    n: "03",
    title: "Strategy builder",
    subtitle: "Turn your best decisions into a repeatable trading system.",
    tabs: ["Rules", "Backtest"],
    glow: "radial-gradient(circle, rgba(124,58,237,0.22) 0%, transparent 70%)",
    preview: <StrategyStackedPreview />,
    aiPopup: undefined,
    footer: "3 active rules · 91% adherence",
  },
];

export default function IntelligenceSystem() {
  const [active, setActive] = useState(0);
  const refs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = refs.current.findIndex((el) => el === entry.target);
            if (idx !== -1) setActive(idx);
          }
        });
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
    );

    refs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section className="relative bg-bg px-4 sm:px-6 py-24 sm:py-32">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="glow absolute right-[-10%] top-[10%] h-[700px] w-[700px]"
          style={{ background: "radial-gradient(circle, rgba(124,58,237,0.1) 0%, transparent 70%)" }}
        />
      </div>
      <div className="relative z-[1] mx-auto max-w-[1600px]">
        <div className="mb-20 text-center">
          <h2 className="display text-4xl sm:text-5xl lg:text-[4.5rem]">The Selnite intelligence system.</h2>
        </div>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[360px_1fr] lg:gap-20">
          {/* Left — sticky index */}
          <div className="relative hidden h-fit flex-col lg:sticky lg:top-40 lg:flex" style={{ gap: 0 }}>
            <div
              className="absolute left-0 w-0.5 rounded-full transition-transform duration-500 ease-out"
              style={{
                height: 40,
                top: 8,
                background: "var(--accent)",
                transform: `translateY(${active * NAV_ITEM_HEIGHT}px)`,
              }}
            />
            {NAV_ITEMS.map((item, i) => (
              <div key={item.n} className="flex items-start pl-6" style={{ height: NAV_ITEM_HEIGHT }}>
                <span
                  className="text-2xl font-bold leading-snug transition-colors duration-500 lg:text-[1.65rem]"
                  style={{ color: active === i ? "#ffffff" : "var(--ink-faint)" }}
                >
                  {item.title}
                </span>
              </div>
            ))}
          </div>

          {/* Right — scrolling showcase */}
          <div className="flex flex-col gap-28 lg:gap-40">
            {FEATURES.map((f, i) => (
              <div
                key={f.n}
                ref={(el) => {
                  refs.current[i] = el;
                }}
              >
                <div className="mb-4 flex items-center gap-3 lg:hidden">
                  <span className="text-sm font-bold" style={{ color: "rgba(167,139,250,0.9)" }}>
                    {f.n}
                  </span>
                  <span className="text-sm font-bold text-white">{NAV_ITEMS[i].title}</span>
                </div>
                <FeatureCard
                  active={active === i}
                  glow={f.glow}
                  title={f.title}
                  subtitle={f.subtitle}
                  tabs={f.tabs}
                  preview={f.preview}
                  aiPopup={f.aiPopup}
                  footer={f.footer}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
