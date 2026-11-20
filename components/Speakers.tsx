import type { CSSProperties } from "react";
// To bring the keynote back: add `keynote` to this import and remove the comment
// markers around the "Keynote" block below.
import { panel } from "@/lib/event";
import "./speakers.css";

const delay = (s: number) => ({ "--d": `${s}s` }) as CSSProperties;

function initials(name: string) {
    return name
        .replace(/,.*$/, "")
        .split(/\s+/)
        .filter(Boolean)
        .slice(0, 2)
        .map((w) => w[0].toUpperCase())
        .join("");
}

// A framed portrait. Without a photo it shows a quiet placeholder with initials.
function Portrait({ name, photo }: { name: string; photo?: string }) {
    return (
        <figure className="portrait">
            <div className="portrait-mat">
                {photo ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={photo} alt={name} loading="lazy" />
                ) : (
                    <span className="portrait-empty" aria-hidden="true">
            {name ? initials(name) : ""}
          </span>
                )}
            </div>
        </figure>
    );
}

export default function Speakers() {
    return (
        <section className="section spk-section" id="speakers">
            <div className="wrap">
                <header className="spk-head">
                    <span className="rule rule-center" aria-hidden="true" data-reveal />
                    <h2 data-reveal style={delay(0.05)}>
                        Who You Will Hear From
                    </h2>
                </header>

                {/* ---------- Keynote (hidden for now) ----------
        <article className="spk-keynote" aria-labelledby="keynote-name">
          <div className="spk-keynote-text" data-reveal style={delay(0.1)}>
            <p className="spk-label">Keynote speaker · {keynote.time}</p>
            <h3
              id="keynote-name"
              className={`spk-keynote-name ${keynote.name ? "" : "is-tba"}`}
            >
              {keynote.name || "To be announced"}
            </h3>
            {keynote.designation && (
              <p className="spk-keynote-desig">{keynote.designation}</p>
            )}
            <dl className="spk-topic-box">
              <dt>Keynote topic</dt>
              <dd>{keynote.topic}</dd>
            </dl>
          </div>
          <div className="spk-keynote-media" data-reveal style={delay(0.2)}>
            <Portrait name={keynote.name} photo={keynote.photo} />
          </div>
        </article>
        */}

                {/* ---------- Panel discussion ---------- */}
                <article className="spk-panel" aria-labelledby="panel-title">
                    <div className="spk-panel-text" data-reveal style={delay(0.1)}>
                        <p className="spk-label">Panel Discussion · {panel.time}</p>
                        <h3 id="panel-title" className="spk-panel-title">
                            {panel.topic}
                        </h3>
                    </div>
                    <ul className="spk-people">
                        {panel.people.map((p, i) => (
                            <li key={p.name} data-reveal style={delay(0.15 + i * 0.12)}>
                                <Portrait name={p.name} photo={p.photo} />
                                <div className="spk-meta">
                                    <p className="spk-part">{p.part}</p>
                                    <p className="spk-name">{p.name}</p>
                                    {p.designation && <p className="spk-desig">{p.designation}</p>}
                                </div>
                            </li>
                        ))}
                    </ul>
                </article>
            </div>
        </section>
    );
}