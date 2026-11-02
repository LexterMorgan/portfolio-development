"use client";

import { useEffect, useRef } from "react";
import { createLagoonLife } from "./lagoonSea";
import { useMotion } from "./MotionProvider";
import styles from "./LagoonLife.module.css";

/**
 * Site background: ASCII sea life from the lagoon renderer.
 * Playing state comes from the layout-level provider, so it survives routes.
 */
export function LagoonLife() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const lifeRef = useRef<ReturnType<typeof createLagoonLife> | null>(null);
  const { playing, ready } = useMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const life = createLagoonLife(canvas, { playing: true });
    lifeRef.current = life;
    const onResize = () => life.resize();
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
      lifeRef.current = null;
      life.destroy();
    };
  }, []);

  useEffect(() => {
    if (!ready || !lifeRef.current) return;
    lifeRef.current.setPlaying(playing);
  }, [playing, ready]);

  return <canvas ref={canvasRef} className={styles.sea} aria-hidden />;
}
