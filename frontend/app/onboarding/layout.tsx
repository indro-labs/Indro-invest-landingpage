import Link from "next/link";
import { Show, UserButton } from "@clerk/nextjs";
import SelniteMark from "@/app/components/SelniteMark";

const clerkEnabled = !!process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;

export default function OnboardingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative min-h-screen bg-bg text-ink flex flex-col overflow-hidden">
      <div className="fixed inset-0 z-0">
        <video
          className="absolute inset-0 h-full w-full object-cover opacity-[0.18]"
          src="/herovideo.mp4"
          poster="/moon-poster.jpg"
          autoPlay
          loop
          muted
          playsInline
        />
        <div
          className="absolute inset-0"
          style={{ background: "rgba(124,58,237,0.35)", mixBlendMode: "color" }}
        />
        <div className="absolute inset-0" style={{ background: "rgba(5,5,5,0.72)" }} />
      </div>

      <header className="relative z-10 px-6 py-5 flex items-center justify-between">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-white opacity-90 hover:opacity-100 transition-opacity"
        >
          <SelniteMark size={20} />
          <span className="text-lg font-bold tracking-tight">Selnite</span>
        </Link>
        {clerkEnabled && (
          <Show when="signed-in">
            <UserButton />
          </Show>
        )}
      </header>
      <main className="relative z-10 flex-1 flex items-start justify-center px-4 sm:px-6 py-10 md:py-16 min-w-0 overflow-x-hidden">
        <div className="w-full min-w-0 max-w-5xl">{children}</div>
      </main>
    </div>
  );
}
