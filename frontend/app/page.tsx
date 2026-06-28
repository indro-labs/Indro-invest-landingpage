import SelniteMark from "./components/SelniteMark";
import HeroVideo from "./components/HeroVideo";
import HomeLink from "./components/HomeLink";
import PatternsExplorer from "./components/PatternsExplorer";
import WaitlistSection from "./components/WaitlistSection";

export default function Home() {
  return (
    <div className="relative text-ink">
      {/* ----------------------------- Hero ---------------------------- */}
      <section className="relative isolate flex min-h-screen flex-col overflow-hidden bg-[#070708] text-white">
        {/* background video — plays once, holds on the network frame, replays on logo click */}
        <HeroVideo />
        {/* darken left for legibility */}
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-black via-black/70 to-black/20" />

        {/* nav */}
        <header className="relative mx-auto flex w-full max-w-6xl items-center justify-between px-6 pt-7">
          <HomeLink className="flex items-center gap-2.5 text-white">
            <SelniteMark size={24} className="text-white" />
            <span className="text-xl font-medium tracking-tight">Selnite</span>
          </HomeLink>
          <a
            href="#waitlist"
            className="text-sm text-white/70 transition-colors hover:text-white"
          >
            Join the waitlist
          </a>
        </header>

        {/* left-aligned content, sitting low */}
        <div className="relative mx-auto flex w-full max-w-6xl flex-1 items-end px-6">
          <div className="max-w-xl pb-[16vh] pt-20">
            <h1
              className="display rise text-[2.7rem] sm:text-6xl md:text-[4.25rem]"
              style={{ animationDelay: "0ms" }}
            >
              See how you really trade.
            </h1>
            <p
              className="rise mt-6 max-w-lg text-lg md:text-xl text-white/75 leading-relaxed"
              style={{ animationDelay: "120ms" }}
            >
              Selnite takes a behavioural analysis lens to your trades. It finds
              the patterns quietly hurting you, the ones quietly paying you, and
              how you really compare to the market, so you can keep what works.
            </p>
            <div
              className="rise mt-9 flex"
              style={{ animationDelay: "240ms" }}
            >
              <a
                href="#waitlist"
                className="btn-light inline-flex items-center gap-2 px-7 py-3.5 text-base"
              >
                Join the waitlist
                <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------ The patterns ------------------------ */}
      <section>
        <div className="max-w-5xl mx-auto px-6 py-20 md:py-28">
          <h2 className="display text-2xl md:text-4xl max-w-2xl mb-4">
            The patterns underneath your trading.
          </h2>
          <p className="text-ink-soft text-lg max-w-xl mb-14 md:mb-16 leading-relaxed">
            Everything a P&amp;L can&apos;t show you: your style, your edge, your
            tells, and the habits worth keeping. The closer Selnite looks, the
            more of yourself you get back.
          </p>

          <PatternsExplorer />
        </div>
      </section>

      {/* --------------------------- Built by -------------------------- */}
      <section>
        <div className="max-w-3xl mx-auto px-6 py-20 md:py-28">
          <h2 className="display text-2xl md:text-[2.5rem] leading-[1.12] mb-7">
            We&apos;re two psychology graduates who trade, and we got tired of
            losing to ourselves.
          </h2>

          <div className="space-y-5 text-ink-soft text-lg leading-relaxed max-w-2xl">
            <p>
              We learned the hard way that the edge isn&apos;t another indicator.
              It&apos;s understanding <em>why</em> you do what you do. The revenge
              trade. The winner you cut early. The size that creeps up after a
              good week.
            </p>
            <p>
              We&apos;d both watched good traders undone by their own patterns,
              over and over, and we were done with journals that just store the
              damage. So we built the calm, honest read we always wanted for
              ourselves: no noise, no dashboards to babysit, no hype.
            </p>
            <p className="text-ink">
              Just a clear look at the patterns underneath your trading, and the
              few changes that actually move the needle.
            </p>
          </div>
        </div>
      </section>

      {/* --------------------------- Waitlist -------------------------- */}
      <section id="waitlist" className="scroll-mt-8">
        <div className="max-w-2xl mx-auto px-6 py-24 md:py-32 text-center">
          <SelniteMark size={34} className="text-accent mx-auto mb-7 breathe" />
          <h2 className="display text-3xl md:text-5xl mb-5">
            Find your patterns.
          </h2>
          <p className="text-ink-soft text-lg leading-relaxed mb-8 max-w-md mx-auto">
            We&apos;re letting traders in a little at a time. Leave your email and
            we&apos;ll reach out when there&apos;s room.
          </p>
          <WaitlistSection />
        </div>
      </section>

      {/* ---------------------------- Footer --------------------------- */}
      <footer>
        <div className="max-w-4xl mx-auto px-6 py-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
          <HomeLink className="flex items-center gap-2.5 text-ink">
            <SelniteMark size={20} className="text-accent" />
            <span className="font-medium tracking-tight">Selnite</span>
          </HomeLink>
          <p className="text-sm text-ink-faint max-w-sm sm:text-right leading-relaxed">
            Selnite is an analytics tool, not a financial advisor. We never place
            trades or touch your funds.
          </p>
        </div>
      </footer>
    </div>
  );
}
