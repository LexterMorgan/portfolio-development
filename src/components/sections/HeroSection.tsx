import { Button } from "@/components/ui/Button";
import styles from "./HeroSection.module.css";

type HeroSectionProps = {
  headline?: string;
  name?: string;
  body?: string;
  links?: {
    github?: string;
    linkedin?: string;
  };
};

export function HeroSection({ headline, name, body, links }: HeroSectionProps) {
  return (
    <div className={`${styles.hero} reveal`}>
      <div className={styles.copy}>
        <p className={styles.eyebrow}>Personal work journal</p>
        {name ? <p className={styles.name}>{name}</p> : null}
        <h1 className={styles.title}>
          {headline ||
            "Data Science Graduate · Data Analytics · Business Intelligence"}
        </h1>
        <p className={styles.lede}>
          {body?.trim() ||
            "Building analytical case studies and data products that connect problem framing, rigorous analysis, and usable interfaces — without inventing outcomes."}
        </p>
        <div className={styles.actions}>
          <Button href="/projects" variant="primary" arrow>
            Explore Work
          </Button>
          <Button href="/about" variant="secondary">
            About
          </Button>
          {links?.github ? (
            <Button href={links.github} external variant="ghost">
              GitHub
            </Button>
          ) : null}
          {links?.linkedin ? (
            <Button href={links.linkedin} external variant="ghost">
              LinkedIn
            </Button>
          ) : null}
        </div>
      </div>

      <aside className={styles.panel} aria-label="Positioning summary">
        <p className={styles.panelLabel}>Focus</p>
        <ul className={styles.panelList}>
          <li>Data Analytics</li>
          <li>Business Intelligence</li>
          <li>SQL / PostgreSQL</li>
          <li>Python workflows</li>
          <li>Dashboard products</li>
        </ul>
        <p className={styles.panelNote}>
          Claims stay traceable to source material. Unknowns remain unresolved.
        </p>
      </aside>
    </div>
  );
}
