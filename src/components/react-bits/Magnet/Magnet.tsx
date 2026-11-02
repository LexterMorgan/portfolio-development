"use client";

import React, {
  useEffect,
  useRef,
  type ReactNode,
  type HTMLAttributes,
} from "react";

interface MagnetProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  padding?: number;
  disabled?: boolean;
  magnetStrength?: number;
  activeTransition?: string;
  inactiveTransition?: string;
  wrapperClassName?: string;
  innerClassName?: string;
}

/**
 * React Bits Magnet (TS-CSS).
 * Higher magnetStrength = subtler movement (offset = delta / strength).
 */
const Magnet: React.FC<MagnetProps> = ({
  children,
  padding = 100,
  disabled = false,
  magnetStrength = 2,
  activeTransition = "transform 0.3s ease-out",
  inactiveTransition = "transform 0.5s ease-in-out",
  wrapperClassName = "",
  innerClassName = "",
  ...props
}) => {
  const magnetRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const magnet = magnetRef.current;
    const inner = innerRef.current;
    if (!magnet || !inner) return;

    let frame = 0;
    let running = true;
    let active = false;
    const target = { x: 0, y: 0 };
    const position = { x: 0, y: 0 };

    const schedule = () => {
      if (frame === 0) frame = window.requestAnimationFrame(tick);
    };

    const setTarget = (x: number, y: number, nextActive: boolean) => {
      target.x = x;
      target.y = y;
      if (active !== nextActive) {
        active = nextActive;
        inner.style.transition = active
          ? activeTransition
          : inactiveTransition;
      }
      schedule();
    };

    const tick = () => {
      frame = 0;
      if (!running) return;
      position.x += (target.x - position.x) * 0.2;
      position.y += (target.y - position.y) * 0.2;
      inner.style.transform = `translate3d(${position.x}px, ${position.y}px, 0)`;

      if (
        Math.abs(target.x - position.x) > 0.08 ||
        Math.abs(target.y - position.y) > 0.08
      ) {
        schedule();
      } else {
        position.x = target.x;
        position.y = target.y;
        inner.style.transform = `translate3d(${position.x}px, ${position.y}px, 0)`;
      }
    };

    if (disabled) {
      inner.style.transition = inactiveTransition;
      inner.style.transform = "translate3d(0, 0, 0)";
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      const { left, top, width, height } = magnet.getBoundingClientRect();
      const centerX = left + width / 2;
      const centerY = top + height / 2;

      const distX = Math.abs(centerX - e.clientX);
      const distY = Math.abs(centerY - e.clientY);

      if (distX < width / 2 + padding && distY < height / 2 + padding) {
        const offsetX = (e.clientX - centerX) / magnetStrength;
        const offsetY = (e.clientY - centerY) / magnetStrength;
        setTarget(offsetX, offsetY, true);
      } else {
        setTarget(0, 0, false);
      }
    };

    inner.style.transition = inactiveTransition;
    inner.style.willChange = "transform";
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => {
      running = false;
      window.cancelAnimationFrame(frame);
      inner.style.transform = "translate3d(0, 0, 0)";
      inner.style.willChange = "auto";
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [activeTransition, inactiveTransition, padding, disabled, magnetStrength]);

  return (
    <div
      ref={magnetRef}
      className={wrapperClassName}
      style={{ position: "relative", display: "inline-block" }}
      {...props}
    >
      <div ref={innerRef} className={innerClassName}>
        {children}
      </div>
    </div>
  );
};

export default Magnet;
