"use client";

import { useEffect, useState } from "react";

/**
 * Shared motion / pointer preferences for React Bits integrations.
 */
export function useMotionPreferences() {
  const [reducedMotion, setReducedMotion] = useState(false);
  const [coarsePointer, setCoarsePointer] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const pointer = window.matchMedia("(pointer: coarse)");

    const update = () => {
      setReducedMotion(motion.matches);
      setCoarsePointer(pointer.matches);
      setReady(true);
    };

    update();
    motion.addEventListener("change", update);
    pointer.addEventListener("change", update);
    return () => {
      motion.removeEventListener("change", update);
      pointer.removeEventListener("change", update);
    };
  }, []);

  return {
    reducedMotion,
    coarsePointer,
    ready,
    /** Cursor-driven effects should only run on fine pointers without reduced motion. */
    allowPointerEffects: ready && !reducedMotion && !coarsePointer,
  };
}
