"use client";

import { useState } from "react";
import SelniteMark from "./SelniteMark";

const GROUPS = [
  {
    t: "The trader you actually are",
    blurb:
      "Not the trader you think you are, but the one your fills reveal. Your real style, and where it pays.",
    items: [
      "Your real style: momentum, mean reversion, breakout, or a blend",
      "Which instruments pay you: stocks, options, futures, crypto",
      "Whether your edge is intraday, swing, or longer term",
    ],
    example:
      "You're a momentum trader at heart. Your mean reversion trades quietly lose money.",
  },
  {
    t: "Your timing",
    blurb:
      "When you have an edge, and when you're just filling time. Most traders are stunned how concentrated it is.",
    items: [
      "The hours and days you genuinely have an edge",
      "Your ideal hold time, and where you exit too early or too late",
      "When you start overtrading and discipline slips",
    ],
    example: "63% of your weekly P&L comes between 9:30 and 11:00.",
  },
  {
    t: "You vs. the market",
    blurb:
      "An honest answer to the only question that matters: are you actually beating just holding?",
    items: [
      "Whether you're actually beating buying and holding",
      "Your return for the risk you take on",
      "Where your edge truly comes from",
    ],
    example: "After fees, you're trailing buying and holding by 4% a year.",
  },
  {
    t: "Risk & conviction",
    blurb:
      "Your biggest positions are supposed to be your best ideas. We check whether they really are.",
    items: [
      "Whether your biggest bets are really your best ideas",
      "How position size shapes your outcomes",
      "How you behave deep in a drawdown",
    ],
    example: "Your largest positions underperform your smallest by 1.4R.",
  },
  {
    t: "Your emotional tells",
    blurb:
      "The revenge trade, the size creep, the winner cut short. The habits written into your fills.",
    items: [
      "Revenge trades in the hours after a loss",
      "Size creep after a win or a hot streak",
      "Cutting winners short, holding losers too long",
    ],
    example:
      "After a red day your size jumps 212%, and that's where your worst fills live.",
  },
  {
    t: "What's quietly working",
    blurb:
      "It's not all what's wrong. The habits and setups quietly paying you, named, so you protect them.",
    items: [
      "Your most profitable habits, named, so you keep them",
      "Your highest expectancy setups",
      "The behaviour that actually compounds",
    ],
    example: "Your Tuesday breakout setup is your real edge. Protect it.",
  },
];

export default function PatternsExplorer() {
  const [active, setActive] = useState(0);
  const g = GROUPS[active];

  return (
    <div className="grid lg:grid-cols-[0.82fr_1.18fr] gap-5 lg:gap-7">
      {/* left — stacked list */}
      <div className="flex flex-col gap-2">
        {GROUPS.map((group, i) => {
          const on = i === active;
          return (
            <button
              key={group.t}
              type="button"
              onMouseEnter={() => setActive(i)}
              onFocus={() => setActive(i)}
              onClick={() => setActive(i)}
              aria-pressed={on}
              className={`group flex items-center gap-3 text-left rounded-2xl px-5 py-4 border transition-all duration-200 ${
                on
                  ? "border-accent/35 bg-bg-raise shadow-[var(--shadow)]"
                  : "border-line hover:border-ink/20 hover:bg-bg-raise/50"
              }`}
            >
              <SelniteMark
                size={16}
                className={on ? "text-accent" : "text-ink-faint"}
              />
              <span
                className={`font-medium tracking-tight transition-colors ${
                  on ? "text-ink" : "text-ink-soft"
                }`}
              >
                {group.t}
              </span>
              <span
                className={`ml-auto text-ink-faint transition-all duration-200 ${
                  on ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-1"
                }`}
                aria-hidden="true"
              >
                →
              </span>
            </button>
          );
        })}
      </div>

      {/* right — the expanded card */}
      <div className="surface rounded-3xl p-7 md:p-10" style={{ boxShadow: "var(--shadow)" }}>
        {/* key forces the entrance animation to replay on change */}
        <div key={active} className="rise">
          <h3 className="display text-2xl md:text-[1.9rem] mb-3">{g.t}</h3>
          <p className="text-ink-soft text-lg leading-relaxed mb-7 max-w-lg">
            {g.blurb}
          </p>

          <ul className="space-y-3.5 mb-8">
            {g.items.map((it) => (
              <li key={it} className="flex gap-3 text-ink leading-snug">
                <span className="mt-[0.5rem] h-1.5 w-1.5 rounded-full bg-accent/70 shrink-0" />
                <span>{it}</span>
              </li>
            ))}
          </ul>

          <div className="rounded-2xl bg-accent-soft px-5 py-4 border border-accent/15">
            <span className="text-xs uppercase tracking-wide text-accent/80 font-medium">
              What you might hear
            </span>
            <p className="mt-1.5 text-ink leading-snug">
              &ldquo;{g.example}&rdquo;
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
