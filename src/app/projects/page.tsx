import {
  getAllProjects,
  getArchivedProjects,
  getBuildingProjects,
  getCompletedProjects,
} from "@/content";
import { buildPageMetadata } from "@/lib/metadata";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/layout/SectionHeading";
import { ProjectGrid } from "@/components/projects/ProjectGrid";
import { EmptyState } from "@/components/ui/Label";
import { Reveal } from "@/components/ui/Reveal";
import styles from "./projects.module.css";

export function generateMetadata() {
  return buildPageMetadata({
    title: "Projects",
    description:
      "Completed analytical work across customer retention, competitive research, communication intelligence, and retail BI.",
    path: "/projects",
  });
}

export default function ProjectsPage() {
  const all = getAllProjects();
  const building = getBuildingProjects();
  const completed = getCompletedProjects();
  const archived = getArchivedProjects();

  return (
    <main className={styles.page}>
      <Section spaced="compact">
        <Container width="wide">
          <Reveal>
            <p className={styles.eyebrow}>Projects</p>
            <h1 className={styles.heroTitle}>Selected Work</h1>
            <p className={styles.heroLede}>
              Proof of work across four analytical disciplines — each project
              answers a different question.
            </p>
            <p className={styles.meta}>{all.length} projects</p>
          </Reveal>
        </Container>
      </Section>

      <Container width="wide" className={styles.blocks}>
        {completed.length > 0 ? (
          <section className={styles.block}>
            <SectionHeading
              index="03"
              label="Completed"
              title="Completed work"
              description="Four verified repositories — listed once, ordered for narrative progression."
              meta={`${String(completed.length).padStart(2, "0")} projects`}
            />
            <ProjectGrid projects={completed} startIndex={1} />
          </section>
        ) : null}

        <section className={styles.block}>
          <SectionHeading
            index="02"
            label="Index"
            title="Building & planned"
          />
          {building.length > 0 ? (
            <ProjectGrid projects={building} />
          ) : (
            <EmptyState
              title="No building or planned projects"
              description="In-progress and planned work will appear here when status is set in content — nothing is invented to fill the section."
            />
          )}
        </section>

        {archived.length > 0 ? (
          <section className={styles.block}>
            <SectionHeading index="04" label="Archive" title="Archived" />
            <ProjectGrid projects={archived} />
          </section>
        ) : null}

        {all.length === 0 ? (
          <EmptyState
            title="No projects yet"
            description="Add project folders under content/projects/."
          />
        ) : null}
      </Container>
    </main>
  );
}
