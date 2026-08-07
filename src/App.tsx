import { useState, useEffect, useRef } from 'react';
import './index.css';

import { BootScreen } from './components/BootScreen';
import { Cursor } from './components/Cursor';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { AboutSection } from './components/AboutSection';
import { SkillsSection } from './components/SkillsSection';
import { ProjectsSection } from './components/ProjectsSection';
import { EducationSection } from './components/EducationSection';
import { ContactSection } from './components/ContactSection';
import { ChatWidget } from './components/ChatWidget';
import { Analytics } from '@vercel/analytics/react';

export default function App() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [bootDone, setBootDone] = useState(false);

  useEffect(() => {
    if (!bootDone) return;

    const checkReveals = () => {
      const elements = document.querySelectorAll('.reveal, .reveal-hero-left, .reveal-hero-right, .reveal-about-card, .reveal-skills, .reveal-proj-left, .reveal-proj-right, .reveal-edu-left, .reveal-edu-right');
      const triggerBottom = window.innerHeight * 0.92;
      elements.forEach((el) => {
        const top = el.getBoundingClientRect().top;
        if (top < triggerBottom) {
          el.classList.add('vis');
        }
      });
    };

    window.addEventListener('scroll', checkReveals, { passive: true });
    const timer = setTimeout(checkReveals, 100);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', checkReveals);
    };
  }, [bootDone]);

  return (
    <div className="app-container" ref={containerRef}>
      <BootScreen onComplete={() => setBootDone(true)} />
      {bootDone && (
        <>
          <Cursor />
          <Navbar />
          <HeroSection />
          <AboutSection />
          <SkillsSection />
          <ProjectsSection />
          <EducationSection />
          <ContactSection />
          <ChatWidget />
          <Analytics />
        </>
      )}
    </div>
  );
}
