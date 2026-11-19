// Everything you are likely to edit lives here: dates, copy, links.
// The page reads from this file, so you rarely need to touch the components.

export const event = {
  name: "LeadCom 2026",
  tagline: "Celebrate Leadership and Communication",
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
  registerUrl: process.env.NEXT_PUBLIC_REGISTER_URL ?? "/register",
  // Optional: shown in the Registration section.
  contactEmail: process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "",

  // Public address of the page (used for link previews on WhatsApp, LinkedIn, etc.)
  siteUrl:
      process.env.NEXT_PUBLIC_SITE_URL ?? "https://leadcom.district229.org",
};

export const kicker =
    "Toastmasters District 229 invites HR and Talent Leaders to";

export const lead =
    "An invitation to HR and Talent Leaders to experience how Toastmasters develops confident communicators and capable leaders, ahead of any conversation about joining.";

export const audience =
    "HR, Learning and Development, and Talent Leaders from corporates that do not yet have a Toastmasters club.";

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

// The programme, in order. "time" is shown above each title.
export const programme = [
  {
    time: "9:15 a.m.",
    title: "Registration & Networking",
    body: "Arrive, collect your badge and meet fellow guests over tea and coffee.",
  },
  {
    time: "10:00 a.m.",
    title: "Opening of the session",
    body: "A warm welcome to LeadCom 2026.",
  },
  {
    time: "10:05 a.m.",
    title: "Address by the District Director",
    body: "Vinothkumar B, DTM, District Director, Toastmasters District 229.",
  },
  {
    time: "10:15 a.m.",
    title: "Keynote",
    body: "Relevance of Communication Skills in the AI Age.",
  },
  {
    time: "10:45 a.m.",
    title: "Toastmasters Demonstration Meeting",
    body: "Prepared speeches, impromptu speeches and evaluations, performed live by members.",
  },
  {
    time: "11:20 a.m.",
    title: "Guest Speech",
    body: "Speaker to be announced.",
  },
  {
    time: "11:30 a.m.",
    title: "Panel Discussion",
    body: "The price paid by organisations for lack of effective communication.",
  },
  {
    time: "12:00 p.m.",
    title: "Recognitions and Vote of Thanks",
    body: "Closing the formal programme.",
  },
  {
    time: "12:15 p.m.",
    title: "Lunch & Networking",
    body: "Continue the conversation with members and fellow HR Leaders over lunch.",
  },
];

export const programmeNote =
    "Registration and networking open at 9:15 a.m.";

// ---------------------------------------------------------------------------
// Keynote speaker and panel. Shown in their own section after the programme.
// - Leave "name" empty and the card shows "To be announced".
// - To add a photo, put the file in public/images/speakers/ and set
//   photo: "/images/speakers/keynote.jpg". Without a photo, initials are shown.
// ---------------------------------------------------------------------------
export const keynote = {
  time: "10:15 a.m.",
  topic: "Relevance of Communication Skills in the AI Age",
  name: "", // add the keynote speaker's name here
  role: "", // e.g. "Chief Executive Officer, Company"
  photo: "",
};

export const panel = {
  time: "11:30 a.m.",
  topic: "The price paid by organisations for lack of effective communication",
  moderator: {
    name: "Thomas Abraham, DTM",
    role: "Debate Moderator",
    photo: "",
  },
  panelists: [
    {
      name: "Suganthi Periasamy, DTM",
      role: "Region 13 Director, Toastmasters International",
      photo: "",
    },
    {
      name: "Gangapriya Chakravarthy",
      role: "Country Head, Ford GBS, Chennai",
      photo: "",
    },
  ],
};