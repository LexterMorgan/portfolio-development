"use client";

import { useEffect, useRef } from "react";
import styles from "./ScrollTypography.module.css";

type ScrollTypographyProps = {
  lines: string[];
};

/**
 * Low-contrast editorial background type between sections.
 * Subtle scroll drift; static under prefers-reduced-motion.
 */
export function ScrollTypography({ lines }: ScrollTypographyProps) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (motion.matches) return;

    let frame = 0;
    const update = () => {
      const rect = node.getBoundingClientRect();
      const view = window.innerHeight || 1;
      const progress = (view - rect.top) / (view + rect.height);
      const clamped = Math.max(0, Math.min(1, progress));
      node.style.setProperty("--drift", `${(clamped - 0.5) * 48}px`);
      frame = 0;
    };

    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div className={styles.root} ref={ref} aria-hidden>
      <div className={styles.inner}>
        {lines.map((line) => (
          <p key={line} className={styles.line}>
            {line}
          </p>
        ))}
      </div>
    </div>
  );
}
