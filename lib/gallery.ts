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
  client: string;
  category: GalleryCategory;
  year: string;
  src: string;
  poster?: string;
  aspect: string;
}

export const GALLERY_CATEGORIES: (GalleryCategory | "all")[] = [
  "all",
  "horlogerie",
  "automobile",
  "corporate",
  "architecture",
  "lifestyle",
];

export const GALLERY_ITEMS: GalleryItem[] = [
  // ===== HERO MIX =====
  {
    id: "ysc-ferrari-360-chateau",
    type: "photo",
    client: "Your Swiss Concierge",
    category: "automobile",
    year: "2025",
    src: "/portfolio/ysc-ferrari-360-chateau.jpg",
    aspect: "3/2",
  },
  {
    id: "gmt-master",
    type: "video",
    client: "Horlogerie de luxe",
    category: "horlogerie",
    year: "2025",
    src: "/portfolio/gmt-master.mp4",
    poster: "/portfolio/gmt-master.jpg",
    aspect: "9/16",
  },
  {
    id: "seaoak-facade",
    type: "photo",
    client: "Sea Oak",
    category: "architecture",
    year: "2024",
    src: "/portfolio/seaoak-facade.jpg",
    aspect: "3/2",
  },
  {
    id: "swisstreasures-saumon",
    type: "video",
    client: "SwissTreasures",
    category: "horlogerie",
    year: "2025",
    src: "/portfolio/swisstreasures-saumon.mp4",
    poster: "/portfolio/swisstreasures-saumon.jpg",
    aspect: "9/16",
  },

  // ===== AUTOMOBILE · YSC Ferrari =====
  {
    id: "ysc-ferrari-488-allee",
    type: "photo",
    client: "Your Swiss Concierge",
    category: "automobile",
    year: "2025",
    src: "/portfolio/ysc-ferrari-488-allee.jpg",
    aspect: "2/3",
  },
  {
    id: "ysc-ferrari-360-profil",
    type: "photo",
    client: "Your Swiss Concierge",
    category: "automobile",
    year: "2025",
    src: "/portfolio/ysc-ferrari-360-profil.jpg",
    aspect: "3/2",
  },
  {
    id: "ysc-ferrari-levier",
    type: "photo",
    client: "Your Swiss Concierge",
    category: "automobile",
    year: "2025",
    src: "/portfolio/ysc-ferrari-levier.jpg",
    aspect: "2/3",
  },
  {
    id: "ysc-ferrari-ecusson",
    type: "photo",
    client: "Your Swiss Concierge",
    category: "automobile",
    year: "2025",
    src: "/portfolio/ysc-ferrari-ecusson.jpg",
    aspect: "2/3",
  },
  {
    id: "ysc-ferrari-portrait",
    type: "photo",
    client: "Your Swiss Concierge",
    category: "automobile",
    year: "2025",
    src: "/portfolio/ysc-ferrari-portrait.jpg",
    aspect: "2/3",
  },
  {
    id: "ysc-ferrari-488-arriere",
    type: "photo",
    client: "Your Swiss Concierge",
    category: "automobile",
    year: "2025",
    src: "/portfolio/ysc-ferrari-488-arriere.jpg",
    aspect: "3/2",
  },
  {
    id: "concours-elegance",
    type: "video",
    client: "Automobile de collection",
    category: "automobile",
    year: "2024",
    src: "/portfolio/concours-elegance.mp4",
    poster: "/portfolio/concours-elegance.jpg",
    aspect: "9/16",
  },
  {
    id: "v2",
    type: "video",
    client: "Automobile de collection",
    category: "automobile",
    year: "2024",
    src: "/portfolio/v2.mp4",
    poster: "/portfolio/v2.jpg",
    aspect: "9/16",
  },

  // ===== HORLOGERIE =====
  {
    id: "pp-skeleton",
    type: "video",
    client: "Horlogerie de luxe",
    category: "horlogerie",
    year: "2025",
    src: "/portfolio/pp-skeleton.mp4",
    poster: "/portfolio/pp-skeleton.jpg",
    aspect: "9/16",
  },
  {
    id: "swisstreasures",
    type: "video",
    client: "SwissTreasures",
    category: "horlogerie",
    year: "2025",
    src: "/portfolio/swisstreasures.mp4",
    poster: "/portfolio/swisstreasures.jpg",
    aspect: "9/16",
  },

  // ===== ARCHITECTURE · Sea Oak =====
  {
    id: "seaoak-viz-horlogerie",
    type: "photo",
    client: "Sea Oak",
    category: "architecture",
    year: "2024",
    src: "/portfolio/seaoak-viz-horlogerie.jpg",
    aspect: "3/2",
  },
  {
    id: "seaoak-viz-bureau",
    type: "photo",
    client: "Sea Oak",
    category: "architecture",
    year: "2024",
    src: "/portfolio/seaoak-viz-bureau.jpg",
    aspect: "3/2",
  },
  {
    id: "seaoak-viz-medical",
    type: "photo",
    client: "Sea Oak",
    category: "architecture",
    year: "2024",
    src: "/portfolio/seaoak-viz-medical.jpg",
    aspect: "3/2",
  },
  {
    id: "seaoak-open-space",
    type: "photo",
    client: "Sea Oak",
    category: "architecture",
    year: "2024",
    src: "/portfolio/seaoak-open-space.jpg",
    aspect: "3/2",
  },
  {
    id: "seaoak-bureaux-lumiere",
    type: "photo",
    client: "Sea Oak",
    category: "architecture",
    year: "2024",
    src: "/portfolio/seaoak-bureaux-lumiere.jpg",
    aspect: "3/2",
  },
  {
    id: "seaoak-espace-detente",
    type: "photo",
    client: "Sea Oak",
    category: "architecture",
    year: "2024",
    src: "/portfolio/seaoak-espace-detente.jpg",
    aspect: "3/2",
  },
  {
    id: "seaoak-perspective",
    type: "photo",
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
    client: "Banque Migros",
    category: "corporate",
    year: "2023",
    src: "/portfolio/migros.mp4",
    poster: "/portfolio/migros.jpg",
    aspect: "16/9",
  },
  {
    id: "century-finance",
    type: "video",
    client: "Century Finance",
    category: "corporate",
    year: "2025",
    src: "/portfolio/century-finance.mp4",
    poster: "/portfolio/century-finance.jpg",
    aspect: "9/16",
  },
  {
    id: "century-360",
    type: "video",
    client: "Century Finance",
    category: "corporate",
    year: "2025",
    src: "/portfolio/century-360.mp4",
    poster: "/portfolio/century-360.jpg",
    aspect: "9/16",
  },
  {
    id: "lattaque",
    type: "video",
    client: "Institutionnel",
    category: "corporate",
    year: "2024",
    src: "/portfolio/lattaque.mp4",
    poster: "/portfolio/lattaque.jpg",
    aspect: "16/9",
  },

  // ===== LIFESTYLE =====
  {
    id: "beef",
    type: "video",
    client: "Gastronomie",
    category: "lifestyle",
    year: "2025",
    src: "/portfolio/beef.mp4",
    poster: "/portfolio/beef.jpg",
    aspect: "4/5",
  },
  {
    id: "8oak",
    type: "video",
    client: "Restaurant & événementiel",
    category: "lifestyle",
    year: "2025",
    src: "/portfolio/8oak.mp4",
    poster: "/portfolio/8oak.jpg",
    aspect: "9/16",
  },
  {
    id: "swissescape-editorial",
    type: "photo",
    client: "Swiss Escape",
    category: "lifestyle",
    year: "2025",
    src: "/portfolio/swissescape-editorial.jpg",
    aspect: "2/3",
  },
  {
    id: "swissescape-lineup",
    type: "photo",
    client: "Swiss Escape",
    category: "lifestyle",
    year: "2025",
    src: "/portfolio/swissescape-lineup.jpg",
    aspect: "2/3",
  },
  {
    id: "swissescape-groupe",
    type: "photo",
    client: "Swiss Escape",
    category: "lifestyle",
    year: "2025",
    src: "/portfolio/swissescape-groupe.jpg",
    aspect: "2/3",
  },
  {
    id: "swissescape-candid",
    type: "photo",
    client: "Swiss Escape",
    category: "lifestyle",
    year: "2025",
    src: "/portfolio/swissescape-candid.jpg",
    aspect: "2/3",
  },
  {
    id: "swissescape-portrait",
    type: "photo",
    client: "Swiss Escape",
    category: "lifestyle",
    year: "2025",
    src: "/portfolio/swissescape-portrait.jpg",
    aspect: "2/3",
  },
  {
    id: "ewa-vernissage-1",
    type: "photo",
    client: "Ewa Senczawa",
    category: "lifestyle",
    year: "2025",
    src: "/portfolio/ewa-vernissage-1.jpg",
    aspect: "2/3",
  },
  {
    id: "ewa-vernissage-3",
    type: "photo",
    client: "Ewa Senczawa",
    category: "lifestyle",
    year: "2025",
    src: "/portfolio/ewa-vernissage-3.jpg",
    aspect: "3/2",
  },
  {
    id: "ewa-vernissage-2",
    type: "photo",
    client: "Ewa Senczawa",
    category: "lifestyle",
    year: "2025",
    src: "/portfolio/ewa-vernissage-2.jpg",
    aspect: "2/3",
  },
  {
    id: "ewa-vernissage-4",
    type: "photo",
    client: "Ewa Senczawa",
    category: "lifestyle",
    year: "2025",
    src: "/portfolio/ewa-vernissage-4.jpg",
    aspect: "2/3",
  },
];
