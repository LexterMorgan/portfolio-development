import {
  getAllUpdates,
  getBuildingProjects,
  getCurrently,
  getProfile,
  getPublishedArticles,
  getSelectedProjects,
} from "@/content";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/layout/SectionHeading";
import { HeroSection } from "@/components/sections/HeroSection";
import { CapabilitiesSection } from "@/components/sections/CapabilitiesSection";
import { CurrentlySection } from "@/components/sections/CurrentlySection";
import { UpdatesSection } from "@/components/sections/UpdatesSection";
import { ProjectGrid } from "@/components/projects/ProjectGrid";
import { ArticleCard } from "@/components/articles/ArticleCard";
import { EmptyState } from "@/components/ui/Label";
import { TextLink } from "@/components/ui/TextLink";
import { Button } from "@/components/ui/Button";

export default function HomePage() {
  const profile = getProfile();
  const selected = getSelectedProjects();
  const building = getBuildingProjects();
  const articles = getPublishedArticles();
  const currently = getCurrently();
  const updates = getAllUpdates();

  const heroBody =
    profile.body && !/intentionally unresolved/i.test(profile.body)
      ? profile.body
      : undefined;

  return (
    <main>
      <Container width="wide">
        <HeroSection
          name={profile.data.name}
          headline={profile.data.headline}
          body={heroBody}
          links={profile.data.links}
        />
      </Container>

      <Section id="work" spaced="compact">
        <Container width="wide">
          <SectionHeading
            eyebrow="01 / Work"
            title="Selected work"
            description="Editorial case-study previews. Featured projects appear here when marked in content — no padding with unverified claims."
            meta={`${selected.length} featured`}
            align="split"
            action={<TextLink href="/projects" arrow>All projects</TextLink>}
          />
          {selected.length > 0 ? (
            <ProjectGrid projects={selected} variant="featured-first" />
          ) : (
            <EmptyState
              title="Selected work is not marked yet"
              description="Set featured: true on verified projects in content/projects/*/project.md. Until then, explore planned and in-progress work below."
            />
          )}
        </Container>
      </Section>

      <Section tone="muted" id="building" spaced="compact">
        <Container width="wide">
          <SectionHeading
            eyebrow="02 / Building"
            title="Currently building"
            description="Projects with planned or in-progress status — honest scaffolds until case studies are sourced."
            meta={`${building.length} active`}
            align="split"
            action={<TextLink href="/projects" arrow>Project index</TextLink>}
          />
          {building.length > 0 ? (
            <ProjectGrid projects={building} startIndex={1} />
          ) : (
            <EmptyState
              title="No building projects"
              description="Projects with status planned or in-progress will appear here."
            />
          )}
        </Container>
      </Section>

      <Section spaced="compact">
        <Container width="wide">
          <SectionHeading
            eyebrow="03 / Perspective"
            title="Analytical perspective"
            description="How this portfolio approaches data work — problem first, then method, product, and limitations."
          />
          <CapabilitiesSection />
        </Container>
      </Section>

      <Section tone="accent" spaced="compact">
        <Container width="wide">
          <SectionHeading
            eyebrow="04 / Insights"
            title="Articles"
            description="Research notes and project insights linked by stable project slugs."
            meta={`${articles.length} published`}
            align="split"
            action={<TextLink href="/articles" arrow>All articles</TextLink>}
          />
          {articles.length > 0 ? (
            <div>
              {articles.slice(0, 3).map((article) => (
                <ArticleCard key={article.data.slug} article={article} />
              ))}
            </div>
          ) : (
            <EmptyState
              title="No published articles yet"
              description="Add markdown under content/projects/<slug>/articles/ with status: published when insights are ready."
            />
          )}
        </Container>
      </Section>

      <Section id="currently" spaced="compact">
        <Container width="wide">
          <SectionHeading
            eyebrow="05 / Now"
            title="Currently"
            description="Editable from content/currently.md without touching React."
          />
          <CurrentlySection data={currently.data} />
        </Container>
      </Section>

      <Section tone="muted" spaced="compact">
        <Container width="wide">
          <SectionHeading
            eyebrow="06 / Log"
            title="Latest updates"
            description="Lightweight changelog from content/updates/."
          />
          <UpdatesSection updates={updates} limit={3} />
        </Container>
      </Section>

      <Section spaced="compact">
        <Container width="narrow">
          <SectionHeading
            eyebrow="07 / Contact"
            title="Continue the conversation"
            description="Reach out for analytical collaborations, BI problems, or data product work."
          />
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
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
            {!profile.data.email &&
            !profile.data.links.github &&
            !profile.data.links.linkedin ? (
              <EmptyState
                title="Contact links pending"
                description="Add email or profile URLs in content/profile.md when available."
              />
            ) : null}
          </div>
        </Container>
      </Section>
    </main>
  );
}
