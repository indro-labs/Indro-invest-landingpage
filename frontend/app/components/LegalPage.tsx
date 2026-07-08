import Link from "next/link";
import SelniteMark from "./SelniteMark";

type Section = {
  number: number;
  heading: string;
  body: string;
};

export default function LegalPage({
  title,
  updated,
  sections,
  closing,
}: {
  title: string;
  updated: string;
  sections: Section[];
  closing?: string;
}) {
  return (
    <div className="min-h-screen bg-bg text-white">
      <header className="border-b px-4 py-5 sm:px-6" style={{ borderColor: "var(--line)" }}>
        <div className="mx-auto flex max-w-3xl items-center">
          <Link href="/" className="flex items-center gap-2 text-white">
            <SelniteMark size={20} />
            <span className="text-lg font-bold tracking-tight">Selnite</span>
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-20">
        <h1 className="display mb-3 text-4xl sm:text-5xl">{title}</h1>
        <p className="mb-14 text-sm text-ink-faint">Last updated: {updated}</p>

        <div className="flex flex-col gap-10">
          {sections.map((s) => (
            <section key={s.number}>
              <h2 className="mb-3 text-xl font-bold text-white">
                {s.number}. {s.heading}
              </h2>
              <p className="whitespace-pre-line text-base leading-relaxed text-ink-soft">{s.body}</p>
            </section>
          ))}
        </div>

        {closing && <p className="mt-16 border-t pt-8 text-sm leading-relaxed text-ink-faint" style={{ borderColor: "var(--line)" }}>{closing}</p>}
      </main>
    </div>
  );
}
