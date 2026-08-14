import styles from "./StatusBadge.module.css";
import { formatProjectStatus } from "@/lib/format";
import type { ProjectStatus } from "@/content";

const TONE: Record<ProjectStatus, string> = {
  idea: "neutral",
  planned: "planned",
  "in-progress": "building",
  completed: "completed",
  archived: "archived",
};

export function StatusBadge({ status }: { status: ProjectStatus }) {
  return (
    <span className={[styles.badge, styles[TONE[status]]].join(" ")}>
      <span className={styles.dot} aria-hidden />
      {formatProjectStatus(status)}
    </span>
  );
}
