import {
  getCurrently,
  getEducation,
  getExperience,
  getProfile,
  getSkills,
} from "@/content";
import { getTech } from "@/content";
import { buildPageMetadata } from "@/lib/metadata";
import { Markdown } from "@/lib/markdown";
import { Container } from "@/components/layout/Container";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { SectionHeading } from "@/components/layout/SectionHeading";
import { ExperienceItem } from "@/components/experience/ExperienceItem";
import { CurrentlySection } from "@/components/sections/CurrentlySection";
import { TechBadge } from "@/components/tech/TechBadge";
import { EmptyState } from "@/components/ui/Label";
import { Button } from "@/components/ui/Button";
import { Prose } from "@/components/typography/Prose";
import styles from "./about.module.css";

export function generateMetadata() {
  return buildPageMetadata({
    title: "About",
    description:
      "Background, experience, and capabilities — Data Science, Analytics, and BI.",
    path: "/about",
  });
}

export default function AboutPage() {
  const profile = getProfile();
  const experience = getExperience();
  const education = getEducation();
  const skills = getSkills();
  const currently = getCurrently();

  const primary = experience.data.entries.filter(
    (entry) => entry.layer !== "additional",
  );
  const additional = experience.data.entries.filter(
    (entry) => entry.layer === "additional",
  );

  const profileBody =
    profile.body && !/intentionally unresolved/i.test(profile.body)
      ? profile.body
      : null;

  return (
    <main>
      <Container width="reading">
        <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "About" }]} />
        <SectionHeading
          eyebrow="About"
          title={profile.data.name || "About"}
          description={
            profile.data.headline ||
            "Data Science Graduate · Data Analytics · Business Intelligence"
          }
        />

        {profileBody ? (
          <Prose>
            <Markdown content={profileBody} />
          </Prose>
        ) : (
          <EmptyState
            title="Professional summary pending"
            description="Add a sourced narrative to content/profile.md. This page complements a CV rather than replacing it."
          />
        )}

        <div className={styles.actions}>
          {profile.data.email ? (
            <Button href={`mailto:${profile.data.email}`} variant="primary" arrow>
              Email
            </Button>
          ) : null}
          {profile.data.links.github ? (
            <Button href={profile.data.links.github} external variant="secondary">
              GitHub
            </Button>
          ) : null}
          {profile.data.links.linkedin ? (
            <Button href={profile.data.links.linkedin} external variant="ghost">
              LinkedIn
            </Button>
          ) : null}
        </div>
      </Container>

      <Container width="wide" className={styles.blocks}>
        <section>
          <SectionHeading
            eyebrow="Experience"
            title="Primary focus"
            description="Data, analytics, and BI responsibilities when present in content."
          />
          {primary.length > 0 ? (
            primary.map((entry) => (
              <ExperienceItem key={entry.id} entry={entry} />
            ))
          ) : (
            <EmptyState
              title="No primary experience entries"
              description="Add sourced roles to content/experience.md with layer: primary."
            />
          )}
        </section>

        <section>
          <SectionHeading
            eyebrow="Broader context"
            title="Additional experience"
            description="Organizational and cross-functional work when documented."
          />
          {additional.length > 0 ? (
            additional.map((entry) => (
              <ExperienceItem key={entry.id} entry={entry} />
            ))
          ) : (
            <EmptyState
              title="No additional experience entries"
              description="Optional broader roles can use layer: additional in content/experience.md."
            />
          )}
        </section>

        <section>
          <SectionHeading eyebrow="Education" title="Education" />
          {education.data.entries.length > 0 ? (
            <ul className={styles.eduList}>
              {education.data.entries.map((entry) => (
                <li key={entry.id} className={styles.eduItem}>
                  <h3>{entry.institution}</h3>
                  <p>
                    {[entry.credential, entry.field].filter(Boolean).join(" · ")}
                  </p>
                  <p className={styles.eduMeta}>
                    {[entry.start, entry.end].filter(Boolean).join(" — ")}
                  </p>
                  {entry.summary ? <p>{entry.summary}</p> : null}
                </li>
              ))}
            </ul>
          ) : (
            <EmptyState
              title="Education pending"
              description="Add sourced education entries to content/education.md."
            />
          )}
        </section>

        <section>
          <SectionHeading
            eyebrow="Skills"
            title="Capabilities"
            description="Technologies as registry IDs — not proficiency percentages."
          />
          {skills.data.groups.length > 0 ? (
            <div className={styles.skillGroups}>
              {skills.data.groups.map((group) => (
                <div key={group.id} className={styles.skillGroup}>
                  <h3>{group.label}</h3>
                  <ul className={styles.skillList}>
                    {group.technologies.map((id) => (
                      <li key={id}>
                        {getTech(id) ? (
                          <TechBadge id={id} showDescription />
                        ) : (
                          <span>{id}</span>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          ) : (
            <EmptyState
              title="Skills pending verification"
              description="List verified technology IDs in content/skills.md after checking source repositories."
            />
          )}
        </section>

        <section>
          <SectionHeading eyebrow="Now" title="Currently" />
          <CurrentlySection data={currently.data} />
        </section>
      </Container>
    </main>
  );
}
