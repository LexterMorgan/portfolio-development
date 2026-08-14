import { Button } from "@/components/ui/Button";
import type { ProjectLinks } from "@/content";
import styles from "./ProjectLinks.module.css";

type ProjectLinksProps = {
  slug: string;
  links: ProjectLinks;
  layout?: "row" | "stack";
};

export function ProjectLinksActions({
  slug,
  links,
  layout = "row",
}: ProjectLinksProps) {
  const exploreHref = links.explore || `/projects/${slug}`;
  return (
    <div className={[styles.links, styles[layout]].join(" ")}>
      <Button href={exploreHref} variant="primary" size="sm" arrow>
        Explore
      </Button>
      {links.live ? (
        <Button href={links.live} external variant="secondary" size="sm" arrow>
          Live
        </Button>
      ) : null}
      {links.github ? (
        <Button href={links.github} external variant="ghost" size="sm" arrow>
          GitHub
        </Button>
      ) : null}
    </div>
  );
}
