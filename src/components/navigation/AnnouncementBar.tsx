"use client";

import { useState } from "react";
import Link from "next/link";
import styles from "./AnnouncementBar.module.css";

type AnnouncementBarProps = {
  label?: string;
  text?: string;
  cta?: string;
  href?: string;
};

export function AnnouncementBar({
  label = "Selected work",
  text,
  cta = "View Projects",
  href = "/projects",
}: AnnouncementBarProps) {
  const [open, setOpen] = useState(true);

  if (!open) return null;

  const isExternal = href.startsWith("http");

  return (
    <div className={styles.bar} role="region" aria-label="Announcement">
      <div className={styles.inner}>
        <p className={styles.copy}>
          <span className={styles.icon} aria-hidden>
            ▤
          </span>
          <span className={styles.label}>{label}</span>
          {text ? <span className={styles.text}>{text}</span> : null}
        </p>
        {isExternal ? (
          <a
            className={styles.cta}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
          >
            {cta} ↗
          </a>
        ) : (
          <Link className={styles.cta} href={href}>
            {cta} ↗
          </Link>
        )}
        <button
          type="button"
          className={styles.close}
          onClick={() => setOpen(false)}
          aria-label="Dismiss announcement"
        >
          ×
        </button>
      </div>
    </div>
  );
}
