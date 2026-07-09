import { useState, useEffect } from 'react';

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    // Intersection Observer for Active Links
    const sections = document.querySelectorAll('section[id]');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, { threshold: 0.4 });

    sections.forEach((s) => observer.observe(s));

    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, []);

  const navLinks = ['home', 'about', 'skills', 'projects', 'education', 'contact'];

  return (
    <>
      <nav id="nav" className={scrolled ? 'scrolled' : ''}>
        <div className="wrap nav-inner">
          <div className="nav-logo">
            <div className="nav-logo-box">VR</div>
            Vishal R
          </div>
          <div className="nav-links">
            {navLinks.map(link => (
              <a 
                key={link}
                href={`#${link}`} 
                className={activeSection === link ? 'active' : ''}
              >
                {link}
              </a>
            ))}
          </div>
          <div className="nav-badge glass-panel"> Available for work</div>
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
        {navLinks.map(link => (
          <a 
            key={link}
            href={`#${link}`} 
            onClick={() => setMobileMenuOpen(false)}
            className={activeSection === link ? 'active' : ''}
          >
            {link}
          </a>
        ))}
      </div>
    </>
  );
}
