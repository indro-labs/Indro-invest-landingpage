import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { ownsLead } from "@/lib/lead";
import { QUESTIONS } from "@/lib/questions";
import { classifyTraderType } from "@/lib/trader-types";

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

  const updated = await prisma.lead.update({
    where: { id },
    data: {
      answers: mergedAnswers,
      traderType,
      status: body.status ?? (allAnswered ? "questions_done" : lead.status),
      email: body.email ?? lead.email,
    },
  });

  return NextResponse.json({
    id: updated.id,
    status: updated.status,
    traderType: updated.traderType,
  });
}
