import CrystalLogo from "./components/CrystalLogo";
import HomeLink from "./components/HomeLink";
import Nav from "./components/Nav";
import ProductDemo from "./components/ProductDemo";
import FeatureShowcase from "./components/FeatureShowcase";
import MarketComparison from "./components/MarketComparison";
import FoundingSignup from "./components/FoundingSignup";
import HeroNetwork from "./components/HeroNetwork";
import Principles from "./components/Principles";

export default function Home() {
  return (
    <div className="relative text-ink">
      <Nav />

      {/* ----------------------------- Hero ---------------------------- */}
      <section className="relative w-full overflow-hidden">
        <div className="hero-atmosphere" aria-hidden="true">
          <HeroNetwork />
        </div>
        <div className="relative z-10 mx-auto max-w-6xl px-6 pt-20 md:pt-28">
          {/* copy — left aligned, Obsidian style */}
          <div className="max-w-3xl">
            <h1 className="display mb-5 text-balance text-[2rem] leading-[1.12] sm:text-[2.5rem] md:text-[2.9rem]">
              Trade smarter by understanding your behavioral patterns.
            </h1>
            <p className="mb-9 max-w-xl text-lg leading-relaxed text-ink-soft sm:text-xl">
              Selnite finds the hidden pattern costing you money, then gives you a clear
              rule to catch it before your next trade.
            </p>

            <div className="flex items-center gap-6">
              <a
                href="/join"
                className="btn-solid inline-flex items-center px-6 py-3.5 text-base"
              >
                Get founding access
              </a>
              <a
                href="#preview"
                className="text-base font-semibold text-accent transition-opacity hover:opacity-80"
              >
                See it in action
              </a>
            </div>

            <p className="mt-6 text-[13px] text-ink-faint">
              127 traders on the waitlist ·{" "}
              <span className="font-semibold text-ink">10 founding seats left.</span>
            </p>
          </div>

          {/* demo pulled up into the hero, cropped so it peeks like Obsidian's */}
          <div id="preview" className="relative mt-14 scroll-mt-20 md:mt-20">
            <div className="hero-demo-crop">
              <ProductDemo />
            </div>
          </div>
        </div>
      </section>

      {/* --------------------- Feature showcase --------------------- */}
      <section id="features" className="scroll-mt-8 px-6 py-28 md:py-36">
        <div className="mx-auto max-w-5xl">
          <div className="mb-16 text-center">
            <h2 className="display mb-4 text-3xl sm:text-[2.5rem]">
              Your losses aren&apos;t random.
            </h2>
            <p className="mx-auto max-w-xl text-base leading-relaxed text-ink-soft">
              Most of your losses trace back to one pattern that keeps repeating. Selnite
              finds it, then gives you a simple rule to break it before your next trade.
            </p>
          </div>
          <FeatureShowcase />
        </div>
      </section>

      {/* --------------------------- Principles -------------------------- */}
      <section id="principles" className="scroll-mt-8 bg-bg-sunk px-6 py-28 md:py-36">
        <div className="mx-auto max-w-5xl">
          <div className="mb-14 max-w-xl">
            <h2 className="display mb-5 text-3xl sm:text-[2.5rem]">
              What we stand for.
            </h2>
            <p className="max-w-sm text-base leading-relaxed text-ink-soft">
              You&apos;re trusting us with private data and honest feedback on how you
              trade. These are the standards we hold ourselves to.
            </p>
          </div>
          <Principles />
        </div>
      </section>

      {/* --------------------------- About -------------------------- */}
      <section id="about" className="px-6 py-28 md:py-36">
        <div className="mx-auto max-w-4xl">
          <div className="mb-16 text-center">
            <h2 className="display mb-4 text-3xl sm:text-[2.5rem]">
              Built by psychology grads who trade.
            </h2>
            <p className="mx-auto max-w-xl text-base leading-relaxed text-ink-soft">
              We&apos;re two psychology graduates who trade, and we got tired of losing
              to our patterns. The biggest edge wasn&apos;t a better strategy. It was
              understanding how we trade.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-10 border-t border-line pt-14 lg:grid-cols-[1fr_2fr] lg:gap-14">
            <div>
              <h3 className="text-xl font-bold leading-snug tracking-tight text-ink sm:text-2xl">
                Self-awareness is the most durable edge in markets.
              </h3>
            </div>
            <div className="space-y-5 text-base leading-loose text-ink-soft">
              <p>
                So we built Selnite. We&apos;re changing the trader&apos;s journal from a
                reactive record into a proactive practice.
              </p>
              <p>
                A journal shouldn&apos;t just log what happened. It should find what&apos;s
                quietly hurting you and get you ready for the next trade.
              </p>
              <p>
                We hope Selnite helps you on your journey as much as it&apos;s helped us
                on ours.
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
              Not another passive journal.
            </h2>
            <p className="mx-auto max-w-md text-base text-ink-soft">
              A journal records what you did. Selnite finds the pattern and tells you
              what to change.
            </p>
          </div>
          <MarketComparison />
        </div>
      </section>

      {/* --------------------------- Founding Member CTA -------------------------- */}
      <section id="founding" className="scroll-mt-8 px-6 py-28 md:py-36">
        <div className="mx-auto max-w-xl text-center">
          <h2 className="display mb-4 text-4xl sm:text-5xl">
            One trade pays
            <br />
            for the year.
          </h2>

          <p className="mx-auto mb-10 max-w-md text-base leading-relaxed text-ink-soft">
            Founding members get Selnite&apos;s first year for $99, not the $299 it costs
            at launch. That&apos;s $8.25 a month. Skip one revenge trade and it&apos;s
            already paid for itself.
          </p>

          <div
            className="surface mx-auto mb-6 flex max-w-sm items-center justify-center gap-4 rounded-[20px] px-8 py-7"
            style={{ boxShadow: "var(--shadow)" }}
          >
            <span className="text-2xl font-semibold text-ink-faint line-through">$299</span>
            <span className="display text-5xl text-ink">
              $99<span className="text-lg font-medium text-ink-soft"> first year</span>
            </span>
          </div>

          <p className="mx-auto mb-9 max-w-sm text-[13px] leading-relaxed text-ink-faint">
            <span className="font-semibold text-ink">10 founding seats left.</span> Plus a
            direct line to the founders and first access as the dashboard ships.
          </p>

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
              <CrystalLogo size={18} />
              <span className="text-sm font-bold tracking-tight">Selnite</span>
              <span className="text-[13px] text-ink-faint">·</span>
              <span className="text-[13px] text-ink-faint">Behavioral Intelligence for Traders</span>
            </HomeLink>
            <div className="flex items-center gap-7">
              <a href="/privacy" className="text-[13px] text-ink-soft transition-colors hover:text-ink">Privacy</a>
              <a href="/terms" className="text-[13px] text-ink-soft transition-colors hover:text-ink">Terms</a>
              <a href="mailto:info@indrolabs.ca" className="text-[13px] text-ink-soft transition-colors hover:text-ink">Contact</a>
              <span className="text-[13px] text-ink-faint">© 2026 Selnite</span>
            </div>
          </div>
          <div className="flex max-w-lg flex-col gap-2">
            <p className="text-sm leading-relaxed text-ink-faint">
              Selnite is an analytics tool, not a financial advisor. We never place trades
              or touch your funds. The dashboard is in active development, and founding
              members get access as it ships.
            </p>
            <p className="text-[12px] leading-relaxed text-ink-faint">
              Selnite is operated by Indro Labs Inc., a Canadian corporation based in
              Calgary, Alberta.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
