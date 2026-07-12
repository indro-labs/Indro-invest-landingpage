import { redirect } from "next/navigation";
import { getCurrentLead } from "@/lib/lead";
import UploadDropzone from "@/app/components/onboarding/UploadDropzone";

export default async function UploadPage() {
  const lead = await getCurrentLead();
  if (!lead || !lead.traderType) redirect("/onboarding/questions/1");

  return (
    <div className="rise">
      <h1 className="display text-3xl md:text-4xl leading-tight text-center mb-3">
        Upload your trade history
      </h1>
      <p className="text-ink-soft text-center leading-relaxed mb-10 max-w-lg mx-auto">
        See what your trades reveal about your decision-making, risk habits,
        and trading patterns. Go beyond your results to understand the
        behaviors influencing your performance. Analyzed by traders with
        psychology expertise who identify the patterns behind your decisions.
      </p>

      <div
        className="rounded-3xl surface p-6 md:p-8"
        style={{ boxShadow: "var(--shadow)" }}
      >
        <UploadDropzone />
      </div>
    </div>
  );
}
