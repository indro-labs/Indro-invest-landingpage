/**
 * Selnite logo mark — the ascending-dots PNG (transparent background, so it
 * drops onto any surface cleanly). Kept the CrystalLogo name so existing call
 * sites don't need to change.
 */
export default function CrystalLogo({
  className = "",
  size = 28,
}: {
  className?: string;
  size?: number;
}) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/selnite-logo.png"
      alt="Selnite"
      width={size}
      height={size}
      className={className}
      style={{ width: size, height: size }}
    />
  );
}
