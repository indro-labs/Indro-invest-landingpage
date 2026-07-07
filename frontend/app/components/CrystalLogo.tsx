/**
 * Selnite mark — a selenite crystal shard, rendered in the Obsidian palette:
 * a two-tone violet gem with white facet lines catching the light. Self-colored
 * (does not use currentColor) so it always reads as the purple brand crystal.
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
      {/* left plane — deeper violet */}
      <path d="M16 1.5 L6 12 L9 33 L16 38.5 Z" fill="#a855f7" />
      {/* right plane — the lit face */}
      <path d="M16 1.5 L26 12 L23 33 L16 38.5 Z" fill="#cf9dff" />
      {/* silhouette + internal facets, white light */}
      <path
        d="M16 1.5 L6 12 L9 33 L16 38.5 L23 33 L26 12 Z"
        stroke="#ffffff"
        strokeOpacity="0.9"
        strokeWidth="1.3"
        strokeLinejoin="round"
      />
      <path
        d="M6 12 H26 M16 1.5 V38.5 M9 33 L16 28 L23 33"
        stroke="#ffffff"
        strokeOpacity="0.55"
        strokeWidth="0.9"
        strokeLinejoin="round"
      />
    </svg>
  );
}
