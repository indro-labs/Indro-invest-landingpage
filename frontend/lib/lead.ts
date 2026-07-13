import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";

export const LEAD_COOKIE = "selnite_lead_id";
const LEAD_COOKIE_MAX_AGE = 60 * 60 * 24 * 30; // 30 days

export async function createLead() {
  const lead = await prisma.lead.create({ data: {} });
  const jar = await cookies();
  jar.set(LEAD_COOKIE, lead.id, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: LEAD_COOKIE_MAX_AGE,
    path: "/",
  });
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
