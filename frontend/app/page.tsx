import Link from "next/link";
import SelniteMark from "./components/SelniteMark";
import HomeLink from "./components/HomeLink";
import Nav from "./components/Nav";
import HeroMoon from "./components/HeroMoon";
import ProductDemo from "./components/ProductDemo";
import IntelligenceSystem from "./components/IntelligenceSystem";
import IntelligentJournaling from "./components/IntelligentJournaling";
import React from "react";


const INSIGHT_FLOW = [
  {
    label: "Connect broker or upload CSV",
    icon: (
      <>
        <path d="M12 3v12" />
        <path d="M7 8l5-5 5 5" />
        <path d="M4 15v3a2 2 0 002 2h12a2 2 0 002-2v-3" />
      </>
    ),
  },
  {
    label: "Trade sync",
    icon: (
      <>
        <polyline points="23 4 23 10 17 10" />
        <polyline points="1 20 1 14 7 14" />
        <path d="M3.51 9a9 9 0 0114.13-3.36L23 10M1 14l5.36 4.36A9 9 0 0020.49 15" />
      </>
    ),
  },
  {
    label: "Selnite analysis",
    icon: <path d="M3 12h4l2-7 4 14 2-7h6" />,
  },
  {
    label: "Insights ready",
    icon: (
      <>
        <path d="M9 18h6M10 21h4" />
        <path d="M12 3a6 6 0 00-6 6c0 2.4 1.2 3.6 2 4.5.6.7 1 1.2 1 2.5h6c0-1.3.4-1.8 1-2.5.8-.9 2-2.1 2-4.5a6 6 0 00-6-6z" />
      </>
    ),
  },
];

const TRUST_SIGNALS = [
  {
    label: "Secure trade imports",
    icon: <path d="M12 2l8 4v6c0 5-3.5 8.5-8 10-4.5-1.5-8-5-8-10V6z" />,
  },
  {
    label: "Private analytics",
    icon: (
      <>
        <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7z" />
        <circle cx="12" cy="12" r="3" />
        <line x1="3" y1="21" x2="21" y2="3" />
      </>
    ),
  },
  {
    label: "No automated trading decisions",
    icon: (
      <>
        <circle cx="12" cy="12" r="9" />
        <line x1="5.5" y1="18.5" x2="18.5" y2="5.5" />
      </>
    ),
  },
  {
    label: "Your data remains yours",
    icon: (
      <>
        <circle cx="8" cy="15" r="4" />
        <path d="M10.8 12.2L20 3M16.5 6.5l3 3M13.5 9.5l2 2" />
      </>
    ),
  },
];

const CANDLES = [
  { x: 10, o: 90, c: 85, h: 95, l: 80 },
  { x: 30, o: 85, c: 92, h: 96, l: 82 },
  { x: 50, o: 92, c: 78, h: 94, l: 75 },
  { x: 70, o: 78, c: 82, h: 86, l: 74 },
  { x: 90, o: 82, c: 60, h: 84, l: 58 },
  { x: 110, o: 60, c: 50, h: 62, l: 46 },
  { x: 130, o: 50, c: 55, h: 58, l: 44 },
  { x: 150, o: 55, c: 35, h: 57, l: 32 },
  { x: 170, o: 35, c: 20, h: 38, l: 16 },
  { x: 190, o: 20, c: 10, h: 24, l: 6 },
];

const TEAL = "#2dd4bf";
const VIOLET = "#c084fc";
const FOCUS_LINE_A = "0,100 20,95 40,98 60,80 80,85 100,55 120,62 140,35 160,45 180,20 200,15 220,8";
const FOCUS_LINE_B = "0,110 20,108 40,100 60,98 80,88 100,90 120,75 140,78 160,60 180,58 200,45 220,40";

const SIDEBAR_ICONS: React.ReactNode[] = [
  <>
    <rect x="2" y="2" width="5" height="5" rx="1" />
    <rect x="9" y="2" width="5" height="5" rx="1" />
    <rect x="2" y="9" width="5" height="5" rx="1" />
    <rect x="9" y="9" width="5" height="5" rx="1" />
  </>,
  <>
    <circle cx="8" cy="8" r="6" />
    <path d="M8 2 A6 6 0 0 1 14 8 L8 8 Z" fill="currentColor" stroke="none" />
  </>,
  <>
    <rect x="2" y="2" width="12" height="12" rx="1.5" />
    <line x1="5" y1="6" x2="11" y2="6" />
    <line x1="5" y1="9" x2="11" y2="9" />
  </>,
  <>
    <path d="M3 6h8l-2.5-2.5" />
    <path d="M13 10H5l2.5 2.5" />
  </>,
  <>
    <line x1="4" y1="2" x2="4" y2="14" />
    <circle cx="4" cy="6" r="1.6" fill="currentColor" stroke="none" />
    <line x1="8" y1="2" x2="8" y2="14" />
    <circle cx="8" cy="10" r="1.6" fill="currentColor" stroke="none" />
    <line x1="12" y1="2" x2="12" y2="14" />
    <circle cx="12" cy="5" r="1.6" fill="currentColor" stroke="none" />
  </>,
];

