import { describe, it, expect } from "vitest";
import * as fc from "fast-check";
import {
  getParticleCount,
  applyMouseForce,
  connectionOpacity,
  getParallaxOffset,
  type Particle,
} from "@/lib/animationUtils";

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function makeParticle(overrides: Partial<Particle> = {}): Particle {
  return {
    x: 0,
    y: 0,
    vx: 0,
    vy: 0,
    size: 2,
    opacity: 1,
    color: "cyan",
    ...overrides,
  };
}

// ---------------------------------------------------------------------------
// Property 1: Particle count meets viewport minimums
// Validates: Requirements 1.2
// ---------------------------------------------------------------------------

describe("getParticleCount", () => {
  it("Property 1: returns >= 100 for widths > 1024", () => {
    fc.assert(
      fc.property(fc.integer({ min: 1025, max: 4096 }), (width) => {
        expect(getParticleCount(width)).toBeGreaterThanOrEqual(100);
      }),
      { numRuns: 100 }
    );
  });

  it("Property 1: returns >= 60 for widths 768–1024", () => {
    fc.assert(
      fc.property(fc.integer({ min: 768, max: 1024 }), (width) => {
        expect(getParticleCount(width)).toBeGreaterThanOrEqual(60);
      }),
      { numRuns: 100 }
    );
  });

  it("Property 1: returns >= 40 for widths < 768", () => {
    fc.assert(
      fc.property(fc.integer({ min: 1, max: 767 }), (width) => {
        expect(getParticleCount(width)).toBeGreaterThanOrEqual(40);
      }),
      { numRuns: 100 }
    );
  });
});

// ---------------------------------------------------------------------------
// Property 2: Mouse force modifies particle velocity within radius
// Validates: Requirements 1.3
// ---------------------------------------------------------------------------

describe("applyMouseForce", () => {
  it("Property 2: modifies vx or vy when distance < radius", () => {
    // Use integer offsets to avoid floating-point precision issues near zero.
    // We generate a non-zero offset vector (dx, dy) with integer components
    // such that the Euclidean distance is strictly between 1 and 119.
    const arbWithinRadius = fc
      .record({
        px: fc.integer({ min: -500, max: 500 }),
        py: fc.integer({ min: -500, max: 500 }),
        dx: fc.integer({ min: -84, max: 84 }),
        dy: fc.integer({ min: -84, max: 84 }),
      })
      .filter(({ dx, dy }) => {
        const dist = Math.sqrt(dx * dx + dy * dy);
        return dist >= 1 && dist < 119;
      });

    fc.assert(
      fc.property(arbWithinRadius, ({ px, py, dx, dy }) => {
        const particle = makeParticle({ x: px, y: py, vx: 0, vy: 0 });
        // mouse is offset from particle by (dx, dy), so distance = sqrt(dx²+dy²)
        const mouseX = px - dx;
        const mouseY = py - dy;
        applyMouseForce(particle, mouseX, mouseY, 120);
        expect(particle.vx !== 0 || particle.vy !== 0).toBe(true);
      }),
      { numRuns: 100 }
    );
  });

  it("does NOT modify velocity when distance >= radius", () => {
    fc.assert(
      fc.property(
        fc.float({ min: 120, max: 1000, noNaN: true }),
        (distance) => {
          const particle = makeParticle({ x: 0, y: 0, vx: 0, vy: 0 });
          // place mouse exactly `distance` away on the x-axis
          applyMouseForce(particle, distance, 0, 120);
          expect(particle.vx).toBe(0);
          expect(particle.vy).toBe(0);
        }
      ),
      { numRuns: 100 }
    );
  });
});

// ---------------------------------------------------------------------------
// Property 3: Connection opacity is proportional to proximity
// Validates: Requirements 1.4
// ---------------------------------------------------------------------------

describe("connectionOpacity", () => {
  it("Property 3: returns > 0 for distance < maxDist", () => {
    // Use integers in [0, 149] to avoid 32-bit float constraint issues
    fc.assert(
      fc.property(fc.integer({ min: 0, max: 149 }), (d) => {
        const opacity = connectionOpacity(d, 150);
        expect(opacity).toBeGreaterThan(0);
      }),
      { numRuns: 100 }
    );
  });

  it("Property 3: result equals (1 - d/maxDist) * 0.15 for d in [0, maxDist)", () => {
    fc.assert(
      fc.property(fc.integer({ min: 0, max: 149 }), (d) => {
        const expected = (1 - d / 150) * 0.15;
        expect(connectionOpacity(d, 150)).toBeCloseTo(expected, 10);
      }),
      { numRuns: 100 }
    );
  });

  it("is clamped to [0, 0.15] for any distance", () => {
    fc.assert(
      fc.property(fc.float({ min: -100, max: 300, noNaN: true }), (d) => {
        const opacity = connectionOpacity(d, 150);
        expect(opacity).toBeGreaterThanOrEqual(0);
        expect(opacity).toBeLessThanOrEqual(0.15);
      }),
      { numRuns: 100 }
    );
  });
});

// ---------------------------------------------------------------------------
// Property 5: Aurora parallax offset is bounded
// Validates: Requirements 2.3
// ---------------------------------------------------------------------------

describe("getParallaxOffset", () => {
  it("Property 5: result is always within [-80, 80]", () => {
    fc.assert(
      fc.property(
        fc.integer({ min: 0, max: 10000 }),
        fc.float({ min: -1, max: 1, noNaN: true }),
        (scrollY, factor) => {
          const offset = getParallaxOffset(scrollY, factor);
          expect(offset).toBeGreaterThanOrEqual(-80);
          expect(offset).toBeLessThanOrEqual(80);
        }
      ),
      { numRuns: 100 }
    );
  });

  it("returns scrollY * factor when within bounds", () => {
    // Small scrollY and factor so product stays within [-80, 80]
    fc.assert(
      fc.property(
        fc.integer({ min: 0, max: 100 }),
        fc.float({ min: 0, max: 0.5, noNaN: true }),
        (scrollY, factor) => {
          const expected = scrollY * factor;
          if (Math.abs(expected) <= 80) {
            expect(getParallaxOffset(scrollY, factor)).toBeCloseTo(expected, 10);
          }
        }
      ),
      { numRuns: 100 }
    );
  });
});

// ---------------------------------------------------------------------------
// Property 7: Hero stagger delay increments are 150ms
// Validates: Requirements 3.1
// ---------------------------------------------------------------------------

import { getHeroDelay } from "@/lib/animationUtils";

describe("getHeroDelay", () => {
  it("Property 7: delay equals index * 0.15 for any non-negative index", () => {
    fc.assert(
      fc.property(fc.integer({ min: 0, max: 20 }), (index) => {
        expect(getHeroDelay(index)).toBeCloseTo(index * 0.15, 10);
      }),
      { numRuns: 100 }
    );
  });

  it("Property 7: delay is 0 for index 0", () => {
    expect(getHeroDelay(0)).toBe(0);
  });

  it("Property 7: delay increments by 0.15 between consecutive indices", () => {
    fc.assert(
      fc.property(fc.integer({ min: 0, max: 19 }), (index) => {
        const diff = getHeroDelay(index + 1) - getHeroDelay(index);
        expect(diff).toBeCloseTo(0.15, 10);
      }),
      { numRuns: 100 }
    );
  });
});
