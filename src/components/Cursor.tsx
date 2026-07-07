import { useEffect, useRef, useState } from 'react';

export function Cursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const progRef = useRef<HTMLDivElement>(null);
  
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    // Check if device supports touch
    if (window.matchMedia('(hover: none) and (pointer: coarse)').matches) {
      setIsTouch(true);
      return;
    }

    let mx = window.innerWidth / 2;
    let my = window.innerHeight / 2;
    let rx = window.innerWidth / 2;
    let ry = window.innerHeight / 2;
    
    let animationFrameId: number;

    const onMouseMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      if (cursorRef.current) {
        cursorRef.current.style.left = `${mx}px`;
        cursorRef.current.style.top = `${my}px`;
      }
    };

    const loop = () => {
      rx += (mx - rx) * 0.12;
      ry += (my - ry) * 0.12;
      if (ringRef.current) {
        ringRef.current.style.left = `${rx}px`;
        ringRef.current.style.top = `${ry}px`;
      }
      animationFrameId = requestAnimationFrame(loop);
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    animationFrameId = requestAnimationFrame(loop);

    // Scroll Progress Logic
    const onScroll = () => {
      if (!progRef.current) return;
      const scrollY = window.scrollY;
      const maxScroll = document.body.scrollHeight - window.innerHeight;
      const width = (scrollY / maxScroll) * 100;
      progRef.current.style.width = `${Math.min(100, Math.max(0, width))}%`;
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    // Hover effect logic
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('a, button, summary, .editor-tab, .sidebar-file, .tilt-card')) {
        if (ringRef.current) {
          ringRef.current.style.width = '44px';
          ringRef.current.style.height = '44px';
          ringRef.current.style.borderColor = 'rgba(0,255,136,0.8)';
        }
      }
    };

    const handleMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('a, button, summary, .editor-tab, .sidebar-file, .tilt-card')) {
        if (ringRef.current) {
          ringRef.current.style.width = '32px';
          ringRef.current.style.height = '32px';
          ringRef.current.style.borderColor = 'rgba(0,255,136,0.5)';
        }
      }
    };

    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseout', handleMouseOut);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('scroll', onScroll);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  if (isTouch) return null;

  return (
    <>
      <div id="cur" ref={cursorRef} />
      <div id="cur-ring" ref={ringRef} />
      <div id="prog" ref={progRef} />
    </>
  );
}
