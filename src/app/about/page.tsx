import {
  getEducation,
  getExperience,
  getProfile,
  getRecognition,
  getSkills,
} from "@/content";
import { buildPageMetadata } from "@/lib/metadata";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/layout/SectionHeading";
import { AboutHero } from "@/components/about/AboutHero";
import { ExperienceTimeline } from "@/components/about/ExperienceTimeline";
import { EducationShowcase } from "@/components/about/EducationShowcase";
import { AboutProcess } from "@/components/about/AboutProcess";
import { RecognitionList } from "@/components/about/RecognitionList";
import { SkillsGrid } from "@/components/about/SkillsGrid";
import { WhatIDoSection } from "@/components/about/WhatIDoSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { Reveal } from "@/components/ui/Reveal";
import styles from "./about.module.css";

export function generateMetadata() {
  return buildPageMetadata({
    title: "About",
    description:
      "Profile, approach, experience, and verified technical stack — Data Science, Analytics, and Business Intelligence.",
    path: "/about",
  });
}

export default function AboutPage() {
  const profile = getProfile();
  const experience = getExperience();
  const education = getEducation();
  const recognition = getRecognition();
  const skills = getSkills();

  const profileBody =
    profile.body && !/intentionally unresolved/i.test(profile.body)
      ? profile.body
      : null;

  const experienceEntries = experience.data.entries;
  const recognitionEntries = recognition.data.entries;
  const skillGroups = skills.data.groups;

  return (
    <main className={styles.page}>
      <Container width="wide">
        <AboutHero profile={profile.data} body={profileBody} />
      </Container>

      <Section id="approach" spaced="default">
        <Container width="wide">
          <Reveal>
            <SectionHeading
              index="01"
              label="Approach"
              title="How I work with data"
              description="A concise working method — not a project case study. Problem first, then structure, analysis, and usable interfaces."
            />
          </Reveal>
          <AboutProcess />
        </Container>
      </Section>

      <Section id="experience" spaced="default" tone="muted">
        <Container width="wide">
          <Reveal>
            <SectionHeading
              index="02"
              label="Background"
              title="Experience"
              description="Verified roles from the CV. Tools listed per role are limited to what that role source supports."
            />
          </Reveal>
          <ExperienceTimeline entries={experienceEntries} />
        </Container>
      </Section>

      <Section id="education" spaced="default">
        <Container width="wide">
          <Reveal>
            <SectionHeading
              index="03"
              label="Learning"
              title="Education"
              description="Academic foundation for analytical practice — sourced entries only."
            />
          </Reveal>
          <EducationShowcase entries={education.data.entries} />
        </Container>
      </Section>

      {skillGroups.length > 0 ? (
        <Section id="tools" spaced="default">
          <Container width="wide">
            <Reveal>
              <SectionHeading
                index="04"
                label="Tools"
                title="Stack & tools"
                description="Full verified technology ecosystem. Role-specific tools stay on the experience cards above."
              />
            </Reveal>
            <SkillsGrid groups={skillGroups} />
          </Container>
        </Section>
      ) : null}

      {recognitionEntries.length > 0 ? (
        <Section id="recognition" spaced="default">
          <Container width="wide">
            <Reveal>
              <SectionHeading
                index="05"
                label="Recognition"
                title="Awards & Certifications"
              />
            </Reveal>
            <RecognitionList entries={recognitionEntries} />
          </Container>
        </Section>
      ) : null}

      <Section id="practice" spaced="default">
        <Container width="wide">
          <WhatIDoSection />
        </Container>
      </Section>

      <Section id="contact" spaced="loose">
        <Container width="wide">
          <ContactSection
            email={profile.data.email}
            links={profile.data.links}
            eyebrow="07 / Contact"
            title={
              <>
                Let&apos;s talk about
                <br />
                the next analytical problem.
              </>
            }
            body="For collaborations in analytics, BI systems, or data products — use the channels below."
          />
        </Container>
      </Section>
    </main>
  );
}
