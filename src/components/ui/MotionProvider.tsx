"use client";

import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";

const STORAGE_KEY = "portfolio:lagoon-motion";

type MotionContextValue = {
  playing: boolean;
  ready: boolean;
  toggle: () => void;
};

const MotionContext = createContext<MotionContextValue>({
  playing: true,
  ready: false,
  toggle: () => {},
});

export function MotionProvider({ children }: { children: ReactNode }) {
  const [playing, setPlaying] = useState(true);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let stored: string | null = null;
    try {
      stored = localStorage.getItem(STORAGE_KEY);
    } catch {
      stored = null;
    }
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const next = stored === "paused" ? false : stored === "playing" ? true : !reduce;
    setPlaying(next);
    setReady(true);
  }, []);

  const toggle = useCallback(() => {
    setPlaying((current) => {
      const next = !current;
      try {
        localStorage.setItem(STORAGE_KEY, next ? "playing" : "paused");
      } catch {
        /* storage unavailable: session-only */
      }
      return next;
    });
  }, []);

  return <MotionContext.Provider value={{ playing, ready, toggle }}>{children}</MotionContext.Provider>;
}

export function useMotion() {
  return useContext(MotionContext);
}
