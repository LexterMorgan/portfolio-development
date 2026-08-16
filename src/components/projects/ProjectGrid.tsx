import type { ProjectDocument } from "@/content";
import { ProjectRow } from "./ProjectRow";
import styles from "./ProjectGrid.module.css";

export function ProjectGrid({
  projects,
  startIndex = 1,
}: {
  projects: ProjectDocument[];
  startIndex?: number;
  /** @deprecated featured-first kept for API compat; all rows are editorial */
  variant?: "editorial" | "featured-first";
}) {
  if (projects.length === 0) return null;

  return (
    <div className={styles.list}>
      {projects.map((project, i) => (
        <ProjectRow
          key={project.data.slug}
          project={project}
          index={startIndex + i}
        />
      ))}
    </div>
  );
}
