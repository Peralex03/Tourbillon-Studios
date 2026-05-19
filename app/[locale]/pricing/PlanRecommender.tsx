"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "@/i18n/navigation";

type ProjectType = "vitrine" | "ecommerce" | "webapp";
type Scope = "small" | "medium" | "large";

interface Recommendation {
  plan: "starter" | "pro" | "custom";
  rationale: string;
}

function recommend(projectType: ProjectType, scope: Scope): Recommendation {
  if (projectType === "webapp") {
    return {
      plan: "custom",
      rationale:
        "Une application web sur mesure nécessite des fonctionnalités spécifiques (authentification, intégrations, base de données) que seule la formule Custom couvre.",
    };
  }
  if (projectType === "ecommerce") {
    if (scope === "small") {
      return {
        plan: "pro",
        rationale:
          "Une boutique avec un petit catalogue tient confortablement dans la formule Pro, qui inclut e-commerce de base, multilingue et SEO local.",
      };
    }
    return {
      plan: "custom",
      rationale:
        "Pour un e-commerce avec un catalogue conséquent, la formule Custom apporte la base de données managée, les intégrations API et le support prioritaire.",
    };
  }
  // vitrine
  if (scope === "small") {
    return {
      plan: "starter",
      rationale:
        "Pour un site vitrine simple jusqu'à 5 pages, la formule Starter couvre l'essentiel : livraison rapide, hébergement, SEO de base.",
    };
  }
  if (scope === "medium") {
    return {
      plan: "pro",
      rationale:
        "Pour un site vitrine étoffé avec blog, multilingue et SEO/GEO avancé, la formule Pro est la solution la plus adaptée.",
    };
  }
  return {
    plan: "custom",
    rationale:
      "Pour un site vitrine avec plus de 15 pages ou des besoins spécifiques, la formule Custom offre la flexibilité nécessaire.",
  };
}

const PLAN_LABELS = {
  starter: "Starter · 290 CHF/mois",
  pro: "Pro · 590 CHF/mois",
  custom: "Custom · dès 1 490 CHF/mois",
};

export default function PlanRecommender() {
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

  return (
    <div className="glass rounded-lg p-7 lg:p-10">
      <div className="font-mono text-[0.6875rem] uppercase tracking-wider text-[var(--accent)] mb-2">
        Trouver la formule
      </div>
      <h3 className="text-[1.375rem] lg:text-[1.625rem] font-medium tracking-tight mb-7">
        Quelle formule vous correspond ?
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
              1 · Quel type de projet ?
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <Option
                label="Site vitrine"
                hint="Présenter votre activité"
                onClick={() => {
                  setProjectType("vitrine");
                  setStep("scope");
                }}
              />
              <Option
                label="E-commerce"
                hint="Vendre en ligne"
                onClick={() => {
                  setProjectType("ecommerce");
                  setStep("scope");
                }}
              />
              <Option
                label="Application web"
                hint="Plateforme sur mesure"
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
              2 · Quelle envergure ?
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <Option
                label="Compact"
                hint={
                  projectType === "ecommerce"
                    ? "Moins de 50 produits"
                    : "Jusqu'à 5 pages"
                }
                onClick={() => {
                  setScope("small");
                  setStep("result");
                }}
              />
              <Option
                label="Standard"
                hint={
                  projectType === "ecommerce"
                    ? "50 à 500 produits"
                    : "Jusqu'à 15 pages"
                }
                onClick={() => {
                  setScope("medium");
                  setStep("result");
                }}
              />
              <Option
                label="Étendu"
                hint={
                  projectType === "ecommerce"
                    ? "Plus de 500 produits"
                    : "Plus de 15 pages"
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
              ← Recommencer
            </button>
          </motion.div>
        )}

        {step === "result" && recommendation && (
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
              Recommandation
            </p>
            <div className="flex items-baseline gap-3 mb-4">
              <span className="text-[1.5rem] lg:text-[1.75rem] font-medium tracking-tight text-[var(--accent)]">
                Formule {PLAN_LABELS[recommendation.plan]}
              </span>
            </div>
            <p className="text-[var(--text-dim)] text-[0.9375rem] leading-relaxed mb-6 max-w-xl">
              {recommendation.rationale}
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <Link
                href={`/start?plan=${recommendation.plan}`}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[var(--accent)] text-[var(--accent-ink)] text-[0.9375rem] font-medium hover:bg-[var(--accent-hover)] transition-colors"
              >
                Démarrer avec cette formule
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M7 17L17 7M9 7h8v8" />
                </svg>
              </Link>
              <button
                type="button"
                onClick={reset}
                className="font-mono text-[0.6875rem] uppercase tracking-wider text-[var(--text-dim)] hover:text-[var(--text)] transition-colors"
              >
                ← Recommencer
              </button>
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
