"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const POLL_INTERVAL_MS = 1500;
const MAX_ATTEMPTS = 20; // ~30s

export default function PaymentConfirming({ leadId }: { leadId: string }) {
  const router = useRouter();
  const [timedOut, setTimedOut] = useState(false);

  useEffect(() => {
    let attempts = 0;
    const interval = setInterval(async () => {
      attempts += 1;
      const res = await fetch(`/api/leads/${leadId}/latest-payment`);
      const data = await res.json().catch(() => null);
      if (data?.status === "paid") {
        clearInterval(interval);
        router.push("/dashboard");
        return;
      }
      if (attempts >= MAX_ATTEMPTS) {
        clearInterval(interval);
        setTimedOut(true);
      }
    }, POLL_INTERVAL_MS);
    return () => clearInterval(interval);
  }, [leadId, router]);

  return (
    <div
      className="rounded-3xl backdrop-blur-xl p-10 text-center"
      style={{ border: "1px solid var(--line-soft)", background: "rgba(255,255,255,0.04)" }}
    >
      {timedOut ? (
        <p className="text-ink-soft">
          Still confirming your payment — this can take a moment. Refresh
          this page in a bit, or reach out if it doesn&apos;t update.
        </p>
      ) : (
        <p className="text-ink-soft">Confirming your payment…</p>
      )}
    </div>
  );
}
