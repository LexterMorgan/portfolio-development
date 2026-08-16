import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import styles from "./AboutPositioning.module.css";

type AboutPositioningProps = {
  name?: string;
  headline?: string;
  body?: string;
};

/**
 * Home about snapshot — concise editorial intro, not the full About page.
 */
export function AboutPositioning({
  name,
  headline,
  body,
}: AboutPositioningProps) {
  const statement =
    headline ||
    "Data Science Graduate · Data Analytics · Business Intelligence";

  return (
    <div className={styles.root}>
      <Reveal className={styles.lead}>
        <p className={styles.eyebrow}>01 / About</p>
        <h2 className={styles.statement}>
          {name ? (
            <>
              I&apos;m {name}, a Data Science graduate focused on{" "}
              <em>clear problem framing</em> and usable analytical systems.
            </>
          ) : (
            <>
              Analytical systems with <em>clear problem framing</em> and honest
              handling of evidence.
            </>
          )}
        </h2>
      </Reveal>
      <Reveal className={styles.side} delay={80}>
        <p className={styles.kicker}>{statement}</p>
        <p className={styles.body}>
          {body?.trim() ||
            "Home is the executive overview. Projects hold the proof. About covers background and working method."}
        </p>
        <div className={styles.action}>
          <Button href="/about" variant="secondary" arrow>
            View About
          </Button>
        </div>
      </Reveal>
    </div>
  );
}
