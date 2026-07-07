/**
 * Founding checkout. Payment runs through a Stripe Payment Link:
 * product "Selnite Founding Membership", $99 first year, with the
 * confirmation page set to redirect to /success on this site.
 *
 * Set the real link via the NEXT_PUBLIC_STRIPE_PAYMENT_LINK env var
 * (locally in .env.local, and in Netlify's environment variables).
 * The placeholder fallback keeps the site building until it's set.
 */
export const STRIPE_PAYMENT_LINK =
  process.env.NEXT_PUBLIC_STRIPE_PAYMENT_LINK ??
  "https://buy.stripe.com/REPLACE_WITH_YOUR_LINK";

export default function FoundingSignup() {
  return (
    <div className="mx-auto max-w-md">
      <a
        href="/join"
        className="btn-solid inline-flex w-full items-center justify-center gap-2 px-8 py-4 text-base sm:w-auto sm:px-12"
      >
        Lock in $99 for year one
        <span aria-hidden="true">→</span>
      </a>

      <p className="mt-4 text-sm leading-relaxed text-ink-soft">
        Secure checkout by Stripe. Your email and a card, nothing else. If
        you&apos;re not satisfied, one email gets you a full refund.
      </p>
      <p className="mt-2 text-[13px] text-ink-faint">
        Want to ask something first?{" "}
        <a href="mailto:info@indrolabs.ca" className="underline decoration-ink-faint underline-offset-2 transition-colors hover:text-ink">
          info@indrolabs.ca
        </a>
      </p>
    </div>
  );
}