const FOCUS_STATS = [
  { label: "Return", pct: "275.18%", value: "$2,926.48", vs: "vs $10,605.28", color: TEAL },
  { label: "Avg Return", pct: "312.18%", value: "$12.67", vs: "vs $52.24", color: TEAL },
  { label: "Win Ratio", pct: "5.52%", value: "79.91%", vs: "vs 85", color: VIOLET },
];

function ArcPattern({ stroke }: { stroke: string }) {
  return (
    <svg className="absolute inset-0 h-full w-full" viewBox="0 0 200 240" preserveAspectRatio="none" style={{ opacity: 0.6 }}>
      {[40, 65, 90, 115, 140].map((r) => (
        <circle key={r} cx="0" cy="240" r={r} fill="none" stroke={stroke} strokeWidth="14" />
      ))}
    </svg>
  );
}

function GlassPanel({
  children,
  rotate,
  width,
  height,
  glow = "rgba(94,234,212,0.4)",
  className = "",
  style = {},
}: {
  children: React.ReactNode;
  rotate: number;
  width: number;
  height?: number;
  glow?: string;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <div
      className={`relative overflow-hidden rounded-2xl ${className}`}
      style={{
        width,
        height,
        transform: `rotate(${rotate}deg)`,
        
        // CRISP GLASS - much lighter, brighter
        background: `
          linear-gradient(
            135deg,
            rgba(255,255,255,0.12) 0%,
            rgba(255,255,255,0.04) 50%,
            rgba(255,255,255,0.02) 100%
          )
        `,
        
        // BRIGHT NEON BORDER
        border: `1px solid ${glow}`,
        
        // INTENSE GLOW
        boxShadow: `
          0 20px 60px rgba(0,0,0,0.4),
          0 0 40px ${glow},
          inset 0 1px 0 rgba(255,255,255,0.2)
        `,
        
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        
        ...style,
      }}
    >
      {/* BRIGHT TOP GLARE */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-[40%]"
        style={{
          background: `
            linear-gradient(
              180deg,
              rgba(255,255,255,0.15) 0%,
              rgba(255,255,255,0.05) 40%,
              transparent 100%
            )
          `,
        }}
      />

      {/* DIAGONAL LIGHT REFLECTION */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: `
            linear-gradient(
              120deg,
              rgba(255,255,255,0.08) 0%,
              rgba(255,255,255,0.02) 30%,
              transparent 50%,
              rgba(255,255,255,0.03) 70%,
              transparent 100%
            )
          `,
        }}
      />

      {/* NEON GLOW PULSE */}
      <div
        className="pointer-events-none absolute -inset-1"
        style={{
          background: `
            radial-gradient(
              ellipse at 30% 20%,
              ${glow} 0%,
              transparent 70%
            )
          `,
          opacity: 0.15,
        }}
      />

      {/* BOTTOM AMBIENT GLOW */}
      <div
        className="pointer-events-none absolute -bottom-10 left-1/2 h-20 w-40 -translate-x-1/2 rounded-full"
        style={{
          background: glow,
          filter: "blur(40px)",
          opacity: 0.2,
        }}
      />

      {/* SHARP INNER BORDER */}
      <div
        className="pointer-events-none absolute inset-[1px] rounded-2xl"
        style={{
          border: "1px solid rgba(255,255,255,0.06)",
        }}
      />

      <div className="relative z-[1] h-full">
        {children}
      </div>
    </div>
  );
}

const GLOSSARY_TERMS = [
  { term: "Revenge Trading", color: "var(--bad)" },
  { term: "Overconfidence", color: "var(--info)" },
  { term: "FOMO Entry", color: "var(--accent-light)", active: true },
  { term: "Drawdown", color: "#2dd4bf" },
  { term: "Risk-Reward Ratio", color: "var(--accent-light)" },
];

