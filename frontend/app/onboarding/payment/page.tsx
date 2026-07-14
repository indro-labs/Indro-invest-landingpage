import { redirect } from "next/navigation";
import { getCurrentLead } from "@/lib/lead";
import { prisma } from "@/lib/prisma";
import PaymentTierCard from "@/app/components/onboarding/PaymentTierCard";

export default async function PaymentPage({
  searchParams,
}: {
  searchParams: Promise<{ uploadId?: string }>;
}) {
  const lead = await getCurrentLead();
  if (!lead?.clerkUserId) redirect("/onboarding/sign-up");

  const { uploadId } = await searchParams;
  const upload = uploadId
    ? await prisma.tradeUpload.findUnique({ where: { id: uploadId }, include: { payment: true } })
    : null;
  if (!upload || upload.leadId !== lead.id) redirect("/onboarding/upload");
  if (upload.payment?.status === "paid") redirect("/dashboard");

  const standardLink = process.env.NEXT_PUBLIC_STRIPE_PAYMENT_LINK_STANDARD ?? "#";
  const premiumLink = process.env.NEXT_PUBLIC_STRIPE_PAYMENT_LINK_PREMIUM ?? "#";
  const ref = `client_reference_id=${lead.id}:${upload.id}`;

  return (
    <div className="rise max-w-3xl mx-auto w-full min-w-0">
      <p className="section-label text-center mb-3">Your upload is in</p>
      <h1 className="display text-3xl leading-snug text-center mb-3 text-white">
        Unlock your full report.
      </h1>
      <p className="text-ink-soft text-center mb-10 max-w-md mx-auto">
        Pick a plan to get your personalized breakdown — reviewed by a real
        trader, not a bot.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <PaymentTierCard
          title="Behavior Analysis Report"
          price="$11.99"
          cadence="CAD, one-time"
          features={[
            "Personalized Behavior Analysis Report",
            "Reviewed by psychology graduate traders",
            "Clear, easy-to-understand write-up of your patterns",
          ]}
          href={`${standardLink}?${ref}`}
          ctaLabel="Get the Report"
        />
        <PaymentTierCard
          title="Behavior Insights Starter"
          price="$16.99"
          cadence="CAD, one-time"
          recommended
          features={[
            "Everything in the Behavior Analysis Report",
            "Limited-time dashboard access",
            "Explore your data and uncover deeper patterns",
            "Additional behavioral insights beyond your report",
          ]}
          href={`${premiumLink}?${ref}`}
          ctaLabel="Get the Starter"
        />
      </div>

      <p className="text-sm text-ink-faint text-center mt-6">
        Secure checkout via Stripe. One-time payment, no subscription.
      </p>
    </div>
  );
}
