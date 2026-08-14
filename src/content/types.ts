/**
 * Content domain types and Zod schemas.
 * Content lives in /content; UI must not hardcode portfolio facts.
 */

import { z } from "zod";

/** Project lifecycle status — drives future homepage sections. */
export const ProjectStatusSchema = z.enum([
  "idea",
  "planned",
  "in-progress",
  "completed",
  "archived",
]);
export type ProjectStatus = z.infer<typeof ProjectStatusSchema>;

export const ArticleStatusSchema = z.enum(["draft", "published", "archived"]);
export type ArticleStatus = z.infer<typeof ArticleStatusSchema>;

export const TechCategorySchema = z.enum([
  "data",
  "database",
  "frontend",
  "backend",
  "bi",
  "ml",
  "devops",
  "deployment",
  "tooling",
  "other",
]);
export type TechCategory = z.infer<typeof TechCategorySchema>;

/**
 * Tech stack: category → list of canonical tech IDs from the registry.
 * Categories are optional; projects only include what applies.
 */
export const TechStackSchema = z
  .record(TechCategorySchema, z.array(z.string().min(1)))
  .default({});
export type TechStack = z.infer<typeof TechStackSchema>;

export const ProjectLinksSchema = z
  .object({
    live: z.string().url().optional(),
    github: z.string().url().optional(),
    explore: z.string().optional(),
  })
  .default({});
export type ProjectLinks = z.infer<typeof ProjectLinksSchema>;

/** 5W1H — fields may be omitted until sourced. */
export const FiveW1HSchema = z
  .object({
    what: z.string().optional(),
    why: z.string().optional(),
    who: z.string().optional(),
    when: z.string().optional(),
    where: z.string().optional(),
    how: z.string().optional(),
  })
  .default({});
export type FiveW1H = z.infer<typeof FiveW1HSchema>;

export const EvidenceCategorySchema = z.enum([
  "observed",
  "derived",
  "assumption",
  "unknown",
]);
export type EvidenceCategory = z.infer<typeof EvidenceCategorySchema>;

export const FindingSchema = z.object({
  summary: z.string().min(1),
  evidence: EvidenceCategorySchema.default("unknown"),
  source: z.string().optional(),
});
export type Finding = z.infer<typeof FindingSchema>;

export const ProjectFrontmatterSchema = z.object({
  slug: z.string().min(1),
  title: z.string().min(1),
  subtitle: z.string().optional(),
  category: z.string().optional(),
  status: ProjectStatusSchema,
  featured: z.boolean().default(false),
  /** ISO date or year string when known; omit if unknown. */
  date: z.string().optional(),
  year: z.number().int().optional(),
  description: z.string().optional(),
  tech_stack: TechStackSchema,
  links: ProjectLinksSchema,
  hero: z.string().optional(),
  thumbnail: z.string().optional(),
  five_w1h: FiveW1HSchema,
  findings: z.array(FindingSchema).default([]),
  limitations: z.array(z.string()).default([]),
  /** Explicit article slugs; loaders also discover files under articles/. */
  articles: z.array(z.string()).default([]),
});
export type ProjectFrontmatter = z.infer<typeof ProjectFrontmatterSchema>;

export const ArticleFrontmatterSchema = z.object({
  slug: z.string().min(1),
  title: z.string().min(1),
  summary: z.string().optional(),
  /** Stable project slug — required relationship. */
  project: z.string().min(1),
  category: z.string().optional(),
  tags: z.array(z.string()).default([]),
  date: z.string().optional(),
  reading_time_minutes: z.number().positive().optional(),
  featured: z.boolean().default(false),
  status: ArticleStatusSchema.default("draft"),
});
export type ArticleFrontmatter = z.infer<typeof ArticleFrontmatterSchema>;

export const ProfileFrontmatterSchema = z.object({
  name: z.string().optional(),
  headline: z.string().optional(),
  location: z.string().optional(),
  email: z.string().email().optional(),
  links: z
    .object({
      github: z.string().url().optional(),
      linkedin: z.string().url().optional(),
      website: z.string().url().optional(),
    })
    .default({}),
});
export type ProfileFrontmatter = z.infer<typeof ProfileFrontmatterSchema>;

export const ExperienceLayerSchema = z.enum(["primary", "additional"]);
export type ExperienceLayer = z.infer<typeof ExperienceLayerSchema>;

export const ExperienceEntrySchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  organization: z.string().optional(),
  location: z.string().optional(),
  start: z.string().optional(),
  end: z.string().optional(),
  summary: z.string().optional(),
  highlights: z.array(z.string()).default([]),
  /** primary = data/analytics/BI focus; additional = broader professional context */
  layer: ExperienceLayerSchema.default("primary"),
});
export type ExperienceEntry = z.infer<typeof ExperienceEntrySchema>;

export const ExperienceFrontmatterSchema = z.object({
  entries: z.array(ExperienceEntrySchema).default([]),
});
export type ExperienceFrontmatter = z.infer<typeof ExperienceFrontmatterSchema>;

export const EducationEntrySchema = z.object({
  id: z.string().min(1),
  institution: z.string().min(1),
  credential: z.string().optional(),
  field: z.string().optional(),
  start: z.string().optional(),
  end: z.string().optional(),
  summary: z.string().optional(),
});
export type EducationEntry = z.infer<typeof EducationEntrySchema>;

export const EducationFrontmatterSchema = z.object({
  entries: z.array(EducationEntrySchema).default([]),
});
export type EducationFrontmatter = z.infer<typeof EducationFrontmatterSchema>;

export const SkillGroupSchema = z.object({
  id: z.string().min(1),
  label: z.string().min(1),
  /** Canonical tech IDs from the registry — not proficiency scores. */
  technologies: z.array(z.string()).default([]),
});
export type SkillGroup = z.infer<typeof SkillGroupSchema>;

export const SkillsFrontmatterSchema = z.object({
  groups: z.array(SkillGroupSchema).default([]),
});
export type SkillsFrontmatter = z.infer<typeof SkillsFrontmatterSchema>;

export const SiteFrontmatterSchema = z.object({
  title: z.string().min(1),
  description: z.string().optional(),
  language: z.string().default("en"),
});
export type SiteFrontmatter = z.infer<typeof SiteFrontmatterSchema>;

export const CurrentlyFrontmatterSchema = z.object({
  building: z.array(z.string()).default([]),
  exploring: z.array(z.string()).default([]),
  learning: z.array(z.string()).default([]),
  next: z.array(z.string()).default([]),
});
export type CurrentlyFrontmatter = z.infer<typeof CurrentlyFrontmatterSchema>;

export const UpdateFrontmatterSchema = z.object({
  slug: z.string().min(1),
  title: z.string().min(1),
  date: z.string().min(1),
  tags: z.array(z.string()).default([]),
});
export type UpdateFrontmatter = z.infer<typeof UpdateFrontmatterSchema>;

/** Loaded document shapes (frontmatter + markdown body). */
export type MarkdownDocument<T> = {
  data: T;
  body: string;
  filePath: string;
};

export type ProjectDocument = MarkdownDocument<ProjectFrontmatter> & {
  articleSlugs: string[];
};

export type ArticleDocument = MarkdownDocument<ArticleFrontmatter>;
