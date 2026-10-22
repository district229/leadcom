import fs from "node:fs";
import path from "node:path";

const EXTS = ["jpg", "jpeg", "png", "webp", "avif"];

// Looks for public/images/leadcom-<n>.(jpg|jpeg|png|webp|avif) at build time.
// Drop the file in, push to GitHub, and it replaces the placeholder automatically.
function findImage(n: number): string | null {
  for (const ext of EXTS) {
    const file = `leadcom-${n}.${ext}`;
    if (fs.existsSync(path.join(process.cwd(), "public", "images", file))) {
      return `/images/${file}`;
    }
  }
  return null;
}

export default function ImageSlot({ n, alt }: { n: number; alt: string }) {
  const src = findImage(n);
  return (
    <div className="slot" data-reveal="host">
      <div className="slot-inner">
        {src ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={src} alt={alt} loading="lazy" decoding="async" />
        ) : (
          <div className="slot-ph">
            <svg viewBox="0 0 48 48" aria-hidden="true" width="44" height="44">
              <g fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="5" y="9" width="38" height="30" rx="3" />
                <circle cx="17" cy="21" r="4" />
                <path d="M5 35l11-9 8 6 7-6 12 9" />
              </g>
            </svg>
            <p className="slot-title">Photo {n}</p>
            <p className="slot-hint">
              Add <code>public/images/leadcom-{n}.jpg</code>
              <br />
              about 1200 × 1000 px
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
