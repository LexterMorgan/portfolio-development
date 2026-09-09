"use client";

import { useTheme } from "@/lib/theme";
import styles from "./ThemeToggle.module.css";

/**
 * Light/dark toggle. Self-contained client component — no props,
 * no context. Initial render always shows the moon target (dark
 * default); corrects after hydration via useTheme().
 */
export function ThemeToggle() {
  const { theme, toggle } = useTheme();
  const toLight = theme === "dark";
  const label = toLight ? "Switch to light mode" : "Switch to dark mode";

  return (
    <button
      type="button"
      className={styles.toggle}
      onClick={toggle}
      aria-label={label}
      title={label}
      aria-pressed={theme === "light"}
    >
      {toLight ? (
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          aria-hidden
        >
          <circle cx="12" cy="12" r="4.2" />
          <path d="M12 2.5v2.2M12 19.3v2.2M2.5 12h2.2M19.3 12h2.2M4.9 4.9l1.6 1.6M17.5 17.5l1.6 1.6M19.1 4.9l-1.6 1.6M6.5 17.5l-1.6 1.6" />
        </svg>
      ) : (
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden
        >
          <path d="M20.4 14.2A8.5 8.5 0 0 1 9.8 3.6a8.5 8.5 0 1 0 10.6 10.6Z" />
        </svg>
      )}
    </button>
  );
}
