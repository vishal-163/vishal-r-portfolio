import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const categories = [
  {
    title: "Frontend",
    color: "from-blue-500 to-cyan-400",
    skills: ["React.js", "Next.js 14", "HTML & Tailwind CSS", "shadcn/ui", "Framer Motion"],
  },
  {
    title: "Backend",
    color: "from-violet-500 to-purple-400",
    skills: ["Node.js", "Express.js", "REST APIs", "JWT Authentication", "RBAC"],
  },
  {
    title: "Databases",
    color: "from-emerald-500 to-teal-400",
    skills: ["PostgreSQL", "Supabase", "MySQL"],
  },
  {
    title: "AI / ML",
    color: "from-orange-500 to-amber-400",
    skills: ["OpenAI API", "Gemini API", "Flask"],
  },
  {
    title: "Tools",
    color: "from-pink-500 to-rose-400",
    skills: ["Git & GitHub", "Docker", "Vercel & Netlify", "VS Code"],
  },
];

const Skills = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="skills" className="px-4 sm:px-6 md:px-8 py-16 md:py-28 relative">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-neon-purple/5 rounded-full blur-[150px]" />
      <div className="max-w-7xl mx-auto relative z-10" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 md:mb-16"
        >
          <h2 className="font-heading text-2xl sm:text-3xl md:text-5xl font-bold mb-4">
            Tech <span className="gradient-text">Stack</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-neon-blue to-neon-purple mx-auto rounded-full" />
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="glass-card-hover p-4 md:p-6 group"
            >
              <h3 className={`font-heading font-semibold text-sm md:text-lg mb-3 md:mb-4 bg-gradient-to-r ${cat.color} bg-clip-text text-transparent`}>
                {cat.title}
              </h3>
              <div className="flex flex-wrap gap-1.5 md:gap-2">
                {cat.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-2 md:px-3 py-1 md:py-1.5 text-xs md:text-sm rounded-lg bg-muted/50 text-foreground border border-glass-border transition-all duration-300 hover:border-neon-blue/40 hover:bg-neon-blue/10"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
