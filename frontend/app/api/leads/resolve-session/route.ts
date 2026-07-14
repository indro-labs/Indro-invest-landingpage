import { NextResponse } from "next/server";
import { auth, currentUser } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { getCurrentLeadId, setLeadCookie, clearLeadCookie } from "@/lib/lead";

// Called right after Clerk auth completes (sign-up or sign-in). Clerk is the
// single source of truth once someone is authenticated, so this always
// resolves by clerkUserId first. The anonymous cookie's lead is only ever
// adopted when it exists and isn't already claimed by someone else, and the
// cookie is always re-synced (or cleared) afterward — otherwise a stale
// cookie left over from a previous account/session leaks into whichever
// Clerk user signs in next on the same browser.
export async function POST() {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ nextUrl: "/onboarding/sign-up" });
  }

  let lead = await prisma.lead.findUnique({ where: { clerkUserId: userId } });

  if (!lead) {
    const cookieLeadId = await getCurrentLeadId();
    const cookieLead = cookieLeadId
      ? await prisma.lead.findUnique({ where: { id: cookieLeadId } })
      : null;

    if (cookieLead && !cookieLead.clerkUserId) {
      const user = await currentUser();
      const email = user?.emailAddresses.find(
        (e) => e.id === user.primaryEmailAddressId
      )?.emailAddress;
      lead = await prisma.lead.update({
        where: { id: cookieLead.id },
        data: {
          clerkUserId: userId,
          status: cookieLead.status === "started" ? "signed_up" : cookieLead.status,
          ...(email ? { email } : {}),
        },
      });
    }
  }

  if (lead) {
    await setLeadCookie(lead.id);
  } else {
    await clearLeadCookie();
  }

  if (!lead) return NextResponse.json({ nextUrl: "/onboarding/questions/1" });
  if (lead.status === "paid") return NextResponse.json({ nextUrl: "/dashboard" });
  if (lead.status === "upload_done") return NextResponse.json({ nextUrl: "/onboarding/payment" });
  if (lead.traderType) return NextResponse.json({ nextUrl: "/onboarding/upload" });
  return NextResponse.json({ nextUrl: "/onboarding/questions/1" });
}
