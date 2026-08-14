import styles from "./Section.module.css";

type SectionProps = {
  children: React.ReactNode;
  id?: string;
  className?: string;
  tone?: "default" | "muted" | "accent";
  spaced?: "default" | "compact" | "loose";
};

export function Section({
  children,
  id,
  className,
  tone = "default",
  spaced = "default",
}: SectionProps) {
  return (
    <section
      id={id}
      className={[
        styles.section,
        styles[tone],
        styles[`space-${spaced}`],
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {children}
    </section>
  );
}
