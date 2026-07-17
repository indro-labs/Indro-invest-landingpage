/**
 * Purchase/report display helpers — maps raw Payment/AnalysisReport fields
 * to the copy shown on the dashboard. See prisma/schema.prisma for the
 * underlying models; values are set by app/api/webhooks/stripe/route.ts.
 */

export const TIER_LABELS: Record<string, string> = {
  standard: "Behavior Analysis Report",
  premium: "Behavior Insights Starter",
};

export function getTierLabel(tier: string): string {
  return TIER_LABELS[tier] ?? "Selnite Report";
}

export type ReportStatusCopy = {
  badgeLabel: string;
  badgeColor: "good" | "info" | "bad";
  modalBody: string;
};

// AnalysisReport.status is the fulfillment lifecycle (separate from
// Payment.status, which only tracks the charge itself) — see
// prisma/schema.prisma. Fulfillment is manual/human, set by an admin.
export function getReportStatusCopy(status: string): ReportStatusCopy {
  switch (status) {
    case "ready":
      return {
        badgeLabel: "Ready",
        badgeColor: "good",
        modalBody: "Your report is ready — use the link below to view it.",
      };
    case "in_progress":
      return {
        badgeLabel: "In Review",
        badgeColor: "info",
        modalBody:
          "Your report is currently being analyzed by our team. We'll notify you as soon as it's ready.",
      };
    case "failed":
      return {
        badgeLabel: "Needs attention",
        badgeColor: "bad",
        modalBody:
          "Something went wrong preparing this report. Reach out to info@indrolabs.ca and we'll sort it out right away.",
      };
    default:
      return {
        badgeLabel: "Pending",
        badgeColor: "info",
        modalBody:
          "Your payment is confirmed and your trade history has been sent to our analysis team. We'll notify you as soon as it's ready.",
      };
  }
}
