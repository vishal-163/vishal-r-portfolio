/**
 * AuroraBackground — pure CSS ambient light layer.
 * No Framer Motion, no JS animation loop.
 * Uses CSS keyframes for a very slow, GPU-composited pulse.
 * Zero JS overhead on scroll or resize.
 */
export default function AuroraBackground() {
  return (
    <div
      className="fixed inset-0 pointer-events-none overflow-hidden"
      style={{ zIndex: 0 }}
      aria-hidden="true"
    >
      {/* Top-left cyan ambient */}
      <div
        style={{
          position: "fixed",
          width: "55vw",
          height: "55vw",
          maxWidth: 600,
          maxHeight: 600,
          left: "-15%",
          top: "-15%",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(6,182,212,0.09) 0%, transparent 70%)",
          filter: "blur(40px)",
          animation: "aurora-pulse-a 12s ease-in-out infinite",
          willChange: "opacity",
        }}
      />

      {/* Bottom-right emerald ambient */}
      <div
        style={{
          position: "fixed",
          width: "50vw",
          height: "50vw",
          maxWidth: 550,
          maxHeight: 550,
          right: "-12%",
          bottom: "-12%",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(16,185,129,0.07) 0%, transparent 70%)",
          filter: "blur(40px)",
          animation: "aurora-pulse-b 14s ease-in-out infinite",
          willChange: "opacity",
        }}
      />

      {/* Center subtle vignette depth */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          background: "radial-gradient(ellipse 120% 80% at 50% 50%, transparent 30%, rgba(0,0,0,0.18) 100%)",
          pointerEvents: "none",
        }}
      />

      <style>{`
        @keyframes aurora-pulse-a {
          0%, 100% { opacity: 0.7; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.06); }
        }
        @keyframes aurora-pulse-b {
          0%, 100% { opacity: 0.6; transform: scale(1.04); }
          50% { opacity: 0.9; transform: scale(1); }
        }
        @media (prefers-reduced-motion: reduce) {
          @keyframes aurora-pulse-a { 0%, 100% { opacity: 0.7; } }
          @keyframes aurora-pulse-b { 0%, 100% { opacity: 0.6; } }
        }
      `}</style>
    </div>
  );
}
