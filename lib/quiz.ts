/**
 * Lead-qualifier quiz tree · STRUCTURE ONLY.
 * All user-facing text lives in messages/{locale}.json under `quiz.tree.<stepId>`.
 * Each step has 2-4 choices. Some choices set the next step dynamically.
 * Final step collects contact info.
 */

export type StepId =
  | "domain"
  | "project"
  | "speed"
  | "scale_ecommerce"
  | "scale_webapp"
  | "plan"
  | "size"
  | "contact"
  | "summary";

export interface Choice {
  id: string;
  /** Optional next step override (for branching) */
  next?: StepId;
}

export interface Step {
  id: StepId;
  choices: Choice[];
  /** Storage key for the answer */
  storeAs: string;
  /** True when `quiz.tree.<id>.subtitle` exists in the message files */
  hasSubtitle?: boolean;
}

export const STEPS: Step[] = [
  {
    id: "domain",
    storeAs: "track",
    choices: [
      { id: "web", next: "project" },
      { id: "image" }, // special: redirects to WhatsApp, handled in QuizClient
    ],
  },
  {
    id: "project",
    storeAs: "projectType",
    hasSubtitle: true,
    choices: [
      { id: "vitrine", next: "speed" },
      { id: "ecommerce", next: "scale_ecommerce" },
      { id: "webapp", next: "scale_webapp" },
      { id: "refonte", next: "speed" },
    ],
  },
  {
    id: "scale_ecommerce",
    storeAs: "scale",
    choices: [
      { id: "small", next: "speed" },
      { id: "medium", next: "speed" },
      { id: "large", next: "speed" },
      { id: "xl", next: "speed" },
    ],
  },
  {
    id: "scale_webapp",
    storeAs: "complexity",
    hasSubtitle: true,
    choices: [
      { id: "auth", next: "speed" },
      { id: "dashboard", next: "speed" },
      { id: "multi", next: "speed" },
      { id: "integrations", next: "speed" },
    ],
  },
  {
    id: "speed",
    storeAs: "speed",
    choices: [
      { id: "48h", next: "plan" },
      { id: "month", next: "plan" },
      { id: "quarter", next: "plan" },
      { id: "flexible", next: "plan" },
    ],
  },
  {
    id: "plan",
    storeAs: "plan",
    hasSubtitle: true,
    choices: [
      { id: "starter", next: "size" },
      { id: "pro", next: "size" },
      { id: "custom", next: "size" },
      { id: "explore", next: "size" },
    ],
  },
  {
    id: "size",
    storeAs: "size",
    choices: [
      { id: "solo", next: "contact" },
      { id: "small", next: "contact" },
      { id: "medium", next: "contact" },
      { id: "large", next: "contact" },
    ],
  },
  {
    id: "contact",
    storeAs: "contact",
    choices: [], // Special: rendered as a form, not choices
  },
  {
    id: "summary",
    storeAs: "",
    choices: [],
  },
];

export const STEP_BY_ID: Record<StepId, Step> = Object.fromEntries(
  STEPS.map((s) => [s.id, s])
) as Record<StepId, Step>;

/** Total number of visible question steps (excluding summary) */
export const VISIBLE_STEPS_COUNT = STEPS.filter((s) => s.id !== "summary").length;

export interface QuizAnswers {
  track?: string;
  projectType?: string;
  scale?: string;
  complexity?: string;
  speed?: string;
  plan?: string;
  size?: string;
  name?: string;
  email?: string;
  message?: string;
}
