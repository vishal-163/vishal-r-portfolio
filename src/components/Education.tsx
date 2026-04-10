const languages = [
  { name: "English", level: "Fluent",  pct: 95 },
  { name: "Kannada", level: "Fluent",  pct: 90 },
  { name: "Hindi",   level: "Fluent",  pct: 88 },
  { name: "Telugu",  level: "Native",  pct: 100 },
  { name: "Tamil",   level: "Fluent",  pct: 85 },
];

const fields = [
  { label: "DEGREE",    value: "Bachelor of Engineering" },
  { label: "MAJOR",     value: "Computer Science & Engineering" },
  { label: "INSTITUTE", value: "K.S. Institute of Technology" },
  { label: "LOCATION",  value: "Bangalore, India" },
  { label: "GRAD",      value: "Expected 2027" },
];

export default function Education() {
  return (
    <section id="education" style={{ padding: "80px 24px", position: "relative", zIndex: 10 }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>

        {/* Heading */}
        <div style={{ marginBottom: 48 }}>
          <h2 style={{ fontFamily: "var(--mono)", fontSize: "clamp(1.4rem, 3vw, 2rem)", fontWeight: 600, color: "#fff" }}>
            <span style={{ color: "var(--accent)" }}>&lt;</span>
            Education
            <span style={{ color: "var(--accent)" }}> /&gt;</span>
          </h2>
        </div>

        {/* Terminal window */}
        <div className="terminal-card">
          {/* Title bar */}
          <div className="terminal-bar">
            <span className="terminal-dot" style={{ background: "#ff5f57" }} />
            <span className="terminal-dot" style={{ background: "#febc2e" }} />
            <span className="terminal-dot" style={{ background: "#28c840" }} />
            <span style={{ fontFamily: "var(--mono)", fontSize: "0.85rem", color: "var(--text-dim)", marginLeft: 8 }}>education.json</span>
          </div>

          {/* Content */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 0 }} className="md:edu-grid">

            {/* Left: fields */}
            <div style={{ padding: "28px 32px", borderRight: "1px solid var(--border)" }}>
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                {fields.map(f => (
                  <div key={f.label} style={{ display: "flex", alignItems: "baseline", gap: 10 }}>
                    <span style={{ fontFamily: "var(--mono)", fontSize: "0.85rem", color: "var(--accent)", opacity: 0.65, minWidth: 90, letterSpacing: "0.08em" }}>{f.label}</span>
                    <span style={{ color: "var(--accent)", opacity: 0.4, fontSize: "1rem" }}>›</span>
                    <span style={{ fontSize: "1rem", color: "#fff", fontWeight: 500 }}>{f.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: language bars */}
            <div style={{ padding: "28px 32px" }}>
              <p style={{ fontFamily: "var(--mono)", fontSize: "0.85rem", color: "var(--text-dim)", marginBottom: 20, letterSpacing: "0.08em" }}>LANGUAGES</p>
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                {languages.map(l => (
                  <div key={l.name}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                      <span style={{ fontSize: "1rem", color: "var(--text)", fontWeight: 500 }}>{l.name}</span>
                      <span style={{ fontFamily: "var(--mono)", fontSize: "0.9rem", color: "var(--text-muted)" }}>{l.level}</span>
                    </div>
                    <div style={{ height: 6, background: "rgba(255,255,255,0.06)", borderRadius: 2, overflow: "hidden" }}>
                      <div className="lang-bar-fill" style={{ width: `${l.pct}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (min-width: 640px) {
          .md\\:edu-grid { grid-template-columns: 1fr 1fr !important; }
        }
      `}</style>
    </section>
  );
}
