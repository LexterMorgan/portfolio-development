import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getAllProjects,
  getArticlesForProject,
  getProject,
  projectExists,
} from "@/content";
import { buildPageMetadata } from "@/lib/metadata";
import { Markdown } from "@/lib/markdown";
import { Container } from "@/components/layout/Container";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { Divider } from "@/components/layout/Divider";
import { ProjectMeta } from "@/components/projects/ProjectMeta";
import { ProjectLinksActions } from "@/components/projects/ProjectLinks";
import { ProjectPreview } from "@/components/projects/ProjectPreview";
import { FiveW1HNarrative } from "@/components/projects/FiveW1H";
import { FindingsList, LimitationsList } from "@/components/projects/Findings";
import { TechStackList } from "@/components/tech/TechStack";
import { ArticleCard } from "@/components/articles/ArticleCard";
import { TextLink } from "@/components/ui/TextLink";
import { Prose } from "@/components/typography/Prose";
import styles from "./project-detail.module.css";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getAllProjects().map((project) => ({ slug: project.data.slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  if (!projectExists(slug)) {
    return buildPageMetadata({ title: "Project not found" });
  }
  const project = getProject(slug);
  return buildPageMetadata({
    title: project.data.title,
    description:
      project.data.description ||
      project.data.subtitle ||
      "Analytical project case study.",
    path: `/projects/${slug}`,
  });
}

export default async function ProjectDetailPage({ params }: PageProps) {
  const { slug } = await params;
  if (!projectExists(slug)) notFound();

  const project = getProject(slug);
  const articles = getArticlesForProject(slug).filter(
    (article) => article.data.status === "published",
  );
  const others = getAllProjects().filter((item) => item.data.slug !== slug);
  const { data, body } = project;
  const w1h = data.five_w1h;

  return (
    <main>
      <Container width="wide">
        <Breadcrumb
          items={[
            { label: "Home", href: "/" },
            { label: "Work", href: "/projects" },
            { label: data.title },
          ]}
        />

        <header className={styles.header}>
          <ProjectMeta project={project} />
          <h1 className={styles.title}>{data.title}</h1>
          {data.subtitle ? <p className={styles.subtitle}>{data.subtitle}</p> : null}
          <p className={styles.description}>
            {data.description ||
              "Case study narrative pending verified source material."}
          </p>
          <ProjectLinksActions slug={data.slug} links={data.links} />
        </header>

        <ProjectPreview
          title={data.title}
          src={data.hero || data.thumbnail}
          variant="hero"
        />
      </Container>

      <Container width="reading" className={styles.study}>
        <section className={styles.section}>
          <h2>Technology stack</h2>
          <TechStackList stack={data.tech_stack} labeled showDescriptions />
        </section>

        <Divider label="Case study" />

        {(w1h.why || w1h.what) && (
          <section className={styles.section}>
            <h2>Context & problem</h2>
            {w1h.why ? <p>{w1h.why}</p> : null}
            {w1h.what ? <p>{w1h.what}</p> : null}
          </section>
        )}

        <section className={styles.section}>
          <h2>5W1H</h2>
          <FiveW1HNarrative data={data.five_w1h} />
        </section>

        {body ? (
          <section className={styles.section}>
            <h2>Notes</h2>
            <Prose>
              <Markdown content={body} />
            </Prose>
          </section>
        ) : null}

        <section className={styles.section}>
          <h2>Findings</h2>
          <FindingsList findings={data.findings} />
        </section>

        <section className={styles.section}>
          <h2>Limitations</h2>
          <LimitationsList limitations={data.limitations} />
        </section>

        <section className={styles.section}>
          <h2>Related articles</h2>
          {articles.length > 0 ? (
            articles.map((article) => (
              <ArticleCard key={article.data.slug} article={article} />
            ))
          ) : (
            <p className={styles.muted}>
              No published articles linked to this project yet.
            </p>
          )}
        </section>

        <section className={styles.section}>
          <h2>Other projects</h2>
          <ul className={styles.otherList}>
            {others.map((item) => (
              <li key={item.data.slug}>
                <Link href={`/projects/${item.data.slug}`}>{item.data.title}</Link>
              </li>
            ))}
          </ul>
          <TextLink href="/projects" arrow>
            Back to work
          </TextLink>
        </section>
      </Container>
    </main>
  );
}
