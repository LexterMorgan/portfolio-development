/**
 * Technology icon registry.
 * Projects reference canonical IDs; UI renders via TechBadge / TechStackList.
 *
 * Do not invent technologies for projects. Only register IDs that
 * content may legitimately reference after source verification.
 */

import type { TechCategory } from "./types";

export type TechIconEntry = {
  id: string;
  name: string;
  category: TechCategory;
  icon?: string;
  description?: string;
  color?: string;
};

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
  numpy: {
    id: "numpy",
    name: "NumPy",
    category: "data",
    description: "Numerical computing",
  },
  matplotlib: {
    id: "matplotlib",
    name: "Matplotlib",
    category: "bi",
    description: "Analytical charting",
  },
  scikitlearn: {
    id: "scikitlearn",
    name: "scikit-learn",
    category: "ml",
    description: "Machine learning tooling",
  },
  sqlite: {
    id: "sqlite",
    name: "SQLite",
    category: "database",
    description: "Embedded analytical database",
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
  sqlalchemy: {
    id: "sqlalchemy",
    name: "SQLAlchemy",
    category: "database",
    description: "Python database toolkit",
  },
  mysql: {
    id: "mysql",
    name: "MySQL",
    category: "database",
    description: "Relational database",
  },
  mongodb: {
    id: "mongodb",
    name: "MongoDB",
    category: "database",
    description: "Document database",
  },
  r: {
    id: "r",
    name: "R",
    category: "data",
    description: "Statistical programming",
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
  vite: {
    id: "vite",
    name: "Vite",
    category: "tooling",
    description: "Frontend tooling",
  },
  recharts: {
    id: "recharts",
    name: "Recharts",
    category: "bi",
    description: "Interactive charting",
  },
  express: {
    id: "express",
    name: "Express",
    category: "backend",
    description: "API server",
  },
  vercel: {
    id: "vercel",
    name: "Vercel",
    category: "deployment",
    icon: "/icons/tech/vercel.svg",
    description: "Deployment platform",
  },
  git: {
    id: "git",
    name: "Git",
    category: "tooling",
    description: "Version control",
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
  excel: {
    id: "excel",
    name: "Excel",
    category: "bi",
    description: "Spreadsheet analysis",
  },
  lookerstudio: {
    id: "lookerstudio",
    name: "Looker Studio",
    category: "bi",
    description: "Dashboard reporting",
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
