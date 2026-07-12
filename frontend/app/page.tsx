import SelniteMark from "./components/SelniteMark";
import HomeLink from "./components/HomeLink";
import Nav from "./components/Nav";
import ProductDemo from "./components/ProductDemo";
import FeatureShowcase from "./components/FeatureShowcase";
import MarketComparison from "./components/MarketComparison";
import FoundingSignup, { STRIPE_PAYMENT_LINK } from "./components/FoundingSignup";
import HeroNetwork from "./components/HeroNetwork";

/* Three rules we don't break. Stated plainly, no sermon. */
const PRINCIPLES = [
  {
    title: "Private by design.",
    body: "Your journal, your patterns, your worst days. We never touch your funds, never see your broker credentials, and never sell your data.",
  },
  {
    title: "Science, not superstition.",
    body: "Every insight carries a confidence score grounded in behavioral finance research. If we can't measure it, we don't say it.",
  },
  {
    title: "Built in the open.",
    body: "The dashboard is in active development with founding members inside. What you see here is the real design with sample data, and the people inside decide what ships next.",
  },
];

const BENEFITS = [
  {
    title: "$99/year, forever",
    body: "Your founding price never rises while you're a member. Not at launch, not ever.",
  },
  {
    title: "A seat at the table",
    body: "Founding members talk directly with the founders and vote on what gets built next.",
  },
  {
    title: "First through the door",
    body: "The dashboard ships to founding members first. Every feature, before anyone else.",
  },
];

