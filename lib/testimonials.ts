export interface Testimonial {
  quote: string;
  author: string;
  role: string;
  company: string;
  initials: string;
}

export const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "Le site a été livré en 36 heures, avec une conversion supérieure à celui que nous avions construit en quatre mois. Le rapport qualité-prix-rapidité est sans équivalent sur le marché suisse.",
    author: "Direction",
    role: "Gérance",
    company: "Your Swiss Concierge",
    initials: "YS",
  },
  {
    quote:
      "Une approche méthodique et professionnelle. La transparence du modèle d'abonnement nous a immédiatement convaincus. L'équipe a livré exactement ce qui avait été promis, dans le délai prévu.",
    author: "Direction artistique",
    role: "Co-fondatrice",
    company: "Aspaklaria Collection",
    initials: "AC",
  },
  {
    quote:
      "La conception du site reflète parfaitement l'identité de notre établissement. Les retouches incluses dans l'abonnement nous permettent d'ajuster en continu sans frais imprévus.",
    author: "Direction générale",
    role: "Directeur",
    company: "Late Night Milan",
    initials: "LN",
  },
];
