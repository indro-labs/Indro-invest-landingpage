import { NextResponse } from "next/server";
import { auth, currentUser } from "@clerk/nextjs/server";
import { linkClerkUser } from "@/lib/lead";

export async function POST() {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "not signed in" }, { status: 401 });
  }
  const user = await currentUser();
  const email = user?.emailAddresses.find(
    (e) => e.id === user.primaryEmailAddressId
  )?.emailAddress;
  const lead = await linkClerkUser(userId, email);
  if (!lead) {
    return NextResponse.json({ error: "no active session" }, { status: 400 });
  }
  return NextResponse.json({ id: lead.id, status: lead.status });
}
