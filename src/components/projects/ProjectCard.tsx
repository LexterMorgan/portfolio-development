import Link from "next/link";
import type { ProjectDocument } from "@/content";
import { ProjectMeta } from "./ProjectMeta";
import { ProjectLinksActions } from "./ProjectLinks";
import { ProjectPreview } from "./ProjectPreview";
import { TechStackList } from "@/components/tech/TechStack";
import styles from "./ProjectCard.module.css";

export function ProjectCard({
  project,
  index,
}: {
  project: ProjectDocument;
  index?: number;
}) {
  const { data } = project;
  return (
    <article className={styles.card}>
      <div className={styles.copy}>
        <ProjectMeta project={project} index={index} />
        <h3 className={styles.title}>
          <Link href={`/projects/${data.slug}`}>{data.title}</Link>
        </h3>
        {data.subtitle ? <p className={styles.subtitle}>{data.subtitle}</p> : null}
        <p className={styles.description}>
          {data.description ||
            "Case study details pending verified source material."}
        </p>
        <TechStackList stack={data.tech_stack} />
        <ProjectLinksActions slug={data.slug} links={data.links} />
      </div>
      <div className={styles.media}>
        <ProjectPreview
          title={data.title}
          src={data.thumbnail || data.hero}
          variant="card"
        />
      </div>
    </article>
  );
}
