import { SectionLabel } from "./SectionLabel";
import styles from "./SectionHeading.module.css";

type SectionHeadingProps = {
  /** Full eyebrow string, e.g. "01 / Selected Work" — parsed by SectionLabel */
  eyebrow?: string;
  /** Explicit index when not embedding in eyebrow */
  index?: string | number;
  /** Explicit label when not embedding in eyebrow */
  label?: string;
  title: string;
  description?: string;
  meta?: string;
  align?: "start" | "split";
  action?: React.ReactNode;
};

export function SectionHeading({
  eyebrow,
  index,
  label,
  title,
  description,
  meta,
  align = "start",
  action,
}: SectionHeadingProps) {
  const showLabel = Boolean(eyebrow || index !== undefined || label);

  return (
    <header
      className={[styles.heading, align === "split" ? styles.split : ""]
        .filter(Boolean)
        .join(" ")}
    >
      <div className={styles.copy}>
        {showLabel ? (
          <SectionLabel index={index} label={label}>
            {eyebrow}
          </SectionLabel>
        ) : null}
        <div className={styles.titleRow}>
          <h2 className={styles.title}>{title}</h2>
          {meta ? <span className={styles.meta}>{meta}</span> : null}
        </div>
        {description ? <p className={styles.description}>{description}</p> : null}
      </div>
      {action ? <div className={styles.action}>{action}</div> : null}
    </header>
  );
}
