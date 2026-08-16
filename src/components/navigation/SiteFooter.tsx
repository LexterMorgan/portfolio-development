import Link from "next/link";
import { Container } from "@/components/layout/Container";
import styles from "./SiteFooter.module.css";

type SiteFooterProps = {
  title: string;
  email?: string;
  links?: {
    github?: string;
    linkedin?: string;
  };
};

export function SiteFooter({ title, email, links }: SiteFooterProps) {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <Container width="wide" className={styles.inner}>
        <div className={styles.brandBlock}>
          <p className={styles.title}>{title}</p>
          <p className={styles.copy}>
            Data Science · Data Analytics · Business Intelligence
          </p>
        </div>

        <div className={styles.cols}>
          <div>
            <p className={styles.colLabel}>Navigate</p>
            <ul className={styles.list}>
              <li>
                <Link href="/">Home</Link>
              </li>
              <li>
                <Link href="/projects">Projects</Link>
              </li>
              <li>
                <Link href="/about">About</Link>
              </li>
            </ul>
          </div>
          <div>
            <p className={styles.colLabel}>Connect</p>
            <ul className={styles.list}>
              {email ? (
                <li>
                  <a href={`mailto:${email}`}>{email}</a>
                </li>
              ) : (
                <li className={styles.muted}>Email pending</li>
              )}
              {links?.github ? (
                <li>
                  <a href={links.github} target="_blank" rel="noopener noreferrer">
                    GitHub
                  </a>
                </li>
              ) : null}
              {links?.linkedin ? (
                <li>
                  <a
                    href={links.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    LinkedIn
                  </a>
                </li>
              ) : null}
            </ul>
          </div>
        </div>
      </Container>
      <Container width="wide" className={styles.bottom}>
        <p className={styles.note}>© {year} {title}</p>
      </Container>
    </footer>
  );
}
