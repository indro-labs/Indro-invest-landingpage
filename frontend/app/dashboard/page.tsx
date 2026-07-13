import { auth, currentUser } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { getTraderTypeByKey, computeProfileScores, type Answers } from "@/lib/trader-types";
import AssessmentSummary from "@/app/components/dashboard/AssessmentSummary";
import PurchaseCard from "@/app/components/dashboard/PurchaseCard";

const UPCOMING_FEATURES = [
  "Behaviour timeline",
  "Trading pattern detection",
  "AI behavioural insights",
  "Performance analytics",
  "Emotional trend tracking",
  "Long-term progress reports",
];

const LINKEDIN_URL = "https://www.linkedin.com/company/selnite/";
const SUPPORT_EMAIL = "info@indrolabs.ca";

export default async function DashboardPage() {
  const { userId } = await auth();

  const [lead, user] = await Promise.all([
    prisma.lead.findUnique({
      where: { clerkUserId: userId! },
      include: { payments: { orderBy: { createdAt: "desc" } } },
    }),
    currentUser(),
  ]);

  const firstName = user?.firstName ?? "trader";
  const traderType = getTraderTypeByKey(lead?.traderType);
  const scores = computeProfileScores((lead?.answers as Answers) ?? {});
  const payments = lead?.payments ?? [];
  const isFoundingMember = payments.some((p) => p.status === "paid");

  return (
    <div className="rise flex flex-col gap-8">
      {/* Section 1 — Welcome */}
      <div>
        <div className="mb-2 flex flex-wrap items-center gap-3">
          <h1 className="display text-2xl md:text-3xl leading-snug text-white">
            Welcome back, {firstName}
          </h1>
          {isFoundingMember && (
            <span
              className="rounded-full px-3 py-1 text-xs font-semibold text-white"
              style={{ background: "linear-gradient(135deg, var(--accent), var(--accent-light))" }}
            >
              Founding Member
            </span>
          )}
        </div>
        <p className="text-ink-soft leading-relaxed">
          Here&apos;s where your behavioural profile, purchases, and account live.
        </p>
      </div>

      {/* Section 2 — Behavioural Assessment */}
      <AssessmentSummary traderType={traderType} scores={scores} />

      {/* Section 3 — Purchases */}
      <div>
        <p className="section-label mb-4">Purchases</p>
        {payments.length > 0 ? (
          <div className="flex flex-col gap-3">
            {payments.map((p) => (
              <PurchaseCard
                key={p.id}
                tier={p.tier}
                status={p.status}
                amountTotal={p.amountTotal}
                currency={p.currency}
                createdAt={p.createdAt.toISOString()}
              />
            ))}
          </div>
        ) : (
          <div
            className="rounded-2xl p-5 text-sm text-ink-faint"
            style={{ border: "1px solid var(--line-soft)", background: "rgba(255,255,255,0.03)" }}
          >
            No purchases yet.
          </div>
        )}
      </div>

      {/* Section 4 — Dashboard Development */}
      <div
        className="rounded-3xl p-7"
        style={{
          border: "1px solid rgba(167,139,250,0.3)",
          background: "linear-gradient(160deg, rgba(124,58,237,0.16), rgba(124,58,237,0.03))",
        }}
      >
        <p className="section-label mb-2" style={{ color: "var(--accent-light)" }}>
          Dashboard Under Active Development
        </p>
        <h2 className="display mb-3 text-xl text-white">
          We&apos;re building the full behavioural analytics platform.
        </h2>
        <p className="mb-5 text-sm text-ink-soft">Upcoming features include:</p>
        <ul className="mb-6 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
          {UPCOMING_FEATURES.map((f) => (
            <li key={f} className="flex items-start gap-2 text-sm text-ink-soft">
              <span
                className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full"
                style={{ background: "linear-gradient(135deg, var(--accent), var(--accent-light))" }}
              >
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none">
                  <path d="M5 13l4 4L19 7" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              {f}
            </li>
          ))}
        </ul>
        <p className="mb-4 text-sm text-ink-faint">
          Follow Selnite on LinkedIn to see development progress, feature releases, and product updates.
        </p>
        <a
          href={LINKEDIN_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-solid inline-flex items-center gap-2 px-6 py-3 text-sm"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.03-1.85-3.03-1.86 0-2.15 1.45-2.15 2.94v5.66H9.35V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.06 2.06 0 110-4.12 2.06 2.06 0 010 4.12zM7.11 20.45H3.56V9h3.55v11.45z" />
          </svg>
          Follow Selnite on LinkedIn
        </a>
      </div>

      {/* Section 5 — Support */}
      <div
        className="rounded-2xl p-6"
        style={{ border: "1px solid var(--line-soft)", background: "rgba(255,255,255,0.03)" }}
      >
        <p className="mb-1.5 font-semibold text-white">Need help?</p>
        <p className="mb-4 text-sm text-ink-soft leading-relaxed">
          If you have any questions regarding your assessment, purchases, or your account, we&apos;d be happy to
          help.
        </p>
        <a href={`mailto:${SUPPORT_EMAIL}`} className="btn-ghost inline-flex items-center px-5 py-2.5 text-sm">
          Contact Support · {SUPPORT_EMAIL}
        </a>
      </div>
    </div>
  );
}
