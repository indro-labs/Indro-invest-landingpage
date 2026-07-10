"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import type { Question } from "@/lib/questions";

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
    <div
      key={question.id}
      className="rise rounded-3xl surface p-6 md:p-8"
      style={{ boxShadow: "var(--shadow)" }}
    >
      <h1 className="display text-2xl md:text-3xl leading-tight mb-2">
        {question.prompt}
      </h1>
      {question.type === "multi" && (
        <p className="text-sm text-ink-faint mb-6">Select all that apply.</p>
      )}
      {question.type !== "multi" && <div className="mb-6" />}

      {(question.type === "single" || question.type === "multi") && (
        <div className="flex flex-col gap-2.5">
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
                className={`text-left px-5 py-3.5 rounded-xl border text-base transition-colors disabled:opacity-50 ${
                  selected
                    ? "bg-accent text-accent-ink border-accent"
                    : "border-line text-ink-soft hover:border-ink/40 hover:text-ink"
                }`}
              >
                {opt}
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
          className="w-full surface rounded-2xl px-5 py-4 text-base outline-none transition-colors placeholder:text-ink-faint focus:border-ink resize-none"
        />
      )}

      <div className="flex items-center gap-3 mt-7">
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
