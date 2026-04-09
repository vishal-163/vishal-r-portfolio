import { lazy, Suspense } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ScrollProgress from "@/components/ScrollProgress";
import CustomCursor from "@/components/CustomCursor";
import AuroraBackground from "@/components/AuroraBackground";
import ParticleBackground from "@/components/ParticleBackground";

// Lazy load below-the-fold sections
const About = lazy(() => import("@/components/About"));
const Skills = lazy(() => import("@/components/Skills"));
const Projects = lazy(() => import("@/components/Projects"));
const Education = lazy(() => import("@/components/Education"));
const Contact = lazy(() => import("@/components/Contact"));

const SectionFallback = () => (
  <div className="py-28 flex items-center justify-center">
    <div className="w-8 h-8 rounded-full border-2 border-cyan-400/40 border-t-cyan-400 animate-spin" />
  </div>
);

const Index = () => (
  <>
    <CustomCursor />
    <ScrollProgress />
    {/* z-0: aurora blobs behind everything */}
    <AuroraBackground />
    {/* z-1: particle canvas above aurora */}
    <ParticleBackground />
    <Navbar />
    <main className="relative z-10">
      {/* Hero loads eagerly — first paint */}
      <Hero />
      <div className="section-divider" />
      <Suspense fallback={<SectionFallback />}>
        <About />
      </Suspense>
      <div className="section-divider" />
      <Suspense fallback={<SectionFallback />}>
        <Skills />
      </Suspense>
      <div className="section-divider" />
      <Suspense fallback={<SectionFallback />}>
        <Projects />
      </Suspense>
      <div className="section-divider" />
      <Suspense fallback={<SectionFallback />}>
        <Education />
      </Suspense>
      <div className="section-divider" />
      <Suspense fallback={<SectionFallback />}>
        <Contact />
      </Suspense>
    </main>
  </>
);

export default Index;
