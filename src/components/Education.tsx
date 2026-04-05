import { motion, useReducedMotion } from "framer-motion";
import { GraduationCap, Globe } from "lucide-react";
import { useTilt } from "@/hooks/useTilt";

const languages = [
  { name: "English", level: "Fluent" },
  { name: "Kannada", level: "Fluent" },
  { name: "Hindi", level: "Fluent" },
  { name: "Telugu", level: "Native" },
  { name: "Tamil", level: "Fluent" },
];

const Education = () => {
  const shouldReduceMotion = useReducedMotion();
  const tiltLeft = useTilt(6);
  const tiltRight = useTilt(6);

  const finalState = { opacity: 1, y: 0 };

  return (
    <section id="education" className="px-4 sm:px-6 md:px-8 py-16 md:py-28 relative">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={shouldReduceMotion ? finalState : { opacity: 0, y: 30 }}
          whileInView={finalState}
          viewport={{ once: true }}
          transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.6 }}
          className="text-center mb-10 md:mb-16"
        >
          <h2 className="font-heading text-2xl sm:text-3xl md:text-5xl font-bold mb-4">
            Education & <span className="gradient-text">Languages</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-neon-blue to-neon-purple mx-auto rounded-full" />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-4 md:gap-8">
          {/* Education card */}
          <motion.div
            ref={tiltLeft.ref as React.RefObject<HTMLDivElement>}
            initial={shouldReduceMotion ? finalState : { opacity: 0, y: 30 }}
            whileInView={finalState}
            viewport={{ once: true }}
            transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.6, delay: 0.1 }}
            className="glass-card-hover p-5 md:p-8"
            style={shouldReduceMotion ? undefined : tiltLeft.style}
            onMouseMove={shouldReduceMotion ? undefined : tiltLeft.onMouseMove}
            onMouseLeave={shouldReduceMotion ? undefined : tiltLeft.onMouseLeave}
          >
            <div className="flex items-center gap-3 md:gap-4 mb-4 md:mb-6">
              <div className="w-10 h-10 md:w-14 md:h-14 rounded-xl bg-neon-blue/10 flex items-center justify-center">
                <GraduationCap className="w-5 h-5 md:w-7 md:h-7 text-neon-blue" />
              </div>
              <h3 className="font-heading text-lg md:text-xl font-semibold">Education</h3>
            </div>
            <div className="space-y-1.5 md:space-y-2">
              <h4 className="font-heading font-semibold text-base md:text-lg">Bachelor of Engineering</h4>
              <p className="text-neon-blue font-medium text-sm md:text-base">Computer Science & Engineering</p>
              <p className="text-muted-foreground text-sm md:text-base">K.S. Institute of Technology, Bangalore</p>
              <p className="text-xs md:text-sm text-muted-foreground">Expected Graduation: 2027</p>
            </div>
          </motion.div>

          {/* Languages card */}
          <motion.div
            ref={tiltRight.ref as React.RefObject<HTMLDivElement>}
            initial={shouldReduceMotion ? finalState : { opacity: 0, y: 30 }}
            whileInView={finalState}
            viewport={{ once: true }}
            transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.6, delay: 0.2 }}
            className="glass-card-hover p-5 md:p-8"
            style={shouldReduceMotion ? undefined : tiltRight.style}
            onMouseMove={shouldReduceMotion ? undefined : tiltRight.onMouseMove}
            onMouseLeave={shouldReduceMotion ? undefined : tiltRight.onMouseLeave}
          >
            <div className="flex items-center gap-3 md:gap-4 mb-4 md:mb-6">
              <div className="w-10 h-10 md:w-14 md:h-14 rounded-xl bg-neon-purple/10 flex items-center justify-center">
                <Globe className="w-5 h-5 md:w-7 md:h-7 text-neon-purple" />
              </div>
              <h3 className="font-heading text-lg md:text-xl font-semibold">Languages</h3>
            </div>
            <div className="flex flex-wrap gap-2 md:gap-3">
              {languages.map((lang, i) => (
                <motion.div
                  key={lang.name}
                  initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.4, delay: 0.3 + i * 0.08 }}
                  className="px-3 md:px-4 py-1.5 md:py-2 rounded-lg bg-muted/50 border border-glass-border"
                >
                  <span className="font-medium text-xs md:text-sm">{lang.name}</span>
                  <span className="text-[10px] md:text-xs text-muted-foreground ml-1.5 md:ml-2">({lang.level})</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Education;
