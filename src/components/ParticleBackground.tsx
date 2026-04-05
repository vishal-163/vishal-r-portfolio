import { useEffect, useRef } from "react";
import { type Particle, getParticleCount, applyMouseForce, connectionOpacity } from "@/lib/animationUtils";

const ParticleBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef<{ x: number; y: number }>({ x: -9999, y: -9999 });

  useEffect(() => {
    let outerRafId: number;
    let animationId: number;
    let resizeHandler: (() => void) | null = null;
    let mouseMoveHandler: ((e: MouseEvent) => void) | null = null;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    outerRafId = requestAnimationFrame(() => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const particles: Particle[] = [];

      resizeHandler = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      };
      resizeHandler();
      window.addEventListener("resize", resizeHandler);

      mouseMoveHandler = (e: MouseEvent) => {
        mouseRef.current = { x: e.clientX, y: e.clientY };
      };
      window.addEventListener("mousemove", mouseMoveHandler);

      const count = getParticleCount(window.innerWidth);
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: reducedMotion ? 0 : (Math.random() - 0.5) * 0.5,
          vy: reducedMotion ? 0 : (Math.random() - 0.5) * 0.5,
          size: Math.random() * 2 + 0.5,
          opacity: Math.random() * 0.5 + 0.1,
          color: i % 2 === 0 ? "cyan" : "emerald",
        });
      }

      const animate = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        particles.forEach((p, i) => {
          if (!reducedMotion) {
            applyMouseForce(p, mouseRef.current.x, mouseRef.current.y, 120);

            p.x += p.vx;
            p.y += p.vy;

            // Dampen to prevent runaway velocity from repeated mouse force
            p.vx *= 0.99;
            p.vy *= 0.99;

            if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
            if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
          }

          const fillColor =
            p.color === "cyan"
              ? `hsla(190, 90%, 50%, ${p.opacity})`
              : `hsla(160, 84%, 39%, ${p.opacity})`;

          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fillStyle = fillColor;
          ctx.fill();

          for (let j = i + 1; j < particles.length; j++) {
            const dx = p.x - particles[j].x;
            const dy = p.y - particles[j].y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 150) {
              const opacity = connectionOpacity(dist, 150);
              const lineColor =
                p.color === "cyan"
                  ? `hsla(190, 90%, 50%, ${opacity})`
                  : `hsla(160, 84%, 39%, ${opacity})`;
              ctx.beginPath();
              ctx.moveTo(p.x, p.y);
              ctx.lineTo(particles[j].x, particles[j].y);
              ctx.strokeStyle = lineColor;
              ctx.lineWidth = 0.5;
              ctx.stroke();
            }
          }
        });

        animationId = requestAnimationFrame(animate);
      };

      animationId = requestAnimationFrame(animate);
    });

    return () => {
      cancelAnimationFrame(outerRafId);
      cancelAnimationFrame(animationId);
      if (resizeHandler) window.removeEventListener("resize", resizeHandler);
      if (mouseMoveHandler) window.removeEventListener("mousemove", mouseMoveHandler);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none"
      style={{ opacity: 0.6, willChange: "transform" }}
    />
  );
};

export default ParticleBackground;
