import { redirect } from "next/navigation";
import { getCurrentLead } from "@/lib/lead";
import PaymentConfirming from "@/app/components/onboarding/PaymentConfirming";

export default async function SuccessPage() {
  const lead = await getCurrentLead();
  if (!lead) redirect("/onboarding/questions/1");
  if (lead.status === "paid") redirect("/dashboard");

  return (
    <div className="rise">
      <p className="section-label mb-3">Payment received</p>
      <h1 className="display text-2xl md:text-3xl leading-tight mb-6">
        Setting up your dashboard.
      </h1>
      <PaymentConfirming leadId={lead.id} />
    </div>
  );
}
