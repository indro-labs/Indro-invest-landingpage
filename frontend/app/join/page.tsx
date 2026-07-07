"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import CrystalLogo from "../components/CrystalLogo";
import { STRIPE_PAYMENT_LINK } from "../components/FoundingSignup";

/**
 * The founding signup flow, as a full page. A few quick questions build
 * commitment, then the final screen makes the case to pay: what you get,
 * the guarantee, and what other traders say.
 *
 * NOTE: the testimonials below are PLACEHOLDERS. Replace them with real,
 * attributable founding-member quotes before launch.
 */

type Step = { id: string; prompt: string; options: string[] };

const STEPS: Step[] = [
  {
    id: "experience",
    prompt: "How long have you been trading?",
    options: ["Under a year", "1 to 3 years", "3 to 5 years", "5+ years"],
  },
  {
    id: "struggle",
    prompt: "What's costing you the most right now?",
    options: [
      "Revenge trading after a loss",
      "Sizing up at the wrong time",
      "Cutting winners too early",
      "Breaking my own rules",
      "Overtrading or FOMO",
    ],
  },
  {
    id: "instrument",
    prompt: "What do you trade most?",
    options: ["Stocks", "Options", "Futures", "Forex", "Crypto"],
  },
  {
    id: "today",
    prompt: "How do you review your trades today?",
    options: ["A spreadsheet", "Another journal app", "Just my broker", "I don't, really"],
  },
];

const TOTAL = STEPS.length + 1;

export default function JoinPage() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const atFinal = step >= STEPS.length;
  const recorded = useRef(false);

  const choose = (id: string, value: string) => {
    setAnswers((a) => ({ ...a, [id]: value }));
    setStep((s) => s + 1);
  };

  // Record the funnel answers to Neon once the questions are done. Fire and
  // forget with keepalive, so it survives the redirect to Stripe and never
  // blocks the user from checking out.
  useEffect(() => {
    if (!atFinal || recorded.current) return;
    recorded.current = true;
    fetch("/api/join", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(answers),
      keepalive: true,
    }).catch(() => {});
  }, [atFinal, answers]);

  return (
    <div className="flex min-h-screen flex-col text-ink">
      <header className="flex items-center justify-between px-6 py-5">
        <Link href="/" className="flex items-center gap-2.5">
          <CrystalLogo size={22} />
          <span className="text-base font-semibold tracking-tight">Selnite</span>
        </Link>
        <Link href="/" className="text-[13px] text-ink-faint transition-colors hover:text-ink">
          Back to site
        </Link>
      </header>

      <div className="mx-auto flex w-full max-w-xl flex-1 flex-col px-6 pb-24 pt-6">
        {/* progress */}
        <div className="mb-12 flex items-center gap-1.5">
          {Array.from({ length: TOTAL }).map((_, i) => (
            <span
              key={i}
              className="h-[3px] flex-1 rounded-full transition-colors duration-300"
              style={{ background: i <= step ? "var(--accent)" : "var(--line)" }}
            />
          ))}
        </div>

        {atFinal ? (
          <Checkout />
        ) : (
          <Question
            step={STEPS[step]}
            index={step}
            onChoose={choose}
            onBack={step > 0 ? () => setStep((s) => s - 1) : undefined}
          />
        )}
      </div>
    </div>
  );
}

function Question({
  step,
  index,
  onChoose,
  onBack,
}: {
  step: Step;
  index: number;
  onChoose: (id: string, value: string) => void;
  onBack?: () => void;
}) {
  return (
    <div key={step.id} className="rise">
      <p className="mb-2 text-[12px] font-semibold uppercase tracking-wide text-ink-faint">
        Question {index + 1} of {STEPS.length}
      </p>
      <h1 className="display mb-8 text-2xl leading-snug sm:text-3xl">{step.prompt}</h1>

      <div className="flex flex-col gap-3">
        {step.options.map((opt) => (
          <button
            key={opt}
            type="button"
            onClick={() => onChoose(step.id, opt)}
            className="group flex items-center justify-between rounded-[14px] border border-line bg-bg-sunk/50 px-5 py-4 text-left transition-colors hover:border-accent hover:bg-accent-soft"
          >
            <span className="text-[15px]">{opt}</span>
            <span
              aria-hidden="true"
              className="ml-4 text-ink-faint transition-colors group-hover:text-accent"
            >
              →
            </span>
          </button>
        ))}
      </div>

      {onBack && (
        <button
          type="button"
          onClick={onBack}
          className="mt-6 text-[13px] text-ink-faint transition-colors hover:text-ink"
        >
          ← Back
        </button>
      )}
    </div>
  );
}

