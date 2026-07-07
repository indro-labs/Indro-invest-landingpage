/**
 * Category comparison, not a named-competitor callout (keeps it clean and
 * out of legal reach). The contrast we're drawing: most journals are
 * reactive and leave the work to you; Selnite is proactive and does it.
 * Every claim is something Selnite genuinely does, no over-promising.
 */

type Row = {
  most: string;
  selnite: string;
  mark?: string;
};

const ROWS: Row[] = [
  {
    most: "Reactive: you log, then guess",
    selnite: "Proactive: a rule before your next trade",
  },
  {
    most: "Shows you what happened",
    selnite: "Tells you why it happened",
  },
  {
    most: "You hunt for the patterns",
    selnite: "Patterns found for you",
  },
  {
    most: "Just your trades",
    selnite: "The market behind each trade",
    mark: "†",
  },
];

function Check() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="mt-0.5 shrink-0">
      <path
        d="M20 6 9 17l-5-5"
        stroke="var(--accent)"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function Cross() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="mt-0.5 shrink-0">
      <path d="M6 6l12 12M18 6 6 18" stroke="var(--ink-faint)" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export default function MarketComparison() {
  return (
    <div className="mx-auto max-w-3xl">
      <div className="grid grid-cols-2 gap-3 border-b border-line pb-3 sm:gap-5">
        <p className="text-[13px] font-semibold uppercase tracking-wide text-ink-faint">
          Most journals
        </p>
        <p className="pl-3 text-[13px] font-semibold uppercase tracking-wide text-accent">
          Selnite
        </p>
      </div>

      {ROWS.map((row) => (
        <div key={row.selnite} className="grid grid-cols-2 gap-3 border-t border-line py-3 sm:gap-5">
          <div className="flex items-start gap-2.5 py-2">
            <Cross />
            <span className="text-[14px] leading-snug text-ink-soft sm:text-[15px]">{row.most}</span>
          </div>
          <div className="flex items-start gap-2.5 rounded-xl bg-accent-soft px-3 py-2">
            <Check />
            <span className="text-[14px] leading-snug text-ink sm:text-[15px]">
              {row.selnite}
              {row.mark && <sup className="text-ink-faint">{row.mark}</sup>}
            </span>
          </div>
        </div>
      ))}

      <p className="mt-6 border-t border-line-soft pt-5 text-[12px] leading-relaxed text-ink-faint">
        † Requires trade timestamps from your broker or imported file.
      </p>
    </div>
  );
}
