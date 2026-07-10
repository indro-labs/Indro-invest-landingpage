import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";

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
        <span className="font-semibold tracking-tight">Selnite</span>
      </header>
      <main className="px-6 py-10 max-w-3xl mx-auto">{children}</main>
    </div>
  );
}