const OUR_EDGE = [
  {
    label: "GLOSSARY",
    heading: "For growing traders.",
    body: "A living glossary of terms and patterns that grows with you.",
    mockup: (
      <div className="absolute inset-0 p-6 sm:p-8">
        <div className="flex h-full flex-col justify-between">
          {GLOSSARY_TERMS.map((t, i) => (
            <div
              key={t.term}
              className={`flex ${i === 0 || i === 3 ? "justify-start" : i === 2 ? "justify-center" : "justify-end"}`}
            >
              <div
                className="rounded-xl px-4 py-3 backdrop-blur-xl"
                style={{
                  width: t.active ? "78%" : "58%",
                  border: t.active ? "1px solid rgba(167,139,250,0.55)" : "1px solid var(--line-soft)",
                  background: t.active ? "rgba(124,58,237,0.18)" : "rgba(255,255,255,0.04)",
                  boxShadow: t.active ? "0 25px 55px rgba(88,28,235,0.4)" : "none",
                }}
              >
                <div className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: t.color }} />
                  <span className="text-[13px] font-semibold text-white sm:text-sm">{t.term}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* cursor hovering the center card */}
        <svg
          className="pointer-events-none absolute z-[2]"
          style={{ left: "58%", top: "44%", filter: "drop-shadow(0 3px 6px rgba(0,0,0,0.6))" }}
          width="20"
          height="20"
          viewBox="0 0 16 16"
          fill="none"
        >
          <path d="M2 2L14 8L8.5 9.2L6.5 14.5L2 2Z" fill="white" stroke="rgba(0,0,0,0.35)" strokeWidth="0.5" />
        </svg>

        {/* AI-feedback-style definition popup */}
        <div
          className="absolute z-[1] rounded-2xl px-4 py-3.5 backdrop-blur-xl"
          style={{
            right: "4%",
            top: "54%",
            width: "66%",
            border: "1px solid rgba(129,140,248,0.45)",
            background: "linear-gradient(135deg, rgba(99,102,241,0.3) 0%, rgba(124,58,237,0.32) 55%, rgba(49,20,110,0.4) 100%)",
            boxShadow: "0 25px 60px rgba(79,70,229,0.35)",
          }}
        >
          <div className="mb-2 text-[10px] font-bold uppercase tracking-wider text-white/60">Definition</div>
          <div className="flex gap-3">
            <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: "rgba(129,140,248,0.95)" }} />
            <p className="text-[12.5px] leading-relaxed text-white/90">
              <span className="font-semibold text-white">FOMO Entry: </span>
              Entering impulsively out of fear of missing the move, without your setup confirming first.
            </p>
          </div>
        </div>
      </div>
    ),
  },
  {
    label: "FOCUS",
    heading: "For focused trading.",
    body: "Only the charts and data you actually need. Nothing else.",
    mockup: (
      <div
        className="absolute inset-0 p-6"
        style={{
        background: `
          radial-gradient(
            circle at 50% 20%,
            rgba(108,71,255,0.22) 0%,
            rgba(30,27,60,0.55) 45%,
            rgba(9,11,23,0.85) 100%
          )
        `,
      }}
      >
        <div className="relative h-full w-full">
          {/* main chart panel */}
          <GlassPanel
            rotate={6}
            width={252}
            height={172}
            glow="rgba(94,234,212,0.5)"
            className="p-4"
            style={{ position: "absolute", left: 58, top: 76 }}
          >
            <div className="relative z-[1] flex h-full flex-col">
              <div className="mb-2 flex items-center gap-3">
                <div className="flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full" style={{ background: TEAL }} />
                  <span className="text-[8px] font-semibold uppercase tracking-wide" style={{ color: "rgba(226,232,240,0.7)" }}>
                    Base profile
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full" style={{ background: VIOLET }} />
                  <span className="text-[8px] font-semibold uppercase tracking-wide" style={{ color: "rgba(226,232,240,0.7)" }}>
                    Followed plan
                  </span>
                </div>
              </div>
              <svg viewBox="0 0 220 120" className="flex-1" preserveAspectRatio="none">
                <line x1="0" y1="30" x2="220" y2="30" stroke="rgba(255,255,255,0.06)" />
                <line x1="0" y1="65" x2="220" y2="65" stroke="rgba(255,255,255,0.06)" />
                <line x1="0" y1="100" x2="220" y2="100" stroke="rgba(255,255,255,0.06)" />
                <polyline
                  points={FOCUS_LINE_B}
                  fill="none"
                  stroke={VIOLET}
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{ filter: `drop-shadow(0 0 4px ${VIOLET})` }}
                />
                <polyline
                  points={FOCUS_LINE_A}
                  fill="none"
                  stroke={TEAL}
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{ filter: `drop-shadow(0 0 5px ${TEAL})` }}
                />
              </svg>
              <div className="mt-1.5 flex items-center justify-between text-[8px]" style={{ color: "rgba(226,232,240,0.45)" }}>
                <span>May 02</span>
                <span>Jun 28</span>
              </div>
            </div>
          </GlassPanel>

          {/* floating icon rail */}
          <GlassPanel
            rotate={9}
            width={34}
            height={148}
            glow="rgba(196,148,249,0.5)"
            className="p-1.5"
            style={{ position: "absolute", left: 6, top: 48 }}
          >
            <div className="relative z-[1] flex h-full flex-col items-center justify-center gap-2">
              {SIDEBAR_ICONS.map((icon, i) => (
                <div
                  key={i}
                  className="flex h-6 w-6 items-center justify-center rounded-lg"
                  style={{
                    background: i === 0 ? "rgba(94,234,212,0.28)" : "rgba(255,255,255,0.06)",
                    color: i === 0 ? TEAL : "rgba(255,255,255,0.55)",
                  }}
                >
                  <svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
                    {icon}
                  </svg>
                </div>
              ))}
            </div>
          </GlassPanel>

          {/* floating stats panel */}
          <GlassPanel
            rotate={-4}
            width={112}
            height={210}
            glow="rgba(196,148,249,0.5)"
            className="p-3.5"
            style={{ position: "absolute", right: 2, top: 32 }}
          >
            <div className="relative z-[1] flex h-full flex-col divide-y" style={{ borderColor: "rgba(255,255,255,0.1)" }}>
              {FOCUS_STATS.map((s) => (
                <div key={s.label} className="flex flex-col gap-0.5 py-2.5 first:pt-0 last:pb-0">
                  <span className="text-[8px] font-semibold uppercase tracking-wide" style={{ color: "rgba(226,232,240,0.55)" }}>
                    {s.label}
                  </span>
                  <span className="text-[13px] font-bold" style={{ color: s.color, textShadow: `0 0 8px ${s.color}` }}>
                    {s.pct} ↑
                  </span>
                  <span className="text-[9px]" style={{ color: "rgba(226,232,240,0.6)" }}>
                    {s.value}
                  </span>
                  <span className="text-[8px]" style={{ color: "rgba(226,232,240,0.35)" }}>
                    {s.vs}
                  </span>
                </div>
              ))}
            </div>
          </GlassPanel>

          {/* cursor hovering over the chart */}
          <div className="absolute z-[3]" style={{ left: 210, top: 128 }}>
            <svg width="20" height="20" viewBox="0 0 16 16" fill="none" style={{ filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.6))" }}>
              <path d="M2 2L14 8L8.5 9.2L6.5 14.5L2 2Z" fill="white" stroke="rgba(0,0,0,0.35)" strokeWidth="0.5" />
            </svg>
          </div>

          {/* hover popup — data point values */}
          <div
            className="absolute z-[3] overflow-hidden rounded-xl p-3 backdrop-blur-2xl"
            style={{
              left: 222,
              top: 76,
              width: 128,
              transform: "rotate(-3deg)",
              background: "linear-gradient(160deg, rgba(139,92,246,0.42) 0%, rgba(49,20,110,0.3) 100%)",
              border: "1px solid rgba(196,148,249,0.6)",
              boxShadow: "0 22px 48px rgba(0,0,0,0.6), 0 0 30px rgba(167,139,250,0.4)",
            }}
          >
            <div
              className="pointer-events-none absolute inset-x-0 top-0 h-px"
              style={{ background: "linear-gradient(90deg, transparent, rgba(216,180,254,0.9), transparent)" }}
            />
            <div className="relative text-[9px] font-semibold" style={{ color: "rgba(226,232,240,0.6)" }}>
              Jun 14, 2026
            </div>
            <div className="relative text-[13px] font-bold text-white">$8,420.12</div>
            <div className="relative text-[9px] font-semibold" style={{ color: TEAL }}>
              +18.4% vs plan
            </div>
          </div>
        </div>
      </div>
    ),
  },
  {
    label: "EDGE",
    heading: "For finding your edge.",
    body: "Spot your winning setups, then build the rule that repeats them.",
    mockup: (
      <div
        className="absolute inset-0 flex items-center justify-center p-10"
        style={{
        background: `
          radial-gradient(
            circle at 50% 20%,
            rgba(108,71,255,0.22) 0%,
            rgba(30,27,60,0.55) 45%,
            rgba(9,11,23,0.85) 100%
          )
        `,
      }}
      >
        <div className="relative">
          <GlassPanel rotate={13} width={220} className="p-5">
            <div
              className="mb-3 text-[10px] font-bold uppercase tracking-[0.15em]"
              style={{ color: TEAL, textShadow: `0 0 10px ${TEAL}` }}
            >
              Edge
            </div>
            <div className="flex flex-col divide-y" style={{ borderColor: "rgba(255,255,255,0.08)" }}>
              <div className="flex items-center justify-between py-2 first:pt-0">
                <div className="flex items-center gap-1.5">
                  <span style={{ color: "#4ade80" }}>✓</span>
                  <span className="text-[12px] font-semibold text-white">Breakout Setup</span>
                </div>
                <span className="text-[11px] font-bold" style={{ color: "#4ade80" }}>
                  1.58 PF
                </span>
              </div>
              <div className="flex items-center justify-between py-2 opacity-45">
                <div className="flex items-center gap-1.5">
                  <span style={{ color: "rgba(255,255,255,0.4)" }}>✓</span>
                  <span className="text-[12px] font-semibold text-white">Late Entry</span>
                </div>
                <span className="text-[11px] font-bold text-ink-faint">0.92 PF</span>
              </div>
            </div>
          </GlassPanel>

          <div
            className="absolute -left-10 -top-11 rounded-xl p-3.5 backdrop-blur-xl"
            style={{
              width: 158,
              transform: "rotate(-8deg)",
              background: `
                linear-gradient(
                  145deg,
                  rgba(255,255,255,0.14),
                  rgba(255,255,255,0.04) 40%,
                  rgba(108,71,255,0.15)
                )
                `,

                border:
                "1px solid rgba(255,255,255,0.18)",

                boxShadow: `
                0 40px 90px rgba(0,0,0,0.35),
                0 0 50px rgba(108,71,255,0.25),
                inset 0 0 35px rgba(255,255,255,0.08)
                `,
            }}
          >
            <p className="text-[10px] font-semibold leading-relaxed" style={{ color: "rgba(216,180,254,0.9)" }}>
              Psychology Analysis: you show most return after&hellip;
            </p>
          </div>
        </div>
      </div>
    ),
  },
];

