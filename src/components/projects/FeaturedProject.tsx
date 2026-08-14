import Link from "next/link";
import type { ProjectDocument } from "@/content";
import { ProjectMeta } from "./ProjectMeta";
import { ProjectLinksActions } from "./ProjectLinks";
import { ProjectPreview } from "./ProjectPreview";
import { TechStackList } from "@/components/tech/TechStack";
import styles from "./FeaturedProject.module.css";

export function FeaturedProject({
  project,
  index = 1,
}: {
  project: ProjectDocument;
  index?: number;
}) {
  const { data } = project;
  return (
    <article className={styles.featured}>
      <div className={styles.header}>
        <ProjectMeta project={project} index={index} />
        <h3 className={styles.title}>
          <Link href={`/projects/${data.slug}`}>{data.title}</Link>
        </h3>
        {data.subtitle ? <p className={styles.subtitle}>{data.subtitle}</p> : null}
        <p className={styles.description}>
          {data.description ||
            "Featured analytical case study — details pending verified sources."}
        </p>
      </div>

      <ProjectPreview
        title={data.title}
        src={data.hero || data.thumbnail}
        variant="featured"
      />

      <div className={styles.footer}>
        <TechStackList stack={data.tech_stack} />
        <ProjectLinksActions slug={data.slug} links={data.links} />
      </div>
    </article>
  );
}
