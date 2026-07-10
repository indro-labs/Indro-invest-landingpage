import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { getTraderTypeByKey } from "@/lib/trader-types";

export default async function DashboardPage() {
  const { userId } = await auth();
  const lead = await prisma.lead.findUnique({ where: { clerkUserId: userId! } });
  const traderType = getTraderTypeByKey(lead?.traderType);

  return (
    <div className="rise">
      <p className="section-label mb-3">Your dashboard</p>
      <h1 className="display text-2xl md:text-3xl leading-tight mb-3">
        You&apos;re {traderType.label}.
      </h1>
      <p className="text-ink-soft leading-relaxed mb-8 max-w-lg">
        {traderType.description}
      </p>
      <div
        className="rounded-3xl surface p-6 md:p-8"
        style={{ boxShadow: "var(--shadow)" }}
      >
        <p className="text-ink font-medium mb-1">Your analysis is being prepared</p>
        <p className="text-sm text-ink-faint">
          We&apos;re reviewing your trade history. You&apos;ll see the full
          breakdown here shortly.
        </p>
      </div>
    </div>
  );
}
