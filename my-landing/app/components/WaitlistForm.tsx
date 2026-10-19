"use client";

import { useEffect, useRef, useState } from "react";
import { siteConfig } from "@/site.config";
import type { Dictionary, Locale } from "@/locales";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

type Status = "idle" | "submitting" | "success" | "error";
type Errors = Partial<Record<"name" | "email", string>>;
type FormCopy = Dictionary["form"];

function validate(data: FormData, t: FormCopy): Errors {
  const errors: Errors = {};
  const email = String(data.get("email") ?? "").trim();
  if (!String(data.get("name") ?? "").trim()) errors.name = t.errors.name;
  if (!email) errors.email = t.errors.emailMissing;
  else if (!EMAIL_RE.test(email)) errors.email = t.errors.emailInvalid;
  return errors;
}

const fieldClass =
  "mt-2 block w-full rounded-xl border border-black/15 bg-white px-4 py-3 text-base text-ink placeholder:text-muted/70 transition-colors focus:border-brand focus-visible:outline-brand aria-[invalid=true]:border-berry";

export function WaitlistForm({ t, locale }: { t: FormCopy; locale: Locale }) {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Errors>({});
  const [firstName, setFirstName] = useState("");
  const successRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (status === "success") successRef.current?.focus();
  }, [status]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const found = validate(data, t);
    setErrors(found);
    const firstInvalid = Object.keys(found)[0];
    if (firstInvalid) {
      form.querySelector<HTMLElement>(`[name="${firstInvalid}"]`)?.focus();
      return;
    }

    if (!siteConfig.waitlistEndpoint) {
      console.warn("Waitlist endpoint is not set. Add it in site.config.ts.");
      setStatus("error");
      return;
    }

    setStatus("submitting");
    try {
      const res = await fetch(siteConfig.waitlistEndpoint, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: data,
      });
      if (!res.ok) throw new Error(`Status ${res.status}`);
      setFirstName(String(data.get("name")).trim().split(/\s+/)[0]);
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div
        ref={successRef}
        tabIndex={-1}
        role="status"
        className="rounded-2xl bg-mist p-8 text-center"
      >
        <p className="text-4xl" aria-hidden="true">
          ✓
        </p>
        <h3 className="mt-3 text-2xl font-extrabold text-brand">
          {t.successTitle.replace("{name}", firstName)}
        </h3>
        <p className="mt-3 text-muted">{t.successBody}</p>
      </div>
    );
  }

  const describe = (field: keyof Errors) =>
    errors[field] ? { "aria-invalid": true, "aria-describedby": `${field}-error` } : {};

  const errorText = (field: keyof Errors) =>
    errors[field] ? (
      <p id={`${field}-error`} className="mt-1.5 text-sm font-semibold text-berry">
        {errors[field]}
      </p>
    ) : null;

  return (
    <form onSubmit={handleSubmit} noValidate className="grid gap-5">
      {/* Honeypot: hidden from people, catches bots (Formspree convention) */}
      <input type="text" name="_gotcha" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
      {/* Lets you see which language each sign-up came from in the Formspree export */}
      <input type="hidden" name="language" value={locale} />

      <div>
        <label htmlFor="name" className="text-sm font-bold">
          {t.name}
        </label>
        <input id="name" name="name" type="text" autoComplete="name" placeholder={t.namePlaceholder} className={fieldClass} {...describe("name")} />
        {errorText("name")}
      </div>

      <div>
        <label htmlFor="email" className="text-sm font-bold">
          {t.email}
        </label>
        <input
          id="email"
          name="email"
          type="email"
          inputMode="email"
          autoComplete="email"
          dir="ltr"
          placeholder={t.emailPlaceholder}
          className={`${fieldClass} text-start rtl:text-end`}
          {...describe("email")}
        />
        {errorText("email")}
      </div>

      <button
        type="submit"
        disabled={status === "submitting"}
        className="mt-1 rounded-full bg-brand px-6 py-4 text-base font-extrabold text-white shadow-lg shadow-brand/25 transition hover:bg-brand-light disabled:cursor-wait disabled:opacity-70"
      >
        {status === "submitting" ? t.submitting : t.submit}
      </button>

      <p aria-live="polite" className="text-center text-sm font-semibold text-berry">
        {status === "error" && t.failure}
      </p>
    </form>
  );
}
