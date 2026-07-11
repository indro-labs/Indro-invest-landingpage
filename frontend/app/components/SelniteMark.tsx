import Image from "next/image";

/**
 * Selnite mark — five dots rising in size along a diagonal.
 * Stands for the trend line: small signal to clear pattern.
 */
export default function SelniteMark({
  size = 26,
  className = "",
}: {
  size?: number;
  className?: string;
}) {
  return (
    <Image
      src="/selnite-logo.png"
      alt="Selnite"
      width={size}
      height={size}
      className={className}
      style={{ width: size, height: size }}
      priority
    />
  );
}
