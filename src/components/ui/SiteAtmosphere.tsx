"use client";

import { LagoonLife } from "./LagoonLife";
import styles from "./SiteAtmosphere.module.css";

/**
 * Site-wide background: ASCII lagoon life on every route.
 * Replaces the previous aurora + data-field field.
 */
export function SiteAtmosphere() {
  return (
    <div className={styles.root} aria-hidden>
      <LagoonLife />
    </div>
  );
}
