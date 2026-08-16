import Link from "next/link";
import type { ProjectDocument } from "@/content";
import { flattenTechIds, formatProjectStatus, padIndex } from "@/lib/format";
import { getTech } from "@/content";
import { ProjectLinksActions } from "./ProjectLinks";
import { ProjectPreview } from "./ProjectPreview";
import { Reveal } from "@/components/ui/Reveal";
import styles from "./ProjectRow.module.css";

type ProjectRowProps = {
  project: ProjectDocument;
  index: number;
};

export function ProjectRow({ project, index }: ProjectRowProps) {
  const { data } = project;
  const techIds = flattenTechIds(data.tech_stack).slice(0, 8);
  const techLabels = techIds.map((id) => getTech(id)?.name ?? id);

  return (
    <Reveal as="article" className={styles.row} delay={Math.min(index * 40, 160)} cursor="explore">
      <div className={styles.copy}>
        <p className={styles.index}>{padIndex(index)}</p>
        <div className={styles.meta}>
          <span>{formatProjectStatus(data.status)}</span>
          {data.category ? <span>{data.category}</span> : null}
          {data.year ? <span>{data.year}</span> : null}
        </div>
        <h3 className={styles.title}>
          <Link href={`/projects/${data.slug}`}>{data.title}</Link>
        </h3>
        <p className={styles.description}>
          {data.description ||
            data.subtitle ||
            "Case study narrative pending verified source material."}
        </p>
        {techLabels.length > 0 ? (
          <p className={styles.tech}>
            <span className={styles.techLabel}>Tech</span>
            {techLabels.join(" · ")}
          </p>
        ) : (
          <p className={styles.techMuted}>Technology stack pending verification.</p>
        )}
        <ProjectLinksActions slug={data.slug} links={data.links} />
      </div>
      <div className={styles.media}>
        <Link
          href={`/projects/${data.slug}`}
          className={styles.mediaLink}
          tabIndex={-1}
          aria-hidden
        >
          <ProjectPreview
            title={data.title}
            src={data.hero || data.thumbnail}
            variant="card"
          />
        </Link>
      </div>
    </Reveal>
  );
}
