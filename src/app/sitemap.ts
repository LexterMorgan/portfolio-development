import type { MetadataRoute } from "next";
import { getAllProjects } from "@/content";
import { SITE_URL } from "@/lib/metadata";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const staticRoutes = ["/", "/projects", "/articles", "/about"].map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified,
  }));
  const projectRoutes = getAllProjects().map((project) => ({
    url: `${SITE_URL}/projects/${project.data.slug}`,
    lastModified,
  }));
  // /contact omitted — it is a permanent redirect, not indexable content.
  return [...staticRoutes, ...projectRoutes];
}