const GET = [
  "Upload your trade history once. No manual logging.",
  "The one pattern costing you the most, and what it's cost you so far",
  "A clear rule to run before your next trade, tuned to that pattern",
  "The market conditions where your edge shows up, and where it vanishes",
  "Whether you're actually beating the market, or just riding it",
  "First access to the dashboard, and a say in what ships next",
];

// PLACEHOLDER quotes. Product isn't out yet, so these are waitlist / anticipation
// quotes (why people are joining) — nothing here claims real usage or results.
// Swap for real, attributable waitlist quotes before launch.
const QUOTES = [
  {
    text: "I've tried three journals. None ever told me why I keep sizing up after a loss. This is the first one even trying to.",
    tag: "Futures",
  },
  {
    text: "If it flags the pattern that keeps costing me, it pays for itself in a week. That's why I'm in.",
    tag: "Options",
  },
  {
    text: "Finally something built around why, not just what. Signed up the day I found it.",
    tag: "Day trader",
  },
  {
    text: "I know I have a pattern. I just can't see it on my own. That's exactly what I want this for.",
    tag: "Stocks",
  },
];

function Checkout() {
  return (
    <div className="rise">
      <h1 className="display mb-3 text-3xl sm:text-4xl">You&apos;re a fit.</h1>
      <p className="mb-8 text-base leading-relaxed text-ink-soft">
        Lock your founding price now. Selnite is $299 a year at launch. Founding
        members get their first year for $99.
      </p>

      {/* price */}
      <div className="mb-3 flex items-baseline gap-3">
        <span className="text-2xl font-semibold text-ink-faint line-through">$299</span>
        <span className="display text-5xl">$99</span>
        <span className="text-base font-medium text-ink-soft">first year</span>
      </div>
      <p className="mb-8 text-[14px] leading-relaxed text-ink-soft">
        That&apos;s $8.25 a month. Skip one revenge trade and it&apos;s already paid for.
      </p>

      {/* what you get */}
      <div className="mb-8 flex flex-col gap-3 rounded-2xl surface p-6">
        {GET.map((g) => (
          <div key={g} className="flex items-start gap-3">
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              className="mt-0.5 shrink-0"
              aria-hidden="true"
            >
              <path
                d="M20 6 9 17l-5-5"
                stroke="var(--accent)"
                strokeWidth="2.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span className="text-[15px] leading-snug text-ink">{g}</span>
          </div>
        ))}
      </div>

      {/* rotating social proof, right at the decision point */}
      <RotatingQuote />

      <a
        href={STRIPE_PAYMENT_LINK}
        className="btn-solid flex w-full items-center justify-center gap-2 px-8 py-4 text-base"
      >
        Lock in $99 for year one
        <span aria-hidden="true">→</span>
      </a>
      <p className="mt-3 text-center text-[13px] leading-relaxed text-ink-faint">
        Secure checkout by Stripe. If you&apos;re not satisfied, one email gets you a
        full refund.
      </p>
    </div>
  );
}

function RotatingQuote() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setI((n) => (n + 1) % QUOTES.length), 4500);
    return () => clearInterval(id);
  }, []);
  const q = QUOTES[i];
  return (
    <figure className="surface mb-6 rounded-2xl p-6 text-center">
      <blockquote key={i} className="rise text-[17px] font-medium leading-relaxed text-ink">
        &ldquo;{q.text}&rdquo;
      </blockquote>
      <figcaption className="mt-3 text-[13px] text-ink-faint">
        On the waitlist · {q.tag}
      </figcaption>
      <div className="mt-4 flex justify-center gap-1.5">
        {QUOTES.map((_, n) => (
          <span
            key={n}
            className="h-1.5 w-1.5 rounded-full transition-colors"
            style={{ background: n === i ? "var(--accent)" : "var(--line)" }}
          />
        ))}
      </div>
    </figure>
  );
}
