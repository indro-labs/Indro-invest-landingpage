import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { getCurrentLead } from "@/lib/lead";

// Called right after Clerk auth completes (sign-up or sign-in). Resolves
// the signed-in user's lead — getCurrentLead() finds-or-creates it by
// clerkUserId and migrates in any unclaimed anonymous quiz data on first
// link (see lib/lead.ts) — then figures out where they should land next.
export async function POST() {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ nextUrl: "/onboarding/sign-up" });
  }

  const lead = await getCurrentLead();
  if (!lead) {
    return NextResponse.json({ nextUrl: "/onboarding/questions/1" });
  }

  if (lead.status === "paid") return NextResponse.json({ nextUrl: "/dashboard" });
  if (lead.status === "upload_done") return NextResponse.json({ nextUrl: "/onboarding/payment" });
  if (lead.traderType) return NextResponse.json({ nextUrl: "/onboarding/upload" });
  return NextResponse.json({ nextUrl: "/onboarding/questions/1" });
}
