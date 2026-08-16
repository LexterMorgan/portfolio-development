"use client";

import Image from "next/image";
import SpotlightCard from "@/components/react-bits/SpotlightCard/SpotlightCard";
import { useMotionPreferences } from "@/components/react-bits/useMotionPreferences";
import styles from "./AboutPortrait.module.css";

type AboutPortraitProps = {
  src?: string;
  alt?: string;
  name?: string;
  role?: string;
};

/**
 * Premium framed portrait for the About hero.
 * Personal photo belongs on About only.
 * SpotlightCard wraps the frame only (subtle cyan follow-light).
 */
export function AboutPortrait({
  src = "/portraits/professional.png",
  alt = "Professional portrait",
  name,
  role,
}: AboutPortraitProps) {
  const { allowPointerEffects } = useMotionPreferences();

  return (
    <div className={styles.root}>
      <SpotlightCard
        className={styles.spotlight}
        spotlightColor="rgba(61, 184, 197, 0.14)"
        disabled={!allowPointerEffects}
      >
        <div className={styles.frame}>
          <div className={styles.media}>
            <Image
              src={src}
              alt={alt}
              width={767}
              height={873}
              priority
              quality={92}
              className={styles.image}
              sizes="(max-width: 900px) 88vw, 420px"
            />
          </div>

          {name || role ? (
            <div className={styles.overlay}>
              {name ? <p className={styles.name}>{name}</p> : null}
              {role ? <p className={styles.role}>{role}</p> : null}
            </div>
          ) : null}
        </div>
      </SpotlightCard>
    </div>
  );
}
