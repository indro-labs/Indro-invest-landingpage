"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RetakeAssessmentButton({
  leadId,
  className,
}: {
  leadId: string;
  className: string;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const retake = async () => {
    setLoading(true);
    await fetch(`/api/leads/${leadId}/retake`, { method: "POST" });
    router.push("/onboarding/questions/1");
  };

  return (
    <button type="button" onClick={retake} disabled={loading} className={className}>
      {loading ? "Starting…" : "Retake Assessment"}
    </button>
  );
}
