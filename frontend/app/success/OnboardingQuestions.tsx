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

/**
 * Two optional questions, asked after payment so checkout stays
 * friction-free. Ties back to the Stripe email so we can match them up.
 */
export default function OnboardingQuestions() {
  const [traderTypes, setTraderTypes] = useState<string[]>([]);
  const [challenges, setChallenges] = useState<string[]>([]);
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");

  const toggle = (value: string, list: string[], set: (v: string[]) => void) => {
    set(list.includes(value) ? list.filter((v) => v !== value) : [...list, value]);
  };

  const send = async () => {
    setSubmitting(true);
    setError("");
    try {
      const data = new FormData();
      data.append("form", "founding-onboarding");
      if (email) data.append("email", email);
      if (traderTypes.length) data.append("trader_types", traderTypes.join(", "));
      if (challenges.length) data.append("challenges", challenges.join(", "));
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: data,
      });
      if (res.ok) {
        setDone(true);
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

  if (done) {
    return (
      <div className="w-full rounded-2xl surface p-7 text-left">
        <p className="mb-1 font-medium text-ink">Got it. Thank you.</p>
        <p className="text-sm leading-relaxed text-ink-soft">
          Your first onboarding email will already be shaped around this.
          See you in your inbox.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full rounded-2xl surface p-7 text-left" style={{ boxShadow: "var(--shadow)" }}>
      <p className="mb-1 font-medium text-ink">While you&apos;re here: two quick questions.</p>
      <p className="mb-6 text-sm text-ink-faint">
        Optional, but your onboarding gets tailored to the answers.
      </p>

      <p className="mb-2.5 text-sm font-medium text-ink-soft">What kind of trader are you?</p>
      <div className="mb-6 flex flex-wrap gap-2">
        {TRADER_TYPES.map((t) => (
          <Chip key={t} label={t} on={traderTypes.includes(t)} onClick={() => toggle(t, traderTypes, setTraderTypes)} />
        ))}
      </div>

      <p className="mb-2.5 text-sm font-medium text-ink-soft">Your biggest challenges right now?</p>
      <div className="mb-6 flex flex-wrap gap-2">
        {CHALLENGES.map((c) => (
          <Chip key={c} label={c} on={challenges.includes(c)} onClick={() => toggle(c, challenges, setChallenges)} />
        ))}
      </div>

      <p className="mb-2 text-sm font-medium text-ink-soft">
        The email you used at checkout, so we can match this up:
      </p>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="you@example.com"
        aria-label="Checkout email"
        className="mb-6 w-full rounded-xl border border-line bg-bg-sunk px-4 py-3 text-[15px] outline-none transition-colors placeholder:text-ink-faint focus:border-accent"
      />

      {error && <p className="mb-4 text-sm text-bad">{error}</p>}

      <button
        type="button"
        onClick={send}
        disabled={submitting}
        className="btn-solid px-7 py-3 text-[15px] disabled:opacity-50"
      >
        {submitting ? "Sending…" : "Send"}
      </button>
    </div>
  );
}

function Chip({ label, on, onClick }: { label: string; on: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={on}
      className={`rounded-full border px-3.5 py-1.5 text-sm transition-colors ${
        on
          ? "border-accent bg-accent-soft text-ink"
          : "border-line text-ink-soft hover:border-ink-faint"
      }`}
    >
      {label}
    </button>
  );
}
