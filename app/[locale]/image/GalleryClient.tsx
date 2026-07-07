"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  GALLERY_ITEMS,
  GALLERY_CATEGORIES,
  type GalleryCategory,
  type GalleryItem,
} from "@/lib/gallery";

type Filter = GalleryCategory | "all";

const ASPECT_CLASS: Record<GalleryItem["aspect"], string> = {
  wide: "col-span-12 sm:col-span-8 aspect-[16/10]",
  tall: "col-span-12 sm:col-span-4 aspect-[3/4]",
  square: "col-span-12 sm:col-span-4 aspect-square",
};

export default function GalleryClient() {
  const [filter, setFilter] = useState<Filter>("all");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const items = useMemo(
    () =>
      filter === "all"
        ? GALLERY_ITEMS
        : GALLERY_ITEMS.filter((i) => i.category === filter),
    [filter]
  );

  const openItem = lightboxIndex !== null ? items[lightboxIndex] : null;

  const close = useCallback(() => setLightboxIndex(null), []);
  const prev = useCallback(() => {
    setLightboxIndex((i) =>
      i === null ? null : (i - 1 + items.length) % items.length
    );
  }, [items.length]);
  const next = useCallback(() => {
    setLightboxIndex((i) => (i === null ? null : (i + 1) % items.length));
  }, [items.length]);

  // Keyboard navigation in lightbox
  useEffect(() => {
    if (lightboxIndex === null) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightboxIndex, close, prev, next]);

  // Lock body scroll while lightbox is open
  useEffect(() => {
    if (lightboxIndex !== null) {
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = "";
      };
    }
  }, [lightboxIndex]);

  return (
    <section className="px-6 lg:px-10 py-12 lg:py-16">
      <div className="mx-auto max-w-[1400px]">
        {/* Filter pills · sticky under header for friendly navigation */}
        <div className="sticky top-16 lg:top-20 z-30 -mx-2 px-2 py-3 mb-8">
          <div className="glass rounded-full inline-flex flex-wrap items-center gap-1 p-1.5">
            {GALLERY_CATEGORIES.map((cat) => {
              const active = filter === cat.id;
              const count =
                cat.id === "all"
                  ? GALLERY_ITEMS.length
                  : GALLERY_ITEMS.filter((i) => i.category === cat.id).length;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => {
                    setFilter(cat.id as Filter);
                    setLightboxIndex(null);
                  }}
                  className={[
                    "px-4 py-2 rounded-full text-[0.875rem] font-medium transition-colors flex items-center gap-2",
                    active
                      ? "bg-[var(--accent)] text-[var(--accent-ink)]"
                      : "text-[var(--text-dim)] hover:text-[var(--text)]",
                  ].join(" ")}
                >
                  {cat.label}
                  <span
                    className={[
                      "font-mono text-[0.6875rem]",
                      active
                        ? "text-[var(--accent-ink)]/70"
                        : "text-[var(--text-faint)]",
                    ].join(" ")}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Bento grid */}
        <motion.div layout className="grid grid-cols-12 gap-4 lg:gap-5">
          <AnimatePresence mode="popLayout">
            {items.map((item, index) => (
              <motion.button
                key={item.id}
                layout
                type="button"
                onClick={() => setLightboxIndex(index)}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className={[
                  "group relative overflow-hidden rounded-lg text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]",
                  ASPECT_CLASS[item.aspect],
                ].join(" ")}
                style={
                  item.src
                    ? undefined
                    : { background: item.gradient }
                }
                aria-label={`${item.title} · ${item.client}`}
              >
                {item.src && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={item.src}
                    alt={`${item.title} · ${item.client}`}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    loading="lazy"
                  />
                )}

                {/* Caption overlay */}
                <div className="absolute inset-x-0 bottom-0 p-5 lg:p-6 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="font-mono text-[0.6875rem] uppercase tracking-wider text-white/70 mb-1">
                    {item.client} · {item.year}
                  </div>
                  <div className="text-[1rem] font-medium text-white tracking-tight">
                    {item.title}
                  </div>
                </div>

                {/* Corner zoom hint */}
                <span className="absolute top-4 right-4 w-8 h-8 rounded-full glass-subtle flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-white">
                  <ZoomIcon />
                </span>
              </motion.button>
            ))}
          </AnimatePresence>
        </motion.div>

        {items.length === 0 && (
          <p className="text-center text-[var(--text-dim)] py-20">
            Aucun élément dans cette catégorie pour le moment.
          </p>
        )}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {openItem && (
          <motion.div
            key="lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[80] flex items-center justify-center p-4 lg:p-10"
            onClick={close}
          >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/70 backdrop-blur-md" />

            {/* Content */}
            <motion.div
              key={openItem.id}
              initial={{ opacity: 0, scale: 0.97, filter: "blur(8px)" }}
              animate={{
                opacity: 1,
                scale: 1,
                filter: "blur(0px)",
                transitionEnd: { filter: "none" },
              }}
              exit={{ opacity: 0, scale: 0.97, filter: "blur(8px)" }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="relative w-full max-w-[1100px] max-h-[85vh] flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Visual */}
              <div
                className="relative w-full flex-1 min-h-[50vh] rounded-lg overflow-hidden"
                style={openItem.src ? undefined : { background: openItem.gradient }}
              >
                {openItem.src && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={openItem.src}
                    alt={`${openItem.title} · ${openItem.client}`}
                    className="absolute inset-0 w-full h-full object-contain"
                  />
                )}
              </div>

              {/* Caption bar */}
              <div className="glass rounded-lg mt-3 px-5 py-4 flex items-center justify-between gap-4">
                <div className="min-w-0">
                  <div className="font-mono text-[0.6875rem] uppercase tracking-wider text-[var(--text-dim)]">
                    {openItem.client} · {openItem.year}
                  </div>
                  <div className="text-[1rem] font-medium tracking-tight text-[var(--text)] truncate">
                    {openItem.title}
                  </div>
                  {openItem.description && (
                    <p className="mt-1 text-[0.8125rem] text-[var(--text-dim)] leading-relaxed line-clamp-2">
                      {openItem.description}
                    </p>
                  )}
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <span className="font-mono text-[0.6875rem] text-[var(--text-faint)] tabular-nums mr-1">
                    {(lightboxIndex ?? 0) + 1} / {items.length}
                  </span>
                  <NavButton onClick={prev} label="Précédente">
                    <ArrowLeftIcon />
                  </NavButton>
                  <NavButton onClick={next} label="Suivante">
                    <ArrowRightIcon />
                  </NavButton>
                  <NavButton onClick={close} label="Fermer">
                    <CloseIcon />
                  </NavButton>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

function NavButton({
  onClick,
  label,
  children,
}: {
  onClick: () => void;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className="w-9 h-9 rounded-full glass-subtle flex items-center justify-center text-[var(--text)] hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors"
    >
      {children}
    </button>
  );
}

function ZoomIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="7" />
      <path d="M21 21l-4.35-4.35M11 8v6M8 11h6" />
    </svg>
  );
}

function ArrowLeftIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M19 12H5M12 19l-7-7 7-7" />
    </svg>
  );
}

function ArrowRightIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14M12 5l7 7-7 7" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <path d="M5 5l14 14M19 5L5 19" />
    </svg>
  );
}
