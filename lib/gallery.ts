/**
 * Portfolio gallery · photos ET vidéos, même page /image.
 *
 * AJOUTER UNE PHOTO :
 *   1. Déposer le fichier dans public/portfolio/ (ex. public/portfolio/mon-projet.jpg)
 *   2. Ajouter { type: "photo", src: "/portfolio/mon-projet.jpg", aspect: "3/2" | "2/3" | "1/1" ... }
 *
 * AJOUTER UNE VIDÉO :
 *   1. Déposer video.mp4 + poster.jpg dans public/portfolio/
 *   2. Ajouter { type: "video", src: "/portfolio/video.mp4", poster: "/portfolio/poster.jpg", aspect: "9/16" }
 */

export type GalleryCategory =
  | "horlogerie"
  | "automobile"
  | "corporate"
  | "architecture"
  | "lifestyle";

export type MediaType = "photo" | "video";

export interface GalleryItem {
  id: string;
  type: MediaType;
  title: string;
  client: string;
  category: GalleryCategory;
  year: string;
  src: string;
  poster?: string;
  aspect: string;
  description?: string;
}

export const GALLERY_CATEGORIES: {
  id: GalleryCategory | "all";
  label: string;
}[] = [
  { id: "all", label: "Tout" },
  { id: "horlogerie", label: "Horlogerie" },
  { id: "automobile", label: "Automobile" },
  { id: "corporate", label: "Corporate" },
  { id: "architecture", label: "Architecture" },
  { id: "lifestyle", label: "Lifestyle" },
];

