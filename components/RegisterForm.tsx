"use client";

import { useEffect, useRef, useState, type ChangeEvent, type FormEvent } from "react";
import {
  clean,
  validate,
  APPS_SCRIPT_URL,
  COMMENTS_MAX,
  DUPLICATE_MESSAGE,
  UNAVAILABLE_MESSAGE,
  UNCONFIRMED_MESSAGE,
  type FieldErrors,
  type RegistrationInput,
} from "@/lib/registration";
import { event } from "@/lib/event";

type Values = Omit<RegistrationInput, "followUp"> & { followUp: boolean };

const empty: Values = {
  name: "",
  email: "",
  phone: "",
  org: "",
  designation: "",
  followUp: false,
  comments: "",
};

const ORDER: (keyof Values)[] = ["name", "email", "phone", "org", "designation", "comments"];

type Done = { id: string; email: string; emailSent: boolean };

export default function RegisterForm() {
  const [values, setValues] = useState<Values>(empty);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [formError, setFormError] = useState("");
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState<Done | null>(null);
  const [trap, setTrap] = useState("");

  const doneRef = useRef<HTMLDivElement>(null);
  const fieldRefs = useRef<Record<string, HTMLInputElement | HTMLTextAreaElement | null>>({});

  useEffect(() => {
    if (done) doneRef.current?.focus();
  }, [done]);

  function focusFirst(errs: FieldErrors) {
    const first = ORDER.find((k) => errs[k]);
    if (first) fieldRefs.current[first]?.focus();
  }

  function set<K extends keyof Values>(key: K, value: Values[K]) {
    setValues((v) => ({ ...v, [key]: value }));
    if (errors[key]) setErrors((e) => ({ ...e, [key]: undefined }));
  }

  const onText =
    (key: keyof Values) =>
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      set(key, e.target.value as never);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (busy) return;

    const v = clean(values);
    const errs = validate(v);
    setErrors(errs);
    setFormError("");
    if (Object.keys(errs).length > 0) {
      focusFirst(errs);
      return;
    }

    if (!APPS_SCRIPT_URL) {
      console.error("APPS_SCRIPT_URL is empty. Paste the web app URL into lib/registration.ts.");
      setFormError(UNAVAILABLE_MESSAGE);
      return;
    }

    setBusy(true);
    try {
      const ctrl = new AbortController();
      const timer = setTimeout(() => ctrl.abort(), 30_000);
      let data: { ok?: boolean; code?: string; id?: string; emailSent?: boolean; message?: string } | null = null;
      try {
        // No custom headers on purpose. The browser then sends a plain "simple" request
        // (text/plain), which Google Apps Script accepts from any website without a preflight.
        const res = await fetch(APPS_SCRIPT_URL, {
          method: "POST",
          body: JSON.stringify({ ...v, website: trap }),
          cache: "no-store",
          signal: ctrl.signal,
        });
        data = await res.json();
      } finally {
        clearTimeout(timer);
      }

      if (data?.ok) {
        setDone({ id: String(data.id ?? ""), email: v.email, emailSent: data.emailSent !== false });
      } else if (data?.code === "duplicate") {
        const next: FieldErrors = { email: DUPLICATE_MESSAGE };
        setErrors(next);
        focusFirst(next);
      } else if (data?.code === "invalid") {
        setFormError(data.message || "Please check your details and try again.");
      } else {
        setFormError(UNAVAILABLE_MESSAGE);
      }
    } catch {
      // The request may or may not have reached Google, so we cannot be sure either way.
      setFormError(UNCONFIRMED_MESSAGE);
    } finally {
      setBusy(false);
    }
  }

  if (done) {
    return (
      <div className="reg-done" ref={doneRef} tabIndex={-1} aria-live="polite">
        <svg className="reg-tick" viewBox="0 0 64 64" width="72" height="72" aria-hidden="true">
          <circle cx="32" cy="32" r="29" />
          <path d="M20 33l8.5 8.5L45 24" />
        </svg>
        <h2>You are registered</h2>
        <p className="reg-done-lead">
          Thank you. We look forward to welcoming you on {event.day} {event.month}.
        </p>
        <p className="reg-id-label">Your registration ID</p>
        <p className="reg-id">{done.id}</p>

        {done.emailSent ? (
          <p className="reg-done-note">
            A confirmation with your QR code is on its way to <strong>{done.email}</strong>. If you
            do not see it within a few minutes, check your spam or promotions folder. Please show the
            QR code at the registration desk.
          </p>
        ) : (
          <p className="reg-alert" role="status">
            Your registration is saved, but we could not send the confirmation email. Please note
            your registration ID above
            {event.contactEmail ? (
              <>
                {" "}
                and write to <a href={`mailto:${event.contactEmail}`}>{event.contactEmail}</a>
              </>
            ) : null}
            .
          </p>
        )}

        <div className="actions actions-center">
          <a className="btn btn-primary" href="/leadcom-2026.ics" download="LeadCom-2026.ics">
            Add to calendar
          </a>
          <a className="btn btn-ghost" href="/">
            Back to event page
          </a>
        </div>
      </div>
    );
  }

  const field = (
    key: keyof Values,
    label: string,
    props: {
      type?: string;
      autoComplete?: string;
      inputMode?: "text" | "email" | "tel";
      placeholder?: string;
    } = {}
  ) => (
    <div className="field">
      <label htmlFor={`f-${key}`}>
        {label} <span className="req" aria-hidden="true">*</span>
      </label>
      <input
        id={`f-${key}`}
        name={key}
        ref={(el) => {
          fieldRefs.current[key] = el;
        }}
        type={props.type ?? "text"}
        inputMode={props.inputMode}
        autoComplete={props.autoComplete}
        placeholder={props.placeholder}
        value={values[key] as string}
        onChange={onText(key)}
        aria-required="true"
        aria-invalid={errors[key] ? true : undefined}
        aria-describedby={errors[key] ? `e-${key}` : undefined}
        maxLength={key === "email" ? 254 : 160}
      />
      {errors[key] && (
        <p className="err" id={`e-${key}`}>
          {errors[key]}
        </p>
      )}
    </div>
  );

  return (
    <form onSubmit={onSubmit} noValidate aria-label="LeadCom 2026 registration">
      <p className="reg-required">Fields marked * are required.</p>

      <div className="reg-fields">
        <div className="span-2">{field("name", "Full name", { autoComplete: "name" })}</div>
        {field("email", "Email", {
          type: "email",
          autoComplete: "email",
          inputMode: "email",
          placeholder: "name@company.com",
        })}
        {field("phone", "Mobile number", {
          type: "tel",
          autoComplete: "tel",
          inputMode: "tel",
          placeholder: "+91 98765 43210",
        })}
        {field("org", "Organisation", { autoComplete: "organization" })}
        {field("designation", "Designation", { autoComplete: "organization-title" })}

        <div className="span-2">
          <label className="check" htmlFor="f-followUp">
            <input
              id="f-followUp"
              name="followUp"
              type="checkbox"
              checked={values.followUp}
              onChange={(e) => set("followUp", e.target.checked)}
            />
            <span>
              <strong>Yes, I am open to a follow-up conversation.</strong>
              <span className="check-sub">
                District 229 may contact me
              </span>
            </span>
          </label>
        </div>

        <div className="span-2 field">
          <label htmlFor="f-comments">Comments or questions</label>
          <textarea
            id="f-comments"
            name="comments"
            ref={(el) => {
              fieldRefs.current.comments = el;
            }}
            value={values.comments}
            onChange={onText("comments")}
            rows={4}
            aria-invalid={errors.comments ? true : undefined}
            aria-describedby={errors.comments ? "e-comments" : "h-comments"}
          />
          <p className="hint" id="h-comments">
            Optional. {values.comments.length}/{COMMENTS_MAX}
          </p>
          {errors.comments && (
            <p className="err" id="e-comments">
              {errors.comments}
            </p>
          )}
        </div>
      </div>

      {/* Honeypot: hidden from people, tempting to bots */}
      <div className="reg-trap" aria-hidden="true">
        <label htmlFor="f-website">Website</label>
        <input
          id="f-website"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={trap}
          onChange={(e) => setTrap(e.target.value)}
        />
      </div>

      {formError && (
        <p className="reg-alert" role="alert">
          {formError}
        </p>
      )}

      <button className="btn btn-primary reg-submit" type="submit" disabled={busy}>
        {busy ? (
          <>
            <span className="spin" aria-hidden="true" />
            Registering…
          </>
        ) : (
          "Complete registration"
        )}
      </button>

      <p className="reg-privacy">
        We use your details only to manage your registration for {event.name} and, if you tick the
        box above, to follow up about Toastmasters. We do not share them with anyone else.
      </p>
    </form>
  );
}
