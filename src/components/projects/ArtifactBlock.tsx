import Image from "next/image";
import styles from "./ArtifactBlock.module.css";

export type ArtifactType =
  | "dashboard"
  | "chart"
  | "table"
  | "diagram"
  | "sql"
  | "python"
  | "figure"
  | "gallery"
  | "other";

export type Artifact = {
  type: ArtifactType;
  title: string;
  caption?: string;
  description?: string;
  source?: string;
  href?: string;
  src?: string;
  alt?: string;
  code?: string;
};

export function ArtifactBlock({ artifact }: { artifact: Artifact }) {
  return (
    <figure className={styles.block}>
      <div className={styles.header}>
        <span className={styles.type}>{artifact.type}</span>
        <h3 className={styles.title}>{artifact.title}</h3>
      </div>

      {artifact.src ? (
        <div className={styles.media}>
          <Image
            src={artifact.src}
            alt={artifact.alt || artifact.title}
            width={1400}
            height={900}
            className={styles.image}
          />
        </div>
      ) : null}

      {artifact.code ? (
        <pre className={styles.code}>
          <code>{artifact.code}</code>
        </pre>
      ) : null}

      {!artifact.src && !artifact.code ? (
        <div className={styles.placeholder}>
          Artifact media pending source material.
        </div>
      ) : null}

      {artifact.description ? (
        <p className={styles.description}>{artifact.description}</p>
      ) : null}
      {artifact.caption ? (
        <figcaption className={styles.caption}>{artifact.caption}</figcaption>
      ) : null}
      {artifact.source ? (
        <p className={styles.source}>Source: {artifact.source}</p>
      ) : null}
      {artifact.href ? (
        <a
          href={artifact.href}
          className={styles.link}
          target="_blank"
          rel="noopener noreferrer"
        >
          Open artifact →
        </a>
      ) : null}
    </figure>
  );
}

export function ArtifactGallery({ artifacts }: { artifacts: Artifact[] }) {
  if (artifacts.length === 0) return null;
  return (
    <div className={styles.gallery}>
      {artifacts.map((artifact) => (
        <ArtifactBlock key={`${artifact.type}-${artifact.title}`} artifact={artifact} />
      ))}
    </div>
  );
}
