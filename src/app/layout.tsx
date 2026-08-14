import {
  Newsreader,
  Source_Sans_3,
  IBM_Plex_Mono,
} from "next/font/google";
import { getProfile, getSite } from "@/content";
import { buildRootMetadata } from "@/lib/metadata";
import { SiteHeader } from "@/components/navigation/SiteHeader";
import { SiteFooter } from "@/components/navigation/SiteFooter";
import "./globals.css";

const display = Newsreader({
  subsets: ["latin"],
  variable: "--font-display-family",
  display: "swap",
});

const body = Source_Sans_3({
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
