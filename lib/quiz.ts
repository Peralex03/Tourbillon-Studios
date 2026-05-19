/**
 * Lead-qualifier quiz tree.
 * Each step has 2-4 choices. Some choices set the next step dynamically.
 * Final step collects contact info.
 */

export type StepId =
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
  label: string;
  hint?: string;
  /** Optional next step override (for branching) */
  next?: StepId;
}

export interface Step {
  id: StepId;
  /** Question shown to the user — big serif heading */
  question: string;
  /** Optional small subtitle */
  subtitle?: string;
  /** Mono eyebrow label e.g. "01 / 05" — filled by the runner automatically */
  eyebrow: string;
  choices: Choice[];
  /** Storage key for the answer */
  storeAs: string;
}

export const STEPS: Step[] = [
  {
    id: "project",
    eyebrow: "Brief",
    question: "Qu'est-ce qu'on construit ?",
    subtitle: "Un seul choix. Vous pouvez préciser plus tard.",
    storeAs: "projectType",
    choices: [
      { id: "vitrine", label: "Site vitrine", hint: "Une présence digitale solide.", next: "speed" },
      { id: "ecommerce", label: "E-commerce", hint: "Vendre en ligne.", next: "scale_ecommerce" },
      { id: "webapp", label: "Web app", hint: "Une plateforme sur mesure.", next: "scale_webapp" },
      { id: "refonte", label: "Refonte", hint: "Mon site existe, mais il est mort.", next: "speed" },
    ],
  },
  {
    id: "scale_ecommerce",
    eyebrow: "Échelle",
    question: "Combien de produits au catalogue ?",
    storeAs: "scale",
    choices: [
      { id: "small", label: "Moins de 50", next: "speed" },
      { id: "medium", label: "50 à 500", next: "speed" },
      { id: "large", label: "500 à 5 000", next: "speed" },
      { id: "xl", label: "Plus de 5 000", next: "speed" },
    ],
  },
  {
    id: "scale_webapp",
    eyebrow: "Complexité",
    question: "Quelle complexité métier ?",
    subtitle: "Une estimation rapide. On affinera ensemble.",
    storeAs: "complexity",
    choices: [
      { id: "auth", label: "Login & profil", hint: "Comptes utilisateurs.", next: "speed" },
      { id: "dashboard", label: "Dashboard", hint: "Tableaux de bord, données.", next: "speed" },
      { id: "multi", label: "Multi-utilisateurs", hint: "Équipes, rôles, permissions.", next: "speed" },
      { id: "integrations", label: "Intégrations API", hint: "Stripe, CRM, automation.", next: "speed" },
    ],
  },
  {
    id: "speed",
    eyebrow: "Délai",
    question: "Vous voulez le site quand ?",
    storeAs: "speed",
    choices: [
      { id: "48h", label: "En 48h", hint: "Méthode express.", next: "plan" },
      { id: "month", label: "Dans le mois", next: "plan" },
      { id: "quarter", label: "Dans le trimestre", next: "plan" },
      { id: "flexible", label: "Quand c'est prêt", next: "plan" },
    ],
  },
  {
    id: "plan",
    eyebrow: "Plan",
    question: "Quel investissement vous parle ?",
    subtitle: "Tous les plans sont mensuels, sans engagement.",
    storeAs: "plan",
    choices: [
      { id: "starter", label: "Starter", hint: "290 CHF / mois", next: "size" },
      { id: "pro", label: "Pro", hint: "590 CHF / mois", next: "size" },
      { id: "custom", label: "Custom", hint: "Dès 1490 CHF / mois", next: "size" },
      { id: "explore", label: "À voir ensemble", hint: "Pas encore décidé.", next: "size" },
    ],
  },
  {
    id: "size",
    eyebrow: "Vous",
    question: "Vous êtes combien dans l'équipe ?",
    storeAs: "size",
    choices: [
      { id: "solo", label: "Tout seul", next: "contact" },
      { id: "small", label: "2 à 10", next: "contact" },
      { id: "medium", label: "10 à 100", next: "contact" },
      { id: "large", label: "Plus de 100", next: "contact" },
    ],
  },
  {
    id: "contact",
    eyebrow: "Vous trouver",
    question: "On vous écrit où ?",
    subtitle: "Réponse sous 24h ouvrées. Rien d'autre.",
    storeAs: "contact",
    choices: [], // Special: rendered as a form, not choices
  },
  {
    id: "summary",
    eyebrow: "Récap",
    question: "Bien noté.",
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

/** Human-readable label for an answer ID (used in summary + Telegram) */
export const LABELS: Record<string, string> = {
  // project
  vitrine: "Site vitrine",
  ecommerce: "E-commerce",
  webapp: "Web app",
  refonte: "Refonte",
  // scale ecommerce
  small: "< 50",
  medium: "50–500",
  large: "500–5 000",
  xl: "> 5 000",
  // complexity
  auth: "Login & profil",
  dashboard: "Dashboard",
  multi: "Multi-utilisateurs",
  integrations: "Intégrations API",
  // speed
  "48h": "48 heures",
  month: "Dans le mois",
  quarter: "Dans le trimestre",
  flexible: "Flexible",
  // plan
  starter: "Starter — 290 CHF/mois",
  pro: "Pro — 590 CHF/mois",
  custom: "Custom — dès 1490 CHF/mois",
  explore: "À voir ensemble",
  // size
  solo: "Solo",
  // small already defined for scale, intentional fallback
};
