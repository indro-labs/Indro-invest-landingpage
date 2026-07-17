import { redirect } from "next/navigation";
import ResolveSession from "@/app/components/onboarding/ResolveSession";

const clerkEnabled = !!process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;

export default function ProcessingPage() {
  if (!clerkEnabled) redirect("/onboarding/sign-up");

  return <ResolveSession />;
}
