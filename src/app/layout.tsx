import type { Metadata } from "next";
import { getSite } from "@/content";
import "./globals.css";

export async function generateMetadata(): Promise<Metadata> {
  const site = getSite();
  return {
    title: site.data.title,
    description: site.data.description,
  };
}

/**
 * Phase 1 placeholder root layout — no visual design system yet.
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
