// Simple email-allowlist admin gate — no role system yet. Set ADMIN_EMAILS
// in .env.local as a comma-separated list. Defaults to nobody (fail closed).
export function isAdminEmail(email: string | null | undefined) {
  if (!email) return false;
  const allowlist = (process.env.ADMIN_EMAILS ?? "")
    .split(",")
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean);
  return allowlist.includes(email.toLowerCase());
}
