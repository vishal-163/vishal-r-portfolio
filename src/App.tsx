import { useEffect, useRef } from 'react';
import './index.css';

import { BootScreen } from './components/BootScreen';
import { MatrixRain } from './components/MatrixRain';
import { Cursor } from './components/Cursor';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { AboutSection } from './components/AboutSection';
import { SkillsSection } from './components/SkillsSection';
import { ProjectsSection } from './components/ProjectsSection';
import { EducationSection } from './components/EducationSection';
import { ContactSection } from './components/ContactSection';
import { ChatWidget } from './components/ChatWidget';

export default function App() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = '/script.js?v=' + Date.now();
    script.async = true;
    document.body.appendChild(script);

    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  return (
    <div className="app-container" ref={containerRef}>
      <BootScreen />
      <MatrixRain />
      <Cursor />
      <Navbar />
      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <ProjectsSection />
      <EducationSection />
      <ContactSection />
      <ChatWidget />
    </div>
  );
}
