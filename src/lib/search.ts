/**
 * Lightweight search index shape for a future Cmd/Ctrl+K interface.
 * Architecture only — no UI in Phase 2.
 */

export type SearchItemKind =
  | "project"
  | "article"
  | "technology"
  | "experience"
  | "skill";

export type SearchItem = {
  id: string;
  kind: SearchItemKind;
  title: string;
  subtitle?: string;
  href: string;
  keywords?: string[];
};

export type SearchIndex = SearchItem[];

/** Build a flat index from already-loaded content documents. */
export function buildSearchIndex(input: {
  projects: Array<{
    slug: string;
    title: string;
    description?: string;
    category?: string;
  }>;
  articles: Array<{
    slug: string;
    title: string;
    summary?: string;
    project: string;
  }>;
  technologies: Array<{ id: string; name: string; category: string }>;
}): SearchIndex {
  const items: SearchIndex = [];

  for (const project of input.projects) {
    items.push({
      id: `project:${project.slug}`,
      kind: "project",
      title: project.title,
      subtitle: project.category,
      href: `/projects/${project.slug}`,
      keywords: [project.description, project.category].filter(Boolean) as string[],
    });
  }

  for (const article of input.articles) {
    items.push({
      id: `article:${article.slug}`,
      kind: "article",
      title: article.title,
      subtitle: article.project,
      href: `/articles/${article.slug}`,
      keywords: [article.summary].filter(Boolean) as string[],
    });
  }

  for (const tech of input.technologies) {
    items.push({
      id: `tech:${tech.id}`,
      kind: "technology",
      title: tech.name,
      subtitle: tech.category,
      href: `/projects?tech=${tech.id}`,
      keywords: [tech.id],
    });
  }

  return items;
}
