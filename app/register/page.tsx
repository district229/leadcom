import type { Metadata } from "next";
import "./register.css";
import RegisterForm from "@/components/RegisterForm";
import { event } from "@/lib/event";

export const metadata: Metadata = {
  title: `Register | ${event.name}`,
  description: `Reserve your seat for ${event.name}, ${event.day} ${event.month} ${event.year}, ${event.venue.name}.`,
  alternates: { canonical: "/register" },
};

const steps = [
  {
    title: "Complete the form",
    body: "It takes about a minute.",
  },
  {
    title: "Check your email",
    body: "You receive a registration ID and a QR code straight away.",
  },
  {
    title: "Show the QR code",
    body: `Present it at the registration desk on ${event.day} ${event.month}.`,
  },
];

export default function RegisterPage() {
  return (
    <>
      <a className="skip" href="#form">
        Skip to the form
      </a>

      <header className="site-header">
        <div className="wrap header-row">
          <a
            className="brand"
            href="/"
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
          <nav aria-label="Page" className="nav">
            <a href="/">Back to event page</a>
          </nav>
        </div>
      </header>

      <main id="main">
        <section className="reg-hero">
          <div className="wrap">
            <a className="reg-back" href="/">
              <span aria-hidden="true">←</span> Event details
            </a>
            <h1>Reserve your seat</h1>
            <p className="reg-sub">
              {event.name}, {event.weekday} {event.day} {event.month} {event.year}. Limited seats only, Register now and Join us to Celebrate Leadership & Communication !
            </p>
          </div>
        </section>

        <section className="reg-main">
          <div className="wrap reg-grid">
            <aside className="reg-aside" aria-label="Event details">
              <h2>Event details</h2>
              <dl>
                <div>
                  <dt>Date</dt>
                  <dd>
                    {event.weekday}, {event.day} {event.month} {event.year}
                  </dd>
                </div>
                <div>
                  <dt>Time</dt>
                  <dd>
                    {event.timeLabel}
                    <span className="sub-line">{event.timeNote}</span>
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
              </dl>

              <h3 className="reg-next">What happens next</h3>
              <ol className="reg-steps">
                {steps.map((s) => (
                  <li key={s.title}>
                    <strong>{s.title}</strong>
                    <span>{s.body}</span>
                  </li>
                ))}
              </ol>
            </aside>

            <div className="reg-card" id="form">
              <RegisterForm />
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="wrap footer-inner">
          <p className="footer-brand">District 229</p>
          <p className="footer-sub">Toastmasters International</p>
          <p className="footer-host">
            {event.name} is hosted by {event.host}.
          </p>
          <p className="fine">
            Toastmasters International® and all other Toastmasters International trademarks and
            copyrights are the sole property of Toastmasters International.
          </p>
        </div>
      </footer>
    </>
  );
}
