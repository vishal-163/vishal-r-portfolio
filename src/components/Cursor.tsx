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
        cursorRef.current.style.transform = `translate3d(${mx}px, ${my}px, 0) translate(-50%, -50%)`;
      }
    };

    const loop = () => {
      rx += (mx - rx) * 0.12;
      ry += (my - ry) * 0.12;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${rx}px, ${ry}px, 0) translate(-50%, -50%)`;
      }
      animationFrameId = requestAnimationFrame(loop);
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    animationFrameId = requestAnimationFrame(loop);

    // Scroll Progress Logic
    let scrollAnimationFrame: number | null = null;
    const onScroll = () => {
      if (scrollAnimationFrame) return;
      scrollAnimationFrame = requestAnimationFrame(() => {
        if (!progRef.current) return;
        const scrollY = window.scrollY;
        const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
        const width = maxScroll > 0 ? (scrollY / maxScroll) : 0;
        progRef.current.style.transform = `scaleX(${Math.min(1, Math.max(0, width))})`;
        scrollAnimationFrame = null;
      });
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    // Hover effect logic
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!ringRef.current || !cursorRef.current) return;
      
      // No hover expansion - cursor stays the same size
    };

    const handleMouseOut = (e: MouseEvent) => {
      // No hover expansion - cursor stays the same size
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
