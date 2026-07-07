import type { Metadata } from "next";
import CrystalLogo from "../components/CrystalLogo";
import HomeLink from "../components/HomeLink";
import OnboardingQuestions from "./OnboardingQuestions";

export const metadata: Metadata = {
  title: "You're in · Selnite",
  robots: { index: false },
};

/* Stripe Payment Link confirmation redirects here. */
export default function Success() {
  return (
    <div className="flex min-h-screen flex-col text-ink">
      <main className="mx-auto flex w-full max-w-xl flex-1 flex-col items-center px-6 pb-24 pt-24 text-center sm:pt-32">
        <CrystalLogo size={34} className="breathe mb-8" />

        <h1 className="display mb-4 text-4xl sm:text-5xl">You&apos;re in.</h1>

        <p className="mb-10 max-w-md text-base leading-relaxed text-ink-soft">
          Payment confirmed. You&apos;re a founding member of Selnite, and your
          first year is locked in at $99. A receipt from Stripe is already in
          your inbox.
        </p>

        <div className="mb-12 w-full text-left">
          <p className="mb-4 text-[15px] font-bold tracking-tight text-ink">What happens next</p>
          <div className="flex flex-col">
            {[
              ["Within 24 hours", "A founder emails you personally. Onboarding, not a drip campaign."],
              ["As it ships", "Dashboard access rolls out to founding members first, feature by feature."],
              ["Always", "Your feedback steers the roadmap. The founding cohort decides what ships next; you're in it."],
            ].map(([when, what]) => (
              <div key={when} className="flex gap-5 border-t border-line py-4 last:border-b">
                <span className="w-32 shrink-0 text-[13px] font-semibold text-ink">{when}</span>
                <span className="text-[14px] leading-relaxed text-ink-soft">{what}</span>
              </div>
            ))}
          </div>
        </div>

        <OnboardingQuestions />
      </main>

      <footer className="border-t border-line-soft px-6 py-8">
        <div className="mx-auto flex max-w-xl items-center justify-between">
          <HomeLink className="flex items-center gap-2.5 text-ink">
            <CrystalLogo size={16} />
            <span className="text-sm font-bold tracking-tight">Selnite</span>
          </HomeLink>
          <a
            href="mailto:info@indrolabs.ca"
            className="text-[13px] text-ink-soft transition-colors hover:text-ink"
          >
            info@indrolabs.ca
          </a>
        </div>
      </footer>
    </div>
  );
}
