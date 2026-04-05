import { useEffect, useRef } from "react";
import { type Particle, getParticleCount, applyMouseForce, connectionOpacity, isLowEndDevice } from "@/lib/animationUtils";

const FRAME_INTERVAL_MS = 1000 / 60;

const ParticleBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef<{ x: number; y: number }>({ x: -9999, y: -9999 });

  useEffect(() => {
    const lowEnd = isLowEndDevice();
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isMobile = window.innerWidth < 768 || navigator.maxTouchPoints > 0;

    let outerRafId: number;
    let animationId: number;
    let lastFrameTime = 0;
    let isVisible = !document.hidden;
    let resizeHandler: (() => void) | null = null;
    let mouseMoveHandler: ((e: MouseEvent) => void) | null = null;
    let visibilityHandler: (() => void) | null = null;

    outerRafId = requestAnimationFrame(() => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const setSize = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      };
      setSize();
      resizeHandler = setSize;
      window.addEventListener("resize", resizeHandler);

      // Mouse interaction only on desktop high-end
      if (!isMobile && !lowEnd && !reducedMotion) {
        mouseMoveHandler = (e: MouseEvent) => {
          mouseRef.current = { x: e.clientX, y: e.clientY };
        };
        window.addEventListener("mousemove", mouseMoveHandler, { passive: true });
      }

      // Pause when tab hidden
      visibilityHandler = () => { isVisible = !document.hidden; };
      document.addEventListener("visibilitychange", visibilityHandler);

      // Low-end gets fewer particles, high-end gets full count
      const baseCount = getParticleCount(window.innerWidth);
      const count = lowEnd ? Math.floor(baseCount * 0.5) : baseCount;

      const particles: Particle[] = [];
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: reducedMotion ? 0 : (Math.random() - 0.5) * 0.4,
          vy: reducedMotion ? 0 : (Math.random() - 0.5) * 0.4,
          size: Math.random() * 1.5 + 0.5,
          opacity: Math.random() * 0.45 + 0.15,
          color: i % 2 === 0 ? "cyan" : "emerald",
        });
      }

      const animate = (timestamp: number) => {
        animationId = requestAnimationFrame(animate);
        if (!isVisible) return;
        if (timestamp - lastFrameTime < FRAME_INTERVAL_MS) return;
        lastFrameTime = timestamp;

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        for (let i = 0; i < particles.length; i++) {
          const p = particles[i];

          if (!reducedMotion) {
            if (!isMobile && !lowEnd) {
              applyMouseForce(p, mouseRef.current.x, mouseRef.current.y, 120);
            }
            p.x += p.vx;
            p.y += p.vy;
            p.vx *= 0.99;
            p.vy *= 0.99;
            if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
            if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
          }

          // Draw particle dot
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fillStyle = p.color === "cyan"
            ? `hsla(190,90%,50%,${p.opacity})`
            : `hsla(160,84%,39%,${p.opacity})`;
          ctx.fill();

          // Connection lines — skip on low-end and mobile for perf
          if (!lowEnd && !isMobile) {
            for (let j = i + 1; j < particles.length; j++) {
              const dx = p.x - particles[j].x;
              const dy = p.y - particles[j].y;
              const dist = Math.sqrt(dx * dx + dy * dy);
              if (dist < 150) {
                const op = connectionOpacity(dist, 150);
                ctx.beginPath();
                ctx.moveTo(p.x, p.y);
                ctx.lineTo(particles[j].x, particles[j].y);
                ctx.strokeStyle = p.color === "cyan"
                  ? `hsla(190,90%,50%,${op})`
                  : `hsla(160,84%,39%,${op})`;
                ctx.lineWidth = 0.5;
                ctx.stroke();
              }
            }
          }
        }
      };

      animationId = requestAnimationFrame(animate);
    });

    return () => {
      cancelAnimationFrame(outerRafId);
      cancelAnimationFrame(animationId);
      if (resizeHandler) window.removeEventListener("resize", resizeHandler);
      if (mouseMoveHandler) window.removeEventListener("mousemove", mouseMoveHandler);
      if (visibilityHandler) document.removeEventListener("visibilitychange", visibilityHandler);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ opacity: 0.6, willChange: "transform", zIndex: 1 }}
    />
  );
};

export default ParticleBackground;
