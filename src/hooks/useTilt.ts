import { useRef, useState, useCallback, useEffect } from "react";
import type { CSSProperties } from "react";
import type { MouseEvent } from "react";

/**
 * Detects whether the user prefers reduced motion.
 */
function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  try {
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  } catch {
    return false;
  }
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

interface TiltResult {
  ref: React.RefObject<HTMLElement>;
  style: CSSProperties;
  onMouseMove: (e: MouseEvent) => void;
  onMouseLeave: () => void;
}

/**
 * Reusable hook that computes a 3D tilt transform based on cursor position
 * within the element's bounding box.
 *
 * rotateY = ((cursorX - centerX) / (width / 2)) * maxDegrees
 * rotateX = -((cursorY - centerY) / (height / 2)) * maxDegrees
 *
 * Both values are clamped to [-maxDegrees, maxDegrees].
 * When prefers-reduced-motion is active, returns identity transforms.
 */
export function useTilt(maxDegrees: number): TiltResult {
  const ref = useRef<HTMLElement>(null);
  const [style, setStyle] = useState<CSSProperties>({
    transform: "perspective(1000px) rotateX(0deg) rotateY(0deg)",
    transition: "transform 0.1s ease-out",
  });

  const reducedMotion = useRef(prefersReducedMotion());

  useEffect(() => {
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handler = (e: MediaQueryListEvent) => {
      reducedMotion.current = e.matches;
      if (e.matches) {
        setStyle({
          transform: "perspective(1000px) rotateX(0deg) rotateY(0deg)",
          transition: "transform 0.1s ease-out",
        });
      }
    };
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, []);

  const onMouseMove = useCallback(
    (e: MouseEvent) => {
      if (reducedMotion.current || !ref.current) return;

      const rect = ref.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const cursorX = e.clientX;
      const cursorY = e.clientY;

      const rotateY = clamp(
        ((cursorX - centerX) / (rect.width / 2)) * maxDegrees,
        -maxDegrees,
        maxDegrees
      );
      const rotateX = clamp(
        -((cursorY - centerY) / (rect.height / 2)) * maxDegrees,
        -maxDegrees,
        maxDegrees
      );

      setStyle({
        transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
        transition: "transform 0.1s ease-out",
      });
    },
    [maxDegrees]
  );

  const onMouseLeave = useCallback(() => {
    setStyle({
      transform: "perspective(1000px) rotateX(0deg) rotateY(0deg)",
      transition: "transform 0.3s ease-out",
    });
  }, []);

  return { ref, style, onMouseMove, onMouseLeave };
}
