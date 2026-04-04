import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ExternalLink, Github } from "lucide-react";

const projects = [
  {
    title: "AI Trip Planner",
    description: "AI-powered mobile app that generates personalized travel itineraries based on user preferences, budget, and duration.",
    tech: ["Flutter", "Supabase", "OpenAI API", "Gemini API", "PostgreSQL"],
    features: [
      "AI-generated itineraries",
      "Secure authentication (OAuth + email)",
      "Real-time data sync",
      "Structured JSON output for UI rendering",
    ],
    featured: false,
    tag: null,
  },
  {
    title: "Smart Military Vest",
    description: "Defence-grade IoT system for real-time soldier health monitoring and automated emergency alerts.",
    tech: ["ESP32", "Sensors", "LoRa", "GSM", "GPS"],
    features: [
      "Multi-sensor integration (SpO2, heart rate, motion)",
      "AES-256 encrypted communication",
      "Dual-channel transmission (LoRa + GSM)",
      "Intelligent distress detection system",
    ],
    featured: true,
    tag: "In Progress",
  },
];

const Projects = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="projects" className="section-padding relative">
      <div className="max-w-7xl mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-heading text-3xl md:text-5xl font-bold mb-4">
            Featured <span className="gradient-text">Projects</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-neon-blue to-neon-purple mx-auto rounded-full" />
        </motion.div>

        <div className="space-y-8">
          {projects.map((project, i) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.2 }}
              className={`glass-card p-8 relative overflow-hidden group transition-all duration-500 hover:shadow-neon ${
                project.featured
                  ? "border-neon-blue/30 shadow-neon-lg"
                  : "hover:border-neon-blue/30"
              }`}
            >
              {project.featured && (
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-neon-blue via-neon-purple to-neon-blue" />
              )}

              <div className="flex flex-wrap items-center gap-3 mb-4">
                <h3 className="font-heading text-2xl font-bold">{project.title}</h3>
                {project.tag && (
                  <span className="px-3 py-1 text-xs font-medium rounded-full bg-neon-purple/20 text-neon-purple border border-neon-purple/30">
                    {project.tag}
                  </span>
                )}
                {project.featured && (
                  <span className="px-3 py-1 text-xs font-medium rounded-full bg-neon-blue/20 text-neon-blue border border-neon-blue/30">
                    Featured
                  </span>
                )}
              </div>

              <p className="text-muted-foreground mb-6 max-w-2xl">{project.description}</p>

              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h4 className="text-sm font-semibold text-neon-blue mb-3 uppercase tracking-wider">Key Features</h4>
                  <ul className="space-y-2">
                    {project.features.map((f) => (
                      <li key={f} className="text-sm text-muted-foreground flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-neon-blue mt-1.5 shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-neon-purple mb-3 uppercase tracking-wider">Tech Stack</h4>
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((t) => (
                      <span key={t} className="px-3 py-1 text-xs rounded-lg bg-muted/50 border border-glass-border text-foreground">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex gap-4">
                <button className="btn-outline-glow flex items-center gap-2 text-sm !px-4 !py-2">
                  <Github className="w-4 h-4" /> GitHub
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
