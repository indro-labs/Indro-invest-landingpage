import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { ownsLead } from "@/lib/lead";
import { QUESTIONS } from "@/lib/questions";
import { classifyTraderType, computeProfileScores, type Answers } from "@/lib/trader-types";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const lead = await prisma.lead.findUnique({ where: { id } });
  if (!lead || !(await ownsLead(lead))) {
    return NextResponse.json({ error: "not found" }, { status: 404 });
  }
  return NextResponse.json({ id: lead.id, status: lead.status });
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const lead = await prisma.lead.findUnique({ where: { id } });
  if (!lead || !(await ownsLead(lead))) {
    return NextResponse.json({ error: "not found" }, { status: 404 });
  }

  const body = await req.json();

  const mergedAnswers: Record<string, string | string[]> = {
    ...((lead.answers as Record<string, string | string[]>) ?? {}),
    ...(body.answers ?? {}),
  };

  const isAnswered = (value: string | string[] | undefined) =>
    Array.isArray(value) ? value.length > 0 : !!value;
  const allAnswered = QUESTIONS.every((q) => isAnswered(mergedAnswers[q.id]));

  const traderType = allAnswered
    ? classifyTraderType(mergedAnswers)
    : lead.traderType;

  // Completing the quiz (all questions answered) is a distinct event: it
  // creates a new TraderAssessment row (preserving history for retakes) and
  // becomes the lead's current profile. Lead.answers/traderType keep being
  // written too, as the in-progress draft buffer / legacy mirror.
  const updated = await prisma.$transaction(async (tx) => {
    const lead = await tx.lead.update({
      where: { id },
      data: {
        answers: mergedAnswers,
        traderType,
        email: body.email ?? undefined,
      },
    });

    if (allAnswered && traderType) {
      const assessment = await tx.traderAssessment.create({
        data: {
          leadId: id,
          answers: mergedAnswers,
          traderType,
          scores: computeProfileScores(mergedAnswers as Answers),
        },
      });
      return tx.lead.update({
        where: { id },
        data: { currentTraderAssessmentId: assessment.id },
      });
    }

    return lead;
  });

  return NextResponse.json({
    id: updated.id,
    traderType: updated.traderType,
  });
}
