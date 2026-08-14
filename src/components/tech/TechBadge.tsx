import fs from "node:fs";
import path from "node:path";
import { getTech } from "@/content";
import styles from "./TechBadge.module.css";

type TechBadgeProps = {
  id: string;
  showDescription?: boolean;
  size?: "sm" | "md";
};

function iconExists(iconPath?: string): boolean {
  if (!iconPath) return false;
  const absolute = path.join(process.cwd(), "public", iconPath.replace(/^\//, ""));
  return fs.existsSync(absolute);
}

export function TechBadge({
  id,
  showDescription = false,
  size = "sm",
}: TechBadgeProps) {
  const tech = getTech(id);
  const name = tech?.name ?? id;
  const description = tech?.description;
  const hasIcon = iconExists(tech?.icon);

  return (
    <span
      className={[styles.badge, styles[size]].join(" ")}
      title={description}
    >
      <span className={styles.iconWrap} aria-hidden>
        {hasIcon && tech?.icon ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={tech.icon} alt="" width={16} height={16} className={styles.icon} />
        ) : (
          <span className={styles.fallback}>{name.slice(0, 2).toUpperCase()}</span>
        )}
      </span>
      <span className={styles.text}>
        <span className={styles.name}>{name}</span>
        {showDescription && description ? (
          <span className={styles.desc}>{description}</span>
        ) : null}
      </span>
    </span>
  );
}
