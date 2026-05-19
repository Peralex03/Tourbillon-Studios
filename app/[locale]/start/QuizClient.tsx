"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "@/i18n/navigation";
import {
  STEPS,
  STEP_BY_ID,
  VISIBLE_STEPS_COUNT,
  LABELS,
  type StepId,
  type QuizAnswers,
} from "@/lib/quiz";

const STORAGE_KEY = "tourbillon_quiz_v1";

type Status = "idle" | "sending" | "sent" | "error";

interface Props {
  locale: string;
  /**
   * When "embed" (used on home page), the quiz hides the "Quitter" link
   * and adapts to its container height instead of taking the full viewport.
   */
  mode?: "fullscreen" | "embed";
}

export default function QuizClient({ locale, mode = "fullscreen" }: Props) {
  const isEmbed = mode === "embed";

  const [currentId, setCurrentId] = useState<StepId>("project");
  const [history, setHistory] = useState<StepId[]>([]);
  const [answers, setAnswers] = useState<QuizAnswers>({});
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Restore from localStorage on mount
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed?.answers) setAnswers(parsed.answers);
      }
    } catch {}
  }, []);

  // Persist answers on change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ answers }));
    } catch {}
  }, [answers]);

  const currentStep = STEP_BY_ID[currentId];
  const visibleIndex = useMemo(() => {
    return STEPS.filter((s) => s.id !== "summary").findIndex((s) => s.id === currentId);
  }, [currentId]);

  const goNext = useCallback(
    (next: StepId) => {
      setHistory((h) => [...h, currentId]);
      setCurrentId(next);
    },
    [currentId]
  );

  const goBack = useCallback(() => {
    if (history.length === 0) return;
    const prev = history[history.length - 1];
    setHistory((h) => h.slice(0, -1));
    setCurrentId(prev);
    setStatus("idle");
    setErrorMsg(null);
  }, [history]);

  function pickChoice(choiceId: string, label: string, next?: StepId) {
    if (!currentStep.storeAs) return;
    setAnswers((a) => ({ ...a, [currentStep.storeAs]: label }));
    void choiceId;
    if (next) goNext(next);
  }

  async function submitContact(formData: {
    name: string;
    email: string;
    message?: string;
    company?: string;
  }) {
    setStatus("sending");
    setErrorMsg(null);
    const finalAnswers = { ...answers, ...formData };
    setAnswers(finalAnswers);

    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          answers: finalAnswers,
          locale,
          source: isEmbed ? "home_quiz" : "start",
        }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setErrorMsg(data?.error || "send_failed");
        setStatus("error");
        return;
      }
      setStatus("sent");
      setHistory((h) => [...h, currentId]);
      setCurrentId("summary");
      try {
        localStorage.removeItem(STORAGE_KEY);
      } catch {}
    } catch (err) {
      console.error(err);
      setErrorMsg("network");
      setStatus("error");
    }
  }

  // Keyboard nav — only when quiz is in focus (embed: only if user has interacted)
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      // Don't hijack keys when user is typing in inputs
      const target = e.target as HTMLElement | null;
      if (target && (target.tagName === "INPUT" || target.tagName === "TEXTAREA")) return;

      if (e.key === "Escape" && history.length > 0) {
        goBack();
        return;
      }
      if (currentStep.id === "contact" || currentStep.id === "summary") return;
      const idx = parseInt(e.key, 10);
      if (idx >= 1 && idx <= currentStep.choices.length) {
        const c = currentStep.choices[idx - 1];
        pickChoice(c.id, c.label, c.next);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentStep, history.length]);

  return (
    <div
      className={[
        "flex flex-col",
        isEmbed
          ? "min-h-[calc(100svh-5rem)] pt-20 lg:pt-24"
          : "min-h-[100svh]",
      ].join(" ")}
    >
      {/* Top bar — progress + back/quit */}
      <div className="px-6 lg:px-10 py-4 lg:py-5 flex items-center gap-6">
        {/* Back */}
        <button
          onClick={goBack}
          disabled={history.length === 0}
          className="font-mono text-[0.6875rem] uppercase tracking-wider text-[var(--text-dim)] hover:text-[var(--text)] disabled:opacity-30 transition-colors flex items-center gap-2"
          aria-label="Question précédente"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          <span className="hidden sm:inline">Retour</span>
        </button>

        {/* Progress dots */}
        <div className="flex-1 flex items-center justify-center gap-2">
          {currentId !== "summary" &&
            Array.from({ length: VISIBLE_STEPS_COUNT }).map((_, i) => (
              <span
                key={i}
                className={[
                  "h-px transition-all duration-500",
                  i <= visibleIndex
                    ? "w-8 bg-[var(--accent)]"
                    : "w-5 bg-[var(--stroke)]",
                ].join(" ")}
              />
            ))}
        </div>

        {/* Quit — only in fullscreen mode */}
        {!isEmbed ? (
          <Link
            href="/"
            className="font-mono text-[0.6875rem] uppercase tracking-wider text-[var(--text-dim)] hover:text-[var(--text)] transition-colors flex items-center gap-2"
            aria-label="Quitter"
          >
            <span className="hidden sm:inline">Quitter</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M5 5l14 14M19 5L5 19" />
            </svg>
          </Link>
        ) : (
          <a
            href="#below-quiz"
            className="font-mono text-[0.6875rem] uppercase tracking-wider text-[var(--text-dim)] hover:text-[var(--text)] transition-colors flex items-center gap-2"
          >
            <span className="hidden sm:inline">Découvrir le studio</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M12 5v14M5 12l7 7 7-7" />
            </svg>
          </a>
        )}
      </div>

      {/* Question canvas */}
      <div className="flex-1 flex items-center px-6 lg:px-10 py-8 lg:py-12">
        <div className="mx-auto max-w-[1400px] w-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentId}
              initial={{ opacity: 0, filter: "blur(16px)", y: 12 }}
              animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
              exit={{ opacity: 0, filter: "blur(16px)", y: -12 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            >
              {currentStep.id !== "summary" && currentStep.id !== "contact" && (
                <ChoiceStep
                  step={currentStep}
                  visibleIndex={visibleIndex}
                  total={VISIBLE_STEPS_COUNT}
                  onPick={pickChoice}
                />
              )}

              {currentStep.id === "contact" && (
                <ContactStep
                  visibleIndex={visibleIndex}
                  total={VISIBLE_STEPS_COUNT}
                  answers={answers}
                  status={status}
                  errorMsg={errorMsg}
                  onSubmit={submitContact}
                />
              )}

              {currentStep.id === "summary" && (
                <SummaryStep answers={answers} />
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Bottom hint */}
      {currentStep.id !== "summary" && currentStep.id !== "contact" && (
        <div className="px-6 lg:px-10 pb-6 text-center font-mono text-[0.6875rem] uppercase tracking-wider text-[var(--text-faint)]">
          Astuce — utilisez les touches 1, 2, 3 ou 4 du clavier
        </div>
      )}
    </div>
  );
}

/* ============================================
   CHOICE STEP — glass cards with shine
   ============================================ */
function ChoiceStep({
  step,
  visibleIndex,
  total,
  onPick,
}: {
  step: (typeof STEPS)[number];
  visibleIndex: number;
  total: number;
  onPick: (id: string, label: string, next?: StepId) => void;
}) {
  return (
    <div className="grid grid-cols-12 gap-6 lg:gap-10 items-start">
      {/* Eyebrow + Question — left column */}
      <div className="col-span-12 lg:col-span-5">
        <div className="font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-[var(--accent)] mb-4">
          {String(visibleIndex + 1).padStart(2, "0")} / {String(total).padStart(2, "0")} — {step.eyebrow}
        </div>
        <h2 className="text-display text-[var(--text)]">
          {step.question}
        </h2>
        {step.subtitle && (
          <p className="mt-5 text-[1rem] text-[var(--text-dim)] max-w-md leading-relaxed">
            {step.subtitle}
          </p>
        )}
      </div>

      {/* Choices grid — right column, glass cards */}
      <div className="col-span-12 lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-3">
        {step.choices.map((choice, i) => (
          <GlassChoice
            key={choice.id}
            index={i}
            label={choice.label}
            hint={choice.hint}
            onClick={() => onPick(choice.id, choice.label, choice.next)}
            delay={0.1 + i * 0.05}
          />
        ))}
      </div>
    </div>
  );
}

function GlassChoice({
  index,
  label,
  hint,
  onClick,
  delay,
}: {
  index: number;
  label: string;
  hint?: string;
  onClick: () => void;
  delay: number;
}) {
  const ref = useRef<HTMLButtonElement>(null);

  function handleMove(e: React.MouseEvent<HTMLButtonElement>) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    el.style.setProperty("--shine-x", `${x}%`);
    el.style.setProperty("--shine-y", `${y}%`);
  }

  return (
    <motion.button
      ref={ref}
      type="button"
      onClick={onClick}
      onMouseMove={handleMove}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.985 }}
      className="glass glass-shine group relative text-left p-6 lg:p-7 hover:border-[var(--accent)] transition-colors min-h-[130px] flex flex-col justify-between focus:outline-none focus-visible:border-[var(--accent)] rounded-lg"
    >
      <span className="font-mono text-[0.6875rem] uppercase tracking-wider text-[var(--text-faint)]">
        {String(index + 1).padStart(2, "0")}
      </span>
      <div>
        <div className="text-[1.125rem] lg:text-[1.25rem] font-medium tracking-tight leading-snug text-[var(--text)]">
          {label}
        </div>
        {hint && (
          <div className="mt-1.5 text-[0.875rem] text-[var(--text-dim)]">
            {hint}
          </div>
        )}
      </div>
      <span className="absolute bottom-5 right-5 w-8 h-8 rounded-full glass-subtle flex items-center justify-center opacity-50 group-hover:opacity-100 group-hover:border-[var(--accent)] transition-all">
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M7 17L17 7M9 7h8v8" />
        </svg>
      </span>
    </motion.button>
  );
}

