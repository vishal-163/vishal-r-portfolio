import { useState, useEffect, useRef } from 'react';

function getBrowserInfo() {
  const ua = navigator.userAgent;
  let browser = "Unknown Browser";
  let os = "Unknown OS";

  if (ua.indexOf("Firefox") > -1) browser = "Mozilla Firefox";
  else if (ua.indexOf("SamsungBrowser") > -1) browser = "Samsung Internet";
  else if (ua.indexOf("Opera") > -1 || ua.indexOf("OPR") > -1) browser = "Opera";
  else if (ua.indexOf("Trident") > -1) browser = "Microsoft Internet Explorer";
  else if (ua.indexOf("Edge") > -1) browser = "Microsoft Edge";
  else if (ua.indexOf("Chrome") > -1) browser = "Google Chrome";
  else if (ua.indexOf("Safari") > -1) browser = "Apple Safari";

  if (ua.indexOf("Win") > -1) os = "Windows";
  else if (ua.indexOf("Mac") > -1) os = "macOS";
  else if (ua.indexOf("Linux") > -1) os = "Linux";
  else if (ua.indexOf("Android") > -1) os = "Android";
  else if (ua.indexOf("like Mac") > -1) os = "iOS";

  return { browser, os };
}

export function BootScreen() {
  const [isDone, setIsDone] = useState(false);
  const [input, setInput] = useState('');
  const [error, setError] = useState('');
  const [booting, setBooting] = useState(false);
  const [bootLogs, setBootLogs] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!booting) {
      if (inputRef.current) inputRef.current.focus();
      const handleClick = () => { if (inputRef.current) inputRef.current.focus(); };
      window.addEventListener('click', handleClick);
      return () => window.removeEventListener('click', handleClick);
    }
  }, [booting]);

  useEffect(() => {
    if (booting) {
      const { browser, os } = getBrowserInfo();
      const sequence = [
        "Starting development server...",
        "Compiled successfully!",
        "Detecting environment...",
        `[Env] OS: ${os}`,
        `[Env] Browser: ${browser}`,
        "Establishing connection...",
        "Launching portfolio..."
      ];

      let i = 0;
      const interval = setInterval(() => {
        if (i < sequence.length) {
          setBootLogs(prev => [...prev, sequence[i]]);
          i++;
        } else {
          clearInterval(interval);
          setTimeout(() => setIsDone(true), 600);
        }
      }, 300);

      return () => clearInterval(interval);
    }
  }, [booting]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      if (input.trim() === 'npm start') {
        setBooting(true);
      } else {
        setError("zsh: command not found: " + input);
        setInput('');
      }
    }
  };

  return (
    <div id="boot" className={isDone ? 'done' : ''} style={{
      background: '#0A0A0A',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'fixed',
      inset: 0,
      zIndex: 9999,
      transition: 'opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), visibility 0.8s',
      opacity: isDone ? 0 : 1,
      visibility: isDone ? 'hidden' : 'visible'
    }}>
      <div style={{
        width: '85%',
        maxWidth: '750px',
        minHeight: '55vh',
        height: 'auto',
        background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.04) 0%, rgba(255, 255, 255, 0.005) 100%)',
        backdropFilter: 'blur(40px) saturate(150%)',
        WebkitBackdropFilter: 'blur(40px) saturate(150%)',
        border: '1px solid rgba(255, 255, 255, 0.05)',
        borderTop: '1px solid rgba(255, 255, 255, 0.15)',
        borderLeft: '1px solid rgba(255, 255, 255, 0.1)',
        borderRadius: '24px',
        overflow: 'hidden',
        boxShadow: '0 32px 80px rgba(0, 0, 0, 0.6), 0 8px 16px rgba(0, 0, 0, 0.4), inset 0 1px 1px rgba(255, 255, 255, 0.15), inset 0 -1px 1px rgba(0, 0, 0, 0.2)',
        fontFamily: "'JetBrains Mono', 'IBM Plex Mono', monospace"
      }}>
        {/* Header */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '16px 20px',
          background: 'rgba(255, 255, 255, 0.03)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
          position: 'relative'
        }}>
          <div style={{ display: 'flex', gap: '8px', position: 'absolute', left: '20px' }}>
            <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ff5f57' }}></div>
            <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#febc2e' }}></div>
            <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#28c840' }}></div>
          </div>
          <div style={{ color: 'rgba(255, 255, 255, 0.4)', fontSize: '0.85rem' }}>vishal — -zsh — 80x24</div>
        </div>

        {/* Body */}
        <div style={{ padding: '2rem', display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', alignItems: 'center', fontSize: '1.2rem', color: '#FFFFFF', fontWeight: 'bold' }}>
            <span style={{ whiteSpace: 'nowrap' }}>vishal@portfolio ~ %</span>
            {!booting && (
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                spellCheck="false"
                autoComplete="off"
                style={{
                  background: 'transparent',
                  border: 'none',
                  outline: 'none',
                  color: '#FFFFFF',
                  fontFamily: 'inherit',
                  fontSize: 'inherit',
                  fontWeight: 'inherit',
                  marginLeft: '10px',
                  flex: 1
                }}
              />
            )}
            {booting && (
              <span style={{ marginLeft: '10px' }}>npm start</span>
            )}
          </div>

          <div style={{ fontSize: '1.2rem', color: '#666666', marginTop: '2rem', marginBottom: '1.5rem' }}>
            Type 'npm start' and press Enter to boot...
          </div>

          {error && !booting && <div style={{ color: '#444444', marginTop: '1rem', fontSize: '1rem' }}>{error}</div>}

          {booting && (
            <div style={{ marginTop: '1rem', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {bootLogs.map((log, index) => (
                <div key={index} style={{ color: '#cccccc', fontSize: '1.1rem' }}>
                  {log}
                </div>
              ))}
              <div style={{
                display: 'inline-block',
                width: '10px',
                height: '1.2rem',
                background: '#cccccc',
                animation: 'blink 1s step-end infinite',
                marginTop: '8px'
              }}></div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
