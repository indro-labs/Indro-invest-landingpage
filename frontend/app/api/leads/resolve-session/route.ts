import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { getCurrentLead } from "@/lib/lead";

// Called right after Clerk auth completes (sign-up or sign-in). Resolves
// the signed-in user's lead — getCurrentLead() finds-or-creates it by
// clerkUserId and migrates in any unclaimed anonymous quiz data on first
// link (see lib/lead.ts) — then sends them to the dashboard, which is now
// reachable regardless of quiz/upload/payment state and renders its own
// empty states.
export async function POST() {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ nextUrl: "/onboarding/sign-up" });
  }

  const lead = await getCurrentLead();
  if (!lead) {
    return NextResponse.json({ nextUrl: "/onboarding/questions/1" });
  }

  return NextResponse.json({ nextUrl: "/dashboard" });
}
