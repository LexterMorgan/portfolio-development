"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import styles from "./Reveal.module.css";

type RevealProps = {
  children: ReactNode;
  className?: string;
  /** Stagger delay in ms */
  delay?: number;
  as?: "div" | "section" | "article" | "li" | "header";
  cursor?: "explore" | "card";
};

function isInView(node: HTMLElement): boolean {
  const rect = node.getBoundingClientRect();
  const view = window.innerHeight || document.documentElement.clientHeight;
  return rect.top < view * 0.95 && rect.bottom > 0;
}

/**
 * Lightweight viewport reveal. Server-friendly: children stay in DOM;
 * only opacity/transform animate when intersecting.
 * Falls back to visible if already on-screen or if observation never fires.
 */
export function Reveal({
  children,
  className,
  delay = 0,
  as: Tag = "div",
  cursor,
}: RevealProps) {
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (motion.matches || isInView(node)) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "0px 0px -4% 0px", threshold: 0.05 },
    );

    observer.observe(node);

    // Safety: never leave content stuck invisible after hydration.
    const fallback = window.setTimeout(() => setVisible(true), 1800);

    return () => {
      observer.disconnect();
      window.clearTimeout(fallback);
    };
  }, []);

  return (
    <Tag
      ref={ref as never}
      className={[
        styles.reveal,
        visible ? styles.visible : "",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      style={{ transitionDelay: visible ? `${delay}ms` : "0ms" }}
      {...(cursor ? { "data-cursor": cursor } : {})}
    >
      {children}
    </Tag>
  );
}
