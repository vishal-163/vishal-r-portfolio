import { useState, useEffect } from "react";

const navItems = [
  { label: "Home",      href: "#home" },
  { label: "About",     href: "#about" },
  { label: "Skills",    href: "#skills" },
  { label: "Projects",  href: "#projects" },
  { label: "Education", href: "#education" },
  { label: "Contact",   href: "#contact" },
];

export default function Navbar() {
  const [active, setActive]       = useState("home");
  const [mobileOpen, setMobile]   = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const ids = navItems.map(n => n.href.slice(1));
      for (let i = ids.length - 1; i >= 0; i--) {
        const el = document.getElementById(ids[i]);
        if (el && el.getBoundingClientRect().top <= 80) { setActive(ids[i]); break; }
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const go = (href: string) => {
    setMobile(false);
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      height: 56,
      background: "rgba(5,8,16,0.85)",
      backdropFilter: "blur(20px) saturate(180%)",
      WebkitBackdropFilter: "blur(20px) saturate(180%)",
      borderBottom: "1px solid rgba(0,212,170,0.08)",
      display: "flex", alignItems: "center",
    }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px", width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between" }}>

        {/* Logo */}
        <button onClick={() => go("#home")} style={{ background: "none", border: "none", cursor: "pointer", padding: 0 }}>
          <code style={{
            fontFamily: "var(--mono)", fontSize: 13, fontWeight: 600,
            color: "var(--accent)",
            border: "1px solid var(--accent)",
            borderRadius: 6, padding: "2px 8px",
          }}>~/vishal-r</code>
        </button>

        {/* Desktop links */}
        <div className="hidden md:flex" style={{ gap: 4 }}>
          {navItems.map(item => {
            const id = item.href.slice(1);
            const isActive = active === id;
            return (
              <button key={id} onClick={() => go(item.href)} style={{
                background: isActive ? "rgba(0,212,170,0.1)" : "none",
                border: "none",
                borderLeft: isActive ? "2px solid var(--accent)" : "2px solid transparent",
                borderRadius: isActive ? "0 4px 4px 0" : 4,
                color: isActive ? "var(--accent)" : "rgba(255,255,255,0.55)",
                fontFamily: "var(--sans)", fontSize: "1rem", fontWeight: 500,
                padding: "6px 14px",
                cursor: "pointer",
                transition: "all 200ms var(--ease)",
              }}
              onMouseEnter={e => { if (!isActive) (e.currentTarget as HTMLButtonElement).style.background = "rgba(0,212,170,0.08)"; (e.currentTarget as HTMLButtonElement).style.color = "#fff"; }}
              onMouseLeave={e => { if (!isActive) { (e.currentTarget as HTMLButtonElement).style.background = "none"; (e.currentTarget as HTMLButtonElement).style.color = "rgba(255,255,255,0.55)"; } }}
              >
                {item.label}
              </button>
            );
          })}
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden"
          onClick={() => setMobile(!mobileOpen)}
          aria-label="Toggle menu"
          style={{ background: "none", border: "none", cursor: "pointer", color: "var(--text-muted)", fontSize: 20, lineHeight: 1 }}
        >
          {mobileOpen ? "✕" : "☰"}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div style={{
          position: "absolute", top: 56, left: 0, right: 0,
          background: "rgba(5,8,16,0.96)",
          backdropFilter: "blur(20px)",
          borderBottom: "1px solid var(--border)",
          padding: "8px 0",
        }}>
          {navItems.map(item => {
            const id = item.href.slice(1);
            return (
              <button key={id} onClick={() => go(item.href)} style={{
                display: "block", width: "100%", textAlign: "left",
                padding: "12px 24px",
                background: "none", border: "none", cursor: "pointer",
                color: active === id ? "var(--accent)" : "var(--text-muted)",
                fontFamily: "var(--sans)", fontSize: 14,
              }}>
                {item.label}
              </button>
            );
          })}
        </div>
      )}
    </nav>
  );
}
