/**
 * Brokerage logo carousel — two rows scrolling in opposite directions.
 * We render clean monochrome wordmarks (a small geometric mark + the
 * name) rather than borrowed brand assets: consistent, premium, and it
 * never ships a broken logo. The point it makes: "works with wherever
 * you already trade."
 */

type Mark = "diamond" | "ring" | "bars" | "triangle" | "hex" | "spark";

const ROW_A: { name: string; mark: Mark }[] = [
  { name: "Interactive Brokers", mark: "hex" },
  { name: "Charles Schwab", mark: "ring" },
  { name: "Fidelity", mark: "triangle" },
  { name: "Robinhood", mark: "spark" },
  { name: "E*TRADE", mark: "bars" },
  { name: "thinkorswim", mark: "diamond" },
  { name: "Webull", mark: "ring" },
  { name: "tastytrade", mark: "triangle" },
  { name: "TradeStation", mark: "bars" },
  { name: "Tradovate", mark: "hex" },
];

const ROW_B: { name: string; mark: Mark }[] = [
  { name: "NinjaTrader", mark: "spark" },
  { name: "MetaTrader 5", mark: "diamond" },
  { name: "Alpaca", mark: "triangle" },
  { name: "Coinbase", mark: "ring" },
  { name: "Kraken", mark: "hex" },
  { name: "Moomoo", mark: "bars" },
  { name: "Public", mark: "diamond" },
  { name: "TD Ameritrade", mark: "ring" },
  { name: "Binance", mark: "hex" },
  { name: "IBKR Pro", mark: "spark" },
];

export default function BrokerageMarquee() {
  return (
    <div className="space-y-5">
      <Row items={ROW_A} />
      <Row items={ROW_B} reverse />
    </div>
  );
}

function Row({
  items,
  reverse = false,
}: {
  items: { name: string; mark: Mark }[];
  reverse?: boolean;
}) {
  // duplicate the list so the -50% translate loops seamlessly
  const loop = [...items, ...items];
  return (
    <div className="marquee">
      <div className={`marquee-track ${reverse ? "reverse" : ""}`}>
        {loop.map((b, i) => (
          <div
            key={i}
            className="flex items-center gap-2.5 px-7 shrink-0 text-ink-faint hover:text-ink transition-colors"
            aria-hidden={i >= items.length}
          >
            <MarkGlyph mark={b.mark} />
            <span className="text-[1.05rem] font-medium tracking-tight whitespace-nowrap">
              {b.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function MarkGlyph({ mark }: { mark: Mark }) {
  const common = {
    width: 18,
    height: 18,
    viewBox: "0 0 24 24",
    fill: "none",
    "aria-hidden": true as const,
    className: "shrink-0",
  };
  switch (mark) {
    case "diamond":
      return (
        <svg {...common}>
          <path d="M12 3 21 12 12 21 3 12Z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
          <path d="M12 3v18M3 12h18" stroke="currentColor" strokeWidth="1.1" opacity="0.5" />
        </svg>
      );
    case "ring":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="8.5" stroke="currentColor" strokeWidth="1.7" />
          <circle cx="12" cy="12" r="3" fill="currentColor" />
        </svg>
      );
    case "bars":
      return (
        <svg {...common}>
          <rect x="4" y="11" width="3.4" height="9" rx="1" fill="currentColor" />
          <rect x="10.3" y="6" width="3.4" height="14" rx="1" fill="currentColor" />
          <rect x="16.6" y="9" width="3.4" height="11" rx="1" fill="currentColor" />
        </svg>
      );
    case "triangle":
      return (
        <svg {...common}>
          <path d="M12 4 21 19H3Z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
        </svg>
      );
    case "hex":
      return (
        <svg {...common}>
          <path d="M12 3 20 7.5v9L12 21 4 16.5v-9Z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
        </svg>
      );
    case "spark":
      return (
        <svg {...common}>
          <path d="M12 3v18M3 12h18M6 6l12 12M18 6 6 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.85" />
        </svg>
      );
  }
}