export default function Home() {
  return (
    <div className="relative text-ink">
      <Nav />

      {/* ----------------------------- Hero ---------------------------- */}
      <section className="relative min-h-[calc(100dvh-3.75rem)] w-full overflow-hidden">
        <div className="hero-atmosphere" aria-hidden="true">
          <HeroNetwork />
        </div>
        <div className="relative z-10 mx-auto flex min-h-[calc(100dvh-3.75rem)] max-w-6xl flex-col items-center justify-center px-6 py-16 text-center">
          <h1 className="display mb-6 max-w-3xl text-[2.75rem] sm:text-6xl md:text-[4.4rem]">
          Sharpen your
          <br />
          trading edge.
        </h1>

        <p className="mb-11 max-w-xl text-lg leading-relaxed text-ink-soft">
          The market doesn&apos;t beat most traders. They beat themselves. Selnite is
          the private behavioral platform for serious traders. It studies how you trade
          and shows you the trader underneath.
        </p>

        <div className="mb-8 flex flex-col items-center gap-3 sm:flex-row">
          <a href={STRIPE_PAYMENT_LINK} className="btn-solid inline-flex items-center gap-2 px-8 py-3.5 text-base">
            Get founding access
            <span aria-hidden="true">→</span>
          </a>
          <a href="#preview" className="btn-ghost inline-flex items-center px-8 py-3.5 text-base">
            See it in action
          </a>
        </div>

        <p className="text-[13px] text-ink-faint">
          127 traders on the waitlist. 10 founding member spots remaining.
        </p>
        </div>
      </section>

      {/* ------------------------ Interactive demo ------------------------ */}
      <section id="preview" className="relative mx-auto max-w-6xl scroll-mt-8 px-6 pb-32 pt-24 md:pb-40 md:pt-32">
        <div className="mb-14 text-center">
          <h2 className="display mb-5 text-3xl sm:text-[2.4rem]">See what Selnite sees.</h2>
          <p className="mx-auto max-w-xl text-base leading-relaxed text-ink-soft">
            Your behavioral dashboard — patterns, mood, and insights in one place.
          </p>
        </div>
        <ProductDemo />
      </section>

      {/* --------------------- Feature showcase --------------------- */}
      <section id="features" className="scroll-mt-8 px-6 py-28 md:py-36">
        <div className="mx-auto max-w-5xl">
          <div className="mb-16 text-center">
            <h2 className="display mb-4 text-3xl sm:text-[2.5rem]">Trade the process.</h2>
            <p className="mx-auto max-w-xl text-base leading-relaxed text-ink-soft">
              Most losses come from broken process, not broken strategy. Selnite makes
              discipline measurable — routines, session timing, pattern detection, mood
              tracking, and behavioral scoring across your history.
            </p>
          </div>
          <FeatureShowcase />
        </div>
      </section>

      {/* --------------------------- Principles -------------------------- */}
      <section id="principles" className="scroll-mt-8 bg-bg-sunk px-6 py-28 md:py-36">
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-12 lg:grid-cols-[1fr_1.5fr] lg:gap-20">
          <div>
            <h2 className="display mb-5 text-3xl sm:text-[2.5rem]">
              Your psychology
              <br />
              is yours.
            </h2>
            <p className="max-w-sm text-base leading-relaxed text-ink-soft">
              It&apos;s the one edge nobody can copy, so Selnite is built on three
              rules we don&apos;t break.
            </p>
          </div>
          <div className="flex flex-col justify-center">
            {PRINCIPLES.map((p) => (
              <div key={p.title} className="grid gap-2 border-t border-line py-6 last:border-b sm:grid-cols-[200px_1fr] sm:gap-6">
                <h3 className="text-[16px] font-bold tracking-tight text-ink">{p.title}</h3>
                <p className="text-[15px] leading-relaxed text-ink-soft">{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --------------------------- About -------------------------- */}
      <section id="about" className="px-6 py-28 md:py-36">
        <div className="mx-auto max-w-4xl">
          <div className="mb-16 text-center">
            <h2 className="display mb-4 text-3xl sm:text-[2.5rem]">
              Built by psychologists who trade.
            </h2>
            <p className="mx-auto max-w-xl text-base leading-relaxed text-ink-soft">
              We&apos;re two psychology graduates who trade, and we got tired of losing to
              ourselves. We spent years studying behavioral economics and cognitive
              psychology, then started trading. The biggest edge wasn&apos;t a better
              strategy. It was understanding ourselves.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-10 border-t border-line pt-14 lg:grid-cols-[1fr_2fr] lg:gap-14">
            <div>
              <p className="mb-3.5 text-xs font-semibold uppercase tracking-wide text-ink-faint">
                Our belief
              </p>
              <h3 className="text-xl font-bold leading-snug tracking-tight text-ink sm:text-2xl">
                Self-awareness is the most durable edge in markets.
              </h3>
            </div>
            <div className="space-y-5 text-base leading-loose text-ink-soft">
              <p>
                Your biases, your triggers, your tendencies: they&apos;re entirely yours.
                They can be studied. They can be improved. And unlike any other edge,
                they compound the longer you work on them.
              </p>
              <p>
                Selnite exists to make that work systematic, measurable, and actionable.
                Not motivational. Not journaling for the sake of it. Rigorous behavioral
                analysis, the kind institutional desks run on their traders, now available
                to anyone who takes themselves seriously.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------ Market comparison ------------------------ */}
      <section id="compare" className="scroll-mt-8 bg-bg-sunk px-6 py-28 md:py-36">
        <div className="mx-auto max-w-4xl">
          <div className="mb-12 text-center">
            <h2 className="display mb-3 text-3xl sm:text-[2.5rem]">
              The market tracks trades.
              <br />
              Selnite tracks you.
            </h2>
            <p className="mx-auto max-w-md text-base text-ink-soft">
              Most tools measure the market. Selnite measures you.
            </p>
          </div>
          <MarketComparison />
        </div>
      </section>

      {/* --------------------------- Founding Member CTA -------------------------- */}
      <section id="founding" className="relative scroll-mt-8 px-6 py-28 md:py-36">
        <div className="glow" aria-hidden="true" />
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="display mb-4 text-4xl sm:text-5xl">
            You&apos;re early.
            <br />
            That matters.
          </h2>

          <p className="mx-auto mb-10 max-w-lg text-base leading-relaxed text-ink-soft">
            The dashboard is being built right now, with founding members inside it.
            What you&apos;re buying today is the seat: the lowest price Selnite will
            ever have, locked for life, and a say in what gets built. 127 traders
            are on the waitlist. 10 founding member spots remain. When they&apos;re
            gone, this price is gone.
          </p>

          <div className="surface mb-8 inline-flex flex-col items-center rounded-[20px] px-8 py-8 sm:px-12" style={{ boxShadow: "var(--shadow)" }}>
            <div className="mb-3 flex items-center gap-4">
              <span className="text-2xl font-semibold text-ink-faint line-through">$299/yr</span>
              <span className="display text-4xl text-ink sm:text-5xl">
                $99<span className="text-xl font-medium text-ink-soft">/yr</span>
              </span>
            </div>
            <p className="max-w-xs text-sm leading-relaxed text-ink-soft">
              Locked for as long as you stay. That&apos;s $8.25 a month, and one
              avoided revenge trade pays for the year.
            </p>
          </div>

          <div className="mb-12 grid grid-cols-1 gap-x-8 gap-y-8 text-left sm:grid-cols-3">
            {BENEFITS.map((b) => (
              <div key={b.title} className="border-t border-line pt-4">
                <h4 className="mb-1.5 text-[15px] font-bold tracking-tight text-ink">{b.title}</h4>
                <p className="text-[13px] leading-relaxed text-ink-soft">{b.body}</p>
              </div>
            ))}
          </div>

          <div id="signup">
            <FoundingSignup />
          </div>
        </div>
      </section>

      {/* ---------------------------- Footer --------------------------- */}
      <footer className="px-6 py-14">
        <div className="mx-auto flex max-w-5xl flex-col gap-6">
          <div className="flex flex-col items-start justify-between gap-5 sm:flex-row sm:items-center">
            <HomeLink className="flex items-center gap-2.5 text-ink">
              <SelniteMark size={18} className="text-accent" />
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
            Selnite is an analytics tool, not a financial advisor. We never place trades
            or touch your funds. The dashboard is in active development, and founding
            members get access as it ships.
          </p>
        </div>
      </footer>
    </div>
  );
}