const PROBLEM_CARDS = [
  {
    graphic: (
      <g transform="translate(90,15) scale(5)" fill="none" stroke="rgba(167,139,250,0.9)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="m17 2 4 4-4 4" />
        <path d="M3 11v-1a4 4 0 0 1 4-4h14" />
        <path d="m7 22-4-4 4-4" />
        <path d="M21 13v1a4 4 0 0 1-4 4H3" />
      </g>
    ),
    title: "You know the pattern repeats.",
    body: "Same mistakes, different day. Revenge trading after losses. Overconfidence after wins.",
    emphasis: (
      <>
        Research shows traders who fail to journal emotional context repeat the same{" "}
        <span className="text-white">cognitive errors up to 4x more frequently</span> than those who track
        psychological states.
      </>
    ),
  },
  {
    graphic: (
      <>
        <polygon points="150,20 90,130 210,130" fill="rgba(124,58,237,0.12)" stroke="rgba(124,58,237,0.5)" strokeWidth="2" strokeLinejoin="round" />
        <polygon points="150,20 135,48 165,48" fill="rgba(167,139,250,0.55)" />
        <line x1="135" y1="48" x2="165" y2="48" stroke="rgba(240,239,244,0.85)" strokeWidth="2" />
      </>
    ),
    title: "Your journal only shows the surface.",
    body: "You log trades, but you don't understand why they happened. What emotional state led to that entry?",
    emphasis: (
      <>
        Standard spreadsheets track the &ldquo;what,&rdquo; but neglect the{" "}
        <span className="text-white">80% of variance in trade execution often tied to psychological triggers.</span>
      </>
    ),
  },
  {
    graphic: (
      <polyline
        points="30,40 90,55 150,50 210,90 270,120"
        fill="none"
        stroke="rgba(167,139,250,0.55)"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    ),
    title: "Your emotions are costing you.",
    body: "One emotional decision. Then another. Then you're down 15% before you realize what happened.",
    emphasis: (
      <>
        Without emotional tracking, the average trader loses significant capital to impulse decisions—an avoidable
        drain that accounts for roughly <span className="text-white">30% of total drawdown.</span>
      </>
    ),
  },
];

