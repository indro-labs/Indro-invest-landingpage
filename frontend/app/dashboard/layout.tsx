import { redirect } from "next/navigation";
import Link from "next/link";
import { auth } from "@clerk/nextjs/server";
import { UserButton } from "@clerk/nextjs";
import { prisma } from "@/lib/prisma";
import SelniteMark from "@/app/components/SelniteMark";

const clerkEnabled = !!process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  if (!clerkEnabled) redirect("/");

  const { userId } = await auth();
  if (!userId) redirect("/onboarding/sign-up");

  const lead = await prisma.lead.findUnique({ where: { clerkUserId: userId } });
  if (!lead || lead.status !== "paid") redirect("/onboarding/payment");

  return (
    <div className="min-h-screen bg-bg text-ink">
      <header className="px-6 py-5 border-b border-line-soft flex items-center justify-between">
        <Link href="/" className="inline-flex items-center gap-2 text-white opacity-90 hover:opacity-100 transition-opacity">
          <SelniteMark size={20} />
          <span className="text-lg font-bold tracking-tight">Selnite</span>
        </Link>
        <UserButton afterSignOutUrl="/api/auth/clear-lead" />
      </header>
      <main className="px-6 py-10 max-w-3xl mx-auto">{children}</main>
    </div>
  );
}
