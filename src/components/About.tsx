import { motion } from "framer-motion";
import { useInView } from "framer-motion";
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
    <section id="about" className="section-padding relative">
      <div className="max-w-7xl mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-heading text-3xl md:text-5xl font-bold mb-4">
            About <span className="gradient-text">Me</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-neon-blue to-neon-purple mx-auto rounded-full" />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-muted-foreground text-lg leading-relaxed max-w-3xl mx-auto text-center mb-16"
        >
          I am a Computer Science student with strong experience in full stack development and AI-integrated systems. 
          I have worked on scalable applications using modern technologies like React, Next.js, Node.js, and PostgreSQL. 
          I am currently building an advanced Smart Military Vest system focused on real-time health monitoring and emergency 
          response using IoT and secure communication protocols.
        </motion.p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {highlights.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
              className="glass-card-hover p-6 text-center group"
            >
              <div className="w-14 h-14 mx-auto mb-4 rounded-xl bg-neon-blue/10 flex items-center justify-center group-hover:bg-neon-blue/20 transition-colors">
                <item.icon className="w-7 h-7 text-neon-blue" />
              </div>
              <h3 className="font-heading font-semibold mb-2">{item.title}</h3>
              <p className="text-muted-foreground text-sm">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
