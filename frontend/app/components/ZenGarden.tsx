/**
 * A raked zen garden: smooth ripples of sand circling two stones.
 * The whole metaphor of the product in one calm image — patterns in the
 * sand, the way Selnite finds the patterns in how you trade.
 *
 * Colours are hard-coded warm tones (SVG gradients don't reliably resolve
 * CSS variables in stop-color), and the ripples sit directly on the page.
 */
export default function ZenGarden({ className = "" }: { className?: string }) {
  const cx = 360;
  const cy = 250;
  const ripples = Array.from({ length: 11 }, (_, i) => i);

  const sx = 150;
  const sy = 152;
  const sripples = Array.from({ length: 6 }, (_, i) => i);

  return (
    <svg
      viewBox="0 0 720 460"
      className={`w-full h-auto ${className}`}
      role="img"
      aria-label="A raked zen garden with ripples of sand circling two stones"
    >
      <defs>
        <radialGradient id="stoneA" cx="40%" cy="34%" r="75%">
          <stop offset="0%" stopColor="#ddd0b8" />
          <stop offset="100%" stopColor="#b2a68d" />
        </radialGradient>
      </defs>

      {/* big stone ripples */}
      {ripples
        .slice()
        .reverse()
        .map((i) => (
          <ellipse
            key={`a${i}`}
            cx={cx}
            cy={cy}
            rx={64 + i * 30}
            ry={44 + i * 21}
            fill="none"
            stroke="#33302a"
            strokeOpacity={Math.max(0.06, 0.42 - i * 0.028)}
            strokeWidth="1.4"
          />
        ))}

      {/* small stone ripples */}
      {sripples
        .slice()
        .reverse()
        .map((i) => (
          <circle
            key={`s${i}`}
            cx={sx}
            cy={sy}
            r={34 + i * 22}
            fill="none"
            stroke="#33302a"
            strokeOpacity={Math.max(0.05, 0.36 - i * 0.04)}
            strokeWidth="1.4"
          />
        ))}

      {/* the stones, with soft cast shadows */}
      <ellipse cx={sx} cy={sy + 5} rx="26" ry="14" fill="#33302a" opacity="0.08" />
      <ellipse cx={sx} cy={sy} rx="26" ry="18" fill="url(#stoneA)" />

      <ellipse cx={cx} cy={cy + 7} rx="52" ry="20" fill="#33302a" opacity="0.09" />
      <ellipse cx={cx} cy={cy} rx="52" ry="34" fill="url(#stoneA)" />
    </svg>
  );
}
