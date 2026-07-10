import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { linkClerkUser } from "@/lib/lead";

export async function POST() {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "not signed in" }, { status: 401 });
  }
  const lead = await linkClerkUser(userId);
  if (!lead) {
    return NextResponse.json({ error: "no active session" }, { status: 400 });
  }
  return NextResponse.json({ id: lead.id, status: lead.status });
}
