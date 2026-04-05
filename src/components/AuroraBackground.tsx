import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { getParallaxOffset } from "@/lib/animationUtils";

interface AuroraBlob {
  color: "cyan" | "emerald";
  initialX: string;
  initialY: string;
  size: string;
  duration: number;
}

const BLOBS: AuroraBlob[] = [
  {
    color: "cyan",
    initialX: "-10%",
    initialY: "-10%",
    size: "600px",
    duration: 8,
  },
  {
    color: "emerald",
    initialX: "auto",
    initialY: "auto",
    size: "600px",
    duration: 7,
  },
];

export default function AuroraBackground() {
  const [scrollY, setScrollY] = useState(0);
  const reducedMotion =
    typeof window !== "undefined"
      ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
      : false;

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const parallaxOffset = getParallaxOffset(scrollY, 0.04);

  const blobAnimate = reducedMotion
    ? { scale: 1, opacity: 0.4 }
    : { scale: [0.9, 1.1], opacity: [0.4, 0.7] };

  const blobInitial = { scale: 0.9, opacity: 0.4 };

  const blobTransition = reducedMotion
    ? undefined
    : {
        duration: 0, // overridden per blob
        repeat: Infinity,
        repeatType: "reverse" as const,
        ease: "easeInOut",
      };

  return (
    <div
      className="fixed inset-0 overflow-hidden pointer-events-none"
      style={{ zIndex: 0 }}
      aria-hidden="true"
    >
      {/* Cyan blob — top-left corner */}
      <motion.div
        className="absolute rounded-full bg-cyan-500/20 blur-3xl"
        style={{
          width: BLOBS[0].size,
          height: BLOBS[0].size,
          left: BLOBS[0].initialX,
          top: BLOBS[0].initialY,
          translateY: parallaxOffset,
          willChange: "transform",
          position: "fixed",
          pointerEvents: "none",
        }}
        initial={blobInitial}
        animate={
          reducedMotion
            ? blobInitial
            : { scale: [0.9, 1.1], opacity: [0.4, 0.7] }
        }
        transition={
          reducedMotion
            ? undefined
            : {
                duration: BLOBS[0].duration,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut",
              }
        }
      />

      {/* Emerald blob — bottom-right corner */}
      <motion.div
        className="absolute rounded-full bg-emerald-500/20 blur-3xl"
        style={{
          width: BLOBS[1].size,
          height: BLOBS[1].size,
          right: "-10%",
          bottom: "-10%",
          translateY: parallaxOffset,
          willChange: "transform",
          position: "fixed",
          pointerEvents: "none",
        }}
        initial={blobInitial}
        animate={
          reducedMotion
            ? blobInitial
            : { scale: [0.9, 1.1], opacity: [0.4, 0.7] }
        }
        transition={
          reducedMotion
            ? undefined
            : {
                duration: BLOBS[1].duration,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut",
              }
        }
      />
    </div>
  );
}
