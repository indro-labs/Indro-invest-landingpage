import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { auth, currentUser } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { getCurrentLeadId, LEAD_COOKIE } from "@/lib/lead";

const LEAD_COOKIE_MAX_AGE = 60 * 60 * 24 * 30; // 30 days

// Called right after Clerk auth completes (sign-up or sign-in). Figures out
// which Lead belongs to this person and where they should land next —
// handles the case where they're signing in on a device/browser that never
// had our lead cookie set, by falling back to the durable clerkUserId link
// instead of assuming "no cookie" means "brand new visitor".
export async function POST() {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ nextUrl: "/onboarding/sign-up" });
  }

  const cookieLeadId = await getCurrentLeadId();
  let lead = cookieLeadId
    ? await prisma.lead.findUnique({ where: { id: cookieLeadId } })
    : null;

  if (!lead || (lead.clerkUserId && lead.clerkUserId !== userId)) {
    lead = await prisma.lead.findUnique({ where: { clerkUserId: userId } });
    if (lead) {
      const jar = await cookies();
      jar.set(LEAD_COOKIE, lead.id, {
        httpOnly: true,
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
        maxAge: LEAD_COOKIE_MAX_AGE,
        path: "/",
      });
    }
  }

  if (!lead) {
    return NextResponse.json({ nextUrl: "/onboarding/questions/1" });
  }

  if (!lead.clerkUserId) {
    const user = await currentUser();
    const email = user?.emailAddresses.find(
      (e) => e.id === user.primaryEmailAddressId
    )?.emailAddress;
    lead = await prisma.lead.update({
      where: { id: lead.id },
      data: { clerkUserId: userId, status: "signed_up", ...(email ? { email } : {}) },
    });
  }

  if (lead.status === "paid") return NextResponse.json({ nextUrl: "/dashboard" });
  if (lead.status === "upload_done") return NextResponse.json({ nextUrl: "/onboarding/payment" });
  if (lead.traderType) return NextResponse.json({ nextUrl: "/onboarding/upload" });
  return NextResponse.json({ nextUrl: "/onboarding/questions/1" });
}
