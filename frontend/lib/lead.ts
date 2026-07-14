import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";

export const LEAD_COOKIE = "selnite_lead_id";
const LEAD_COOKIE_MAX_AGE = 60 * 60 * 24 * 30; // 30 days

const LEAD_COOKIE_OPTIONS = {
  httpOnly: true,
  sameSite: "lax" as const,
  secure: process.env.NODE_ENV === "production",
  path: "/",
};

export async function setLeadCookie(leadId: string) {
  const jar = await cookies();
  jar.set(LEAD_COOKIE, leadId, { ...LEAD_COOKIE_OPTIONS, maxAge: LEAD_COOKIE_MAX_AGE });
}

export async function clearLeadCookie() {
  const jar = await cookies();
  jar.delete(LEAD_COOKIE);
}

export async function createLead() {
  const lead = await prisma.lead.create({ data: {} });
  await setLeadCookie(lead.id);
  return lead;
}

export async function getCurrentLeadId() {
  const jar = await cookies();
  return jar.get(LEAD_COOKIE)?.value ?? null;
}

export async function getCurrentLead() {
  const leadId = await getCurrentLeadId();
  if (!leadId) return null;
  return prisma.lead.findUnique({ where: { id: leadId } });
}
