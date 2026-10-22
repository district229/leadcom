"use client";

import { useEffect, useState } from "react";

const pad = (n: number) => String(n).padStart(2, "0");

export default function Countdown({ startISO }: { startISO: string }) {
  const [now, setNow] = useState<number | null>(null);

  useEffect(() => {
    setNow(Date.now());
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  const start = new Date(startISO).getTime();
  const diff = now === null ? null : Math.max(0, start - now);

  if (diff === 0) {
    return <p className="cd-done">The day has arrived. We look forward to seeing you.</p>;
  }

  const parts = [
    { label: "Days", value: diff === null ? "--" : String(Math.floor(diff / 86_400_000)) },
    { label: "Hours", value: diff === null ? "--" : pad(Math.floor((diff / 3_600_000) % 24)) },
    { label: "Minutes", value: diff === null ? "--" : pad(Math.floor((diff / 60_000) % 60)) },
    { label: "Seconds", value: diff === null ? "--" : pad(Math.floor((diff / 1000) % 60)) },
  ];

  return (
    <div className="countdown" role="timer" aria-label="Time until LeadCom 2026">
      {parts.map((p) => (
        <div className="cd-box" key={p.label}>
          <span className="cd-num" key={p.value}>
            {p.value}
          </span>
          <span className="cd-label">{p.label}</span>
        </div>
      ))}
    </div>
  );
}
