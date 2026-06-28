/**
 * Selnite mark — a simple ensō: one calm, near-complete brush circle.
 * Stands for observing, stillness, the full picture. No crystal.
 */
export default function SelniteMark({
  size = 26,
  className = "",
}: {
  size?: number;
  className?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <circle
        cx="24"
        cy="24"
        r="17"
        fill="none"
        stroke="currentColor"
        strokeWidth="3.2"
        strokeLinecap="round"
        strokeDasharray="90 17"
        transform="rotate(38 24 24)"
      />
    </svg>
  );
}
