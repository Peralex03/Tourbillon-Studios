"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import {
  GALLERY_ITEMS,
  GALLERY_CATEGORIES,
  type GalleryCategory,
  type GalleryItem,
} from "@/lib/gallery";

type Filter = GalleryCategory | "all";

export default function GalleryClient() {
  const t = useTranslations("gallery");
  const [filter, setFilter] = useState<Filter>("all");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // When "all", order items grouped by category (same order as the filter pills)
  // so the flat array used for lightbox navigation matches the visual grouping.
  const items = useMemo(() => {
    if (filter !== "all") return GALLERY_ITEMS.filter((i) => i.category === filter);
    const order = GALLERY_CATEGORIES.filter((c) => c !== "all");
    return order.flatMap((cat) =>
      GALLERY_ITEMS.filter((i) => i.category === cat)
    );
  }, [filter]);

  // Section boundaries for the "all" view: [{ category, label, startIndex, items }]
  const sections = useMemo(() => {
    if (filter !== "all") return null;
    const out: {
      id: GalleryCategory;
      label: string;
      start: number;
      items: GalleryItem[];
    }[] = [];
    let idx = 0;
    for (const cat of GALLERY_CATEGORIES) {
      if (cat === "all") continue;
      const catItems = items.filter((i) => i.category === cat);
      if (catItems.length === 0) continue;
      out.push({
        id: cat as GalleryCategory,
        label: t(`categories.${cat}`),
        start: idx,
        items: catItems,
      });
      idx += catItems.length;
    }
    return out;
  }, [filter, items, t]);

  const openItem = lightboxIndex !== null ? items[lightboxIndex] : null;

  const close = useCallback(() => setLightboxIndex(null), []);
  const prev = useCallback(
    () =>
      setLightboxIndex((i) =>
        i === null ? null : (i - 1 + items.length) % items.length
      ),
    [items.length]
  );
  const next = useCallback(
    () => setLightboxIndex((i) => (i === null ? null : (i + 1) % items.length)),
    [items.length]
  );

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
        {/* Filter pills · sticky */}
        <div className="sticky top-16 lg:top-20 z-30 py-3 mb-8">
          <div className="glass rounded-full inline-flex flex-wrap items-center gap-1 p-1.5">
            {GALLERY_CATEGORIES.map((cat) => {
              const active = filter === cat;
              const count =
                cat === "all"
                  ? GALLERY_ITEMS.length
                  : GALLERY_ITEMS.filter((i) => i.category === cat).length;
              if (count === 0 && cat !== "all") return null;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => {
                    setFilter(cat as Filter);
                    setLightboxIndex(null);
                  }}
                  className={[
                    "px-4 py-2 rounded-full text-[0.875rem] font-medium transition-colors flex items-center gap-2",
                    active
                      ? "bg-[var(--accent)] text-[var(--accent-ink)]"
                      : "text-[var(--text-dim)] hover:text-[var(--text)]",
                  ].join(" ")}
                >
                  {t(`categories.${cat}`)}
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

        {/* "Tout" · compartimenté par catégorie */}
        {sections ? (
          <div className="space-y-14 lg:space-y-20">
            {sections.map((sec) => (
              <div key={sec.id}>
                <div className="flex items-baseline gap-3 mb-6">
                  <h2 className="text-h3 tracking-tight text-[var(--text)]">
                    {sec.label}
                  </h2>
                  <span className="font-mono text-[0.6875rem] text-[var(--text-faint)]">
                    {String(sec.items.length).padStart(2, "0")}
                  </span>
                  <div className="flex-1 h-px bg-[var(--stroke)]" />
                </div>
                <Masonry>
                  {sec.items.map((item, i) => (
                    <div key={item.id} className="mb-4 lg:mb-5 break-inside-avoid">
                      <Tile
                        item={item}
                        onOpen={() => setLightboxIndex(sec.start + i)}
                      />
                    </div>
                  ))}
                </Masonry>
              </div>
            ))}
          </div>
        ) : (
          <Masonry>
            <AnimatePresence mode="popLayout">
              {items.map((item, index) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.97 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  className="mb-4 lg:mb-5 break-inside-avoid"
                >
                  <Tile item={item} onOpen={() => setLightboxIndex(index)} />
                </motion.div>
              ))}
            </AnimatePresence>
          </Masonry>
        )}

        {items.length === 0 && (
          <p className="text-center text-[var(--text-dim)] py-20">
            {t("empty")}
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
            className="fixed inset-0 z-[80] flex items-center justify-center p-4 lg:p-8"
            onClick={close}
          >
            <div className="absolute inset-0 bg-black/75 backdrop-blur-md" />

            <motion.div
              key={openItem.id}
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="relative w-full max-w-[520px] flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative w-full rounded-lg overflow-hidden bg-black">
                {openItem.type === "video" ? (
                  <video
                    key={openItem.src}
                    src={openItem.src}
                    poster={openItem.poster}
                    controls
                    autoPlay
                    playsInline
                    className="w-full h-auto max-h-[72vh] object-contain"
                  />
                ) : (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={openItem.src}
                    alt={`${t(`items.${openItem.id}.title`)} · ${openItem.client}`}
                    className="w-full h-auto max-h-[72vh] object-contain"
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
                    {t(`items.${openItem.id}.title`)}
                  </div>
                  {t.has(`items.${openItem.id}.description`) && (
                    <p className="mt-1 text-[0.8125rem] text-[var(--text-dim)] leading-relaxed line-clamp-2">
                      {t(`items.${openItem.id}.description`)}
                    </p>
                  )}
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <span className="font-mono text-[0.6875rem] text-[var(--text-faint)] tabular-nums mr-1">
                    {(lightboxIndex ?? 0) + 1}/{items.length}
                  </span>
                  <NavButton onClick={prev} label={t("prev")}>
                    <ArrowLeftIcon />
                  </NavButton>
                  <NavButton onClick={next} label={t("next")}>
                    <ArrowRightIcon />
                  </NavButton>
                  <NavButton onClick={close} label={t("close")}>
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

/* ============================================
   MASONRY · responsive CSS columns wrapper
   ============================================ */
function Masonry({ children }: { children: React.ReactNode }) {
  return (
    <div className="[column-fill:_balance] columns-1 sm:columns-2 lg:columns-3 gap-4 lg:gap-5">
      {children}
    </div>
  );
}

/* ============================================
   TILE · photo or video with hover autoplay
   ============================================ */
function Tile({ item, onOpen }: { item: GalleryItem; onOpen: () => void }) {
  const t = useTranslations("gallery");
  const title = t(`items.${item.id}.title`);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [loaded, setLoaded] = useState(false);

  function onEnter() {
    const v = videoRef.current;
    if (v) {
      v.currentTime = 0;
      v.play().catch(() => {});
    }
  }
  function onLeave() {
    const v = videoRef.current;
    if (v) {
      v.pause();
    }
  }

  return (
    <button
      type="button"
      onClick={onOpen}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      className="group relative w-full overflow-hidden rounded-lg text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] bg-[var(--surface-2)]"
      style={{ aspectRatio: item.aspect.replace("/", " / ") }}
      aria-label={`${title} · ${item.client}`}
    >
      {/* Poster / image */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={item.type === "video" ? item.poster : item.src}
        alt={`${title} · ${item.client}`}
        loading="lazy"
        onLoad={() => setLoaded(true)}
        className={[
          "absolute inset-0 w-full h-full object-cover transition-opacity duration-500",
          loaded ? "opacity-100" : "opacity-0",
        ].join(" ")}
      />

      {/* Hover-preview video (muted loop) */}
      {item.type === "video" && (
        <video
          ref={videoRef}
          src={item.src}
          muted
          loop
          playsInline
          preload="none"
          className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        />
      )}

      {/* Play badge for videos */}
      {item.type === "video" && (
        <span className="absolute top-3 left-3 z-10 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full glass-subtle text-white text-[0.625rem] font-mono uppercase tracking-wider">
          <PlayIcon />
          {t("videoBadge")}
        </span>
      )}

      {/* Caption on hover */}
      <div className="absolute inset-x-0 bottom-0 z-10 p-4 lg:p-5 bg-gradient-to-t from-black/70 via-black/25 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="font-mono text-[0.625rem] uppercase tracking-wider text-white/70 mb-0.5">
          {item.client} · {item.year}
        </div>
        <div className="text-[0.9375rem] font-medium text-white tracking-tight">
          {title}
        </div>
      </div>
    </button>
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

function PlayIcon() {
  return (
    <svg width="9" height="9" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M8 5v14l11-7z" />
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
