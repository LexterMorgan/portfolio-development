import { notFound } from "next/navigation";
import {
  getArticleBySlug,
  getProject,
  getPublishedArticles,
  projectExists,
} from "@/content";
import { buildPageMetadata } from "@/lib/metadata";
import { formatDate, formatReadingTime } from "@/lib/format";
import { Markdown } from "@/lib/markdown";
import { Container } from "@/components/layout/Container";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { Label, MetaText } from "@/components/ui/Label";
import { TextLink } from "@/components/ui/TextLink";
import { ProjectLinksActions } from "@/components/projects/ProjectLinks";
import { ArticleCard } from "@/components/articles/ArticleCard";
import { Prose } from "@/components/typography/Prose";
import styles from "./article-detail.module.css";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getPublishedArticles().map((article) => ({ slug: article.data.slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) return buildPageMetadata({ title: "Article not found" });
  return buildPageMetadata({
    title: article.data.title,
    description: article.data.summary || "Project insight.",
    path: `/articles/${slug}`,
  });
}

export default async function ArticleDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article || article.data.status !== "published") notFound();

  const project = projectExists(article.data.project)
    ? getProject(article.data.project)
    : null;
  const related = getPublishedArticles()
    .filter(
      (item) =>
        item.data.slug !== slug &&
        item.data.project === article.data.project,
    )
    .slice(0, 3);

  const date = formatDate(article.data.date);
  const reading = formatReadingTime(article.data.reading_time_minutes);

  return (
    <main>
      <Container width="reading">
        <Breadcrumb
          items={[
            { label: "Home", href: "/" },
            { label: "Articles", href: "/articles" },
            { label: article.data.title },
          ]}
        />

        <header className={styles.header}>
          <div className={styles.meta}>
            <Label>{article.data.category || "Research note"}</Label>
            {date ? <MetaText>{date}</MetaText> : null}
            {reading ? <MetaText>{reading}</MetaText> : null}
          </div>
          {project ? (
            <p className={styles.projectLine}>
              {project.data.title}
            </p>
          ) : null}
          <h1 className={styles.title}>{article.data.title}</h1>
          {article.data.summary ? (
            <p className={styles.summary}>{article.data.summary}</p>
          ) : null}
        </header>

        <Prose>
          <Markdown content={article.body} />
        </Prose>

        {project ? (
          <section className={styles.relatedProject}>
            <h2>Related project</h2>
            <p className={styles.projectTitle}>{project.data.title}</p>
            <ProjectLinksActions
              slug={project.data.slug}
              links={project.data.links}
            />
          </section>
        ) : null}

        {related.length > 0 ? (
          <section className={styles.related}>
            <h2>Related articles</h2>
            {related.map((item) => (
              <ArticleCard key={item.data.slug} article={item} />
            ))}
          </section>
        ) : null}

        <TextLink href="/articles" arrow>
          All articles
        </TextLink>
      </Container>
    </main>
  );
}
