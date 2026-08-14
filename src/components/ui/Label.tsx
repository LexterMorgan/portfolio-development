import styles from "./Label.module.css";

export function Label({ children }: { children: React.ReactNode }) {
  return <span className={styles.label}>{children}</span>;
}

export function MetaText({ children }: { children: React.ReactNode }) {
  return <span className={styles.meta}>{children}</span>;
}

export function EmptyState({
  title,
  description,
}: {
  title: string;
  description?: string;
}) {
  return (
    <div className={styles.empty} role="status">
      <p className={styles.emptyTitle}>{title}</p>
      {description ? <p className={styles.emptyBody}>{description}</p> : null}
    </div>
  );
}
