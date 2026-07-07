import React, { useEffect } from 'react';

export function ChatWidget() {
  useEffect(() => {
    if (typeof (window as any).__REINIT_CHAT_DOM === 'function') {
      (window as any).__REINIT_CHAT_DOM();
    }
  });
  return (
    <>
      <div id="ai-chat-container">
        {/* The Chat Widget */}
        <div id="ai-chat-widget" role="dialog" aria-labelledby="chat-header-title" aria-modal="true" style={{display: 'none'}} onDragOver={(e) => e.preventDefault()} onDrop={(e) => (window as any).handleFileDrop(e)}>
          <div className="chat-header">
            <div className="header-info">
              <h3 id="chat-header-title">Vishal's AI Assistant</h3>
              <div id="ai-status-dot" className="status-indicator" />
            </div>
            <button id="ai-chat-close" aria-label="Close chat" onClick={() => (window as any).toggleChat()}>
              <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="#00ff88" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 6 6 18" />
                <path d="m6 6 12 12" />
              </svg>
            </button>
          </div>
          <div className="messages-container" id="ai-messages">
            <div className="message assistant">Hi! I'm Vishal's AI Assistant. Ask me anything about his skills, projects, or
              experience!</div>
          </div>
          <div className="input-area">
            <div id="ai-error-msg" className="error-message" style={{display: 'none'}} role="alert">
              <span id="ai-error-text" />
              <button id="ai-error-close" aria-label="Clear error" onClick={() => { const el = document.getElementById('ai-error-msg'); if(el) el.style.display = 'none'; }}>✕</button>
            </div>
            <div id="ai-file-previews" className="file-previews" style={{display: 'none'}} />
            <div className="input-form">
              <input type="file" id="ai-file-input" multiple style={{display: 'none'}} onChange={(e) => (window as any).handleFileSelect(e)} />
              <input type="text" id="ai-input" className="chat-input" placeholder="Ask me anything..." aria-label="Message input" onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); (window as any).sendMessage(); } }} />
              <button id="ai-send-btn" className="send-button" aria-label="Send message" onClick={() => (window as any).sendMessage()}>
                <svg id="ai-send-icon" xmlns="http://www.w3.org/2000/svg" width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="#00ff88" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                  <path d="m22 2-7 20-4-9-9-4Z" />
                  <path d="M22 2 11 13" />
                </svg>
                <svg id="ai-loader-icon" className="spinner" style={{display: 'none'}} xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="#00ff88" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                </svg>
              </button>
            </div>
          </div>
        </div>
        {/* Avatar Button */}
        <button id="ai-avatar-btn" className="avatar-button pulsing" aria-label="Open AI assistant chat" aria-expanded="false" aria-controls="ai-chat-widget" title="Click to open Vishal's AI assistant" onClick={() => (window as any).toggleChat()}>
          <svg xmlns="http://www.w3.org/2000/svg" width={28} height={28} viewBox="0 0 24 24" fill="none" stroke="#00ff88" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 8V4H8" />
            <rect width={16} height={12} x={4} y={8} rx={2} />
            <path d="M2 14h2" />
            <path d="M20 14h2" />
            <path d="M15 13v2" />
            <path d="M9 13v2" />
          </svg>
        </button>
      </div>
    </>
  );
}
