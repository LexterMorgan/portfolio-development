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
  /** Availability line (hero_status) shown in the lower-right side metadata. */
  status?: string;
  /** Focus lines (hero_focus) for the side metadata block. */
  focus?: string[];
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
 * The middle title line renders as the italic serif contrast phrase.
 */
export function HeroSection({
  name,
  headline,
  location,
  body,
  titleLines,
  facts,
  status,
  focus,
  links,
  email,
}: HeroSectionProps) {
  const lines =
    titleLines && titleLines.length > 0
      ? titleLines
      : ["Data Science Graduate", "Business Intelligence", "Data Analyst"];
  const contrast = Math.min(1, lines.length - 1);

  return (
    <section className={styles.hero} aria-labelledby="home-hero-title">
      <div className={styles.wash} aria-hidden />

      <Container width="wide" className={styles.inner}>
        <p className={`${styles.kicker} ${styles.enter} ${styles.d1}`}>
          <span className={styles.dot} aria-hidden />
          {location || "Data Science Graduate"}
        </p>

        {name ? (
          <p className={`${styles.name} ${styles.enter} ${styles.d1}`}>{name}</p>
        ) : null}

        <h1 id="home-hero-title" className={styles.title}>
          {lines.map((line, i) => {
            const serif = i === contrast;
            const Tag = serif ? "em" : "span";
            return (
              <Tag
                key={line}
                style={{ animationDelay: `${140 + i * 120}ms` }}
                className={`${serif ? styles.lineSerif : styles.line} ${styles.lineEnter} ${
                  i === 2 ? styles.lineIndent : ""
                }`}
              >
                {line}
              </Tag>
            );
          })}
        </h1>

        <div className={styles.copy}>
          <p className={`${styles.lede} ${styles.enter} ${styles.d3}`}>
            {body?.trim()}
          </p>

          {headline ? (
            <p className={`${styles.meta} ${styles.enter} ${styles.d3}`}>
              {headline}
            </p>
          ) : null}

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

          <div className={`${styles.socials} ${styles.enter} ${styles.d5}`}>
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
        </div>

        {status || (focus && focus.length > 0) ? (
          <aside className={`${styles.sideMeta} ${styles.enter} ${styles.d4}`}>
            {focus && focus.length > 0 ? (
              <div className={styles.sideGroup}>
                <p className={styles.sideLabel}>Focus</p>
                {focus.map((line) => (
                  <p key={line} className={styles.sideValue}>
                    {line}
                  </p>
                ))}
              </div>
            ) : null}
            {status ? (
              <div className={styles.sideGroup}>
                <p className={styles.sideLabel}>Status</p>
                <p className={styles.sideValue}>{status}</p>
              </div>
            ) : null}
          </aside>
        ) : null}
      </Container>
    </section>
  );
}
