/**
 * Trader-type classification rules.
 *
 * This is a plain data structure, not a model — edit SCORE_RULES and
 * TRADER_TYPES directly to tune how answers map to a result. Each answer
 * contributes points to three axes (discipline, aggression, patience); the
 * highest scoring archetype whose `match` predicate passes wins, checked in
 * order, with FALLBACK_TYPE used if nothing else matches.
 *
 * winRateRange is archetype-level flavor text, not a personal performance
 * claim — nobody has uploaded trades yet at this point in the funnel.
 */

export type Answers = Record<string, string | string[]>;

type Axes = { discipline: number; aggression: number; patience: number };

// answers[questionId][optionText] -> axis point contributions
const SCORE_RULES: Record<string, Record<string, Partial<Axes>>> = {
  planDeviation: {
    "Almost never": { discipline: 2, patience: 1 },
    Occasionally: { discipline: 1 },
    Sometimes: { discipline: -1, patience: -1 },
    Frequently: { discipline: -2, aggression: 1, patience: -2 },
  },
  lossResponse: {
    "Review my mistakes and adjust my strategy": { discipline: 2, patience: 1 },
    "Take a break before trading again": { discipline: 1, patience: 1 },
    "Try to recover the loss quickly": { discipline: -2, aggression: 2, patience: -2 },
    "Continue trading as usual": { discipline: -1 },
    "I'm not sure": { discipline: -1 },
  },
  emotionalImpact: {
    "They rarely affect my decisions": { discipline: 1, patience: 1 },
    "They sometimes influence my choices": {},
    "They often impact my trades": { aggression: 1, patience: -1 },
    "They strongly influence my trading": { discipline: -1, aggression: 2, patience: -2 },
  },
  struggleEmotion: {
    "Fear of missing out (FOMO)": { aggression: 2, patience: -1 },
    "Fear of losses": { patience: -1 },
    "Overconfidence after wins": { discipline: -1, aggression: 2 },
    Impatience: { patience: -2 },
    "Revenge trading after losses": { discipline: -2, aggression: 3, patience: -2 },
    "I don't struggle with emotions while trading": { discipline: 1, patience: 1 },
  },
  adverseMoveResponse: {
    "Follow my exit strategy": { discipline: 2, patience: 1 },
    "Wait and hope it recovers": { discipline: -1, patience: 1 },
    "Re-evaluate the trade": { discipline: 1, patience: 1 },
    "Add more to the position": { discipline: -2, aggression: 3, patience: -1 },
    "Exit immediately": { aggression: 1, patience: -1 },
  },
  entryInfluence: {
    "Following a strategy or system": { discipline: 1, patience: 1 },
    "Gut feeling/intuition": { aggression: 1, patience: -1 },
    "News or market events": { aggression: 1 },
  },
};

// tradingType is multi-select — each selected style nudges aggression/patience.
const TRADING_TYPE_RULES: Record<string, Partial<Axes>> = {
  "Day trading": { aggression: 1, patience: -1 },
  "Options trading": { aggression: 1 },
  "Cryptocurrency trading": { aggression: 1, patience: -1 },
  "Swing trading": { patience: 1 },
  "Long-term investing": { patience: 2, aggression: -1 },
};

export type TraderType = {
  key: string;
  label: string;
  archetype: string;
  description: string;
  /** Archetype-level pattern flavor, not a personal performance claim. */
  winRateRange: string;
  strengths: string[];
  watchOuts: string[];
  /** Why this result matters — product-benefit framing, not a fabricated stat. */
  edgeSentence: string;
  match: (answers: Answers, axes: Axes) => boolean;
};

