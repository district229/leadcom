import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import path from "node:path";

export const alt = "LeadCom 2026, 14 November 2026, The Westin Chennai Velachery";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

async function font(weight: 500 | 700) {
  const file = path.join(
    process.cwd(),
    "node_modules/@fontsource/montserrat/files",
    `montserrat-latin-${weight}-normal.woff`
  );
  return readFile(file);
}

export default async function Image() {
  const [bold, medium] = await Promise.all([font(700), font(500)]);
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#004165",
          padding: "72px 84px",
          fontFamily: "Montserrat",
          color: "#ffffff",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              width: 84,
              height: 5,
              background: "#ffffff",
              marginBottom: 40,
            }}
          />
          <div
            style={{
              fontSize: 156,
              fontWeight: 700,
              letterSpacing: -6,
              lineHeight: 1,
            }}
          >
            LeadCom 2026
          </div>
          <div
            style={{
              marginTop: 28,
              fontSize: 36,
              fontWeight: 500,
              color: "#A9B2B1",
            }}
          >
            An invitation to HR and talent leaders
          </div>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            fontSize: 34,
            fontWeight: 500,
            borderTop: "2px solid #A9B2B1",
            paddingTop: 28,
          }}
        >
          <div>14 November 2026 · 9:30 a.m. – 1:00 p.m., followed by lunch</div>
          <div style={{ marginTop: 6, color: "#A9B2B1" }}>
            The Westin Chennai Velachery · Toastmasters District 229
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Montserrat", data: bold, weight: 700, style: "normal" },
        { name: "Montserrat", data: medium, weight: 500, style: "normal" },
      ],
    }
  );
}
