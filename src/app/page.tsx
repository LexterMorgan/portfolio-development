import {
  getBuildingProjects,
  getExperience,
  getProfile,
  getRecognition,
  getSelectedProjects,
} from "@/content";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/layout/SectionHeading";
import { HeroSection } from "@/components/sections/HeroSection";
import { AboutPositioning } from "@/components/sections/AboutPositioning";
import { HomeExperience } from "@/components/sections/HomeExperience";
import { ProjectGrid } from "@/components/projects/ProjectGrid";
import { RecognitionList } from "@/components/about/RecognitionList";
import { EmptyState } from "@/components/ui/Label";
import { TextLink } from "@/components/ui/TextLink";
import { Marquee } from "@/components/ui/Marquee";
import { Reveal } from "@/components/ui/Reveal";

function domainMarquee(headline?: string): string[] {
  const domains = headline
    ? headline
        .split(/\s*[|/·]\s*/)
        .map((part) => part.trim().toUpperCase())
        .filter(Boolean)
    : ["DATA SCIENCE", "DATA ANALYTICS", "BUSINESS INTELLIGENCE"];
  return Array.from(
    new Set([
      ...domains,
      "CUSTOMER ANALYTICS",
      "COMMERCIAL BI",
      "MARKET INTELLIGENCE",
      "COMMUNICATION INTELLIGENCE",
    ]),
  );
}

export default function HomePage() {
  const profile = getProfile();
  const selected = getSelectedProjects();
  const building = getBuildingProjects();
  const work = selected.length > 0 ? selected : building;
  const experience = getExperience().data.entries;
  const recognition = getRecognition().data.entries;

  const heroBody =
    "Data Science graduate based in Jakarta — statistical analysis, data modeling, ETL, and analytical programming across customer analytics, commercial BI, market research, and communication intelligence.";

  const aboutBody =
    "Jakarta-based Data Science graduate focused on analytics, BI systems, and clear problem framing. Projects hold the case studies; About covers background and method.";

  const marquee = domainMarquee(profile.data.headline);

  return (
    <main>
      <HeroSection
        name={profile.data.name}
        location={profile.data.location}
        body={heroBody}
        links={profile.data.links}
        email={profile.data.email}
      />

      <Section id="about" spaced="loose">
        <Container width="wide">
          <AboutPositioning
            name={profile.data.name}
            headline={profile.data.headline}
            body={aboutBody}
          />
        </Container>
      </Section>

      <Section id="work" spaced="default">
        <Container width="wide">
          <Reveal>
            <SectionHeading
              index="02"
              label="Selected Work"
              title="Featured Projects"
              description="Customer risk, market evidence, communication intelligence, and commercial BI — four distinct analytical questions."
              meta={`${work.length} projects`}
              align="split"
              action={
                <TextLink href="/projects" arrow>
                  View All Projects
                </TextLink>
              }
            />
          </Reveal>
          {work.length > 0 ? (
            <ProjectGrid projects={work} />
          ) : (
            <EmptyState
              title="Selected work is not marked yet"
              description="Set featured: true on verified projects, or add planned / in-progress work under content/projects/."
            />
          )}
        </Container>
      </Section>

      <Section id="experience" tone="muted" spaced="default">
        <Container width="wide">
          <Reveal>
            <SectionHeading
              index="03"
              label="Work History"
              title="Experience"
              description="Recent verified roles at a glance. Full timeline and education live on About."
            />
          </Reveal>
          <HomeExperience entries={experience} />
        </Container>
      </Section>

      {recognition.length > 0 ? (
        <Section id="recognition" spaced="default">
          <Container width="wide">
            <Reveal>
              <SectionHeading
                index="04"
                label="Recognition"
                title="Awards & Certifications"
              />
            </Reveal>
            <RecognitionList entries={recognition} />
          </Container>
        </Section>
      ) : null}

      <Marquee items={marquee} />
    </main>
  );
}
