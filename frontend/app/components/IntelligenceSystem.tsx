"use client";

import { useEffect, useRef, useState } from "react";

const NAV_ITEMS = [
  { n: "01", title: "Recognize Your Decisions" },
  { n: "02", title: "Discover Your Edge" },
  { n: "03", title: "Build Your Routine" },
];

const NAV_ITEM_HEIGHT = 104; // px, keep in sync with the fixed-height nav item wrapper below

type Insight = { label: string; text: string; tone: "accent" | "good" | "bad" };

function InsightRow({ label, text, tone }: Insight) {
  const toneColor = tone === "good" ? "rgba(45,212,191,0.85)" : tone === "bad" ? "rgba(244,63,94,0.85)" : "rgba(129,140,248,0.95)";
  return (
    <div className="flex gap-3 py-2.5 first:pt-0 last:pb-0">
      <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: toneColor }} />
      <p className="text-[13px] leading-relaxed text-ink-soft">
        <span className="font-semibold text-white">{label} </span>
        {text}
      </p>
    </div>
  );
}

function InsightPopup({ insights }: { insights: Insight[] }) {
  return (
    <div
      className="rounded-2xl px-4 py-4 backdrop-blur-xl sm:px-5 sm:py-5"
      style={{
        border: "1px solid rgba(129,140,248,0.45)",
        background: "linear-gradient(135deg, rgba(99,102,241,0.3) 0%, rgba(124,58,237,0.32) 55%, rgba(49,20,110,0.4) 100%)",
        boxShadow: "0 25px 60px rgba(79,70,229,0.35)",
      }}
    >
      <div className="divide-y" style={{ borderColor: "rgba(255,255,255,0.12)" }}>
        {insights.map((ins) => (
          <InsightRow key={ins.label} {...ins} />
        ))}
      </div>
    </div>
  );
}

type BackPanelProps = {
  label: string;
  value: string;
  sub: string;
  variant: "chart" | "ring" | "bar";
  points?: string;
  ringPct?: number;
};

function BackPanel({ label, value, sub, variant, points, ringPct }: BackPanelProps) {
  const circumference = 2 * Math.PI * 15.5;
  const dash = ringPct ? (ringPct / 100) * circumference : 0;

  return (
    <div
      className="relative overflow-hidden rounded-xl p-3 backdrop-blur-xl sm:p-4"
      style={{
        border: "1px solid rgba(196,148,249,0.5)",
        background: "linear-gradient(140deg, rgba(168,85,247,0.4) 0%, rgba(88,28,135,0.45) 55%, rgba(46,16,80,0.5) 100%)",
        boxShadow: "0 25px 60px rgba(124,58,237,0.4)",
      }}
    >
      <div className="mb-1 text-[10px] font-bold uppercase tracking-wider text-white/70">{label}</div>
      <div className="mb-2 flex items-end justify-between gap-3">
        <div className="text-lg font-bold text-white sm:text-xl">{value}</div>
        {variant === "ring" && (
          <svg viewBox="0 0 36 36" className="h-9 w-9 shrink-0">
            <circle cx="18" cy="18" r="15.5" fill="none" stroke="rgba(255,255,255,0.18)" strokeWidth="3" />
            <circle
              cx="18"
              cy="18"
              r="15.5"
              fill="none"
              stroke="#f5d0fe"
              strokeWidth="3"
              strokeLinecap="round"
              strokeDasharray={`${dash} ${circumference}`}
              transform="rotate(-90 18 18)"
            />
          </svg>
        )}
      </div>
      {variant === "chart" && (
        <svg viewBox="0 0 120 30" className="h-7 w-full" preserveAspectRatio="none">
          <polyline points={points} fill="none" stroke="#f5d0fe" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )}
      {variant === "bar" && (
        <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/15">
          <div className="h-full rounded-full" style={{ width: `${ringPct}%`, background: "linear-gradient(to right, #e9d5ff, #f5d0fe)" }} />
        </div>
      )}
      <div className="mt-2 text-[10px] leading-snug text-white/60">{sub}</div>
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
  back,
  insights,
  footer,
}: {
  active: boolean;
  glow: string;
  title: string;
  subtitle: string;
  tabs: string[];
  preview: React.ReactNode;
  back: BackPanelProps;
  insights: Insight[];
  footer: string;
}) {
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

        {/* Product UI preview — stacked displays */}
        <div className="relative mb-16 mt-9 sm:mb-20 sm:mt-11">
          <div className="absolute -right-2 -top-9 z-0 w-[42%] sm:-right-3 sm:-top-10 sm:w-[38%]">
            <BackPanel {...back} />
          </div>
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

          {/* Key insights / outputs — overlaps the bottom-left corner */}
          <div className="absolute -bottom-9 -left-2 z-[2] w-[70%] sm:-bottom-10 sm:-left-3 sm:w-[62%]">
            <InsightPopup insights={insights} />
          </div>
        </div>

        {/* Small supporting details */}
        <div className="text-[12px] text-ink-ghost">{footer}</div>
      </div>
    </div>
  );
}

