import { NextRequest, NextResponse } from "next/server";
import { clearLeadCookie } from "@/lib/lead";

// Clerk's sign-out doesn't know about our anonymous lead cookie, so
// <UserButton afterSignOutUrl> points here to clear it — otherwise it
// persists after logout and leaks into whichever account signs in next on
// the same browser.
export async function GET(req: NextRequest) {
  await clearLeadCookie();
  return NextResponse.redirect(new URL("/", req.url));
}
