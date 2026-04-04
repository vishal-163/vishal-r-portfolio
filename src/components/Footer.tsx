const Footer = () => {
  return (
    <footer className="relative z-10 border-t border-glass-border px-4 sm:px-6 md:px-8 py-8">
      <div className="max-w-7xl mx-auto text-center">
        <p className="gradient-text font-heading font-semibold text-sm md:text-base mb-2">
          Building the future, one system at a time.
        </p>
        <p className="text-muted-foreground text-xs md:text-sm">
          © {new Date().getFullYear()} Vishal R. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
