import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { ownsLead } from "@/lib/lead";

// Clears the in-progress quiz draft buffer (Lead.answers/traderType) so
// /onboarding/questions/1 starts blank. Does NOT touch TraderAssessment
// history or currentTraderAssessmentId — the current profile stays intact
// until the retake is actually completed.
export async function POST(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const lead = await prisma.lead.findUnique({ where: { id } });
  if (!lead || !(await ownsLead(lead))) {
    return NextResponse.json({ error: "not found" }, { status: 404 });
  }

  await prisma.lead.update({
    where: { id },
    data: { answers: {}, traderType: null },
  });

  return NextResponse.json({ ok: true });
}
