import SelniteMark from "./components/SelniteMark";
import HomeLink from "./components/HomeLink";
import Nav from "./components/Nav";
import HeroEmailCapture from "./components/HeroEmailCapture";
import ProductDemo from "./components/ProductDemo";
import WaitlistSection from "./components/WaitlistSection";

const STEPS = [
  {
    n: "01",
    title: "Connect your trades",
    body: "Import from your broker or log manually. Selnite maps every entry, exit, and decision to a behavioral timestamp.",
  },
  {
    n: "02",
    title: "Tag your psychology",
    body: "Log your emotional state before and after each trade. Selnite learns your patterns with each entry.",
  },
  {
    n: "03",
    title: "Receive insights",
    body: "Selnite surfaces behavioral patterns with confidence scores — fear exits, overconfidence, revenge trading, rule violations.",
  },
  {
    n: "04",
    title: "Grow your discipline",
    body: "Apply recommendations to your playbook. Track your Behavior Score and see compounding psychological gains.",
    dark: true,
  },
];

const PATTERNS = [
  { name: "Revenge Trading", score: "83%", meta: "Last: 2d ago", trend: "↑ High", color: "var(--bad)" },
  { name: "Overconfidence", score: "91%", meta: "Last: 2d ago", trend: "→ Stable", color: "var(--info)" },
  { name: "Late Entries", score: "54%", meta: "Last: 9d ago", trend: "↓ Improving", color: "var(--good)" },
];

const CHECKS_1 = [
  "Revenge trading, fear exits, overconfidence detection",
  "Sparkline trend per pattern with last occurrence date",
  "Statistical confidence scores — not intuition, not labels",
];

const CHECKS_2 = [
  "Grounded in cognitive bias research, not trading lore",
  "Actionable recommendations you can apply immediately",
  "Confidence-scored — never a vague “you seemed emotional”",
];

const BENEFITS = [
  {
    title: "Founding price locked",
    body: "CA$19/mo for as long as you stay. Never rises while you're a member.",
    icon: (
      <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
    ),
  },
  {
    title: "Direct founder access",
    body: "Your feedback shapes what gets built. We actually respond.",
    icon: (
      <>
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </>
    ),
  },
  {
    title: "Early feature access",
    body: "First access to every new feature before public release.",
    icon: (
      <>
        <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
        <polyline points="16 7 22 7 22 13" />
      </>
    ),
  },
];

function Check() {
  return (
    <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-[5px] border border-line bg-bg-sunk">
      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="2.5">
        <polyline points="20 6 9 17 4 12" />
      </svg>
    </div>
  );
}

