import { getPublishedArticles } from "@/content";
import { buildPageMetadata } from "@/lib/metadata";
import { Container } from "@/components/layout/Container";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { SectionHeading } from "@/components/layout/SectionHeading";
import { ArticleCard } from "@/components/articles/ArticleCard";
import { EmptyState } from "@/components/ui/Label";

export function generateMetadata() {
  return buildPageMetadata({
    title: "Articles",
    description:
      "Project insights and research notes linked to analytical case studies.",
    path: "/articles",
  });
}

export default function ArticlesPage() {
  const articles = getPublishedArticles();

  return (
    <main>
      <Container width="reading">
        <Breadcrumb
          items={[{ label: "Home", href: "/" }, { label: "Articles" }]}
        />
        <SectionHeading
          eyebrow="Insights"
          title="Articles"
          description="Editorial notes connected to projects through stable slugs. Unpublished drafts stay out of this index."
          meta={`${articles.length} published`}
        />
        {articles.length > 0 ? (
          articles.map((article) => (
            <ArticleCard key={article.data.slug} article={article} />
          ))
        ) : (
          <EmptyState
            title="No published articles"
            description="When insights are ready, add markdown files under a project’s articles/ folder with status: published."
          />
        )}
      </Container>
    </main>
  );
}
