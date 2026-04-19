"use client";

import { motion } from "framer-motion";

export default function Hero() {
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
          <span className="inline-block text-sm font-medium text-violet-600 bg-violet-50 border border-violet-200/60 px-4 py-1.5 rounded-full mb-8">
            Agence de création digitale · Suisse
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.25, 0.4, 0.25, 1] }}
          className="text-5xl md:text-7xl font-bold tracking-tight text-gray-900 leading-[1.05] mb-6"
        >
          Votre présence digitale,{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-indigo-500">
            sans compromis.
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.25, 0.4, 0.25, 1] }}
          className="text-lg md:text-xl text-gray-500 max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          Nous concevons des sites vitrines, web apps et e-commerces qui captivent
          et convertissent — complété par des shootings photo professionnels.
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
            Voir nos services
          </a>
          <a
            href="#contact"
            className="w-full sm:w-auto text-center font-medium text-gray-700 bg-white/80 backdrop-blur border border-gray-200 px-7 py-3.5 rounded-xl hover:border-violet-300 hover:text-violet-600 transition-all duration-200"
          >
            Prendre contact →
          </a>
        </motion.div>
      </div>
    </section>
  );
}
