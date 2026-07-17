import { redirect } from "next/navigation";
import { getCurrentLead } from "@/lib/lead";
import { prisma } from "@/lib/prisma";
import PaymentConfirming from "@/app/components/onboarding/PaymentConfirming";

export default async function SuccessPage() {
  const lead = await getCurrentLead();
  if (!lead?.clerkUserId) redirect("/onboarding/sign-up");

  const latestPayment = await prisma.payment.findFirst({
    where: { leadId: lead.id },
    orderBy: { createdAt: "desc" },
  });
  if (latestPayment?.status === "paid") redirect("/dashboard");

  return (
    <div className="rise max-w-xl mx-auto w-full min-w-0 text-center">
      <p className="section-label mb-3">Payment received</p>
      <h1 className="display text-2xl leading-snug mb-6 text-white">
        Setting up your dashboard.
      </h1>
      <PaymentConfirming leadId={lead.id} />
    </div>
  );
}
