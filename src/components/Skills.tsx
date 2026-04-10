import { useState } from "react";

const categories = [
  { id: "frontend",  file: "frontend.ts",  color: "#3b82f6", skills: ["React.js","Flutter","CSS","Next.js 14","Dart","HTML","Tailwind CSS","shadcn/ui","Framer Motion"] },
  { id: "backend",   file: "backend.ts",   color: "#7c3aed", skills: ["Node.js","Express.js","REST APIs","JWT Authentication","RBAC","Python","Java(Learning)"] },
  { id: "databases", file: "databases.ts", color: "#00d4aa", skills: ["PostgreSQL","Supabase","MySQL"] },
  { id: "ai",        file: "ai-ml.ts",     color: "#f59e0b", skills: ["OpenAI API","Gemini API","Flask"] },
  { id: "tools",     file: "tools.ts",     color: "#94a3b8", skills: ["Git","GitHub","Docker","Vercel","Netlify","VS Code"] },
];

export default function Skills() {
  const [active, setActive] = useState("frontend");
  const cat = categories.find(c => c.id === active)!;

  return (
    <section id="skills" style={{ padding: "60px 16px", position: "relative", zIndex: 10 }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", width: "100%" }}>

        <div style={{ marginBottom: 40 }}>
          <h2 style={{ fontFamily: "var(--mono)", fontSize: "clamp(1.6rem, 5vw, 2.2rem)", fontWeight: 600, color: "#fff" }}>
            <span style={{ color: "var(--accent)" }}>&lt;</span>Skills<span style={{ color: "var(--accent)" }}> /&gt;</span>
          </h2>
        </div>

        {/* Mobile: tab pills on top, chips below. Desktop: sidebar + panel */}
        <div style={{ border: "1px solid var(--border)", borderRadius: 8, overflow: "hidden" }}>

          {/* Mobile tab strip */}
          <div className="skills-tabs-mobile">
            {categories.map(c => (
              <button
                key={c.id}
                onClick={() => setActive(c.id)}
                style={{
                  fontFamily: "var(--mono)", fontSize: "0.8rem",
                  padding: "8px 12px",
                  background: active === c.id ? `${c.color}18` : "transparent",
                  color: active === c.id ? c.color : "var(--text-muted)",
                  border: "none",
                  borderBottom: active === c.id ? `2px solid ${c.color}` : "2px solid transparent",
                  cursor: "pointer",
                  whiteSpace: "nowrap",
                  transition: "all 150ms",
                }}
              >
                {c.id}
              </button>
            ))}
          </div>

          {/* Desktop: sidebar + panel */}
          <div className="skills-desktop-layout">

            {/* Sidebar file tree */}
            <div className="skills-sidebar">
              <p style={{ fontFamily: "var(--mono)", fontSize: "0.8rem", color: "var(--text-dim)", padding: "10px 12px 6px", letterSpacing: "0.08em" }}>EXPLORER</p>
              <p style={{ fontFamily: "var(--mono)", fontSize: "0.9rem", color: "var(--text-muted)", padding: "2px 12px 8px" }}>📁 skills/</p>
              {categories.map(c => (
                <div
                  key={c.id}
                  className={`file-tree-item${active === c.id ? " active" : ""}`}
                  style={{ paddingLeft: 24 }}
                  onClick={() => setActive(c.id)}
                >
                  <span style={{ color: c.color, fontSize: 9 }}>●</span>
                  <span style={{ fontSize: "0.9rem" }}>{c.file}</span>
                </div>
              ))}
            </div>

            {/* Skill panel */}
            <div style={{ padding: "20px", background: "var(--surface)", flex: 1, minWidth: 0 }}>
              <div style={{ borderBottom: "1px solid var(--border)", marginBottom: 20, paddingBottom: 0 }}>
                <span style={{
                  fontFamily: "var(--mono)", fontSize: "0.9rem",
                  color: cat.color, display: "inline-block",
                  padding: "6px 14px",
                  borderBottom: `2px solid ${cat.color}`,
                  marginBottom: -1,
                  background: "rgba(255,255,255,0.03)",
                }}>{cat.file}</span>
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {cat.skills.map(skill => (
                  <span key={skill} className="chip" style={{ borderColor: `${cat.color}40`, color: cat.color }}>{skill}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .skills-tabs-mobile {
          display: flex;
          overflow-x: auto;
          border-bottom: 1px solid var(--border);
          background: rgba(255,255,255,0.015);
          -webkit-overflow-scrolling: touch;
          scrollbar-width: none;
        }
        .skills-tabs-mobile::-webkit-scrollbar { display: none; }
        .skills-desktop-layout { display: flex; }
        .skills-sidebar { display: none; }

        @media (min-width: 640px) {
          .skills-tabs-mobile { display: none; }
          .skills-sidebar {
            display: block;
            width: 200px;
            flex-shrink: 0;
            background: rgba(255,255,255,0.015);
            border-right: 1px solid var(--border);
            padding: 10px 0;
          }
        }
      `}</style>
    </section>
  );
}
