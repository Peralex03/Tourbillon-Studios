"use client";

import { useEffect, useState } from "react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/70 backdrop-blur-lg border-b border-gray-200/60 shadow-sm"
          : "bg-transparent"
      }`}
    >
      <nav className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <a href="#" className="text-lg font-semibold tracking-tight text-gray-900">
          Tourbillon<span className="text-violet-600">.</span>
        </a>

        <div className="hidden md:flex items-center gap-8 text-sm text-gray-600">
          <a href="#services" className="hover:text-gray-900 transition-colors">
            Services
          </a>
          <a href="#testimonials" className="hover:text-gray-900 transition-colors">
            Témoignages
          </a>
          <a href="#contact" className="hover:text-gray-900 transition-colors">
            Contact
          </a>
        </div>

        <a
          href="#contact"
          className="text-sm font-medium bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-violet-600 transition-colors duration-200"
        >
          Démarrer un projet
        </a>
      </nav>
    </header>
  );
}
