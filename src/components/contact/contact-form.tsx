"use client";

import { useActionState, useEffect, useRef } from "react";
import { useFormStatus } from "react-dom";
import { useTranslations } from "next-intl";
import { sendContactEmail, type ContactFormState } from "@/app/actions/send-contact-email";

const initialState: ContactFormState = { status: "idle" };

function SubmitButton() {
  const { pending } = useFormStatus();
  const t = useTranslations("Contact.form");

  return (
    <button
      type="submit"
      disabled={pending}
      className="group relative inline-flex w-full items-center justify-center gap-2 overflow-hidden rounded-md border border-lime-500/40 bg-lime-400 px-6 py-3 font-mono text-sm font-medium text-black transition-all hover:bg-lime-300 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
    >
      {pending ? (
        <>
          <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-black/30 border-t-black" />
          {t("sending")}
        </>
      ) : (
        <>
          {t("submit")}
          <span className="transition-transform group-hover:translate-x-0.5">→</span>
        </>
      )}
    </button>
  );
}

export function ContactForm() {
  const t = useTranslations("Contact.form");
  const [state, formAction] = useActionState(sendContactEmail, initialState);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.status === "success") {
      formRef.current?.reset();
    }
  }, [state.status]);

  return (
    <form ref={formRef} action={formAction} className="flex flex-col gap-5">
      {/* Honeypot - invisible pour les humains, piège pour les bots */}
      <div className="absolute -left-[9999px]" aria-hidden="true">
        <label htmlFor="company">Company</label>
        <input
          type="text"
          id="company"
          name="company"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label={t("name")} htmlFor="name">
          <input
            id="name"
            name="name"
            type="text"
            required
            minLength={2}
            maxLength={100}
            placeholder={t("namePlaceholder")}
            className={inputClass}
          />
        </Field>

        <Field label={t("email")} htmlFor="email">
          <input
            id="email"
            name="email"
            type="email"
            required
            placeholder={t("emailPlaceholder")}
            className={inputClass}
          />
        </Field>
      </div>

      <Field label={t("subject")} htmlFor="subject">
        <input
          id="subject"
          name="subject"
          type="text"
          required
          minLength={2}
          maxLength={150}
          placeholder={t("subjectPlaceholder")}
          className={inputClass}
        />
      </Field>

      <Field label={t("message")} htmlFor="message">
        <textarea
          id="message"
          name="message"
          required
          minLength={10}
          maxLength={3000}
          rows={6}
          placeholder={t("messagePlaceholder")}
          className={`${inputClass} resize-none`}
        />
      </Field>

      <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:items-center">
        <SubmitButton />

        <div aria-live="polite" className="font-mono text-sm">
          {state.status === "success" && (
            <span className="flex items-center gap-2 text-lime-500 dark:text-lime-400">
              <span className="h-1.5 w-1.5 rounded-full bg-lime-500 dark:bg-lime-400" />
              {t("success")}
            </span>
          )}
          {state.status === "error" && (
            <span className="flex items-center gap-2 text-red-500">
              <span className="h-1.5 w-1.5 rounded-full bg-red-500" />
              {t("error")}
            </span>
          )}
        </div>
      </div>
    </form>
  );
}

const inputClass =
  "w-full rounded-md border border-black/10 bg-black/[0.02] px-4 py-2.5 font-sans text-sm text-neutral-900 placeholder:text-neutral-400 outline-none transition-colors focus:border-lime-500/60 focus:bg-transparent focus:ring-2 focus:ring-lime-500/20 dark:border-white/10 dark:bg-white/[0.03] dark:text-neutral-100 dark:placeholder:text-neutral-500 dark:focus:border-lime-400/60 dark:focus:ring-lime-400/15";

function Field({
  label,
  htmlFor,
  children,
}: {
  label: string;
  htmlFor: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label
        htmlFor={htmlFor}
        className="font-mono text-xs uppercase tracking-wide text-neutral-500 dark:text-neutral-400"
      >
        {label}
      </label>
      {children}
    </div>
  );
}