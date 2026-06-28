/**
 * Selnite mark — a selenite-inspired crystal shard.
 * An elongated, faceted obelisk seen slightly from the side, so two
 * planes of the crystal catch light differently. Uses currentColor for
 * the strokes so it reads on both day and night skins; the inner planes
 * use the jade accent at low opacity as the "light caught inside".
 */
export default function CrystalLogo({
  className = "",
  size = 28,
}: {
  className?: string;
  size?: number;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 40"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      {/* left plane — slightly shaded */}
      <path
        d="M16 1.5 L6 12 L9 33 L16 38.5 Z"
        fill="var(--accent)"
        fillOpacity="0.16"
      />
      {/* right plane — the lit face */}
      <path
        d="M16 1.5 L26 12 L23 33 L16 38.5 Z"
        fill="var(--glow-a)"
        fillOpacity="0.5"
      />
      {/* full silhouette + internal facets */}
      <path
        d="M16 1.5 L6 12 L9 33 L16 38.5 L23 33 L26 12 Z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
      <path
        d="M6 12 H26 M16 1.5 V38.5 M9 33 L16 28 L23 33"
        stroke="currentColor"
        strokeWidth="1.1"
        strokeLinejoin="round"
        opacity="0.7"
      />
    </svg>
  );
}
