import { useEffect, useRef } from 'react';
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

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('vis');
          }
        });
      },
      { threshold: 0.08 }
    );

    const revealElements = document.querySelectorAll('.reveal');
    revealElements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="app-container" ref={containerRef}>
      <BootScreen />
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
    </div>
  );
}
