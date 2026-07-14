-- Phase 2: decouple Trader Assessment from Trading Analysis.
-- Purely additive — no columns dropped, no NOT NULL changes to existing data.

-- AlterTable
ALTER TABLE "Lead" ADD COLUMN     "currentTraderAssessmentId" TEXT;

-- AlterTable
ALTER TABLE "Payment" ADD COLUMN     "uploadId" TEXT;

-- AlterTable
ALTER TABLE "TradeUpload" ALTER COLUMN "status" SET DEFAULT 'pending_payment';

-- CreateTable
CREATE TABLE "TraderAssessment" (
    "id" TEXT NOT NULL,
    "leadId" TEXT NOT NULL,
    "answers" JSONB NOT NULL,
    "traderType" TEXT NOT NULL,
    "scores" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "TraderAssessment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AnalysisReport" (
    "id" TEXT NOT NULL,
    "uploadId" TEXT NOT NULL,
    "paymentId" TEXT NOT NULL,
    "leadId" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "reportUrl" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AnalysisReport_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "TraderAssessment_leadId_createdAt_idx" ON "TraderAssessment"("leadId", "createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "AnalysisReport_uploadId_key" ON "AnalysisReport"("uploadId");

-- CreateIndex
CREATE UNIQUE INDEX "AnalysisReport_paymentId_key" ON "AnalysisReport"("paymentId");

-- CreateIndex
CREATE INDEX "AnalysisReport_leadId_createdAt_idx" ON "AnalysisReport"("leadId", "createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "Lead_currentTraderAssessmentId_key" ON "Lead"("currentTraderAssessmentId");

-- CreateIndex
CREATE UNIQUE INDEX "Payment_uploadId_key" ON "Payment"("uploadId");

-- AddForeignKey
ALTER TABLE "Lead" ADD CONSTRAINT "Lead_currentTraderAssessmentId_fkey" FOREIGN KEY ("currentTraderAssessmentId") REFERENCES "TraderAssessment"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TraderAssessment" ADD CONSTRAINT "TraderAssessment_leadId_fkey" FOREIGN KEY ("leadId") REFERENCES "Lead"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_uploadId_fkey" FOREIGN KEY ("uploadId") REFERENCES "TradeUpload"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AnalysisReport" ADD CONSTRAINT "AnalysisReport_uploadId_fkey" FOREIGN KEY ("uploadId") REFERENCES "TradeUpload"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AnalysisReport" ADD CONSTRAINT "AnalysisReport_paymentId_fkey" FOREIGN KEY ("paymentId") REFERENCES "Payment"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AnalysisReport" ADD CONSTRAINT "AnalysisReport_leadId_fkey" FOREIGN KEY ("leadId") REFERENCES "Lead"("id") ON DELETE CASCADE ON UPDATE CASCADE;