export const TRADER_TYPES: TraderType[] = [
  {
    key: "revenge-trader",
    label: "The Revenge Trader",
    archetype: "Reactive Trader",
    description:
      "Losses hit hard, and the instinct to win it back fast tends to override the plan.",
    winRateRange: "38–46%",
    strengths: ["Fast to re-engage after a setback", "High conviction once in a trade"],
    watchOuts: ["Sizing up right after a loss", "Skipping the plan to chase a recovery"],
    edgeSentence:
      "Your edge shows up when you wait — the losing streak right before a revenge trade almost always leaves a fingerprint.",
    match: (answers) =>
      answers.struggleEmotion === "Revenge trading after losses" ||
      answers.lossResponse === "Try to recover the loss quickly",
  },
  {
    key: "fomo-chaser",
    label: "The FOMO Chaser",
    archetype: "Momentum Chaser",
    description:
      "Fear of missing the move pulls you into trades before the setup is fully there.",
    winRateRange: "41–49%",
    strengths: ["Quick to spot momentum", "Comfortable acting fast"],
    watchOuts: ["Entering before confirmation", "Chasing extended moves"],
    edgeSentence:
      "FOMO entries usually show up as a clear pattern in your timestamps and sizing — once it's named, it's easy to build a rule around.",
    match: (answers) =>
      answers.struggleEmotion === "Fear of missing out (FOMO)" ||
      answers.entryInfluence === "Gut feeling/intuition",
  },
  {
    key: "disciplined-strategist",
    label: "The Disciplined Strategist",
    archetype: "Systematic Trader",
    description:
      "You mostly stick to your plan and process — the edge to sharpen is consistency under pressure.",
    winRateRange: "52–58%",
    strengths: ["Follows a defined process", "Reviews mistakes instead of repeating them"],
    watchOuts: ["Rare but costly slips under pressure", "Can get rigid in fast markets"],
    edgeSentence:
      "Your data will show exactly which conditions cause the rare slip-ups — small, fixable leaks rather than a systemic problem.",
    match: (_answers, axes) => axes.discipline >= 3 && axes.aggression <= 1,
  },
  {
    key: "emotional-reactor",
    label: "The Emotional Reactor",
    archetype: "Instinct-Led Trader",
    description:
      "Emotions play a big role in your trade decisions, especially after wins or losses.",
    winRateRange: "40–47%",
    strengths: ["Reads shifts in sentiment quickly", "Adapts fast to changing conditions"],
    watchOuts: ["Decisions swing with mood", "Plan gets abandoned under pressure"],
    edgeSentence:
      "Emotion-driven trades tend to cluster right after big wins or losses — your history will show exactly when it happens to you.",
    match: (_answers, axes) => axes.aggression >= 4 && axes.patience <= -1,
  },
  {
    key: "developing-trader",
    label: "The Developing Trader",
    archetype: "Early-Stage Trader",
    description:
      "Still building the habits and process that separate consistent traders from the rest.",
    winRateRange: "Still forming — that's normal",
    strengths: ["Open to feedback", "Building habits from a clean slate"],
    watchOuts: ["No track record yet to lean on", "Easy to copy habits before testing them"],
    edgeSentence:
      "The earlier a pattern is named, the easier it is to build a habit around catching it — this is the ideal stage to start tracking.",
    match: (answers) =>
      answers.experienceLength === "Less than 6 months" ||
      answers.journeyStage ===
        "I'm just getting started and learning the basics.",
  },
];

const FALLBACK_TYPE: TraderType = {
  key: "balanced-trader",
  label: "The Balanced Trader",
  archetype: "All-Round Trader",
  description:
    "A mix of discipline and instinct — the data will show exactly where the edge is leaking.",
  winRateRange: "46–53%",
  strengths: ["Balanced approach", "Comfortable with variance"],
  watchOuts: ["Repeating the same mistake without a journal", "Overtrading on slow days"],
  edgeSentence:
    "Your trade history will show exactly where discipline holds and where instinct takes over — that's the pattern worth naming.",
  match: () => true,
};

function computeAxes(answers: Answers): Axes {
  const axes: Axes = { discipline: 0, aggression: 0, patience: 0 };
  const apply = (contribution: Partial<Axes> | undefined) => {
    if (!contribution) return;
    axes.discipline += contribution.discipline ?? 0;
    axes.aggression += contribution.aggression ?? 0;
    axes.patience += contribution.patience ?? 0;
  };

  for (const [questionId, optionScores] of Object.entries(SCORE_RULES)) {
    const answer = answers[questionId];
    apply(typeof answer === "string" ? optionScores[answer] : undefined);
  }

  const tradingTypes = answers.tradingType;
  if (Array.isArray(tradingTypes)) {
    for (const t of tradingTypes) apply(TRADING_TYPE_RULES[t]);
  }

  return axes;
}

// Raw axis totals roughly range -8..+8 depending on answers — normalize to a
// 0-100 band that stays readable (20-90) rather than hitting the extremes.
function normalize(raw: number) {
  const pct = 55 + raw * 6;
  return Math.max(15, Math.min(95, Math.round(pct)));
}

export function computeProfileScores(answers: Answers) {
  const axes = computeAxes(answers);
  return {
    discipline: normalize(axes.discipline),
    aggression: normalize(axes.aggression),
    patience: normalize(axes.patience),
  };
}

export function classifyTraderType(answers: Answers): string {
  const axes = computeAxes(answers);
  const match = TRADER_TYPES.find((t) => t.match(answers, axes));
  return (match ?? FALLBACK_TYPE).key;
}

export function getTraderTypeByKey(key: string | null | undefined) {
  return TRADER_TYPES.find((t) => t.key === key) ?? FALLBACK_TYPE;
}
