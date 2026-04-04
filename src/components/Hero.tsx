import { motion } from "framer-motion";
import profileImg from "@/assets/profile.jpg";

const Hero = () => {
  const scrollTo = (id: string) => {
    document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="home" className="min-h-screen flex items-center section-padding pt-24 relative overflow-hidden">
      {/* Background gradient orbs */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-neon-blue/10 rounded-full blur-[120px]" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-neon-purple/10 rounded-full blur-[120px]" />

      <div className="max-w-7xl mx-auto w-full grid md:grid-cols-2 gap-12 items-center relative z-10">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-neon-blue font-medium mb-4 text-sm tracking-widest uppercase"
          >
            Welcome to my portfolio
          </motion.p>

          <h1 className="font-heading text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6">
            Hi, I'm{" "}
            <span className="gradient-text">Vishal R</span>
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground mb-4 font-medium">
            Aspiring Full Stack Developer | Building Scalable Web & AI Systems
          </p>

          <p className="text-muted-foreground mb-8 max-w-lg leading-relaxed">
            Computer Science student with hands-on experience in React, Next.js, Node.js, and AI-powered applications. 
            Passionate about building production-grade systems that solve real-world problems.
          </p>

          <div className="flex flex-wrap gap-4">
            <button onClick={() => scrollTo("#projects")} className="btn-primary-glow">
              View Projects
            </button>
            <button className="btn-outline-glow">
              Download Resume
            </button>
            <button onClick={() => scrollTo("#contact")} className="btn-outline-glow">
              Contact Me
            </button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex justify-center"
        >
          <div className="relative">
            <div className="w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden gradient-border glow-blue animate-float">
              <img
                src={profileImg}
                alt="Vishal R - Full Stack Developer"
                width={512}
                height={512}
                className="w-full h-full object-cover"
              />
            </div>
            {/* Decorative rings */}
            <div className="absolute -inset-4 rounded-full border border-neon-blue/20 animate-pulse-glow" />
            <div className="absolute -inset-8 rounded-full border border-neon-purple/10" />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
