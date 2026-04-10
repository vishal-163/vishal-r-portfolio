import { Github } from "lucide-react";

const projects = [
  {
    title: "AI Trip Planner",
    description: "AI-powered mobile app that generates personalized travel itineraries based on user preferences, budget, and duration.",
    tech: ["Flutter", "Supabase", "OpenAI API", "Gemini API", "PostgreSQL"],
    techColors: ["#3b82f6","#00d4aa","#f59e0b","#f59e0b","#00d4aa"],
    features: [
      "Built a cross-platform mobile application generating personalized AI-based travel itineraries based on user preferences, budget, and duration, reducing manual planning effort significantly.",
      "Designed a modular three-tier architecture with Flutter frontend, Supabase backend, and a dedicated AI service layer for scalable integration.",
      "Engineered structured data flow ensuring deterministic JSON outputs for seamless UI rendering and improved reliability.",
      "Implemented secure authentication (email + OAuth), row-level security, and normalized database schema for efficient data handling.",
      "Developed full CRUD operations with real-time synchronization using Supabase subscriptions for dynamic updates.",
    ],
    github: "https://github.com/vishal-163/AI-TRIP-PLANNER.git",
    tag: "Completed",
    tagColor: "#00d4aa",
  },
  {
    title: "Smart Military Vest",
    description: "Defence-grade IoT system for real-time soldier health monitoring and automated emergency alerts.",
    tech: ["ESP32", "Sensors", "LoRa", "GSM", "GPS"],
    techColors: ["#f59e0b","#94a3b8","#7c3aed","#3b82f6","#00d4aa"],
    features: [
      "Designing a defence-grade wearable system for real-time soldier health monitoring including heart rate, SpO2, temperature, and motion tracking.",
      "Built multi-sensor integration using I2C and SPI protocols with on-device preprocessing for efficient data aggregation.",
      "Architecting dual-channel communication using LoRa and GSM/4G with AES-256 encryption for secure and reliable transmission.",
      "Developing an intelligent alert system for automated distress signal generation based on health thresholds.",
      "Planning scalable backend architecture using MQTT, time-series database, and analytics dashboard for command centre monitoring.",
    ],
    github: null,
    tag: "In Progress",
    tagColor: "#f59e0b",
  },
];

export default function Projects() {
  return (
    <section id="projects" style={{ padding: "80px 24px", position: "relative", zIndex: 10 }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>

        {/* Heading */}
        <div style={{ marginBottom: 48 }}>
          <h2 style={{ fontFamily: "var(--mono)", fontSize: "clamp(1.4rem, 3vw, 2rem)", fontWeight: 600, color: "#fff" }}>
            <span style={{ color: "var(--accent)" }}>&lt;</span>
            Projects
            <span style={{ color: "var(--accent)" }}> /&gt;</span>
          </h2>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 20 }} className="md:projects-grid">
          {projects.map(p => (
            <div key={p.title} className="repo-card" style={{ padding: "20px 24px" }}>

              {/* Top row */}
              <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 12, marginBottom: 10 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <span style={{ fontFamily: "var(--mono)", fontSize: "1.1rem", fontWeight: 600, color: "#fff" }}>{p.title}</span>
                  <span style={{
                    fontFamily: "var(--mono)", fontSize: "0.8rem", fontWeight: 500,
                    padding: "3px 10px", borderRadius: 4,
                    border: `1px solid ${p.tagColor}40`,
                    color: p.tagColor,
                    background: `${p.tagColor}10`,
                  }}>{p.tag}</span>
                </div>
                {p.github && (
                  <a href={p.github} target="_blank" rel="noopener noreferrer"
                    style={{ color: "var(--text-muted)", display: "flex", alignItems: "center", gap: 5, fontSize: "0.9rem", fontFamily: "var(--mono)", textDecoration: "none" }}
                    onMouseEnter={e => (e.currentTarget.style.color = "var(--accent)")}
                    onMouseLeave={e => (e.currentTarget.style.color = "var(--text-muted)")}
                  >
                    <Github size={14} /> view
                  </a>
                )}
              </div>

              {/* Description */}
              <p style={{ fontSize: "1rem", color: "var(--text-muted)", lineHeight: 1.75, marginBottom: 16 }}>{p.description}</p>

              {/* Features expand */}
              <details style={{ marginBottom: 16 }}>
                <summary style={{ fontFamily: "var(--mono)", fontSize: "0.9rem", color: "var(--accent)", cursor: "pointer", userSelect: "none", marginBottom: 10, opacity: 0.85 }}>
                  &gt;_ key features ({p.features.length})
                </summary>
                <ul style={{ paddingLeft: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 8 }}>
                  {p.features.map(f => (
                    <li key={f} style={{ fontSize: "0.95rem", color: "var(--text-muted)", lineHeight: 1.7, display: "flex", gap: 8 }}>
                      <span style={{ color: "var(--accent)", flexShrink: 0 }}>›</span>{f}
                    </li>
                  ))}
                </ul>
              </details>

              {/* Tech chips */}
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                {p.tech.map((t, i) => (
                  <span key={t} className="chip" style={{ borderColor: `${p.techColors[i]}40`, color: p.techColors[i] }}>{t}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (min-width: 768px) {
          .md\\:projects-grid { grid-template-columns: 1fr 1fr !important; }
        }
      `}</style>
    </section>
  );
}
