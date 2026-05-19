"use client";

import { useState } from "react";

interface Labels {
  name: string;
  namePlaceholder: string;
  email: string;
  emailPlaceholder: string;
  company: string;
  companyPlaceholder: string;
  projectType: string;
  projectTypeOptions: {
    vitrine: string;
    ecommerce: string;
    webapp: string;
    refonte: string;
    other: string;
  };
  budget: string;
  budgetOptions: {
    starter: string;
    pro: string;
    custom: string;
    explore: string;
  };
  deadline: string;
  deadlineOptions: {
    asap: string;
    month: string;
    quarter: string;
    flexible: string;
  };
  message: string;
  messagePlaceholder: string;
  submit: string;
  submitSending: string;
  responseTime: string;
  successTitle: string;
  successText: string;
}

export default function ContactForm({ labels }: { labels: Labels }) {
  const [sending, setSending] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSending(true);
    // Placeholder — replace with API call when backend exists
    await new Promise((r) => setTimeout(r, 800));
    setSubmitted(true);
    setSending(false);
  }

  if (submitted) {
    return (
      <div className="p-12 lg:p-16 border border-[var(--stroke)] rounded-sm bg-[var(--surface-1)] flex flex-col items-start gap-6">
        <div className="w-14 h-14 flex items-center justify-center rounded-full bg-[var(--accent)] text-[var(--accent-ink)]">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 6L9 17l-5-5" />
          </svg>
        </div>
        <h2 className="font-serif text-h2 font-normal tracking-tight">{labels.successTitle}</h2>
        <p className="text-[var(--text-dim)] text-[1rem] leading-relaxed max-w-xl">
          {labels.successText}
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-7">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
        <Field id="name" label={labels.name} required>
          <input
            type="text"
            id="name"
            name="name"
            placeholder={labels.namePlaceholder}
            required
            className="form-input"
          />
        </Field>
        <Field id="email" label={labels.email} required>
          <input
            type="email"
            id="email"
            name="email"
            placeholder={labels.emailPlaceholder}
            required
            className="form-input"
          />
        </Field>
      </div>

      <Field id="company" label={labels.company}>
        <input
          type="text"
          id="company"
          name="company"
          placeholder={labels.companyPlaceholder}
          className="form-input"
        />
      </Field>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
        <Field id="projectType" label={labels.projectType}>
          <select id="projectType" name="projectType" className="form-input">
            <option value="vitrine">{labels.projectTypeOptions.vitrine}</option>
            <option value="ecommerce">{labels.projectTypeOptions.ecommerce}</option>
            <option value="webapp">{labels.projectTypeOptions.webapp}</option>
            <option value="refonte">{labels.projectTypeOptions.refonte}</option>
            <option value="other">{labels.projectTypeOptions.other}</option>
          </select>
        </Field>
        <Field id="budget" label={labels.budget}>
          <select id="budget" name="budget" className="form-input" defaultValue="pro">
            <option value="starter">{labels.budgetOptions.starter}</option>
            <option value="pro">{labels.budgetOptions.pro}</option>
            <option value="custom">{labels.budgetOptions.custom}</option>
            <option value="explore">{labels.budgetOptions.explore}</option>
          </select>
        </Field>
        <Field id="deadline" label={labels.deadline}>
          <select id="deadline" name="deadline" className="form-input" defaultValue="month">
            <option value="asap">{labels.deadlineOptions.asap}</option>
            <option value="month">{labels.deadlineOptions.month}</option>
            <option value="quarter">{labels.deadlineOptions.quarter}</option>
            <option value="flexible">{labels.deadlineOptions.flexible}</option>
          </select>
        </Field>
      </div>

      <Field id="message" label={labels.message} required>
        <textarea
          id="message"
          name="message"
          rows={6}
          placeholder={labels.messagePlaceholder}
          required
          className="form-input resize-y"
        />
      </Field>

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-4">
        <button
          type="submit"
          disabled={sending}
          className="inline-flex items-center gap-3 px-7 py-3.5 rounded-full bg-[var(--accent)] text-[var(--accent-ink)] text-[0.95rem] font-medium hover:bg-[var(--accent-hover)] transition-colors disabled:opacity-60"
        >
          {sending ? labels.submitSending : labels.submit}
          {!sending && (
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M7 17L17 7M9 7h8v8" />
            </svg>
          )}
        </button>
        <span className="font-mono text-[0.6875rem] uppercase tracking-wider text-[var(--text-faint)]">
          {labels.responseTime}
        </span>
      </div>

      <style>{`
        .form-input {
          width: 100%;
          background: transparent;
          border: 0;
          border-bottom: 1px solid var(--stroke);
          padding: 0.75rem 0;
          color: var(--text);
          font-size: 1rem;
          transition: border-color 0.2s;
          outline: none;
          appearance: none;
        }
        .form-input:focus {
          border-color: var(--accent);
        }
        .form-input::placeholder {
          color: var(--text-faint);
        }
        select.form-input {
          padding-right: 1.5rem;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%23A1A1AA' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: right 0.25rem center;
        }
      `}</style>
    </form>
  );
}

function Field({
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
    <div className="flex flex-col gap-1">
      <label
        htmlFor={id}
        className="font-mono text-[0.6875rem] uppercase tracking-wider text-[var(--text-dim)]"
      >
        {label}
        {required && <span className="text-[var(--accent)]">*</span>}
      </label>
      {children}
    </div>
  );
}
