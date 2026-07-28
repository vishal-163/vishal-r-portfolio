import { useState, useRef, useEffect } from 'react';

type Step = 'name' | 'email' | 'message' | 'sending' | 'success' | 'error';

export function ContactSection() {
  const [step, setStep] = useState<Step>('name');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [progress, setProgress] = useState(0);
  const [isFocused, setIsFocused] = useState(false);
  const [terminalError, setTerminalError] = useState('');

  const inputRef = useRef<HTMLInputElement>(null);
  const terminalBodyRef = useRef<HTMLDivElement>(null);

  // Auto scroll to bottom when terminal content updates
  useEffect(() => {
    if (terminalBodyRef.current) {
      terminalBodyRef.current.scrollTop = terminalBodyRef.current.scrollHeight;
    }
  }, [step, inputValue, message, progress]);

  const handleTerminalClick = () => {
    inputRef.current?.focus();
  };

  const resetTerminal = () => {
    setStep('name');
    setName('');
    setEmail('');
    setMessage('');
    setInputValue('');
    setProgress(0);
    setTerminalError('');
    // Slight delay to ensure focus happens after render
    setTimeout(() => inputRef.current?.focus(), 10);
  };

  const handleKeyDown = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const val = inputValue.trim();

      if (step === 'name') {
        if (!val || val.length < 2) {
          setTerminalError('Error: Name must be at least 2 characters.');
          return;
        }
        setName(val);
        setStep('email');
        setInputValue('');
      } else if (step === 'email') {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!val || !emailRegex.test(val)) {
          setTerminalError('Error: Invalid email format. Please enter a valid email.');
          return;
        }

        const domain = val.split('@')[1].toLowerCase();
        const gmailTypos = ['gmil.com', 'gamil.com', 'gmial.com', 'gmai.com', 'gmail.con', 'gmail.co'];
        if (gmailTypos.includes(domain)) {
          setTerminalError(`Error: Domain typo detected. Did you mean "gmail.com"?`);
          return;
        }

        const yahooTypos = ['yaho.com', 'yahoo.con', 'yaho.co'];
        if (yahooTypos.includes(domain)) {
          setTerminalError(`Error: Domain typo detected. Did you mean "yahoo.com"?`);
          return;
        }

        setEmail(val);
        setStep('message');
        setInputValue('');
      } else if (step === 'message') {
        if (!val) {
          setTerminalError('Error: Message cannot be empty.');
          return;
        }
        setMessage(val);
        setInputValue('');
        setStep('sending');
        await submitForm(name, email, val);
      }
    }
  };

  const submitForm = async (n: string, e: string, m: string) => {
    setProgress(0);
    let currentProgress = 0;
    const progressInterval = setInterval(() => {
      currentProgress += Math.floor(Math.random() * 15) + 5;
      if (currentProgress > 95) currentProgress = 95;
      setProgress(currentProgress);
    }, 150);

    try {
      const response = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          service_id: "service_317o3rj",
          template_id: "template_5we62an",
          user_id: "ZjcavUupnqSz8vtcn",
          template_params: {
            name: n,
            from_name: n,
            email: e,
            reply_to: e,
            message: m,
          }
        }),
      });
      
      clearInterval(progressInterval);
      setProgress(100);
      
      setTimeout(() => {
        if (response.ok) {
          setStep('success');
        } else {
          setStep('error');
        }
      }, 500);
    } catch (error) {
      clearInterval(progressInterval);
      setProgress(100);
      setTimeout(() => {
        setStep('error');
      }, 500);
    }
  };

  const renderTerminalContent = () => {
    const getProgressBar = (prog: number) => {
      const totalBlocks = 20;
      const filledBlocks = Math.floor((prog / 100) * totalBlocks);
      const emptyBlocks = totalBlocks - filledBlocks;
      return `[${'█'.repeat(filledBlocks)}${' '.repeat(emptyBlocks)}]`;
    };

    return (
      <>
        <div style={{ color: 'var(--dim)', marginBottom: 16, fontStyle: 'italic', borderBottom: '1px dashed rgba(255,255,255,0.2)', paddingBottom: 12 }}>
          # Interactive Terminal
          <br />
          Want to contact me? Fill up the form below and I will get back to you.
          <br />
          Click anywhere here to start typing. Hit Enter to submit.
        </div>
        <div><span style={{ color: 'var(--green)' }}>vishal@dev:~$</span> <span style={{ color: '#fff' }}>./contact.sh</span></div>
        <div style={{ color: 'var(--green)', marginTop: 6, marginBottom: 12 }}>Initiating secure connection... OK.</div>

        {step !== 'name' && (
          <div style={{ marginTop: 6 }}>
            <span style={{ color: 'var(--cyan)' }}>?</span> Enter your name: <span style={{ color: '#fff' }}>{name}</span>
          </div>
        )}

        {(step === 'message' || step === 'sending' || step === 'success' || step === 'error') && (
          <div style={{ marginTop: 6 }}>
            <span style={{ color: 'var(--cyan)' }}>?</span> Enter your email: <span style={{ color: '#fff' }}>{email}</span>
          </div>
        )}

        {(step === 'sending' || step === 'success' || step === 'error') && (
          <div style={{ marginTop: 6 }}>
            <span style={{ color: 'var(--cyan)' }}>?</span> Enter your message: <span style={{ color: '#fff' }}>{message}</span>
          </div>
        )}

        {(step === 'name' || step === 'email' || step === 'message') && (
          <>
            <div style={{ marginTop: 6, display: 'flex', flexWrap: 'wrap' }}>
              <span style={{ color: 'var(--cyan)', marginRight: 8 }}>?</span>
              {step === 'name' && <span style={{ marginRight: 8 }}>Enter your name:</span>}
              {step === 'email' && <span style={{ marginRight: 8 }}>Enter your email:</span>}
              {step === 'message' && <span style={{ marginRight: 8 }}>Enter your message:</span>}
              <span style={{ color: '#fff', whiteSpace: 'pre-wrap' }}>{inputValue}</span>
              {isFocused && <span style={{ animation: 'blink 1s step-end infinite', color: 'var(--green)', marginLeft: 2 }}>█</span>}
            </div>
            {terminalError && (
              <div style={{ marginTop: 6, color: '#ff5f57' }}>
                {terminalError}
              </div>
            )}
          </>
        )}

        {step === 'sending' && (
          <div style={{ marginTop: 12, color: 'var(--dim)' }}>
            Encrypting payload... [OK]<br />
            Transmitting to Vishal's device...<br />
            <div style={{ marginTop: 8, color: 'var(--cyan)', whiteSpace: 'pre' }}>
              {getProgressBar(progress)} {progress}%
            </div>
          </div>
        )}

        {step === 'success' && (
          <div style={{ marginTop: 12, color: 'var(--green)' }}>
            Success! Transmission received. I'll get back to you soon.
          </div>
        )}

        {step === 'error' && (
          <div style={{ marginTop: 12, color: '#ff5f57' }}>
            Error: Connection failed. Please check your network or use the email link above.
          </div>
        )}

        {(step === 'success' || step === 'error') && (
          <div style={{ marginTop: 24, paddingBottom: 16 }}>
            <button
              onClick={(e) => {
                e.stopPropagation();
                resetTerminal();
              }}
              className="clickable"
              style={{
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                color: 'var(--text)',
                padding: '8px 16px',
                borderRadius: '6px',
                fontFamily: 'var(--mono)',
                fontSize: '0.85rem',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
              onMouseOver={(e) => {
                (e.target as HTMLButtonElement).style.background = 'rgba(255, 255, 255, 0.1)';
                (e.target as HTMLButtonElement).style.borderColor = 'rgba(255, 255, 255, 0.4)';
              }}
              onMouseOut={(e) => {
                (e.target as HTMLButtonElement).style.background = 'rgba(255, 255, 255, 0.05)';
                (e.target as HTMLButtonElement).style.borderColor = 'rgba(255, 255, 255, 0.2)';
              }}
            >
              $ ./contact.sh --restart
            </button>
          </div>
        )}
      </>
    );
  };

  return (
    <>
      <section id="contact" className="grid-bg">
        <div className="wrap">
          <div className="reveal">
            <div className="sec-num">05</div>
            <h2 className="sec-title">&lt;Get In Touch /&gt;</h2>
          </div>
          <p className="contact-intro reveal">
            Let's build something <span className="hl">extraordinary</span> together. I'm always open to discussing new projects, creative ideas, or opportunities.
          </p>
          <div className="contact-grid reveal">
            <a className="contact-card glass-panel" href="mailto:vishalravi163@gmail.com">
              <div className="cc-left"><span className="cc-type">✉ Email</span><span className="cc-val">vishalravi163@gmail.com</span></div>
              <span className="cc-arrow">↗</span>
            </a>
            <a className="contact-card glass-panel" href="tel:+918147741585">
              <div className="cc-left"><span className="cc-type">📱 Phone</span><span className="cc-val">+91 8147741585</span></div>
              <span className="cc-arrow">↗</span>
            </a>
            <a className="contact-card glass-panel" href="https://www.linkedin.com/in/vishal-ravi-653a8a33b/" target="_blank">
              <div className="cc-left"><span className="cc-type">💼 LinkedIn</span><span className="cc-val">linkedin/vishal-r</span></div>
              <span className="cc-arrow">↗</span>
            </a>
            <a className="contact-card glass-panel" href="https://github.com/vishal-163" target="_blank">
              <div className="cc-left"><span className="cc-type">🐙 GitHub</span><span className="cc-val">github/vishal-163</span></div>
              <span className="cc-arrow">↗</span>
            </a>
          </div>

          <div className="term reveal" style={{ position: 'relative' }}>
            <div className="term-bar" style={{ display: 'flex', justifyContent: 'space-between', paddingRight: '16px' }}>
              <div style={{ display: 'flex', gap: '7px', alignItems: 'center' }}>
                <div className="tdot clickable" onClick={resetTerminal} title="Reset Terminal" style={{ background: '#ff5f57', cursor: 'pointer' }} />
                <div className="tdot" style={{ background: '#febc2e' }} />
                <div className="tdot" style={{ background: '#28c840' }} />
              </div>
              {step !== 'name' && step !== 'sending' && step !== 'success' && step !== 'error' && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    resetTerminal();
                  }}
                  className="clickable"
                  style={{
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(255, 255, 255, 0.15)',
                    color: 'var(--text)',
                    fontFamily: 'var(--mono)',
                    fontSize: '0.75rem',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    padding: '4px 10px',
                    borderRadius: '4px',
                    backdropFilter: 'blur(4px)',
                    WebkitBackdropFilter: 'blur(4px)'
                  }}
                  onMouseOver={(e) => {
                    (e.target as HTMLButtonElement).style.background = 'rgba(255, 255, 255, 0.1)';
                    (e.target as HTMLButtonElement).style.borderColor = 'rgba(255, 255, 255, 0.3)';
                  }}
                  onMouseOut={(e) => {
                    (e.target as HTMLButtonElement).style.background = 'rgba(255, 255, 255, 0.05)';
                    (e.target as HTMLButtonElement).style.borderColor = 'rgba(255, 255, 255, 0.15)';
                  }}
                >
                  Restart
                </button>
              )}
            </div>
            <div
              className="term-body"
              ref={terminalBodyRef}
              onClick={handleTerminalClick}
              style={{ cursor: 'text', minHeight: '300px', maxHeight: '420px', overflowY: 'auto' }}
            >
              {renderTerminalContent()}

              <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={(e) => {
                  setInputValue(e.target.value);
                  if (terminalError) setTerminalError('');
                }}
                onKeyDown={handleKeyDown}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                style={{ opacity: 0, position: 'absolute', left: -9999 }}
                disabled={step === 'sending' || step === 'success' || step === 'error'}
                autoComplete="off"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
