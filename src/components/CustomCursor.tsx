import { useEffect, useRef, useState } from "react";

const CustomCursor = () => {
  const [hovering, setHovering] = useState(false);
  const [visible, setVisible] = useState(false);

  // Target position updated on mousemove
  const targetPos = useRef({ x: 0, y: 0 });
  // Current (lerped) position
  const currentPos = useRef({ x: 0, y: 0 });
  // Track hovering in a ref so the RAF loop can read it without stale closure
  const hoveringRef = useRef(false);
  // RAF handle
  const rafId = useRef<number | null>(null);
  // Ring element ref for direct DOM manipulation (avoids React re-renders per frame)
  const ringRef = useRef<HTMLDivElement>(null);

  const reducedMotion =
    typeof window !== "undefined"
      ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
      : false;

  useEffect(() => {
    // Check if mobile (< 768px) — hide cursor and restore system cursor
    const isMobile = window.innerWidth < 768;
    if (isMobile) {
      document.body.style.cursor = "auto";
      return;
    }

    // Animation loop: lerp currentPos toward targetPos
    const animate = () => {
      if (reducedMotion) {
        currentPos.current.x = targetPos.current.x;
        currentPos.current.y = targetPos.current.y;
      } else {
        currentPos.current.x +=
          (targetPos.current.x - currentPos.current.x) * 0.65;
        currentPos.current.y +=
          (targetPos.current.y - currentPos.current.y) * 0.65;
      }

      if (ringRef.current) {
        const scale = hoveringRef.current ? 1.5 : 1;
        ringRef.current.style.transform = `translate(${currentPos.current.x}px, ${currentPos.current.y}px) scale(${scale})`;
      }

      rafId.current = requestAnimationFrame(animate);
    };

    rafId.current = requestAnimationFrame(animate);

    const handleMouseMove = (e: MouseEvent) => {
      // Center the 20px ring on the cursor
      targetPos.current = { x: e.clientX - 10, y: e.clientY - 10 };
      if (!visible) setVisible(true);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest("a, button, [role='button'], input, textarea")) {
        hoveringRef.current = true;
        setHovering(true);
      }
    };

    const handleMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest("a, button, [role='button'], input, textarea")) {
        hoveringRef.current = false;
        setHovering(false);
      }
    };

    const handleMouseLeave = () => setVisible(false);
    const handleMouseEnter = () => setVisible(true);

    const handleMouseDown = (e: MouseEvent) => {
      // Skip ripple when reduced motion is active
      if (reducedMotion) return;

      const ripple = document.createElement("div");
      const size = 20;
      ripple.style.cssText = `
        position: fixed;
        left: ${e.clientX - size / 2}px;
        top: ${e.clientY - size / 2}px;
        width: ${size}px;
        height: ${size}px;
        border-radius: 50%;
        background: rgba(6,182,212,0.5);
        pointer-events: none;
        z-index: 9998;
        animation: cursor-ripple 400ms ease-out forwards;
      `;
      document.body.appendChild(ripple);
      ripple.addEventListener("animationend", () => ripple.remove());
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseover", handleMouseOver);
    window.addEventListener("mouseout", handleMouseOut);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);
    window.addEventListener("mousedown", handleMouseDown);

    return () => {
      if (rafId.current !== null) cancelAnimationFrame(rafId.current);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
      window.removeEventListener("mouseout", handleMouseOut);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
      window.removeEventListener("mousedown", handleMouseDown);
    };
  }, [reducedMotion]);

  // Hide on mobile (< 768px)
  if (typeof window !== "undefined" && window.innerWidth < 768) return null;

  return (
    <div
      ref={ringRef}
      className={`cursor-ring${hovering ? " cursor-ring--hovering" : ""}`}
      style={{ opacity: visible ? 1 : 0 }}
    />
  );
};

export default CustomCursor;
