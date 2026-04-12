import React, { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Loader } from "lucide-react";
import styles from "./AIAvatar.module.css";

interface Message {
  id: number;
  type: "user" | "assistant";
  text: string;
}

export default function AIAvatar() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: Date.now(),
      type: "assistant",
      text: "Hi! I'm Vishal's AI Assistant. Ask me anything about his skills, projects, or experience!",
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatWidgetRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll to latest message
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  // Close on Escape key
  useEffect(() => {
    const handleEscapeKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", handleEscapeKey);
    return () => window.removeEventListener("keydown", handleEscapeKey);
  }, [isOpen]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // Send on Enter, close on Escape
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
    if (e.key === "Escape") {
      setIsOpen(false);
    }
  };

  const sendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userText = inputValue.trim();
    const newMessage: Message = {
      id: Date.now(),
      type: "user",
      text: userText,
    };

    const newMessages = [...messages, newMessage];
    setMessages(newMessages);
    setInputValue("");
    setIsLoading(true);
    setError(null);

    try {
      // Format history for the API call (limit to last 15 messages for token management)
      const apiMessages = newMessages.slice(-15).map((m) => ({
        role: m.type,
        content: m.text,
      }));

      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ messages: apiMessages }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to get response");
      }

      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          type: "assistant",
          text: data.message,
        },
      ]);
    } catch (error) {
      console.error("Error:", error);
      const errorMsg =
        error instanceof Error ? error.message : "Failed to get response. Please try again.";
      setError(errorMsg);
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          type: "assistant",
          text: `⚠️ ${errorMsg}`,
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      {isOpen && (
        <div
          id="ai-chat-widget"
          className={styles.chatWidget}
          role="dialog"
          aria-labelledby="chat-header-title"
          aria-modal="true"
          ref={chatWidgetRef}
        >
          <div className={styles.chatHeader}>
            <h3 id="chat-header-title">Vishal's AI Assistant</h3>
            <button
              className={styles.closeButton}
              onClick={() => setIsOpen(false)}
              aria-label="Close chat"
            >
              <X size={20} color="#00ff88" />
            </button>
          </div>

          <div className={styles.messagesContainer}>
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`${styles.message} ${styles[msg.type]}`}
              >
                {msg.text}
              </div>
            ))}
            
            {isLoading && (
              <div className={styles.typingIndicator} aria-label="AI is typing...">
                <span />
                <span />
                <span />
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className={styles.inputArea}>
            {error && (
              <div className={styles.errorMessage} role="alert">
                {error}
                <button onClick={() => setError(null)} aria-label="Clear error">✕</button>
              </div>
            )}
            <div className={styles.inputForm}>
              <input
                ref={inputRef}
                type="text"
                className={styles.input}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask about my skills, projects..."
                disabled={isLoading}
                aria-label="Message input"
              />
              <button
                className={styles.sendButton}
                onClick={sendMessage}
                disabled={!inputValue.trim() || isLoading}
                aria-label="Send message"
              >
                {isLoading ? (
                  <Loader size={16} color="#00ff88" className={styles.spinnerAnimation} />
                ) : (
                  <Send size={18} color="#00ff88" />
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {!isOpen && (
        <button
          className={`${styles.avatarButton} ${styles.pulsing}`}
          onClick={() => setIsOpen(true)}
          aria-label="Open AI assistant chat"
          aria-expanded={isOpen}
          aria-controls="ai-chat-widget"
          title="Click to open Vishal's AI assistant"
        >
          <MessageCircle size={28} color="#00ff88" />
        </button>
      )}
    </div>
  );
}
