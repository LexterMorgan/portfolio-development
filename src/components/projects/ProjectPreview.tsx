import Image from "next/image";
import styles from "./ProjectPreview.module.css";

type ProjectPreviewProps = {
  title: string;
  src?: string;
  alt?: string;
  variant?: "hero" | "card" | "featured";
};

export function ProjectPreview({
  title,
  src,
  alt,
  variant = "card",
}: ProjectPreviewProps) {
  if (!src) {
    return (
      <div
        className={[styles.frame, styles[variant], styles.fallback].join(" ")}
        aria-label={`${title} visual pending`}
      >
        <div className={styles.fallbackInner}>
          <span className={styles.fallbackLabel}>Visual pending</span>
          <span className={styles.fallbackTitle}>{title}</span>
          <span className={styles.fallbackHint}>
            Dashboard / analytical artifact will appear here when sourced.
          </span>
        </div>
      </div>
    );
  }

  return (
    <figure className={[styles.frame, styles[variant]].join(" ")}>
      <Image
        src={src}
        alt={alt || `${title} preview`}
        width={1600}
        height={1000}
        className={styles.image}
        sizes="(max-width: 768px) 100vw, 80vw"
      />
    </figure>
  );
}
