/**
 * Background — OS/IDE aesthetic.
 * Dot grid + two aurora blobs + scanline handled in CSS.
 */
const DOT_GRID = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='28' height='28'%3E%3Ccircle cx='1' cy='1' r='1' fill='rgba(0%2C212%2C170%2C0.07)'/%3E%3C/svg%3E")`;

export default function AuroraBackground() {
  return (
    <div aria-hidden="true" style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none", overflow: "hidden", background: "#050810" }}>
      {/* Dot grid */}
      <div style={{ position: "absolute", inset: 0, backgroundImage: DOT_GRID, backgroundSize: "28px 28px" }} />
      {/* Cyan-teal blob — top-left */}
      <div style={{
        position: "absolute", top: "-20%", left: "-15%",
        width: "70vw", maxWidth: 800, height: "70vw", maxHeight: 800,
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(0,212,170,0.12) 0%, transparent 65%)",
        filter: "blur(120px)",
      }} />
      {/* Indigo-violet blob — bottom-right */}
      <div style={{
        position: "absolute", bottom: "-20%", right: "-15%",
        width: "65vw", maxWidth: 750, height: "65vw", maxHeight: 750,
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(124,58,237,0.12) 0%, transparent 65%)",
        filter: "blur(120px)",
      }} />
    </div>
  );
}
