import styles from "./SectionLabel.module.css";

type SectionLabelProps = {
  /** Numeric / coded index, e.g. "01" — rendered in accent */
  index?: string | number;
  /** Label text (uppercased in styles) */
  label?: string;
  /**
   * Full eyebrow string fallback, e.g. "01 / Selected Work".
   * When `index` + `label` are omitted, this is parsed if it matches `NN / Text`.
   */
  children?: string;
  className?: string;
};

function padIndex(value: string | number): string {
  if (typeof value === "number") return String(value).padStart(2, "0");
  return value;
}

/**
 * Editorial section label: `01 / SELECTED WORK`
 * Renders as a div so it composes safely inside headings, paragraphs, or cards.
 */
export function SectionLabel({
  index,
  label,
  children,
  className,
}: SectionLabelProps) {
  let resolvedIndex = index !== undefined ? padIndex(index) : undefined;
  let resolvedLabel = label;

  if (!resolvedIndex && !resolvedLabel && children) {
    const match = children.match(/^(\d+)\s*\/\s*(.+)$/);
    if (match) {
      resolvedIndex = padIndex(match[1]);
      resolvedLabel = match[2];
    } else {
      resolvedLabel = children;
    }
  }

  const solo = !resolvedIndex && Boolean(resolvedLabel);

  return (
    <div
      className={[styles.label, solo ? styles.solo : "", className]
        .filter(Boolean)
        .join(" ")}
    >
      {resolvedIndex ? (
        <>
          <span className={styles.index}>{resolvedIndex}</span>
          <span className={styles.sep} aria-hidden>
            {" / "}
          </span>
        </>
      ) : null}
      {resolvedLabel ? (
        <span className={styles.text}>{resolvedLabel}</span>
      ) : null}
    </div>
  );
}
