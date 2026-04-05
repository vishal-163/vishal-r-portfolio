import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { getParallaxOffset, isLowEndDevice } from "@/lib/animationUtils";

export default function AuroraBackground() {
  const [scrollY, setScrollY] = useState(0);
  const rafRef = useRef<number | null>(null);
  const pendingScrollY = useRef(0);

  const lowEnd = typeof window !== "undefined" ? isLowEndDevice() : false;
  const reducedMotion =
    typeof window !== "undefined"
      ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
      : false;

  const isStatic = lowEnd || reducedMotion;

  useEffect(() => {
    if (isStatic) return; // no scroll listener needed for static blobs

    const handleScroll = () => {
      pendingScrollY.current = window.scrollY;
      if (rafRef.current !== null) return; // already scheduled
      rafRef.current = requestAnimationFrame(() => {
        setScrollY(pendingScrollY.current);
        rafRef.current = null;
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, [isStatic]);

  const parallaxOffset = isStatic ? 0 : getParallaxOffset(scrollY, 0.04);

  // Smaller blobs on low-end / mobile
  const blobSize = typeof window !== "undefined" && window.innerWidth < 768 ? "350px" : "500px";

  const blobInitial = { scale: 0.9, opacity: 0.35 };
  const blobAnimate = isStatic
    ? blobInitial
    : { scale: [0.9, 1.1] as number[], opacity: [0.35, 0.6] as number[] };

  const blobTransition = isStatic
    ? undefined
    : { repeat: Infinity, repeatType: "reverse" as const, ease: "easeInOut" as const };

  return (
    <div
      className="fixed inset-0 overflow-hidden pointer-events-none"
      style={{ zIndex: 0 }}
      aria-hidden="true"
    >
      {/* Cyan blob — top-left */}
      <motion.div
        className="absolute rounded-full bg-cyan-500/15 blur-3xl"
        style={{
          width: blobSize,
          height: blobSize,
          left: "-8%",
          top: "-8%",
          translateY: parallaxOffset,
          willChange: isStatic ? "auto" : "transform",
          position: "fixed",
          pointerEvents: "none",
        }}
        initial={blobInitial}
        animate={blobAnimate}
        transition={blobTransition ? { ...blobTransition, duration: 8 } : undefined}
      />

      {/* Emerald blob — bottom-right */}
      <motion.div
        className="absolute rounded-full bg-emerald-500/15 blur-3xl"
        style={{
          width: blobSize,
          height: blobSize,
          right: "-8%",
          bottom: "-8%",
          translateY: parallaxOffset,
          willChange: isStatic ? "auto" : "transform",
          position: "fixed",
          pointerEvents: "none",
        }}
        initial={blobInitial}
        animate={blobAnimate}
        transition={blobTransition ? { ...blobTransition, duration: 7 } : undefined}
      />
    </div>
  );
}
