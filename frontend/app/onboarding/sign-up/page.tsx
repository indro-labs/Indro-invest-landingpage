import { redirect } from "next/navigation";
import { SignUp } from "@clerk/nextjs";
import { getCurrentLead } from "@/lib/lead";

const clerkEnabled = !!process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;

export default async function SignUpPage() {
  const lead = await getCurrentLead();
  if (!lead || !lead.traderType) redirect("/onboarding/questions/1");

  return (
    <div className="rise">
      <p className="section-label mb-3">Almost there</p>
      <h1 className="display text-2xl md:text-3xl leading-tight mb-3">
        Create your account to see the full analysis.
      </h1>
      <p className="text-ink-soft leading-relaxed mb-8 max-w-lg">
        Your trade history is uploaded and your trader-type result is ready —
        sign up to unlock it.
      </p>

      {clerkEnabled ? (
        <SignUp
          routing="hash"
          signInUrl="/onboarding/sign-up"
          forceRedirectUrl="/onboarding/processing"
        />
      ) : (
        <div
          className="rounded-3xl surface p-6 text-ink-soft"
          style={{ boxShadow: "var(--shadow)" }}
        >
          Sign-up isn&apos;t configured yet — add your Clerk keys to
          .env.local to enable this step.
        </div>
      )}
    </div>
  );
}
