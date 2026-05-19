/**
 * Pricing data structure — TEXT-FREE.
 * All human-readable labels live in messages/{locale}.json under `pricing.*`.
 * Consumers look strings up via t(`plans.${id}.tagline`), t(`plans.${id}.featureN`), etc.
 */

export type PricingPlanId = "starter" | "pro" | "custom";

export interface PricingPlan {
  id: PricingPlanId;
  name: string;
  monthlyPrice: number;
  currency: "CHF";
  featured?: boolean;
  /** Number of `feature1..featureN` keys in messages.pricing.plans[id].featureN */
  featureCount: number;
  /** Number of `notIncluded1..notIncludedN` keys (0 if none) */
  notIncludedCount: number;
  ctaHref: string;
}

export const PRICING_PLANS: PricingPlan[] = [
  { id: "starter", name: "Starter", monthlyPrice: 290, currency: "CHF", featureCount: 9, notIncludedCount: 3, ctaHref: "/start" },
  { id: "pro", name: "Pro", monthlyPrice: 590, currency: "CHF", featured: true, featureCount: 10, notIncludedCount: 1, ctaHref: "/start" },
  { id: "custom", name: "Custom", monthlyPrice: 1490, currency: "CHF", featureCount: 10, notIncludedCount: 0, ctaHref: "/start" },
];

/**
 * Comparison-table rows. `labelKey` resolves under `pricing.comparison.{labelKey}`.
 * Cell values: `true` → checkmark, `false` → dash, string → literal value (e.g. "5", "99 %", "1 h").
 * Strings here are values not requiring translation (numbers, percentages, durations).
 */
export interface FeatureRow {
  labelKey: string;
  starter: boolean | string;
  pro: boolean | string;
  custom: boolean | string;
}

export const PRICING_COMPARISON: FeatureRow[] = [
  { labelKey: "pages", starter: "5", pro: "15", custom: "∞" },
  { labelKey: "delivery48h", starter: true, pro: true, custom: "—" },
  { labelKey: "vercel", starter: true, pro: true, custom: true },
  { labelKey: "chDomain", starter: true, pro: true, custom: true },
  { labelKey: "ssl", starter: true, pro: true, custom: true },
  { labelKey: "mobile", starter: true, pro: true, custom: true },
  { labelKey: "basicSeo", starter: true, pro: true, custom: true },
  { labelKey: "blog", starter: false, pro: true, custom: true },
  { labelKey: "multilingual", starter: false, pro: true, custom: true },
  { labelKey: "localSeo", starter: false, pro: true, custom: true },
  { labelKey: "geoSeo", starter: false, pro: true, custom: true },
  { labelKey: "analytics", starter: false, pro: true, custom: true },
  { labelKey: "webapp", starter: false, pro: false, custom: true },
  { labelKey: "ecommerce", starter: false, pro: false, custom: true },
  { labelKey: "apiIntegrations", starter: false, pro: false, custom: true },
  { labelKey: "managedDb", starter: false, pro: false, custom: true },
  { labelKey: "revisions", starter: "2/mo", pro: "∞", custom: "∞" },
  { labelKey: "supportTime", starter: "24 h", pro: "4 h", custom: "1 h" },
  { labelKey: "uptime", starter: "99 %", pro: "99,5 %", custom: "99,9 %" },
  { labelKey: "dedicatedDev", starter: false, pro: false, custom: true },
];

/** FAQ entries · 6 q/a pairs in messages.pricing.faq.q1..q6 / a1..a6 */
export const PRICING_FAQ_COUNT = 6;
