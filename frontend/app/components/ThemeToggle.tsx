"use client";

import { useEffect, useState } from "react";

type Theme = "day" | "night";

export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("day");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const current =
      (document.documentElement.getAttribute("data-theme") as Theme) || "day";
    setTheme(current);
    setMounted(true);
  }, []);

  const toggle = () => {
    const next: Theme = theme === "day" ? "night" : "day";
    setTheme(next);
    document.documentElement.setAttribute("data-theme", next);
    try {
      localStorage.setItem("selnite-theme", next);
    } catch {
      /* ignore */
    }
  };

  const isNight = theme === "night";

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={isNight ? "Switch to day" : "Switch to night"}
      title={isNight ? "Day" : "Night"}
      className="relative h-9 w-[68px] rounded-full border border-line bg-bg-raise/70 backdrop-blur transition-colors hover:border-ink/40"
      style={{ opacity: mounted ? 1 : 0 }}
    >
      {/* track icons */}
      <span className="pointer-events-none absolute inset-0 flex items-center justify-between px-2 text-ink-faint">
        <SunIcon />
        <MoonIcon />
      </span>
      {/* thumb */}
      <span
        className="absolute top-1 left-1 grid h-7 w-7 place-items-center rounded-full bg-solid text-solid-ink shadow-sm transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]"
        style={{ transform: isNight ? "translateX(32px)" : "translateX(0)" }}
      >
        {isNight ? <MoonIcon filled /> : <SunIcon filled />}
      </span>
    </button>
  );
}

function SunIcon({ filled = false }: { filled?: boolean }) {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle
        cx="12"
        cy="12"
        r="4.2"
        stroke="currentColor"
        strokeWidth="1.7"
        fill={filled ? "currentColor" : "none"}
      />
      <path
        d="M12 2.5v2.2M12 19.3v2.2M21.5 12h-2.2M4.7 12H2.5M18.7 5.3l-1.6 1.6M6.9 17.1l-1.6 1.6M18.7 18.7l-1.6-1.6M6.9 6.9 5.3 5.3"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </svg>
  );
}

function MoonIcon({ filled = false }: { filled?: boolean }) {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M20 14.5A8.5 8.5 0 1 1 9.5 4a6.6 6.6 0 0 0 10.5 10.5Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
        fill={filled ? "currentColor" : "none"}
      />
    </svg>
  );
}
