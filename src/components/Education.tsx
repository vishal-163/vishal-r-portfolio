import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { GraduationCap, Globe } from "lucide-react";

const languages = [
  { name: "English", level: "Fluent" },
  { name: "Kannada", level: "Fluent" },
  { name: "Hindi", level: "Fluent" },
  { name: "Telugu", level: "Native" },
  { name: "Tamil", level: "Fluent" },
];

const Education = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="education" className="section-padding relative">
      <div className="max-w-7xl mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-heading text-3xl md:text-5xl font-bold mb-4">
            Education & <span className="gradient-text">Languages</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-neon-blue to-neon-purple mx-auto rounded-full" />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="glass-card-hover p-8"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 rounded-xl bg-neon-blue/10 flex items-center justify-center">
                <GraduationCap className="w-7 h-7 text-neon-blue" />
              </div>
              <h3 className="font-heading text-xl font-semibold">Education</h3>
            </div>
            <div className="space-y-2">
              <h4 className="font-heading font-semibold text-lg">Bachelor of Engineering</h4>
              <p className="text-neon-blue font-medium">Computer Science & Engineering</p>
              <p className="text-muted-foreground">K.S. Institute of Technology, Bangalore</p>
              <p className="text-sm text-muted-foreground">Expected Graduation: 2027</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="glass-card-hover p-8"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 rounded-xl bg-neon-purple/10 flex items-center justify-center">
                <Globe className="w-7 h-7 text-neon-purple" />
              </div>
              <h3 className="font-heading text-xl font-semibold">Languages</h3>
            </div>
            <div className="flex flex-wrap gap-3">
              {languages.map((lang) => (
                <div key={lang.name} className="px-4 py-2 rounded-lg bg-muted/50 border border-glass-border">
                  <span className="font-medium text-sm">{lang.name}</span>
                  <span className="text-xs text-muted-foreground ml-2">({lang.level})</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Education;
