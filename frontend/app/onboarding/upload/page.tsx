import { redirect } from "next/navigation";
import { getCurrentLead } from "@/lib/lead";
import UploadDropzone from "@/app/components/onboarding/UploadDropzone";

export default async function UploadPage() {
  const lead = await getCurrentLead();
  if (!lead?.clerkUserId) redirect("/onboarding/sign-up");

  return (
    <div className="rise max-w-xl mx-auto w-full min-w-0">
      <h1 className="display text-2xl leading-snug text-center mb-3 text-white">
        Upload your trade history
      </h1>
      <p className="text-ink-soft text-center mb-9 max-w-md mx-auto">
        See what your trades reveal about your decision-making, risk habits,
        and trading patterns.
      </p>

      <UploadDropzone />
    </div>
  );
}
