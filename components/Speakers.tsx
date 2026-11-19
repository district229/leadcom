import type { CSSProperties } from "react";
import { keynote, panel } from "@/lib/event";
import "./speakers.css";

const delay = (s: number) => ({ "--d": `${s}s` }) as CSSProperties;

function initials(name: string) {
    return name
        .replace(/,.*$/, "")
        .replace(/^(Ms|Mr|Mrs|Dr)\.?\s+/i, "")
        .split(/\s+/)
        .filter(Boolean)
        .slice(0, 2)
        .map((w) => w[0].toUpperCase())
        .join("");
}

function Portrait({ name, photo }: { name: string; photo?: string }) {
    return (
        <span className="portrait" aria-hidden={photo ? undefined : true}>
      {photo ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={photo} alt={name} />
      ) : (
          <span>{name ? initials(name) : "?"}</span>
      )}
    </span>
    );
}

export default function Speakers() {
    const people = [...panel.panelists, panel.moderator];
    return (
        <section className="section section-fair" id="speakers">
            <div className="wrap">
                <div className="center narrow">
                    <span className="rule rule-center" aria-hidden="true" data-reveal />
                    <h2 data-reveal style={delay(0.05)}>
                        Keynote and panel
                    </h2>
                    <p className="sub" data-reveal style={delay(0.12)}>
                        Voices on why communication matters to the organisations you lead.
                    </p>
                </div>

                <div className="speakers-grid">
                    <article className="keynote-card" data-reveal style={delay(0.1)}>
                        <p className="eyebrow">Keynote · {keynote.time}</p>
                        <h3 className="keynote-topic">{keynote.topic}</h3>
                        <div className="person person-lg">
                            <Portrait name={keynote.name} photo={keynote.photo} />
                            <div>
                                <p className="person-name">
                                    {keynote.name || "Keynote speaker to be announced"}
                                </p>
                                {keynote.role && <p className="person-role">{keynote.role}</p>}
                            </div>
                        </div>
                    </article>

                    <article className="panel-card" data-reveal style={delay(0.22)}>
                        <p className="eyebrow">Panel discussion · {panel.time}</p>
                        <h3 className="panel-topic">{panel.topic}</h3>
                        <ul className="panel-people">
                            {people.map((p, i) => (
                                <li key={p.name} className="person">
                                    <Portrait name={p.name} photo={p.photo} />
                                    <div>
                                        <p className="person-name">{p.name}</p>
                                        <p className="person-role">{p.role}</p>
                                    </div>
                                    {i === people.length - 1 && (
                                        <span className="person-tag">Moderator</span>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </article>
                </div>
            </div>
        </section>
    );
}