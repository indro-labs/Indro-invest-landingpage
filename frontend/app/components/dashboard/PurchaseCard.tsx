"use client";

import { useState } from "react";
import { getTierLabel, getPaymentStatusCopy } from "@/lib/purchases";
import Modal from "./Modal";

const BADGE_COLOR: Record<"good" | "info" | "bad", string> = {
  good: "var(--good)",
  info: "var(--info)",
  bad: "var(--bad)",
};

function formatAmount(amountTotal: number | null, currency: string | null) {
  if (amountTotal == null || !currency) return null;
  return new Intl.NumberFormat("en-US", { style: "currency", currency: currency.toUpperCase() }).format(amountTotal / 100);
}

export default function PurchaseCard({
  tier,
  status,
  amountTotal,
  currency,
  createdAt,
}: {
  tier: string;
  status: string;
  amountTotal: number | null;
  currency: string | null;
  createdAt: string;
}) {
  const [open, setOpen] = useState(false);
  const title = getTierLabel(tier);
  const { badgeLabel, badgeColor, modalBody } = getPaymentStatusCopy(status);
  const amount = formatAmount(amountTotal, currency);
  const date = new Date(createdAt).toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" });

  return (
    <div
      className="flex flex-col gap-4 rounded-2xl p-5 sm:flex-row sm:items-center sm:justify-between"
      style={{ border: "1px solid var(--line-soft)", background: "rgba(255,255,255,0.03)" }}
    >
      <div className="min-w-0">
        <div className="mb-1.5 flex flex-wrap items-center gap-2.5">
          <p className="font-semibold text-white">{title}</p>
          <span
            className="rounded-full px-2.5 py-0.5 text-xs font-semibold"
            style={{ color: BADGE_COLOR[badgeColor], background: `color-mix(in srgb, ${BADGE_COLOR[badgeColor]} 15%, transparent)` }}
          >
            {badgeLabel}
          </span>
        </div>
        <p className="text-sm text-ink-faint">
          {amount ? `${amount} · ` : ""}
          {date}
        </p>
      </div>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="btn-ghost inline-flex shrink-0 items-center justify-center px-5 py-2.5 text-sm"
      >
        View Status
      </button>

      <Modal open={open} onClose={() => setOpen(false)} title={title}>
        <p className="text-ink-soft leading-relaxed">{modalBody}</p>
      </Modal>
    </div>
  );
}
