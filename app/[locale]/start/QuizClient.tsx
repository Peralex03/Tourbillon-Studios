"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
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

export default function QuizClient({ locale }: { locale: string }) {
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
          source: "quiz",
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
      // Clear local storage on success
      try {
        localStorage.removeItem(STORAGE_KEY);
      } catch {}
    } catch (err) {
      console.error(err);
      setErrorMsg("network");
      setStatus("error");
    }
  }

  // Keyboard nav — 1..4 for choices, Esc for back
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
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
    <div className="min-h-[100svh] flex flex-col bg-[var(--bg)]">
      {/* Top bar — progress + close */}
      <div className="px-6 lg:px-10 py-6 lg:py-8 flex items-center gap-6 sticky top-0 bg-[var(--bg)]/90 backdrop-blur-md z-10">
        {/* Back */}
        <button
          onClick={goBack}
          disabled={history.length === 0}
          className="font-mono text-[0.6875rem] uppercase tracking-wider text-[var(--text-dim)] hover:text-[var(--text)] disabled:opacity-30 transition-colors flex items-center gap-2"
          aria-label="Précédente"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          <span className="hidden sm:inline">Précédente</span>
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

        {/* Close */}
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
      </div>

      {/* Question canvas */}
      <div className="flex-1 flex items-center px-6 lg:px-10 py-12 lg:py-16">
        <div className="mx-auto max-w-[1400px] w-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentId}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -24 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
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
        <div className="px-6 lg:px-10 pb-8 text-center font-mono text-[0.6875rem] uppercase tracking-wider text-[var(--text-faint)]">
          Astuce — appuyez sur 1, 2, 3 ou 4
        </div>
      )}
    </div>
  );
}

