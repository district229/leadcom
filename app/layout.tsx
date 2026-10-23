import type { Metadata, Viewport } from "next";
import "@fontsource-variable/montserrat";
import "@fontsource-variable/source-sans-3";
import "./globals.css";
import { event } from "@/lib/event";
import Effects from "@/components/Effects";

const title = `${event.name} | ${event.host}`;
const description =
  "An invitation for HR leaders to see how Toastmasters builds confident communicators and leaders at work. 5 December 2026, The Westin Chennai Velachery.";

export const metadata: Metadata = {
  metadataBase: new URL(event.siteUrl),
  title,
  description,
  openGraph: {
    title,
    description,
    url: event.siteUrl,
    siteName: event.name,
    type: "website",
    locale: "en_IN",
  },
  twitter: { card: "summary_large_image", title, description },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#004165",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en-IN" suppressHydrationWarning>
      <head>
        {/* Lets CSS hide reveal-on-scroll items only when JavaScript is running */}
        <script
          dangerouslySetInnerHTML={{
            __html: "document.documentElement.classList.add('js')",
          }}
        />
        <noscript>
          <style>{`[data-reveal]{opacity:1!important;transform:none!important}`}</style>
        </noscript>
      </head>
      <body>
        {children}
        <Effects />
      </body>
    </html>
  );
}
