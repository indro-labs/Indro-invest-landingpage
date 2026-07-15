import { cookies } from "next/headers";
import { auth, currentUser } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";

export const LEAD_COOKIE = "selnite_lead_id";
const LEAD_COOKIE_MAX_AGE = 60 * 60 * 24 * 30; // 30 days

const clerkEnabled = !!process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;

type LeadRecord = NonNullable<Awaited<ReturnType<typeof prisma.lead.findUnique>>>;

/**
 * Identity model (fixes the bug where the anonymous `selnite_lead_id`
 * cookie and Clerk's `userId` acted as two independent sources of truth
 * for "who is the current lead," and different routes trusted different
 * ones — letting a stale cookie from a previous account leak into a
 * different, currently-signed-in user's session: wrong cached quiz
 * answers, redirect loops between /dashboard and /onboarding/payment,
 * forced re-onboarding, etc).
 *
 * The rule now: if a Clerk session exists, `clerkUserId` is the ONLY
 * identity that matters — the cookie is never read for a signed-in
 * request. The cookie is exclusively the *pre-auth* visitor identity. The
 * moment a Lead gets linked to a clerkUserId, it permanently stops being
 * eligible for anonymous/cookie-based reuse, even if the browser still
 * carries an old cookie pointing at it (e.g. after sign-out) — so a stale
 * cookie can never again be misread as "my in-progress quiz."
 */

async function getEmail() {
  const user = await currentUser();
  return user?.emailAddresses.find((e) => e.id === user.primaryEmailAddressId)?.emailAddress;
}

async function setLeadCookie(leadId: string) {
  const jar = await cookies();
  jar.set(LEAD_COOKIE, leadId, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: LEAD_COOKIE_MAX_AGE,
    path: "/",
  });
}

async function clearLeadCookie() {
  const jar = await cookies();
  try {
    jar.delete(LEAD_COOKIE);
  } catch {
    // Not allowed to write cookies from this context (Server Component
    // render) — harmless no-op; a Route Handler/Server Action call will
    // clear it later, or getCurrentLead() just keeps returning null here.
  }
}

/** Creates a brand-new anonymous lead and cookie. Pre-auth entry point only. */
export async function createLead() {
  const lead = await prisma.lead.create({ data: {} });
  await setLeadCookie(lead.id);
  return lead;
}

export async function getCurrentLeadId() {
  const jar = await cookies();
  return jar.get(LEAD_COOKIE)?.value ?? null;
}

/**
 * Finds (or creates) the Lead for a signed-in Clerk user. If they've never
 * been linked before, adopts the in-progress anonymous cookie lead — but
 * only if nobody else has already claimed it.
 */
async function getOrCreateLeadForUser(userId: string): Promise<LeadRecord> {
  const linked = await prisma.lead.findUnique({ where: { clerkUserId: userId } });
  if (linked) return linked;

  const anonId = await getCurrentLeadId();
  const anonLead = anonId ? await prisma.lead.findUnique({ where: { id: anonId } }) : null;

  if (anonLead && !anonLead.clerkUserId) {
    const email = await getEmail();
    return prisma.lead.update({
      where: { id: anonLead.id },
      data: { clerkUserId: userId, status: "signed_up", ...(email ? { email } : {}) },
    });
  }

  const email = await getEmail();
  return prisma.lead.create({
    data: { clerkUserId: userId, status: "signed_up", ...(email ? { email } : {}) },
  });
}

/**
 * The single entry point every page/route should use to resolve "the
 * current lead." Signed in -> Clerk userId is authoritative (find or
 * create, migrating anonymous quiz data in on first link). Signed out ->
 * the cookie is the temporary pre-auth identity, but only if it points to
 * a still-unclaimed lead; a cookie pointing at an already-linked lead is
 * stale (e.g. left over after sign-out) and is discarded.
 */
export async function getCurrentLead(): Promise<LeadRecord | null> {
  const userId = clerkEnabled ? (await auth()).userId : null;
  if (userId) return getOrCreateLeadForUser(userId);

  const leadId = await getCurrentLeadId();
  if (!leadId) return null;

  const lead = await prisma.lead.findUnique({ where: { id: leadId } });
  if (!lead) return null;

  if (lead.clerkUserId) {
    // Belongs to someone else's account now (or the same person after
    // signing out) — never treat it as "my" in-progress quiz.
    await clearLeadCookie();
    return null;
  }

  return lead;
}

/**
 * Ownership check for routes that receive an explicit lead id (e.g.
 * PATCH/GET /api/leads/[id]) rather than resolving one themselves. Signed
 * in -> must own it via clerkUserId. Signed out -> must be the unclaimed
 * lead the cookie points to.
 */
export async function ownsLead(lead: LeadRecord): Promise<boolean> {
  const userId = clerkEnabled ? (await auth()).userId : null;
  if (userId) return lead.clerkUserId === userId;

  if (lead.clerkUserId) return false;
  const leadId = await getCurrentLeadId();
  return leadId === lead.id;
}
