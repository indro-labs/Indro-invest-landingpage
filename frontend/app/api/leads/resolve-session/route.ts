import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { getCurrentLead } from "@/lib/lead";
import { prisma } from "@/lib/prisma";

// Called right after Clerk auth completes (sign-up or sign-in). Resolves
// the signed-in user's lead — getCurrentLead() finds-or-creates it by
// clerkUserId and migrates in any unclaimed anonymous quiz data on first
// link (see lib/lead.ts) — then routes them onward. A lead that has never
// uploaded a trade file yet (true for every brand-new sign-up, since a
// Lead row always exists by this point) goes to the upload step, which
// itself continues into payment; everyone else lands on the dashboard,
// which renders its own empty states for anything still incomplete.
export async function POST() {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ nextUrl: "/onboarding/sign-up" });
  }

  const lead = await getCurrentLead();
  if (!lead) {
    return NextResponse.json({ nextUrl: "/onboarding/questions/1" });
  }

  const hasUpload = await prisma.tradeUpload.findFirst({ where: { leadId: lead.id }, select: { id: true } });
  if (!hasUpload) {
    return NextResponse.json({ nextUrl: "/onboarding/upload" });
  }

  return NextResponse.json({ nextUrl: "/dashboard" });
}
