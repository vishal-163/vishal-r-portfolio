import { Code, Brain, Layers, Lightbulb } from "lucide-react";

const highlights = [
  { icon: Code,      title: "Full Stack Development", desc: "End-to-end web applications with modern frameworks" },
  { icon: Brain,     title: "AI Integration",         desc: "Building intelligent systems with OpenAI & Gemini" },
  { icon: Layers,    title: "System Design",          desc: "Scalable architectures for production-grade apps" },
  { icon: Lightbulb, title: "Problem Solving",        desc: "Creative solutions to complex engineering challenges" },
];

export default function About() {
  return (
    <section id="about" style={{ padding: "60px 16px", position: "relative", zIndex: 10 }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", width: "100%" }}>

        <div style={{ marginBottom: 40 }}>
          <h2 style={{ fontFamily: "var(--mono)", fontSize: "clamp(1.6rem, 5vw, 2.2rem)", fontWeight: 600, color: "#fff" }}>
            <span style={{ color: "var(--accent)" }}>&lt;</span>About<span style={{ color: "var(--accent)" }}> /&gt;</span>
          </h2>
        </div>

        <div className="about-layout">

          {/* Capability rows */}
          <div style={{ border: "1px solid var(--border)", borderRadius: 8, overflow: "hidden" }}>
            {highlights.map((item, i) => {
              const Icon = item.icon;
              return (
                <div key={item.title} style={{
                  display: "flex", alignItems: "flex-start", gap: 14,
                  padding: "16px 18px",
                  borderBottom: i < highlights.length - 1 ? "1px dashed rgba(255,255,255,0.07)" : "none",
                }}>
                  <div style={{ width: 34, height: 34, borderRadius: 6, background: "var(--accent-dim)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <Icon size={16} color="var(--accent)" />
                  </div>
                  <div style={{ minWidth: 0 }}>
                    <p style={{ fontWeight: 600, fontSize: "1rem", color: "#fff", marginBottom: 3 }}>{item.title}</p>
                    <p style={{ fontSize: "0.9rem", color: "var(--text-muted)", lineHeight: 1.55 }}>{item.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Bio panel */}
          <div className="pane-border" style={{ padding: "22px 20px" }}>
            <p style={{ fontFamily: "var(--mono)", fontSize: "0.8rem", color: "var(--accent)", marginBottom: 14, letterSpacing: "0.1em", opacity: 0.7 }}>// who_am_i.ts</p>
            <p style={{ fontSize: "1rem", color: "var(--text-muted)", lineHeight: 1.85 }}>
              I am a Computer Science student with aspiring experience in full stack development and AI-integrated systems.
              I have worked on scalable applications using modern technologies like React, Next.js, Node.js, and PostgreSQL.
              I am currently building an advanced Smart Military Vest system focused on real-time health monitoring and emergency response using IoT and secure communication protocols.
            </p>
          </div>
        </div>
      </div>

      <style>{`
        .about-layout {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }
        @media (min-width: 768px) {
          .about-layout { flex-direction: row; gap: 32px; }
          .about-layout > * { flex: 1; }
        }
      `}</style>
    </section>
  );
}
