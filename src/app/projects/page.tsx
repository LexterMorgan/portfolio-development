import {
  getAllProjects,
  getArchivedProjects,
  getBuildingProjects,
  getCompletedProjects,
  getProjectCategories,
  getSelectedProjects,
} from "@/content";
import { buildPageMetadata } from "@/lib/metadata";
import { Container } from "@/components/layout/Container";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { SectionHeading } from "@/components/layout/SectionHeading";
import { ProjectGrid } from "@/components/projects/ProjectGrid";
import { EmptyState, Label } from "@/components/ui/Label";
import styles from "./projects.module.css";

export function generateMetadata() {
  return buildPageMetadata({
    title: "Work",
    description:
      "Project index — analytical case studies across data analytics, BI, and data products.",
    path: "/projects",
  });
}

export default function ProjectsPage() {
  const all = getAllProjects();
  const selected = getSelectedProjects();
  const building = getBuildingProjects();
  const completed = getCompletedProjects();
  const archived = getArchivedProjects();
  const categories = getProjectCategories();

  return (
    <main>
      <Container width="wide">
        <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Work" }]} />
        <SectionHeading
          eyebrow="Project index"
          title="Work"
          description="Complete overview of portfolio projects. Status and featured flags come from content — categories appear only when present."
          meta={`${all.length} projects`}
        />

        {categories.length > 0 ? (
          <div className={styles.categories}>
            <Label>Categories in content</Label>
            <ul className={styles.catList}>
              {categories.map((category) => (
                <li key={category}>{category}</li>
              ))}
            </ul>
          </div>
        ) : null}

        {selected.length > 0 ? (
          <section className={styles.block}>
            <h2 className={styles.blockTitle}>Featured</h2>
            <ProjectGrid projects={selected} variant="featured-first" />
          </section>
        ) : null}

        <section className={styles.block}>
          <h2 className={styles.blockTitle}>Building / planned</h2>
          {building.length > 0 ? (
            <ProjectGrid projects={building} />
          ) : (
            <EmptyState title="No building or planned projects" />
          )}
        </section>

        {completed.length > 0 ? (
          <section className={styles.block}>
            <h2 className={styles.blockTitle}>Completed</h2>
            <ProjectGrid projects={completed} />
          </section>
        ) : null}

        {archived.length > 0 ? (
          <section className={styles.block}>
            <h2 className={styles.blockTitle}>Archived</h2>
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
