"use client";

import { DataField } from "@/components/sections/DataField";
import { useMotionPreferences } from "@/components/react-bits/useMotionPreferences";
import styles from "./SiteAtmosphere.module.css";

/**
 * Site-wide interactive field — same environment on Home, Projects, and About.
 * One canvas. Pointer glow is CSS-only using --pointer-x/y.
 */
export function SiteAtmosphere() {
  const { reducedMotion, ready } = useMotionPreferences();

  if (!ready) return null;

  return (
    <div className={styles.root} aria-hidden>
      <div className={styles.field}>
        <DataField />
      </div>
      {reducedMotion ? null : <div className={styles.glow} />}
    </div>
  );
}
