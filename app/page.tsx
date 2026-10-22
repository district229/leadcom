import type { CSSProperties, ReactNode } from "react";
import Countdown from "@/components/Countdown";
import ImageSlot from "@/components/ImageSlot";
import {
  event,
  kicker,
  lead,
  audience,
  about,
  splits,
  promise,
  values,
  programme,
  programmeNote,
} from "@/lib/event";

const hasRegister = Boolean(event.registerUrl);
const mailto = event.contactEmail ? `mailto:${event.contactEmail}` : "";

// Small helpers for the animation system (see globals.css)
const delay = (s: number) => ({ "--d": `${s}s` }) as CSSProperties;
const idx = (i: number) => ({ "--i": i }) as CSSProperties;

function Icon({ name }: { name: "calendar" | "clock" | "pin" | "people" | "mic" }) {
  const paths: Record<string, ReactNode> = {
    calendar: (
      <>
        <rect x="4" y="7" width="40" height="36" rx="3" />
        <path d="M4 19h40M15 3v8M33 3v8" />
      </>
    ),
    clock: (
      <>
        <circle cx="24" cy="24" r="20" />
        <path d="M24 12v13l8 5" />
      </>
    ),
    pin: (
      <>
        <path d="M24 44s13-11.5 13-22a13 13 0 1 0-26 0c0 10.5 13 22 13 22z" />
        <circle cx="24" cy="22" r="4.5" />
      </>
    ),
    people: (
      <>
        <circle cx="17" cy="16" r="6.5" />
        <path d="M5 40c0-7.5 5.5-12 12-12s12 4.5 12 12" />
        <circle cx="34" cy="18" r="5" />
        <path d="M32 29c6.5-.8 11 3 11 10" />
      </>
    ),
    mic: (
      <>
        <rect x="18" y="5" width="12" height="22" rx="6" />
        <path d="M12 22c0 7.5 5.5 12 12 12s12-4.5 12-12M24 34v9M16 43h16" />
      </>
    ),
  };
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {paths[name]}
    </svg>
  );
}

function Letters({ text, start }: { text: string; start: number }) {
  return (
    <span className="word" aria-hidden="true">
      {[...text].map((c, i) => (
        <span key={i} style={idx(start + i)}>
          {c}
        </span>
      ))}
    </span>
  );
}

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Event",
  name: event.name,
  startDate: event.startISO,
  endDate: event.endISO,
  eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
  eventStatus: "https://schema.org/EventScheduled",
  location: {
    "@type": "Place",
    name: event.venue.name,
    address: { "@type": "PostalAddress", addressLocality: event.venue.city },
  },
  organizer: { "@type": "Organization", name: event.host },
  description: lead,
};

