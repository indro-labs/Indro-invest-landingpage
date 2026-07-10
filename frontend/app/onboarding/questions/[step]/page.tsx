import { notFound, redirect } from "next/navigation";
import { getQuestionByStep, TOTAL_QUESTIONS } from "@/lib/questions";
import { getCurrentLead } from "@/lib/lead";
import OnboardingProgress from "@/app/components/onboarding/OnboardingProgress";
import QuestionCard from "@/app/components/onboarding/QuestionCard";
import LeadBootstrap from "@/app/components/onboarding/LeadBootstrap";

export default async function QuestionStepPage({
  params,
}: {
  params: Promise<{ step: string }>;
}) {
  const { step: stepParam } = await params;
  const step = Number(stepParam);
  const question = getQuestionByStep(step);
  if (!question) notFound();

  const lead = await getCurrentLead();

  if (!lead) {
    if (step !== 1) redirect("/onboarding/questions/1");
    return (
      <div>
        <OnboardingProgress step={step} total={TOTAL_QUESTIONS} />
        <LeadBootstrap />
      </div>
    );
  }

  const answers = (lead.answers as Record<string, string | string[]>) ?? {};
  const rawValue = answers[question.id];
  const initialValue: string | string[] =
    question.type === "multi"
      ? Array.isArray(rawValue)
        ? rawValue
        : []
      : typeof rawValue === "string"
        ? rawValue
        : "";

  return (
    <div>
      <OnboardingProgress step={step} total={TOTAL_QUESTIONS} />
      <QuestionCard
        question={question}
        leadId={lead.id}
        initialValue={initialValue}
        isLast={step === TOTAL_QUESTIONS}
      />
    </div>
  );
}
