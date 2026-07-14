import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { ownsLead } from "@/lib/lead";
import { QUESTIONS } from "@/lib/questions";
import { classifyTraderType } from "@/lib/trader-types";

// Funnel progress, earliest to latest. Retaking the quiz (or any other
// answer PATCH) should update the trader profile in place but must never
// regress a lead that's already further along — otherwise a paid user
// re-answering the assessment silently loses their "paid" status and gets
// routed back into checkout. See: paid-status-clobbered-by-quiz-retake bug.
const STATUS_ORDER = ["started", "questions_done", "signed_up", "upload_done", "paid"] as const;

function resolveStatus(current: string, computed: string): string {
  const currentIndex = STATUS_ORDER.indexOf(current as (typeof STATUS_ORDER)[number]);
  const computedIndex = STATUS_ORDER.indexOf(computed as (typeof STATUS_ORDER)[number]);
  if (currentIndex === -1 || computedIndex === -1) return computed;
  return computedIndex < currentIndex ? current : computed;
}

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

  const computedStatus = body.status ?? (allAnswered ? "questions_done" : lead.status);

  const updated = await prisma.lead.update({
    where: { id },
    data: {
      answers: mergedAnswers,
      traderType,
      status: resolveStatus(lead.status, computedStatus),
      email: body.email ?? lead.email,
    },
  });

  return NextResponse.json({
    id: updated.id,
    status: updated.status,
    traderType: updated.traderType,
  });
}
