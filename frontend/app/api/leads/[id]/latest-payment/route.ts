import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { ownsLead } from "@/lib/lead";

// Stripe Payment Links redirect to a fixed URL configured in the Stripe
// dashboard (not something this codebase controls per-session), so
// /onboarding/success can't be handed a specific uploadId/paymentId on
// return from checkout. This polls the lead's most recently created
// Payment instead — narrower than the old Lead.status flag (which any
// payment could flip), though a lead with two purchases in flight at once
// could still see the wrong one confirm first; acceptable given the
// external redirect constraint.
export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const lead = await prisma.lead.findUnique({ where: { id } });
  if (!lead || !(await ownsLead(lead))) {
    return NextResponse.json({ error: "not found" }, { status: 404 });
  }

  const payment = await prisma.payment.findFirst({
    where: { leadId: id },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json({ status: payment?.status ?? null });
}
