"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

function SwissCross() {
  return (
    <svg viewBox="0 0 16 16" className="w-4 h-4 shrink-0" aria-hidden="true">
      <rect width="16" height="16" rx="2.5" fill="#FF0000" />
      <rect x="6.5" y="2.5" width="3" height="11" fill="white" />
      <rect x="2.5" y="6.5" width="11" height="3" fill="white" />
    </svg>
  );
}

export default function Hero() {
  const t = useTranslations("hero");

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-white px-6">
      {/* Mesh gradient blobs */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] rounded-full bg-violet-200/40 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] rounded-full bg-indigo-200/30 blur-[100px]" />
        <div className="absolute top-[40%] left-[50%] -translate-x-1/2 w-[400px] h-[400px] rounded-full bg-purple-100/40 blur-[80px]" />
      </div>

      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.25, 0.4, 0.25, 1] }}
        >
          <span className="inline-flex items-center gap-2 text-sm font-medium text-gray-700 bg-white/80 backdrop-blur border border-gray-200/80 px-4 py-1.5 rounded-full mb-8 shadow-sm">
            <SwissCross />
            {t("badge")}
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.25, 0.4, 0.25, 1] }}
          className="text-5xl md:text-7xl font-bold tracking-tight text-gray-900 leading-[1.05] mb-6"
        >
          {t("headline1")}{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-indigo-500">
            {t("headline2")}
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.25, 0.4, 0.25, 1] }}
          className="text-lg md:text-xl text-gray-500 max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          {t("subtitle")}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3, ease: [0.25, 0.4, 0.25, 1] }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href="#services"
            className="w-full sm:w-auto text-center font-medium bg-gray-900 text-white px-7 py-3.5 rounded-xl hover:bg-violet-600 transition-colors duration-200 shadow-lg shadow-gray-900/10"
          >
            {t("cta1")}
          </a>
          <a
            href="#contact"
            className="w-full sm:w-auto text-center font-medium text-gray-700 bg-white/80 backdrop-blur border border-gray-200 px-7 py-3.5 rounded-xl hover:border-violet-300 hover:text-violet-600 transition-all duration-200"
          >
            {t("cta2")}
          </a>
        </motion.div>
      </div>
    </section>
  );
}
