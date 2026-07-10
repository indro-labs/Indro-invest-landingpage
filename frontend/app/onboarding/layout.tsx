import Link from "next/link";
import SelniteMark from "@/app/components/SelniteMark";

export default function OnboardingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative min-h-screen bg-bg text-ink flex flex-col overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-0"
        style={{
          backgroundImage: `
            radial-gradient(700px circle at 12% 8%, rgba(124,58,237,0.10), transparent 60%),
            radial-gradient(600px circle at 88% 82%, rgba(124,58,237,0.06), transparent 60%),
            repeating-linear-gradient(to right, rgba(255,255,255,0.025) 0px, rgba(255,255,255,0.025) 1px, transparent 1px, transparent 64px),
            repeating-linear-gradient(to bottom, rgba(255,255,255,0.025) 0px, rgba(255,255,255,0.025) 1px, transparent 1px, transparent 64px)
          `,
        }}
      />
      <header className="relative z-10 px-6 py-5 border-b border-line-soft">
        <Link href="/" className="inline-flex items-center gap-2 opacity-90 hover:opacity-100 transition-opacity">
          <SelniteMark className="h-6 w-6" />
          <span className="font-semibold tracking-tight">Selnite</span>
        </Link>
      </header>
      <main className="relative z-10 flex-1 flex items-start justify-center px-6 py-10 md:py-16">
        <div className="w-full max-w-2xl">{children}</div>
      </main>
    </div>
  );
}
