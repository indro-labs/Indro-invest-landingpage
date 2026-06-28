/**
 * A small, tasteful stack of monogram avatars. Initials rather than stock
 * faces — honest, and reads more premium than borrowed photography.
 */
const PEOPLE = [
  { initials: "JM", tone: "accent" },
  { initials: "AR", tone: "sunk" },
  { initials: "SK", tone: "accent" },
  { initials: "DV", tone: "sunk" },
  { initials: "LN", tone: "accent" },
] as const;

export default function AvatarStack({
  count = 214,
  align = "start",
}: {
  count?: number;
  align?: "start" | "center";
}) {
  return (
    <div
      className={`flex items-center gap-3 ${
        align === "center" ? "justify-center" : ""
      }`}
    >
      <div className="flex -space-x-2.5">
        {PEOPLE.map((p, i) => (
          <span
            key={i}
            className="grid h-9 w-9 place-items-center rounded-full border-2 text-[0.68rem] font-semibold tracking-wide"
            style={{
              background: p.tone === "accent" ? "var(--accent-soft)" : "var(--bg-sunk)",
              color: p.tone === "accent" ? "var(--accent)" : "var(--ink-soft)",
              borderColor: "var(--bg)",
              zIndex: PEOPLE.length - i,
            }}
          >
            {p.initials}
          </span>
        ))}
        <span
          className="grid h-9 w-9 place-items-center rounded-full border-2 text-[0.64rem] font-semibold"
          style={{
            background: "var(--solid)",
            color: "var(--solid-ink)",
            borderColor: "var(--bg)",
          }}
        >
          +{count - 5}
        </span>
      </div>
      <p className="text-sm text-ink-soft leading-snug">
        <span className="text-ink font-medium">{count} traders</span> on the
        waitlist
      </p>
    </div>
  );
}
