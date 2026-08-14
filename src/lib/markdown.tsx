import ReactMarkdown from "react-markdown";
import styles from "./markdown.module.css";

type MarkdownProps = {
  content: string;
  className?: string;
};

/** Minimal markdown renderer for content bodies — no invented copy. */
export function Markdown({ content, className }: MarkdownProps) {
  if (!content.trim()) return null;
  return (
    <div className={[styles.prose, className].filter(Boolean).join(" ")}>
      <ReactMarkdown>{content}</ReactMarkdown>
    </div>
  );
}
