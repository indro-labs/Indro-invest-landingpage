const ROWS = [
  {
    market: "Track trades and P&L",
    selnite: "Track behavior and process",
  },
  {
    market: "Manual journal entries",
    selnite: "Patterns detected automatically",
  },
  {
    market: "Motivational tips",
    selnite: "One rule backed by your data",
  },
  {
    market: "No session analysis",
    selnite: "Performance by hour and day",
  },
  {
    market: "Your data is the product",
    selnite: "Private. We never touch your funds.",
  },
];

export default function MarketComparison() {
  return (
    <div className="mx-auto max-w-3xl">
      <div className="mb-8 hidden grid-cols-2 gap-8 border-b border-line pb-4 sm:grid">
        <p className="text-[13px] font-semibold uppercase tracking-wide text-ink-faint">
          Most tools
        </p>
        <p className="text-[13px] font-semibold uppercase tracking-wide text-accent">
          Selnite
        </p>
      </div>

      <div className="flex flex-col">
        {ROWS.map((row) => (
          <div
            key={row.market}
            className="grid gap-2 border-t border-line py-5 sm:grid-cols-2 sm:gap-8"
          >
            <p className="text-[15px] text-ink-soft">{row.market}</p>
            <p className="text-[15px] text-ink">{row.selnite}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
