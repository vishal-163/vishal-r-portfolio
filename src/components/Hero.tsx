import { TypeAnimation } from "react-type-animation";
import profileImg from "@/assets/profile.jpg";

const scrollTo = (id: string) => document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });

export default function Hero() {
  return (
    <section id="home" style={{ minHeight: "calc(100vh - 56px)", display: "flex", alignItems: "center", padding: "40px 16px 60px", position: "relative", zIndex: 10 }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", width: "100%" }}>

        {/* Mobile: image on top, text below. Desktop: side by side */}
        <div className="hero-layout">

          {/* Profile image — shows first on mobile */}
          <div className="hero-image-col">
            <div className="corner-bracket" style={{ display: "inline-block" }}>
              <span aria-hidden="true" />
              <img
                src={profileImg}
                alt="Vishal R"
                loading="eager"
                style={{
                  width: "clamp(160px, 40vw, 300px)",
                  height: "clamp(160px, 40vw, 300px)",
                  objectFit: "cover",
                  borderRadius: 8,
                  display: "block",
                  border: "1px solid var(--border)",
                }}
              />
            </div>
          </div>

          {/* Text content */}
          <div className="hero-text-col">

            {/* Status badge */}
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "4px 12px", border: "1px solid var(--border)", borderRadius: 20, marginBottom: 20 }}>
              <span style={{ width: 7, height: 7, borderRadius: "50%", background: "var(--accent)", display: "inline-block", flexShrink: 0 }} />
              <span style={{ fontFamily: "var(--mono)", fontSize: "0.8rem", color: "var(--text-muted)", letterSpacing: "0.06em" }}>AVAILABLE FOR OPPORTUNITIES</span>
            </div>

            {/* Name */}
            <h1 style={{ fontSize: "clamp(2.4rem, 8vw, 5rem)", fontWeight: 700, lineHeight: 1.0, letterSpacing: "-0.02em", color: "#fff", fontFamily: "var(--sans)", marginBottom: 16 }}>
              Vishal R
            </h1>

            {/* Role */}
            <p style={{ fontFamily: "var(--mono)", fontSize: "clamp(0.9rem, 2.5vw, 1.05rem)", color: "var(--accent)", lineHeight: 1.6, marginBottom: 16 }}>
              <span style={{ color: "var(--text-dim)" }}>"</span>
              <TypeAnimation
                sequence={["Aspiring Full Stack Developer", 2200, "", 350, "Building Scalable Web & AI Systems", 2200, "", 350, "CS Undergraduate", 2200, "", 350]}
                speed={58} repeat={Infinity} cursor={false}
              />
              <span style={{ color: "var(--text-dim)" }}>"</span>
              <span className="blink" style={{ color: "var(--accent)", marginLeft: 2 }}>_</span>
            </p>

            {/* Bio */}
            <p style={{ fontSize: "clamp(0.95rem, 2vw, 1.05rem)", color: "var(--text-muted)", lineHeight: 1.85, marginBottom: 28 }}>
              A Computer Science student and aspiring Full Stack Developer with a strong interest in
              building scalable web and AI-driven applications. I have hands-on experience with
              technologies like React, HTML, CSS, Python and PostgreSQL, and I enjoy working across
              both frontend and backend to create efficient systems.
            </p>

            {/* Buttons */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
              <button className="btn-primary" onClick={() => scrollTo("#projects")}>&gt; view_projects()</button>
              <a className="btn-outline" href="/resume.pdf" target="_blank" rel="noopener noreferrer">view_resume()</a>
              <button className="btn-outline" onClick={() => scrollTo("#contact")}>contact_me()</button>
            </div>
          </div>

        </div>
      </div>

      <style>{`
        .hero-layout {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 36px;
          text-align: center;
        }
        .hero-image-col { order: 1; }
        .hero-text-col  { order: 2; width: 100%; }

        @media (min-width: 768px) {
          .hero-layout {
            flex-direction: row;
            align-items: center;
            text-align: left;
            gap: 64px;
          }
          .hero-image-col { order: 2; flex-shrink: 0; }
          .hero-text-col  { order: 1; flex: 1; }
        }
      `}</style>
    </section>
  );
}
