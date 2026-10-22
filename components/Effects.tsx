"use client";

import { useEffect } from "react";

// Scroll reveals, header state, reading-progress bar and the hero spotlight.
export default function Effects() {
  useEffect(() => {
    const root = document.documentElement;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const targets = document.querySelectorAll<HTMLElement>("[data-reveal]");

    let io: IntersectionObserver | null = null;
    if (reduce || !("IntersectionObserver" in window)) {
      targets.forEach((el) => el.classList.add("in"));
    } else {
      io = new IntersectionObserver(
        (entries) =>
          entries.forEach((e) => {
            if (e.isIntersecting) {
              e.target.classList.add("in");
              io?.unobserve(e.target);
            }
          }),
        { threshold: 0.15, rootMargin: "0px 0px -8% 0px" }
      );
      targets.forEach((el) => io!.observe(el));
    }

    const header = document.querySelector<HTMLElement>(".site-header");
    const bar = document.querySelector<HTMLElement>(".progress");
    const onScroll = () => {
      const y = window.scrollY;
      if (header) {
        if (y > 24) header.setAttribute("data-scrolled", "");
        else header.removeAttribute("data-scrolled");
      }
      if (bar) {
        const max = root.scrollHeight - window.innerHeight;
        bar.style.transform = `scaleX(${max > 0 ? Math.min(1, y / max) : 0})`;
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    const hero = document.querySelector<HTMLElement>(".hero");
    const onMove = (e: PointerEvent) => {
      if (!hero) return;
      const r = hero.getBoundingClientRect();
      hero.style.setProperty("--mx", `${((e.clientX - r.left) / r.width) * 100}%`);
      hero.style.setProperty("--my", `${((e.clientY - r.top) / r.height) * 100}%`);
    };
    const fine = window.matchMedia("(pointer: fine)").matches;
    if (hero && fine && !reduce) hero.addEventListener("pointermove", onMove);

    return () => {
      io?.disconnect();
      window.removeEventListener("scroll", onScroll);
      hero?.removeEventListener("pointermove", onMove);
    };
  }, []);

  return <div className="progress" aria-hidden="true" />;
}
