/**
 * Portfolio gallery data.
 *
 * Pour ajouter du vrai contenu :
 * 1. Déposer les fichiers dans public/portfolio/ (ex. public/portfolio/ysc-home.jpg)
 * 2. Renseigner `src: "/portfolio/ysc-home.jpg"` sur l'item
 * 3. Retirer le champ `gradient` (fallback tant qu'il n'y a pas d'image)
 */

export type GalleryCategory = "web" | "ecommerce" | "branding" | "photo";

export interface GalleryItem {
  id: string;
  title: string;
  client: string;
  category: GalleryCategory;
  year: string;
  /** Chemin public vers l'image (prioritaire sur gradient) */
  src?: string;
  /** Fallback CSS gradient tant que l'image réelle n'est pas fournie */
  gradient?: string;
  /** Ratio d'aspect de la tuile dans la grille */
  aspect: "wide" | "tall" | "square";
  description?: string;
}

export const GALLERY_CATEGORIES: { id: GalleryCategory | "all"; label: string }[] = [
  { id: "all", label: "Tout" },
  { id: "web", label: "Sites web" },
  { id: "ecommerce", label: "E-commerce" },
  { id: "branding", label: "Branding" },
  { id: "photo", label: "Photographie" },
];

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: "ysc-home",
    title: "Page d'accueil",
    client: "Your Swiss Concierge",
    category: "web",
    year: "2025",
    gradient: "linear-gradient(135deg, #1A1614 0%, #2B2622 45%, #1F3A2E 100%)",
    aspect: "wide",
    description: "Refonte éditoriale complète avec système de réservation intégré.",
  },
  {
    id: "ysc-services",
    title: "Pages services",
    client: "Your Swiss Concierge",
    category: "web",
    year: "2025",
    gradient: "linear-gradient(160deg, #24312A 0%, #1A1614 60%, #2B2622 100%)",
    aspect: "tall",
    description: "Architecture de contenu orientée conversion.",
  },
  {
    id: "aspaklaria-shop",
    title: "Boutique en ligne",
    client: "Aspaklaria Collection",
    category: "ecommerce",
    year: "2024",
    gradient: "linear-gradient(135deg, #2B1518 0%, #1A1614 50%, #3A2E14 100%)",
    aspect: "square",
    description: "E-commerce headless multilingue avec paiements internationaux.",
  },
  {
    id: "aspaklaria-product",
    title: "Fiches produit",
    client: "Aspaklaria Collection",
    category: "ecommerce",
    year: "2024",
    gradient: "linear-gradient(200deg, #3A2E14 0%, #2B1518 55%, #1A1614 100%)",
    aspect: "tall",
    description: "Transitions cinématiques entre produits, grille asymétrique.",
  },
  {
    id: "latenight-hero",
    title: "Hero immersif",
    client: "Late Night Milan",
    category: "web",
    year: "2025",
    gradient: "linear-gradient(135deg, #1F1530 0%, #1A1614 50%, #3A2914 100%)",
    aspect: "wide",
    description: "Atmosphère nocturne, intégration réservation TheFork.",
  },
  {
    id: "latenight-brand",
    title: "Identité visuelle",
    client: "Late Night Milan",
    category: "branding",
    year: "2025",
    gradient: "linear-gradient(120deg, #2A1530 0%, #1F1530 40%, #1A1614 100%)",
    aspect: "square",
    description: "Direction artistique complète · logo, palette, typographie.",
  },
  {
    id: "shooting-corporate",
    title: "Shooting corporate",
    client: "Client confidentiel",
    category: "photo",
    year: "2025",
    gradient: "linear-gradient(150deg, #2B2622 0%, #463629 50%, #2B201A 100%)",
    aspect: "tall",
    description: "Portraits d'équipe et photos d'ambiance pour site vitrine.",
  },
  {
    id: "shooting-immobilier",
    title: "Reportage immobilier",
    client: "Agence lémanique",
    category: "photo",
    year: "2024",
    gradient: "linear-gradient(135deg, #1E2A32 0%, #1A1614 55%, #2B2622 100%)",
    aspect: "wide",
    description: "Visites 3D Matterport et prises de vue drone certifiées.",
  },
  {
    id: "brand-maison",
    title: "Charte graphique",
    client: "Maison Helvetia",
    category: "branding",
    year: "2024",
    gradient: "linear-gradient(160deg, #322415 0%, #2B201A 50%, #46362A 100%)",
    aspect: "square",
    description: "Système de marque complet livré en une semaine.",
  },
];
