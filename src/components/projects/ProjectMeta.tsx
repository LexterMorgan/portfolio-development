import { StatusBadge } from "@/components/ui/StatusBadge";
import { Label, MetaText } from "@/components/ui/Label";
import type { ProjectDocument } from "@/content";
import { formatDate } from "@/lib/format";
import styles from "./ProjectMeta.module.css";

export function ProjectMeta({
  project,
  index,
}: {
  project: ProjectDocument;
  index?: number;
}) {
  const date = formatDate(project.data.date);
  return (
    <div className={styles.meta}>
      {typeof index === "number" ? (
        <MetaText>{String(index).padStart(2, "0")}</MetaText>
      ) : null}
      {project.data.category ? <Label>{project.data.category}</Label> : null}
      <StatusBadge status={project.data.status} />
      {project.data.year ? <MetaText>{project.data.year}</MetaText> : null}
      {date ? <MetaText>{date}</MetaText> : null}
    </div>
  );
}
