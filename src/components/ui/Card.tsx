import styles from "./Card.module.css";

type CardTone = "default" | "hover" | "active" | "featured";

type CardProps = {
  children: React.ReactNode;
  tone?: CardTone;
  className?: string;
  as?: "div" | "article" | "li" | "section";
  interactive?: boolean;
};

/**
 * Reusable card foundation. Project cards can extend this later.
 * Prefer spacing + border + tonal difference over heavy shadows.
 */
export function Card({
  children,
  tone = "default",
  className,
  as: Tag = "div",
  interactive = false,
}: CardProps) {
  return (
    <Tag
      className={[
        styles.card,
        styles[tone],
        interactive ? styles.interactive : "",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {children}
    </Tag>
  );
}
