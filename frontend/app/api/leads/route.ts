import { NextResponse } from "next/server";
import { createLead, getCurrentLead } from "@/lib/lead";

export async function POST() {
  const existing = await getCurrentLead();
  if (existing) {
    return NextResponse.json({ id: existing.id, status: existing.status });
  }
  const lead = await createLead();
  return NextResponse.json({ id: lead.id, status: lead.status });
}