/* ============================================
   CONTACT STEP
   ============================================ */
function ContactStep({
  visibleIndex,
  total,
  answers,
  status,
  errorMsg,
  onSubmit,
}: {
  visibleIndex: number;
  total: number;
  answers: QuizAnswers;
  status: Status;
  errorMsg: string | null;
  onSubmit: (data: {
    name: string;
    email: string;
    message?: string;
    company?: string;
  }) => void;
}) {
  const sending = status === "sending";

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    onSubmit({
      name: String(data.get("name") || "").trim(),
      email: String(data.get("email") || "").trim(),
      company: String(data.get("company") || "").trim() || undefined,
      message: String(data.get("message") || "").trim() || undefined,
    });
  }

  return (
    <div className="grid grid-cols-12 gap-6 lg:gap-10 items-start">
      <div className="col-span-12 lg:col-span-5">
        <div className="font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-[var(--accent)] mb-4">
          {String(visibleIndex + 1).padStart(2, "0")} / {String(total).padStart(2, "0")} — Coordonnées
        </div>
        <h2 className="text-display text-[var(--text)]">
          Comment pouvons-nous{" "}
          <span className="accent-serif">vous joindre</span> ?
        </h2>
        <p className="mt-5 text-[1rem] text-[var(--text-dim)] max-w-md leading-relaxed">
          Réponse sous 24 heures ouvrées.
        </p>

        {/* Mini recap */}
        <div className="mt-10 hidden lg:block space-y-2.5 glass p-5 rounded-lg">
          <div className="font-mono text-[0.6875rem] uppercase tracking-wider text-[var(--text-faint)] mb-2">
            Récapitulatif
          </div>
          {answers.projectType && <RecapLine label="Projet" value={answers.projectType} />}
          {answers.scale && <RecapLine label="Catalogue" value={answers.scale} />}
          {answers.complexity && <RecapLine label="Périmètre" value={answers.complexity} />}
          {answers.speed && <RecapLine label="Délai" value={answers.speed} />}
          {answers.plan && <RecapLine label="Formule" value={answers.plan} />}
          {answers.size && <RecapLine label="Structure" value={answers.size} />}
        </div>
      </div>

      <form
        onSubmit={handleSubmit}
        className="col-span-12 lg:col-span-7 space-y-6 glass p-6 lg:p-8 rounded-lg"
      >
        <QuizField id="name" label="Nom complet" required>
          <input
            id="name"
            name="name"
            type="text"
            required
            autoComplete="name"
            placeholder="Prénom Nom"
            className="quiz-input"
            defaultValue={answers.name}
          />
        </QuizField>

        <QuizField id="email" label="Adresse email" required>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="vous@entreprise.ch"
            className="quiz-input"
            defaultValue={answers.email}
          />
        </QuizField>

        <QuizField id="company" label="Entreprise (optionnel)">
          <input
            id="company"
            name="company"
            type="text"
            autoComplete="organization"
            placeholder="Nom de votre société"
            className="quiz-input"
          />
        </QuizField>

        <QuizField id="message" label="Précisions complémentaires (optionnel)">
          <textarea
            id="message"
            name="message"
            rows={3}
            placeholder="Contexte, URL existante, contraintes particulières…"
            className="quiz-input resize-none"
          />
        </QuizField>

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-2">
          <button
            type="submit"
            disabled={sending}
            className="inline-flex items-center gap-3 px-7 py-3.5 rounded-full bg-[var(--accent)] text-[var(--accent-ink)] text-[0.9375rem] font-medium hover:bg-[var(--accent-hover)] transition-colors disabled:opacity-60"
          >
            {sending ? "Envoi en cours…" : "Transmettre ma demande"}
            {!sending && (
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M7 17L17 7M9 7h8v8" />
              </svg>
            )}
          </button>
          {errorMsg && (
            <span className="font-mono text-[0.6875rem] uppercase tracking-wider text-[var(--error)]">
              {errorMsg === "invalid_email" && "Email invalide"}
              {errorMsg === "invalid_name" && "Nom invalide"}
              {errorMsg === "server_misconfigured" && "Erreur serveur"}
              {errorMsg === "telegram_failed" && "Erreur de transmission"}
              {!["invalid_email", "invalid_name", "server_misconfigured", "telegram_failed"].includes(errorMsg) && "Erreur — réessayez"}
            </span>
          )}
        </div>

        <style>{`
          .quiz-input {
            width: 100%;
            background: transparent;
            border: 0;
            border-bottom: 1px solid var(--stroke);
            padding: 0.625rem 0;
            color: var(--text);
            font-size: 1rem;
            font-family: inherit;
            outline: none;
            transition: border-color 0.2s;
          }
          .quiz-input:focus {
            border-color: var(--accent);
          }
          .quiz-input::placeholder {
            color: var(--text-faint);
          }
        `}</style>
      </form>
    </div>
  );
}

