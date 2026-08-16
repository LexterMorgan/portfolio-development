import { Syne, Plus_Jakarta_Sans, IBM_Plex_Mono } from "next/font/google";
import { getProfile, getSite } from "@/content";
import { buildRootMetadata } from "@/lib/metadata";
import { SiteHeader } from "@/components/navigation/SiteHeader";
import { SiteFooter } from "@/components/navigation/SiteFooter";
import { AnnouncementBar } from "@/components/navigation/AnnouncementBar";
import { SiteNoise } from "@/components/ui/SiteNoise";
import { SiteCursor } from "@/components/ui/SiteCursor";
import { SiteAtmosphere } from "@/components/ui/SiteAtmosphere";
import "./globals.css";

const display = Syne({
  subsets: ["latin"],
  variable: "--font-display-family",
  display: "swap",
});

const body = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-body-family",
  display: "swap",
});

const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono-family",
  display: "swap",
});

export function generateMetadata() {
  return buildRootMetadata();
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const site = getSite();
  const profile = getProfile();
  const brand = profile.data.name || site.data.title;

  return (
    <html
      lang={site.data.language || "en"}
      className={`${display.variable} ${body.variable} ${mono.variable}`}
    >
      <body>
        <SiteAtmosphere />
        <SiteNoise />
        <SiteCursor />
        <AnnouncementBar
          label={site.data.announcement_label}
          text={site.data.announcement_text}
          cta={site.data.announcement_cta}
          href={site.data.announcement_href}
        />
        <div className="site-shell">
          <SiteHeader
            brand={brand}
            externalLinks={{
              github: profile.data.links.github,
              linkedin: profile.data.links.linkedin,
            }}
          />
          <div className="site-main">{children}</div>
          <SiteFooter
            title={brand}
            email={profile.data.email}
            links={profile.data.links}
          />
        </div>
      </body>
    </html>
  );
}
