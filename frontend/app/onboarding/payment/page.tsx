import { redirect } from "next/navigation";
import { getCurrentLead } from "@/lib/lead";
import PaymentTierCard from "@/app/components/onboarding/PaymentTierCard";

export default async function PaymentPage() {
  const lead = await getCurrentLead();
  if (!lead || !lead.clerkUserId) redirect("/onboarding/questions/1");

  const standardLink = process.env.NEXT_PUBLIC_STRIPE_PAYMENT_LINK_STANDARD ?? "#";
  const premiumLink = process.env.NEXT_PUBLIC_STRIPE_PAYMENT_LINK_PREMIUM ?? "#";
  const ref = `client_reference_id=${lead.id}`;

  return (
    <div className="rise">
      <p className="section-label mb-3">Your analysis is ready</p>
      <h1 className="display text-2xl md:text-3xl leading-tight mb-3">
        Unlock your full breakdown.
      </h1>
      <p className="text-ink-soft leading-relaxed mb-8 max-w-lg">
        Your trades are uploaded and your pattern is identified — pick a plan
        to see the specific trades, the rule that catches it, and your
        ongoing dashboard.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <PaymentTierCard
          title="Standard"
          price="$49"
          cadence="one-time"
          features={[
            "Full pattern breakdown",
            "Trade-by-trade tagging",
            "One core behavioral rule",
          ]}
          href={`${standardLink}?${ref}`}
          ctaLabel="Get Standard"
        />
        <PaymentTierCard
          title="Premium"
          price="$99"
          cadence="one-time"
          recommended
          features={[
            "Everything in Standard",
            "Full behavioral rule set",
            "Ongoing dashboard tracking",
            "Priority review by a psychology graduate",
          ]}
          href={`${premiumLink}?${ref}`}
          ctaLabel="Get Premium"
        />
      </div>

      <p className="text-sm text-ink-faint mt-6">
        Secure checkout via Stripe. One-time payment, no subscription.
      </p>
    </div>
  );
}
