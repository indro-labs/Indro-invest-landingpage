import { redirect } from "next/navigation";
import { auth, currentUser } from "@clerk/nextjs/server";
import { linkClerkUser, getCurrentLead } from "@/lib/lead";

const clerkEnabled = !!process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;

export default async function ProcessingPage() {
  if (!clerkEnabled) redirect("/onboarding/sign-up");

  const lead = await getCurrentLead();
  if (!lead) redirect("/onboarding/questions/1");

  const { userId } = await auth();
  if (!userId) redirect("/onboarding/sign-up");

  if (!lead.clerkUserId) {
    const user = await currentUser();
    const email = user?.emailAddresses.find(
      (e) => e.id === user.primaryEmailAddressId
    )?.emailAddress;
    await linkClerkUser(userId, email);
  }

  redirect("/onboarding/upload");
}
