export interface PricingPlan {
  id: string;
  name: string;
  tagline: string;
  monthlyPrice: number; // CHF
  currency: "CHF";
  featured?: boolean;
  description: string;
  features: string[];
  notIncluded?: string[];
  ctaLabel: string;
  ctaHref: string;
}

export const PRICING_PLANS: PricingPlan[] = [
  {
    id: "starter",
    name: "Starter",
    tagline: "Établir une présence digitale professionnelle.",
    monthlyPrice: 290,
    currency: "CHF",
    description:
      "Site vitrine professionnel livré en 48 heures. L'ensemble des prestations est inclus dans l'abonnement mensuel.",
    features: [
      "Site vitrine jusqu'à 5 pages",
      "Livraison en 48 heures ouvrées",
      "Hébergement Vercel inclus",
      "Domaine .ch inclus",
      "Certificat SSL automatique",
      "Optimisation SEO de base + sitemap",
      "Adaptation mobile native",
      "2 retouches mineures par mois",
      "Support par email sous 24 heures",
    ],
    notIncluded: ["Journal automatisé", "Fonctionnalités e-commerce", "Multilingue"],
    ctaLabel: "Choisir Starter",
    ctaHref: "/start",
  },
  {
    id: "pro",
    name: "Pro",
    tagline: "La formule la plus choisie par les PME suisses.",
    monthlyPrice: 590,
    currency: "CHF",
    featured: true,
    description:
      "Site complet avec journal éditorial, multilingue et optimisation SEO avancée. La solution recommandée pour les PME en croissance.",
    features: [
      "Site jusqu'à 15 pages",
      "Livraison en 48 heures ouvrées",
      "Journal éditorial automatisé (SEO + GEO)",
      "Multilingue FR/DE/IT/EN",
      "Référencement local Suisse + Google Business",
      "Optimisation GEO · citations IA (ChatGPT, Perplexity)",
      "Tableau de bord analytique + rapport mensuel",
      "Retouches illimitées",
      "Support prioritaire sous 4 heures ouvrées",
      "Tous les services de la formule Starter",
    ],
    ctaLabel: "Choisir Pro",
    ctaHref: "/start",
  },
  {
    id: "custom",
    name: "Custom",
    tagline: "Application web, e-commerce ou besoins spécifiques.",
    monthlyPrice: 1490,
    currency: "CHF",
    description:
      "Pour les projets qui sortent du cadre standard : applications web, plateformes e-commerce avancées, intégrations sur mesure.",
    features: [
      "Application web sur mesure (authentification, tableaux de bord)",
      "E-commerce Stripe · solutions de paiement suisses",
      "Intégrations API sur mesure",
      "Base de données managée",
      "Architecture évolutive",
      "Développeur dédié assigné au projet",
      "Support prioritaire sous 1 heure",
      "Engagement de disponibilité 99,9 %",
      "Tous les services de la formule Pro",
    ],
    ctaLabel: "Discuter du projet",
    ctaHref: "/start",
  },
];

export interface FeatureRow {
  label: string;
  starter: boolean | string;
  pro: boolean | string;
  custom: boolean | string;
}

export const PRICING_COMPARISON: FeatureRow[] = [
  { label: "Pages incluses", starter: "5", pro: "15", custom: "Illimité" },
  { label: "Livraison en 48 heures", starter: true, pro: true, custom: "Sur devis" },
  { label: "Hébergement Vercel inclus", starter: true, pro: true, custom: true },
  { label: "Domaine .ch inclus", starter: true, pro: true, custom: true },
  { label: "Certificat SSL", starter: true, pro: true, custom: true },
  { label: "Optimisation mobile native", starter: true, pro: true, custom: true },
  { label: "Référencement SEO de base", starter: true, pro: true, custom: true },
  { label: "Journal éditorial automatisé", starter: false, pro: true, custom: true },
  { label: "Multilingue FR/DE/IT/EN", starter: false, pro: true, custom: true },
  { label: "Référencement local Suisse + Google Business", starter: false, pro: true, custom: true },
  { label: "Optimisation GEO (ChatGPT, Perplexity)", starter: false, pro: true, custom: true },
  { label: "Tableau de bord analytique", starter: false, pro: true, custom: true },
  { label: "Application web sur mesure", starter: false, pro: false, custom: true },
  { label: "E-commerce avec Stripe", starter: false, pro: false, custom: true },
  { label: "Intégrations API personnalisées", starter: false, pro: false, custom: true },
  { label: "Base de données managée", starter: false, pro: false, custom: true },
  { label: "Retouches", starter: "2 / mois", pro: "Illimitées", custom: "Illimitées" },
  { label: "Délai de support", starter: "24 h", pro: "4 h", custom: "1 h" },
  { label: "Garantie de disponibilité", starter: "99 %", pro: "99,5 %", custom: "99,9 %" },
  { label: "Développeur dédié assigné", starter: false, pro: false, custom: true },
];

export const PRICING_FAQ = [
  {
    q: "Puis-je résilier à tout moment ?",
    a: "Oui, sans condition. La résiliation se fait par simple email. Le site reste accessible jusqu'à la fin du mois en cours.",
  },
  {
    q: "À qui appartient le code source de mon site ?",
    a: "À vous. En cas de résiliation, nous vous fournissons une archive complète du code source. Vous restez libre de l'héberger ailleurs ou d'en confier la maintenance à un autre prestataire.",
  },
  {
    q: "Pourquoi un modèle d'abonnement plutôt qu'un achat unique ?",
    a: "Un site web nécessite un suivi continu : hébergement, sécurité, mises à jour, retouches, référencement. L'abonnement intègre l'ensemble de ces prestations et garantit une absence totale de coûts imprévus.",
  },
  {
    q: "Que se passe-t-il en cas de dépassement du délai de 48 heures ?",
    a: "Le premier mois vous est offert. Notre méthode est calibrée pour respecter ce délai sur 99 % des projets Starter et Pro.",
  },
  {
    q: "Est-il possible de changer de formule en cours d'abonnement ?",
    a: "Oui, à tout moment. La montée ou descente de formule s'applique au cycle de facturation suivant.",
  },
  {
    q: "Y a-t-il réellement aucun frais d'installation ?",
    a: "Confirmé. Aucun frais d'installation, aucun frais de design, aucun discovery payant. Le premier mois d'abonnement déclenche le projet.",
  },
];
