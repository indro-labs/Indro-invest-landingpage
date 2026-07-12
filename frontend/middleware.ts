import { NextResponse } from "next/server";
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isProtectedRoute = createRouteMatcher(["/dashboard(.*)"]);

// Clerk isn't configured in every environment yet — pass requests through
// rather than crash when the secret key is unset.
const clerkEnabled = !!process.env.CLERK_SECRET_KEY;

export default clerkEnabled
  ? clerkMiddleware(async (auth, req) => {
      if (isProtectedRoute(req)) await auth.protect();
    })
  : () => NextResponse.next();

export const config = {
  // Clerk needs to run on any route that calls auth()/currentUser(), not
  // just the ones it protects — protection itself happens above, scoped to
  // /dashboard. This is Clerk's standard "run everywhere except static
  // assets" matcher.
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
