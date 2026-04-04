import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Code, Brain, Layers, Lightbulb } from "lucide-react";

const highlights = [
  { icon: Code, title: "Full Stack Development", desc: "End-to-end web applications with modern frameworks" },
  { icon: Brain, title: "AI Integration", desc: "Building intelligent systems with OpenAI & Gemini" },
  { icon: Layers, title: "System Design", desc: "Scalable architectures for production-grade apps" },
  { icon: Lightbulb, title: "Problem Solving", desc: "Creative solutions to complex engineering challenges" },
];

const About = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="px-4 sm:px-6 md:px-8 py-16 md:py-28 relative overflow-x-hidden">
      <div className="max-w-7xl mx-auto" ref={ref}>

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 md:mb-16"
        >
          <h2 className="font-heading text-2xl sm:text-3xl md:text-5xl font-bold mb-4">
            About <span className="bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent">Me</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-cyan-400 to-emerald-400 mx-auto rounded-full" />
        </motion.div>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-muted-foreground text-sm sm:text-base md:text-lg leading-relaxed max-w-3xl mx-auto text-center mb-10 md:mb-16"
        >
          I am a Computer Science student with strong experience in full stack development and AI-integrated systems. 
          I have worked on scalable applications using modern technologies like React, Next.js, Node.js, and PostgreSQL. 
          I am currently building an advanced Smart Military Vest system focused on real-time health monitoring and emergency response using IoT and secure communication protocols.
        </motion.p>

        {/* Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {highlights.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
              className="glass-card-hover p-4 md:p-6 text-center group"
            >
              <div className="w-10 h-10 md:w-14 md:h-14 mx-auto mb-3 rounded-xl bg-cyan-400/10 flex items-center justify-center group-hover:bg-cyan-400/20 transition">
                <item.icon className="w-5 h-5 md:w-7 md:h-7 text-cyan-400" />
              </div>

              <h3 className="font-heading font-semibold text-xs sm:text-sm md:text-base mb-1">
                {item.title}
              </h3>

              <p className="text-muted-foreground text-xs md:text-sm hidden sm:block">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default About;