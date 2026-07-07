/**
 * Portfolio gallery · photos ET vidéos, même page /image.
 *
 * AJOUTER UNE PHOTO :
 *   1. Déposer le fichier dans public/portfolio/ (ex. public/portfolio/mon-projet.jpg)
 *   2. Ajouter une entrée { type: "photo", src: "/portfolio/mon-projet.jpg", aspect: "3/4" | "4/3" | "1/1" | "16/9" ... }
 *
 * AJOUTER UNE VIDÉO :
 *   1. Déposer video.mp4 + poster.jpg dans public/portfolio/
 *   2. Ajouter { type: "video", src: "/portfolio/video.mp4", poster: "/portfolio/poster.jpg", aspect: "9/16" }
 */

export type GalleryCategory =
  | "horlogerie"
  | "corporate"
  | "lifestyle"
  | "automobile";

export type MediaType = "photo" | "video";

export interface GalleryItem {
  id: string;
  type: MediaType;
  title: string;
  client: string;
  category: GalleryCategory;
  year: string;
  /** Chemin du média (image pour photo, .mp4 pour vidéo) */
  src: string;
  /** Poster obligatoire pour les vidéos (image affichée avant lecture) */
  poster?: string;
  /** Ratio d'aspect css (ex. "9/16", "3/4", "16/9", "1/1") */
  aspect: string;
  description?: string;
}

export const GALLERY_CATEGORIES: {
  id: GalleryCategory | "all";
  label: string;
}[] = [
  { id: "all", label: "Tout" },
  { id: "horlogerie", label: "Horlogerie" },
  { id: "corporate", label: "Corporate" },
  { id: "lifestyle", label: "Lifestyle" },
  { id: "automobile", label: "Automobile" },
];

export const GALLERY_ITEMS: GalleryItem[] = [
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
];
