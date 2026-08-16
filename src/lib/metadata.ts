import type { Metadata } from "next";
import { getSite } from "@/content";

const fallbackTitle = "Portfolio";
const fallbackDescription =
  "Data Science Graduate | Data Analytics | Business Intelligence";

export function getSiteMetadataBase(): {
  title: string;
  description: string;
} {
  const site = getSite();
  return {
    title: site.data.title || fallbackTitle,
    description: site.data.description || fallbackDescription,
  };
}

export function buildRootMetadata(): Metadata {
  const { title, description } = getSiteMetadataBase();
  return {
    title: {
      default: title,
      template: `%s · ${title}`,
    },
    description,
    icons: {
      icon: [
        { url: "/favicon.ico", sizes: "32x32" },
        { url: "/favicon.png", type: "image/png", sizes: "32x32" },
      ],
      apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
    },
    openGraph: {
      title,
      description,
      type: "website",
      locale: "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export function buildPageMetadata(input: {
  title: string;
  description?: string;
  path?: string;
}): Metadata {
  const site = getSiteMetadataBase();
  const description = input.description || site.description;
  return {
    title: input.title,
    description,
    openGraph: {
      title: `${input.title} · ${site.title}`,
      description,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${input.title} · ${site.title}`,
      description,
    },
    alternates: input.path
      ? {
          canonical: input.path,
        }
      : undefined,
  };
}
