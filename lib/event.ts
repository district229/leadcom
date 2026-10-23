// Everything you are likely to edit lives here: dates, copy, links.
// The page reads from this file, so you rarely need to touch the components.

export const event = {
  name: "LeadCom 2026",
  tagline: "Where Leaders Are Made",
  host: "Toastmasters District 229",

  // Date and time (India Standard Time)
  dateISO: "2026-12-05",
  startISO: "2026-12-05T09:30:00+05:30",
  endISO: "2026-12-05T13:00:00+05:30",
  weekday: "Saturday",
  day: "5",
  month: "December",
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
  // Optional: shown in the Registration section.
  contactEmail: process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "",

  // Public address of the page (used for link previews on WhatsApp, LinkedIn, etc.)
  siteUrl:
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://leadcom.district229.org",
};

export const kicker =
  "Toastmasters District 229 invites HR and talent leaders to";

export const lead =
  "An invitation to HR and talent leaders to experience how Toastmasters develops confident communicators and capable leaders, ahead of any conversation about joining.";

export const audience =
  "HR, learning and development, and talent leaders from corporates that do not yet have a Toastmasters club.";

export const about =
  "Toastmasters is a non-profit education organisation. For more than 100 years, members have built confidence in speaking, listening and leadership through practice, feedback and encouragement in a club of peers.";

// The two image-and-text sections. Images are added in public/images
// (see README): leadcom-1.jpg and leadcom-2.jpg.
export const splits = [
  {
    tone: "blue",
    title: "Communication that earns trust",
    lead: "Every Toastmasters meeting is a chance to speak, listen and be heard. Members grow into people who share ideas clearly and respond well to others.",
    points: [
      {
        title: "Confident communication",
        body: "Members prepare and deliver speeches, then receive specific, kind feedback. The habit carries into client calls, reviews and town halls.",
      },
      {
        title: "A culture of useful feedback",
        body: "Evaluations critique but never demean. Teams learn to give and receive feedback that is clear, respectful and easy to act on.",
      },
    ],
    cta: { label: "See the programme", href: "#programme" },
    image: {
      n: 1,
      alt: "Toastmasters members at a club meeting",
    },
  },
  {
    tone: "maroon",
    title: "Leadership built by practice",
    lead: "Leadership is learned by doing. Toastmasters gives your people real roles, real responsibility and a structured path to grow into them.",
    points: [
      {
        title: "Leadership by practice",
        body: "Club meetings are run by members in rotating roles. Your people chair, time, evaluate and coordinate, building leadership skills without waiting for a title.",
      },
      {
        title: "Learning that fits a working week",
        body: "Pathways, the Toastmasters learning experience, lets each member choose a path such as Dynamic Leadership, Persuasive Influence or Presentation Mastery, and learn at their own pace.",
      },
    ],
    cta: { label: "Plan your seat", href: "#register" },
    image: {
      n: 2,
      alt: "A Toastmasters member leading a session",
    },
  },
];

export const promise =
  "Empowering individuals through personal and professional development.";

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
