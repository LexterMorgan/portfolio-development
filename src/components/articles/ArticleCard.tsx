import Link from "next/link";
import type { ArticleDocument } from "@/content";
import { formatDate, formatReadingTime } from "@/lib/format";
import { Label, MetaText } from "@/components/ui/Label";
import styles from "./ArticleCard.module.css";

export function ArticleCard({ article }: { article: ArticleDocument }) {
  const { data } = article;
  const date = formatDate(data.date);
  const reading = formatReadingTime(data.reading_time_minutes);

  return (
    <article className={styles.card}>
      <div className={styles.meta}>
        {data.category ? <Label>{data.category}</Label> : <Label>Insight</Label>}
        {date ? <MetaText>{date}</MetaText> : null}
        {reading ? <MetaText>{reading}</MetaText> : null}
      </div>
      <h3 className={styles.title}>
        <Link href={`/articles/${data.slug}`}>{data.title}</Link>
      </h3>
      {data.summary ? <p className={styles.summary}>{data.summary}</p> : null}
      <p className={styles.project}>
        Related project ·{" "}
        <Link href={`/projects/${data.project}`}>{data.project}</Link>
      </p>
    </article>
  );
}
