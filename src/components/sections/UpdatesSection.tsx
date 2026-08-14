import type { MarkdownDocument, UpdateFrontmatter } from "@/content";
import { formatDate } from "@/lib/format";
import { EmptyState } from "@/components/ui/Label";
import { Markdown } from "@/lib/markdown";
import styles from "./UpdatesSection.module.css";

export function UpdatesSection({
  updates,
  limit,
}: {
  updates: MarkdownDocument<UpdateFrontmatter>[];
  limit?: number;
}) {
  const items = typeof limit === "number" ? updates.slice(0, limit) : updates;

  if (items.length === 0) {
    return (
      <EmptyState
        title="No updates yet"
        description="Changelog entries from content/updates/ will appear here."
      />
    );
  }

  return (
    <ol className={styles.list}>
      {items.map((update) => (
        <li key={update.data.slug} className={styles.item}>
          <div className={styles.meta}>
            <time dateTime={update.data.date}>
              {formatDate(update.data.date) ?? update.data.date}
            </time>
            {update.data.tags.length > 0 ? (
              <span className={styles.tags}>{update.data.tags.join(" · ")}</span>
            ) : null}
          </div>
          <h3 className={styles.title}>{update.data.title}</h3>
          <Markdown content={update.body} className={styles.body} />
        </li>
      ))}
    </ol>
  );
}
