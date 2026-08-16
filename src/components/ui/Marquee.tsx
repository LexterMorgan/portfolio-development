"use client";

import styles from "./Marquee.module.css";

type MarqueeProps = {
  items: string[];
  separator?: string;
  /** Visual weight */
  tone?: "default" | "muted";
};

/**
 * Slow seamless horizontal text band. Decorative — aria-hidden.
 * Pauses on reduced motion via CSS.
 */
export function Marquee({
  items,
  separator = "✦",
  tone = "default",
}: MarqueeProps) {
  if (items.length === 0) return null;

  const sequence = items.join(` ${separator} `);
  const loop = `${sequence} ${separator} ${sequence} ${separator} `;

  return (
    <div
      className={[styles.root, tone === "muted" ? styles.muted : ""].join(" ")}
      aria-hidden
    >
      <div className={styles.track}>
        <span className={styles.text}>{loop}</span>
        <span className={styles.text}>{loop}</span>
      </div>
    </div>
  );
}
