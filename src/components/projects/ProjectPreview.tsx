"use client";

import Image from "next/image";
import { useRef, type MouseEvent } from "react";
import { useMotionPreferences } from "@/components/react-bits/useMotionPreferences";
import styles from "./ProjectPreview.module.css";

type ProjectPreviewProps = {
  title: string;
  src?: string;
  alt?: string;
  variant?: "hero" | "card" | "featured";
};

export function ProjectPreview({
  title,
  src,
  alt,
  variant = "card",
}: ProjectPreviewProps) {
  const frameRef = useRef<HTMLDivElement>(null);
  const { allowPointerEffects } = useMotionPreferences();

  const onMove = (event: MouseEvent<HTMLDivElement>) => {
    if (!allowPointerEffects || !frameRef.current) return;
    const rect = frameRef.current.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    frameRef.current.style.setProperty("--spot-x", `${x}px`);
    frameRef.current.style.setProperty("--spot-y", `${y}px`);
    const shiftX = (x / rect.width - 0.5) * 10;
    const shiftY = (y / rect.height - 0.5) * 8;
    frameRef.current.style.setProperty("--shift-x", `${shiftX.toFixed(2)}px`);
    frameRef.current.style.setProperty("--shift-y", `${shiftY.toFixed(2)}px`);
  };

  const onLeave = () => {
    if (!frameRef.current) return;
    frameRef.current.style.setProperty("--shift-x", "0px");
    frameRef.current.style.setProperty("--shift-y", "0px");
  };

  if (!src) {
    return (
      <div
        className={[styles.frame, styles[variant], styles.fallback].join(" ")}
        aria-label={`${title} visual pending`}
        data-cursor="explore"
      >
        <div className={styles.fallbackInner}>
          <span className={styles.fallbackLabel}>Visual pending</span>
          <span className={styles.fallbackTitle}>{title}</span>
          <span className={styles.fallbackHint}>
            Dashboard / analytical artifact will appear here when sourced.
          </span>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={frameRef}
      className={[styles.frame, styles[variant]].join(" ")}
      data-cursor="explore"
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      <Image
        src={src}
        alt={alt || `${title} preview`}
        width={1600}
        height={1000}
        className={styles.image}
        sizes="(max-width: 768px) 100vw, 80vw"
      />
    </div>
  );
}
