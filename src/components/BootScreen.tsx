import { useState, useEffect } from 'react';

const BOOT_LINES = [
  'Initializing kernel...',
  'Loading system modules...',
  'Mounting filesystem...',
  'Starting network services...',
  'Loading portfolio.exe...',
  'Compiling assets...',
  'Connecting to database...',
  'System ready. Welcome.'
];

export function BootScreen() {
  const [lines, setLines] = useState<string[]>([]);
  const [progress, setProgress] = useState(0);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    let lineIndex = 0;
    
    // Smooth progress bar animation
    const TOTAL_BOOT_MS = BOOT_LINES.length * 380 + 800;
    
    // Force reflow and set width to 100% via CSS transition by just setting state
    setTimeout(() => {
      setProgress(100);
    }, 50);

    const nextLine = () => {
      if (lineIndex >= BOOT_LINES.length) {
        setTimeout(() => setIsDone(true), 700);
        return;
      }
      
      setLines(prev => [...prev, BOOT_LINES[lineIndex]]);
      lineIndex++;
      
      setTimeout(nextLine, lineIndex === BOOT_LINES.length ? 800 : 380);
    };

    const timeout = setTimeout(nextLine, 400);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <div id="boot" className={isDone ? 'done' : ''}>
      <div className="boot-logo">VR://INIT</div>
      
      <div className="boot-lines">
        {lines.map((line, idx) => (
          <div key={idx} className="boot-line show">
            <span className="boot-ok">[  OK  ]</span>{line}
          </div>
        ))}
      </div>
      
      <div className="boot-bar-wrap">
        <div 
          className="boot-bar" 
          style={{
            width: `${progress}%`, 
            transition: `width ${BOOT_LINES.length * 380 + 800}ms cubic-bezier(0.1,0,0.2,1)`
          }} 
        />
      </div>
    </div>
  );
}
