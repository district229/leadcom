"use client";

import { useEffect, useState } from "react";

// Counts calendar days in India Standard Time, so everyone sees the same number.
export default function Countdown({ dateISO }: { dateISO: string }) {
  const [text, setText] = useState<string | null>(null);

  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-CA", { timeZone: "Asia/Kolkata" });
    const today = fmt.format(new Date());
    const diff = Math.round(
      (Date.parse(dateISO) - Date.parse(today)) / 86_400_000
    );
    if (diff > 1) setText(`${diff} days to go`);
    else if (diff === 1) setText("Tomorrow");
    else if (diff === 0) setText("Today");
    else setText(null);
  }, [dateISO]);

  return (
    <p className="countdown" aria-live="polite">
      {text}
    </p>
  );
}
