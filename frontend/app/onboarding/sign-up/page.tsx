import { redirect } from "next/navigation";
import { SignUp } from "@clerk/nextjs";
import { getCurrentLead } from "@/lib/lead";
import { getTraderTypeByKey } from "@/lib/trader-types";

const clerkEnabled = !!process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;

const NEXT_STEPS = [
  {
    title: "Upload your trades",
    body: "Takes under a minute.",
    icon: <path d="M4 16h16M4 8h16M4 12h16" />,
  },
  {
    title: "Get your report",
    body: "Reviewed by a real trader.",
    icon: <path d="M12 3l1.6 5.4L19 10l-5.4 1.6L12 17l-1.6-5.4L5 10l5.4-1.6L12 3z" />,
  },
  {
    title: "See the exact trades",
    body: "Plus one rule to catch it next time.",
    icon: <path d="M4 20l6-6 4 4 6-8" />,
  },
];

const TRUST = ["Human reviewed", "Your data stays private"];

function StepIcon({ children }: { children: React.ReactNode }) {
  return (
    <span
      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl"
      style={{ background: "rgba(124,58,237,0.15)", border: "1px solid rgba(167,139,250,0.25)" }}
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--accent-light)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        {children}
      </svg>
    </span>
  );
}

export default async function SignUpPage() {
  const lead = await getCurrentLead();
  if (!lead || !lead.traderType) redirect("/onboarding/questions/1");

  const traderType = getTraderTypeByKey(lead.traderType);

  return (
    <div className="rise grid grid-cols-1 lg:grid-cols-2 gap-10 items-center min-w-0">
      <div className="w-full min-w-0 max-w-md mx-auto lg:mx-0">
        <h1 className="display text-3xl leading-snug mb-3 text-white text-balance">
          You know your type. Now see what it&apos;s costing you.
        </h1>
        <p className="text-ink-soft mb-8">
          Your {traderType.label} result is only saved to this browser — create an account to keep it.
        </p>

        <div className="flex flex-col gap-4">
          {NEXT_STEPS.map((step) => (
            <div key={step.title} className="flex items-center gap-3.5">
              <StepIcon>{step.icon}</StepIcon>
              <div>
                <p className="text-sm font-medium text-white">{step.title}</p>
                <p className="text-sm text-ink-faint">{step.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="w-full min-w-0 flex justify-center">
        {clerkEnabled ? (
          <div className="w-full max-w-sm min-w-0">
            <SignUp
              routing="hash"
              signInUrl="/onboarding/sign-up"
              forceRedirectUrl="/onboarding/processing"
              appearance={{
                variables: {
                  colorPrimary: "#a78bfa",
                  colorBackground: "#141220",
                  colorInput: "rgba(255,255,255,0.06)",
                  colorInputForeground: "#ffffff",
                  colorForeground: "#ffffff",
                  colorMutedForeground: "rgba(240,239,244,0.55)",
                  colorBorder: "rgba(255,255,255,0.1)",
                  borderRadius: "0.9rem",
                },
                elements: {
                  rootBox: { width: "100%", maxWidth: "100%" },
                  cardBox: {
                    width: "100%",
                    maxWidth: "100%",
                    boxShadow: "0 0 0 1px rgba(167,139,250,0.25), 0 30px 70px -20px rgba(0,0,0,0.8)",
                    borderRadius: "1.25rem",
                    overflow: "hidden",
                  },
                  card: { boxShadow: "none", padding: "1.5rem", width: "100%" },
                  footer: { background: "#141220", boxShadow: "none" },
                  footerAction: { background: "#141220" },
                },
              }}
            />
            <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-1 mt-5">
              {TRUST.map((t) => (
                <span key={t} className="text-xs text-ink-faint">{t}</span>
              ))}
            </div>
          </div>
        ) : (
          <div
            className="rounded-2xl backdrop-blur-xl p-6 text-ink-soft w-full max-w-sm"
            style={{ border: "1px solid var(--line-soft)", background: "rgba(255,255,255,0.04)" }}
          >
            Sign-up isn&apos;t configured yet — add your Clerk keys to
            .env.local to enable this step.
          </div>
        )}
      </div>
    </div>
  );
}
