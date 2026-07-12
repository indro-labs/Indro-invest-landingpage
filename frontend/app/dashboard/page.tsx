import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { getTraderTypeByKey } from "@/lib/trader-types";

export default async function DashboardPage() {
  const { userId } = await auth();
  const lead = await prisma.lead.findUnique({
    where: { clerkUserId: userId! },
    include: { tradeUploads: { orderBy: { createdAt: "desc" }, take: 1 } },
  });
  const traderType = getTraderTypeByKey(lead?.traderType);
  const upload = lead?.tradeUploads[0];

  return (
    <div className="rise">
      <p className="section-label mb-3">Your dashboard</p>
      <h1 className="display text-2xl md:text-3xl leading-snug mb-3 text-white">
        You&apos;re {traderType.label}.
      </h1>
      <p className="text-ink-soft leading-relaxed mb-8 max-w-lg">
        {traderType.description}
      </p>

      <div
        className="rounded-3xl backdrop-blur-xl p-7"
        style={{ border: "1px solid var(--line-soft)", background: "rgba(255,255,255,0.04)" }}
      >
        <p className="text-white font-medium mb-1">Your report is being prepared</p>
        <p className="text-sm text-ink-faint mb-4">
          A trader who specializes in psychology is reviewing your upload —
          you&apos;ll see the full breakdown here once it&apos;s ready.
        </p>
        {upload && (
          <div
            className="flex items-center gap-3 rounded-xl p-3.5"
            style={{ background: "rgba(124,58,237,0.08)", border: "1px solid rgba(167,139,250,0.15)" }}
          >
            <span
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg"
              style={{ background: "rgba(124,58,237,0.15)" }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--accent-light)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 16h16M4 8h16M4 12h16" />
              </svg>
            </span>
            <div>
              <p className="text-sm text-white">{upload.filename}</p>
              <p className="text-xs text-ink-faint">Uploaded, awaiting review</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