export const GALLERY_ITEMS: GalleryItem[] = [
  // ===== HERO MIX =====
  {
    id: "ysc-ferrari-360-chateau",
    type: "photo",
    title: "Ferrari 360 · château",
    client: "Your Swiss Concierge",
    category: "automobile",
    year: "2025",
    src: "/portfolio/ysc-ferrari-360-chateau.jpg",
    aspect: "3/2",
    description: "Shooting automobile de prestige dans un domaine privé genevois.",
  },
  {
    id: "gmt-master",
    type: "video",
    title: "Rolex GMT-Master",
    client: "Horlogerie de luxe",
    category: "horlogerie",
    year: "2025",
    src: "/portfolio/gmt-master.mp4",
    poster: "/portfolio/gmt-master.jpg",
    aspect: "9/16",
    description: "Film macro d'une GMT-Master vintage · direction et montage.",
  },
  {
    id: "seaoak-facade",
    type: "photo",
    title: "Façade",
    client: "Sea Oak",
    category: "architecture",
    year: "2024",
    src: "/portfolio/seaoak-facade.jpg",
    aspect: "3/2",
    description: "Photographie architecturale d'un immeuble de bureaux.",
  },
  {
    id: "swisstreasures-saumon",
    type: "video",
    title: "Patek Philippe · cadran saumon",
    client: "SwissTreasures",
    category: "horlogerie",
    year: "2025",
    src: "/portfolio/swisstreasures-saumon.mp4",
    poster: "/portfolio/swisstreasures-saumon.jpg",
    aspect: "9/16",
    description: "Mise en valeur d'une pièce rare pour un négociant genevois.",
  },

  // ===== AUTOMOBILE · YSC Ferrari =====
  {
    id: "ysc-ferrari-488-allee",
    type: "photo",
    title: "Au volant",
    client: "Your Swiss Concierge",
    category: "automobile",
    year: "2025",
    src: "/portfolio/ysc-ferrari-488-allee.jpg",
    aspect: "2/3",
    description: "Détail de l'habitacle · Manettino et volant carbone.",
  },
  {
    id: "ysc-ferrari-360-profil",
    type: "photo",
    title: "Ferrari 360 · profil",
    client: "Your Swiss Concierge",
    category: "automobile",
    year: "2025",
    src: "/portfolio/ysc-ferrari-360-profil.jpg",
    aspect: "3/2",
  },
  {
    id: "ysc-ferrari-levier",
    type: "photo",
    title: "Levier de vitesses",
    client: "Your Swiss Concierge",
    category: "automobile",
    year: "2025",
    src: "/portfolio/ysc-ferrari-levier.jpg",
    aspect: "2/3",
    description: "Détail de l'habitacle · grille de boîte manuelle.",
  },
  {
    id: "ysc-ferrari-ecusson",
    type: "photo",
    title: "Écusson",
    client: "Your Swiss Concierge",
    category: "automobile",
    year: "2025",
    src: "/portfolio/ysc-ferrari-ecusson.jpg",
    aspect: "2/3",
  },
  {
    id: "ysc-ferrari-portrait",
    type: "photo",
    title: "Le propriétaire",
    client: "Your Swiss Concierge",
    category: "automobile",
    year: "2025",
    src: "/portfolio/ysc-ferrari-portrait.jpg",
    aspect: "2/3",
    description: "Portrait environnemental avec la voiture.",
  },
  {
    id: "ysc-ferrari-488-arriere",
    type: "photo",
    title: "Ferrari 488 · signature",
    client: "Your Swiss Concierge",
    category: "automobile",
    year: "2025",
    src: "/portfolio/ysc-ferrari-488-arriere.jpg",
    aspect: "3/2",
  },
  {
    id: "concours-elegance",
    type: "video",
    title: "Concours d'élégance",
    client: "Automobile de collection",
    category: "automobile",
    year: "2024",
    src: "/portfolio/concours-elegance.mp4",
    poster: "/portfolio/concours-elegance.jpg",
    aspect: "9/16",
    description: "Reportage sur un rassemblement de voitures de collection.",
  },
  {
    id: "v2",
    type: "video",
    title: "Automobile de collection",
    client: "Automobile de collection",
    category: "automobile",
    year: "2024",
    src: "/portfolio/v2.mp4",
    poster: "/portfolio/v2.jpg",
    aspect: "9/16",
    description: "Détails et matières d'une voiture d'exception.",
  },

  // ===== HORLOGERIE =====
  {
    id: "pp-skeleton",
    type: "video",
    title: "Montre squelette or rose",
    client: "Horlogerie de luxe",
    category: "horlogerie",
    year: "2025",
    src: "/portfolio/pp-skeleton.mp4",
    poster: "/portfolio/pp-skeleton.jpg",
    aspect: "9/16",
    description: "Détail mécanique et matière · éclairage studio.",
  },
  {
    id: "swisstreasures",
    type: "video",
    title: "Présentation collection",
    client: "SwissTreasures",
    category: "horlogerie",
    year: "2025",
    src: "/portfolio/swisstreasures.mp4",
    poster: "/portfolio/swisstreasures.jpg",
    aspect: "9/16",
    description: "Format vertical pour la présentation de pièces d'exception.",
  },

  // ===== ARCHITECTURE · Sea Oak =====
  {
    id: "seaoak-open-space",
    type: "photo",
    title: "Open space",
    client: "Sea Oak",
    category: "architecture",
    year: "2024",
    src: "/portfolio/seaoak-open-space.jpg",
    aspect: "3/2",
    description: "Espace de travail baigné de lumière naturelle.",
  },
  {
    id: "seaoak-bureaux-lumiere",
    type: "photo",
    title: "Bureaux",
    client: "Sea Oak",
    category: "architecture",
    year: "2024",
    src: "/portfolio/seaoak-bureaux-lumiere.jpg",
    aspect: "3/2",
  },
  {
    id: "seaoak-espace-detente",
    type: "photo",
    title: "Espace détente",
    client: "Sea Oak",
    category: "architecture",
    year: "2024",
    src: "/portfolio/seaoak-espace-detente.jpg",
    aspect: "3/2",
  },
  {
    id: "seaoak-perspective",
    type: "photo",
    title: "Perspective",
    client: "Sea Oak",
    category: "architecture",
    year: "2024",
    src: "/portfolio/seaoak-perspective.jpg",
    aspect: "3/2",
  },

  // ===== CORPORATE =====
  {
    id: "migros",
    type: "video",
    title: "Banque Migros",
    client: "Banque Migros",
    category: "corporate",
    year: "2025",
    src: "/portfolio/migros.mp4",
    poster: "/portfolio/migros.jpg",
    aspect: "9/16",
    description: "Contenu corporate · interview et captation d'ambiance.",
  },
  {
    id: "century-finance",
    type: "video",
    title: "Century Finance",
    client: "Century Finance",
    category: "corporate",
    year: "2025",
    src: "/portfolio/century-finance.mp4",
    poster: "/portfolio/century-finance.jpg",
    aspect: "9/16",
    description: "Série de contenus experts pour un conseiller financier.",
  },
  {
    id: "century-360",
    type: "video",
    title: "Century Finance · format court",
    client: "Century Finance",
    category: "corporate",
    year: "2025",
    src: "/portfolio/century-360.mp4",
    poster: "/portfolio/century-360.jpg",
    aspect: "9/16",
    description: "Format social vertical sous-titré pour les réseaux.",
  },
  {
    id: "lattaque",
    type: "video",
    title: "Armée suisse",
    client: "Institutionnel",
    category: "corporate",
    year: "2024",
    src: "/portfolio/lattaque.mp4",
    poster: "/portfolio/lattaque.jpg",
    aspect: "9/16",
    description: "Témoignage institutionnel · captation et montage.",
  },

  // ===== LIFESTYLE =====
  {
    id: "beef",
    type: "video",
    title: "Art culinaire",
    client: "Gastronomie",
    category: "lifestyle",
    year: "2025",
    src: "/portfolio/beef.mp4",
    poster: "/portfolio/beef.jpg",
    aspect: "9/16",
    description: "Dressage en cuisine · plan macro et étalonnage chaleureux.",
  },
  {
    id: "8oak",
    type: "video",
    title: "8 Oak",
    client: "Restaurant & événementiel",
    category: "lifestyle",
    year: "2025",
    src: "/portfolio/8oak.mp4",
    poster: "/portfolio/8oak.jpg",
    aspect: "9/16",
    description: "Ambiance nocturne d'un restaurant événementiel.",
  },
  {
    id: "swissescape-editorial",
    type: "photo",
    title: "Swiss Escape Tour",
    client: "Swiss Escape",
    category: "lifestyle",
    year: "2025",
    src: "/portfolio/swissescape-editorial.jpg",
    aspect: "2/3",
    description: "Tour de supercars dans les Alpes suisses · direction éditoriale.",
  },
  {
    id: "swissescape-lineup",
    type: "photo",
    title: "Alignement",
    client: "Swiss Escape",
    category: "lifestyle",
    year: "2025",
    src: "/portfolio/swissescape-lineup.jpg",
    aspect: "2/3",
    description: "Ferrari, Lamborghini et Porsche face au panorama alpin.",
  },
  {
    id: "swissescape-groupe",
    type: "photo",
    title: "Les participants",
    client: "Swiss Escape",
    category: "lifestyle",
    year: "2025",
    src: "/portfolio/swissescape-groupe.jpg",
    aspect: "2/3",
  },
  {
    id: "swissescape-candid",
    type: "photo",
    title: "Instant volé",
    client: "Swiss Escape",
    category: "lifestyle",
    year: "2025",
    src: "/portfolio/swissescape-candid.jpg",
    aspect: "2/3",
  },
  {
    id: "swissescape-portrait",
    type: "photo",
    title: "Portrait alpin",
    client: "Swiss Escape",
    category: "lifestyle",
    year: "2025",
    src: "/portfolio/swissescape-portrait.jpg",
    aspect: "2/3",
  },
  {
    id: "ewa-vernissage-1",
    type: "photo",
    title: "Vernissage",
    client: "Ewa Senczawa",
    category: "lifestyle",
    year: "2025",
    src: "/portfolio/ewa-vernissage-1.jpg",
    aspect: "2/3",
    description: "Couverture événementielle en noir et blanc.",
  },
  {
    id: "ewa-vernissage-3",
    type: "photo",
    title: "Invités",
    client: "Ewa Senczawa",
    category: "lifestyle",
    year: "2025",
    src: "/portfolio/ewa-vernissage-3.jpg",
    aspect: "3/2",
  },
  {
    id: "ewa-vernissage-2",
    type: "photo",
    title: "Soirée d'exposition",
    client: "Ewa Senczawa",
    category: "lifestyle",
    year: "2025",
    src: "/portfolio/ewa-vernissage-2.jpg",
    aspect: "2/3",
  },
  {
    id: "ewa-vernissage-4",
    type: "photo",
    title: "Portrait",
    client: "Ewa Senczawa",
    category: "lifestyle",
    year: "2025",
    src: "/portfolio/ewa-vernissage-4.jpg",
    aspect: "2/3",
  },
];
