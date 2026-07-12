"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import type { Question } from "@/lib/questions";

function RadioIndicator({ selected }: { selected: boolean }) {
  return (
    <span
      className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border transition-colors"
      style={{
        borderColor: selected ? "rgba(167,139,250,0.7)" : "rgba(255,255,255,0.18)",
        background: selected ? "var(--accent)" : "transparent",
      }}
    >
      {selected && <span className="h-1.5 w-1.5 rounded-full bg-white" />}
    </span>
  );
}

function CheckIndicator({ selected }: { selected: boolean }) {
  return (
    <span
      className="flex h-5 w-5 shrink-0 items-center justify-center rounded-md border transition-colors"
      style={{
        borderColor: selected ? "rgba(167,139,250,0.7)" : "rgba(255,255,255,0.18)",
        background: selected ? "var(--accent)" : "transparent",
      }}
    >
      {selected && (
        <svg width="11" height="11" viewBox="0 0 24 24" fill="none">
          <path
            d="M5 13l4 4L19 7"
            stroke="white"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )}
    </span>
  );
}

export default function QuestionCard({
  question,
  leadId,
  initialValue,
  isLast,
}: {
  question: Question;
  leadId: string;
  initialValue: string | string[];
  isLast: boolean;
}) {
  const router = useRouter();
  const [single, setSingle] = useState(
    question.type === "single" && typeof initialValue === "string" ? initialValue : ""
  );
  const [multi, setMulti] = useState<string[]>(
    question.type === "multi" && Array.isArray(initialValue) ? initialValue : []
  );
  const [text, setText] = useState(
    question.type === "text" && typeof initialValue === "string" ? initialValue : ""
  );
  const [submitting, setSubmitting] = useState(false);

  const answer: string | string[] =
    question.type === "single" ? single : question.type === "multi" ? multi : text;
  const canContinue =
    question.type === "multi" ? multi.length > 0 : !!(answer as string).trim();

  const toggleMulti = (opt: string) => {
    setMulti((prev) =>
      prev.includes(opt) ? prev.filter((v) => v !== opt) : [...prev, opt]
    );
  };

  const goNext = async () => {
    if (!canContinue || submitting) return;
    setSubmitting(true);
    try {
      await fetch(`/api/leads/${leadId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ answers: { [question.id]: answer } }),
      });
      router.push(
        isLast ? "/onboarding/result" : `/onboarding/questions/${question.step + 1}`
      );
    } finally {
      setSubmitting(false);
    }
  };

  const backHref =
    question.step > 1 ? `/onboarding/questions/${question.step - 1}` : "/";

  return (
    <div key={question.id} className="rise">
      <h1
        className="display text-2xl md:text-[1.75rem] leading-snug mb-3 text-balance text-white"
        style={{ letterSpacing: "-0.02em" }}
      >
        {question.prompt}
      </h1>
      {question.type === "multi" ? (
        <p className="text-sm text-ink-faint mb-9">Select all that apply.</p>
      ) : (
        <div className="mb-9" />
      )}

      {(question.type === "single" || question.type === "multi") && (
        <div className="flex flex-col gap-3">
          {question.options?.map((opt) => {
            const selected =
              question.type === "single" ? single === opt : multi.includes(opt);
            return (
              <button
                key={opt}
                type="button"
                disabled={submitting}
                onClick={() =>
                  question.type === "single" ? setSingle(opt) : toggleMulti(opt)
                }
                className="flex items-center justify-between gap-4 text-left px-5 py-4 rounded-xl backdrop-blur-xl text-base transition-all disabled:opacity-50"
                style={{
                  border: selected
                    ? "1px solid rgba(167,139,250,0.55)"
                    : "1px solid var(--line-soft)",
                  background: selected ? "rgba(124,58,237,0.18)" : "rgba(255,255,255,0.04)",
                  boxShadow: selected ? "0 20px 45px -20px rgba(88,28,235,0.55)" : "none",
                  color: selected ? "#fff" : "var(--ink-soft)",
                }}
              >
                {opt}
                {question.type === "single" ? (
                  <RadioIndicator selected={selected} />
                ) : (
                  <CheckIndicator selected={selected} />
                )}
              </button>
            );
          })}
        </div>
      )}

      {question.type === "text" && (
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type your answer…"
          rows={4}
          className="w-full rounded-xl px-5 py-4 text-base outline-none transition-colors backdrop-blur-xl placeholder:text-ink-faint focus:border-white/30 resize-none"
          style={{ border: "1px solid var(--line-soft)", background: "rgba(255,255,255,0.04)" }}
        />
      )}

      <div className="flex items-center gap-3 mt-9">
        <Link
          href={backHref}
          className="btn-ghost inline-flex items-center px-6 py-3.5 text-base"
        >
          Back
        </Link>
        <button
          type="button"
          onClick={goNext}
          disabled={!canContinue || submitting}
          className="btn-solid inline-flex items-center gap-2 px-7 py-3.5 text-base disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {submitting ? "Saving…" : isLast ? "See my result" : "Next"}
          {!submitting && <span aria-hidden="true">→</span>}
        </button>
      </div>
    </div>
  );
}
