import { redirect } from "next/navigation";
import { getCurrentLead } from "@/lib/lead";
import { getTraderTypeByKey, computeProfileScores, type Answers } from "@/lib/trader-types";
import TraderTypeReveal from "@/app/components/onboarding/TraderTypeReveal";

export default async function ResultPage() {
  const lead = await getCurrentLead();
  if (!lead || !lead.traderType) redirect("/onboarding/questions/1");

  const traderType = getTraderTypeByKey(lead.traderType);
  const scores = computeProfileScores((lead.answers as Answers) ?? {});

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
