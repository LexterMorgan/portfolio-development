/**
 * File-based content loader — deterministic, type-safe, static-deployable.
 */

import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import {
  ArticleFrontmatterSchema,
  CurrentlyFrontmatterSchema,
  EducationFrontmatterSchema,
  ExperienceFrontmatterSchema,
  ProfileFrontmatterSchema,
  ProjectFrontmatterSchema,
  SkillsFrontmatterSchema,
  SiteFrontmatterSchema,
  UpdateFrontmatterSchema,
  type ArticleDocument,
  type ArticleFrontmatter,
  type CurrentlyFrontmatter,
  type EducationFrontmatter,
  type ExperienceFrontmatter,
  type MarkdownDocument,
  type ProfileFrontmatter,
  type ProjectDocument,
  type ProjectFrontmatter,
  type ProjectStatus,
  type SkillsFrontmatter,
  type SiteFrontmatter,
  type UpdateFrontmatter,
} from "./types";
import { assertTechStackRegistered } from "./tech-registry";

export const CONTENT_ROOT = path.join(process.cwd(), "content");

function readFile(filePath: string): string {
  return fs.readFileSync(filePath, "utf8");
}

function fileExists(filePath: string): boolean {
  return fs.existsSync(filePath);
}

function parseMarkdown<T>(
  filePath: string,
  schema: { parse: (data: unknown) => T },
): MarkdownDocument<T> {
  const raw = readFile(filePath);
  const { data, content } = matter(raw);
  try {
    const parsed = schema.parse(data);
    return { data: parsed, body: content.trim(), filePath };
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    throw new Error(`Invalid content frontmatter in ${filePath}:\n${message}`);
  }
}

function listDirectories(dir: string): string[] {
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => d.name)
    .sort();
}

function listMarkdownFiles(dir: string): string[] {
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir, { withFileTypes: true })
    .filter((d) => d.isFile() && d.name.endsWith(".md"))
    .map((d) => d.name)
    .sort();
}

export function getProfile(): MarkdownDocument<ProfileFrontmatter> {
  return parseMarkdown(
    path.join(CONTENT_ROOT, "profile.md"),
    ProfileFrontmatterSchema,
  );
}

export function getExperience(): MarkdownDocument<ExperienceFrontmatter> {
  return parseMarkdown(
    path.join(CONTENT_ROOT, "experience.md"),
    ExperienceFrontmatterSchema,
  );
}

export function getEducation(): MarkdownDocument<EducationFrontmatter> {
  return parseMarkdown(
    path.join(CONTENT_ROOT, "education.md"),
    EducationFrontmatterSchema,
  );
}

export function getSkills(): MarkdownDocument<SkillsFrontmatter> {
  return parseMarkdown(
    path.join(CONTENT_ROOT, "skills.md"),
    SkillsFrontmatterSchema,
  );
}

export function getSite(): MarkdownDocument<SiteFrontmatter> {
  return parseMarkdown(path.join(CONTENT_ROOT, "site.md"), SiteFrontmatterSchema);
}

export function getCurrently(): MarkdownDocument<CurrentlyFrontmatter> {
  return parseMarkdown(
    path.join(CONTENT_ROOT, "currently.md"),
    CurrentlyFrontmatterSchema,
  );
}

export function getProject(slug: string): ProjectDocument {
  const projectPath = path.join(CONTENT_ROOT, "projects", slug, "project.md");
  if (!fileExists(projectPath)) {
    throw new Error(`Project not found: ${slug} (${projectPath})`);
  }
  const doc = parseMarkdown(projectPath, ProjectFrontmatterSchema);
  if (doc.data.slug !== slug) {
    throw new Error(
      `Project slug mismatch: folder "${slug}" vs frontmatter "${doc.data.slug}" in ${projectPath}`,
    );
  }
  assertTechStackRegistered(doc.data.tech_stack, `project:${slug}`);

  const articlesDir = path.join(CONTENT_ROOT, "projects", slug, "articles");
  const discovered = listMarkdownFiles(articlesDir).map((f) =>
    f.replace(/\.md$/, ""),
  );
  const articleSlugs = Array.from(
    new Set([...doc.data.articles, ...discovered]),
  ).sort();

  return { ...doc, articleSlugs };
}

