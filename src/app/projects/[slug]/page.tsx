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
import { flattenTechIds } from "@/lib/format";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { ProjectMeta } from "@/components/projects/ProjectMeta";
import { ProjectLinksActions } from "@/components/projects/ProjectLinks";
import { ProjectPreview } from "@/components/projects/ProjectPreview";
import { FindingsList, LimitationsList } from "@/components/projects/Findings";
import { CaseStudyProcess } from "@/components/projects/CaseStudyProcess";
import { TechStackList } from "@/components/tech/TechStack";
import { ArticleCard } from "@/components/articles/ArticleCard";
import { TextLink } from "@/components/ui/TextLink";
import { EmptyState } from "@/components/ui/Label";
import { Reveal } from "@/components/ui/Reveal";
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
  const all = getAllProjects();
  const index = all.findIndex((item) => item.data.slug === slug);
  const next = all[(index + 1) % all.length];
  const { data, body } = project;
  const w1h = data.five_w1h;
  const hasTech = flattenTechIds(data.tech_stack).length > 0;
  const hasContext = Boolean(w1h.why || w1h.who || w1h.where);
  const hasProblem = Boolean(w1h.what);
  const hasApproach = Boolean(w1h.how || body);
  const hasLinks = Boolean(data.links.live || data.links.github || data.links.explore);

  return (
    <main className={styles.page}>
      <Section spaced="compact">
        <Container width="wide">
          <Reveal>
            <p className={styles.crumb}>
              <Link href="/projects">Projects</Link>
              <span aria-hidden> / </span>
              <span>{data.title}</span>
            </p>
          </Reveal>

          <header className={styles.header}>
            <Reveal>
              <p className={styles.sectionEyebrow}>01 / Overview</p>
              <ProjectMeta project={project} />
              <h1 className={styles.title}>{data.title}</h1>
              {data.subtitle ? (
                <p className={styles.subtitle}>{data.subtitle}</p>
              ) : null}
              <p className={styles.description}>
                {data.description ||
                  "Case study narrative pending verified source material."}
              </p>
              <ProjectLinksActions slug={data.slug} links={data.links} />
            </Reveal>
          </header>

          <Reveal delay={80}>
            <ProjectPreview
              title={data.title}
              src={data.hero || data.thumbnail}
              variant="hero"
            />
          </Reveal>
        </Container>
      </Section>

      <Container width="wide" className={styles.study}>
        {hasContext ? (
          <section className={styles.section}>
            <p className={styles.sectionEyebrow}>02 / Business Context</p>
            <h2>Business context</h2>
            {w1h.why ? <p>{w1h.why}</p> : null}
            {w1h.who ? <p>{w1h.who}</p> : null}
            {w1h.where ? <p>{w1h.where}</p> : null}
            {w1h.when ? (
              <p className={styles.muted}>Timeline: {w1h.when}</p>
            ) : null}
          </section>
        ) : null}

        {hasProblem ? (
          <section className={styles.section}>
            <p className={styles.sectionEyebrow}>03 / Problem</p>
            <h2>Problem</h2>
            <p>{w1h.what}</p>
          </section>
        ) : null}

        {!hasContext && !hasProblem ? (
          <section className={styles.section}>
            <p className={styles.sectionEyebrow}>02 / Framing</p>
            <h2>Context &amp; problem</h2>
            <EmptyState
              title="Case-study framing pending"
              description="Business context, problem, and objectives appear when five_w1h fields are sourced in project frontmatter."
            />
          </section>
        ) : null}

        {hasApproach ? (
          <section className={styles.section}>
            <p className={styles.sectionEyebrow}>05 / Approach</p>
            <h2>Approach</h2>
            {w1h.how ? <p>{w1h.how}</p> : null}
            {body ? (
              <Prose>
                <Markdown content={body} />
              </Prose>
            ) : null}
          </section>
        ) : null}

        <section className={styles.section}>
          <p className={styles.sectionEyebrow}>06 / Technical Stack</p>
          <h2>Technology stack</h2>
          {hasTech ? (
            <TechStackList stack={data.tech_stack} labeled showDescriptions />
          ) : (
            <EmptyState
              title="Stack pending verification"
              description="Technologies appear here only after they are verified against the project source."
            />
          )}
        </section>

        <section className={styles.section}>
          <p className={styles.sectionEyebrow}>07 / Process</p>
          <h2>Process</h2>
          <CaseStudyProcess />
        </section>

        <section className={styles.section}>
          <p className={styles.sectionEyebrow}>08 / Preview</p>
          <h2>Visual preview</h2>
          <ProjectPreview
            title={data.title}
            src={data.hero || data.thumbnail}
            variant="featured"
          />
        </section>

        <section className={styles.section}>
          <p className={styles.sectionEyebrow}>09 / Findings</p>
          <h2>Findings / Insights</h2>
          {data.findings.length > 0 ? (
            <FindingsList findings={data.findings} />
          ) : (
            <EmptyState
              title="Insights pending"
              description="Findings appear only when observed or properly derived from sources — never invented."
            />
          )}
        </section>

        {data.limitations.length > 0 ? (
          <section className={styles.section}>
            <p className={styles.sectionEyebrow}>Data / Methodology / Limitations</p>
            <h2>Limitations</h2>
            <LimitationsList limitations={data.limitations} />
          </section>
        ) : null}

        <section className={styles.section}>
          <p className={styles.sectionEyebrow}>10 / Links</p>
          <h2>Repository &amp; links</h2>
          {hasLinks ? (
            <ProjectLinksActions slug={data.slug} links={data.links} />
          ) : (
            <EmptyState
              title="Links pending"
              description="GitHub, live demo, or explore URLs appear when present in project frontmatter."
            />
          )}
        </section>

        {articles.length > 0 ? (
          <section className={styles.section}>
            <p className={styles.sectionEyebrow}>Insights</p>
            <h2>Related articles</h2>
            {articles.map((article) => (
              <ArticleCard key={article.data.slug} article={article} />
            ))}
          </section>
        ) : null}

        {next && next.data.slug !== data.slug ? (
          <section className={styles.next}>
            <p className={styles.sectionEyebrow}>11 / Next Project</p>
            <h2 className={styles.nextTitle}>
              <Link href={`/projects/${next.data.slug}`}>{next.data.title}</Link>
            </h2>
            <TextLink href={`/projects/${next.data.slug}`} arrow>
              Continue
            </TextLink>
          </section>
        ) : null}

        <TextLink href="/projects" arrow>
          Back to projects
        </TextLink>
      </Container>
    </main>
  );
}
