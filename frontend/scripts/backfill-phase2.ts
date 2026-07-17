// One-time, idempotent backfill for the Phase 2 schema (TraderAssessment,
// Payment.uploadId, AnalysisReport). Safe to re-run — every step skips rows
// that already have the target field set. Run with:
//   npx tsx scripts/backfill-phase2.ts
import { config } from "dotenv";
import path from "path";
import type { Answers } from "../lib/trader-types";
import type { prisma as PrismaClientInstance } from "../lib/prisma";

config({ path: path.resolve(__dirname, "../.env.local") });

type Prisma = typeof PrismaClientInstance;

async function backfillTraderAssessments(
  prisma: Prisma,
  computeProfileScores: (answers: Answers) => unknown
) {
  const leads = await prisma.lead.findMany({
    where: {
      answers: { not: undefined },
      traderType: { not: null },
      currentTraderAssessmentId: null,
    },
  });

  let created = 0;
  for (const lead of leads) {
    if (!lead.answers || !lead.traderType) continue;
    const answers = lead.answers as Answers;
    const assessment = await prisma.traderAssessment.create({
      data: {
        leadId: lead.id,
        answers,
        traderType: lead.traderType,
        scores: computeProfileScores(answers) as object,
        createdAt: lead.updatedAt,
      },
    });
    await prisma.lead.update({
      where: { id: lead.id },
      data: { currentTraderAssessmentId: assessment.id },
    });
    created++;
  }

  console.log(`TraderAssessment backfill: created ${created} row(s) from ${leads.length} eligible lead(s).`);
}

async function backfillPaymentUploads(prisma: Prisma) {
  const payments = await prisma.payment.findMany({
    where: { uploadId: null },
    orderBy: { createdAt: "asc" },
  });

  let matched = 0;
  let ambiguous = 0;
  const ambiguousPaymentIds: string[] = [];

  for (const payment of payments) {
    const claimedUploadIds = new Set(
      (
        await prisma.payment.findMany({
          where: { leadId: payment.leadId, uploadId: { not: null } },
          select: { uploadId: true },
        })
      ).map((p) => p.uploadId)
    );

    const candidates = await prisma.tradeUpload.findMany({
      where: {
        leadId: payment.leadId,
        createdAt: { lte: payment.createdAt },
        id: { notIn: [...claimedUploadIds].filter((id): id is string => !!id) },
      },
    });

    if (candidates.length === 1) {
      await prisma.payment.update({
        where: { id: payment.id },
        data: { uploadId: candidates[0].id },
      });
      matched++;
    } else {
      ambiguous++;
      ambiguousPaymentIds.push(payment.id);
    }
  }

  console.log(
    `Payment.uploadId backfill: matched ${matched}, left null for manual review: ${ambiguous}.`
  );
  if (ambiguousPaymentIds.length > 0) {
    console.log("Payments needing manual reconciliation:", ambiguousPaymentIds.join(", "));
  }
}

async function backfillAnalysisReports(prisma: Prisma) {
  const paidPayments = await prisma.payment.findMany({
    where: { status: "paid", uploadId: { not: null }, report: null },
  });

  let created = 0;
  for (const payment of paidPayments) {
    if (!payment.uploadId) continue;
    await prisma.analysisReport.create({
      data: {
        uploadId: payment.uploadId,
        paymentId: payment.id,
        leadId: payment.leadId,
        status: "pending",
        reportUrl: null,
      },
    });
    created++;
  }

  console.log(`AnalysisReport backfill: created ${created} row(s) (status: pending).`);
}

async function main() {
  // Dynamic imports so lib/prisma.ts reads DATABASE_URL only after dotenv
  // (above) has populated process.env — a static top-level import would be
  // hoisted before config() runs, leaving DATABASE_URL undefined.
  const { prisma } = await import("../lib/prisma");
  const { computeProfileScores } = await import("../lib/trader-types");

  await backfillTraderAssessments(prisma, computeProfileScores);
  await backfillPaymentUploads(prisma);
  await backfillAnalysisReports(prisma);

  await prisma.$disconnect();
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
