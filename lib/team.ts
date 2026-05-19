export interface TeamMember {
  name: string;
  role: string;
  bio: string;
  initials: string;
}

export const TEAM: TeamMember[] = [
  {
    name: "Alex Peralta",
    role: "Fondateur · Direction & Design",
    bio: "Six années d'expérience en agence et en environnement SaaS. Spécialisé dans la conception produit et la stratégie de conversion.",
    initials: "AP",
  },
  {
    name: "Tourbillon Bot",
    role: "Moteur éditorial",
    bio: "Agent intelligent autonome chargé de la rédaction et de la publication quotidienne du journal éditorial, optimisé pour le SEO et le GEO.",
    initials: "TB",
  },
];

export const VALUES = [
  {
    title: "Rapidité",
    description:
      "48 heures pour livrer un site professionnel. Le temps constitue votre actif le plus rare. Notre méthode est calibrée pour le préserver.",
    eyebrow: "01",
  },
  {
    title: "Précision suisse",
    description:
      "Travail soigné, conformité nLPD, hébergement en Suisse. Le souci du détail comme standard, non comme exception.",
    eyebrow: "02",
  },
  {
    title: "Transparence",
    description:
      "Tarifs publics, devis détaillés, absence de coûts cachés. Vous savez ce que vous investissez et ce que vous recevez, dès la première visite.",
    eyebrow: "03",
  },
  {
    title: "Performance",
    description:
      "Lighthouse 95+, conversion mesurée, SEO et GEO intégrés. Un beau site qui ne convertit pas représente un coût, non un actif.",
    eyebrow: "04",
  },
];

export const CITIES = [
  { name: "Genève", coords: "46.2044° N, 6.1432° E", role: "Studio principal" },
  { name: "Lausanne", coords: "46.5197° N, 6.6323° E", role: "Production" },
  { name: "Zürich", coords: "47.3769° N, 8.5417° E", role: "Antenne alémanique" },
];
