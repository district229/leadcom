// Everything you are likely to edit lives here: dates, copy, links.
// The page reads from this file, so you rarely need to touch the components.

export const event = {
  name: "LeadCom 2026",
  tagline: "Where Leaders Are Made",
  host: "Toastmasters District 229",

  // Date and time (India Standard Time)
  dateISO: "2026-11-14",
  startISO: "2026-11-14T09:30:00+05:30",
  endISO: "2026-11-14T13:00:00+05:30",
  weekday: "Saturday",
  day: "14",
  monthYear: "November 2026",
  timeLabel: "9:30 a.m. – 1:00 p.m.",
  timeNote: "Followed by lunch",

  venue: {
    name: "The Westin Chennai Velachery",
    city: "Chennai",
    mapUrl:
      "https://www.google.com/maps/search/?api=1&query=The+Westin+Chennai+Velachery",
  },

  // ---- Fill these in before you share the link ----
  // Paste a Google Form / Microsoft Forms / Luma link here, or set the
  // NEXT_PUBLIC_REGISTER_URL environment variable in Vercel.
  registerUrl: process.env.NEXT_PUBLIC_REGISTER_URL ?? "",
  // Optional: a contact address shown next to the button.
  contactEmail: process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "",

  // Public address of the page (used for link previews on WhatsApp, LinkedIn, etc.)
  siteUrl:
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://leadcom.district229.org",
};

export const audience =
  "HR heads, learning and development leaders, and people teams at corporates that do not yet have a Toastmasters club.";

export const lead =
  "A relaxed morning for HR leaders to see how Toastmasters helps people communicate with confidence and lead with purpose, before any conversation about joining.";

export const benefits = [
  {
    title: "Confident communication",
    body: "Members prepare and deliver speeches, then receive specific, kind feedback. The habit carries into client calls, reviews and town halls.",
  },
  {
    title: "Leadership by practice",
    body: "Club meetings are run by members in rotating roles. Your people chair, time, evaluate and coordinate, building leadership skills without waiting for a title.",
  },
  {
    title: "Learning that fits a working week",
    body: "Pathways, the Toastmasters learning experience, lets each member choose a path such as Dynamic Leadership, Persuasive Influence or Presentation Mastery, and learn at their own pace.",
  },
  {
    title: "A culture of useful feedback",
    body: "Toastmasters evaluations critique but never demean. Teams learn to give and receive feedback that is clear, respectful and easy to act on.",
  },
];

export const values = ["Integrity", "Respect", "Service", "Excellence"];

// Edit this list to match your final programme.
export const programme = [
  {
    title: "Welcome and introduction",
    body: "Why communication and leadership skills matter to your people, and what Toastmasters is.",
  },
  {
    title: "A Toastmasters meeting, up close",
    body: "Watch members speak, evaluate and lead in a short demonstration meeting.",
  },
  {
    title: "How a corporate club works",
    body: "Hear how a club inside a company is set up and what it takes to run one.",
  },
  {
    title: "Your questions",
    body: "An open conversation about fit, effort and next steps, with no obligation to join.",
  },
  {
    title: "Lunch and networking",
    body: "Continue the conversation with members and fellow HR leaders over lunch.",
  },
];
