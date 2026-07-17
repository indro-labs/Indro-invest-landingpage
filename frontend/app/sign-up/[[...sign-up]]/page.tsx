import { redirect } from "next/navigation";

// The generic Clerk catch-all route. The actual, styled sign-up experience
// lives at /onboarding/sign-up (routes through the resolve-session flow so
// new users land in upload/payment and returning users land wherever their
// account actually is). This route only exists so anything that falls back
// to Clerk's default /sign-up convention still ends up somewhere correct,
// instead of maintaining a second, drifting copy of the same widget.
export default function SignUpPage() {
  redirect("/onboarding/sign-up");
}
