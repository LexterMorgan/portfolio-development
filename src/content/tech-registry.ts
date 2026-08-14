/**
 * Technology icon registry — architecture only (Phase 1).
 * Projects reference canonical IDs; UI renders icons in Phase 2+.
 *
 * Do not invent technologies for projects. Only register IDs that
 * content may legitimately reference after source verification.
 */

import type { TechCategory } from "./types";

export type TechIconEntry = {
  id: string;
  name: string;
  category: TechCategory;
  /** Future path under /public/icons/tech/ — optional until assets exist. */
  icon?: string;
  description?: string;
  /** Optional brand/accent hint for later UI — not used in Phase 1. */
  color?: string;
};

/**
 * Seed registry of common IDs. Presence here does NOT claim the
 * portfolio owner uses the technology — project content must opt in.
 */
export const TECH_REGISTRY: Record<string, TechIconEntry> = {
  python: {
    id: "python",
    name: "Python",
    category: "data",
    icon: "/icons/tech/python.svg",
    description: "Data processing and analysis",
  },
  pandas: {
    id: "pandas",
    name: "pandas",
    category: "data",
    icon: "/icons/tech/pandas.svg",
    description: "Tabular data manipulation",
  },
  sql: {
    id: "sql",
    name: "SQL",
    category: "database",
    icon: "/icons/tech/sql.svg",
    description: "Analytical querying",
  },
  postgresql: {
    id: "postgresql",
    name: "PostgreSQL",
    category: "database",
    icon: "/icons/tech/postgresql.svg",
    description: "Relational / analytical database",
  },
  react: {
    id: "react",
    name: "React",
    category: "frontend",
    icon: "/icons/tech/react.svg",
    description: "Dashboard / interface",
  },
  typescript: {
    id: "typescript",
    name: "TypeScript",
    category: "frontend",
    icon: "/icons/tech/typescript.svg",
    description: "Typed application layer",
  },
  nextjs: {
    id: "nextjs",
    name: "Next.js",
    category: "frontend",
    icon: "/icons/tech/nextjs.svg",
    description: "Web application framework",
  },
  vercel: {
    id: "vercel",
    name: "Vercel",
    category: "deployment",
    icon: "/icons/tech/vercel.svg",
    description: "Deployment platform",
  },
  powerbi: {
    id: "powerbi",
    name: "Power BI",
    category: "bi",
    icon: "/icons/tech/powerbi.svg",
    description: "Business intelligence",
  },
  tableau: {
    id: "tableau",
    name: "Tableau",
    category: "bi",
    icon: "/icons/tech/tableau.svg",
    description: "Business intelligence",
  },
};

export function getTech(id: string): TechIconEntry | undefined {
  return TECH_REGISTRY[id];
}

export function requireTech(id: string): TechIconEntry {
  const entry = getTech(id);
  if (!entry) {
    throw new Error(
      `Unknown technology ID "${id}". Register it in TECH_REGISTRY or fix the content reference.`,
    );
  }
  return entry;
}

export function resolveTechStack(
  stack: Partial<Record<TechCategory, string[]>>,
): Partial<Record<TechCategory, TechIconEntry[]>> {
  const resolved: Partial<Record<TechCategory, TechIconEntry[]>> = {};
  for (const [category, ids] of Object.entries(stack) as [
    TechCategory,
    string[],
  ][]) {
    resolved[category] = ids.map(requireTech);
  }
  return resolved;
}

/** Validate that every ID in a tech_stack exists in the registry. */
export function assertTechStackRegistered(
  stack: Partial<Record<TechCategory, string[]>>,
  context: string,
): void {
  for (const [category, ids] of Object.entries(stack)) {
    for (const id of ids ?? []) {
      if (!getTech(id)) {
        throw new Error(
          `${context}: technology "${id}" in category "${category}" is not in TECH_REGISTRY`,
        );
      }
    }
  }
}
