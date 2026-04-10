const links = [
  { label: "email",    value: "vishalravi163@gmail.com",    href: "mailto:vishalravi163@gmail.com",                    short: "vishalravi163@gmail.com" },
  { label: "phone",    value: "+91 8147741585",              href: "tel:+918147741585",                                 short: "+91 8147741585" },
  { label: "linkedin", value: "linkedin.com/in/vishal-r",   href: "https://www.linkedin.com/in/vishal-ravi-653a8a33b/", short: "linkedin/vishal-r" },
  { label: "github",   value: "github.com/vishal-163",      href: "https://github.com/vishal-163",                     short: "github/vishal-163" },
];

export default function Contact() {
  return (
    <section id="contact" style={{ padding: "60px 16px 100px", position: "relative", zIndex: 10 }}>
      <div style={{ maxWidth: 600, margin: "0 auto", width: "100%" }}>

        {/* Heading */}
        <div style={{ marginBottom: 40 }}>
          <h2 style={{ fontFamily: "var(--mono)", fontSize: "clamp(1.6rem, 5vw, 2.2rem)", fontWeight: 600, color: "#fff" }}>
            <span style={{ color: "var(--accent)" }}>&lt;</span>Contact<span style={{ color: "var(--accent)" }}> /&gt;</span>
          </h2>
        </div>

        <div className="terminal-card">
          {/* Title bar */}
          <div className="terminal-bar">
            <span className="terminal-dot" style={{ background: "#ff5f57" }} />
            <span className="terminal-dot" style={{ background: "#febc2e" }} />
            <span className="terminal-dot" style={{ background: "#28c840" }} />
            <span style={{ fontFamily: "var(--mono)", fontSize: "0.85rem", color: "var(--text-dim)", marginLeft: 8 }}>contact.ts</span>
          </div>

          <div style={{ padding: "24px 20px" }}>
            {/* Command line */}
            <p style={{ fontFamily: "var(--mono)", fontSize: "0.95rem", color: "var(--text-muted)", marginBottom: 20 }}>
              <span style={{ color: "var(--accent)" }}>$</span> deploy contact.ts
              <span className="blink" style={{ color: "var(--accent)", marginLeft: 4 }}>_</span>
            </p>

            {/* Contact rows — mobile-safe layout */}
            <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 24 }}>
              {links.map(l => (
                <a
                  key={l.href}
                  href={l.href}
                  target={l.href.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    padding: "12px 14px",
                    border: "1px solid rgba(0,212,170,0.15)",
                    borderRadius: 6,
                    textDecoration: "none",
                    transition: "background 200ms, border-color 200ms",
                    minWidth: 0,
                  }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLAnchorElement).style.background = "rgba(0,212,170,0.06)";
                    (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(0,212,170,0.35)";
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLAnchorElement).style.background = "transparent";
                    (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(0,212,170,0.15)";
                  }}
                >
                  {/* Check + label */}
                  <span style={{ color: "var(--accent)", fontFamily: "var(--mono)", fontSize: "1rem", flexShrink: 0 }}>✓</span>
                  <span style={{ fontFamily: "var(--mono)", fontSize: "0.8rem", color: "var(--text-dim)", flexShrink: 0, minWidth: 64 }}>{l.label}</span>

                  {/* Value — truncates cleanly */}
                  <span style={{
                    fontSize: "0.95rem",
                    color: "rgba(255,255,255,0.75)",
                    flex: 1,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                    minWidth: 0,
                  }}>{l.short}</span>

                  {/* Arrow — always visible, right-aligned */}
                  <span style={{
                    fontFamily: "var(--mono)",
                    fontSize: "0.8rem",
                    color: "var(--accent)",
                    flexShrink: 0,
                    opacity: 0.6,
                  }}>→</span>
                </a>
              ))}
            </div>

            {/* CTA */}
            <button
              className="btn-primary"
              style={{ width: "100%", justifyContent: "center", padding: "14px 24px", fontSize: "1rem" }}
              onClick={() => window.location.href = "mailto:vishalravi163@gmail.com"}
            >
              &gt; initiate_contact()
            </button>

            {/* Status */}
            <div style={{ marginTop: 16, paddingTop: 14, borderTop: "1px solid var(--border)", display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#00d4aa", flexShrink: 0, display: "inline-block" }} />
              <span style={{ fontFamily: "var(--mono)", fontSize: "0.85rem", color: "var(--text-muted)" }}>ready to deploy</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
