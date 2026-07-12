"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function LeadBootstrap() {
  const router = useRouter();

  useEffect(() => {
    fetch("/api/leads", { method: "POST" }).then(() => router.refresh());
  }, [router]);

  return <div className="rise text-ink-faint">Loading…</div>;
}
