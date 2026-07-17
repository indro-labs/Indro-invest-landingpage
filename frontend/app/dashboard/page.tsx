import Link from "next/link";
import { auth, currentUser } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { getTraderTypeByKey } from "@/lib/trader-types";
import AssessmentSummary from "@/app/components/dashboard/AssessmentSummary";
import ReportCard from "@/app/components/dashboard/ReportCard";

type Scores = { discipline: number; aggression: number; patience: number };

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
const TRADING_REPORTS_COPY =
  "Go beyond your numbers. Our Trading Reports uncover the psychological patterns behind your trades, helping you identify habits, emotional triggers, and opportunities that support long-term trading success.";

export default async function DashboardPage() {
  const { userId } = await auth();

  const [lead, user] = await Promise.all([
    prisma.lead.findUnique({
      where: { clerkUserId: userId! },
      include: {
        currentTraderAssessment: true,
        analysisReports: {
          orderBy: { createdAt: "desc" },
          include: { upload: true, payment: true },
        },
      },
    }),
    currentUser(),
  ]);

  const firstName = user?.firstName ?? "trader";
  const assessment = lead?.currentTraderAssessment ?? null;
  // Only the serializable display fields — TraderType.score is a
  // classification function and can't cross into the "use client"
  // AssessmentSummary component below.
  const { key, label, archetype, description, winRateRange, strengths, watchOuts, edgeSentence } =
    getTraderTypeByKey(assessment?.traderType);
  const traderType = { key, label, archetype, description, winRateRange, strengths, watchOuts, edgeSentence };
  const scores = (assessment?.scores as Scores | undefined) ?? { discipline: 50, aggression: 50, patience: 50 };
  const reports = lead?.analysisReports ?? [];
  const isFoundingMember = reports.some((r) => r.payment.status === "paid");

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
      {assessment && lead ? (
        <AssessmentSummary
          traderType={traderType}
          scores={scores}
          leadId={lead.id}
          lastTakenOn={assessment.createdAt.toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" })}
        />
      ) : (
        <div
          className="rounded-3xl p-7"
          style={{ border: "1px solid var(--line-soft)", background: "rgba(255,255,255,0.04)" }}
        >
          <p className="section-label mb-2" style={{ color: "var(--accent-light)" }}>
            Behavioural Assessment
          </p>
          <h2 className="display mb-3 text-xl text-white">Discover your trader type.</h2>
          <p className="mb-5 text-sm text-ink-soft">
            Take the trader assessment to see your strengths, watch-outs, and behavioural profile.
          </p>
          <Link href="/onboarding/questions/1" className="btn-solid inline-flex items-center px-6 py-3 text-sm">
            Take Assessment
          </Link>
        </div>
      )}

      {/* Section 3 — Trading Reports */}
      <div>
        <h2 className="display mb-2 text-2xl md:text-3xl leading-snug text-white">Trading Reports</h2>
        <p className="mb-4 text-sm text-ink-soft leading-relaxed">{TRADING_REPORTS_COPY}</p>
        {reports.length > 0 && (
          <div className="mb-4 flex justify-end">
            <Link href="/onboarding/upload" className="btn-solid inline-flex items-center px-5 py-2.5 text-sm">
              Upload New CSV
            </Link>
          </div>
        )}
        {reports.length > 0 ? (
          <div className="flex flex-col gap-3">
            {reports.map((r) => (
              <ReportCard
                key={r.id}
                filename={r.upload.filename}
                tier={r.payment.tier}
                status={r.status}
                amountTotal={r.payment.amountTotal}
                currency={r.payment.currency}
                createdAt={r.createdAt.toISOString()}
                reportUrl={r.reportUrl}
              />
            ))}
          </div>
        ) : (
          <div
            className="rounded-3xl p-7"
            style={{
              border: "1px solid rgba(167,139,250,0.3)",
              background: "linear-gradient(160deg, rgba(124,58,237,0.16), rgba(124,58,237,0.03))",
            }}
          >
            <h2 className="display mb-3 text-xl text-white">Turn your trade history into a behavioral edge.</h2>
            <p className="mb-6 text-sm text-ink-soft leading-relaxed">
              Upload your trade CSV and a psychology graduate trader will personally review it and send back a
              report on the patterns behind your wins and losses — the habits, hesitations, and impulses that
              show up in your numbers but not in your head.
            </p>
            <Link href="/onboarding/upload" className="btn-solid inline-flex items-center px-6 py-3 text-sm">
              Upload Your Trade CSV
            </Link>
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