function TradeAnalysisPreview() {
  return (
    <div>
      <div className="mb-4 flex items-start justify-between">
        <div>
          <div className="text-xl font-bold text-white sm:text-2xl">NVDA Long</div>
          <div className="mt-1 text-sm text-ink-faint">Entry 10:32 AM</div>
        </div>
        <div className="text-xl font-bold text-good sm:text-2xl">+$420</div>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div className="rounded-xl p-4" style={{ border: "1px solid var(--line-soft)", background: "rgba(255,255,255,0.03)" }}>
          <div className="mb-1 text-xs text-ink-faint">Reason</div>
          <div className="text-sm font-semibold text-white">Breakout continuation</div>
        </div>
        <div className="rounded-xl p-4" style={{ border: "1px solid var(--line-soft)", background: "rgba(255,255,255,0.03)" }}>
          <div className="mb-1 text-xs text-ink-faint">Emotion</div>
          <div className="text-sm font-semibold text-white">Confidence</div>
        </div>
      </div>
    </div>
  );
}

function TradingEdgePreview() {
  return (
    <div>
      <div className="mb-4">
        <div className="mb-1 text-xs text-ink-faint">Highest Performing Setup</div>
        <div className="text-xl font-bold text-white sm:text-2xl">Momentum Breakout</div>
      </div>
      <div className="mb-4 grid grid-cols-2 gap-3">
        <div className="rounded-xl p-4 text-center" style={{ border: "1px solid rgba(45,212,191,0.2)", background: "rgba(45,212,191,0.06)" }}>
          <div className="mb-1 text-xs text-ink-faint">Win Rate</div>
          <div className="text-xl font-bold text-white">72%</div>
        </div>
        <div className="rounded-xl p-4 text-center" style={{ border: "1px solid rgba(45,212,191,0.2)", background: "rgba(45,212,191,0.06)" }}>
          <div className="mb-1 text-xs text-ink-faint">Average R</div>
          <div className="text-xl font-bold text-white">+2.4</div>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        {["High volume", "Morning session", "Trend confirmation"].map((c) => (
          <div key={c} className="flex items-center gap-2 text-sm text-white">
            <span style={{ color: "rgba(45,212,191,0.9)" }}>✓</span>
            {c}
          </div>
        ))}
      </div>
    </div>
  );
}

function StrategyBuilderPreview() {
  return (
    <div>
      <div className="mb-4 text-xl font-bold text-white sm:text-2xl">Momentum Breakout</div>
      <div className="mb-4 flex flex-col gap-2">
        {["Volume increase", "Above VWAP", "Trend confirmation"].map((c) => (
          <div key={c} className="flex items-center gap-2 text-sm text-white">
            <span style={{ color: "rgba(124,58,237,0.9)" }}>✓</span>
            {c}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div className="rounded-xl p-4" style={{ border: "1px solid var(--line-soft)", background: "rgba(255,255,255,0.03)" }}>
          <div className="mb-1 text-xs text-ink-faint">Risk</div>
          <div className="text-sm font-semibold text-white">1% per trade</div>
        </div>
        <div className="rounded-xl p-4" style={{ border: "1px solid var(--line-soft)", background: "rgba(255,255,255,0.03)" }}>
          <div className="mb-1 text-xs text-ink-faint">Entry Rule</div>
          <div className="text-sm font-semibold text-white">Wait for confirmation</div>
        </div>
      </div>
    </div>
  );
}

const FEATURES = [
  {
    n: "01",
    title: "AI Trading Analyst",
    subtitle: "Understand why your trades succeed or fail.",
    tabs: ["Today", "This Week"],
    glow: "radial-gradient(circle, rgba(124,58,237,0.25) 0%, transparent 70%)",
    preview: <TradeAnalysisPreview />,
    back: {
      label: "P&L Today",
      value: "+$1,240",
      sub: "18% above your weekly average",
      variant: "chart" as const,
      points: "0,30 15,26 30,28 45,20 60,22 75,12 90,14 105,6 120,4",
    },
    insights: [
      { label: "AI Insight:", text: "Your strongest setup is momentum breakouts with volume confirmation.", tone: "accent" as const },
      { label: "Behavior detected:", text: "Late entries reduce your average performance.", tone: "bad" as const },
    ],
    footer: "Analyzed from 214 trades · Last updated today",
  },
  {
    n: "02",
    title: "Edge Finder",
    subtitle: "Find the setups, conditions, and behaviors that create your best results.",
    tabs: ["Setups", "Conditions"],
    glow: "radial-gradient(circle, rgba(45,212,191,0.2) 0%, transparent 70%)",
    preview: <TradingEdgePreview />,
    back: {
      label: "Setup Win Rate",
      value: "72%",
      sub: "Momentum Breakout, 90-day sample",
      variant: "ring" as const,
      ringPct: 72,
    },
    insights: [
      { label: "AI Insight:", text: "Momentum Breakout is your highest win-rate setup.", tone: "good" as const },
      { label: "Behavior detected:", text: "Performance drops when chasing extended moves.", tone: "bad" as const },
    ],
    footer: "Based on 90 days of trade history",
  },
  {
    n: "03",
    title: "Strategy Builder",
    subtitle: "Turn your best decisions into a repeatable trading system.",
    tabs: ["Rules", "Backtest"],
    glow: "radial-gradient(circle, rgba(124,58,237,0.22) 0%, transparent 70%)",
    preview: <StrategyBuilderPreview />,
    back: {
      label: "Rule Adherence",
      value: "91%",
      sub: "3 active rules, tracked automatically",
      variant: "bar" as const,
      ringPct: 91,
    },
    insights: [
      { label: "AI Insight:", text: "Your highest-quality trades occur when these rules are followed.", tone: "accent" as const },
      { label: "Behavior detected:", text: "Rule violations correlate with your largest losses.", tone: "bad" as const },
    ],
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
          <h2 className="display text-4xl sm:text-5xl lg:text-[4.5rem]">The Selnite Intelligence System.</h2>
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
                  back={f.back}
                  insights={f.insights}
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