/* ============================================
   CHOICE STEP
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
      {/* Eyebrow + Question */}
      <div className="col-span-12 lg:col-span-5">
        <div className="font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-[var(--accent)] mb-4">
          {String(visibleIndex + 1).padStart(2, "0")} / {String(total).padStart(2, "0")} — {step.eyebrow}
        </div>
        <h1 className="font-serif text-[clamp(2.5rem,6vw,5rem)] font-light leading-[1.02] tracking-tight text-[var(--text)]">
          {step.question}
        </h1>
        {step.subtitle && (
          <p className="mt-6 text-[1rem] text-[var(--text-dim)] max-w-md">
            {step.subtitle}
          </p>
        )}
      </div>

      {/* Choices grid */}
      <div className="col-span-12 lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-3 lg:gap-4">
        {step.choices.map((choice, i) => (
          <motion.button
            key={choice.id}
            type="button"
            onClick={() => onPick(choice.id, choice.label, choice.next)}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.15 + i * 0.06 }}
            whileHover={{ y: -2 }}
            className="group relative text-left p-6 lg:p-8 border border-[var(--stroke)] bg-[var(--surface-1)] hover:border-[var(--accent)] hover:bg-[var(--accent)] hover:text-[var(--accent-ink)] transition-colors min-h-[140px] lg:min-h-[180px] flex flex-col justify-between focus:outline-none focus-visible:border-[var(--accent)]"
          >
            <span className="font-mono text-[0.6875rem] uppercase tracking-wider text-[var(--text-faint)] group-hover:text-[var(--accent-ink)]/60 transition-colors">
              {String(i + 1).padStart(2, "0")}
            </span>
            <div>
              <div className="font-serif text-[1.5rem] lg:text-[2rem] font-light tracking-tight leading-[1.05] text-[var(--text)] group-hover:text-[var(--accent-ink)] transition-colors">
                {choice.label}
              </div>
              {choice.hint && (
                <div className="mt-2 text-[0.875rem] text-[var(--text-dim)] group-hover:text-[var(--accent-ink)]/70 transition-colors">
                  {choice.hint}
                </div>
              )}
            </div>
            <span className="absolute bottom-5 right-5 w-9 h-9 rounded-full border border-[var(--stroke-strong)] group-hover:border-[var(--accent-ink)] flex items-center justify-center opacity-60 group-hover:opacity-100 transition-all">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M7 17L17 7M9 7h8v8" />
              </svg>
            </span>
          </motion.button>
        ))}
      </div>
    </div>
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
  onSubmit: (data: { name: string; email: string; message?: string; company?: string }) => void;
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
          {String(visibleIndex + 1).padStart(2, "0")} / {String(total).padStart(2, "0")} — Vous trouver
        </div>
        <h1 className="font-serif text-[clamp(2.5rem,6vw,5rem)] font-light leading-[1.02] tracking-tight text-[var(--text)]">
          On vous écrit où ?
        </h1>
        <p className="mt-6 text-[1rem] text-[var(--text-dim)] max-w-md">
          Réponse sous 24h ouvrées. Rien d'autre.
        </p>

        {/* Mini recap of choices so far */}
        <div className="mt-12 hidden lg:block space-y-3">
          <div className="font-mono text-[0.6875rem] uppercase tracking-wider text-[var(--text-faint)] mb-2">
            Votre projet jusqu'ici
          </div>
          {answers.projectType && <RecapLine label="Projet" value={answers.projectType} />}
          {answers.scale && <RecapLine label="Échelle" value={answers.scale} />}
          {answers.complexity && <RecapLine label="Complexité" value={answers.complexity} />}
          {answers.speed && <RecapLine label="Délai" value={answers.speed} />}
          {answers.plan && <RecapLine label="Plan" value={answers.plan} />}
          {answers.size && <RecapLine label="Équipe" value={answers.size} />}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="col-span-12 lg:col-span-7 space-y-6">
        <QuizField id="name" label="Votre nom" required>
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

        <QuizField id="email" label="Email" required>
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

        <QuizField id="message" label="Quelque chose à ajouter ?">
          <textarea
            id="message"
            name="message"
            rows={3}
            placeholder="Contexte, URL existante, contraintes…"
            className="quiz-input resize-none"
          />
        </QuizField>

        <div className="flex items-center justify-between gap-4 pt-4">
          <button
            type="submit"
            disabled={sending}
            className="inline-flex items-center gap-3 px-7 py-4 rounded-full bg-[var(--accent)] text-[var(--accent-ink)] text-[0.95rem] font-medium hover:bg-[var(--accent-hover)] transition-colors disabled:opacity-60"
          >
            {sending ? "Envoi…" : "Envoyer mon projet"}
            {!sending && (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
            padding: 0.75rem 0;
            color: var(--text);
            font-size: 1.125rem;
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
    <div className="flex items-baseline gap-3 text-[0.875rem]">
      <span className="font-mono text-[0.6875rem] uppercase tracking-wider text-[var(--text-faint)] w-20 shrink-0">
        {label}
      </span>
      <span className="text-[var(--text)]">{value}</span>
    </div>
  );
}

/* ============================================
   SUMMARY STEP — after submit
   ============================================ */
function SummaryStep({ answers }: { answers: QuizAnswers }) {
  return (
    <div className="text-center max-w-[900px] mx-auto py-8">
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 18, delay: 0.1 }}
        className="w-20 h-20 mx-auto mb-10 rounded-full bg-[var(--accent)] text-[var(--accent-ink)] flex items-center justify-center"
      >
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20 6L9 17l-5-5" />
        </svg>
      </motion.div>

      <div className="font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-[var(--accent)] mb-5">
        Bien reçu
      </div>

      <h1 className="font-serif text-[clamp(2.75rem,7vw,5.5rem)] font-light leading-[1.02] tracking-tight">
        On vous écrit dans les <span className="italic text-[var(--accent)]">24 heures</span>.
      </h1>

      <p className="mt-10 text-[1.0625rem] text-[var(--text-dim)] max-w-xl mx-auto leading-relaxed">
        {answers.name ? `Merci ${answers.name.split(" ")[0]}. ` : ""}
        Votre projet est sur notre table. Le récap est parti directement sur notre Telegram interne, on regarde et on revient vers vous avec un plan d'attaque concret.
      </p>

      <div className="mt-12 flex flex-wrap items-center justify-center gap-3">
        <Link
          href="/work"
          className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full border border-[var(--stroke-strong)] text-[var(--text)] hover:border-[var(--text)] transition-colors text-[0.95rem]"
        >
          Voir nos projets
        </Link>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-[var(--accent)] text-[var(--accent-ink)] hover:bg-[var(--accent-hover)] transition-colors text-[0.95rem] font-medium"
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
