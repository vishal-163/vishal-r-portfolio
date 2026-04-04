import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const navItems = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Education", href: "#education" },
  { label: "Contact", href: "#contact" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("home");
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50);

      const sections = navItems.map((n) => n.href.slice(1));
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.getBoundingClientRect().top <= 120) {
          setActive(sections[i]);
          break;
        }
      }
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (href: string) => {
    setMobileOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition ${
        scrolled ? "bg-black/40 backdrop-blur border-b border-white/10" : ""
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8 flex items-center justify-between h-16">

        <button
          onClick={() => scrollTo("#home")}
          className="font-bold text-xl bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent"
        >
          Vishal R
        </button>

        {/* Desktop */}
        <div className="hidden md:flex gap-8">
          {navItems.map((item) => (
            <button
              key={item.href}
              onClick={() => scrollTo(item.href)}
              className={`text-sm transition ${
                active === item.href.slice(1)
                  ? "text-cyan-400"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Mobile menu button */}
        <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden">
          ☰
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-black/90 px-4 pb-4">
          {navItems.map((item) => (
            <button
              key={item.href}
              onClick={() => scrollTo(item.href)}
              className="block w-full text-left py-3 text-gray-300 hover:text-cyan-400"
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </motion.nav>
  );
};

export default Navbar;