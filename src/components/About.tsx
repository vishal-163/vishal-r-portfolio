import { motion, useReducedMotion } from "framer-motion";
import { Code, Brain, Layers, Lightbulb } from "lucide-react";
import { useTilt } from "@/hooks/useTilt";

const highlights = [
  { icon: Code, title: "Full Stack Development", desc: "End-to-end web applications with modern frameworks" },
  { icon: Brain, title: "AI Integration", desc: "Building intelligent systems with OpenAI & Gemini" },
  { icon: Layers, title: "System Design", desc: "Scalable architectures for production-grade apps" },
  { icon: Lightbulb, title: "Problem Solving", desc: "Creative solutions to complex engineering challenges" },
];

const VP = { once: false, amount: 0.15 };

interface HighlightCardProps {
  item: typeof highlights[number];
  index: number;
}

function HighlightCard({ item, index }: HighlightCardProps) {
  const shouldReduceMotion = useReducedMotion();
  const { ref, style, onMouseMove, onMouseLeave } = useTilt(6);

  // Cards flip in with rotateX — each one slightly delayed
  return (
    <motion.div
      ref={ref as React.RefObject<HTMLDivElement>}
      initial={shouldReduceMotion ? {} : { opacity: 0, rotateX: -60, y: 40 }}
      whileInView={{ opacity: 1, rotateX: 0, y: 0 }}
      viewport={VP}
      transition={shouldReduceMotion ? { duration: 0 } : {
        duration: 0.6,
        delay: index * 0.12,
        ease: [0.22, 1, 0.36, 1],
      }}
      style={{ transformPerspective: 800, ...(shouldReduceMotion ? {} : style) }}
      onMouseMove={shouldReduceMotion ? undefined : onMouseMove}
      onMouseLeave={shouldReduceMotion ? undefined : onMouseLeave}
      className="glass-card-hover p-4 md:p-6 text-center group"
    >
      <div className="w-10 h-10 md:w-14 md:h-14 mx-auto mb-3 rounded-xl bg-cyan-400/10 flex items-center justify-center group-hover:bg-cyan-400/20 transition">
        <item.icon className="w-5 h-5 md:w-7 md:h-7 text-cyan-400" />
      </div>
      <h3 className="font-heading font-semibold text-xs sm:text-sm md:text-base mb-1">{item.title}</h3>
      <p className="text-muted-foreground text-xs md:text-sm hidden sm:block">{item.desc}</p>
    </motion.div>
  );
}

const About = () => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section id="about" className="px-4 sm:px-6 md:px-8 py-16 md:py-28 relative overflow-x-hidden">
      <div className="max-w-7xl mx-auto">

        {/* Heading — slides in from left */}
        <motion.div
          initial={shouldReduceMotion ? {} : { opacity: 0, x: -60 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={VP}
          transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mb-10 md:mb-16"
        >
          <div className="section-heading inline-block">
            <h2 className="font-heading text-2xl sm:text-3xl md:text-5xl font-bold mb-1">
              About <span className="bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent">Me</span>
            </h2>
            <p className="font-mono text-xs text-white/25 mt-1">// who_am_i.ts</p>
          </div>
        </motion.div>

        {/* Description — blur + fade reveal */}
        <motion.p
          initial={shouldReduceMotion ? {} : { opacity: 0, filter: "blur(8px)", y: 16 }}
          whileInView={{ opacity: 1, filter: "blur(0px)", y: 0 }}
          viewport={VP}
          transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.7, delay: 0.15, ease: "easeOut" }}
          className="text-muted-foreground text-sm sm:text-base md:text-lg leading-relaxed max-w-3xl mx-auto text-center mb-10 md:mb-16"
        >
          I am a Computer Science student with aspiring experience in full stack development and AI-integrated systems.
          I have worked on scalable applications using modern technologies like React, Next.js, Node.js, and PostgreSQL.
          I am currently building an advanced Smart Military Vest system focused on real-time health monitoring and emergency response using IoT and secure communication protocols.
        </motion.p>

        {/* Cards — rotateX flip-in */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {highlights.map((item, i) => (
            <HighlightCard key={item.title} item={item} index={i} />
          ))}
        </div>

      </div>
    </section>
  );
};

export default About;
