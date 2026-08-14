import styles from "./prose.module.css";

/** Shared article / long-form reading styles. */
export function Prose({ children }: { children: React.ReactNode }) {
  return <div className={styles.prose}>{children}</div>;
}
