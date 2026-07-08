import Link from "next/link";
import SelniteMark from "./components/SelniteMark";
import HomeLink from "./components/HomeLink";
import Nav from "./components/Nav";
import HeroMoon from "./components/HeroMoon";
import ProductDemo from "./components/ProductDemo";
import React from "react";


const HOW_IT_WORKS = [
  {
    number: "1",
    title: "Import your trades.",
    body: "Upload your trade CSV or connect your broker. Selnite maps your entries, exits, sizing, and results automatically.",
    icon: (
      <>
        <path d="M12 16V4" />
        <polyline points="8 8 12 4 16 8" />
        <path d="M4 20h16" />
      </>
    ),
  },
  {
    number: "2",
    title: "Find your patterns.",
    body: "Selnite analyzes your decisions across timing, risk, streaks, and behavior to uncover what repeats.",
    icon: (
      <>
        <circle cx="11" cy="11" r="7" />
        <line x1="20" y1="20" x2="16" y2="16" />
      </>
    ),
  },
  {
    number: "3",
    title: "Get your next rule.",
    body: "Turn your behavioral patterns into one clear action you can apply before your next trade.",
    icon: (
      <>
        <polyline points="20 6 9 17 4 12" />
      </>
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
        stroke="rgba(239,68,68,0.85)"
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

      {/* ------------------------ The Problem ------------------------ */}
      <section className="relative overflow-hidden bg-bg-alt px-4 sm:px-6 pt-36 pb-24 sm:pt-48 sm:pb-32">
        <div className="relative z-[1] mx-auto max-w-[1600px] text-center">
          <h2 className="display mb-16 text-4xl sm:text-5xl lg:text-[4.5rem]">Most traders miss what matters most.</h2>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            {PROBLEM_CARDS.map((c) => (
              <div
                key={c.title}
                className="flex flex-col rounded-xl p-8 text-left"
                style={{ border: "1px solid var(--accent-line)", background: "var(--accent-soft)" }}
              >
                <div
                  className="mb-6 flex h-44 items-center justify-center rounded-lg"
                  style={{ background: "rgba(0,0,0,0.2)", border: "1px solid rgba(255,255,255,0.05)" }}
                >
                  <svg viewBox="0 0 300 150" className="h-full w-full p-4">
                    {c.graphic}
                  </svg>
                </div>
                <h3 className="mb-4 text-xl font-bold text-white sm:text-[1.4rem]">{c.title}</h3>
                <p className="mb-4 text-base leading-relaxed text-ink-soft">{c.body}</p>
                <p className="text-lg font-semibold leading-relaxed text-ink-soft">{c.emphasis}</p>
              </div>
            ))}
          </div>

          <p className="mx-auto mt-14 max-w-3xl text-lg leading-loose text-ink-faint sm:text-xl">
            Behavioral biases contribute to a performance drag of up to{" "}
            <span className="font-semibold text-white">20% in retail trading accounts,</span> yet traditional logs
            capture none of it.
          </p>
        </div>
      </section>


      {/* ------------------------ How It Works ------------------------ */}
      <section className="relative overflow-hidden bg-bg-alt px-4 sm:px-6 py-24 sm:py-32">
        <div
          className="glow absolute left-[-10%] top-[20%] h-[600px] w-[600px]"
          style={{
            background:
              "radial-gradient(circle, rgba(124,58,237,0.12) 0%, transparent 70%)",
          }}
        />

        <div className="relative z-[1] mx-auto max-w-[1200px]">
          <div className="mb-20 text-center">
            <h2 className="display mb-6 text-4xl sm:text-5xl lg:text-[4.5rem]">
              From trades to insights in minutes.
            </h2>

            <p className="mx-auto max-w-3xl text-lg leading-relaxed text-ink-soft sm:text-xl">
              Selnite turns your trade history into behavioral insights you can actually act on.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {HOW_IT_WORKS.map((step) => (
              <div
                key={step.number}
                className="relative rounded-2xl p-8"
                style={{
                  border: "1px solid rgba(124,58,237,0.15)",
                  background: "rgba(124,58,237,0.04)",
                }}
              >
                <div className="mb-8 flex items-center justify-between">
                  <span
                    className="text-sm font-semibold"
                    style={{ color: "rgba(167,139,250,0.7)" }}
                  >
                    {step.number}
                  </span>

                  <div
                    className="flex h-10 w-10 items-center justify-center rounded-lg"
                    style={{
                      background: "rgba(124,58,237,0.12)",
                      border: "1px solid rgba(124,58,237,0.2)",
                    }}
                  >
                    <svg
                      width="22"
                      height="22"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="rgba(167,139,250,0.9)"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      {step.icon}
                    </svg>
                  </div>
                </div>

                <h3 className="mb-4 text-xl font-bold text-white sm:text-2xl">
                  {step.title}
                </h3>

                <p className="text-base leading-relaxed text-ink-soft">
                  {step.body}
                </p>
              </div>
            ))}
          </div>

       
        </div>
      </section>

      {/* --------------------------- Features -------------------------- */}
      <section id="features" className="relative overflow-hidden bg-bg px-4 sm:px-6 py-24 sm:py-32">
        <div
          className="glow absolute bottom-[-20%] left-[-5%] h-[700px] w-[700px]"
          style={{ background: "radial-gradient(circle, rgba(124,58,237,0.1) 0%, transparent 70%)" }}
        />
        <div className="relative z-[1] mx-auto max-w-[1600px]">
          <div className="mb-24 text-center">
            <h2 className="display text-4xl sm:text-5xl lg:text-[4.5rem]">Your trade behavior analyzed.</h2>
          </div>

          {/* Feature 1 — Detected Patterns */}
          <div className="mb-32 grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
            <div>
              <h3 className="display mb-6 text-2xl sm:text-4xl lg:text-[3.5rem]">Every trade leaves a behavioral fingerprint.</h3>
              <p className="text-lg leading-loose text-ink-soft sm:text-xl">
                Selnite flags what repeats: revenge trades, size creep, fear exits. Each with a confidence score and
                the last time it cost you.
              </p>
            </div>
            <div
              className="rounded-2xl p-8"
              style={{ border: "1px solid rgba(167,139,250,0.15)", background: "linear-gradient(135deg, rgba(10,8,15,0.95) 0%, rgba(12,8,18,0.85) 100%)" }}
            >
              <div className="section-label mb-6" style={{ color: "rgba(167,139,250,0.6)" }}>
                Detected Patterns
              </div>
              <div className="flex flex-col gap-4">
                {PATTERNS.map((p) => (
                  <div
                    key={p.name}
                    className="rounded-xl p-4"
                    style={{ border: `1px solid color-mix(in srgb, ${p.color} 20%, transparent)`, background: `color-mix(in srgb, ${p.color} 4%, transparent)` }}
                  >
                    <div className="mb-2 flex items-start justify-between">
                      <div className="flex items-center gap-2.5">
                        <span className="h-2.5 w-2.5 shrink-0 rounded-full" style={{ background: p.color }} />
                        <h4 className="text-lg font-bold text-white">{p.name}</h4>
                      </div>
                      <span className="text-lg font-bold" style={{ color: p.color }}>
                        {p.score}
                      </span>
                    </div>
                    <div className="mb-2 text-sm text-ink-faint">{p.meta}</div>
                    {p.desc && <p className="text-[15px] leading-relaxed text-ink-soft">{p.desc}</p>}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Feature 2 — Performance by hour */}
          <div className="mb-32 grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
            <div
              className="order-first rounded-2xl p-8 lg:order-none"
              style={{ border: "1px solid rgba(34,197,94,0.15)", background: "linear-gradient(135deg, rgba(8,15,8,0.95) 0%, rgba(10,18,10,0.85) 100%)" }}
            >
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <h4 className="mb-1 text-lg font-bold text-white">Performance by hour</h4>
                  <div className="text-sm text-ink-faint">Last 90 days · 214 trades</div>
                </div>
                <span className="text-sm text-ink-faint">ET</span>
              </div>
              <div className="mb-6 flex h-[120px] items-end gap-2">
                {HOURS.map((b) => (
                  <div
                    key={b.time}
                    className="min-w-5 flex-1 rounded"
                    style={{
                      height: `${b.h}%`,
                      background: `linear-gradient(to top, rgba(${b.rgb},${b.op0}), rgba(${b.rgb},${b.op1}))`,
                    }}
                  />
                ))}
              </div>
              <div className="mb-5 flex justify-between text-xs text-ink-ghost">
                {HOURS.map((b) => (
                  <span key={b.time}>{b.time}</span>
                ))}
              </div>
              <div className="border-t pt-4" style={{ borderColor: "var(--line-soft)" }}>
                <div className="mb-1 text-lg font-bold text-white">10:30 to 11:30</div>
                <div className="text-base text-ink-soft">Win 68% · Avg 2.6R</div>
                <div className="mt-1 text-sm text-ink-faint">Still sharp. 63% of your weekly P&amp;L by 11:00.</div>
              </div>
            </div>
            <div>
              <h3 className="display mb-6 text-2xl sm:text-4xl lg:text-[3.5rem]">Your edge keeps hours.</h3>
              <p className="text-lg leading-loose text-ink-soft sm:text-xl">
                You have hours where you&apos;re sharp and hours where you give it back. Selnite breaks your win rate
                and average R down by hour.
              </p>
            </div>
          </div>

          {/* Feature 3 — One rule at a time */}
          <div className="mb-32 grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
            <div>
              <h3 className="display mb-6 text-2xl sm:text-4xl lg:text-[3.5rem]">One rule at a time.</h3>
              <p className="text-lg leading-loose text-ink-soft sm:text-xl">
                Selnite waits for evidence, then turns the pattern it found into one rule you can act on.
              </p>
            </div>
            <div
              className="rounded-2xl p-8"
              style={{ border: "1px solid rgba(167,139,250,0.15)", background: "linear-gradient(135deg, rgba(10,8,15,0.95) 0%, rgba(12,8,18,0.85) 100%)" }}
            >
              <div className="section-label mb-2" style={{ color: "rgba(167,139,250,0.6)" }}>
                Psychology Insight · Jul 3
              </div>
              <h3 className="mb-5 text-xl font-bold leading-snug text-white">
                &ldquo;Your performance decreases significantly after two consecutive wins.&rdquo;
              </h3>
              <div
                className="mb-3 h-1 rounded-full"
                style={{ background: "linear-gradient(to right, rgba(34,197,94,0.8), rgba(34,197,94,0.8) 60%, rgba(255,255,255,0.1) 60%)" }}
              />
              <div className="mb-5 text-sm font-semibold text-good">91% confidence</div>
              <div
                className="mb-6 rounded-lg p-4"
                style={{ background: "rgba(124,58,237,0.08)", borderLeft: "3px solid rgba(124,58,237,0.6)" }}
              >
                <div className="mb-1.5 text-xs font-semibold" style={{ color: "rgba(124,58,237,0.6)" }}>
                  RECOMMENDATION
                </div>
                <p className="text-[15px] leading-relaxed text-ink-soft">
                  Introduce a mandatory 5-minute cooldown after winning streaks before entering the next position.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="btn-ghost pointer-events-none px-4 py-3 text-center text-base">Dismiss</div>
                <div className="btn-solid pointer-events-none px-4 py-3 text-center text-base">Apply Rule</div>
              </div>
            </div>
          </div>

          {/* Feature 4 — Behavior Score */}
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
            <div
              className="rounded-2xl p-8"
              style={{ border: "1px solid rgba(167,139,250,0.15)", background: "linear-gradient(135deg, rgba(10,8,15,0.95) 0%, rgba(12,8,18,0.85) 100%)" }}
            >
              <div className="mb-6 flex items-center justify-between">
                <h4 className="text-lg font-bold text-white">Behavior Score</h4>
                <span className="text-sm font-semibold text-good">+12pts this quarter</span>
              </div>
              <div className="mb-5 text-sm text-ink-faint">90-day trend</div>
              <div className="relative mb-5 h-[100px]">
                <svg className="h-full w-full" viewBox="0 0 400 100" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="scoreGrad" x1="0%" y1="0%" x2="0%" y2="100%">
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
                    fill="url(#scoreGrad)"
                  />
                </svg>
              </div>
              <div className="grid grid-cols-4 gap-3">
                {SCORE_STATS.map((s) => (
                  <div key={s.label} className="text-center">
                    <div className="mb-1 text-xs text-ink-faint">{s.label}</div>
                    <div className="text-2xl font-bold text-white">{s.value}</div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h3 className="display mb-6 text-2xl sm:text-4xl lg:text-[3.5rem]">Discipline compounds.</h3>
              <p className="text-lg leading-loose text-ink-soft sm:text-xl">
                One number for your discipline: consistency, emotional control, risk. It moves on evidence, not on a
                good day.
              </p>
            </div>
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

     

      {/* --------------------------- Comparison -------------------------- */}
      <section className="relative overflow-hidden bg-bg px-6 py-24">
        <div
          className="glow absolute right-[-15%] top-[20%] h-[800px] w-[800px]"
          style={{ background: "radial-gradient(circle, rgba(124,58,237,0.08) 0%, transparent 70%)" }}
        />
        <div className="relative z-[1] mx-auto max-w-[1200px]">
          <div className="mb-20 text-center">
            <h2 className="display mb-5 text-4xl sm:text-5xl lg:text-[4.5rem]">Not another passive journal.</h2>
            <p className="text-lg leading-relaxed text-ink-soft sm:text-xl">
              A journal records what you did. Selnite finds the pattern and tells you what to change.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-10 sm:grid-cols-2">
            <div>
              <div className="section-label mb-6">Most Journals</div>
              <div className="flex flex-col gap-3">
                {MOST_JOURNALS.map((t) => (
                  <div key={t} className="flex items-center gap-3 p-3">
                    <XIcon />
                    <span className="text-[17px] text-ink-soft">{t}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <div className="section-label mb-6" style={{ color: "rgba(124,58,237,0.6)" }}>
                Selnite
              </div>
              <div className="flex flex-col gap-3">
                {SELNITE_COMPARE.map((t) => (
                  <div
                    key={t}
                    className="flex items-center gap-3 rounded-md p-3"
                    style={{ background: "rgba(124,58,237,0.08)", border: "1px solid rgba(124,58,237,0.15)" }}
                  >
                    <CheckIcon />
                    <span className="text-[17px] font-semibold text-white/90">{t}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------- Trust & Methodology ------------------------- */}
      <section className="relative overflow-hidden bg-bg px-4 sm:px-6 py-24">
        <div
          className="glow absolute bottom-[-40%] right-[5%] h-[700px] w-[700px]"
          style={{ background: "radial-gradient(circle, rgba(124,58,237,0.1) 0%, transparent 70%)" }}
        />
        <div className="relative z-[1] mx-auto max-w-[1100px] text-center">
          <h2 className="display mb-8 text-4xl sm:text-5xl lg:text-[4.5rem]">Built by psychologists who trade.</h2>
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
      <section className="bg-bg-alt px-4 sm:px-6 py-24">
        <div className="mx-auto max-w-[800px] text-center">
          <h2 className="display mb-6 text-4xl sm:text-5xl lg:text-[4.5rem]">Ready to take control of your trades?</h2>
          <p className="mb-10 text-lg leading-relaxed text-ink-soft sm:text-xl">
            Stop guessing. Start understanding. Get founding access today.
          </p>
          <a href="#" className="btn-light inline-flex items-center px-14 py-4.5 text-lg">
            Get started
          </a>
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
