"use client";

import { useState } from "react";

/* Three rules we don't break. List on the left, detail expands on the right
   as you hover (or tap on touch). */
const PRINCIPLES = [
  {
    title: "Private and secure.",
    body: "We never touch your funds, never see your broker login, and never sell your data. Everything you share with Selnite stays yours.",
  },
  {
    title: "Evidence over opinion.",
    body: "Every insight is measured from your own trades, with a confidence score attached. If the data can't support it, we don't say it.",
  },
  {
    title: "Built with traders.",
    body: "Selnite is in active development. Founding members get early access and a direct line to the team to share feedback as it takes shape.",
  },
];

export default function Principles() {
  const [active, setActive] = useState(0);

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_1.15fr] lg:gap-16">
      {/* left: the list */}
      <div className="flex flex-col">
        {PRINCIPLES.map((p, i) => (
          <button
            key={p.title}
            type="button"
            onMouseEnter={() => setActive(i)}
            onFocus={() => setActive(i)}
            onClick={() => setActive(i)}
            className="flex items-center gap-4 border-t border-line py-6 text-left last:border-b"
          >
            <span
              className="h-6 w-[3px] shrink-0 rounded-full transition-colors duration-300"
              style={{ background: i === active ? "var(--accent)" : "transparent" }}
            />
            <span
              className={`text-lg font-bold tracking-tight transition-colors duration-200 sm:text-xl ${
                i === active ? "text-ink" : "text-ink-faint"
              }`}
            >
              {p.title}
            </span>
          </button>
        ))}
      </div>

      {/* right: the detail for the active rule */}
      <div className="flex items-center lg:min-h-[220px]">
        <p
          key={active}
          className="rise text-xl leading-relaxed text-ink-soft sm:text-2xl sm:leading-relaxed"
        >
          {PRINCIPLES[active].body}
        </p>
      </div>
    </div>
  );
}
