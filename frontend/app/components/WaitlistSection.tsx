"use client";

import { useState } from "react";

const FORMSPREE_ENDPOINT = "https://formspree.io/f/xwvdbqqy";

const TRADER_TYPES = [
  "Day trader",
  "Swing",
  "Options",
  "Futures",
  "Crypto",
  "Long term",
  "Still figuring it out",
];

const CHALLENGES = [
  "Cutting winners early",
  "Revenge trading",
  "Overtrading",
  "Position sizing",
  "Consistency",
  "FOMO / chasing",
  "Discipline",
];

type Stage = "email" | "questions" | "done";

export default function WaitlistSection() {
  const [email, setEmail] = useState("");
  const [stage, setStage] = useState<Stage>("email");
  const [traderTypes, setTraderTypes] = useState<string[]>([]);
  const [challenges, setChallenges] = useState<string[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const valid = email.includes("@") && email.includes(".");

  const toggle = (
    value: string,
    list: string[],
    set: (v: string[]) => void
  ) => {
    set(list.includes(value) ? list.filter((v) => v !== value) : [...list, value]);
  };

  const submitEmail = (e: React.FormEvent) => {
    e.preventDefault();
    if (!valid) return;
    setStage("questions");
  };

  const send = async () => {
    setSubmitting(true);
    setError("");
    try {
      const data = new FormData();
      data.append("email", email);
      if (traderTypes.length) data.append("trader_types", traderTypes.join(", "));
      if (challenges.length) data.append("challenges", challenges.join(", "));
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: data,
      });
      if (res.ok) {
        setStage("done");
      } else {
        const body = await res.json().catch(() => null);
        setError(body?.errors?.[0]?.message || "Something went wrong. Please try again.");
      }
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (stage === "done") {
    return (
      <div className="mx-auto max-w-md">
        <div className="display text-3xl md:text-4xl leading-tight mb-3">
          You&apos;re on the list.
        </div>
        <p className="text-ink-soft leading-relaxed">
          We let traders in a handful at a time, so onboarding stays personal.
          When there&apos;s room, a real person reaches out. No automated drip,
          no countdown timer.
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-md">
      <form onSubmit={submitEmail}>
        <div className="flex flex-col sm:flex-row gap-2.5">
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            aria-label="Email address"
            disabled={stage === "questions"}
            className="flex-1 surface rounded-full px-5 py-3.5 text-base outline-none transition-colors placeholder:text-ink-faint focus:border-ink disabled:opacity-70"
          />
          {stage === "email" && (
            <button
              type="submit"
              disabled={!valid}
              className="btn-solid inline-flex items-center justify-center gap-2 px-7 py-3.5 text-base disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Join the waitlist
              <span aria-hidden="true">→</span>
            </button>
          )}
        </div>
      </form>

      {/* expands into a couple of optional, multi-select questions */}
      {stage === "questions" && (
        <div
          className="rise mt-6 text-left rounded-3xl surface p-6 md:p-7"
          style={{ boxShadow: "var(--shadow)" }}
        >
          <p className="text-ink font-medium mb-1">A couple of quick things, optional.</p>
          <p className="text-sm text-ink-faint mb-5">
            Pick all that apply, so your very first read is tailored to you.
          </p>

          <p className="text-sm font-medium text-ink-soft mb-2.5">
            What kind of trader are you?
          </p>
          <div className="flex flex-wrap gap-2 mb-6">
            {TRADER_TYPES.map((t) => (
              <Chip
                key={t}
                label={t}
                on={traderTypes.includes(t)}
                onClick={() => toggle(t, traderTypes, setTraderTypes)}
              />
            ))}
          </div>

          <p className="text-sm font-medium text-ink-soft mb-2.5">
            Your biggest challenges right now?
          </p>
          <div className="flex flex-wrap gap-2 mb-7">
            {CHALLENGES.map((c) => (
              <Chip
                key={c}
                label={c}
                on={challenges.includes(c)}
                onClick={() => toggle(c, challenges, setChallenges)}
              />
            ))}
          </div>

          {error && <p className="text-sm text-[var(--down,#d8402c)] mb-4">{error}</p>}

          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={send}
              disabled={submitting}
              className="btn-solid inline-flex items-center gap-2 px-7 py-3.5 text-base disabled:opacity-50"
            >
              {submitting ? "Joining…" : "Join the waitlist"}
              {!submitting && <span aria-hidden="true">→</span>}
            </button>
            <button
              type="button"
              onClick={send}
              disabled={submitting}
              className="text-sm text-ink-faint hover:text-ink transition-colors disabled:opacity-50"
            >
              Skip
            </button>
          </div>
        </div>
      )}

      <p className="text-sm text-ink-faint mt-4">
        No spam, no investment advice, no selling your data. Ever.
      </p>
    </div>
  );
}

function Chip({
  label,
  on,
  onClick,
}: {
  label: string;
  on: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={on}
      className={`px-3.5 py-1.5 rounded-full text-sm border transition-colors ${
        on
          ? "bg-accent text-accent-ink border-accent"
          : "border-line text-ink-soft hover:border-ink/40"
      }`}
    >
      {label}
    </button>
  );
}