export function getAllProjects(): ProjectDocument[] {
  const root = path.join(CONTENT_ROOT, "projects");
  return listDirectories(root).map((slug) => getProject(slug));
}

export function getProjectsByStatus(status: ProjectStatus): ProjectDocument[] {
  return getAllProjects().filter((p) => p.data.status === status);
}

export function getFeaturedProjects(): ProjectDocument[] {
  return getAllProjects().filter((p) => p.data.featured);
}

export function getArticle(
  projectSlug: string,
  articleSlug: string,
): ArticleDocument {
  const filePath = path.join(
    CONTENT_ROOT,
    "projects",
    projectSlug,
    "articles",
    `${articleSlug}.md`,
  );
  if (!fileExists(filePath)) {
    throw new Error(`Article not found: ${projectSlug}/${articleSlug}`);
  }
  const doc = parseMarkdown(filePath, ArticleFrontmatterSchema);
  if (doc.data.slug !== articleSlug) {
    throw new Error(
      `Article slug mismatch: file "${articleSlug}" vs frontmatter "${doc.data.slug}"`,
    );
  }
  if (doc.data.project !== projectSlug) {
    throw new Error(
      `Article project mismatch: folder "${projectSlug}" vs frontmatter.project "${doc.data.project}" in ${filePath}`,
    );
  }
  return doc;
}

export function getArticlesForProject(projectSlug: string): ArticleDocument[] {
  const project = getProject(projectSlug);
  return project.articleSlugs.map((slug) => getArticle(projectSlug, slug));
}

export function getAllArticles(): ArticleDocument[] {
  return getAllProjects().flatMap((p) =>
    p.articleSlugs.map((slug) => getArticle(p.data.slug, slug)),
  );
}

export function getUpdate(slug: string): MarkdownDocument<UpdateFrontmatter> {
  const filePath = path.join(CONTENT_ROOT, "updates", `${slug}.md`);
  if (!fileExists(filePath)) {
    throw new Error(`Update not found: ${slug}`);
  }
  const doc = parseMarkdown(filePath, UpdateFrontmatterSchema);
  if (doc.data.slug !== slug) {
    throw new Error(
      `Update slug mismatch: file "${slug}" vs frontmatter "${doc.data.slug}"`,
    );
  }
  return doc;
}

export function getAllUpdates(): MarkdownDocument<UpdateFrontmatter>[] {
  const dir = path.join(CONTENT_ROOT, "updates");
  return listMarkdownFiles(dir)
    .map((f) => getUpdate(f.replace(/\.md$/, "")))
    .sort((a, b) => b.data.date.localeCompare(a.data.date));
}

/**
 * Full-content validation for CI / local scripts.
 * Throws on the first hard failure; collectors can wrap if needed.
 */
export function validateAllContent(): {
  projects: number;
  articles: number;
  updates: number;
} {
  getProfile();
  getExperience();
  getEducation();
  getSkills();
  getSite();
  getCurrently();
  const projects = getAllProjects();
  const articles = getAllArticles();
  const updates = getAllUpdates();

  // Ensure every article's project exists (already enforced by folder layout,
  // but also check frontmatter-only references on projects).
  for (const project of projects) {
    for (const articleSlug of project.data.articles) {
      getArticle(project.data.slug, articleSlug);
    }
  }

  return {
    projects: projects.length,
    articles: articles.length,
    updates: updates.length,
  };
}

export type {
  ArticleFrontmatter,
  CurrentlyFrontmatter,
  EducationFrontmatter,
  ExperienceFrontmatter,
  ProfileFrontmatter,
  ProjectFrontmatter,
  SkillsFrontmatter,
  SiteFrontmatter,
  UpdateFrontmatter,
};
