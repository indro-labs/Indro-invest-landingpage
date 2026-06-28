"use client";

/* The Selnite logo. Smooth-scrolls to the top and replays the hero video. */
export default function HomeLink({
  className = "",
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href="#"
      className={className}
      onClick={(e) => {
        e.preventDefault();
        window.dispatchEvent(new Event("selnite:replay"));
        window.scrollTo({ top: 0, behavior: "smooth" });
      }}
    >
      {children}
    </a>
  );
}
