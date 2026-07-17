import { redirect } from "next/navigation";
import { currentUser } from "@clerk/nextjs/server";
import { isAdminEmail } from "@/lib/admin";

const clerkEnabled = !!process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  if (!clerkEnabled) redirect("/");

  const user = await currentUser();
  const email = user?.emailAddresses.find(
    (e) => e.id === user.primaryEmailAddressId
  )?.emailAddress;

  if (!isAdminEmail(email)) redirect("/");

  return (
    <div className="min-h-screen bg-bg text-ink">
      <header className="px-6 py-5 border-b border-line-soft">
        <span className="font-semibold tracking-tight">Selnite Admin</span>
      </header>
      <main className="px-6 py-10 max-w-5xl mx-auto">{children}</main>
    </div>
  );
}
