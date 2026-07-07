import { useState, useEffect, useRef } from 'react';

type TabType = 'frontend' | 'backend' | 'databases' | 'ai' | 'tools';

const SKILLS = {
  frontend: [
    { name: 'React.js', value: 90 },
    { name: 'Next.js 14', value: 85 },
    { name: 'Flutter', value: 75 },
    { name: 'Tailwind CSS', value: 90 },
    { name: 'HTML/CSS', value: 95 },
    { name: 'Framer Motion', value: 70 },
    { name: 'shadcn/ui', value: 80 },
    { name: 'Dart', value: 70 },
  ],
  backend: [
    { name: 'Node.js', value: 85 },
    { name: 'Express.js', value: 80 },
    { name: 'REST APIs', value: 88 },
    { name: 'JWT Auth', value: 82 },
    { name: 'RBAC', value: 75 },
    { name: 'Python', value: 80 },
    { name: 'Java (Learning)', value: 45 },
  ],
  databases: [
    { name: 'PostgreSQL', value: 85 },
    { name: 'Supabase', value: 80 },
    { name: 'MySQL', value: 75 },
  ],
  ai: [
    { name: 'OpenAI API', value: 82 },
    { name: 'Gemini API', value: 78 },
    { name: 'Flask', value: 72 },
  ],
  tools: [
    { name: 'Git/GitHub', value: 90 },
    { name: 'Docker', value: 72 },
    { name: 'Vercel', value: 85 },
    { name: 'Netlify', value: 80 },
    { name: 'VS Code', value: 95 },
  ],
};

const TAB_COLORS: Record<TabType, string> = {
  frontend: 'var(--green)',
  backend: 'var(--cyan)',
  databases: 'var(--teal)',
  ai: '#f59e0b',
  tools: '#94a3b8'
};

export function SkillsSection() {
  const [activeTab, setActiveTab] = useState<TabType>('frontend');
  const [animateBars, setAnimateBars] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    // Reset animation trigger when tab changes
    setAnimateBars(false);
    const timer = setTimeout(() => setAnimateBars(true), 60);
    return () => clearTimeout(timer);
  }, [activeTab]);

  useEffect(() => {
    // Animate bars on initial scroll into view
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setAnimateBars(true);
        }
      },
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="skills" className="dot-bg" ref={sectionRef}>
      <div className="wrap">
        <div className="reveal">
          <div className="sec-num">02</div>
          <h2 className="sec-title">&lt;Tech Stack /&gt;</h2>
        </div>
        <div className="editor reveal">
          <div className="editor-tabs">
            <div className="editor-dots">
              <div className="tdot" style={{ background: '#ff5f57' }} />
              <div className="tdot" style={{ background: '#febc2e' }} />
              <div className="tdot" style={{ background: '#28c840' }} />
            </div>
            {(Object.keys(SKILLS) as TabType[]).map((tab) => (
              <div
                key={tab}
                className={`editor-tab ${activeTab === tab ? 'active' : ''}`}
                onClick={() => setActiveTab(tab)}
              >
                {tab === 'frontend' ? '🌐 ' : tab === 'backend' ? '⚙️ ' : tab === 'databases' ? '🗄️ ' : tab === 'ai' ? '🤖 ' : '🔧 '}
                {tab === 'ai' ? 'ai-ml' : tab}.ts
              </div>
            ))}
          </div>
          <div className="editor-layout">
            <div className="editor-sidebar">
              <div className="sidebar-lbl">EXPLORER</div>
              <div className="sidebar-folder">📁 skills/</div>
              {(Object.keys(SKILLS) as TabType[]).map((tab) => (
                <div
                  key={tab}
                  className={`sidebar-file ${activeTab === tab ? 'active' : ''}`}
                  onClick={() => setActiveTab(tab)}
                >
                  <span style={{ color: TAB_COLORS[tab], fontSize: 9 }}>●</span> {tab === 'ai' ? 'ai-ml' : tab}.ts
                </div>
              ))}
            </div>
            <div className="editor-panel">
              <div className="skill-pane active">
                <div className="skill-interface">
                  interface {activeTab === 'ai' ? 'ai_ml' : activeTab} {'{'}
                </div>
                {SKILLS[activeTab].map((skill) => (
                  <div className="skill-row" key={skill.name}>
                    <span className="skill-name">{skill.name}</span>
                    <div className="skill-bar-wrap">
                      <div
                        className="skill-bar"
                        style={{ width: animateBars ? `${skill.value}%` : '0%' }}
                      />
                    </div>
                    <span className="skill-pct">{skill.value}%</span>
                  </div>
                ))}
                <div style={{ fontFamily: 'var(--mono)', fontSize: '.82rem', color: 'var(--dim)', marginTop: 4 }}>
                  {'}'}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
