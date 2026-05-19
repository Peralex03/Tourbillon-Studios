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
    eyebrow: "Projet",
    question: "Quel type de projet souhaitez-vous lancer ?",
    subtitle: "Une seule sélection. Vous pourrez préciser à l'étape suivante.",
    storeAs: "projectType",
    choices: [
      { id: "vitrine", label: "Site vitrine", hint: "Présenter votre activité.", next: "speed" },
      { id: "ecommerce", label: "E-commerce", hint: "Vendre en ligne.", next: "scale_ecommerce" },
      { id: "webapp", label: "Application web", hint: "Plateforme sur mesure.", next: "scale_webapp" },
      { id: "refonte", label: "Refonte", hint: "Moderniser un site existant.", next: "speed" },
    ],
  },
  {
    id: "scale_ecommerce",
    eyebrow: "Catalogue",
    question: "Quelle est la taille de votre catalogue ?",
    storeAs: "scale",
    choices: [
      { id: "small", label: "Moins de 50 produits", next: "speed" },
      { id: "medium", label: "50 à 500 produits", next: "speed" },
      { id: "large", label: "500 à 5 000 produits", next: "speed" },
      { id: "xl", label: "Plus de 5 000 produits", next: "speed" },
    ],
  },
  {
    id: "scale_webapp",
    eyebrow: "Périmètre",
    question: "Quel niveau de complexité fonctionnelle ?",
    subtitle: "Une estimation suffit, nous affinerons ensemble.",
    storeAs: "complexity",
    choices: [
      { id: "auth", label: "Comptes utilisateurs", hint: "Authentification, profils.", next: "speed" },
      { id: "dashboard", label: "Tableaux de bord", hint: "Visualisation de données.", next: "speed" },
      { id: "multi", label: "Multi-utilisateurs", hint: "Équipes, rôles, permissions.", next: "speed" },
      { id: "integrations", label: "Intégrations API", hint: "Stripe, CRM, automatisations.", next: "speed" },
    ],
  },
  {
    id: "speed",
    eyebrow: "Délai",
    question: "Pour quand souhaitez-vous la mise en ligne ?",
    storeAs: "speed",
    choices: [
      { id: "48h", label: "Sous 48 heures", hint: "Délai express, méthode standard.", next: "plan" },
      { id: "month", label: "Dans le mois", next: "plan" },
      { id: "quarter", label: "Dans le trimestre", next: "plan" },
      { id: "flexible", label: "Délai flexible", next: "plan" },
    ],
  },
  {
    id: "plan",
    eyebrow: "Formule",
    question: "Quel niveau d'investissement envisagez-vous ?",
    subtitle: "Toutes les formules sont mensuelles, sans engagement de durée.",
    storeAs: "plan",
    choices: [
      { id: "starter", label: "Starter", hint: "290 CHF par mois", next: "size" },
      { id: "pro", label: "Pro", hint: "590 CHF par mois", next: "size" },
      { id: "custom", label: "Custom", hint: "À partir de 1 490 CHF par mois", next: "size" },
      { id: "explore", label: "À déterminer ensemble", hint: "Pas encore décidé.", next: "size" },
    ],
  },
  {
    id: "size",
    eyebrow: "Structure",
    question: "Quelle est la taille de votre entreprise ?",
    storeAs: "size",
    choices: [
      { id: "solo", label: "Indépendant", next: "contact" },
      { id: "small", label: "2 à 10 collaborateurs", next: "contact" },
      { id: "medium", label: "10 à 100 collaborateurs", next: "contact" },
      { id: "large", label: "Plus de 100 collaborateurs", next: "contact" },
    ],
  },
  {
    id: "contact",
    eyebrow: "Coordonnées",
    question: "Comment pouvons-nous vous joindre ?",
    subtitle: "Réponse sous 24 heures ouvrées.",
    storeAs: "contact",
    choices: [], // Special: rendered as a form, not choices
  },
  {
    id: "summary",
    eyebrow: "Confirmation",
    question: "Demande transmise.",
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
  vitrine: "Site vitrine",
  ecommerce: "E-commerce",
  webapp: "Application web",
  refonte: "Refonte",
  small: "< 50",
  medium: "50–500",
  large: "500–5 000",
  xl: "> 5 000",
  auth: "Comptes utilisateurs",
  dashboard: "Tableaux de bord",
  multi: "Multi-utilisateurs",
  integrations: "Intégrations API",
  "48h": "48 heures",
  month: "Dans le mois",
  quarter: "Dans le trimestre",
  flexible: "Flexible",
  starter: "Starter — 290 CHF/mois",
  pro: "Pro — 590 CHF/mois",
  custom: "Custom — dès 1490 CHF/mois",
  explore: "À déterminer",
  solo: "Indépendant",
};
