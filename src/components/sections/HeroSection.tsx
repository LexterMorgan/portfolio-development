import { Button } from "@/components/ui/Button";
import { MagneticCta } from "@/components/ui/MagneticCta";
import { Container } from "@/components/layout/Container";
import styles from "./HeroSection.module.css";

type HeroSectionProps = {
  headline?: string;
  name?: string;
  location?: string;
  body?: string;
  /** Editorial H1 lines from content/profile.md (hero_title_lines). */
  titleLines?: string[];
  /** Sourced credibility facts (hero_facts) rendered as mono chips. */
  facts?: string[];
  links?: {
    github?: string;
    linkedin?: string;
  };
  email?: string;
};

/**
 * Home hero — positioning only. Tech stack lives on About and Projects.
 * Title lines, lede, and facts come from content; falls back to the
 * profile headline split when hero fields are absent.
 */
export function HeroSection({
  name,
  location,
  body,
  titleLines,
  facts,
  links,
  email,
}: HeroSectionProps) {
  const lines =
    titleLines && titleLines.length > 0
      ? titleLines
      : ["Data Science Graduate", "Business Intelligence", "Data Analyst"];

  return (
    <section className={styles.hero} aria-labelledby="home-hero-title">
      <div className={styles.wash} aria-hidden />

      <Container width="wide" className={styles.inner}>
        <div className={styles.copy}>
          <p className={`${styles.kicker} ${styles.enter} ${styles.d1}`}>
            <span className={styles.dot} aria-hidden />
            {location || "Data Science Graduate"}
          </p>

          {name ? (
            <p className={`${styles.name} ${styles.enter} ${styles.d1}`}>{name}</p>
          ) : null}

          <h1 id="home-hero-title" className={`${styles.title} ${styles.enter} ${styles.d2}`}>
            {lines.map((line, i) => (
              <span
                key={line}
                className={i === Math.min(1, lines.length - 1) ? styles.lineAccent : styles.line}
              >
                {line}
              </span>
            ))}
          </h1>

          <p className={`${styles.lede} ${styles.enter} ${styles.d3}`}>
            {body?.trim()}
          </p>

          {facts && facts.length > 0 ? (
            <ul className={`${styles.facts} ${styles.enter} ${styles.d35}`}>
              {facts.map((fact) => (
                <li key={fact} className={styles.fact}>
                  <span className={styles.factDot} aria-hidden />
                  {fact}
                </li>
              ))}
            </ul>
          ) : null}

          <div className={`${styles.actions} ${styles.enter} ${styles.d4}`}>
            <MagneticCta>
              <Button href="/projects" variant="primary" arrow>
                Explore Projects
              </Button>
            </MagneticCta>
            <MagneticCta>
              <Button href="/about" variant="secondary">
                About Me
              </Button>
            </MagneticCta>
          </div>

          <div className={`${styles.bottom} ${styles.enter} ${styles.d5}`}>
            <div className={styles.socials}>
              {links?.linkedin ? (
                <a href={links.linkedin} target="_blank" rel="noopener noreferrer">
                  LinkedIn ↗
                </a>
              ) : null}
              {links?.github ? (
                <a href={links.github} target="_blank" rel="noopener noreferrer">
                  GitHub ↗
                </a>
              ) : null}
              {email ? <a href={`mailto:${email}`}>Email ↗</a> : null}
            </div>
            <a href="#about" className={styles.scroll}>
              Scroll Down →
            </a>
          </div>
        </div>
      </Container>
    </section>
  );
}
