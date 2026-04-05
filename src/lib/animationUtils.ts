/**
 * Pure utility functions for animation calculations.
 * These are kept side-effect-free so they can be unit/property tested easily.
 */

/**
 * Detects whether the device is truly low-end.
 * Only triggers on 1–2 CPU cores OR explicit prefers-reduced-motion.
 * Most modern phones/laptops have 4+ cores so they get particles.
 */
export function isLowEndDevice(): boolean {
  if (typeof window === "undefined") return false;
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const lowCPU = typeof navigator !== "undefined" && navigator.hardwareConcurrency <= 2;
  return reducedMotion || lowCPU;
}

export interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  color: "cyan" | "emerald";
}

/**
 * Returns the number of particles to render based on viewport width.
 * Counts are kept lean for performance: ~50% of original values.
 */
export function getParticleCount(width: number): number {
  if (width > 1024) return 60;
  if (width >= 768) return 35;
  return 20;
}

/**
 * Applies a repulsion/attraction mouse force to a particle when it is
 * within `radius` pixels of the cursor. Mutates particle.vx and particle.vy.
 */
export function applyMouseForce(
  particle: Particle,
  mouseX: number,
  mouseY: number,
  radius: number
): void {
  const dx = particle.x - mouseX;
  const dy = particle.y - mouseY;
  const distance = Math.sqrt(dx * dx + dy * dy);

  if (distance < radius && distance > 0) {
    const force = (radius - distance) / radius;
    particle.vx += (dx / distance) * force * 2;
    particle.vy += (dy / distance) * force * 2;
  }
}

/**
 * Returns the opacity for a connection line between two particles.
 * Formula: (1 - distance / maxDist) * 0.15, clamped to [0, 0.15].
 */
export function connectionOpacity(distance: number, maxDist: number): number {
  const raw = (1 - distance / maxDist) * 0.15;
  return Math.min(0.15, Math.max(0, raw));
}

/**
 * Returns a parallax Y offset for a given scroll position and factor.
 * Clamped to [-80, 80] pixels.
 */
export function getParallaxOffset(scrollY: number, factor: number): number {
  const raw = scrollY * factor;
  return Math.min(80, Math.max(-80, raw));
}

/**
 * Returns the Framer Motion entrance animation delay (in seconds) for a
 * Hero section child element at the given index.
 * delay = index * 0.15
 */
export function getHeroDelay(index: number): number {
  return index * 0.15;
}
