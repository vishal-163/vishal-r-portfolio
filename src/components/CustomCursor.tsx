import { useEffect, useRef, useState } from "react";
import { isLowEndDevice } from "@/lib/animationUtils";

const CustomCursor = () => {
  const [hovering, setHovering] = useState(false);
  const [visible, setVisible] = useState(false);

  const targetPos = useRef({ x: 0, y: 0 });
  const currentPos = useRef({ x: 0, y: 0 });
  const hoveringRef = useRef(false);
  const rafId = useRef<number | null>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  // Throttle mousemove via RAF flag
  const mousePending = useRef(false);

  const lowEnd = typeof window !== "undefined" ? isLowEndDevice() : false;
  const isMobile = typeof window !== "undefined"
    ? window.innerWidth < 768 || navigator.maxTouchPoints > 0
    : false;

  useEffect(() => {
    // Disable on mobile or low-end devices
    if (isMobile || lowEnd) {
      document.body.style.cursor = "auto";
      return;
    }

    const animate = () => {
      currentPos.current.x += (targetPos.current.x - currentPos.current.x) * 0.65;
      currentPos.current.y += (targetPos.current.y - currentPos.current.y) * 0.65;

      if (ringRef.current) {
        const scale = hoveringRef.current ? 1.5 : 1;
        ringRef.current.style.transform = `translate(${currentPos.current.x}px, ${currentPos.current.y}px) scale(${scale})`;
      }

      rafId.current = requestAnimationFrame(animate);
    };

    rafId.current = requestAnimationFrame(animate);

    const handleMouseMove = (e: MouseEvent) => {
      // Throttle: only update target once per RAF tick
      targetPos.current = { x: e.clientX - 10, y: e.clientY - 10 };
      if (!mousePending.current) {
        mousePending.current = true;
        requestAnimationFrame(() => { mousePending.current = false; });
      }
      if (!visible) setVisible(true);
    };

    const handleMouseOver = (e: MouseEvent) => {
      if ((e.target as HTMLElement).closest("a, button, [role='button'], input, textarea")) {
        hoveringRef.current = true;
        setHovering(true);
      }
    };

    const handleMouseOut = (e: MouseEvent) => {
      if ((e.target as HTMLElement).closest("a, button, [role='button'], input, textarea")) {
        hoveringRef.current = false;
        setHovering(false);
      }
    };

    const handleMouseLeave = () => setVisible(false);
    const handleMouseEnter = () => setVisible(true);

    const handleMouseDown = (e: MouseEvent) => {
      const ripple = document.createElement("div");
      const size = 20;
      ripple.style.cssText = `
        position:fixed;left:${e.clientX - size / 2}px;top:${e.clientY - size / 2}px;
        width:${size}px;height:${size}px;border-radius:50%;
        background:rgba(6,182,212,0.5);pointer-events:none;z-index:9998;
        animation:cursor-ripple 400ms ease-out forwards;
      `;
      document.body.appendChild(ripple);
      ripple.addEventListener("animationend", () => ripple.remove());
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mouseover", handleMouseOver, { passive: true });
    window.addEventListener("mouseout", handleMouseOut, { passive: true });
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
  }, [lowEnd, isMobile]);

  if (isMobile || lowEnd) return null;

  return (
    <div
      ref={ringRef}
      className={`cursor-ring${hovering ? " cursor-ring--hovering" : ""}`}
      style={{ opacity: visible ? 1 : 0 }}
    />
  );
};

export default CustomCursor;
