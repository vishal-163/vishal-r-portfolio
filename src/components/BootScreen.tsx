import { useState, useEffect } from 'react';

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

  // Strict mobile-first OS detection
  if (ua.indexOf("iPhone") > -1 || ua.indexOf("iPad") > -1 || ua.indexOf("iPod") > -1) os = "iOS";
  else if (ua.indexOf("Android") > -1) os = "Android";
  else if (ua.indexOf("Mac") > -1) os = "macOS";
  else if (ua.indexOf("Win") > -1) os = "Windows";
  else if (ua.indexOf("Linux") > -1) os = "Linux";

  return { browser, os };
}

export function BootScreen() {
  const [isDone, setIsDone] = useState(false);
  const [loadingText, setLoadingText] = useState("");
  const [fadeState, setFadeState] = useState<'in' | 'out'>('out');

  useEffect(() => {
    const { browser, os } = getBrowserInfo();
    const sequence = [
      "Initializing",
      "Detecting Environment",
      `${os} • ${browser}`,
      "Loading Interface"
    ];

    let i = 0;
    
    // Initial fade in
    setTimeout(() => {
      setLoadingText(sequence[i]);
      setFadeState('in');
    }, 400);

    const interval = setInterval(() => {
      setFadeState('out');
      
      setTimeout(() => {
        i++;
        if (i < sequence.length) {
          setLoadingText(sequence[i]);
          setFadeState('in');
        } else {
          clearInterval(interval);
          setTimeout(() => setIsDone(true), 400); // Short delay before sliding away
        }
      }, 500); // 500ms fade out duration
    }, 1800); // 1800ms display duration

    return () => clearInterval(interval);
  }, []);

  return (
    <div id="boot" className={`apple-boot-overlay ${isDone ? 'done' : ''}`}>
      <div className="apple-boot-content">
        <div className="apple-spinner">
          <div className="spinner-ring"></div>
        </div>
        <div className={`apple-boot-text fade-${fadeState}`}>
          {loadingText}
        </div>
      </div>
    </div>
  );
}

