import React from 'react';
export function AboutSection() {
  return (
    <>
      <section id="about" className="grid-bg">
    <div className="wrap">
      <div className="reveal">
        <div className="sec-num">01</div>
        <h2 className="sec-title">&lt;About Me /&gt;</h2>
      </div>
      <div className="about-cards">
        <div className="tilt-card about-card reveal" style={{} as React.CSSProperties}>
          <div className="about-icon">⌥</div>
          <div className="about-card-title">Full Stack Development</div>
          <div className="about-card-desc">End-to-end web applications with modern frameworks</div>
        </div>
        <div className="tilt-card about-card reveal" style={{} as React.CSSProperties}>
          <div className="about-icon">⊕</div>
          <div className="about-card-title">AI Integration</div>
          <div className="about-card-desc">Building intelligent systems with OpenAI &amp; Gemini</div>
        </div>
        <div className="tilt-card about-card reveal" style={{} as React.CSSProperties}>
          <div className="about-icon">≡</div>
          <div className="about-card-title">System Design</div>
          <div className="about-card-desc">Scalable architectures for production-grade apps</div>
        </div>
        <div className="tilt-card about-card reveal" style={{} as React.CSSProperties}>
          <div className="about-icon">◈</div>
          <div className="about-card-title">Problem Solving</div>
          <div className="about-card-desc">Creative solutions to complex engineering challenges</div>
        </div>
      </div>
      <div className="term reveal" style={{transitionDelay: '.1s'}}>
        <div className="term-bar">
          <div className="tdot" style={{background: '#ff5f57'}} />
          <div className="tdot" style={{background: '#febc2e'}} />
          <div className="tdot" style={{background: '#28c840'}} />
          <span className="term-title">who_am_i.ts</span>
        </div>
        <div className="term-body">
          <div style={{color: 'var(--dim)'}}>const aboutMe = {'{'}</div>
          <div style={{paddingLeft: 20, marginTop: 8, fontSize: 'clamp(.88rem,1.6vw,.98rem)', lineHeight: '1.9', color: '#c8d8c8'}}>
            I am a Computer Science student with aspiring experience in full stack development and AI-integrated
            systems.
            I have worked on scalable applications using modern technologies like <span className="code-hl">React</span>,
            <span className="code-hl">Next.js</span>, <span className="code-hl">Node.js</span>, and <span className="code-hl">PostgreSQL</span>.
            I am currently building an advanced Smart Military Vest system focused on real-time health monitoring and
            emergency response using IoT and secure communication protocols.
          </div>
          <div style={{color: 'var(--dim)', marginTop: 8}}>{'}'}</div>
          <div className="about-chips">
            <span className="chip">React</span><span className="chip">Next.js</span><span className="chip">Node.js</span>
            <span className="chip">PostgreSQL</span><span className="chip">Python</span>
          </div>
        </div>
      </div>
    </div>
  </section>
    </>
  );
}
