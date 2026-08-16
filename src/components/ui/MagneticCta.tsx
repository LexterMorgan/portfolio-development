"use client";

import type { ReactNode } from "react";
import Magnet from "@/components/react-bits/Magnet/Magnet";
import { useMotionPreferences } from "@/components/react-bits/useMotionPreferences";

type MagneticCtaProps = {
  children: ReactNode;
};

/**
 * Subtle magnetic pull for primary CTAs (Explore, About, Let's Talk, contact).
 */
export function MagneticCta({ children }: MagneticCtaProps) {
  const { allowPointerEffects } = useMotionPreferences();

  return (
    <Magnet
      disabled={!allowPointerEffects}
      padding={48}
      magnetStrength={14}
      activeTransition="transform 0.28s ease-out"
      inactiveTransition="transform 0.45s ease-in-out"
      wrapperClassName=""
    >
      {children}
    </Magnet>
  );
}
