import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Education from "@/components/Education";

import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import ParticleBackground from "@/components/ParticleBackground";
import AuroraBackground from "@/components/AuroraBackground";
import CustomCursor from "@/components/CustomCursor";
import ScrollProgress from "@/components/ScrollProgress";

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
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Education />
      
      <Contact />
    </main>
    <Footer />
  </>
);

export default Index;
