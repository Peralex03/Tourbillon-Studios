export interface TeamMember {
  name: string;
  role: string;
  bio: string;
  initials: string;
}

export const TEAM: TeamMember[] = [
  {
    name: "Alex Peralta",
    role: "Founder · Design & Direction",
    bio: "Concentré sur le craft visuel et la stratégie produit. 6 ans d'expérience en agence et SaaS.",
    initials: "AP",
  },
  {
    name: "Tourbillon Bot",
    role: "Content Engine",
    bio: "Agent IA autonome qui rédige, optimise et publie le contenu SEO/GEO chaque jour à 08h UTC.",
    initials: "TB",
  },
];

export const VALUES = [
  {
    title: "Vitesse",
    description:
      "48h pour livrer un site professionnel. Le temps est votre actif le plus rare — on ne le gaspille pas.",
    eyebrow: "01",
  },
  {
    title: "Précision suisse",
    description:
      "Pixel-perfect, conforme nLPD, hébergement en Suisse. Le craft du détail comme standard, pas comme exception.",
    eyebrow: "02",
  },
  {
    title: "Transparence",
    description:
      "Tarifs publics, pas de devis opaques. Vous savez ce que vous payez et ce que vous recevez, dès la première visite.",
    eyebrow: "03",
  },
  {
    title: "Performance",
    description:
      "Lighthouse 95+, conversion mesurée, SEO + GEO intégrés. Un beau site qui ne convertit pas est un coût, pas un actif.",
    eyebrow: "04",
  },
];

export const CITIES = [
  { name: "Genève", coords: "46.2044° N, 6.1432° E", role: "Studio principal" },
  { name: "Lausanne", coords: "46.5197° N, 6.6323° E", role: "Production" },
  { name: "Zürich", coords: "47.3769° N, 8.5417° E", role: "Liaison alémanique" },
];
