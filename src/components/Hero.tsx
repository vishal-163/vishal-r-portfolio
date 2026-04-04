import { motion } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import profileImg from "@/assets/profile.jpg";

const Hero = () => {
  const scrollTo = (id: string) => {
    document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="home" className="min-h-screen flex items-center px-4 sm:px-6 md:px-8 py-20 pt-24 relative overflow-hidden">
      
      {/* Background glow */}
      <div className="absolute top-1/4 -left-32 w-64 md:w-96 h-64 md:h-96 bg-cyan-500/10 rounded-full blur-[120px]" />
      <div className="absolute bottom-1/4 -right-32 w-64 md:w-96 h-64 md:h-96 bg-emerald-500/10 rounded-full blur-[120px]" />

      <div className="max-w-7xl mx-auto w-full flex flex-col-reverse md:grid md:grid-cols-2 gap-8 md:gap-12 items-center relative z-10">

        {/* TEXT */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center md:text-left"
        >
          <p className="text-cyan-400 font-medium mb-3 text-xs tracking-widest uppercase">
            Welcome to my portfolio
          </p>

          {/* NAME */}
          <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold leading-tight mb-4">
            {" "}
            <span className="bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent">
              <TypeAnimation
                sequence={[
                  "Vishal R",
                  5000,
                  "",
                  800,
                ]}
                speed={50}
                repeat={Infinity}
                cursor={false}
              />
            </span>
            <span className="ml-1 text-cyan-400 text-lg relative top-2 blink">_</span>
          </h1>

          {/* ROLE */}
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground mb-4 font-medium">
            <TypeAnimation
              sequence={[
                "Aspiring Full Stack Developer",
                2000,
                "",
                500,
                "CS Undergraduate",
                2000,
                "",
                500,
              ]}
              speed={50}
              repeat={Infinity}
              cursor={false}
            />
            <span className="ml-1 text-cyan-400 text-base blink">_</span>
          </p>

          <p className="text-sm sm:text-base text-muted-foreground mb-6 max-w-lg mx-auto md:mx-0 leading-relaxed">
            Computer Science student with hands-on experience in React, Next.js, Node.js, and AI-powered applications. 
            Passionate about building production-grade systems that solve real-world problems.
          </p>

          {/* BUTTONS */}
          <div className="flex flex-col sm:flex-row gap-3 items-center md:items-start justify-center md:justify-start">
            <button onClick={() => scrollTo("#projects")} className="btn-primary-glow w-full sm:w-auto">
              View Projects
            </button>

            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline-glow w-full sm:w-auto flex justify-center"
            >
              View Resume
            </a>

            <button onClick={() => scrollTo("#contact")} className="btn-outline-glow w-full sm:w-auto">
              Contact Me
            </button>
          </div>
        </motion.div>

        {/* IMAGE */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex justify-center"
        >
          <div className="relative">
            <div className="w-40 h-40 sm:w-56 sm:h-56 md:w-72 md:h-72 lg:w-80 lg:h-80 rounded-full overflow-hidden border-2 border-cyan-400 shadow-[0_0_30px_rgba(6,182,212,0.4)] animate-float">
              <img
                src={profileImg}
                alt="Vishal R"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Rings */}
            <div className="absolute -inset-4 rounded-full border border-cyan-400/20 animate-pulse" />
            <div className="absolute -inset-8 rounded-full border border-emerald-400/10" />
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default Hero;