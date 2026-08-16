"use client";

import { useEffect, useRef } from "react";
import { useMotionPreferences } from "@/components/react-bits/useMotionPreferences";
import styles from "./SiteCursor.module.css";

function cursorState(target: EventTarget | null): "default" | "hot" | "explore" | "card" {
  if (!(target instanceof Element)) return "default";
  if (
    target.closest(
      "[data-cursor='hot'], button, [role='button'], summary, label, input, textarea, select",
    )
  ) {
    return "hot";
  }
  if (target.closest("[data-cursor='explore']")) return "explore";
  if (target.closest("a")) return "hot";
  if (target.closest("[data-cursor='card']")) return "card";
  return "default";
}

/**
 * Small cyan follower + ring. Native pointer stays visible.
 */
export function SiteCursor() {
  const rootRef = useRef<HTMLDivElement>(null);
  const { allowPointerEffects, ready } = useMotionPreferences();

  useEffect(() => {
    if (!ready || !allowPointerEffects) return;
    const root = rootRef.current;
    if (!root) return;
    const html = document.documentElement;

    const pos = { x: 0, y: 0, tx: -40, ty: -40 };
    let frame = 0;
    let running = true;
    let visible = false;

    const tick = () => {
      if (!running) return;
      pos.x += (pos.tx - pos.x) * 0.2;
      pos.y += (pos.ty - pos.y) * 0.2;
      root.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0)`;
      frame = window.requestAnimationFrame(tick);
    };

    const onMove = (event: MouseEvent) => {
      pos.tx = event.clientX;
      pos.ty = event.clientY;
      html.style.setProperty("--pointer-x", `${event.clientX}px`);
      html.style.setProperty("--pointer-y", `${event.clientY}px`);
      if (!visible) {
        visible = true;
        root.dataset.visible = "true";
      }
      root.dataset.state = cursorState(event.target);
    };

    frame = window.requestAnimationFrame(tick);
    window.addEventListener("mousemove", onMove, { passive: true });

    return () => {
      running = false;
      window.cancelAnimationFrame(frame);
      window.removeEventListener("mousemove", onMove);
    };
  }, [allowPointerEffects, ready]);

  if (!ready || !allowPointerEffects) return null;

  return (
    <div ref={rootRef} className={styles.root} aria-hidden>
      <span className={styles.dot} />
      <span className={styles.ring} />
      <span className={styles.label}>View</span>
    </div>
  );
}
