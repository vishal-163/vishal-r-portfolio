export function EducationSection() {
  return (
    <>
      <section id="education" className="dot-bg">
    <div className="wrap">
      <div className="reveal">
        <div className="sec-num">04</div>
        <h2 className="sec-title">&lt;Education &amp; Languages /&gt;</h2>
      </div>
      <div className="edu-grid">
        <div className="term reveal">
          <div className="term-bar">
            <div className="tdot" style={{background: '#ff5f57'}} />
            <div className="tdot" style={{background: '#febc2e'}} />
            <div className="tdot" style={{background: '#28c840'}} /><span className="term-title">education.json</span>
          </div>
          <div className="term-body">
            <div className="json-line"><span className="jp">{'{'}</span></div>
            <div className="json-line" style={{paddingLeft: 16}}><span className="jk">"degree"</span><span className="jp"> :
              </span><span className="jv">"Bachelor of Engineering"</span><span className="jp">,</span></div>
            <div className="json-line" style={{paddingLeft: 16}}><span className="jk">"major"</span><span className="jp"> :
              </span><span className="jv">"Computer Science &amp; Engineering"</span><span className="jp">,</span></div>
            <div className="json-line" style={{paddingLeft: 16}}><span className="jk">"institute"</span><span className="jp"> :
              </span><span className="jv">"K.S. Institute of Technology"</span><span className="jp">,</span></div>
            <div className="json-line" style={{paddingLeft: 16}}><span className="jk">"location"</span><span className="jp"> :
              </span><span className="jv">"Bangalore, India"</span><span className="jp">,</span></div>
            <div className="json-line" style={{paddingLeft: 16}}><span className="jk">"graduation"</span><span className="jp"> :
              </span><span className="jv">"Expected 2027"</span></div>
            <div className="json-line"><span className="jp">{'}'}</span></div>
            <div className="tl-lbl">TIMELINE</div>
            <div className="tl-item">
              <div className="tl-dot done" />
              <div>
                <div className="tl-year">2023 — Started B.E.</div>
                <div className="tl-desc">KSIT, Bangalore</div>
              </div>
            </div>
            <div className="tl-item">
              <div className="tl-dot" />
              <div>
                <div className="tl-year">2027 — Expected Graduation</div>
                <div className="tl-desc" style={{color: 'var(--green)', opacity: '.7'}}>In Progress...</div>
              </div>
            </div>
          </div>
        </div>
        <div className="term reveal" style={{transitionDelay: '.1s'}}>
          <div className="term-bar">
            <div className="tdot" style={{background: '#ff5f57'}} />
            <div className="tdot" style={{background: '#febc2e'}} />
            <div className="tdot" style={{background: '#28c840'}} /><span className="term-title">languages.json</span>
          </div>
          <div className="term-body">
            <div style={{fontFamily: 'var(--mono)', fontSize: '.85rem', color: 'var(--dim)', marginBottom: 12}}>const languages =
              [</div>
            <div className="lang-list">
              <div className="lang-row native"><span className="lang-name">🏠 Telugu</span><span className="badge-native">Native</span></div>
              <div className="lang-row"><span className="lang-name">🌐 English</span><span className="badge-fluent">Fluent</span>
              </div>
              <div className="lang-row"><span className="lang-name">🌿 Kannada</span><span className="badge-fluent">Fluent</span>
              </div>
              <div className="lang-row"><span className="lang-name">🌸 Hindi</span><span className="badge-fluent">Fluent</span>
              </div>
              <div className="lang-row"><span className="lang-name">🌺 Tamil</span><span className="badge-fluent">Fluent</span>
              </div>
            </div>
            <div style={{fontFamily: 'var(--mono)', fontSize: '.85rem', color: 'var(--dim)', marginTop: 12}}>];</div>
          </div>
        </div>
      </div>
      <div className="edu-count reveal"><span className="edu-count-num">5</span><span className="edu-count-lbl">Languages
          Spoken</span></div>
    </div>
  </section>
    </>
  );
}
