/**
 * Trader-type classification rules.
 *
 * This is a plain data structure, not a model — edit SCORE_RULES and
 * TRADER_TYPES directly to tune how answers map to a result. Each answer
 * contributes points to three axes (discipline, aggression, patience).
 *
 * Classification is a weighted score, not a first-match check: every type's
 * `score()` runs against the full answer set, and the highest score wins
 * (FALLBACK_TYPE has a small flat score so it only wins when nothing else
 * scores higher). An earlier version used Array.find() with OR conditions,
 * which meant whichever type was listed first with a broad condition
 * (fomo-chaser, revenge-trader) won disproportionately often — this
 * scoring approach fixes that bias.
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
  /** Higher score wins. See file header for why this replaced boolean match(). */
  score: (answers: Answers, axes: Axes) => number;
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
      "You want to make it right the moment a trade goes against you. That drive keeps you engaged and confident, but it can also push you into a trade sized bigger than you planned. The difference often comes down to recognizing the pattern before you click Buy or Sell.",
    score: (answers, axes) => {
      let s = 0;
      if (answers.struggleEmotion === "Revenge trading after losses") s += 3;
      if (answers.lossResponse === "Try to recover the loss quickly") s += 3;
      if (answers.adverseMoveResponse === "Add more to the position") s += 2;
      // Counter-signal: a single struggle-emotion admission shouldn't win
      // against an otherwise disciplined answer profile.
      if (answers.planDeviation === "Almost never") s -= 2;
      if (answers.lossResponse === "Review my mistakes and adjust my strategy") s -= 1.5;
      s += Math.max(0, axes.aggression - axes.discipline) * 0.15;
      return s;
    },
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
      "You act quickly when you see opportunity. That instinct helps you catch momentum, but it can also pull you into trades before the setup is fully confirmed. The difference often comes down to recognizing the pattern before you click Buy or Sell.",
    score: (answers, axes) => {
      let s = 0;
      if (answers.struggleEmotion === "Fear of missing out (FOMO)") s += 3;
      if (answers.entryInfluence === "Gut feeling/intuition") s += 2;
      if (answers.entryInfluence === "News or market events") s += 1;
      if (answers.planDeviation === "Frequently") s += 1;
      if (answers.adverseMoveResponse === "Exit immediately") s += 1;
      // Counter-signal: a single struggle-emotion admission shouldn't win
      // against an otherwise disciplined answer profile.
      if (answers.planDeviation === "Almost never") s -= 2;
      if (answers.lossResponse === "Review my mistakes and adjust my strategy") s -= 1.5;
      s += Math.max(0, axes.aggression - axes.patience) * 0.15;
      return s;
    },
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
      "You follow your process even when it's tempting not to. That consistency is what makes your edge repeatable, but it can also make you rigid when conditions shift fast. The difference often comes down to recognizing when the plan needs to flex, not just when to follow it.",
    score: (answers, axes) => {
      let s = axes.discipline * 0.4 - axes.aggression * 0.2;
      if (axes.discipline >= 2 && axes.aggression <= 1) s += 3;
      if (answers.lossResponse === "Review my mistakes and adjust my strategy") s += 2.5;
      if (answers.planDeviation === "Almost never") s += 2;
      if (answers.entryInfluence === "Following a strategy or system") s += 1;
      if (answers.adverseMoveResponse === "Follow my exit strategy") s += 1;
      return s;
    },
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
      "You feel the market's mood and react to it fast. That sensitivity helps you catch shifts others miss, but it can also mean your decisions swing with your emotions instead of your plan. The difference often comes down to recognizing the feeling before it becomes the trade.",
    score: (answers, axes) => {
      let s = axes.aggression * 0.15 - axes.patience * 0.15;
      if (answers.emotionalImpact === "They strongly influence my trading") s += 4;
      if (answers.struggleEmotion === "Overconfidence after wins") s += 2;
      if (answers.struggleEmotion === "Impatience") s += 1;
      // FOMO/revenge are more specific labels for the same underlying
      // reactivity — back off so this doesn't cannibalize those results.
      if (answers.struggleEmotion === "Fear of missing out (FOMO)") s -= 2;
      if (answers.struggleEmotion === "Revenge trading after losses") s -= 2;
      return s;
    },
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
      "You're still finding your rhythm, and that's exactly where you should be. Every trader's habits start somewhere, and the ones you build now are the ones that stick. The difference often comes down to naming the pattern early, before it becomes automatic.",
    score: (answers) => {
      let s = 0;
      if (answers.experienceLength === "Less than 6 months") s += 4;
      if (
        answers.journeyStage ===
        "I'm just getting started and learning the basics."
      )
        s += 3;
      return s;
    },
  },
];

const FALLBACK_TYPE: TraderType = {
  key: "balanced-trader",
  label: "The Balanced Trader",
  archetype: "All-Round Trader",
  description:
    "A mix of discipline and instinct — the data will show exactly where each one takes over.",
  winRateRange: "46–53%",
  strengths: ["Balanced approach", "Comfortable with variance"],
  watchOuts: ["Repeating the same mistake without a journal", "Overtrading on slow days"],
  edgeSentence:
    "You lean on both instinct and process, depending on the moment. That flexibility is useful, but it can also mean neither one is fully in control. The difference often comes down to recognizing which one is driving a given trade.",
  // Small flat score so this only wins when no other type scores higher.
  score: () => 1.5,
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
  const candidates = [...TRADER_TYPES, FALLBACK_TYPE];
  let best = FALLBACK_TYPE;
  let bestScore = -Infinity;
  for (const type of candidates) {
    const s = type.score(answers, axes);
    if (s > bestScore) {
      bestScore = s;
      best = type;
    }
  }
  return best.key;
}

export function getTraderTypeByKey(key: string | null | undefined) {
  return TRADER_TYPES.find((t) => t.key === key) ?? FALLBACK_TYPE;
}
