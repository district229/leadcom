import type { Metadata } from "next";
import "./desk.css";
import DeskScanner from "@/components/DeskScanner";

// Private page for registration desk staff. It is not linked from anywhere on the site
// and is hidden from search engines.
export const metadata: Metadata = {
  title: "Check-in desk | LeadCom 2026",
  robots: { index: false, follow: false, nocache: true },
};

export default function DeskPage() {
  return <DeskScanner />;
}
