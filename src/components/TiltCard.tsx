import { useRef, ReactNode } from 'react';

interface TiltCardProps {
  children: ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export function TiltCard({ children, className = '', style = {} }: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const r = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    cardRef.current.style.transform = `perspective(600px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg) translateZ(4px)`;
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    cardRef.current.style.transform = 'perspective(600px) rotateY(0) rotateX(0) translateZ(0)';
  };

  return (
    <div
      ref={cardRef}
      className={`tilt-card glass-panel ${className}`}
      style={style}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </div>
  );
}
