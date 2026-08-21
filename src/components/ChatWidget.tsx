import { useState, useRef, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';

interface Message {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  isTyping?: boolean;
}

// Sub-component to handle the word-by-word typing effect
function TypingMessage({ content, onComplete }: { content: string, onComplete: () => void }) {
  const [displayedText, setDisplayedText] = useState('');

  useEffect(() => {
    const words = content.split(' ');
    let currentIndex = 0;

    const typeWord = () => {
      if (currentIndex < words.length) {
        setDisplayedText(words.slice(0, currentIndex + 1).join(' '));

        let delay = 30 + Math.random() * 40;
        if (words[currentIndex].match(/[.,!?]/)) delay += 150;
        if (words.length < 10) delay *= 0.7;

        currentIndex++;
        setTimeout(typeWord, delay);
      } else {
        onComplete();
      }
    };

    const timeout = setTimeout(typeWord, 50);
    return () => clearTimeout(timeout);
  }, [content, onComplete]);

  return (
    <div className="markdown-container">
      <ReactMarkdown>{displayedText}</ReactMarkdown>
      <span className="typing-cursor" />
    </div>
  );
}

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', role: 'assistant', content: "Hi! I'm Vishal's AI Assistant. Ask me anything about his skills, projects, or experience!" }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  const isAiBusy = isLoading || messages.some(m => m.isTyping);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isOpen]);

  useEffect(() => {
    if (!isAiBusy && isOpen) {
      inputRef.current?.focus();
    }
  }, [isAiBusy, isOpen]);

  useEffect(() => {
    const handleEsc = (e: globalThis.KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, []);

  const getCurrentSection = (): string => {
    const sections = ['home', 'about', 'skills', 'projects', 'education', 'contact'];
    let current = 'home';
    let minDistance = Infinity;
    
    sections.forEach(id => {
      const el = document.getElementById(id);
      if (el) {
        const rect = el.getBoundingClientRect();
        const distance = Math.abs(rect.top - window.innerHeight / 3);
        if (distance < minDistance) {
          minDistance = distance;
          current = id;
        }
      }
    });
    return current;
  };

  const handleOpenChat = () => {
    setIsOpen(true);
    if (messages.length === 1 && messages[0].id === '1') {
      const section = getCurrentSection();
      const displaySection = section.charAt(0).toUpperCase() + section.slice(1);
      setMessages([
        {
          id: '1',
          role: 'assistant',
          content: `Hi! I'm Vishal's AI Assistant. I can see you're on the ${displaySection} section — feel free to ask me anything about Vishal's work, skills, or projects!`,
          isTyping: true
        }
      ]);
    }
  };

  const handleStop = () => {
    abortControllerRef.current?.abort();
    abortControllerRef.current = null;
    setIsGenerating(false);
    setIsLoading(false);
  };

  const handleSend = async () => {
    if (!input.trim() || isAiBusy) return;

    setErrorMsg('');
    const text = input.trim();
    setInput('');

    const userMessage: Message = { id: crypto.randomUUID(), role: 'user', content: text };
    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);
    setIsGenerating(true);

    // Create a new AbortController for this request
    const controller = new AbortController();
    abortControllerRef.current = controller;

    try {
      const history = messages.filter(m => m.role !== 'system').concat(userMessage);
      const apiMessages = history.map((m) => ({
        role: m.role,
        content: m.content
      }));

      const currentSection = getCurrentSection();

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: apiMessages, currentSection }),
        signal: controller.signal
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        const msg = res.status === 429
          ? (data.error || "I'm a bit overwhelmed right now. Try again in a moment.")
          : (data.error || `Error ${res.status}: something went wrong.`);
        throw new Error(msg);
      }
      const botText = data.message || "I couldn't understand that.";

      const botMessage: Message = {
        id: crypto.randomUUID(),
        role: 'assistant',
        content: botText,
        isTyping: true
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (err: any) {
      // Aborted by user — silently stop, no error message
      if (err.name === 'AbortError') {
        return;
      }
      console.error(err);
      setErrorMsg(err.message || 'Failed to get response.');
      setMessages(prev => [...prev, { id: crypto.randomUUID(), role: 'system', content: `⚠️ ${err.message}` }]);
    } finally {
      setIsLoading(false);
      setIsGenerating(false);
      abortControllerRef.current = null;
    }
  };

  const handleTypingComplete = (msgId: string) => {
    setMessages(prev => prev.map(m => m.id === msgId ? { ...m, isTyping: false } : m));
  };

  return (
    <div id="ai-chat-container">
      {isOpen && (
        <div id="ai-chat-widget" role="dialog" aria-modal="true" onDragOver={e => e.preventDefault()} onDrop={e => e.preventDefault()}>
          <div className="chat-header">
            <div className="header-info">
              <h3>Vishal's AI Assistant</h3>
              <div id="ai-status-dot" className={`status-indicator ${isLoading ? 'busy' : ''}`} />
            </div>
            <button id="ai-chat-close" onClick={() => setIsOpen(false)}>
              <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
            </button>
          </div>

          <div className="messages-container" id="ai-messages">
            {messages.map(m => (
              <div key={m.id} className="message-wrapper">
                <div className={`message ${m.role}`}>
                  {m.isTyping ? (
                    <TypingMessage content={m.content} onComplete={() => handleTypingComplete(m.id)} />
                  ) : (
                    <div className="markdown-container">
                      <ReactMarkdown>{m.content}</ReactMarkdown>
                    </div>
                  )}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="thinking-indicator">
                <span>Thinking</span>
                <div className="thinking-dots"><span /><span /><span /></div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="input-area">
            {errorMsg && (
              <div className="error-message" style={{ display: 'flex' }}>
                <span>{errorMsg}</span>
                <button onClick={() => setErrorMsg('')}>✕</button>
              </div>
            )}
            <div className="input-form">
              <input
                ref={inputRef}
                type="text"
                className="chat-input"
                placeholder={isAiBusy ? "AI is replying..." : "Ask me anything..."}
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && !e.shiftKey && handleSend()}
                disabled={isAiBusy}
                style={{ paddingLeft: '16px' }}
              />
              {isGenerating ? (
                <button className="send-button" onClick={handleStop} title="Stop generation">
                  {/* Stop icon — filled square */}
                  <svg xmlns="http://www.w3.org/2000/svg" width={18} height={18} viewBox="0 0 24 24" fill="#ffffff" stroke="none">
                    <rect x={4} y={4} width={16} height={16} rx={2} />
                  </svg>
                </button>
              ) : (
                <button className="send-button" onClick={handleSend} disabled={isAiBusy || !input.trim()}>
                  {isLoading ? (
                    <svg className="spinner" xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M21 12a9 9 0 1 1-6.219-8.56" /></svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="m22 2-7 20-4-9-9-4Z" /><path d="M22 2 11 13" /></svg>
                  )}
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {!isOpen && (
        <button id="ai-avatar-btn" className="avatar-button pulsing" onClick={handleOpenChat}>
          <svg xmlns="http://www.w3.org/2000/svg" width={28} height={28} viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M12 8V4H8" /><rect width={16} height={12} x={4} y={8} rx={2} /><path d="M2 14h2" /><path d="M20 14h2" /><path d="M15 13v2" /><path d="M9 13v2" /></svg>
        </button>
      )}
    </div>
  );
}
