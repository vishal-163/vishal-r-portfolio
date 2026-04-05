import { useEffect, useState } from "react";

const ScrollProgress = () => {
  const [progress, setProgress] = useState(0);
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      const next = total > 0 ? Math.min((window.scrollY / total) * 100, 100) : 0;
      setProgress(next);
      if (next >= 100) {
        setCompleted(true);
      } else {
        setCompleted(false);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`scroll-progress${completed ? " scroll-progress--completed" : ""}`}
      style={{
        width: `${progress}%`,
        height: "3px",
        background: "linear-gradient(to right, #06b6d4, #10b981)",
        boxShadow: "0 0 6px #06b6d4",
      }}
    />
  );
};

export default ScrollProgress;
