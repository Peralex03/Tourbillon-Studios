"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import FadeIn from "./FadeIn";

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const t = useTranslations("contact");

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <section id="contact" className="py-28 px-6 bg-white relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full bg-violet-100/40 blur-[120px] -z-10 pointer-events-none" />

      <div className="max-w-2xl mx-auto">
        <FadeIn className="text-center mb-12">
          <span className="text-sm font-medium text-violet-600 uppercase tracking-widest">
            {t("label")}
          </span>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900 mt-3">
            {t("heading")}
          </h2>
          <p className="text-gray-500 mt-4 text-lg">{t("subtitle")}</p>
          <a
            href="mailto:contact@tourbillonstudios.ch"
            className="inline-block mt-3 text-sm font-medium text-violet-600 hover:underline"
          >
            {t("email_display")}
          </a>
        </FadeIn>

        <FadeIn delay={0.1}>
          <div className="bg-white/60 backdrop-blur-md border border-gray-200/70 rounded-2xl p-8 shadow-xl shadow-gray-100/60">
            {submitted ? (
              <div className="text-center py-8">
                <div className="w-12 h-12 bg-violet-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-violet-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{t("successTitle")}</h3>
                <p className="text-gray-500">{t("successText")}</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-medium text-gray-700" htmlFor="name">
                      {t("name")}
                    </label>
                    <input
                      id="name" name="name" type="text" required
                      className="bg-gray-50/80 border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-300 focus:border-violet-300 transition"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-medium text-gray-700" htmlFor="email">
                      {t("email")}
                    </label>
                    <input
                      id="email" name="email" type="email" required
                      className="bg-gray-50/80 border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-300 focus:border-violet-300 transition"
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-medium text-gray-700" htmlFor="message">
                    {t("message")}
                  </label>
                  <textarea
                    id="message" name="message" required rows={5}
                    placeholder={t("messagePlaceholder")}
                    className="bg-gray-50/80 border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-300 focus:border-violet-300 transition resize-none"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full font-medium bg-gray-900 text-white py-3.5 rounded-xl hover:bg-violet-600 transition-colors duration-200 shadow-lg shadow-gray-900/10"
                >
                  {t("submit")}
                </button>
              </form>
            )}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
