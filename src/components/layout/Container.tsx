import styles from "./Container.module.css";

type ContainerProps = {
  children: React.ReactNode;
  width?: "narrow" | "reading" | "content" | "wide";
  className?: string;
  as?: "div" | "section" | "article" | "main";
};

export function Container({
  children,
  width = "content",
  className,
  as: Tag = "div",
}: ContainerProps) {
  return (
    <Tag
      className={[styles.container, styles[width], className]
        .filter(Boolean)
        .join(" ")}
    >
      {children}
    </Tag>
  );
}
