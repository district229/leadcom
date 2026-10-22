import Countdown from "@/components/Countdown";
import {
  event,
  audience,
  lead,
  benefits,
  values,
  programme,
} from "@/lib/event";

const hasRegister = Boolean(event.registerUrl);
const mailto = event.contactEmail
  ? `mailto:${event.contactEmail}?subject=${encodeURIComponent(
      `${event.name} registration`
    )}`
  : "";
const ctaHref = hasRegister ? event.registerUrl : mailto;

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
  return (
    <>
      <a className="skip" href="#main">
        Skip to content
      </a>

      <header className="site-header">
        <div className="wrap header-row">
          {/* Swap this text for the official Toastmasters logo from the brand portal
              once you have it. Keep clear space equal to the wordmark height. */}
          <a className="brand" href="#top" aria-label="District 229 home">
            <span className="brand-main">District 229</span>
            <span className="brand-sub">Toastmasters International</span>
          </a>
          <nav aria-label="Page sections" className="nav">
            <a href="#why">Why Toastmasters</a>
            <a href="#day">On the day</a>
            <a href="#register">Register</a>
          </nav>
          {ctaHref ? (
            <a className="btn btn-primary btn-small" href={ctaHref}>
              Reserve your seat
            </a>
          ) : (
            <a className="btn btn-primary btn-small" href="#register">
              Event details
            </a>
          )}
        </div>
      </header>

      <main id="main">
        {/* ---------- Hero ---------- */}
        <section className="hero" id="top">
          <div className="wrap hero-grid">
            <div className="hero-copy">
              <h1 className="display">
                <span className="display-name">LeadCom</span>
                <span className="display-year">2026</span>
              </h1>
              <p className="tagline">{event.tagline}</p>
              <p className="lead">{lead}</p>
              <p className="audience">
                <strong>Who it is for:</strong> {audience}
              </p>
              <div className="actions">
                {ctaHref && (
                  <a className="btn btn-primary" href={ctaHref}>
                    Reserve your seat
                  </a>
                )}
                <a
                  className="btn btn-ghost"
                  href="/leadcom-2026.ics"
                  download="LeadCom-2026.ics"
                >
                  Add to calendar
                </a>
              </div>
            </div>

            <aside className="ticket" aria-label="Event details">
              <div className="ticket-date">
                <span className="ticket-day">{event.day}</span>
                <span className="ticket-month">
                  <span className="ticket-weekday">{event.weekday}</span>
                  {event.monthYear}
                </span>
              </div>
              <Countdown dateISO={event.dateISO} />
              <dl className="ticket-list">
                <div>
                  <dt>Time</dt>
                  <dd>
                    {event.timeLabel}
                    <span className="muted">{event.timeNote}</span>
                  </dd>
                </div>
                <div>
                  <dt>Venue</dt>
                  <dd>
                    {event.venue.name}
                    <a
                      className="text-link"
                      href={event.venue.mapUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Get directions
                    </a>
                  </dd>
                </div>
                <div>
                  <dt>Hosted by</dt>
                  <dd>{event.host}</dd>
                </div>
              </dl>
            </aside>
          </div>
        </section>

        {/* ---------- Why Toastmasters ---------- */}
        <section className="section" id="why">
          <div className="wrap split">
            <div className="split-head">
              <h2>What Toastmasters gives your people</h2>
              <p className="section-lead">
                Toastmasters is a non-profit education organisation. For more
                than 100 years, members have learned to speak, listen and lead
                by doing it together, in a supportive club of peers.
              </p>
            </div>
            <ul className="rows">
              {benefits.map((b) => (
                <li key={b.title}>
                  <h3>{b.title}</h3>
                  <p>{b.body}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ---------- Values ---------- */}
        <section className="values" aria-labelledby="values-title">
          <div className="wrap">
            <h2 id="values-title" className="values-title">
              Four values guide every club
            </h2>
            <ul className="values-list">
              {values.map((v) => (
                <li key={v}>{v}</li>
              ))}
            </ul>
          </div>
        </section>

        {/* ---------- On the day ---------- */}
        <section className="section" id="day">
          <div className="wrap split split-reverse">
            <div className="split-head">
              <h2>What to expect on the day</h2>
              <p className="section-lead">
                {event.timeLabel}, {event.timeNote.toLowerCase()}. Come as you
                are, ask anything, and decide afterwards what fits your
                organisation.
              </p>
            </div>
            <ol className="timeline">
              {programme.map((p) => (
                <li key={p.title}>
                  <h3>{p.title}</h3>
                  <p>{p.body}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* ---------- Register ---------- */}
        <section className="register" id="register">
          <div className="wrap register-grid">
            <div>
              <h2>Join us on {event.day} November</h2>
              <p className="register-lead">
                Let us know you are coming so we can plan seating and lunch.
              </p>
              <div className="actions">
                {ctaHref ? (
                  <a className="btn btn-light" href={ctaHref}>
                    Reserve your seat
                  </a>
                ) : (
                  <p className="register-soon">
                    Registration details will be shared shortly.
                  </p>
                )}
                <a
                  className="btn btn-outline-light"
                  href="/leadcom-2026.ics"
                  download="LeadCom-2026.ics"
                >
                  Add to calendar
                </a>
              </div>
              {event.contactEmail && hasRegister && (
                <p className="register-contact">
                  Questions? Write to{" "}
                  <a href={mailto}>{event.contactEmail}</a>
                </p>
              )}
            </div>
            <dl className="register-facts">
              <div>
                <dt>Date</dt>
                <dd>
                  {event.weekday}, {event.day} {event.monthYear}
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
                <dd>
                  {event.venue.name}
                  <a
                    className="text-link-light"
                    href={event.venue.mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Get directions
                  </a>
                </dd>
              </div>
            </dl>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="wrap">
          <p className="footer-title">
            {event.name}, hosted by {event.host}.
          </p>
          <p className="fine">
            Toastmasters International® and all other Toastmasters International
            trademarks and copyrights are the sole property of Toastmasters
            International.
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
