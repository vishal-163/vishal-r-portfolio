import { useState, useEffect, useRef } from 'react';

function getBrowserInfo() {
  const ua = navigator.userAgent;
  let browser = "UNKNOWN_BROWSER";
  let os = "UNKNOWN_OS";

  if (ua.indexOf("iPhone") > -1 || ua.indexOf("iPad") > -1 || ua.indexOf("iPod") > -1) os = "IOS";
  else if (ua.indexOf("Android") > -1) os = "ANDROID";
  else if (ua.indexOf("Mac") > -1) os = "MACOS";
  else if (ua.indexOf("Win") > -1) os = "WINDOWS";
  else if (ua.indexOf("Linux") > -1) os = "LINUX";

  if (ua.indexOf("CriOS") > -1) browser = "CHROME";
  else if (ua.indexOf("FxiOS") > -1) browser = "FIREFOX";
  else if (ua.indexOf("EdgiOS") > -1) browser = "EDGE";
  else if (ua.indexOf("OPiOS") > -1) browser = "OPERA";
  else if (ua.indexOf("SamsungBrowser") > -1) browser = "SAMSUNG_INTERNET";
  else if (ua.indexOf("Firefox") > -1) browser = "FIREFOX";
  else if (ua.indexOf("Opera") > -1 || ua.indexOf("OPR") > -1) browser = "OPERA";
  else if (ua.indexOf("Trident") > -1) browser = "IE";
  else if (ua.indexOf("Edg") > -1) browser = "EDGE";
  else if (ua.indexOf("Chrome") > -1) browser = "CHROME";
  else if (ua.indexOf("Safari") > -1) browser = "SAFARI";

  return { browser, os };
}

function getTimestamp() {
  const now = new Date();
  return now.toLocaleTimeString('en-US', { hour12: true, hour: '2-digit', minute: '2-digit', second: '2-digit' });
}

export function BootScreen({ onComplete }: { onComplete?: () => void }) {
  const [isDone, setIsDone] = useState(false);
  const [timestamps, setTimestamps] = useState<string[]>([]);
  const onCompleteRef = useRef(onComplete);

  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  const { browser, os } = getBrowserInfo();
  const sequenceTexts = [
    "PORTFOLIO REQUEST DETECTED ",
    "DETECTING ENVIRONMENT ",
    `> OS: ${os} | BROWSER: ${browser}`,
    "ESTABLISHING SECURE CONNECTION ",
    "AUTHENTICATING GUEST SESSION ",
    "INITIALIZING SYSTEM ARCHITECTURE ",
    "FETCHING ASSETS AND MODULES ",
    "LOADING PROJECT DATA ",
    "COMPILING UI COMPONENTS ",
    "SYSTEM READY. STARTING INTERFACE "
  ];

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>;
    let isCancelled = false;
    let i = 0; // Local counter
    let activeTimestamps: string[] = [];

    // Reset timestamps on mount for StrictMode
    setTimestamps([]);

    const addLog = () => {
      if (isCancelled) return;

      if (i < sequenceTexts.length) {
        // Strictly overwrite state with local array to prevent React batching from skipping renders
        activeTimestamps = [...activeTimestamps, getTimestamp()];
        setTimestamps(activeTimestamps);

        i++;

        // Longer delay when waiting for environment detection
        let delay = Math.random() * 300 + 400; // 400ms - 700ms
        if (i === 2) {
          delay = Math.random() * 800 + 1500; // 1500ms - 2300ms
        }

        timeoutId = setTimeout(addLog, delay);
      } else {
        timeoutId = setTimeout(() => {
          if (!isCancelled) {
            setIsDone(true);
            if (onCompleteRef.current) {
              setTimeout(onCompleteRef.current, 800);
            }
          }
        }, 1200);
      }
    };

    timeoutId = setTimeout(addLog, 400);

    return () => {
      isCancelled = true;
      clearTimeout(timeoutId);
    };
  }, []);

  return (
    <div id="boot" className={`render-boot-overlay ${isDone ? 'done' : ''}`}>
      <div className="render-boot-topbar">
        <div className="render-boot-brand">VISHAL R</div>
        <div className="render-boot-status">
          <div className="render-spinner"></div>
          <span>WAKING UP</span>
        </div>
      </div>
      <div className="render-boot-divider"></div>

      <div className="render-boot-console-container">
        <div className="render-boot-console">
          {sequenceTexts.map((text, index) => {
            const isVisible = index < timestamps.length;
            return (
              <div
                key={index}
                className="render-boot-log-entry"
                style={{
                  opacity: isVisible ? 1 : 0,
                  animation: isVisible ? 'render-fade-in 0.4s ease forwards' : 'none',
                  visibility: isVisible ? 'visible' : 'hidden' // Ensure hidden items can't be interacted with, but still take up space! Wait, visibility hidden doesn't change layout!
                }}
              >
                <span className="render-boot-timestamp">{timestamps[index] || '00:00:00 AM'}</span>
                <span className={`render-boot-logtext ${index === 2 ? 'highlight' : ''}`}>
                  {text}
                  {index === 1 && timestamps.length === 2 && (
                    <span className="render-inline-spinner"></span>
                  )}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
