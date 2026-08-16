"use client";

import Noise from "@/components/react-bits/Noise/Noise";
import { useMotionPreferences } from "@/components/react-bits/useMotionPreferences";
import styles from "./SiteNoise.module.css";

/**
 * Single global film-grain overlay (~2–6% visual intensity).
 * Static (no refresh) when reduced motion is preferred.
 */
export function SiteNoise() {
  const { reducedMotion, ready } = useMotionPreferences();

  if (!ready) {
    return null;
  }

  return (
    <div className={styles.root} aria-hidden>
      <Noise
        patternSize={250}
        patternRefreshInterval={8}
        patternAlpha={12}
        static={reducedMotion}
      />
    </div>
  );
}
