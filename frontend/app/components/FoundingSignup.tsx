/**
 * Founding checkout. Payment runs through a Stripe Payment Link:
 * product "Selnite Founding Membership", $99/year recurring, with the
 * confirmation page set to redirect to /success on this site.
 * Swap in the real link below once it's created in the Stripe dashboard.
 */
export const STRIPE_PAYMENT_LINK = "https://buy.stripe.com/REPLACE_WITH_YOUR_LINK";

export default function FoundingSignup() {
  return (
    <div className="mx-auto max-w-md">
      <a
        href={STRIPE_PAYMENT_LINK}
        className="btn-solid inline-flex w-full items-center justify-center gap-2 px-8 py-4 text-base sm:w-auto sm:px-12"
      >
        Lock in $99/year
        <span aria-hidden="true">→</span>
      </a>

      <p className="mt-4 text-sm leading-relaxed text-ink-soft">
        Secure checkout by Stripe. Your email and a card, nothing else.
        And if the dashboard isn&apos;t worth it when it ships, one email
        gets you a full refund. No forms, no friction.
      </p>
      <p className="mt-2 text-[13px] text-ink-faint">
        Want to ask something first?{" "}
        <a href="mailto:founders@selnite.io" className="underline decoration-ink-faint underline-offset-2 transition-colors hover:text-ink">
          founders@selnite.io
        </a>
      </p>
    </div>
  );
}
