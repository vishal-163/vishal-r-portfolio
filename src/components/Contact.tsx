import { motion, useReducedMotion } from "framer-motion";
import { Mail, Phone, Linkedin, Github } from "lucide-react";
import { useTilt } from "@/hooks/useTilt";

const VP = { once: false, amount: 0.15 };

const contactLinks = [
  { icon: Mail, label: "vishalravi163@gmail.com", href: "mailto:vishalravi163@gmail.com", truncate: true },
  { icon: Phone, label: "+91 8147741585", href: "tel:+918147741585", truncate: false },
];

const socialLinks = [
  { icon: Linkedin, label: "LinkedIn", href: "https://www.linkedin.com/in/vishal-ravi-653a8a33b/", external: true },
  { icon: Github, label: "GitHub", href: "https://github.com/vishal-163", external: true },
];

const Contact = () => {
  const shouldReduceMotion = useReducedMotion();
  const { ref, style, onMouseMove, onMouseLeave } = useTilt(6);

  return (
    <section id="contact" className="px-4 sm:px-6 md:px-8 py-16 md:py-28 relative">
      <div className="absolute bottom-0 right-0 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-neon-blue/5 rounded-full blur-[150px]" />
      <div className="max-w-3xl mx-auto relative z-10">

        {/* Heading — scales up from center */}
        <motion.div
          initial={shouldReduceMotion ? {} : { opacity: 0, scale: 0.7, y: 20 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={VP}
          transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.55, ease: [0.34, 1.56, 0.64, 1] }}
          className="mb-10 md:mb-16"
        >
          <div className="section-heading inline-block">
            <h2 className="font-heading text-2xl sm:text-3xl md:text-5xl font-bold mb-1">
              Get In <span className="gradient-text">Touch</span>
            </h2>
            <p className="font-mono text-xs text-white/25 mt-1">// contact.ts</p>
          </div>
        </motion.div>

        {/* Card — spring bounce up */}
        <motion.div
          ref={ref as React.RefObject<HTMLDivElement>}
          initial={shouldReduceMotion ? {} : { opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VP}
          transition={shouldReduceMotion ? { duration: 0 } : { type: "spring", stiffness: 100, damping: 14, delay: 0.1 }}
          className="glass-card-hover p-6 md:p-10 text-center"
          style={shouldReduceMotion ? undefined : style}
          onMouseMove={shouldReduceMotion ? undefined : onMouseMove}
          onMouseLeave={shouldReduceMotion ? undefined : onMouseLeave}
        >
          <motion.h3
            initial={shouldReduceMotion ? {} : { opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VP}
            transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.4, delay: 0.2 }}
            className="font-heading text-xl md:text-2xl font-semibold mb-4 md:mb-6"
          >
            Let's work together
          </motion.h3>

          <motion.p
            initial={shouldReduceMotion ? {} : { opacity: 0, filter: "blur(6px)" }}
            whileInView={{ opacity: 1, filter: "blur(0px)" }}
            viewport={VP}
            transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.5, delay: 0.25 }}
            className="text-muted-foreground text-sm md:text-base mb-8 md:mb-10 leading-relaxed max-w-xl mx-auto"
          >
            I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
          </motion.p>

          {/* Contact links — fan up from bottom */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8 md:mb-10">
            {contactLinks.map(({ icon: Icon, label, href, truncate }, i) => (
              <motion.a
                key={href}
                href={href}
                initial={shouldReduceMotion ? {} : { opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={VP}
                transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.4, delay: 0.3 + i * 0.1, ease: "backOut" }}
                className="flex items-center gap-3 text-sm md:text-base text-muted-foreground hover:text-neon-blue transition-colors group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 rounded-lg"
              >
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-neon-blue/10 flex items-center justify-center group-hover:bg-neon-blue/20 transition-colors">
                  <Icon className="w-4 h-4 md:w-5 md:h-5 text-neon-blue" />
                </div>
                <span className={truncate ? "truncate" : ""}>{label}</span>
              </motion.a>
            ))}
          </div>

          {/* Social links — staggered scale-in */}
          <div className="flex justify-center gap-4">
            {socialLinks.map(({ icon: Icon, label, href }, i) => (
              <motion.a
                key={href}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                initial={shouldReduceMotion ? {} : { opacity: 0, scale: 0.5, rotate: -10 }}
                whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                viewport={VP}
                transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.4, delay: 0.45 + i * 0.1, ease: "backOut" }}
                className="flex items-center gap-2 md:gap-3 text-sm md:text-base text-muted-foreground hover:text-neon-blue transition-colors group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 rounded-lg"
              >
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-neon-blue/10 flex items-center justify-center group-hover:bg-neon-blue/20 transition-colors border border-glass-border">
                  <Icon className="w-4 h-4 md:w-5 md:h-5 text-neon-blue" />
                </div>
                {label}
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
