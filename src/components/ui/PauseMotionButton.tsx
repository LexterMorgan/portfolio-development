"use client";

import { useMotion } from "./MotionProvider";
import styles from "./PauseMotionButton.module.css";

export function PauseMotionButton() {
  const { playing, toggle } = useMotion();

  return (
    <button
      type="button"
      className={styles.button}
      aria-pressed={!playing}
      aria-label={playing ? "Pause motion" : "Play motion"}
      onClick={toggle}
    >
      {playing ? (
        <svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true">
          <rect x="7" y="5" width="3.5" height="14" rx="1" fill="currentColor" />
          <rect x="13.5" y="5" width="3.5" height="14" rx="1" fill="currentColor" />
        </svg>
      ) : (
        <svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true">
          <path d="M8 5.5v13l10-6.5z" fill="currentColor" />
        </svg>
      )}
      <span>{playing ? "Pause motion" : "Play motion"}</span>
    </button>
  );
}
