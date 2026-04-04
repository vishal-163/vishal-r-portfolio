import { Heart } from "lucide-react";

const Footer = () => (
  <footer className="border-t border-glass-border py-8 px-4 text-center">
    <p className="gradient-text font-heading font-semibold text-lg mb-2">
      Building the future, one system at a time.
    </p>
    <p className="text-muted-foreground text-sm flex items-center justify-center gap-1">
      Made with <Heart className="w-4 h-4 text-neon-purple fill-neon-purple" /> by Vishal R © {new Date().getFullYear()}
    </p>
  </footer>
);

export default Footer;
