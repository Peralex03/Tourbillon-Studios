import FeaturedTopo from "@/components/FeaturedTopo";
import GalleryClient from "./GalleryClient";

export const metadata = {
  title: "Portfolio · Tourbillon Studios",
  description:
    "Sélection de réalisations · sites web, e-commerce, branding et photographie.",
  robots: { index: false, follow: false }, // caché tant que le contenu réel n'est pas en place
};

export default function ImagePage() {
  return (
    <>
      {/* HERO */}
      <section className="relative px-6 lg:px-10 pt-32 lg:pt-36 pb-14 border-b border-[var(--stroke)] overflow-hidden">
        <FeaturedTopo opacity={0.18} />
        <div className="relative mx-auto max-w-[1400px]">
          <div className="text-eyebrow mb-6">Portfolio</div>
          <h1 className="text-h1 tracking-tight max-w-3xl">
            Une sélection de nos{" "}
            <span className="accent-serif">réalisations</span>.
          </h1>
          <p className="mt-6 text-[1rem] lg:text-[1.0625rem] text-[var(--text-dim)] max-w-2xl leading-relaxed">
            Sites web, boutiques en ligne, identités visuelles et productions
            photo. Cliquez sur une vignette pour l'agrandir.
          </p>
        </div>
      </section>

      {/* GALLERY · filters + grid + lightbox */}
      <GalleryClient />
    </>
  );
}
