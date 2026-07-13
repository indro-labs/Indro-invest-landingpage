"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function ResolveSession() {
  const router = useRouter();

  useEffect(() => {
    fetch("/api/leads/resolve-session", { method: "POST" })
      .then((res) => res.json())
      .then((data) => router.replace(data?.nextUrl ?? "/onboarding/questions/1"))
      .catch(() => router.replace("/onboarding/questions/1"));
  }, [router]);

  return (
    <div className="flex min-h-[40vh] items-center justify-center text-ink-faint">
      Setting things up…
    </div>
  );
}
