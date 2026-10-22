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
          background: "#ffffff",
          borderLeft: "28px solid #004165",
          padding: "64px 72px",
          fontFamily: "Montserrat",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 40, fontWeight: 500, color: "#772432" }}>
            Toastmasters District 229 invites HR leaders to
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              marginTop: 8,
              fontSize: 168,
              fontWeight: 700,
              lineHeight: 0.95,
              letterSpacing: -6,
            }}
          >
            <span style={{ color: "#004165" }}>LeadCom</span>
            <span style={{ color: "#772432" }}>2026</span>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            fontSize: 34,
            fontWeight: 500,
            color: "#004165",
            borderTop: "3px solid #A9B2B1",
            paddingTop: 24,
          }}
        >
          <div>14 November 2026, 9:30 a.m. – 1:00 p.m., followed by lunch</div>
          <div style={{ marginTop: 6, color: "#772432" }}>
            The Westin Chennai Velachery
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
