export function ContactSection() {
  return (
    <>
      <section id="contact" className="grid-bg">
    <div className="wrap">
      <div className="reveal">
        <div className="sec-num">05</div>
        <h2 className="sec-title">&lt;Get In Touch /&gt;</h2>
      </div>
      <p className="contact-intro reveal">Let's build something <span className="hl">extraordinary</span> together. I'm always
        open to discussing new projects, creative ideas, or opportunities.</p>
      <div className="contact-grid reveal">
        <a className="contact-card glass-panel" href="mailto:vishalravi163@gmail.com">
          <div className="cc-left"><span className="cc-type">✉ Email</span><span className="cc-val">vishalravi163@gmail.com</span>
          </div><span className="cc-arrow">↗</span>
        </a>
        <a className="contact-card glass-panel" href="tel:+918147741585">
          <div className="cc-left"><span className="cc-type">📱 Phone</span><span className="cc-val">+91 8147741585</span></div>
          <span className="cc-arrow">↗</span>
        </a>
        <a className="contact-card glass-panel" href="https://www.linkedin.com/in/vishal-ravi-653a8a33b/" target="_blank">
          <div className="cc-left"><span className="cc-type">💼 LinkedIn</span><span className="cc-val">linkedin/vishal-r</span>
          </div><span className="cc-arrow">↗</span>
        </a>
        <a className="contact-card glass-panel" href="https://github.com/vishal-163" target="_blank">
          <div className="cc-left"><span className="cc-type">🐙 GitHub</span><span className="cc-val">github/vishal-163</span></div>
          <span className="cc-arrow">↗</span>
        </a>
      </div>
      <div className="term reveal">
        <div className="term-bar">
          <div className="tdot" style={{background: '#ff5f57'}} />
          <div className="tdot" style={{background: '#febc2e'}} />
          <div className="tdot" style={{background: '#28c840'}} />
        </div>
        <div className="term-body">
          <div><span style={{color: 'var(--green)'}}>vishal@dev:~$</span> <span style={{color: '#fff'}}>echo "Ready to
              collaborate? Let's connect!"</span></div>
          <div style={{color: 'var(--green)', marginTop: 6}}>Ready to collaborate? Let's connect!</div>
          <div style={{marginTop: 6}}><span style={{color: 'var(--green)'}}>vishal@dev:~$</span> <span style={{animation: 'blink 1s step-end infinite', color: 'var(--green)'}}>_</span></div>
        </div>
      </div>
    </div>
  </section>
    </>
  );
}
