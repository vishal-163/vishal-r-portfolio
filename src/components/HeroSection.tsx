import { useState, useEffect } from 'react';

const PHRASES = [
  'Aspiring Full Stack Developer', 
  'Building Scalable Web & AI Systems', 
  'CS Undergraduate'
];

export function HeroSection() {
  const [text, setText] = useState('');
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    const currentPhrase = PHRASES[phraseIndex];

    const type = () => {
      setText((current) => {
        if (!isDeleting) {
          if (current === currentPhrase) return current;
          return currentPhrase.substring(0, current.length + 1);
        } else {
          if (current === '') return current;
          return currentPhrase.substring(0, current.length - 1);
        }
      });
    };

    if (!isDeleting && text === currentPhrase) {
      timeout = setTimeout(() => setIsDeleting(true), 2500);
    } else if (isDeleting && text === '') {
      setIsDeleting(false);
      setPhraseIndex((prev) => (prev + 1) % PHRASES.length);
    } else {
      const delay = isDeleting ? 40 : 120; // 120ms to make it slower as requested
      timeout = setTimeout(type, delay);
    }

    return () => clearTimeout(timeout);
  }, [text, isDeleting, phraseIndex]);

  const navTo = (id: string) => {
    document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleDownloadResume = () => {
    fetch('/api/resume-action', { method: 'POST', keepalive: true }).catch(console.error);
    window.open('/resume.pdf', '_blank');
  };

  return (
    <section id="home" className="dot-bg">
      <div className="wrap">
        <div className="hero-grid">
          {/* LEFT: text */}
          <div className="reveal">
            <div className="hero-badge">ASPIRING FULL STACK DEVELOPER</div>
            <div>
              <div className="hero-name">
                <span className="vishal-part">Vishal</span><span className="r-part"> R</span>
              </div>
            </div>
            <div className="hero-role">
              <span>{text}</span>
              <span id="tw-cursor">|</span>
            </div>
            <p className="hero-bio">
              Computer Science student and aspiring Full Stack Developer with a strong interest in
              building <span className="hl">scalable web applications</span> and <span className="hl">AI-driven systems</span>.
              I have hands-on experience with technologies like React, HTML, CSS, Python and PostgreSQL,
              and I enjoy working across both frontend and backend to create efficient systems.
            </p>
            <div className="hero-btns">
              <button className="btn-solid" onClick={() => navTo('#projects')}>&gt; view_projects()</button>
              <button className="btn-outline" onClick={handleDownloadResume}>↓ view_resume()</button>
              <button className="btn-outline" onClick={() => navTo('#contact')}>contact_me()</button>
            </div>
          </div>
          {/* RIGHT: photo + terminal */}
          <div className="hero-right reveal" style={{transitionDelay: '.15s'}}>
            <div className="hero-photo-wrap">
              <img src="/photo.png" alt="Vishal R" loading="eager" />
            </div>
            <div className="term hero-term-mini glass-panel">
              <div className="term-bar">
                <div style={{ display: 'flex', gap: '8px' }}>
                  <div className="mac-dot" style={{background: '#ff5f57'}}></div>
                  <div className="mac-dot" style={{background: '#febc2e'}}></div>
                  <div className="mac-dot" style={{background: '#28c840'}}></div>
                </div>
                <span className="term-title">vishal@dev:~</span>
              </div>
              <div className="term-body">
                <div><span className="json-prompt">vishal@dev:~$</span> <span className="json-cmd">cat status.json</span></div>
                <div>{'{'}</div>
                <div className="json-line" style={{paddingLeft: 18}}>
                  <span className="json-key">"status"</span>: <span className="json-str">"Available"</span>,
                </div>
                <div style={{paddingLeft: 18}}>
                  <span className="json-key">"location"</span>: <span className="json-str">"Bangalore, IN"</span>,
                </div>
                <div style={{paddingLeft: 18}}>
                  <span className="json-key">"focus"</span>: <span className="json-str">"Full Stack + AI"</span>,
                </div>
                <div style={{paddingLeft: 18}}>
                  <span className="json-key">"education"</span>: <span className="json-str">"B.E. CSE @ KSIT"</span>,
                </div>
                <div style={{paddingLeft: 18}}>
                  <span className="json-key">"grad"</span>: <span className="json-str">"2027"</span>
                </div>
                <div>{'}'}</div>
                <div>
                  <span className="json-prompt">vishal@dev:~$</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
