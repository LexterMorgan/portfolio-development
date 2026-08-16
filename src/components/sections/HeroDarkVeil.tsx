"use client";

import { DataField } from "@/components/sections/DataField";
import styles from "./HeroDarkVeil.module.css";

/**
 * Home hero atmosphere — one coherent data field, not stacked WebGL effects.
 */
export function HeroDarkVeil() {
  return (
    <div className={styles.root} aria-hidden>
      <div className={styles.field}>
        <DataField />
      </div>
      <div className={styles.wash} />
    </div>
  );
}
