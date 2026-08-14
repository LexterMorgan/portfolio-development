"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useState } from "react";
import styles from "./SiteHeader.module.css";

const NAV = [
  { href: "/projects", label: "Work" },
  { href: "/about", label: "About" },
  { href: "/articles", label: "Articles" },
  { href: "/#currently", label: "Currently" },
] as const;

type SiteHeaderProps = {
  brand: string;
  externalLinks?: {
    github?: string;
    linkedin?: string;
  };
};

export function SiteHeader({ brand, externalLinks }: SiteHeaderProps) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const panelId = useId();

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <Link href="/" className={styles.brand}>
          <span className={styles.brandMark} aria-hidden />
          <span>{brand}</span>
        </Link>

        <nav className={styles.desktopNav} aria-label="Primary">
          {NAV.map((item) => {
            const active =
              item.href === "/#currently"
                ? false
                : pathname === item.href || pathname.startsWith(`${item.href}/`);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={[styles.navLink, active ? styles.active : ""]
                  .filter(Boolean)
                  .join(" ")}
                aria-current={active ? "page" : undefined}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className={styles.aside}>
          {externalLinks?.github ? (
            <a
              href={externalLinks.github}
              className={styles.ext}
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>
          ) : null}
          {externalLinks?.linkedin ? (
            <a
              href={externalLinks.linkedin}
              className={styles.ext}
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn
            </a>
          ) : null}
          <button
            type="button"
            className={styles.menuButton}
            aria-expanded={open}
            aria-controls={panelId}
            onClick={() => setOpen((value) => !value)}
          >
            <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
            <span aria-hidden className={styles.menuIcon}>
              {open ? "Close" : "Menu"}
            </span>
          </button>
        </div>
      </div>

      <div
        id={panelId}
        className={[styles.mobilePanel, open ? styles.open : ""].join(" ")}
        hidden={!open}
      >
        <nav aria-label="Mobile">
          {NAV.map((item) => (
            <Link key={item.href} href={item.href} className={styles.mobileLink}>
              {item.label}
            </Link>
          ))}
          {externalLinks?.github ? (
            <a
              href={externalLinks.github}
              className={styles.mobileLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>
          ) : null}
          {externalLinks?.linkedin ? (
            <a
              href={externalLinks.linkedin}
              className={styles.mobileLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn
            </a>
          ) : null}
        </nav>
      </div>
    </header>
  );
}