const PATTERNS = [
  {
    name: "Revenge Trading",
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
    name: "Late Entries",
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

const TRADITIONAL_METRICS = [
  { label: "Profit / Loss", value: "+$4,210" },
  { label: "Win Rate", value: "54%" },
  { label: "Average Gain", value: "$186" },
  { label: "Average Loss", value: "$142" },
];

const DECISION_INSIGHTS = [
  { text: "Revenge trading detected after losses", color: "var(--bad)" },
  { text: "Best-performing setup identified", color: "var(--good)" },
  { text: "Emotional patterns around drawdowns", color: "var(--accent-light)" },
  { text: "Risk discipline holding steady", color: "var(--good)" },
  { text: "Strategy consistency improving", color: "var(--accent-light)" },
];

const MOST_JOURNALS = [
  "Reactive: you log, then guess",
  "Shows you what happened",
  "You hunt for the patterns",
  "Just your trades",
];

const SELNITE_COMPARE = [
  "Proactive: a rule before your next trade",
  "Tells you why it happened",
  "Patterns found for you",
  "The market behind each trade",
];

const TRUST_CARDS = [
  {
    icon: (
      <>
        <path
          d="M16 2C8.27 2 2 8.27 2 16C2 23.73 8.27 30 16 30C23.73 30 30 23.73 30 16"
          stroke="rgba(124,58,237,0.8)"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path d="M16 6V16L22 22" stroke="rgba(124,58,237,0.8)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </>
    ),
    title: "Your Data, Your Rules",
    body: "Upload your trade CSV. We analyze it. You control the outcome.",
  },
  {
    icon: (
      <>
        <path
          d="M6 16C6 10.48 10.48 6 16 6C21.52 6 26 10.48 26 16C26 21.52 21.52 26 16 26C10.48 26 6 21.52 6 16Z"
          stroke="rgba(124,58,237,0.8)"
          strokeWidth="1.5"
        />
        <path d="M12 16L14.5 18.5L20 13" stroke="rgba(124,58,237,0.8)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </>
    ),
    title: "Human Reviewed",
    body: "Every report checked by someone who trades. No automated nonsense.",
  },
];

const IMPORT_OPTIONS = [
  {
    title: "Drop your CSV",
    body: "Export your trade history from any broker and drag the file in. Selnite maps every entry and exit automatically.",
    icon: (
      <>
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
        <polyline points="17 8 12 3 7 8" />
        <line x1="12" y1="3" x2="12" y2="15" />
      </>
    ),
  },
  {
    title: "Connect your broker",
    body: "Securely link your brokerage account and Selnite keeps your trade history synced automatically — no manual exports.",
    icon: (
      <>
        <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
        <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
      </>
    ),
  },
];

function XIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="shrink-0">
      <path d="M3 3L17 17M17 3L3 17" stroke="rgba(239,68,68,0.6)" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="shrink-0">
      <path d="M4 10L8 14L16 6" stroke="rgba(124,58,237,0.8)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function Home() {
  return (
    <div className="relative bg-bg text-white">
      <Nav />

      {/* ----------------------------- Hero ---------------------------- */}
      <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-4 sm:px-6 pt-[120px]">
        <HeroMoon />
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-[280px]"
          style={{ background: "linear-gradient(to top, var(--bg-alt) 0%, transparent 100%)" }}
        />
        <div className="relative z-[2] mx-auto max-w-6xl px-6 text-center">
          <h1
            className="display mb-6 text-white text-balance"
            style={{ fontSize: "clamp(2.5rem, 6vw, 5.5rem)", letterSpacing: "-1.5px" }}
          >
            Don&apos;t let emotions control your trades.
          </h1>
          <p className="mx-auto mb-12 max-w-2xl text-lg leading-relaxed text-ink-soft sm:text-xl">
            Selnite finds the hidden pattern costing you money, then gives you a clear rule to catch it before your
            next trade.
          </p>
          <a href="#" className="btn-light inline-flex items-center px-9 py-4 text-lg">
            Analyze my trades
          </a>
          <div className="bounce-hint mt-27 flex flex-col items-center gap-3">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="rgba(240,239,244,0.4)" strokeWidth="2" strokeLinecap="round">
              <path d="M12 5V19M12 19L5 12M12 19L19 12" />
            </svg>
            <span className=" text-[19px] font-medium text-ink-faint">Scroll</span>
          </div>
        </div>
      </section>

      {/* --------------------------- Our Edge -------------------------- */}
      <section className="relative overflow-hidden bg-bg-alt px-4 sm:px-6 py-24 sm:py-32">
        <div className="mt-40 relative z-[1] mx-auto max-w-[1600px]">
        

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            {OUR_EDGE.map((f, i) => (
              <div
                key={f.label}
                className="flex flex-col overflow-hidden rounded-2xl"
                style={{ border: "1px solid var(--accent-line)", background: "var(--accent-soft)" }}
              >
                <div
                  className="relative h-[420px] sm:h-[520px]"
                  style={{ background: "linear-gradient(160deg, rgba(20,14,30,0.95) 0%, rgba(10,8,15,0.95) 100%)" }}
                >
                  {i === 0 && f.mockup}
                  <span
                    className="absolute bottom-4 left-4 rounded-full px-3 py-1 text-[11px] font-bold tracking-wide text-white"
                    style={{ background: "rgba(124,58,237,0.85)" }}
                  >
                    {f.label}
                  </span>
                </div>
                <div className="p-6 sm:p-7">
                  <h3 className="mb-2 text-xl font-bold text-white sm:text-2xl">{f.heading}</h3>
                  <p className="text-[15px] leading-relaxed text-ink-soft">{f.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <IntelligenceSystem />

      <IntelligentJournaling />

      {/* ------------------------ From Trades to Insights ------------------------ */}
      <section
        className="relative overflow-hidden px-4 sm:px-6 py-24 sm:py-32"
        style={{ background: "linear-gradient(180deg, var(--bg) 0%, var(--bg-alt) 55%, var(--bg-alt) 100%)" }}
      >
        <div
          className="glow pointer-events-none absolute left-[-15%] top-[10%] h-[650px] w-[650px]"
          style={{ background: "radial-gradient(circle, rgba(124,58,237,0.16) 0%, transparent 70%)" }}
        />
        <div
          className="glow pointer-events-none absolute right-[-15%] top-[-5%] h-[600px] w-[600px]"
          style={{ background: "radial-gradient(circle, rgba(231,61,138,0.13) 0%, transparent 70%)" }}
        />
        <div
          className="glow pointer-events-none absolute left-1/2 top-[45%] h-[500px] w-[900px] -translate-x-1/2"
          style={{ background: "radial-gradient(ellipse, rgba(167,139,250,0.1) 0%, transparent 70%)" }}
        />
        <div
          className="glow pointer-events-none absolute bottom-[-15%] right-[5%] h-[550px] w-[550px]"
          style={{ background: "radial-gradient(circle, rgba(99,102,241,0.12) 0%, transparent 70%)" }}
        />

        <div className="relative z-[1] mx-auto max-w-[1100px]">
          <div className="mb-20 text-center sm:mb-24">
            <h2 className="display mb-6 text-4xl sm:text-5xl lg:text-[4.5rem]">
              From trades to insights in minutes.
            </h2>

            <p className="mx-auto max-w-2xl text-lg leading-relaxed text-ink-soft sm:text-xl">
              Selnite turns your trade history into behavioral insights you can actually act on.
            </p>
          </div>

          {/* Flow: connect -> sync -> analysis -> insights */}
          <div className="mb-20 flex flex-col items-center justify-center sm:mb-24 sm:flex-row sm:items-start sm:gap-1">
            {INSIGHT_FLOW.map((step, i) => (
              <React.Fragment key={step.label}>
                <div className="flex flex-col items-center sm:w-[190px]">
                  <div
                    className="mb-4 flex h-14 w-14 shrink-0 items-center justify-center rounded-full sm:h-16 sm:w-16"
                    style={{
                      border: i === INSIGHT_FLOW.length - 1 ? "1px solid rgba(196,148,249,0.5)" : "1px solid var(--line)",
                      background: i === INSIGHT_FLOW.length - 1 ? "linear-gradient(135deg, rgba(124,58,237,0.55), rgba(99,102,241,0.45))" : "var(--bg-raise)",
                    }}
                  >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                      {step.icon}
                    </svg>
                  </div>
                  <span
                      className="text-center text-sm font-semibold text-white sm:text-base"
                    >
                      {step.label}
                    </span>
                </div>
                {i < INSIGHT_FLOW.length - 1 && (
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="rgba(255,255,255,0.3)"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="my-3 shrink-0 sm:my-0 sm:mt-6"
                  >
                    <path d="M12 5v14M5 12l7 7 7-7" className="sm:hidden" />
                    <path d="M5 12h14M13 6l6 6-6 6" className="hidden sm:block" />
                  </svg>
                )}
              </React.Fragment>
            ))}
          </div>

          {/* Trust signals */}
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
            {TRUST_SIGNALS.map((t) => (
              <div
                key={t.label}
                className="flex items-center gap-2.5 rounded-full px-5 py-3"
                style={{ border: "1px solid var(--line)", background: "var(--bg-raise)" }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="rgba(167,139,250,0.85)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
                  {t.icon}
                </svg>
                <span className="text-sm font-medium leading-snug text-ink-soft">{t.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* -------------------- Interactive Dashboard -------------------- */}
      <section id="dashboard" className="relative overflow-hidden bg-bg-alt px-4 sm:px-6 py-24 sm:py-32">
        <div
          className="glow absolute right-[-10%] top-1/2 h-[600px] w-[600px]"
          style={{ background: "radial-gradient(circle, rgba(124,58,237,0.12) 0%, transparent 70%)" }}
        />
        <div className="relative z-[1] mx-auto max-w-[1600px]">
          <div className="mb-20 text-center">
            <h2 className="display text-4xl sm:text-5xl lg:text-[4.5rem]">
              Meet your personal trading dashboard.
            </h2>
          </div>

          <ProductDemo />

          <div className="mt-30 flex justify-center">
            <a href="#" className="btn-light inline-flex items-center px-14 py-4.5 text-lg">
              Find my trading pattern
            </a>
          </div>
        </div>
      </section>

      {/* ------------------- Results vs Decisions ------------------- */}
      <section
        className="relative overflow-hidden px-4 sm:px-6 py-24 sm:py-32"
        style={{ background: "linear-gradient(180deg, var(--bg-alt) 0%, #0a0a14 320px)" }}
      >
        <div
          className="glow pointer-events-none absolute right-[-10%] top-[10%] h-[600px] w-[600px]"
          style={{ background: "radial-gradient(circle, rgba(124,58,237,0.12) 0%, transparent 70%)" }}
        />
        <div className="relative z-[1] mx-auto max-w-[1200px]">
          <div className="mb-16 text-center sm:mb-20">
            <h2 className="display mb-6 text-3xl sm:text-4xl lg:text-[3.4rem]">
              Not another passive journal.
            </h2>
            <p className="mx-auto max-w-2xl text-lg leading-relaxed text-ink-soft sm:text-xl">
              A journal records what you did. Selnite finds the pattern and tells you what to change.
            </p>
          </div>

          <div className="flex flex-col items-stretch gap-6 lg:flex-row lg:items-stretch lg:justify-center">
            {/* Traditional metrics */}
            <div className="flex w-full flex-col rounded-2xl p-8 lg:max-w-md" style={{ border: "1px solid var(--line)", background: "var(--bg-raise)" }}>
              <div className="section-label mb-6" style={{ color: "var(--ink-faint)" }}>
                Traditional Metrics
              </div>
              <div className="flex flex-1 flex-col justify-center">
                {TRADITIONAL_METRICS.map((m, i) => (
                  <div
                    key={m.label}
                    className="flex items-center justify-between py-3.5"
                    style={{ borderBottom: i < TRADITIONAL_METRICS.length - 1 ? "1px solid var(--line-soft)" : "none" }}
                  >
                    <span className="text-base text-ink-soft">{m.label}</span>
                    <span className="text-lg font-bold text-white">{m.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* arrow */}
            <div className="flex shrink-0 items-center justify-center py-2 lg:py-0 lg:px-2">
              <svg
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                stroke="rgba(124,58,237,0.8)"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="rotate-90 lg:rotate-0"
              >
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </div>

            {/* Decision intelligence */}
            <div className="flex w-full flex-col rounded-2xl p-8 lg:max-w-md" style={{ border: "1px solid rgba(124,58,237,0.35)", background: "rgba(124,58,237,0.06)" }}>
              <div className="section-label mb-6" style={{ color: "rgba(167,139,250,0.9)" }}>
                Decision Intelligence
              </div>
              <div className="flex flex-1 flex-col justify-center gap-4">
                {DECISION_INSIGHTS.map((d) => (
                  <div key={d.text} className="flex items-center gap-3">
                    <span className="h-2 w-2 shrink-0 rounded-full" style={{ background: d.color }} />
                    <span className="text-base text-ink-soft">{d.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

    

      {/* ------------------------- Trust & Methodology ------------------------- */}
      <section
        className="relative overflow-hidden px-4 sm:px-6 py-24"
        style={{ background: "linear-gradient(180deg, #0a0a14 0%, var(--bg) 320px)" }}
      >
        <div
          className="glow absolute bottom-[-40%] right-[5%] h-[700px] w-[700px]"
          style={{ background: "radial-gradient(circle, rgba(124,58,237,0.1) 0%, transparent 70%)" }}
        />
        <div className="relative z-[1] mx-auto max-w-[1100px] text-center">
          <h2 className="display mb-8 text-4xl sm:text-5xl lg:text-[4.5rem]">Built by psychology graduates who trade.</h2>
          <p className="mx-auto mb-12 max-w-4xl text-lg leading-loose text-ink-soft sm:text-xl">
            We&apos;re two psychology graduates who trade, and we got tired of losing to ourselves. We spent years
            studying behavioral economics and cognitive psychology, then started trading — and found the biggest
            edge wasn&apos;t a better strategy, it was understanding ourselves.
          </p>

          <div
            className="mx-auto mb-12 max-w-3xl rounded-2xl p-8 text-left sm:p-10"
            style={{ border: "1px solid var(--accent-line)", background: "var(--accent-soft)" }}
          >
          
            <h3 className="mb-4 text-2xl font-bold text-white sm:text-3xl">
              A human-reviewed behavior analysis report.
            </h3>
            <p className="mb-8 text-lg leading-relaxed text-ink-soft">
              Every report is{" "}
              <span className="font-semibold text-white">personally reviewed by a psychology graduate who trades</span>{" "}
              — never an automated script. And it&apos;s as simple as{" "}
              <span className="font-semibold text-white">uploading your trade CSV.</span>
            </p>
            <div className="flex justify-center">
              <a href="#" className="btn-solid inline-flex items-center px-8 py-3.5 text-base">
                Analyze my trades
              </a>
            </div>
          </div>

          <div className="mx-auto grid max-w-3xl grid-cols-1 gap-8 sm:grid-cols-2">
            {TRUST_CARDS.map((c) => (
              <div
                key={c.title}
                className="rounded-xl p-7"
                style={{ border: "1px solid rgba(124,58,237,0.15)", background: "rgba(124,58,237,0.04)" }}
              >
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none" className="mx-auto mb-4 block">
                  {c.icon}
                </svg>
                <h3 className="mb-3 text-lg font-bold text-white sm:text-xl">{c.title}</h3>
                <p className="text-base leading-relaxed text-ink-faint">{c.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --------------------------- Final CTA -------------------------- */}
      <section className="bg-bg px-3 py-24 sm:px-4">
        <div className="relative mx-auto max-w-[1440px] overflow-hidden rounded-[32px]">
          <video
            className="absolute inset-0 h-full w-full object-cover"
            src="/videos/finalctavideo.mp4"
            poster="/videos/finalctavideo-poster.jpg"
            autoPlay
            loop
            muted
            playsInline
          />
          <div className="absolute inset-0" style={{ background: "rgba(5,4,10,0.3)" }} />

          <div className="relative z-[1] px-6 py-14 text-center sm:px-10 sm:py-18">
            <div className="section-label mb-4" style={{ color: "var(--accent-light)" }}>
              Founding Access
            </div>
            <h2 className="display mb-6 text-4xl sm:text-5xl lg:text-[4.5rem]">Ready to take control of your trades?</h2>
            <p className="mx-auto mb-10 max-w-2xl text-lg leading-relaxed text-white/80 sm:text-xl">
              Stop guessing. Start understanding. Get founding access today.
            </p>
            <a href="#" className="btn-solid inline-flex items-center gap-2 px-8 py-4 text-lg">
              Get started
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* ---------------------------- Footer --------------------------- */}
      <footer className="border-t px-4 sm:px-6 py-15" style={{ borderColor: "var(--line)" }}>
        <div className="mx-auto max-w-[1200px]">
          <div className="grid grid-cols-1 items-start gap-14 sm:grid-cols-2">
            <div>
              <HomeLink className="mb-5 flex items-center gap-2.5 text-white">
                <SelniteMark size={20} />
                <span className="text-lg font-bold">Selnite</span>
              </HomeLink>
              <p className="mb-6 text-[15px] leading-relaxed text-ink-soft">Behavioral Intelligence for Traders</p>
              <p className="mb-4 text-[15px] leading-relaxed text-ink-soft">
                Selnite is an analytics tool, not a financial advisor. We never place trades or touch your funds. The
                dashboard is in active development, and founding members get access as it ships.
              </p>
              <p className="text-sm text-ink-faint">
                Selnite is operated by Indro Labs Inc., a Canadian corporation based in Calgary, Alberta.
              </p>
            </div>
            <div className="flex flex-col items-start gap-3 sm:items-end">
              <div className="flex flex-wrap items-center gap-6">
                <Link href="/privacy" className="text-[15px] text-ink-soft transition-colors hover:text-white">
                  Privacy
                </Link>
                <Link href="/terms" className="text-[15px] text-ink-soft transition-colors hover:text-white">
                  Terms
                </Link>
                <a
                  href="mailto:info@indrolabs.ca"
                  className="text-[15px] text-ink-soft transition-colors hover:text-white"
                >
                  Contact
                </a>
              </div>
              <span className="text-[15px] text-ink-faint">© 2026 Selnite</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
