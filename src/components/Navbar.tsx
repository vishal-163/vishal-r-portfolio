import { useState, useEffect, useRef } from 'react';

function getBrowserInfo() {
  const ua = navigator.userAgent;
  let browser = "UNKNOWN_BROWSER";
  let os = "UNKNOWN_OS";

  if (ua.indexOf("iPhone") > -1 || ua.indexOf("iPad") > -1 || ua.indexOf("iPod") > -1) os = "IOS";
  else if (ua.indexOf("Android") > -1) os = "ANDROID";
  else if (ua.indexOf("Mac") > -1) os = "MACOS";
  else if (ua.indexOf("Win") > -1) os = "WINDOWS";
  else if (ua.indexOf("Linux") > -1) os = "LINUX";

  if (ua.indexOf("CriOS") > -1) browser = "CHROME";
  else if (ua.indexOf("FxiOS") > -1) browser = "FIREFOX";
  else if (ua.indexOf("EdgiOS") > -1) browser = "EDGE";
  else if (ua.indexOf("OPiOS") > -1) browser = "OPERA";
  else if (ua.indexOf("SamsungBrowser") > -1) browser = "SAMSUNG_INTERNET";
  else if (ua.indexOf("Firefox") > -1) browser = "FIREFOX";
  else if (ua.indexOf("Opera") > -1 || ua.indexOf("OPR") > -1) browser = "OPERA";
  else if (ua.indexOf("Trident") > -1) browser = "IE";
  else if (ua.indexOf("Edg") > -1) browser = "EDGE";
  else if (ua.indexOf("Chrome") > -1) browser = "CHROME";
  else if (ua.indexOf("Safari") > -1) browser = "SAFARI";

  return { browser, os };
}

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [pillStyle, setPillStyle] = useState({ left: 0, width: 0, textLeft: 0, textWidth: 0 });
  const [browserInfo, setBrowserInfo] = useState({ os: 'UNKNOWN_OS', browser: 'UNKNOWN_BROWSER' });

  useEffect(() => {
    setBrowserInfo(getBrowserInfo());
  }, []);

  const linkRefs = useRef<Record<string, HTMLAnchorElement | null>>({});

  const updatePill = (section: string) => {
    const activeEl = linkRefs.current[section];
    if (activeEl) {
      const textEl = activeEl.querySelector('.nav-txt') as HTMLElement | null;
      const left = activeEl.offsetLeft;
      const width = activeEl.offsetWidth;
      const textLeft = textEl ? activeEl.offsetLeft + textEl.offsetLeft : left;
      const textWidth = textEl ? textEl.offsetWidth : width;
      setPillStyle({ left, width, textLeft, textWidth });
    }
  };

  useEffect(() => {
    updatePill(activeSection);
  }, [activeSection]);

  useEffect(() => {
    const handleResize = () => updatePill(activeSection);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [activeSection]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = totalHeight > 0 ? (window.scrollY / totalHeight) * 100 : 0;
      const progEl = document.getElementById('prog');
      if (progEl) {
        progEl.style.width = `${progress}%`;
      }

      // Smooth section detection based on viewport focus point
      const sections = ['home', 'about', 'skills', 'projects', 'education', 'contact'];
      let current = 'home';
      let minDistance = Infinity;
      const targetY = window.innerHeight * 0.35;

      sections.forEach((id) => {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          const distance = Math.abs(rect.top - targetY);
          if (rect.top <= targetY + 120 && distance < minDistance) {
            minDistance = distance;
            current = id;
          }
        }
      });
      setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const navLinks = ['home', 'about', 'skills', 'projects', 'education', 'contact'];

  return (
    <>
      <div id="prog" />
      <nav id="nav" className={scrolled ? 'scrolled' : ''}>
        <div className="wrap nav-inner">
          <div className="nav-logo">
            <div className="nav-logo-box">VR</div>
            <span className="nav-logo-name">Vishal R</span>
          </div>
          <div className="nav-links">
            <div
              className="nav-active-pill-box"
              style={{
                transform: `translateX(${pillStyle.left}px)`,
                width: `${pillStyle.width}px`,
                opacity: pillStyle.width > 0 ? 1 : 0
              }}
            />
            <div
              className="nav-active-underline"
              style={{
                transform: `translateX(${pillStyle.textLeft}px)`,
                width: `${pillStyle.textWidth}px`,
                opacity: pillStyle.textWidth > 0 ? 1 : 0
              }}
            />
            {navLinks.map(link => (
              <a 
                key={link}
                ref={(el) => { linkRefs.current[link] = el; }}
                href={`#${link}`} 
                className={activeSection === link ? 'active' : ''}
              >
                <span className="nav-txt">{link}</span>
              </a>
            ))}
          </div>
          <div className="nav-badge glass-panel" style={{ fontFamily: 'monospace', fontSize: '0.8rem', letterSpacing: '1px' }}>
            <span className="badge-desktop">{`> OS: ${browserInfo.os} | BROWSER: ${browserInfo.browser}`}</span>
            <span className="badge-mobile">{`> ${browserInfo.os} | ${browserInfo.browser}`}</span>
          </div>
          <button
            className="nav-burger"
            id="burger"
            aria-label="Menu"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <span /><span /><span />
          </button>
        </div>
      </nav>
      <div id="nav-mob" style={{ display: mobileMenuOpen ? 'block' : 'none' }}>
        <div className="nav-badge-mob glass-panel" style={{ fontFamily: 'monospace', fontSize: '0.78rem', letterSpacing: '1px', marginBottom: '10px' }}>
          {`> ${browserInfo.os} | ${browserInfo.browser}`}
        </div>
        {navLinks.map(link => (
          <a 
            key={link}
            href={`#${link}`} 
            onClick={() => setMobileMenuOpen(false)}
            className={activeSection === link ? 'active' : ''}
          >
            <span className="nav-txt">{link}</span>
          </a>
        ))}
      </div>
    </>
  );
}
