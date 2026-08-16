import type { ProfileFrontmatter } from "@/content";
import { SectionLabel } from "@/components/layout/SectionLabel";
import { Button } from "@/components/ui/Button";
import { MagneticCta } from "@/components/ui/MagneticCta";
import { EmptyState } from "@/components/ui/Label";
import { Markdown } from "@/lib/markdown";
import { Prose } from "@/components/typography/Prose";
import { AboutPortrait } from "./AboutPortrait";
import styles from "./AboutHero.module.css";

type AboutHeroProps = {
  profile: ProfileFrontmatter;
  body: string | null;
};

/**
 * About introduction — person first, then positioning and biography.
 * Above-the-fold copy stays visible without scroll Reveal.
 */
export function AboutHero({ profile, body }: AboutHeroProps) {
  const positioning =
    profile.headline
      ?.split("|")
      .map((part) => part.trim())
      .filter(Boolean)
      .join(" · ") ||
    "Data Science · Data Analytics · Business Intelligence";

  const hasLinks = Boolean(
    profile.email || profile.links.github || profile.links.linkedin,
  );

  return (
    <section className={styles.hero} aria-labelledby="about-hero-title">
      <div className={`${styles.portraitCol} ${styles.enter}`}>
        <AboutPortrait
          name={profile.name}
          role={profile.headline?.split("|")[0]?.trim()}
        />
      </div>

      <div className={styles.copyCol}>
        <div className={styles.enter}>
          <SectionLabel label="About" />
        </div>

        <div className={styles.enter} style={{ animationDelay: "60ms" }}>
          <h1 id="about-hero-title" className={styles.title}>
            A <em>Data Science</em> graduate &amp;{" "}
            <em>data analyst</em>.
          </h1>
          {profile.name ? (
            <p className={styles.name}>{profile.name}</p>
          ) : null}
          <p className={styles.positioning}>{positioning}</p>
          {profile.location ? (
            <p className={styles.location}>{profile.location}</p>
          ) : null}
        </div>

        <div
          className={`${styles.bio} ${styles.enter}`}
          style={{ animationDelay: "120ms" }}
        >
          {body ? (
            <Prose>
              <Markdown content={body} />
            </Prose>
          ) : (
            <EmptyState
              title="Professional biography pending"
              description="Add a sourced narrative to content/profile.md."
            />
          )}
        </div>

        <div
          className={`${styles.actions} ${styles.enter}`}
          style={{ animationDelay: "180ms" }}
        >
          {hasLinks ? (
            <>
              {profile.links.linkedin ? (
                <MagneticCta>
                  <Button
                    href={profile.links.linkedin}
                    external
                    variant="primary"
                    arrow
                  >
                    LinkedIn
                  </Button>
                </MagneticCta>
              ) : null}
              {profile.links.github ? (
                <Button
                  href={profile.links.github}
                  external
                  variant="secondary"
                  arrow
                >
                  GitHub
                </Button>
              ) : null}
              {profile.email ? (
                <Button href={`mailto:${profile.email}`} variant="ghost" arrow>
                  Email
                </Button>
              ) : null}
            </>
          ) : (
            <EmptyState
              title="Contact links pending"
              description="Add LinkedIn, GitHub, or email in content/profile.md when available."
            />
          )}
          <MagneticCta>
            <Button
              href="/Michael-Alexander-CV.pdf"
              external
              variant="secondary"
              arrow
            >
              View CV
            </Button>
          </MagneticCta>
          <MagneticCta>
            <Button
              href="/Michael-Alexander-CV.pdf"
              download="Michael-Alexander-CV.pdf"
              variant="secondary"
            >
              Download CV
            </Button>
          </MagneticCta>
        </div>
      </div>
    </section>
  );
}
