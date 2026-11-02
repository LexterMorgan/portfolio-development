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
    let moving = false;
    let visible = false;

    const tick = () => {
      if (!running) return;
      pos.x += (pos.tx - pos.x) * 0.2;
      pos.y += (pos.ty - pos.y) * 0.2;
      root.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0)`;
      html.style.setProperty("--pointer-x", `${pos.x}px`);
      html.style.setProperty("--pointer-y", `${pos.y}px`);
      if (Math.abs(pos.tx - pos.x) < 0.1 && Math.abs(pos.ty - pos.y) < 0.1) {
        moving = false;
        frame = 0;
        return;
      }
      frame = window.requestAnimationFrame(tick);
    };

    const schedule = () => {
      if (moving) return;
      moving = true;
      frame = window.requestAnimationFrame(tick);
    };

    const onMove = (event: MouseEvent) => {
      pos.tx = event.clientX;
      pos.ty = event.clientY;
      schedule();
      if (!visible) {
        visible = true;
        root.dataset.visible = "true";
      }
      root.dataset.state = cursorState(event.target);
    };

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
