import { redirect } from "next/navigation";
import { getCurrentLead } from "@/lib/lead";
import UploadDropzone from "@/app/components/onboarding/UploadDropzone";

export default async function UploadPage() {
  const lead = await getCurrentLead();
  if (!lead || !lead.traderType) redirect("/onboarding/questions/1");

  return (
    <div className="rise">
      <div className="flex justify-center mb-5">
        <span className="section-label rounded-full border border-line px-3 py-1.5">
          Import your history
        </span>
      </div>
      <h1 className="display text-3xl md:text-4xl leading-tight text-center mb-3">
        Upload your trade history
      </h1>
      <p className="text-ink-soft text-center leading-relaxed mb-10 max-w-md mx-auto">
        We&apos;ll look for the exact trades behind your pattern and hand you
        a rule to catch it next time — reviewed by a real trader, not a bot.
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
