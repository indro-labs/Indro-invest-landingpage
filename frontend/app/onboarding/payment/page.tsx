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
  // Stripe Payment Links only allow alphanumeric characters, dashes, and
  // underscores in client_reference_id — anything else (e.g. a colon) is
  // silently dropped, so both ids are joined with "_" rather than ":".
  const ref = `client_reference_id=${lead.id}_${upload.id}`;

  return (
    <div className="rise max-w-3xl mx-auto w-full min-w-0">
      <p className="section-label text-center mb-3">Your upload is ready.</p>
      <h1 className="display text-3xl leading-snug text-center mb-3 text-white">
        Discover what is really driving your trades.
      </h1>
      <p className="text-ink-soft text-center mb-10 max-w-md mx-auto">
        Get your personalized trading behavior analysis reviewed by real traders and psychology experts.
      </p>

      <div className="max-w-sm mx-auto">
        <PaymentTierCard
          title="Behavior Analysis Report"
          price="$11.99"
          cadence="CAD, one-time payment"
          recommended
          features={[
            "Identify your emotional trading patterns",
            "Discover your biggest strengths and weaknesses",
            "Get actionable insights to improve your decision-making",
          ]}
          href={`${standardLink}?${ref}`}
          ctaLabel="Get the Report"
        />
      </div>

      <p className="text-sm text-ink-faint text-center mt-6">
        Secure checkout via Stripe. One-time payment, no subscription.
      </p>
      <p className="text-sm text-ink-faint text-center mt-2 max-w-md mx-auto">
        Our interactive dashboard is coming soon. You&apos;ll be the first to hear when it launches and get access
        to new features as they become available.
      </p>
    </div>
  );
}
