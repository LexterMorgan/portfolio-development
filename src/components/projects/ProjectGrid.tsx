import type { ProjectDocument } from "@/content";
import { ProjectCard } from "./ProjectCard";
import { FeaturedProject } from "./FeaturedProject";
import styles from "./ProjectGrid.module.css";

export function ProjectGrid({
  projects,
  startIndex = 1,
  variant = "editorial",
}: {
  projects: ProjectDocument[];
  startIndex?: number;
  variant?: "editorial" | "featured-first";
}) {
  if (projects.length === 0) return null;

  if (variant === "featured-first") {
    const [first, ...rest] = projects;
    return (
      <div className={styles.stack}>
        {first ? <FeaturedProject project={first} index={startIndex} /> : null}
        {rest.length > 0 ? (
          <div className={styles.list}>
            {rest.map((project, i) => (
              <ProjectCard
                key={project.data.slug}
                project={project}
                index={startIndex + i + 1}
              />
            ))}
          </div>
        ) : null}
      </div>
    );
  }

  return (
    <div className={styles.list}>
      {projects.map((project, i) => (
        <ProjectCard
          key={project.data.slug}
          project={project}
          index={startIndex + i}
        />
      ))}
    </div>
  );
}
