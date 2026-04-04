import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Github } from "lucide-react";

const projects = [
  {
    title: "AI Trip Planner",
    description: "AI-powered mobile app that generates personalized travel itineraries based on user preferences, budget, and duration.",
    tech: ["Flutter", "Supabase", "OpenAI API", "Gemini API", "PostgreSQL"],
    features: [
      "Built a cross-platform mobile application generating personalized AI-based travel itineraries based on user preferences, budget, and duration, reducing manual planning effort significantly.",
      "Designed a modular three-tier architecture with Flutter frontend, Supabase backend, and a dedicated AI service layer for scalable integration.",
      "Engineered structured data flow ensuring deterministic JSON outputs for seamless UI rendering and improved reliability.",
      "Implemented secure authentication (email + OAuth), row-level security, and normalized database schema for efficient data handling.",
      "Developed full CRUD operations with real-time synchronization using Supabase subscriptions for dynamic updates.",
    ],
    github: "https://github.com/vishal-163/AI-TRIP-PLANNER.git",
    featured: false,
    tag: "Completed",
  },
  {
    title: "Smart Military Vest",
    description: "Defence-grade IoT system for real-time soldier health monitoring and automated emergency alerts.",
    tech: ["ESP32", "Sensors", "LoRa", "GSM", "GPS"],
    features: [
      "Designing a defence-grade wearable system for real-time soldier health monitoring including heart rate, SpO2,temperature, and motion tracking.",
      "Built multi-sensor integration using I2C and SPI protocols with on-device preprocessing for efficient data aggregation.",
      "Architecting dual-channel communication using LoRa and GSM/4G with AES-256 encryption for secure and reliable transmission.",
      "Developing an intelligent alert system for automated distress signal generation based on health thresholds.",
      "Planning scalable backend architecture using MQTT, time-series database, and analytics dashboard for command centre monitoring.",
    ],
    github: null,
    featured: false,
    tag: "In Progress",
  },
];

const Projects = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="projects" className="px-4 sm:px-6 md:px-8 py-16 md:py-28 relative overflow-x-hidden">
      <div className="max-w-7xl mx-auto" ref={ref}>
        
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 md:mb-16"
        >
          <h2 className="font-heading text-2xl sm:text-3xl md:text-5xl font-bold mb-4">
            Featured <span className="bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent">Projects</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-cyan-400 to-emerald-400 mx-auto rounded-full" />
        </motion.div>

        {/* Projects */}
        <div className="space-y-6 md:space-y-8">
          {projects.map((project, i) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.2 }}
              className={`glass-card p-5 sm:p-6 md:p-8 relative overflow-hidden group transition-all duration-500 hover:shadow-[0_0_40px_rgba(6,182,212,0.3)] ${
                project.featured
                  ? "border-cyan-400/30"
                  : "hover:border-cyan-400/30"
              }`}
            >

              {/* Top highlight bar */}
              {project.featured && (
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-cyan-400 via-emerald-400 to-cyan-400" />
              )}

              {/* Title */}
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <h3 className="font-heading text-lg sm:text-xl md:text-2xl font-bold">
                  {project.title}
                </h3>

                {project.tag && (
                  <span className="px-2 py-1 text-[10px] sm:text-xs rounded-full bg-emerald-400/20 text-emerald-400 border border-emerald-400/30">
                    {project.tag}
                  </span>
                )}

                {project.featured && (
                  <span className="px-2 py-1 text-[10px] sm:text-xs rounded-full bg-cyan-400/20 text-cyan-400 border border-cyan-400/30">
                    Featured
                  </span>
                )}
              </div>

              {/* Description */}
              <p className="text-muted-foreground text-sm md:text-base mb-4 md:mb-6 max-w-2xl">
                {project.description}
              </p>

              {/* Grid */}
              <div className="grid sm:grid-cols-2 gap-4 md:gap-6 mb-4 md:mb-6">

                {/* Features */}
                <div>
                  <h4 className="text-xs font-semibold text-cyan-400 mb-2 uppercase tracking-wider">
                    Key Features
                  </h4>
                  <ul className="space-y-1.5">
                    {project.features.map((f) => (
                      <li key={f} className="text-xs md:text-sm text-muted-foreground flex gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-1.5" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Tech */}
                <div>
                  <h4 className="text-xs font-semibold text-emerald-400 mb-2 uppercase tracking-wider">
                    Tech Stack
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((t) => (
                      <span key={t} className="px-2 py-1 text-[10px] md:text-xs rounded-lg bg-muted/50 border border-white/10">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* GitHub */}
              {project.github && (
                <button
                  onClick={() => window.open(project.github, "_blank")}
                  className="btn-outline-glow flex items-center gap-2 text-xs md:text-sm"
                >
                  <Github className="w-4 h-4" /> GitHub
                </button>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;