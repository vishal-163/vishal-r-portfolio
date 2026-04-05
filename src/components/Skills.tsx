import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { useTilt } from "@/hooks/useTilt";

const categories = [
  {
    title: "Frontend",
    color: "from-blue-500 to-cyan-400",
    accent: "#06b6d4",
    skills: ["React.js","Flutter","CSS","Next.js 14","Dart","HTML","Tailwind CSS","shadcn/ui","Framer Motion"],
  },
  {
    title: "Backend",
    color: "from-violet-500 to-purple-400",
    accent: "#a855f7",
    skills: ["Node.js","Express.js","REST APIs","JWT Authentication","RBAC","Python","Java(Learning)"],
  },
  {
    title: "Databases",
    color: "from-emerald-500 to-teal-400",
    accent: "#10b981",
    skills: ["PostgreSQL","Supabase","MySQL"],
  },
  {
    title: "AI / ML",
    color: "from-orange-500 to-amber-400",
    accent: "#f59e0b",
    skills: ["OpenAI API","Gemini API","Flask"],
  },
  {
    title: "Tools",
    color: "from-pink-500 to-rose-400",
    accent: "#ec4899",
    skills: ["Git","GitHub","Docker","Vercel","Netlify","VS Code"],
  },
];

interface CategoryCardProps {
  cat: typeof categories[number];
  cardIndex: number;
  inView: boolean;
}

function CategoryCard({ cat, cardIndex, inView }: CategoryCardProps) {
  const { ref, style, onMouseMove, onMouseLeave: tiltLeave } = useTilt(5);
  // Alternate: even cards slide from left, odd from right
  const xFrom = cardIndex % 2 === 0 ? -50 : 50;

  return (
    <motion.div
      ref={ref as React.RefObject<HTMLDivElement>}
      initial={{ opacity: 0, x: xFrom, scale: 0.95 }}
      animate={inView ? { opacity: 1, x: 0, scale: 1 } : { opacity: 0, x: xFrom, scale: 0.95 }}
      transition={{ duration: 0.55, delay: cardIndex * 0.08, ease: [0.22, 1, 0.36, 1] }}
      className="glass-card-hover p-4 md:p-6 group"
      style={style}
      onMouseMove={onMouseMove}
      onMouseLeave={tiltLeave}
    >
      <h3 className={`font-heading font-semibold text-sm md:text-lg mb-3 md:mb-4 bg-gradient-to-r ${cat.color} bg-clip-text text-transparent`}>
        {cat.title}
      </h3>
      <div className="flex flex-wrap gap-1.5 md:gap-2">
        {cat.skills.map((skill, tagIndex) => (
          <SkillTag key={skill} skill={skill} tagIndex={tagIndex} accent={cat.accent} inView={inView} />
        ))}
      </div>
    </motion.div>
  );
}

interface SkillTagProps {
  skill: string;
  tagIndex: number;
  accent: string;
  inView: boolean;
}

function SkillTag({ skill, tagIndex, accent, inView }: SkillTagProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.6, rotate: -8 }}
      animate={inView ? { opacity: 1, scale: 1, rotate: 0 } : { opacity: 0, scale: 0.6, rotate: -8 }}
      transition={{ duration: 0.25, delay: tagIndex * 0.035, ease: "backOut" }}
      className="px-2 md:px-3 py-1 md:py-1.5 text-xs md:text-sm rounded-lg bg-muted/50 text-foreground border border-glass-border cursor-default"
      style={{
        transform: hovered ? "scale(1.08)" : "scale(1)",
        transition: "transform 200ms ease, box-shadow 200ms ease",
        boxShadow: hovered ? `0 0 8px 2px ${accent}66` : "none",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {skill}
    </motion.span>
  );
}

const Skills = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: false, margin: "-100px" });

  return (
    <section id="skills" className="px-4 sm:px-6 md:px-8 py-16 md:py-28 relative">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-neon-purple/5 rounded-full blur-[150px]" />
      <div className="max-w-7xl mx-auto relative z-10" ref={ref}>

        {/* Heading — bounces down */}
        <motion.div
          initial={{ opacity: 0, y: -40, scale: 0.9 }}
          animate={inView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: -40, scale: 0.9 }}
          transition={{ duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
          className="text-center mb-10 md:mb-16"
        >
          <h2 className="font-heading text-2xl sm:text-3xl md:text-5xl font-bold mb-4">
            Tech <span className="gradient-text">Stack</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-neon-blue to-neon-purple mx-auto rounded-full" />
        </motion.div>

        {/* Cards — alternating left/right slide */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {categories.map((cat, i) => (
            <CategoryCard key={cat.title} cat={cat} cardIndex={i} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
