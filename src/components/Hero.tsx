import { motion, useReducedMotion } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import profileImg from "@/assets/profile.jpg";
import { useTilt } from "@/hooks/useTilt";

// ─── Hero Grid Texture ────────────────────────────────────────────────────────
const HeroGridTexture = () => (
  <div
    aria-hidden="true"
    className="absolute inset-0 pointer-events-none"
    style={{
      backgroundImage:
        "radial-gradient(circle, rgba(6,182,212,0.08) 1px, transparent 1px)",
      backgroundSize: "28px 28px",
      zIndex: 0,
    }}
  />
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
      transition={{ duration: 0.5, ease: "easeInOut" }}
      style={{
        background:
          "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.18) 50%, transparent 100%)",
      }}
    />
  );

  const inner = (
    <span className="relative overflow-hidden inline-flex items-center justify-center w-full h-full">
      {children}
      {shimmer}
    </span>
  );

  if (Tag === "a") {
    return (
      <a href={href} target={target} rel={rel} className={className}>
        {inner}
      </a>
    );
  }

  return (
    <button onClick={onClick} className={className}>
      {inner}
    </button>
  );
};

// ─── Hero ─────────────────────────────────────────────────────────────────────
const Hero = () => {
  const prefersReduced = useReducedMotion();
  const tilt = useTilt(10);

  const scrollTo = (id: string) => {
    document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });
  };

  // When reduced-motion is active, skip entrance animation — show final state
  const makeEntrance = (index: number) =>
    prefersReduced
      ? { initial: { opacity: 1, y: 0 }, animate: { opacity: 1, y: 0 }, transition: {} }
      : {
          initial: { opacity: 0, y: 20 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.5, delay: index * 0.15 },
        };

  return (
    <section
      id="home"
      className="min-h-screen flex items-center px-4 sm:px-6 md:px-8 py-20 pt-24 relative overflow-hidden"
    >
      {/* Grid texture */}
      <HeroGridTexture />

      {/* Background glow */}
      <div className="absolute top-1/4 -left-32 w-64 md:w-96 h-64 md:h-96 bg-cyan-500/10 rounded-full blur-[120px]" />
      <div className="absolute bottom-1/4 -right-32 w-64 md:w-96 h-64 md:h-96 bg-emerald-500/10 rounded-full blur-[120px]" />

      <div className="max-w-7xl mx-auto w-full flex flex-col-reverse md:grid md:grid-cols-2 gap-8 md:gap-12 items-center relative z-10">

        {/* TEXT */}
        <div className="text-center md:text-left">

          {/* Welcome text — index 0 */}
          <motion.div {...makeEntrance(0)}>
            <p className="text-cyan-400 font-medium mb-3 text-xs tracking-widest uppercase">
              Welcome to my portfolio
            </p>
          </motion.div>

          {/* Heading — index 1 */}
          <motion.div {...makeEntrance(1)}>
            <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold leading-tight mb-4">
              Hi, I'm{" "}
              <span className="bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent">
                Vishal R
              </span>
              <span className="ml-1 text-cyan-400 text-base align-baseline blink">_</span>
            </h1>
          </motion.div>

          {/* Role — index 2 */}
          <motion.div {...makeEntrance(2)}>
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground mb-4 font-medium">
              <TypeAnimation
                sequence={[
                  "Aspiring Full Stack Developer",
                  2000,
                  "",
                  500,
                  "Building Scalable Web & AI Systems",
                  2000,
                  "",
                  500,
                  "CS Undergraduate",
                  2000,
                  "",
                  500,
                ]}
                speed={50}
                repeat={Infinity}
                cursor={false}
              />
              <span className="ml-1 text-cyan-400 text-sm blink">_</span>
            </p>
          </motion.div>

          {/* Description — index 3 */}
          <motion.div {...makeEntrance(3)}>
            <p className="text-sm sm:text-base text-muted-foreground mb-6 max-w-lg mx-auto md:mx-0 leading-relaxed">
              Computer Science student and aspiring Full Stack Developer with a strong interest in
              building scalable web and AI-driven applications. I have hands-on experience with
              technologies like React, HTML, CSS, Python and PostgreSQL, and I enjoy working across
              both frontend and backend to create efficient systems.
            </p>
          </motion.div>

          {/* Buttons — index 4 */}
          <motion.div {...makeEntrance(4)}>
            <div className="flex flex-col sm:flex-row gap-4 items-center md:items-start justify-center md:justify-start">
              <ShimmerButton
                onClick={() => scrollTo("#projects")}
                className="btn-primary-glow w-full sm:w-auto"
              >
                View Projects
              </ShimmerButton>

              <ShimmerButton
                as="a"
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline-glow w-full sm:w-auto flex justify-center"
              >
                View Resume
              </ShimmerButton>

              <ShimmerButton
                onClick={() => scrollTo("#contact")}
                className="btn-outline-glow w-full sm:w-auto"
              >
                Contact Me
              </ShimmerButton>
            </div>
          </motion.div>
        </div>

        {/* IMAGE */}
        <motion.div
          initial={prefersReduced ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={prefersReduced ? {} : { duration: 0.8, delay: 0.3 }}
          className="flex justify-center"
        >
          {/* Tilt wrapper — tilt is skipped internally when reduced-motion is active */}
          <div
            ref={tilt.ref as React.RefObject<HTMLDivElement>}
            style={tilt.style}
            onMouseMove={tilt.onMouseMove}
            onMouseLeave={tilt.onMouseLeave}
            className="relative"
          >
            {/* Glow background */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-cyan-400/20 to-emerald-400/20 blur-2xl scale-110" />

            {/* Animated gradient border wrapper */}
            <div className="hero-gradient-border glow-blue animate-float">
              <div className="w-40 h-40 sm:w-56 sm:h-56 md:w-72 md:h-72 lg:w-80 lg:h-80 rounded-full overflow-hidden">
                <img
                  src={profileImg}
                  alt="Vishal R"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Rings */}
            <div className="absolute -inset-4 rounded-full border border-cyan-400/20 animate-pulse" />
            <div className="absolute -inset-8 rounded-full border border-emerald-400/10" />
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default Hero;
