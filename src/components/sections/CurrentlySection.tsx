import type { CurrentlyFrontmatter } from "@/content";
import { hasAnyCurrently } from "@/lib/format";
import { EmptyState } from "@/components/ui/Label";
import styles from "./CurrentlySection.module.css";

const GROUPS: Array<{
  key: keyof CurrentlyFrontmatter;
  label: string;
}> = [
  { key: "building", label: "Building" },
  { key: "exploring", label: "Exploring" },
  { key: "learning", label: "Learning" },
  { key: "next", label: "Next" },
];

export function CurrentlySection({ data }: { data: CurrentlyFrontmatter }) {
  if (!hasAnyCurrently(data)) {
    return (
      <EmptyState
        title="Currently is quiet"
        description="Update content/currently.md to surface what you are building, exploring, learning, and doing next — no code changes required."
      />
    );
  }

  return (
    <div className={styles.grid}>
      {GROUPS.map((group) => {
        const items = data[group.key];
        if (items.length === 0) return null;
        return (
          <section key={group.key} className={styles.group}>
            <h3 className={styles.label}>{group.label}</h3>
            <ul className={styles.list}>
              {items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>
        );
      })}
    </div>
  );
}
