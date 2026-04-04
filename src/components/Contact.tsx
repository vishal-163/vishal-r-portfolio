import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Mail, Phone, Linkedin, Github } from "lucide-react";

const Contact = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="contact" className="px-4 sm:px-6 md:px-8 py-16 md:py-28 relative">
      <div className="absolute bottom-0 right-0 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-neon-blue/5 rounded-full blur-[150px]" />
      <div className="max-w-3xl mx-auto relative z-10" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 md:mb-16"
        >
          <h2 className="font-heading text-2xl sm:text-3xl md:text-5xl font-bold mb-4">
            Get In <span className="gradient-text">Touch</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-neon-blue to-neon-purple mx-auto rounded-full" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-center"
        >
          <h3 className="font-heading text-xl md:text-2xl font-semibold mb-4 md:mb-6">Let's work together</h3>
          <p className="text-muted-foreground text-sm md:text-base mb-8 md:mb-10 leading-relaxed max-w-xl mx-auto">
            I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8 md:mb-10">
            <a href="mailto:vishalravi163@gmail.com" className="flex items-center gap-3 text-sm md:text-base text-muted-foreground hover:text-neon-blue transition-colors group">
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-neon-blue/10 flex items-center justify-center group-hover:bg-neon-blue/20 transition-colors">
                <Mail className="w-4 h-4 md:w-5 md:h-5 text-neon-blue" />
              </div>
              <span className="truncate">vishalravi163@gmail.com</span>
            </a>
            <a href="tel:+918147741585" className="flex items-center gap-3 text-sm md:text-base text-muted-foreground hover:text-neon-blue transition-colors group">
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-neon-blue/10 flex items-center justify-center group-hover:bg-neon-blue/20 transition-colors">
                <Phone className="w-4 h-4 md:w-5 md:h-5 text-neon-blue" />
              </div>
              +91 8147741585
            </a>
          </div>

          <div className="flex justify-center gap-4">
            <a href="https://www.linkedin.com/in/vishal-ravi-653a8a33b/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 md:gap-3 text-sm md:text-base text-muted-foreground hover:text-neon-blue transition-colors group">
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-neon-blue/10 flex items-center justify-center group-hover:bg-neon-blue/20 transition-colors border border-glass-border">
                <Linkedin className="w-4 h-4 md:w-5 md:h-5 text-neon-blue" />
              </div>
              LinkedIn
            </a>
            <a href="https://github.com/vishal-163" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 md:gap-3 text-sm md:text-base text-muted-foreground hover:text-neon-blue transition-colors group">
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-neon-blue/10 flex items-center justify-center group-hover:bg-neon-blue/20 transition-colors border border-glass-border">
                <Github className="w-4 h-4 md:w-5 md:h-5 text-neon-blue" />
              </div>
              GitHub
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
