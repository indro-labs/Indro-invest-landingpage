import { redirect } from "next/navigation";
import { getCurrentLead } from "@/lib/lead";
import { prisma } from "@/lib/prisma";
import { getTraderTypeByKey } from "@/lib/trader-types";
import TraderTypeReveal from "@/app/components/onboarding/TraderTypeReveal";

type Scores = { discipline: number; aggression: number; patience: number };

export default async function ResultPage() {
  const lead = await getCurrentLead();
  if (!lead) redirect("/onboarding/questions/1");

  const assessment = lead.currentTraderAssessmentId
    ? await prisma.traderAssessment.findUnique({ where: { id: lead.currentTraderAssessmentId } })
    : null;
  if (!assessment) redirect("/onboarding/questions/1");

  const traderType = getTraderTypeByKey(assessment.traderType);
  const scores = assessment.scores as Scores;

  return (
    <div className="max-w-xl mx-auto w-full min-w-0">
      <TraderTypeReveal
        profile={{
          label: traderType.label,
          archetype: traderType.archetype,
          description: traderType.description,
          winRateRange: traderType.winRateRange,
          strengths: traderType.strengths,
          watchOuts: traderType.watchOuts,
          edgeSentence: traderType.edgeSentence,
          scores,
        }}
      />
    </div>
  );
}
