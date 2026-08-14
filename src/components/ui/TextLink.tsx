import Link from "next/link";
import styles from "./TextLink.module.css";

type TextLinkProps = {
  href: string;
  children: React.ReactNode;
  external?: boolean;
  arrow?: boolean;
  className?: string;
};

export function TextLink({
  href,
  children,
  external = false,
  arrow = false,
  className,
}: TextLinkProps) {
  const classes = [styles.link, className].filter(Boolean).join(" ");
  const content = (
    <>
      <span>{children}</span>
      {arrow ? <span aria-hidden className={styles.arrow}>→</span> : null}
      {external ? <span className="sr-only"> (opens in new tab)</span> : null}
    </>
  );

  if (external) {
    return (
      <a
        href={href}
        className={classes}
        target="_blank"
        rel="noopener noreferrer"
      >
        {content}
      </a>
    );
  }

  return (
    <Link href={href} className={classes}>
      {content}
    </Link>
  );
}
