import { redirect } from "next/navigation";
import { SignUp } from "@clerk/nextjs";
import { getCurrentLead } from "@/lib/lead";

const clerkEnabled = !!process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;

const BENEFITS = [
  {
    title: "Your full, in-depth report",
    body: "See your complete analysis with patterns, strengths, and blind spots.",
    icon: <path d="M4 16h16M4 8h16M4 12h16" />,
  },
  {
    title: "Personalized recommendations",
    body: "Actionable steps tailored to your psychology and trading style.",
    icon: (
      <>
        <circle cx="12" cy="12" r="9" />
        <circle cx="12" cy="12" r="4" />
        <path d="M17 7l3-3" />
      </>
    ),
  },
  {
    title: "Track, improve, and grow",
    body: "Log your trades, measure progress, and watch your performance evolve.",
    icon: <path d="M4 20l6-6 4 4 6-8" />,
  },
  {
    title: "100% private. Always.",
    body: "Your data is encrypted and never shared.",
    icon: (
      <path d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3z" />
    ),
  },
];

const TRUST = ["Human reviewed", "Your data stays private"];

function BenefitIcon({ children }: { children: React.ReactNode }) {
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

  return (
    <div className="rise grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-w-0 py-6">
      <div className="w-full min-w-0 max-w-md mx-auto lg:mx-0">
        <h1 className="display text-4xl md:text-5xl leading-tight mb-9 text-white text-balance">
          Become the trader{" "}
          <span style={{ color: "var(--accent-light)" }}>you know you can be</span>.
        </h1>

        <div className="flex flex-col gap-5">
          {BENEFITS.map((b) => (
            <div key={b.title} className="flex items-start gap-3.5">
              <BenefitIcon>{b.icon}</BenefitIcon>
              <div>
                <p className="text-sm font-medium text-white">{b.title}</p>
                <p className="text-sm text-ink-faint">{b.body}</p>
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
              signInUrl="/onboarding/sign-in"
              forceRedirectUrl="/onboarding/processing"
              appearance={{
                variables: {
                  colorPrimary: "#7c3aed",
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
                    boxShadow: "0 0 0 1px rgba(167,139,250,0.3), 0 30px 70px -20px rgba(0,0,0,0.8)",
                    borderRadius: "1.25rem",
                    overflow: "hidden",
                  },
                  card: { boxShadow: "none", padding: "1.75rem", width: "100%" },
                  footer: { background: "#141220", boxShadow: "none" },
                  footerAction: { background: "#141220" },
                  // Google's own brand guidance is a light button — force it
                  // white regardless of the dark theme, and pin that on
                  // hover too (it was defaulting to a dark hover state).
                  socialButtonsBlockButton: {
                    background: "#ffffff",
                    borderColor: "#ffffff",
                    color: "#1f1f1f",
                    height: "2.75rem",
                    "&:hover": {
                      background: "#f3f3f3",
                      borderColor: "#f3f3f3",
                      color: "#1f1f1f",
                    },
                    "&:focus": {
                      background: "#ffffff",
                      borderColor: "#ffffff",
                      color: "#1f1f1f",
                    },
                  },
                  socialButtonsBlockButtonText: {
                    color: "#1f1f1f",
                    fontWeight: 500,
                    "&:hover": { color: "#1f1f1f" },
                  },
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
