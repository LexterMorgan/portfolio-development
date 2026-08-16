"use client";

import { useState } from "react";
import styles from "./TechMarquee.module.css";

export type TechMarqueeItem = {
  name: string;
  icon?: string;
};

type TechMarqueeProps = {
  items: Array<string | TechMarqueeItem>;
};

/**
 * Continuous technology band built from verified portfolio tech labels only.
 */
export function TechMarquee({ items }: TechMarqueeProps) {
  const [paused, setPaused] = useState(false);

  if (items.length === 0) return null;

  const resolved = items.map((item) =>
    typeof item === "string" ? { name: item } : item,
  );
  const chips = [...resolved, ...resolved];

  return (
    <div
      className={[styles.root, paused ? styles.paused : ""].join(" ")}
      aria-label="Technology stack"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className={styles.track}>
        {chips.map((item, index) => (
          <span key={`${item.name}-${index}`} className={styles.chip}>
            {item.icon ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={item.icon} alt="" width={16} height={16} />
            ) : (
              <span className={styles.fallback} aria-hidden>
                {item.name.slice(0, 1)}
              </span>
            )}
            {item.name}
          </span>
        ))}
      </div>
    </div>
  );
}