export default function Page() {
  const [first, second] = event.name.split(" ");

  return (
    <>
      <a className="skip" href="#main">
        Skip to content
      </a>

      <header className="site-header">
        <div className="wrap header-row">
          {/* Swap this text for the official Toastmasters logo from the brand portal.
              Keep clear space equal to the wordmark height, minimum 72 px wide. */}
          <a
              className="brand"
              href="#top"
              aria-label="Toastmasters International, District 229 home"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
                className="brand-logo"
                src="/images/ToastmastersWordmarkColor.jpg"
                alt="Toastmasters International"
            />
            <span className="brand-district">District 229</span>
          </a>
          <nav aria-label="Page sections" className="nav">
            <a href="#about">About</a>
            <a href="#advantage">The advantage</a>
            <a href="#programme">Programme</a>
            <a href="#register">Registration</a>
          </nav>
          {hasRegister && (
            <a className="btn btn-header" href={event.registerUrl}>
              Register
            </a>
          )}
        </div>
      </header>

      <main id="main">
        {/* ---------- Hero: the stage ---------- */}
        <section className="hero" id="top">
          <div className="stage" aria-hidden="true">
            <i className="beam beam-1" />
            <i className="beam beam-2" />
          </div>

          <div className="wrap hero-inner">
            <p className="kicker">{kicker}</p>
            <h1 className="display" aria-label={event.name}>
              <Letters text={first} start={0} />
              <Letters text={second} start={first.length} />
            </h1>
            <p className="tagline">{event.tagline}</p>

            <ul className="hero-meta">
              <li>
                <Icon name="calendar" />
                {event.weekday}, {event.day} {event.month} {event.year}
              </li>
              <li>
                <Icon name="clock" />
                {event.timeLabel}, {event.timeNote.toLowerCase()}
              </li>
              <li>
                <Icon name="pin" />
                {event.venue.name}
              </li>
            </ul>

            <div className="actions actions-center">
              {hasRegister ? (
                <>
                  <a className="btn btn-light" href={event.registerUrl}>
                    Register now
                  </a>
                  <a className="btn btn-outline-light" href="#programme">
                    View the programme
                  </a>
                </>
              ) : (
                <>
                  <a
                    className="btn btn-light"
                    href="/leadcom-2026.ics"
                    download="LeadCom-2026.ics"
                  >
                    Add to calendar
                  </a>
                  <a className="btn btn-outline-light" href="#programme">
                    View the programme
                  </a>
                </>
              )}
            </div>

            <Countdown startISO={event.startISO} />
          </div>

          <a className="scroll-cue" href="#about" aria-label="Scroll to About">
            <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M6 9l6 6 6-6" />
            </svg>
          </a>
        </section>

        {/* ---------- About ---------- */}
        <section className="section" id="about">
          <div className="wrap">
            <div className="center narrow">
              <span className="rule rule-center" aria-hidden="true" data-reveal />
              <h2 data-reveal style={delay(0.05)}>
                About {event.name}
              </h2>
              <p className="sub" data-reveal style={delay(0.12)}>
                {lead}
              </p>
            </div>

            <ul className="about-cols">
              <li data-reveal style={delay(0.05)}>
                <span className="ring">
                  <Icon name="people" />
                </span>
                <h3>Who it is for</h3>
                <p>{audience}</p>
              </li>
              <li data-reveal style={delay(0.18)}>
                <span className="ring">
                  <Icon name="mic" />
                </span>
                <h3>What to expect</h3>
                <p>{about}</p>
              </li>
              <li data-reveal style={delay(0.31)}>
                <span className="ring">
                  <Icon name="pin" />
                </span>
                <h3>Where and when</h3>
                <p>
                  {event.weekday}, {event.day} {event.month} {event.year},{" "}
                  {event.timeLabel}, at {event.venue.name}.{" "}
                  <a
                    className="text-link"
                    href={event.venue.mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Get directions
                  </a>
                </p>
              </li>
            </ul>
          </div>
        </section>

        {/* ---------- Image and text sections ---------- */}
        <div id="advantage">
          {splits.map((s, i) => (
            <section
              key={s.title}
              className={`split tone-${s.tone} ${i % 2 === 1 ? "flip" : ""}`}
            >
              <div className={`split-panel ${i % 2 === 1 ? "right" : "left"}`}>
                <div className="split-body">
                  <h2 data-reveal>{s.title}</h2>
                  <p className="panel-lead" data-reveal style={delay(0.08)}>
                    {s.lead}
                  </p>
                  <ul className="points">
                    {s.points.map((p, j) => (
                      <li key={p.title} data-reveal style={delay(0.16 + j * 0.12)}>
                        <h3>{p.title}</h3>
                        <p>{p.body}</p>
                      </li>
                    ))}
                  </ul>
                  <div data-reveal style={delay(0.4)}>
                    <a className="btn btn-outline-light" href={s.cta.href}>
                      {s.cta.label}
                    </a>
                  </div>
                </div>
              </div>
              <ImageSlot n={s.image.n} alt={s.image.alt} />
            </section>
          ))}
        </div>

        {/* ---------- Promise and values ---------- */}
        <section className="values" aria-labelledby="promise">
          <div className="wrap">
            <p className="promise-label" data-reveal>
              Our promise
            </p>
            <h2 id="promise" className="promise" data-reveal style={delay(0.08)}>
              {promise}
            </h2>
            <ul className="values-grid">
              {values.map((v, i) => (
                <li key={v.name} data-reveal style={delay(0.1 + i * 0.12)}>
                  <h3>{v.name}</h3>
                  <p>{v.body}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ---------- Programme ---------- */}
        <section className="section" id="programme">
          <div className="wrap programme-grid">
            <div className="programme-head">
              <span className="rule" aria-hidden="true" data-reveal />
              <h2 data-reveal style={delay(0.05)}>
                The morning at a glance
              </h2>
              <p className="sub" data-reveal style={delay(0.12)}>
                {event.timeLabel}, {event.timeNote.toLowerCase()}.{" "}
                {programmeNote}
              </p>
            </div>
            <ol className="agenda" data-reveal="line">
              {programme.map((p, i) => (
                <li key={p.title} data-reveal style={delay(0.12 + i * 0.1)}>
                  <h3>{p.title}</h3>
                  <p>{p.body}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* ---------- Registration (always visible) ---------- */}
        <section className="section section-fair" id="register">
          <div className="wrap narrow center">
            <span className="rule rule-center" aria-hidden="true" data-reveal />
            <h2 data-reveal style={delay(0.05)}>
              Registration
            </h2>
            <p className="sub" data-reveal style={delay(0.12)}>
              We would be honoured to host you on {event.day} {event.month}.
            </p>

            <div className="register-card" data-reveal style={delay(0.2)}>
              {hasRegister ? (
                <>
                  <h3>Reserve your seat</h3>
                  <p>
                    Let us know you are coming so we can plan seating and lunch.
                  </p>
                  <div className="actions actions-center">
                    <a className="btn btn-primary" href={event.registerUrl}>
                      Register now
                    </a>
                    <a
                      className="btn btn-ghost"
                      href="/leadcom-2026.ics"
                      download="LeadCom-2026.ics"
                    >
                      Add to calendar
                    </a>
                  </div>
                </>
              ) : (
                <>
                  <h3>Registration opens soon</h3>
                  <p>
                    More details will be released soon. Save the date in your
                    calendar and we will share the registration link with you.
                  </p>
                  <div className="actions actions-center">
                    <a
                      className="btn btn-primary"
                      href="/leadcom-2026.ics"
                      download="LeadCom-2026.ics"
                    >
                      Add to calendar
                    </a>
                  </div>
                </>
              )}
              {event.contactEmail && (
                <p className="card-contact">
                  Questions? Write to{" "}
                  <a href={mailto}>{event.contactEmail}</a>
                </p>
              )}
              <dl className="card-facts">
                <div>
                  <dt>Date</dt>
                  <dd>
                    {event.weekday}, {event.day} {event.month} {event.year}
                  </dd>
                </div>
                <div>
                  <dt>Time</dt>
                  <dd>
                    {event.timeLabel}, {event.timeNote.toLowerCase()}
                  </dd>
                </div>
                <div>
                  <dt>Venue</dt>
                  <dd>{event.venue.name}</dd>
                </div>
              </dl>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="wrap footer-inner">
          <p className="footer-brand">District 229</p>
          <p className="footer-sub">Toastmasters International</p>
          <nav aria-label="Footer" className="footer-nav">
            <a href="#about">About</a>
            <a href="#advantage">The advantage</a>
            <a href="#programme">Programme</a>
            <a href="#register">Registration</a>
          </nav>
          <p className="footer-host">
            {event.name} is hosted by {event.host}.
          </p>
          <p className="fine">
            Toastmasters International® and all other Toastmasters
            International trademarks and copyrights are the sole property of
            Toastmasters International.
          </p>
        </div>
      </footer>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
}
