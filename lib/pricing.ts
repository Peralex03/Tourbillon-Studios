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
    tagline: "Pour lancer une présence digitale crédible.",
    monthlyPrice: 290,
    currency: "CHF",
    description: "Site vitrine professionnel, livré en 48h. Tout est inclus, vous payez par mois.",
    features: [
      "Site vitrine jusqu'à 5 pages",
      "Livraison en 48h ouvrées",
      "Hébergement Vercel inclus",
      "Domaine .ch inclus",
      "Certificat SSL automatique",
      "SEO de base + sitemap",
      "Optimisation mobile native",
      "2 retouches mineures par mois",
      "Support email sous 24h",
    ],
    notIncluded: ["Blog automatisé", "E-commerce", "Multilingue"],
    ctaLabel: "Commencer Starter",
    ctaHref: "/contact?plan=starter",
  },
  {
    id: "pro",
    name: "Pro",
    tagline: "Pour les PME qui veulent convertir, pas juste exister.",
    monthlyPrice: 590,
    currency: "CHF",
    featured: true,
    description: "Site complet avec blog, multilingue et SEO avancé. La solution PME suisse.",
    features: [
      "Site jusqu'à 15 pages",
      "Livraison en 48h ouvrées",
      "Blog automatisé (IA + SEO/GEO)",
      "Multilingue FR/DE/IT/EN",
      "SEO local Suisse + Google Business",
      "GEO — citations IA (ChatGPT, Perplexity)",
      "Analytics + rapport mensuel",
      "Retouches illimitées",
      "Support prioritaire sous 4h ouvrées",
      "Tout du plan Starter",
    ],
    ctaLabel: "Démarrer Pro",
    ctaHref: "/contact?plan=pro",
  },
  {
    id: "custom",
    name: "Custom",
    tagline: "Web app, e-commerce, ou besoins sur mesure.",
    monthlyPrice: 1490,
    currency: "CHF",
    description: "Pour les projets qui sortent du moule : web app, marketplace, e-commerce avancé.",
    features: [
      "Web app sur mesure (auth, dashboards)",
      "E-commerce Stripe / paiements suisses",
      "Intégrations API sur mesure",
      "Base de données managée",
      "Architecture évolutive",
      "Dev dédié assigné",
      "Support prioritaire sous 1h",
      "SLA 99.9% uptime",
      "Tout du plan Pro",
    ],
    ctaLabel: "Discuter du projet",
    ctaHref: "/contact?plan=custom",
  },
];

export const PRICING_FAQ = [
  {
    q: "Puis-je résilier à tout moment ?",
    a: "Oui. Aucun engagement, vous résiliez en envoyant un email. Le site reste actif jusqu'à la fin du mois en cours.",
  },
  {
    q: "Qui possède le code de mon site ?",
    a: "Vous. À la résiliation, nous vous fournissons une archive complète du code source. Vous pouvez l'héberger ailleurs ou continuer seul.",
  },
  {
    q: "Pourquoi en abonnement et pas un achat unique ?",
    a: "Parce que le web n'est jamais 'fini'. Hébergement, sécurité, mises à jour, retouches, SEO continu — tout est dans l'abonnement. Vous n'avez aucune surprise.",
  },
  {
    q: "Que se passe-t-il si vous ne livrez pas en 48h ?",
    a: "Premier mois gratuit. Notre méthode est calibrée pour respecter ce délai sur 99% des projets Starter et Pro.",
  },
  {
    q: "Peut-on changer de plan en cours de route ?",
    a: "Oui. Vous pouvez monter ou descendre de plan à tout moment. La transition se fait au prochain cycle de facturation.",
  },
  {
    q: "Y a-t-il vraiment zéro frais de setup ?",
    a: "Oui. Pas de frais d'installation, pas de design fees, pas de discovery payant. Vous payez votre premier mois et on lance le projet.",
  },
];
