import { motion, useReducedMotion } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import profileImg from "@/assets/profile.jpg";
import { useTilt } from "@/hooks/useTilt";

// ─── Terminal Title Bar ───────────────────────────────────────────────────────
const TerminalBar = () => (
  <div className="terminal-titlebar">
    <span className="terminal-dot bg-red-500/80" />
    <span className="terminal-dot bg-yellow-500/80" />
    <span className="terminal-dot bg-green-500/80" />
    <span className="font-mono text-xs text-white/20 ml-2 select-none">~/vishal-r/portfolio</span>
  </div>
);

// ─── Shimmer Button ───────────────────────────────────────────────────────────
interface ShimmerButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  as?: "button" | "a";
  href?: string;
  target?: string;
  rel?: string;
}

const ShimmerButton = ({
  children,
  className = "",
  onClick,
  as: Tag = "button",
  href,
  target,
  rel,
}: ShimmerButtonProps) => {
  const prefersReduced = useReducedMotion();

  const shimmer = prefersReduced ? null : (
    <motion.span
      aria-hidden="true"
      className="absolute inset-0 pointer-events-none"
      initial={{ translateX: "-100%" }}
      whileHover={{ translateX: "100%" }}
      transition={{ duration: 0.45, ease: "easeInOut" }}
      style={{
        background: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.12) 50%, transparent 100%)",
      }}
    />
  );

  const inner = (
    <span className="relative overflow-hidden inline-flex items-center justify-center w-full h-full gap-2">
      {children}
      {shimmer}
    </span>
  );

  if (Tag === "a") {
    return <a href={href} target={target} rel={rel} className={className}>{inner}</a>;
  }
  return <button onClick={onClick} className={className}>{inner}</button>;
};

// ─── Hero ─────────────────────────────────────────────────────────────────────
const Hero = () => {
  const prefersReduced = useReducedMotion();
  const tilt = useTilt(10);

  const scrollTo = (id: string) => {
    document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const makeEntrance = (index: number) =>
    prefersReduced
      ? { initial: { opacity: 1, y: 0 }, animate: { opacity: 1, y: 0 }, transition: {} }
      : {
          initial: { opacity: 0, y: 16 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.45, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] },
        };

  return (
    <section
      id="home"
      className="min-h-screen flex items-center px-4 sm:px-6 md:px-8 py-20 pt-24 relative overflow-hidden"
    >
      {/* Subtle dot grid — very faint */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.025) 1px, transparent 1px)",
          backgroundSize: "36px 36px",
          zIndex: 0,
        }}
      />

      {/* Ambient glows — very subtle */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-cyan-500/5 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-emerald-500/5 rounded-full blur-[100px] translate-x-1/3 translate-y-1/3" />

      <div className="max-w-7xl mx-auto w-full flex flex-col-reverse md:grid md:grid-cols-2 gap-10 md:gap-16 items-center relative z-10">

        {/* TEXT — wrapped in terminal chrome */}
        <div>
          <div className="terminal-window">
            <TerminalBar />
            <div className="p-6 md:p-10 space-y-6">

              {/* Prompt line */}
              <motion.div {...makeEntrance(0)}>
                <p className="font-mono text-xs text-emerald-400/70 tracking-wider">
                  <span className="text-cyan-400/50">❯</span> whoami
                </p>
                <p className="font-mono text-xs text-white/30 mt-0.5 tracking-widest uppercase">
                  Welcome to my portfolio
                </p>
              </motion.div>

              {/* Name */}
              <motion.div {...makeEntrance(1)}>
                <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight heading-glow">
                  Hi, I'm{" "}
                  <span className="bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent">
                    Vishal R1
                  </span>
                  <span className="ml-1 text-cyan-400 text-base align-baseline blink">_</span>
                </h1>
              </motion.div>

              {/* Role — monospace style */}
              <motion.div {...makeEntrance(2)}>
                <p className="font-mono text-sm md:text-base text-emerald-400/90">
                  <span className="text-white/30">// </span>
                  <TypeAnimation
                    sequence={[
                      "Aspiring Full Stack Developer",
                      2000,
                      "",
                      400,
                      "Building Scalable Web & AI Systems",
                      2000,
                      "",
                      400,
                      "CS Undergraduate",
                      2000,
                      "",
                      400,
                    ]}
                    speed={55}
                    repeat={Infinity}
                    cursor={false}
                  />
                  <span className="ml-0.5 text-cyan-400 text-sm blink">_</span>
                </p>
              </motion.div>

              {/* Description */}
              <motion.div {...makeEntrance(3)}>
                <p className="text-sm text-muted-foreground leading-relaxed border-l-2 border-white/10 pl-3">
                  Computer Science student and aspiring Full Stack Developer with a strong interest in
                  building scalable web and AI-driven applications. I have hands-on experience with
                  technologies like React, HTML, CSS, Python and PostgreSQL, and I enjoy working across
                  both frontend and backend to create efficient systems.
                </p>
              </motion.div>

              {/* Buttons */}
              <motion.div {...makeEntrance(4)}>
                <div className="flex flex-wrap gap-3 pt-2">
                  <ShimmerButton onClick={() => scrollTo("#projects")} className="btn-primary-glow">
                    View Projects
                  </ShimmerButton>
                  <ShimmerButton as="a" href="/resume.pdf" target="_blank" rel="noopener noreferrer" className="btn-outline-glow">
                    View Resume
                  </ShimmerButton>
                  <ShimmerButton onClick={() => scrollTo("#contact")} className="btn-outline-glow">
                    Contact Me
                  </ShimmerButton>
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* IMAGE */}
        <motion.div
          initial={prefersReduced ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={prefersReduced ? {} : { duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="flex justify-center"
        >
          <div
            ref={tilt.ref as React.RefObject<HTMLDivElement>}
            style={tilt.style}
            onMouseMove={tilt.onMouseMove}
            onMouseLeave={tilt.onMouseLeave}
            className="relative image-ambient"
          >
            {/* Ambient light behind image — cinematic depth */}
            <div
              className="absolute rounded-full pointer-events-none"
              style={{
                inset: "-20%",
                background: "radial-gradient(ellipse at center, rgba(6,182,212,0.07) 0%, rgba(16,185,129,0.04) 40%, transparent 70%)",
                filter: "blur(20px)",
              }}
            />

            {/* Rotating gradient border — slow, elegant */}
            <div className="hero-gradient-border animate-float">
              <div className="w-44 h-44 sm:w-60 sm:h-60 md:w-72 md:h-72 lg:w-80 lg:h-80 rounded-full overflow-hidden">
                <img
                  src={profileImg}
                  alt="Vishal R"
                  className="w-full h-full object-cover"
                  loading="eager"
                />
              </div>
            </div>

            {/* Single refined ring */}
            <div className="absolute -inset-3 rounded-full border border-white/[0.04]" />
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default Hero;