function QuizField({
  id,
  label,
  required,
  children,
}: {
  id: string;
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className="font-mono text-[0.6875rem] uppercase tracking-wider text-[var(--text-dim)] mb-1 block"
      >
        {label}
        {required && <span className="text-[var(--accent)]"> *</span>}
      </label>
      {children}
    </div>
  );
}

function RecapLine({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-baseline gap-3 text-[0.8125rem]">
      <span className="font-mono text-[0.6875rem] uppercase tracking-wider text-[var(--text-faint)] w-20 shrink-0">
        {label}
      </span>
      <span className="text-[var(--text)]">{value}</span>
    </div>
  );
}

/* ============================================
   SUMMARY STEP
   ============================================ */
function SummaryStep({ answers }: { answers: QuizAnswers }) {
  return (
    <div className="text-center max-w-[800px] mx-auto py-8 glass p-10 lg:p-14 rounded-lg">
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 18, delay: 0.1 }}
        className="w-16 h-16 mx-auto mb-8 rounded-full bg-[var(--accent)] text-[var(--accent-ink)] flex items-center justify-center"
      >
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20 6L9 17l-5-5" />
        </svg>
      </motion.div>

      <div className="font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-[var(--accent)] mb-4">
        Demande transmise
      </div>

      <h2 className="text-display text-[var(--text)]">
        Nous vous recontactons sous{" "}
        <span className="accent-serif">24 heures</span>.
      </h2>

      <p className="mt-8 text-[1rem] text-[var(--text-dim)] max-w-lg mx-auto leading-relaxed">
        {answers.name ? `Merci ${answers.name.split(" ")[0]}. ` : ""}
        Votre demande a bien été transmise à notre équipe. Nous étudions votre projet et reviendrons vers vous sous 24 heures ouvrées.
      </p>

      <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full glass text-[var(--text)] hover:border-[var(--accent)] transition-colors text-[0.9375rem]"
        >
          Consulter notre journal
        </Link>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[var(--accent)] text-[var(--accent-ink)] hover:bg-[var(--accent-hover)] transition-colors text-[0.9375rem] font-medium"
        >
          Retour à l'accueil
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M7 17L17 7M9 7h8v8" />
          </svg>
        </Link>
      </div>
    </div>
  );
}

// Silence unused import warning — LABELS is exported for external use
void LABELS;
