/**
 * The hero product shot: a real-looking trading terminal on the left (the
 * raw trade), and the insights Selnite pulls out of it on the right —
 * each a clean box with an actual number. Reads as "the platform looked at
 * your trading and figured you out."
 */
export default function HeroVisual() {
  return (
    <div className="relative">
      {/* soft stage glow */}
      <div
        className="absolute -inset-x-8 -top-12 bottom-0 -z-10 opacity-70 blur-3xl"
        style={{
          background:
            "radial-gradient(46% 60% at 50% 35%, var(--glow-a), transparent 70%)",
        }}
      />

      <div className="grid lg:grid-cols-[1.45fr_1fr] gap-4 lg:gap-5 items-stretch">
        {/* LEFT — the trade */}
        <TradingTerminal />

        {/* RIGHT — what Selnite found */}
        <div className="flex flex-col gap-3.5">
          <InsightCard
            icon={<ClockIcon />}
            label="Peak performance window"
            value="9:30 – 11:00 AM"
          >
            <div className="mt-3 flex items-end gap-3">
              <span
                className="display text-3xl leading-none"
                style={{ color: "var(--accent)" }}
              >
                63%
              </span>
              <span className="text-sm text-ink-soft leading-snug pb-0.5">
                of your weekly P&amp;L is made in this 90-minute window
              </span>
            </div>
            <HourBars />
          </InsightCard>

          <InsightCard
            icon={<TargetIcon />}
            label="Your trader type"
            value="Momentum Scalper"
          >
            <p className="mt-2 text-sm text-ink-soft leading-snug">
              Short holds, high conviction at the open — you press winners but
              cut them a beat too early.
            </p>
          </InsightCard>

          <InsightCard
            icon={<BoltIcon />}
            label="Where you give it back"
            value="−$8,400 / yr"
            valueColor="var(--down)"
            tone="down"
          >
            <p className="mt-2 text-sm text-ink-soft leading-snug">
              After a red day your size jumps <strong>+212%</strong> — the
              revenge trade is your single most expensive habit.
            </p>
          </InsightCard>
        </div>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------- */
/*  Insight box                                                     */
/* ---------------------------------------------------------------- */
function InsightCard({
  icon,
  label,
  value,
  valueColor,
  confidence,
  tone = "accent",
  children,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  valueColor?: string;
  confidence?: string;
  tone?: "accent" | "down";
  children?: React.ReactNode;
}) {
  const iconBg = tone === "down" ? "var(--up-soft)" : "var(--accent-soft)";
  const iconColor = tone === "down" ? "var(--down)" : "var(--accent)";
  return (
    <div
      className="surface rounded-2xl p-5 transition-transform duration-200 hover:-translate-y-0.5"
      style={{ boxShadow: "var(--shadow)" }}
    >
      <div className="flex items-center gap-2.5 mb-2.5">
        <span
          className="grid place-items-center h-8 w-8 rounded-lg shrink-0"
          style={{ background: iconBg, color: iconColor }}
        >
          {icon}
        </span>
        <span className="text-sm font-medium text-ink-soft">{label}</span>
        {confidence && (
          <span
            className="ml-auto text-[0.7rem] font-medium rounded-full px-2 py-0.5"
            style={{ background: "var(--accent-soft)", color: "var(--accent)" }}
          >
            {confidence}
          </span>
        )}
      </div>
      <div
        className="display text-2xl md:text-[1.6rem] leading-none"
        style={valueColor ? { color: valueColor } : undefined}
      >
        {value}
      </div>
      {children}
    </div>
  );
}

/* little hourly bar row for the peak-window card */
function HourBars() {
  const bars = [0.35, 0.55, 1, 0.92, 0.6, 0.42, 0.5, 0.34, 0.28];
  const peak = [2, 3];
  return (
    <div className="mt-3 flex items-end gap-1 h-8">
      {bars.map((b, i) => (
        <div
          key={i}
          className="flex-1 rounded-sm"
          style={{
            height: `${Math.max(12, b * 100)}%`,
            background: peak.includes(i) ? "var(--accent)" : "var(--line)",
          }}
        />
      ))}
    </div>
  );
}

/* ---------------------------------------------------------------- */
/*  Trading terminal (the left "screenshot")                        */
/* ---------------------------------------------------------------- */
function TradingTerminal() {
  // o, h, l, c — a believable intraday uptrend with pullbacks
  const CANDLES: [number, number, number, number][] = [
    [5392.0, 5394.6, 5390.4, 5393.8],
    [5393.8, 5396.1, 5392.9, 5395.2],
    [5395.2, 5395.9, 5391.0, 5391.6],
    [5391.6, 5393.1, 5389.3, 5390.2],
    [5390.2, 5392.6, 5389.6, 5392.1],
    [5392.1, 5395.6, 5391.7, 5395.0],
    [5395.0, 5398.3, 5394.6, 5397.6],
    [5397.6, 5399.1, 5395.1, 5395.8],
    [5395.8, 5397.5, 5393.9, 5396.9],
    [5396.9, 5400.7, 5396.2, 5400.1],
    [5400.1, 5402.6, 5399.2, 5401.8],
    [5401.8, 5402.3, 5398.5, 5399.2],
    [5399.2, 5401.1, 5398.0, 5400.6],
    [5400.6, 5404.4, 5400.1, 5403.9],
    [5403.9, 5406.9, 5403.0, 5406.2],
    [5406.2, 5407.1, 5403.3, 5404.1],
    [5404.1, 5406.0, 5402.6, 5405.4],
    [5405.4, 5408.9, 5404.9, 5408.3],
    [5408.3, 5410.7, 5407.4, 5410.0],
    [5410.0, 5410.5, 5406.8, 5407.6],
    [5407.6, 5409.6, 5406.7, 5409.1],
    [5409.1, 5412.8, 5408.7, 5412.2],
    [5412.2, 5414.1, 5411.2, 5413.4],
    [5413.4, 5414.7, 5411.8, 5412.25],
  ];
  const VOLS = [
    82, 70, 64, 58, 46, 72, 88, 76, 52, 90, 84, 60, 55, 86, 92, 70, 58, 80, 88,
    64, 60, 94, 78, 72,
  ];

  const n = CANDLES.length;
  const highs = CANDLES.map((c) => c[1]);
  const lows = CANDLES.map((c) => c[2]);
  const maxH = Math.max(...highs);
  const minL = Math.min(...lows);
  const pad = (maxH - minL) * 0.14;
  const hi = maxH + pad;
  const lo = minL - pad;

  const plotL = 12;
  const plotR = 516;
  const pT = 22;
  const pB = 246;
  const vT = 272;
  const vB = 330;
  const step = (plotR - plotL) / n;
  const bw = 11;
  const cx = (i: number) => plotL + step * (i + 0.5);
  const py = (p: number) => pT + ((hi - p) / (hi - lo)) * (pB - pT);
  const volMax = Math.max(...VOLS);
  const vh = (v: number) => (v / volMax) * (vB - vT);

  // EMA(6)
  const k = 2 / (6 + 1);
  const ema: number[] = [];
  CANDLES.forEach((c, i) => {
    ema[i] = i === 0 ? c[3] : c[3] * k + ema[i - 1] * (1 - k);
  });
  const emaPts = ema.map((e, i) => `${cx(i)},${py(e)}`).join(" ");

  const entryY = py(5400.5);
  const lastY = py(5412.25);

  return (
    <div className="frame h-full flex flex-col" style={{ boxShadow: "var(--shadow)" }}>
      <div className="frame-bar">
        <span className="frame-dot" />
        <span className="frame-dot" />
        <span className="frame-dot" />
      </div>

      {/* symbol header */}
      <div className="flex items-center justify-between px-5 pt-4">
        <div className="flex items-center gap-3">
          <span
            className="grid place-items-center h-9 w-9 rounded-lg text-[0.8rem] font-bold"
            style={{ background: "var(--accent-soft)", color: "var(--accent)" }}
          >
            ES
          </span>
          <div>
            <div className="font-semibold tracking-tight leading-none">
              S&amp;P 500 E-mini
            </div>
            <div className="text-xs text-ink-faint mt-1">CME · Futures</div>
          </div>
        </div>
        <div className="text-right">
          <div className="display text-xl leading-none">5,412.25</div>
          <div className="text-xs font-medium mt-1" style={{ color: "var(--up)" }}>
            +20.25 (0.38%) ▲
          </div>
        </div>
      </div>

      {/* chart */}
      <div className="px-2 pb-2 pt-3 grow">
        <svg viewBox="0 0 600 348" className="w-full h-auto" role="img" aria-label="A live ES futures candlestick chart">
          {/* gridlines + price axis */}
          {[0.14, 0.4, 0.66, 0.9].map((f, i) => {
            const y = pT + (pB - pT) * f;
            return (
              <g key={i}>
                <line x1={plotL} y1={y} x2={plotR} y2={y} stroke="var(--line-soft)" strokeWidth="1" />
                <text x={plotR + 6} y={y + 3} fontSize="10" fill="var(--ink-faint)" fontFamily="var(--font-body)">
                  {(hi - (hi - lo) * f).toFixed(1)}
                </text>
              </g>
            );
          })}

          {/* edge window band */}
          <rect
            x={cx(0) - bw / 2}
            y={pT}
            width={cx(6) + bw / 2 - (cx(0) - bw / 2)}
            height={pB - pT}
            fill="var(--accent)"
            opacity="0.06"
          />
          <rect x={cx(0) - bw / 2} y={pT} width="74" height="17" rx="4" fill="var(--accent)" opacity="0.14" />
          <text x={cx(0) - bw / 2 + 8} y={pT + 12} fontSize="9.5" fontWeight="600" fill="var(--accent)" fontFamily="var(--font-body)">
            9:30–11:00
          </text>

          {/* volume */}
          {VOLS.map((v, i) => (
            <rect
              key={`v${i}`}
              x={cx(i) - bw / 2}
              y={vB - vh(v)}
              width={bw}
              height={vh(v)}
              rx="1"
              fill={CANDLES[i][3] >= CANDLES[i][0] ? "var(--up)" : "var(--down)"}
              opacity="0.26"
            />
          ))}

          {/* EMA */}
          <polyline points={emaPts} fill="none" stroke="var(--accent)" strokeWidth="1.6" opacity="0.85" strokeLinejoin="round" strokeLinecap="round" />

          {/* candles */}
          {CANDLES.map((c, i) => {
            const [o, h, l, cl] = c;
            const up = cl >= o;
            const col = up ? "var(--up)" : "var(--down)";
            const x = cx(i);
            const top = Math.min(py(o), py(cl));
            const bh = Math.max(1.5, Math.abs(py(cl) - py(o)));
            return (
              <g key={`c${i}`}>
                <line x1={x} y1={py(h)} x2={x} y2={py(l)} stroke={col} strokeWidth="1.2" />
                <rect x={x - bw / 2} y={top} width={bw} height={bh} fill={col} rx="1" />
              </g>
            );
          })}

          {/* entry line */}
          <line x1={plotL} y1={entryY} x2={plotR} y2={entryY} stroke="var(--ink-faint)" strokeWidth="1" strokeDasharray="4 4" opacity="0.55" />
          <rect x={plotL} y={entryY - 9} width="62" height="18" rx="4" fill="var(--bg-sunk)" stroke="var(--line)" />
          <text x={plotL + 8} y={entryY + 3.5} fontSize="9.5" fill="var(--ink-soft)" fontFamily="var(--font-body)">
            ENTRY 5400.5
          </text>

          {/* current price tag */}
          <line x1={plotL} y1={lastY} x2={plotR} y2={lastY} stroke="var(--up)" strokeWidth="1" strokeDasharray="2 3" opacity="0.5" />
          <rect x={plotR - 1} y={lastY - 9} width="58" height="18" rx="4" fill="var(--up)" />
          <text x={plotR + 28} y={lastY + 3.5} fontSize="10" fontWeight="700" fill="#fff" textAnchor="middle" fontFamily="var(--font-body)">
            5412.25
          </text>
        </svg>
      </div>
    </div>
  );
}

/* ---- icons ---- */
function ClockIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="8.5" stroke="currentColor" strokeWidth="1.7" />
      <path d="M12 7.5V12l3 2" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function TargetIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="8.5" stroke="currentColor" strokeWidth="1.7" />
      <circle cx="12" cy="12" r="3.4" stroke="currentColor" strokeWidth="1.7" />
    </svg>
  );
}
function BoltIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M13 2 4.5 13.5H11l-1 8.5L19.5 10H13l0-8Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
    </svg>
  );
}
