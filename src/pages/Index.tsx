import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Education from "@/components/Education";

import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import ParticleBackground from "@/components/ParticleBackground";
import CustomCursor from "@/components/CustomCursor";
import ScrollProgress from "@/components/ScrollProgress";

const Index = () => (
  <>
    <CustomCursor />
    <ScrollProgress />
    <ParticleBackground />
    <Navbar />
    <main className="relative z-10">
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Education />
      <GithubStats />
      <Contact />
    </main>
    <Footer />
  </>
);

export default Index;
