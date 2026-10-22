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
  month: "November",
  year: "2026",
  timeLabel: "9:30 a.m. – 1:00 p.m.",
  timeNote: "Followed by lunch",

  venue: {
    name: "The Westin Chennai Velachery",
    city: "Chennai",
    mapUrl:
      "https://www.google.com/maps/search/?api=1&query=The+Westin+Chennai+Velachery",
  },

  // ---- Fill these in when you have them ----
  // Paste the registration link (Google Form, Microsoft Forms, Luma) here, or set
  // the NEXT_PUBLIC_REGISTER_URL environment variable in Vercel.
  // While this is empty, the Registration section shows "More details will be
  // released soon" and no register button is displayed.
  registerUrl: process.env.NEXT_PUBLIC_REGISTER_URL ?? "",
  // Optional: shown in the Registration section and the footer.
  contactEmail: process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "",

  // Public address of the page (used for link previews on WhatsApp, LinkedIn, etc.)
  siteUrl:
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://leadcom.district229.org",
};

export const lead =
  "An invitation to HR and talent leaders to experience how Toastmasters develops confident communicators and capable leaders, ahead of any conversation about joining.";

export const audience =
  "HR, learning and development, and talent leaders from corporates that do not yet have a Toastmasters club.";

export const statement =
  "Great organisations are built by people who can communicate and lead.";

export const about =
  "Toastmasters is a non-profit education organisation. For more than 100 years, members have built confidence in speaking, listening and leadership through practice, feedback and encouragement in a club of peers. LeadCom 2026 introduces that experience to HR leaders, before any conversation about what it could mean for your organisation.";

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

export const values = [
  {
    name: "Integrity",
    body: "Actions that match words, and the courage to acknowledge mistakes.",
  },
  {
    name: "Respect",
    body: "Dignity for everyone, diverse perspectives welcome, critique that never demeans.",
  },
  {
    name: "Service",
    body: "Responsive, attentive and passionate support for every member.",
  },
  {
    name: "Excellence",
    body: "Meeting and exceeding expectations, together.",
  },
];

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

export const programmeNote =
  "The full programme and speakers will be announced shortly.";
