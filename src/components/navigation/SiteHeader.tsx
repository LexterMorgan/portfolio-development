"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { MagneticCta } from "@/components/ui/MagneticCta";
import styles from "./SiteHeader.module.css";

const NAV = [
  {
    href: "/",
    label: "Home",
    match: (path: string) => path === "/",
    icon: "home",
  },
  {
    href: "/projects",
    label: "Projects",
    match: (path: string) => path === "/projects" || path.startsWith("/projects/"),
    icon: "work",
  },
  {
    href: "/about",
    label: "About",
    match: (path: string) => path === "/about" || path.startsWith("/about/"),
    icon: "user",
  },
] as const;

function NavGlyph({ name }: { name: string }) {
  const common = {
    width: 14,
    height: 14,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    "aria-hidden": true,
  } as const;

  if (name === "home") {
    return (
      <svg {...common}>
        <path d="M4 10.5 12 4l8 6.5V20a1 1 0 0 1-1 1h-5v-6H10v6H5a1 1 0 0 1-1-1v-9.5Z" />
      </svg>
    );
  }
  if (name === "work") {
    return (
      <svg {...common}>
        <rect x="3" y="7" width="18" height="13" rx="2" />
        <path d="M8 7V5.5A2.5 2.5 0 0 1 10.5 3h3A2.5 2.5 0 0 1 16 5.5V7" />
      </svg>
    );
  }
  if (name === "user") {
    return (
      <svg {...common}>
        <circle cx="12" cy="8" r="3.2" />
        <path d="M5 19c1.4-3.2 4-5 7-5s5.6 1.8 7 5" />
      </svg>
    );
  }
  return (
    <svg {...common}>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m4 7 8 7 8-7" />
    </svg>
  );
}

type SiteHeaderProps = {
  brand: string;
  externalLinks?: {
    github?: string;
    linkedin?: string;
  };
};

export function SiteHeader({ brand }: SiteHeaderProps) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        className={[styles.header, scrolled ? styles.scrolled : ""].join(" ")}
      >
        <div className={styles.inner}>
          <Link href="/" className={styles.brand}>
            {brand}
            <span className={styles.brandDot}>.</span>
          </Link>

          <nav className={styles.desktopNav} aria-label="Primary">
            <div className={styles.pill}>
              {NAV.map((item) => {
                const active = item.match(pathname);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={[styles.navLink, active ? styles.active : ""]
                      .filter(Boolean)
                      .join(" ")}
                    aria-current={active ? "page" : undefined}
                  >
                    <NavGlyph name={item.icon} />
                    {item.label}
                  </Link>
                );
              })}
            </div>
          </nav>

          <div className={styles.aside}>
            <MagneticCta>
              <Link href="/about#contact" className={styles.cta} data-cursor="hot">
                Let&apos;s Talk
              </Link>
            </MagneticCta>
          </div>
        </div>
      </header>

      <nav className={styles.mobileNav} aria-label="Mobile">
        {NAV.map((item) => {
          const active = item.match(pathname);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={[styles.mobileItem, active ? styles.mobileActive : ""]
                .filter(Boolean)
                .join(" ")}
              aria-current={active ? "page" : undefined}
            >
              <NavGlyph name={item.icon} />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </>
  );
}
