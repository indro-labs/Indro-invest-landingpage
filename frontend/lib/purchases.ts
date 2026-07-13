/**
 * Purchase display helpers — maps raw Payment fields (tier, status) to the
 * copy shown on the dashboard. See prisma/schema.prisma for the underlying
 * Payment model; tier/status values are set by app/api/webhooks/stripe/route.ts.
 *
 * Payment.status only tracks payment lifecycle (pending|paid|failed), not
 * report-fulfillment lifecycle — there's no "completed" state yet because
 * nothing in the app (including the read-only admin panel) ever writes one.
 * Add a real reportStatus field + an admin action to set it before adding a
 * third state here.
 */

export const TIER_LABELS: Record<string, string> = {
  standard: "Behavior Analysis Report",
  premium: "Behavior Insights Starter",
};

export function getTierLabel(tier: string): string {
  return TIER_LABELS[tier] ?? "Selnite Report";
}

export type PaymentStatusCopy = {
  badgeLabel: string;
  badgeColor: "good" | "info" | "bad";
  modalBody: string;
};

export function getPaymentStatusCopy(status: string): PaymentStatusCopy {
  switch (status) {
    case "paid":
      return {
        badgeLabel: "In Review",
        badgeColor: "good",
        modalBody:
          "Thank you for purchasing your behavioral analysis. Your report is currently being analyzed by our team. We've received a higher volume of requests than anticipated, but your report is actively being prioritized. We'll notify you as soon as it's ready. Thank you for your patience and for supporting Selnite during early access.",
      };
    case "pending":
      return {
        badgeLabel: "Processing",
        badgeColor: "info",
        modalBody:
          "We're confirming your payment now — this usually takes just a moment. Once it's confirmed, your report moves into our review queue and we'll notify you as soon as it's ready.",
      };
    default:
      return {
        badgeLabel: "Needs attention",
        badgeColor: "bad",
        modalBody:
          "We couldn't confirm this payment. If you were charged, reach out to info@indrolabs.ca and we'll sort it out right away.",
      };
  }
}
