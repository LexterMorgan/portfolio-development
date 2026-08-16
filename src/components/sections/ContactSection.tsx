import type { ReactNode } from "react";
import { Button } from "@/components/ui/Button";
import { MagneticCta } from "@/components/ui/MagneticCta";
import { Reveal } from "@/components/ui/Reveal";
import { EmptyState } from "@/components/ui/Label";
import styles from "./ContactSection.module.css";

type ContactSectionProps = {
  email?: string;
  links?: {
    github?: string;
    linkedin?: string;
  };
  eyebrow?: string;
  title?: ReactNode;
  body?: string;
};

export function ContactSection({
  email,
  links,
  eyebrow = "09 / Contact",
  title = (
    <>
      Let&apos;s build
      <br />
      something useful.
    </>
  ),
  body = "For analytical collaborations, BI problems, or data product work — reach out through verified channels below.",
}: ContactSectionProps) {
  const hasContact = Boolean(email || links?.github || links?.linkedin);

  return (
    <Reveal className={styles.root}>
      <p className={styles.eyebrow}>{eyebrow}</p>
      <h2 className={styles.title}>{title}</h2>
      <p className={styles.body}>{body}</p>
      {hasContact ? (
        <div className={styles.actions}>
          {links?.linkedin ? (
            <MagneticCta>
              <Button href={links.linkedin} external variant="primary" arrow>
                LinkedIn
              </Button>
            </MagneticCta>
          ) : null}
          {links?.github ? (
            <MagneticCta>
              <Button href={links.github} external variant="secondary" arrow>
                GitHub
              </Button>
            </MagneticCta>
          ) : null}
          {email ? (
            <MagneticCta>
              <Button href={`mailto:${email}`} variant="ghost" arrow>
                Email
              </Button>
            </MagneticCta>
          ) : null}
        </div>
      ) : (
        <EmptyState
          title="Contact links pending"
          description="Add email or profile URLs in content/profile.md when available."
        />
      )}
    </Reveal>
  );
}
