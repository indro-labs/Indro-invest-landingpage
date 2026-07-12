export type Question = {
  id: string;
  step: number;
  prompt: string;
  type: "single" | "multi" | "text";
  options?: string[];
};

export const QUESTIONS: Question[] = [
  {
    id: "experienceLength",
    step: 1,
    prompt: "How long have you been actively trading?",
    type: "single",
    options: ["Less than 6 months", "6 months – 1 year", "1–3 years", "3+ years"],
  },
  {
    id: "tradingType",
    step: 2,
    prompt: "What type of trading do you primarily do?",
    type: "multi",
    options: [
      "Day trading",
      "Swing trading",
      "Long-term investing",
      "Options trading",
      "Cryptocurrency trading",
      "Other",
    ],
  },
  {
    id: "journeyStage",
    step: 3,
    prompt: "What best describes where you are in your trading journey?",
    type: "single",
    options: [
      "I'm just getting started and learning the basics.",
      "I'm working toward becoming consistently profitable.",
      "I'm profitable but want to become more disciplined.",
      "I'm looking to refine my psychology and performance.",
      "I'm not sure where I am yet.",
    ],
  },
  {
    id: "successDefinition",
    step: 4,
    prompt: "What does success in trading look like for you over the next 12 months?",
    type: "single",
    options: [
      "Becoming consistently profitable.",
      "Following my trading plan more consistently.",
      "Controlling my emotions better.",
      "Building confidence in my decisions.",
      "Growing my trading account.",
      "Trading professionally.",
    ],
  },
  {
    id: "entryInfluence",
    step: 5,
    prompt: "When entering a trade, what influences your decision the most?",
    type: "single",
    options: [
      "Technical analysis/chart patterns",
      "News or market events",
      "Gut feeling/intuition",
      "Following a strategy or system",
      "Advice from others",
    ],
  },
  {
    id: "planDeviation",
    step: 6,
    prompt: "How often do you deviate from your original trading plan?",
    type: "single",
    options: ["Almost never", "Occasionally", "Sometimes", "Frequently"],
  },
  {
    id: "lossResponse",
    step: 7,
    prompt: "After experiencing a significant loss, what is your typical response?",
    type: "single",
    options: [
      "Review my mistakes and adjust my strategy",
      "Take a break before trading again",
      "Try to recover the loss quickly",
      "Continue trading as usual",
      "I'm not sure",
    ],
  },
  {
    id: "emotionalImpact",
    step: 8,
    prompt: "How do emotions typically affect your trading decisions?",
    type: "single",
    options: [
      "They rarely affect my decisions",
      "They sometimes influence my choices",
      "They often impact my trades",
      "They strongly influence my trading",
    ],
  },
  {
    id: "struggleEmotion",
    step: 9,
    prompt: "Which trading emotion do you struggle with the most?",
    type: "single",
    options: [
      "Fear of missing out (FOMO)",
      "Fear of losses",
      "Overconfidence after wins",
      "Impatience",
      "Revenge trading after losses",
      "I don't struggle with emotions while trading",
    ],
  },
  {
    id: "adverseMoveResponse",
    step: 10,
    prompt: "When a trade moves against you, what do you usually do?",
    type: "single",
    options: [
      "Follow my exit strategy",
      "Wait and hope it recovers",
      "Re-evaluate the trade",
      "Add more to the position",
      "Exit immediately",
    ],
  },
  {
    id: "improvementGoal",
    step: 11,
    prompt: "What would you most like to improve about your trading?",
    type: "single",
    options: [
      "Better emotional control",
      "More consistent decisions",
      "Understanding my trading habits",
      "Reducing impulsive trades",
      "Improving my strategy",
      "Building confidence",
    ],
  },
  {
    id: "biggestChallenge",
    step: 12,
    prompt: "What is the biggest challenge you currently face in your trading?",
    type: "text",
  },
];

export const TOTAL_QUESTIONS = QUESTIONS.length;

export function getQuestionByStep(step: number) {
  return QUESTIONS.find((q) => q.step === step);
}
