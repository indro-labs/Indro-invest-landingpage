export default function PaymentTierCard({
  title,
  price,
  cadence,
  features,
  href,
  recommended,
  ctaLabel,
}: {
  title: string;
  price: string;
  cadence: string;
  features: string[];
  href: string;
  recommended?: boolean;
  ctaLabel: string;
}) {
  return (
    <div
      className="relative rounded-3xl backdrop-blur-xl p-6 md:p-7 flex flex-col"
      style={{
        border: recommended ? "1px solid rgba(167,139,250,0.55)" : "1px solid var(--line-soft)",
        background: recommended
          ? "linear-gradient(160deg, rgba(124,58,237,0.18), rgba(124,58,237,0.04))"
          : "rgba(255,255,255,0.03)",
        boxShadow: recommended ? "0 25px 55px -25px rgba(88,28,235,0.55)" : "none",
      }}
    >
      {recommended && (
        <span className="absolute -top-3 left-6 rounded-full bg-accent px-3 py-1 text-xs font-semibold text-white">
          Most traders choose this
        </span>
      )}
      <p className="text-white font-semibold text-lg mb-1">{title}</p>
      <p className="mb-5">
        <span className="display text-3xl text-white">{price}</span>{" "}
        <span className="text-ink-faint text-sm">{cadence}</span>
      </p>
      <ul className="flex-1 flex flex-col gap-2.5 mb-7">
        {features.map((f) => (
          <li key={f} className="flex items-start gap-2 text-sm text-ink-soft">
            <span className="mt-0.5 shrink-0" style={{ color: "var(--good)" }} aria-hidden="true">
              ✓
            </span>
            {f}
          </li>
        ))}
      </ul>
      <a
        href={href}
        className={`text-center inline-flex items-center justify-center px-6 py-3.5 text-base ${
          recommended ? "btn-solid" : "btn-ghost"
        }`}
      >
        {ctaLabel}
      </a>
    </div>
  );
}
