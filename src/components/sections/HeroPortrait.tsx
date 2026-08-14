"use client";

import Image from "next/image";
import { useCallback, useEffect, useId, useState } from "react";
import styles from "./HeroPortrait.module.css";

type HeroPortraitProps = {
  professionalSrc?: string;
  gojoSrc?: string;
  alt?: string;
};

export function HeroPortrait({
  professionalSrc = "/portraits/professional.png",
  gojoSrc = "/portraits/gojo.png",
  alt = "Professional portrait",
}: HeroPortraitProps) {
  const [transformed, setTransformed] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [coarsePointer, setCoarsePointer] = useState(false);
  const labelId = useId();

  useEffect(() => {
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const pointerQuery = window.matchMedia("(pointer: coarse)");
    const sync = () => {
      setReducedMotion(motionQuery.matches);
      setCoarsePointer(pointerQuery.matches);
    };
    sync();
    motionQuery.addEventListener("change", sync);
    pointerQuery.addEventListener("change", sync);
    return () => {
      motionQuery.removeEventListener("change", sync);
      pointerQuery.removeEventListener("change", sync);
    };
  }, []);

  const activate = useCallback(() => {
    setTransformed(true);
  }, []);

  const deactivate = useCallback(() => {
    setTransformed(false);
  }, []);

  const onClick = useCallback(() => {
    if (!coarsePointer) return;
    setTransformed((value) => !value);
  }, [coarsePointer]);

  return (
    <div
      className={[
        styles.root,
        transformed ? styles.transformed : "",
        reducedMotion ? styles.reduced : "",
      ]
        .filter(Boolean)
        .join(" ")}
      onMouseEnter={coarsePointer ? undefined : activate}
      onMouseLeave={coarsePointer ? undefined : deactivate}
      onFocus={coarsePointer ? undefined : activate}
      onBlur={coarsePointer ? undefined : deactivate}
      onClick={onClick}
      role="img"
      aria-labelledby={labelId}
      tabIndex={0}
    >
      <span id={labelId} className="sr-only">
        {transformed
          ? "Portrait transformed. Press or leave to return to professional portrait."
          : `${alt}. Hover or tap to reveal an alternate persona.`}
      </span>

      <div className={styles.glow} aria-hidden />
      <div className={styles.glowAlt} aria-hidden />

      <div className={styles.stage}>
        <div className={styles.layerProfessional}>
          <Image
            src={professionalSrc}
            alt=""
            width={767}
            height={873}
            priority
            className={styles.image}
            sizes="(max-width: 900px) 70vw, 420px"
          />
        </div>
        <div className={styles.layerGojo} aria-hidden={!transformed}>
          <Image
            src={gojoSrc}
            alt=""
            width={575}
            height={1024}
            className={styles.imageGojo}
            sizes="(max-width: 900px) 70vw, 420px"
          />
        </div>
        <div className={styles.fx} aria-hidden>
          <span className={styles.sweep} />
          <span className={styles.rift} />
          <span className={styles.shard} />
          <span className={`${styles.shard} ${styles.shardTwo}`} />
          <span className={`${styles.shard} ${styles.shardThree}`} />
        </div>
      </div>

      <p className={styles.hint} aria-hidden>
        {coarsePointer ? "Tap to transform" : "Hover to transform"}
      </p>
    </div>
  );
}
