import { redirect } from "next/navigation";
import { getCurrentLead } from "@/lib/lead";
import PaymentConfirming from "@/app/components/onboarding/PaymentConfirming";

export default async function SuccessPage() {
  const lead = await getCurrentLead();
  if (!lead) redirect("/onboarding/questions/1");
  if (lead.status === "paid") redirect("/dashboard");

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
