import { SignIn } from "@clerk/nextjs";

const clerkEnabled = !!process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;

export default function SignInPage() {
  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      {clerkEnabled ? (
        <div className="w-full max-w-sm min-w-0">
          <SignIn
            forceRedirectUrl="/dashboard"
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
                socialButtonsBlockButton: { color: "#ffffff", borderColor: "rgba(255,255,255,0.1)" },
                socialButtonsBlockButtonText: { color: "#ffffff" },
              },
            }}
          />
        </div>
      ) : (
        <div
          className="rounded-2xl backdrop-blur-xl p-6 text-ink-soft w-full max-w-sm"
          style={{ border: "1px solid var(--line-soft)", background: "rgba(255,255,255,0.04)" }}
        >
          Sign-in isn&apos;t configured yet — add your Clerk keys to .env.local to enable this step.
        </div>
      )}
    </div>
  );
}
