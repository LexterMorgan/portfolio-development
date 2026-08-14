import type { ProjectStatus } from "@/content";

const STATUS_LABELS: Record<ProjectStatus, string> = {
  idea: "Idea",
  planned: "Planned",
  "in-progress": "Building",
  completed: "Completed",
  archived: "Archived",
};

export function formatProjectStatus(status: ProjectStatus): string {
  return STATUS_LABELS[status];
}

export function formatDate(value?: string): string | undefined {
  if (!value) return undefined;
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return value;
  return parsed.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export function formatReadingTime(minutes?: number): string | undefined {
  if (!minutes) return undefined;
  return `${minutes} min read`;
}

export function padIndex(index: number, width = 2): string {
  return String(index).padStart(width, "0");
}

/** Flatten tech stack category map into ordered unique IDs. */
export function flattenTechIds(
  stack: Partial<Record<string, string[]>>,
): string[] {
  const order = [
    "data",
    "database",
    "bi",
    "ml",
    "backend",
    "frontend",
    "devops",
    "deployment",
    "tooling",
    "other",
  ];
  const seen = new Set<string>();
  const ids: string[] = [];
  for (const category of order) {
    for (const id of stack[category] ?? []) {
      if (!seen.has(id)) {
        seen.add(id);
        ids.push(id);
      }
    }
  }
  for (const [category, list] of Object.entries(stack)) {
    if (order.includes(category)) continue;
    for (const id of list ?? []) {
      if (!seen.has(id)) {
        seen.add(id);
        ids.push(id);
      }
    }
  }
  return ids;
}

export function hasAnyCurrently(data: {
  building: string[];
  exploring: string[];
  learning: string[];
  next: string[];
}): boolean {
  return (
    data.building.length +
      data.exploring.length +
      data.learning.length +
      data.next.length >
    0
  );
}
