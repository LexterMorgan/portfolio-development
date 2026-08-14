import styles from "./SectionHeading.module.css";

type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  meta?: string;
  align?: "start" | "split";
  action?: React.ReactNode;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  meta,
  align = "start",
  action,
}: SectionHeadingProps) {
  return (
    <header
      className={[styles.heading, align === "split" ? styles.split : ""]
        .filter(Boolean)
        .join(" ")}
    >
      <div className={styles.copy}>
        {eyebrow ? <p className={styles.eyebrow}>{eyebrow}</p> : null}
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
