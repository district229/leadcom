import Countdown from "@/components/Countdown";
import {
  event,
  lead,
  audience,
  statement,
  about,
  benefits,
  values,
  programme,
  programmeNote,
} from "@/lib/event";

const hasRegister = Boolean(event.registerUrl);
const mailto = event.contactEmail ? `mailto:${event.contactEmail}` : "";

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
          {/* Swap this text for the official Toastmasters logo from the brand portal.
              Keep clear space equal to the wordmark height, minimum 72 px wide. */}
          <a className="brand" href="#top" aria-label="District 229, home">
            <span className="brand-main">District 229</span>
            <span className="brand-sub">Toastmasters International</span>
          </a>
          <nav aria-label="Page sections" className="nav">
            <a href="#about">About</a>
            <a href="#advantage">The advantage</a>
            <a href="#programme">Programme</a>
            <a href="#register">Registration</a>
          </nav>
          {hasRegister && (
            <a className="btn btn-primary btn-small" href={event.registerUrl}>
              Register
            </a>
          )}
        </div>
      </header>

      <main id="main">
        {/* ---------- Hero ---------- */}
        <section className="hero" id="top">
          <div className="hero-main">
            <span className="rule" aria-hidden="true" />
            <h1 className="display">{event.name}</h1>
            <p className="tagline">{event.tagline}</p>
            <p className="lead">{lead}</p>
            <div className="invited">
              <p className="invited-label">Who should attend</p>
              <p>{audience}</p>
            </div>
            <div className="actions">
              {hasRegister && (
                <a className="btn btn-primary" href={event.registerUrl}>
                  Register now
                </a>
              )}
              <a
                className={hasRegister ? "btn btn-ghost" : "btn btn-primary"}
                href="/leadcom-2026.ics"
                download="LeadCom-2026.ics"
              >
                Add to calendar
              </a>
            </div>
          </div>

          <aside className="hero-panel" aria-label="Event details">
            <div className="panel-inner">
              <div className="panel-top">
                <p className="panel-label">Save the date</p>
                <Countdown dateISO={event.dateISO} />
              </div>
              <p className="panel-weekday">{event.weekday}</p>
              <p className="panel-date">
                <span>
                  {event.day} {event.month}
                </span>
                <span className="panel-year">{event.year}</span>
              </p>
              <dl className="panel-list">
                <div>
                  <dt>Time</dt>
                  <dd>
                    {event.timeLabel}
                    <span className="sub">{event.timeNote}</span>
                  </dd>
                </div>
                <div>
                  <dt>Venue</dt>
                  <dd>
                    {event.venue.name}
                    <a
                      className="link-light"
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
            </div>
          </aside>
        </section>

        {/* ---------- About ---------- */}
        <section className="section" id="about">
          <div className="wrap statement-grid">
            <div>
              <span className="rule" aria-hidden="true" />
              <h2 className="statement">{statement}</h2>
            </div>
            <p className="about">{about}</p>
          </div>
        </section>

        {/* ---------- Advantage ---------- */}
        <section className="section section-fair" id="advantage">
          <div className="wrap">
            <div className="section-head">
              <span className="rule" aria-hidden="true" />
              <h2>The Toastmasters advantage for your organisation</h2>
            </div>
            <ul className="adv-grid">
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
            <h2 id="values-title">The values behind every club</h2>
            <ul className="values-grid">
              {values.map((v) => (
                <li key={v.name}>
                  <h3>{v.name}</h3>
                  <p>{v.body}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ---------- Programme ---------- */}
        <section className="section" id="programme">
          <div className="wrap">
            <div className="section-head">
              <span className="rule" aria-hidden="true" />
              <h2>The morning at a glance</h2>
              <p className="section-lead">
                {event.timeLabel}, {event.timeNote.toLowerCase()}. {programmeNote}
              </p>
            </div>
            <ol className="agenda">
              {programme.map((p) => (
                <li key={p.title}>
                  <h3>{p.title}</h3>
                  <p>{p.body}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* ---------- Registration (always visible) ---------- */}
        <section className="section section-fair" id="register">
          <div className="wrap register-grid">
            <div>
              <span className="rule" aria-hidden="true" />
              <h2>Registration</h2>
              <p className="section-lead">
                We would be honoured to host you on {event.day} {event.month}.
              </p>
            </div>

            <div className="register-card">
              {hasRegister ? (
                <>
                  <h3>Reserve your seat</h3>
                  <p>
                    Let us know you are coming so we can plan seating and lunch.
                  </p>
                  <div className="actions">
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
                  <div className="actions">
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
        <div className="wrap footer-grid">
          <div>
            <p className="footer-brand">District 229</p>
            <p className="footer-sub">Toastmasters International</p>
            <p className="footer-host">
              {event.name} is hosted by {event.host}.
            </p>
          </div>
          <div>
            <p className="fine">
              Toastmasters International® and all other Toastmasters
              International trademarks and copyrights are the sole property of
              Toastmasters International.
            </p>
          </div>
        </div>
      </footer>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
}
