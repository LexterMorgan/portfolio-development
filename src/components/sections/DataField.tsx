"use client";

import { useEffect, useRef } from "react";
import { useMotionPreferences } from "@/components/react-bits/useMotionPreferences";
import styles from "./DataField.module.css";

type Node = {
  ox: number;
  oy: number;
  x: number;
  y: number;
  z: number;
  phase: number;
  speed: number;
};

function readAccentRgb(): string {
  if (typeof window === "undefined") return "61, 184, 197";
  const raw = getComputedStyle(document.documentElement)
    .getPropertyValue("--accent")
    .trim();
  const hex = raw.startsWith("#") ? raw.slice(1) : "3db8c5";
  if (hex.length !== 6) return "61, 184, 197";
  const n = Number.parseInt(hex, 16);
  return `${(n >> 16) & 255}, ${(n >> 8) & 255}, ${n & 255}`;
}

/**
 * Subtle node-and-link field. One instance site-wide via SiteAtmosphere.
 */
export function DataField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { reducedMotion, allowPointerEffects, ready } = useMotionPreferences();

  useEffect(() => {
    if (!ready) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;
    const parent = canvas.parentElement;
    if (!parent) return;

    const mouse = { x: 0, y: 0, tx: 0, ty: 0, inside: false };
    const nodes: Node[] = [];
    const rgb = readAccentRgb();
    let width = 0;
    let height = 0;
    let dpr = 1;
    let frame = 0;
    let elapsed = 0;
    let last = performance.now();
    let running = true;
    let paused = document.hidden;

    const seedNodes = () => {
      nodes.length = 0;
      const count = Math.round(
        Math.min(48, Math.max(22, (width * height) / 42000)),
      );
      for (let i = 0; i < count; i += 1) {
        const x = Math.random() * width;
        const y = Math.random() * height;
        nodes.push({
          ox: x,
          oy: y,
          x,
          y,
          z: 0.35 + Math.random() * 0.65,
          phase: Math.random() * Math.PI * 2,
          speed: 0.1 + Math.random() * 0.18,
        });
      }
    };

    const resize = () => {
      const nextW = parent.clientWidth;
      const nextH = parent.clientHeight;
      if (nextW === 0 || nextH === 0) return;
      dpr = Math.min(window.devicePixelRatio || 1, 1.4);
      width = nextW;
      height = nextH;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      seedNodes();
    };

    const draw = (animate: boolean) => {
      ctx.clearRect(0, 0, width, height);
      const linkDist = Math.min(140, Math.max(80, width * 0.075));
      const mouseR = 170;

      if (animate) {
        mouse.x += (mouse.tx - mouse.x) * 0.08;
        mouse.y += (mouse.ty - mouse.y) * 0.08;
      }

      for (const node of nodes) {
        let x = node.ox;
        let y = node.oy;
        if (animate) {
          x += Math.sin(elapsed * node.speed + node.phase) * (3.5 * node.z);
          y += Math.cos(elapsed * node.speed * 0.85 + node.phase) * (3 * node.z);
          if (allowPointerEffects && mouse.inside) {
            const dx = x - mouse.x;
            const dy = y - mouse.y;
            const dist = Math.hypot(dx, dy) || 1;
            if (dist < mouseR) {
              const force = ((mouseR - dist) / mouseR) * (8 * node.z);
              x += (dx / dist) * force;
              y += (dy / dist) * force;
            }
            x += ((mouse.x - width * 0.5) / width) * 10 * node.z;
            y += ((mouse.y - height * 0.5) / height) * 7 * node.z;
          }
        }
        node.x = x;
        node.y = y;
      }

      for (let i = 0; i < nodes.length; i += 1) {
        const a = nodes[i];
        if (!a) continue;
        for (let j = i + 1; j < nodes.length; j += 1) {
          const b = nodes[j];
          if (!b) continue;
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.hypot(dx, dy);
          if (dist > linkDist) continue;
          let alpha = (1 - dist / linkDist) * 0.12;
          if (allowPointerEffects && mouse.inside) {
            const midX = (a.x + b.x) / 2;
            const midY = (a.y + b.y) / 2;
            const md = Math.hypot(midX - mouse.x, midY - mouse.y);
            if (md < mouseR) {
              alpha += ((mouseR - md) / mouseR) * 0.16;
            }
          }
          ctx.strokeStyle = `rgba(${rgb}, ${Math.min(0.28, alpha)})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }

      for (const node of nodes) {
        let radius = 0.85 + node.z * 0.55;
        let alpha = 0.28 + node.z * 0.18;
        if (allowPointerEffects && mouse.inside) {
          const dist = Math.hypot(node.x - mouse.x, node.y - mouse.y);
          if (dist < mouseR) {
            const t = (mouseR - dist) / mouseR;
            radius += t * 1.1;
            alpha += t * 0.35;
          }
        }
        ctx.fillStyle = `rgba(${rgb}, ${Math.min(0.72, alpha)})`;
        ctx.beginPath();
        ctx.arc(node.x, node.y, radius, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const tick = (now: number) => {
      if (!running) return;
      frame = window.requestAnimationFrame(tick);
      if (paused) return;
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      elapsed += dt;
      draw(true);
    };

    const onMove = (event: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.tx = event.clientX - rect.left;
      mouse.ty = event.clientY - rect.top;
      mouse.inside = true;
    };

    const onLeave = () => {
      mouse.inside = false;
    };

    const onVisibility = () => {
      paused = document.hidden;
      if (!paused) last = performance.now();
    };

    resize();
    draw(!reducedMotion);

    const observer = new ResizeObserver(resize);
    observer.observe(parent);
    document.addEventListener("visibilitychange", onVisibility);

    if (!reducedMotion) {
      last = performance.now();
      frame = window.requestAnimationFrame(tick);
      if (allowPointerEffects) {
        window.addEventListener("mousemove", onMove, { passive: true });
        document.documentElement.addEventListener("mouseleave", onLeave);
      }
    }

    return () => {
      running = false;
      window.cancelAnimationFrame(frame);
      observer.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("mousemove", onMove);
      document.documentElement.removeEventListener("mouseleave", onLeave);
    };
  }, [ready, reducedMotion, allowPointerEffects]);

  return <canvas ref={canvasRef} className={styles.canvas} aria-hidden />;
}
