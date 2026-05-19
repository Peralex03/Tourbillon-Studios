"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

type ProjectType = "vitrine" | "ecommerce" | "webapp";
type Scope = "small" | "medium" | "large";

type RationaleKey =
  | "rationaleWebapp"
  | "rationaleEcommerceSmall"
  | "rationaleEcommerceLarge"
  | "rationaleVitrineSmall"
  | "rationaleVitrineMedium"
  | "rationaleVitrineLarge";

interface Recommendation {
  plan: "starter" | "pro" | "custom";
  rationaleKey: RationaleKey;
}

function recommend(projectType: ProjectType, scope: Scope): Recommendation {
  if (projectType === "webapp") {
    return { plan: "custom", rationaleKey: "rationaleWebapp" };
  }
  if (projectType === "ecommerce") {
    if (scope === "small") {
      return { plan: "pro", rationaleKey: "rationaleEcommerceSmall" };
    }
    return { plan: "custom", rationaleKey: "rationaleEcommerceLarge" };
  }
  // vitrine
  if (scope === "small") {
    return { plan: "starter", rationaleKey: "rationaleVitrineSmall" };
  }
  if (scope === "medium") {
    return { plan: "pro", rationaleKey: "rationaleVitrineMedium" };
  }
  return { plan: "custom", rationaleKey: "rationaleVitrineLarge" };
}

export default function PlanRecommender() {
  const t = useTranslations("pricing.recommender");
  const tCommon = useTranslations("common");
  const [step, setStep] = useState<"type" | "scope" | "result">("type");
  const [projectType, setProjectType] = useState<ProjectType | null>(null);
  const [scope, setScope] = useState<Scope | null>(null);

  function reset() {
    setStep("type");
    setProjectType(null);
    setScope(null);
  }

  const recommendation =
    projectType && scope ? recommend(projectType, scope) : null;

  const planLabelKey: "starterLabel" | "proLabel" | "customLabel" | null = recommendation
    ? (`${recommendation.plan}Label` as "starterLabel")
    : null;

  return (
    <div className="glass rounded-lg p-7 lg:p-10">
      <div className="font-mono text-[0.6875rem] uppercase tracking-wider text-[var(--accent)] mb-2">
        {t("eyebrow")}
      </div>
      <h3 className="text-[1.375rem] lg:text-[1.625rem] font-medium tracking-tight mb-7">
        {t("title")}
      </h3>

      <AnimatePresence mode="wait">
        {step === "type" && (
          <motion.div
            key="type"
            initial={{ opacity: 0, filter: "blur(8px)" }}
            animate={{
              opacity: 1,
              filter: "blur(0px)",
              transitionEnd: { filter: "none" },
            }}
            exit={{ opacity: 0, filter: "blur(8px)" }}
            transition={{ duration: 0.3 }}
          >
            <p className="text-[var(--text-dim)] text-[0.9375rem] mb-5 leading-relaxed">
              {t("step1Question")}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <Option
                label={t("projectVitrine")}
                hint={t("projectVitrineHint")}
                onClick={() => {
                  setProjectType("vitrine");
                  setStep("scope");
                }}
              />
              <Option
                label={t("projectEcommerce")}
                hint={t("projectEcommerceHint")}
                onClick={() => {
                  setProjectType("ecommerce");
                  setStep("scope");
                }}
              />
              <Option
                label={t("projectWebapp")}
                hint={t("projectWebappHint")}
                onClick={() => {
                  setProjectType("webapp");
                  setScope("medium");
                  setStep("result");
                }}
              />
            </div>
          </motion.div>
        )}

        {step === "scope" && (
          <motion.div
            key="scope"
            initial={{ opacity: 0, filter: "blur(8px)" }}
            animate={{
              opacity: 1,
              filter: "blur(0px)",
              transitionEnd: { filter: "none" },
            }}
            exit={{ opacity: 0, filter: "blur(8px)" }}
            transition={{ duration: 0.3 }}
          >
            <p className="text-[var(--text-dim)] text-[0.9375rem] mb-5 leading-relaxed">
              {t("step2Question")}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <Option
                label={t("scopeSmall")}
                hint={
                  projectType === "ecommerce"
                    ? t("scopeSmallEcommerceHint")
                    : t("scopeSmallVitrineHint")
                }
                onClick={() => {
                  setScope("small");
                  setStep("result");
                }}
              />
              <Option
                label={t("scopeMedium")}
                hint={
                  projectType === "ecommerce"
                    ? t("scopeMediumEcommerceHint")
                    : t("scopeMediumVitrineHint")
                }
                onClick={() => {
                  setScope("medium");
                  setStep("result");
                }}
              />
              <Option
                label={t("scopeLarge")}
                hint={
                  projectType === "ecommerce"
                    ? t("scopeLargeEcommerceHint")
                    : t("scopeLargeVitrineHint")
                }
                onClick={() => {
                  setScope("large");
                  setStep("result");
                }}
              />
            </div>
            <button
              type="button"
              onClick={reset}
              className="mt-5 font-mono text-[0.6875rem] uppercase tracking-wider text-[var(--text-dim)] hover:text-[var(--text)] transition-colors"
            >
              {tCommon("restart")}
            </button>
          </motion.div>
        )}

        {step === "result" && recommendation && planLabelKey && (
          <motion.div
            key="result"
            initial={{ opacity: 0, filter: "blur(8px)" }}
            animate={{
              opacity: 1,
              filter: "blur(0px)",
              transitionEnd: { filter: "none" },
            }}
            exit={{ opacity: 0, filter: "blur(8px)" }}
            transition={{ duration: 0.3 }}
          >
            <p className="text-[var(--text-dim)] text-[0.9375rem] mb-3 leading-relaxed">
              {t("recommendation")}
            </p>
            <div className="flex items-baseline gap-3 mb-4">
              <span className="text-[1.5rem] lg:text-[1.75rem] font-medium tracking-tight text-[var(--accent)]">
                {t("planPrefix")} {t(planLabelKey)}
              </span>
            </div>
            <p className="text-[var(--text-dim)] text-[0.9375rem] leading-relaxed mb-6 max-w-xl">
              {t(recommendation.rationaleKey)}
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <Link
                href={`/start?plan=${recommendation.plan}`}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[var(--accent)] text-[var(--accent-ink)] text-[0.9375rem] font-medium hover:bg-[var(--accent-hover)] transition-colors"
              >
                {t("startButton")}
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M7 17L17 7M9 7h8v8" />
                </svg>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function Option({
  label,
  hint,
  onClick,
}: {
  label: string;
  hint: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="text-left p-5 rounded-lg glass-subtle hover:border-[var(--accent)] transition-colors group"
    >
      <div className="text-[0.9375rem] font-medium tracking-tight text-[var(--text)] group-hover:text-[var(--accent)] transition-colors">
        {label}
      </div>
      <div className="text-[0.8125rem] text-[var(--text-dim)] mt-1">{hint}</div>
    </button>
  );
}
