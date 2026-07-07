export function SkillsSection() {
  return (
    <>
      <section id="skills" className="dot-bg">
    <div className="wrap">
      <div className="reveal">
        <div className="sec-num">02</div>
        <h2 className="sec-title">&lt;Tech Stack /&gt;</h2>
      </div>
      <div className="editor reveal">
        <div className="editor-tabs">
          <div className="editor-dots">
            <div className="tdot" style={{background: '#ff5f57'}} />
            <div className="tdot" style={{background: '#febc2e'}} />
            <div className="tdot" style={{background: '#28c840'}} />
          </div>
          <div className="editor-tab active" data-tab="frontend" onClick={(e) => (window as any).switchTab(e.currentTarget, 'frontend')}>🌐 frontend.ts</div>
          <div className="editor-tab" data-tab="backend" onClick={(e) => (window as any).switchTab(e.currentTarget, 'backend')}>⚙️ backend.ts</div>
          <div className="editor-tab" data-tab="databases" onClick={(e) => (window as any).switchTab(e.currentTarget, 'databases')}>🗄️ databases.ts</div>
          <div className="editor-tab" data-tab="ai" onClick={(e) => (window as any).switchTab(e.currentTarget, 'ai')}>🤖 ai-ml.ts</div>
          <div className="editor-tab" data-tab="tools" onClick={(e) => (window as any).switchTab(e.currentTarget, 'tools')}>🔧 tools.ts</div>
        </div>
        <div className="editor-layout">
          <div className="editor-sidebar">
            <div className="sidebar-lbl">EXPLORER</div>
            <div className="sidebar-folder">📁 skills/</div>
            <div className="sidebar-file active" data-tab="frontend" onClick={() => (window as any).switchTab(document.querySelector('[data-tab=frontend].editor-tab'), 'frontend')}><span style={{color: 'var(--green)', fontSize: 9}}>●</span> frontend.ts</div>
            <div className="sidebar-file" data-tab="backend" onClick={() => (window as any).switchTab(document.querySelector('[data-tab=backend].editor-tab'), 'backend')}><span style={{color: 'var(--cyan)', fontSize: 9}}>●</span> backend.ts</div>
            <div className="sidebar-file" data-tab="databases" onClick={() => (window as any).switchTab(document.querySelector('[data-tab=databases].editor-tab'), 'databases')}><span style={{color: 'var(--teal)', fontSize: 9}}>●</span> databases.ts</div>
            <div className="sidebar-file" data-tab="ai" onClick={() => (window as any).switchTab(document.querySelector('[data-tab=ai].editor-tab'), 'ai')}><span style={{color: '#f59e0b', fontSize: 9}}>●</span> ai-ml.ts</div>
            <div className="sidebar-file" data-tab="tools" onClick={() => (window as any).switchTab(document.querySelector('[data-tab=tools].editor-tab'), 'tools')}><span style={{color: '#94a3b8', fontSize: 9}}>●</span> tools.ts</div>
          </div>
          <div className="editor-panel">
            <div className="skill-pane active" id="pane-frontend">
              <div className="skill-interface">interface frontend {'{'}</div>
              <div className="skill-row"><span className="skill-name">React.js</span>
                <div className="skill-bar-wrap">
                  <div className="skill-bar" data-w={90} />
                </div><span className="skill-pct">90%</span>
              </div>
              <div className="skill-row"><span className="skill-name">Next.js 14</span>
                <div className="skill-bar-wrap">
                  <div className="skill-bar" data-w={85} />
                </div><span className="skill-pct">85%</span>
              </div>
              <div className="skill-row"><span className="skill-name">Flutter</span>
                <div className="skill-bar-wrap">
                  <div className="skill-bar" data-w={75} />
                </div><span className="skill-pct">75%</span>
              </div>
              <div className="skill-row"><span className="skill-name">Tailwind CSS</span>
                <div className="skill-bar-wrap">
                  <div className="skill-bar" data-w={90} />
                </div><span className="skill-pct">90%</span>
              </div>
              <div className="skill-row"><span className="skill-name">HTML/CSS</span>
                <div className="skill-bar-wrap">
                  <div className="skill-bar" data-w={95} />
                </div><span className="skill-pct">95%</span>
              </div>
              <div className="skill-row"><span className="skill-name">Framer Motion</span>
                <div className="skill-bar-wrap">
                  <div className="skill-bar" data-w={70} />
                </div><span className="skill-pct">70%</span>
              </div>
              <div className="skill-row"><span className="skill-name">shadcn/ui</span>
                <div className="skill-bar-wrap">
                  <div className="skill-bar" data-w={80} />
                </div><span className="skill-pct">80%</span>
              </div>
              <div className="skill-row"><span className="skill-name">Dart</span>
                <div className="skill-bar-wrap">
                  <div className="skill-bar" data-w={70} />
                </div><span className="skill-pct">70%</span>
              </div>
              <div style={{fontFamily: 'var(--mono)', fontSize: '.82rem', color: 'var(--dim)', marginTop: 4}}>{'}'}</div>
            </div>
            <div className="skill-pane" id="pane-backend">
              <div className="skill-interface">interface backend {'{'}</div>
              <div className="skill-row"><span className="skill-name">Node.js</span>
                <div className="skill-bar-wrap">
                  <div className="skill-bar" data-w={85} />
                </div><span className="skill-pct">85%</span>
              </div>
              <div className="skill-row"><span className="skill-name">Express.js</span>
                <div className="skill-bar-wrap">
                  <div className="skill-bar" data-w={80} />
                </div><span className="skill-pct">80%</span>
              </div>
              <div className="skill-row"><span className="skill-name">REST APIs</span>
                <div className="skill-bar-wrap">
                  <div className="skill-bar" data-w={88} />
                </div><span className="skill-pct">88%</span>
              </div>
              <div className="skill-row"><span className="skill-name">JWT Auth</span>
                <div className="skill-bar-wrap">
                  <div className="skill-bar" data-w={82} />
                </div><span className="skill-pct">82%</span>
              </div>
              <div className="skill-row"><span className="skill-name">RBAC</span>
                <div className="skill-bar-wrap">
                  <div className="skill-bar" data-w={75} />
                </div><span className="skill-pct">75%</span>
              </div>
              <div className="skill-row"><span className="skill-name">Python</span>
                <div className="skill-bar-wrap">
                  <div className="skill-bar" data-w={80} />
                </div><span className="skill-pct">80%</span>
              </div>
              <div className="skill-row"><span className="skill-name">Java (Learning)</span>
                <div className="skill-bar-wrap">
                  <div className="skill-bar" data-w={45} />
                </div><span className="skill-pct">45%</span>
              </div>
              <div style={{fontFamily: 'var(--mono)', fontSize: '.82rem', color: 'var(--dim)', marginTop: 4}}>{'}'}</div>
            </div>
            <div className="skill-pane" id="pane-databases">
              <div className="skill-interface">interface databases {'{'}</div>
              <div className="skill-row"><span className="skill-name">PostgreSQL</span>
                <div className="skill-bar-wrap">
                  <div className="skill-bar" data-w={85} />
                </div><span className="skill-pct">85%</span>
              </div>
              <div className="skill-row"><span className="skill-name">Supabase</span>
                <div className="skill-bar-wrap">
                  <div className="skill-bar" data-w={80} />
                </div><span className="skill-pct">80%</span>
              </div>
              <div className="skill-row"><span className="skill-name">MySQL</span>
                <div className="skill-bar-wrap">
                  <div className="skill-bar" data-w={75} />
                </div><span className="skill-pct">75%</span>
              </div>
              <div style={{fontFamily: 'var(--mono)', fontSize: '.82rem', color: 'var(--dim)', marginTop: 4}}>{'}'}</div>
            </div>
            <div className="skill-pane" id="pane-ai">
              <div className="skill-interface">interface ai_ml {'{'}</div>
              <div className="skill-row"><span className="skill-name">OpenAI API</span>
                <div className="skill-bar-wrap">
                  <div className="skill-bar" data-w={82} />
                </div><span className="skill-pct">82%</span>
              </div>
              <div className="skill-row"><span className="skill-name">Gemini API</span>
                <div className="skill-bar-wrap">
                  <div className="skill-bar" data-w={78} />
                </div><span className="skill-pct">78%</span>
              </div>
              <div className="skill-row"><span className="skill-name">Flask</span>
                <div className="skill-bar-wrap">
                  <div className="skill-bar" data-w={72} />
                </div><span className="skill-pct">72%</span>
              </div>
              <div style={{fontFamily: 'var(--mono)', fontSize: '.82rem', color: 'var(--dim)', marginTop: 4}}>{'}'}</div>
            </div>
            <div className="skill-pane" id="pane-tools">
              <div className="skill-interface">interface tools {'{'}</div>
              <div className="skill-row"><span className="skill-name">Git/GitHub</span>
                <div className="skill-bar-wrap">
                  <div className="skill-bar" data-w={90} />
                </div><span className="skill-pct">90%</span>
              </div>
              <div className="skill-row"><span className="skill-name">Docker</span>
                <div className="skill-bar-wrap">
                  <div className="skill-bar" data-w={72} />
                </div><span className="skill-pct">72%</span>
              </div>
              <div className="skill-row"><span className="skill-name">Vercel</span>
                <div className="skill-bar-wrap">
                  <div className="skill-bar" data-w={85} />
                </div><span className="skill-pct">85%</span>
              </div>
              <div className="skill-row"><span className="skill-name">Netlify</span>
                <div className="skill-bar-wrap">
                  <div className="skill-bar" data-w={80} />
                </div><span className="skill-pct">80%</span>
              </div>
              <div className="skill-row"><span className="skill-name">VS Code</span>
                <div className="skill-bar-wrap">
                  <div className="skill-bar" data-w={95} />
                </div><span className="skill-pct">95%</span>
              </div>
              <div style={{fontFamily: 'var(--mono)', fontSize: '.82rem', color: 'var(--dim)', marginTop: 4}}>{'}'}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
    </>
  );
}
