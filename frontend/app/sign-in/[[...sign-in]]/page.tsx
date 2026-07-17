import { redirect } from "next/navigation";

// The generic Clerk catch-all route. The actual, styled sign-in experience
// lives at /onboarding/sign-in (routes through the resolve-session flow so
// returning users land wherever their account actually is — dashboard,
// payment, upload, etc). This route only exists so anything that falls back
// to Clerk's default /sign-in convention still ends up somewhere correct,
// instead of maintaining a second, drifting copy of the same widget.
export default function SignInPage() {
  redirect("/onboarding/sign-in");
}
