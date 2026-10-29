// ---------------------------------------------------------------------------
// PASTE YOUR GOOGLE APPS SCRIPT WEB APP URL HERE (the one ending in /exec).
// The registration form sends its data straight to it from the visitor's browser.
// ---------------------------------------------------------------------------
export const APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbyddR1TwoxeLvKUgAEjlgF4-L80CXjDFfC4Avik6khX5uPvfwshhhE-bnIiWRKX3_ohQA/exec";

export const DUPLICATE_MESSAGE =
  "This email address is already registered for LeadCom 2026. Please check your inbox, including spam, for your confirmation.";
export const UNAVAILABLE_MESSAGE =
  "Registration is not available right now. Please try again in a few minutes.";
export const UNCONFIRMED_MESSAGE =
  "We could not confirm your registration. If you receive a confirmation email, you are registered. If not, please try again: the same email address cannot be registered twice.";

// Rules shared by the form, so every field is checked the same way.

export type RegistrationInput = {
  name: string;
  email: string;
  phone: string;
  org: string;
  designation: string;
  followUp: boolean;
  comments: string;
};

export type FieldErrors = Partial<Record<keyof RegistrationInput, string>>;

export const COMMENTS_MAX = 1000;

const CONTROL = /[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g;

const line = (v: unknown) =>
  typeof v === "string" ? v.replace(CONTROL, "").replace(/\s+/g, " ").trim() : "";

export function clean(raw: Record<string, unknown>): RegistrationInput {
  const comments =
    typeof raw.comments === "string"
      ? raw.comments.replace(CONTROL, "").replace(/\r\n?/g, "\n").trim()
      : "";
  return {
    name: line(raw.name),
    email: line(raw.email).toLowerCase(),
    phone: line(raw.phone),
    org: line(raw.org),
    designation: line(raw.designation),
    followUp: raw.followUp === true,
    comments,
  };
}

export function validate(v: RegistrationInput): FieldErrors {
  const e: FieldErrors = {};

  if (v.name.length < 2) e.name = "Enter your full name.";
  else if (v.name.length > 80) e.name = "Keep your name under 80 characters.";

  if (!v.email) e.email = "Enter your email address.";
  else if (v.email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.email))
    e.email = "Enter a valid email address, for example name@company.com.";

  const digits = v.phone.replace(/\D/g, "");
  if (!v.phone) e.phone = "Enter your mobile number.";
  else if (!/^\+?[\d\s\-()]+$/.test(v.phone) || digits.length < 8 || digits.length > 15)
    e.phone = "Enter a valid mobile number, for example +91 98765 43210.";

  if (v.org.length < 2) e.org = "Enter your organisation name.";
  else if (v.org.length > 120) e.org = "Keep the organisation name under 120 characters.";

  if (v.designation.length < 2) e.designation = "Enter your designation.";
  else if (v.designation.length > 100)
    e.designation = "Keep the designation under 100 characters.";

  if (v.comments.length > COMMENTS_MAX)
    e.comments = `Keep your comments under ${COMMENTS_MAX} characters.`;

  return e;
}