export default function Home() {
  return (
    <div className="relative text-ink">
      <Nav />

      {/* ----------------------------- Hero ---------------------------- */}
      <section className="mx-auto flex max-w-6xl flex-col items-center px-6 pb-14 pt-16 text-center sm:pt-20 md:pb-18 md:pt-24">
        <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-line bg-bg-sunk px-4 py-1.5">
          <span className="pulse-dot h-1.5 w-1.5 rounded-full bg-good" />
          <span className="text-xs font-semibold text-[#2a2a2a]">Now accepting Founding Members</span>
          <span className="text-xs text-ink-faint">·</span>
          <span className="text-xs text-ink-soft">Limited to 500 seats</span>
        </div>

        <h1 className="display mb-6 max-w-3xl text-[2.75rem] sm:text-6xl md:text-[4.6rem]">
          The behavioral intelligence
          <br />
          platform for serious traders.
        </h1>

        <p className="mb-11 max-w-lg text-lg leading-relaxed text-ink-soft">
          Selnite identifies the psychological patterns behind your trades — not just what you
          did, but why. Built by psychologists, for disciplined traders.
        </p>

        <HeroEmailCapture />
        <p className="text-[13px] text-ink-faint">
          <span className="font-medium text-ink-soft">847 traders</span> already on the waitlist
        </p>
      </section>

      {/* ------------------------ Interactive demo ------------------------ */}
      <section className="mx-auto max-w-6xl px-6 pb-20 md:pb-24">
        <div className="mb-9 text-center">
          <p className="section-label mb-3">Product Preview</p>
          <h2 className="display mb-3 text-3xl sm:text-[2.4rem]">Watch Selnite think.</h2>
          <p className="mx-auto max-w-md text-base text-ink-soft">
            A behavioral session analysis — 90 days of psychology data, distilled in real time.
          </p>
        </div>
        <ProductDemo />
      </section>

      {/* --------------------------- How it works -------------------------- */}
      <section id="how-it-works" className="bg-bg-sunk px-6 py-20 md:py-24">
        <div className="mx-auto max-w-5xl">
          <div className="mb-14 text-center">
            <p className="section-label mb-3">Process</p>
            <h2 className="display mb-3 text-3xl sm:text-[2.5rem]">Built on behavioral science.</h2>
            <p className="mx-auto max-w-md text-base leading-relaxed text-ink-soft">
              Most traders track P&amp;L. Selnite tracks the decisions behind it.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-0.5">
            {STEPS.map((step, i) => (
              <div
                key={step.n}
                className={`rounded-2xl border border-line p-8 lg:rounded-none ${
                  i === 0 ? "lg:rounded-l-2xl" : ""
                } ${i === STEPS.length - 1 ? "lg:rounded-r-2xl lg:border-l-0" : "lg:border-l-0"} ${
                  step.dark ? "border-ink bg-ink" : "bg-white"
                } ${i === 1 || i === 2 ? "lg:border-l-0" : ""}`}
              >
                <div
                  className={`mb-7 flex h-9 w-9 items-center justify-center rounded-lg ${
                    step.dark ? "bg-white/10" : "bg-ink"
                  }`}
                >
                  <span className="text-[13px] font-bold text-white">{step.n}</span>
                </div>
                <h3
                  className={`mb-3 text-lg font-bold tracking-tight ${
                    step.dark ? "text-white" : "text-ink"
                  }`}
                >
                  {step.title}
                </h3>
                <p className="text-[15px] leading-relaxed text-ink-soft">{step.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --------------------------- Features -------------------------- */}
      <section id="features" className="px-6 py-20 md:py-24">
        <div className="mx-auto max-w-5xl">
          <div className="mb-16 text-center">
            <p className="section-label mb-3">Features</p>
            <h2 className="display mb-3 text-3xl sm:text-[2.5rem]">Every layer of your psychology.</h2>
            <p className="mx-auto max-w-md text-base leading-relaxed text-ink-soft">
              Selnite doesn&apos;t track your P&amp;L. It tracks the decisions behind it.
            </p>
          </div>

          {/* Feature 1 — Pattern Detection */}
          <div className="mb-20 grid items-center gap-12 lg:grid-cols-2 lg:gap-18">
            <div>
              <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-bg-sunk px-3.5 py-1.5">
                <span className="h-[5px] w-[5px] rounded-full bg-bad" />
                <span className="text-[11px] font-semibold tracking-wide text-[#2a2a2a]">
                  Pattern Detection
                </span>
              </div>
              <h3 className="display mb-4 text-[1.7rem] leading-tight sm:text-3xl">
                Identify your recurring behavioral failures.
              </h3>
              <p className="mb-7 text-base leading-relaxed text-ink-soft">
                Selnite continuously monitors your trading behavior and flags statistically
                significant patterns — not guesses. Each pattern carries a confidence percentage,
                trend direction, and last occurrence.
              </p>
              <div className="flex flex-col gap-3.5">
                {CHECKS_1.map((c) => (
                  <div key={c} className="flex items-center gap-2.5">
                    <Check />
                    <span className="text-[15px] text-[#2a2a2a]">{c}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-2xl border border-line bg-[#f8f8f8] p-7">
              <p className="mb-4.5 text-[11px] font-semibold uppercase tracking-wide text-ink-soft">
                Pattern Detection
              </p>
              <div className="flex flex-col gap-2.5">
                {PATTERNS.map((p) => (
                  <div
                    key={p.name}
                    className="flex items-center gap-3 rounded-[10px] border border-line-soft bg-white px-4 py-3.5"
                  >
                    <div
                      className="flex h-[34px] w-[34px] shrink-0 items-center justify-center rounded-[7px]"
                      style={{ background: `color-mix(in srgb, ${p.color} 12%, white)` }}
                    >
                      <span className="h-2 w-2 rounded-full" style={{ background: p.color }} />
                    </div>
                    <div className="flex-1">
                      <div className="mb-1 flex items-center justify-between">
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
                ))}
              </div>
            </div>
          </div>

          {/* Feature 2 — Psychology Insights */}
          <div className="mb-20 grid items-center gap-12 lg:grid-cols-2 lg:gap-18">
            <div className="order-first rounded-2xl bg-ink p-8 lg:order-none">
              <div className="mb-6 flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-good" />
                <span className="text-[10px] font-semibold uppercase tracking-wide text-[#555]">
                  Psychology Insight
                </span>
              </div>
              <p className="mb-5 text-lg font-semibold leading-relaxed text-white">
                &ldquo;Your performance decreases significantly after two consecutive wins.&rdquo;
              </p>
              <div className="mb-5 flex items-center gap-2.5">
                <div className="h-[3px] flex-1 rounded-full bg-[#2a2a2a]">
                  <div className="h-full w-[91%] rounded-full bg-good" />
                </div>
                <span className="whitespace-nowrap text-[13px] font-semibold text-good">
                  91% confidence
                </span>
              </div>
              <div className="mb-5 rounded-[10px] bg-[#1a1a1a] px-5 py-4.5">
                <p className="mb-2 text-[10px] font-semibold uppercase tracking-wide text-[#555]">
                  Recommendation
                </p>
                <p className="text-sm leading-relaxed text-[#aaaaaa]">
                  Introduce a mandatory 5-minute cooldown after winning streaks before entering the
                  next position.
                </p>
              </div>
              <div className="flex gap-2.5">
                <div className="flex-1 rounded-lg bg-[#1a1a1a] py-2.5 text-center">
                  <span className="text-sm font-medium text-ink-soft">Dismiss</span>
                </div>
                <div className="flex-1 rounded-lg bg-white py-2.5 text-center">
                  <span className="text-sm font-semibold text-ink">Apply Rule</span>
                </div>
              </div>
            </div>
            <div>
              <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-bg-sunk px-3.5 py-1.5">
                <span className="h-[5px] w-[5px] rounded-full bg-good" />
                <span className="text-[11px] font-semibold tracking-wide text-[#2a2a2a]">
                  Psychology Insights
                </span>
              </div>
              <h3 className="display mb-4 text-[1.7rem] leading-tight sm:text-3xl">
                Your AI behavioral analyst. Always watching.
              </h3>
              <p className="mb-7 text-base leading-relaxed text-ink-soft">
                Selnite&apos;s insight engine is trained on behavioral finance research and your
                personal trading history. It doesn&apos;t react to single trades — it identifies
                deeply embedded cognitive patterns invisible to you.
              </p>
              <div className="flex flex-col gap-3.5">
                {CHECKS_2.map((c) => (
                  <div key={c} className="flex items-center gap-2.5">
                    <Check />
                    <span className="text-[15px] text-[#2a2a2a]">{c}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Feature 3 — Behavior Score */}
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-18">
            <div>
              <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-bg-sunk px-3.5 py-1.5">
                <span className="h-[5px] w-[5px] rounded-full bg-info" />
                <span className="text-[11px] font-semibold tracking-wide text-[#2a2a2a]">
                  Behavior Score
                </span>
              </div>
              <h3 className="display mb-4 text-[1.7rem] leading-tight sm:text-3xl">
                A single number that measures your discipline.
              </h3>
              <p className="mb-7 text-base leading-relaxed text-ink-soft">
                The Behavior Score is Selnite&apos;s composite measure of your psychological
                fitness — consistency, emotional control, risk discipline, and rule adherence.
                Track it over time. Watch it compound.
              </p>
              <div className="rounded-xl bg-bg-sunk px-6.5 py-5.5">
                <div className="grid grid-cols-3 gap-6">
                  <div>
                    <p className="mb-1.5 text-[10px] uppercase tracking-wide text-ink-soft">
                      Consistency
                    </p>
                    <p className="text-2xl font-bold tracking-tight text-ink">
                      87<span className="text-[13px] text-ink-soft">/100</span>
                    </p>
                  </div>
                  <div>
                    <p className="mb-1.5 text-[10px] uppercase tracking-wide text-ink-soft">
                      Risk Discipline
                    </p>
                    <p className="text-2xl font-bold tracking-tight text-ink">
                      91<span className="text-[13px] text-ink-soft">/100</span>
                    </p>
                  </div>
                  <div>
                    <p className="mb-1.5 text-[10px] uppercase tracking-wide text-ink-soft">
                      Overall
                    </p>
                    <p className="text-2xl font-bold tracking-tight text-ink">A–</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="rounded-2xl border border-line bg-[#f8f8f8] p-7">
              <div className="mb-5 flex items-start justify-between">
                <div>
                  <p className="mb-1 text-[13px] font-semibold text-ink">Emotional Consistency</p>
                  <p className="text-[11px] text-ink-soft">90-day behavioral trend</p>
                </div>
                <span className="text-sm font-bold text-good">+12pts this quarter</span>
              </div>
              <svg viewBox="0 0 500 120" preserveAspectRatio="none" className="h-[120px] w-full">
                <line x1="0" y1="25" x2="500" y2="25" stroke="#ebebeb" strokeWidth="1" />
                <line x1="0" y1="65" x2="500" y2="65" stroke="#ebebeb" strokeWidth="1" />
                <line x1="0" y1="105" x2="500" y2="105" stroke="#ebebeb" strokeWidth="1" />
                <defs>
                  <linearGradient id="featGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#111" stopOpacity="0.05" />
                    <stop offset="100%" stopColor="#111" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <polygon
                  points="0,90 70,78 130,82 200,60 260,65 320,88 380,72 440,52 500,40 500,120 0,120"
                  fill="url(#featGrad)"
                />
                <polyline
                  points="0,90 70,78 130,82 200,60 260,65 320,88 380,72 440,52 500,40"
                  fill="none"
                  stroke="#111"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <circle cx="200" cy="60" r="4" fill="#111" />
                <circle cx="500" cy="40" r="4" fill="#111" />
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* --------------------------- About -------------------------- */}
      <section id="about" className="bg-ink px-6 py-20 md:py-24">
        <div className="mx-auto max-w-4xl">
          <div className="mb-16 text-center">
            <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-[#555]">About</p>
            <h2 className="display mb-4 text-3xl text-white sm:text-[2.5rem]">
              Built by psychologists who trade.
            </h2>
            <p className="mx-auto max-w-xl text-base leading-relaxed text-ink-soft">
              We&apos;re two psychology graduates who trade, and we got tired of losing to
              ourselves. We spent years studying behavioral economics and cognitive psychology —
              then started trading. What we found was that the biggest edge wasn&apos;t in a
              better strategy. It was in understanding ourselves.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-10 border-t border-[#222] pt-14 lg:grid-cols-[1fr_2fr] lg:gap-14">
            <div>
              <p className="mb-3.5 text-xs font-semibold uppercase tracking-wide text-[#555]">
                Our belief
              </p>
              <h3 className="text-xl font-bold leading-snug tracking-tight text-white sm:text-2xl">
                Self-awareness is the most durable edge in markets.
              </h3>
            </div>
            <div className="space-y-5 text-base leading-loose text-ink-soft">
              <p>
                Strategies get crowded. Information gets commoditized. But your psychology — your
                specific set of biases, triggers, and behavioral tendencies — is entirely yours.
                It can be studied. It can be improved. And unlike any other edge, it compounds the
                longer you work on it.
              </p>
              <p>
                Selnite exists to make that work systematic, measurable, and actionable. Not
                motivational. Not journaling for the sake of it. Rigorous behavioral analysis —
                the kind institutional traders have access to, now available to every disciplined
                trader who takes themselves seriously.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* --------------------------- Founding Member CTA -------------------------- */}
      <section id="founding" className="scroll-mt-8 px-6 py-20 md:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-line bg-bg-sunk px-4 py-1.5">
            <span className="pulse-dot h-1.5 w-1.5 rounded-full bg-good" />
            <span className="text-xs font-semibold text-[#2a2a2a]">
              Founding Member Access · 500 seats only
            </span>
          </div>

          <h2 className="display mb-4 text-4xl sm:text-5xl">
            You&apos;re early.
            <br />
            That matters.
          </h2>

          <div className="mb-6 inline-flex flex-col items-center rounded-[20px] border border-line-soft bg-bg-sunk px-8 py-8 sm:px-12">
            <div className="mb-2 flex items-center gap-4">
              <span className="text-2xl font-semibold text-ink-faint line-through">CA$49/mo</span>
              <span className="text-4xl font-extrabold tracking-tight text-ink sm:text-5xl">
                CA$19<span className="text-xl font-medium text-ink-soft">/mo</span>
              </span>
            </div>
            <div className="mb-3.5 inline-flex items-center rounded-full bg-ink px-3.5 py-1">
              <span className="text-[11px] font-bold tracking-wide text-white">
                61% off regular price
              </span>
            </div>
            <p className="max-w-xs text-sm leading-relaxed text-ink-soft">
              Most traders make this back within a single improved decision. One avoided revenge
              trade. One disciplined exit. That&apos;s it.
            </p>
          </div>

          <p className="mx-auto mb-12 max-w-lg text-base leading-relaxed text-ink-soft">
            Founding members get priority onboarding, direct access to the founders, a voice in
            the roadmap — and the lowest price Selnite will ever be. This rate disappears when we
            launch publicly.
          </p>

          <div className="mb-12 grid grid-cols-1 gap-3.5 text-left sm:grid-cols-3">
            {BENEFITS.map((b) => (
              <div key={b.title} className="rounded-xl bg-bg-sunk p-5.5">
                <div className="mb-3.5 flex h-8 w-8 items-center justify-center rounded-lg bg-ink">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2">
                    {b.icon}
                  </svg>
                </div>
                <h4 className="mb-1.5 text-[15px] font-bold tracking-tight text-ink">{b.title}</h4>
                <p className="text-[13px] leading-relaxed text-ink-soft">{b.body}</p>
              </div>
            ))}
          </div>

          <div id="waitlist">
            <SelniteMark size={30} className="breathe mx-auto mb-6 text-accent" />
            <WaitlistSection />
          </div>
        </div>
      </section>

      {/* ---------------------------- Footer --------------------------- */}
      <footer className="border-t border-line-soft px-6 py-10">
        <div className="mx-auto flex max-w-5xl flex-col gap-6">
          <div className="flex flex-col items-start justify-between gap-5 sm:flex-row sm:items-center">
            <HomeLink className="flex items-center gap-2.5 text-ink">
              <SelniteMark size={18} />
              <span className="text-sm font-bold tracking-tight">Selnite</span>
              <span className="text-[13px] text-ink-faint">·</span>
              <span className="text-[13px] text-ink-faint">Behavioral Intelligence for Traders</span>
            </HomeLink>
            <div className="flex items-center gap-7">
              <span className="text-[13px] text-ink-soft">Privacy</span>
              <span className="text-[13px] text-ink-soft">Terms</span>
              <span className="text-[13px] text-ink-soft">Contact</span>
              <span className="text-[13px] text-ink-faint">© 2026 Selnite</span>
            </div>
          </div>
          <p className="max-w-lg text-sm leading-relaxed text-ink-faint">
            Selnite is an analytics tool, not a financial advisor. We never place trades or touch
            your funds.
          </p>
        </div>
      </footer>
    </div>
  );
}
