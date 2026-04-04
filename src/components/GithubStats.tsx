import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { GitBranch, Activity, Code } from "lucide-react";

const stats = [
  { icon: GitBranch, label: "Repositories", value: "15+" },
  { icon: Activity, label: "Contributions", value: "200+" },
  { icon: Code, label: "Languages Used", value: "8+" },
];

const GithubStats = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="section-padding relative">
      <div className="max-w-7xl mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-heading text-3xl md:text-5xl font-bold mb-4">
            GitHub <span className="gradient-text">Activity</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-neon-blue to-neon-purple mx-auto rounded-full" />
        </motion.div>

        <div className="grid sm:grid-cols-3 gap-6 mb-12">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="glass-card-hover p-6 text-center"
            >
              <stat.icon className="w-8 h-8 text-neon-blue mx-auto mb-3" />
              <p className="font-heading text-3xl font-bold gradient-text mb-1">{stat.value}</p>
              <p className="text-muted-foreground text-sm">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="glass-card p-6 overflow-hidden"
        >
          <img
            src="https://ghchart.rshah.org/3b82f6/vishalravi163"
            alt="GitHub Contribution Graph"
            className="w-full opacity-80 hover:opacity-100 transition-opacity"
            loading="lazy"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default GithubStats;
