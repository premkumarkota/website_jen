"use client";
import { useState, useRef, useEffect } from "react";

type Message = { role: "user" | "assistant"; content: string };

const GREETING: Message = {
  role: "assistant",
  content: "👋 Hi! Welcome to JenVeda. I'm here to help you with any questions about our ERP products — HRMS, Payroll, Accounting, Inventory, or PMS. What can I help you with today?",
};

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([GREETING]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [showBadge, setShowBadge] = useState(true);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  useEffect(() => {
    if (open) {
      setShowBadge(false);
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [open]);

  const send = async () => {
    const text = input.trim();
    if (!text || loading) return;

    const userMsg: Message = { role: "user", content: text };
    const history = [...messages, userMsg];
    setMessages(history);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: history.map((m) => ({ role: m.role, content: m.content })),
        }),
      });

      const reader = res.body!.getReader();
      const decoder = new TextDecoder();
      let reply = "";

      setMessages((prev) => [...prev, { role: "assistant", content: "" }]);

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        reply += decoder.decode(value, { stream: true });
        setMessages((prev) => {
          const updated = [...prev];
          updated[updated.length - 1] = { role: "assistant", content: reply };
          return updated;
        });
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Sorry, something went wrong. Please email us at contact@jenveda.com" },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Chat Window */}
      <div
        className="fixed bottom-24 right-6 z-50 flex flex-col transition-all duration-300 origin-bottom-right"
        style={{
          width: 360,
          height: 580,
          opacity: open ? 1 : 0,
          transform: open ? "scale(1)" : "scale(0.85)",
          pointerEvents: open ? "auto" : "none",
          borderRadius: 20,
          boxShadow: "0 24px 60px rgba(109,40,217,0.18), 0 4px 16px rgba(0,0,0,0.12)",
          background: "#fff",
          border: "1px solid rgba(109,40,217,0.12)",
          overflow: "hidden",
        }}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between px-5 py-4"
          style={{ background: "linear-gradient(135deg, #6D28D9 0%, #9333ea 100%)" }}
        >
          <div className="flex items-center gap-3">
            <div
              className="flex items-center justify-center rounded-full text-white font-bold text-[15px]"
              style={{ width: 38, height: 38, background: "rgba(255,255,255,0.2)" }}
            >
              J
            </div>
            <div>
              <p className="text-white font-bold text-[15px] leading-tight">JenVeda Assistant</p>
              <p className="text-[12px] flex items-center gap-1.5" style={{ color: "rgba(255,255,255,0.8)" }}>
                <span className="w-2 h-2 rounded-full bg-green-400 inline-block" />
                Typically replies instantly
              </p>
            </div>
          </div>
          <button
            onClick={() => setOpen(false)}
            className="flex items-center justify-center rounded-full transition-colors"
            style={{ width: 30, height: 30, background: "rgba(255,255,255,0.15)", color: "#fff" }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Messages */}
        <div
          className="flex-1 overflow-y-auto px-4 py-4 space-y-3"
          style={{ flex: 1, overflowY: "auto", background: "#fafafa", overscrollBehavior: "contain" }}
          onWheel={(e) => e.stopPropagation()}
          onTouchMove={(e) => e.stopPropagation()}
        >
          {messages.map((msg, i) => {
            const hasButton = msg.role === "assistant" && msg.content.includes("[CONTACT_BUTTON]");
            const displayText = msg.content.replace("[CONTACT_BUTTON]", "").trim();
            return (
              <div key={i} className={`flex flex-col ${msg.role === "user" ? "items-end" : "items-start"}`}>
                <div className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"} w-full`}>
                  {msg.role === "assistant" && (
                    <div
                      className="flex items-center justify-center rounded-full text-white font-bold text-[11px] mr-2 flex-shrink-0 self-end"
                      style={{ width: 26, height: 26, background: "linear-gradient(135deg, #6D28D9, #9333ea)" }}
                    >
                      J
                    </div>
                  )}
                  <div
                    className="px-4 py-2.5 text-[13.5px] leading-relaxed max-w-[75%]"
                    style={{
                      borderRadius: msg.role === "user" ? "18px 18px 4px 18px" : "18px 18px 18px 4px",
                      background: msg.role === "user" ? "linear-gradient(135deg, #6D28D9, #9333ea)" : "#fff",
                      color: msg.role === "user" ? "#fff" : "#1f2937",
                      boxShadow: "0 1px 4px rgba(0,0,0,0.08)",
                      whiteSpace: "pre-wrap",
                    }}
                  >
                    {displayText || (
                      <span className="flex gap-1 items-center h-4">
                        <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-bounce" style={{ animationDelay: "0ms" }} />
                        <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-bounce" style={{ animationDelay: "150ms" }} />
                        <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-bounce" style={{ animationDelay: "300ms" }} />
                      </span>
                    )}
                  </div>
                </div>
                {hasButton && (
                  <a
                    href="/contact"
                    className="ml-9 mt-2 inline-flex items-center gap-2 px-4 py-2 rounded-xl text-[13px] font-semibold text-white transition-opacity hover:opacity-90"
                    style={{ background: "linear-gradient(135deg, #6D28D9, #D1008F)" }}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                    Contact Us
                  </a>
                )}
              </div>
            );
          })}
          <div ref={bottomRef} />
        </div>

        {/* Input */}
        <div className="px-4 py-3 bg-white" style={{ borderTop: "1px solid rgba(109,40,217,0.08)" }}>
          <div
            className="flex items-center gap-2 px-4 py-2.5 rounded-2xl"
            style={{ background: "#f5f3ff", border: "1.5px solid rgba(109,40,217,0.15)" }}
          >
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && send()}
              placeholder="Type your message..."
              disabled={loading}
              className="flex-1 bg-transparent text-[13.5px] text-slate-800 outline-none placeholder:text-slate-400"
            />
            <button
              onClick={send}
              disabled={!input.trim() || loading}
              className="flex items-center justify-center rounded-full transition-all disabled:opacity-40"
              style={{
                width: 32, height: 32,
                background: "linear-gradient(135deg, #6D28D9, #9333ea)",
                flexShrink: 0,
              }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
              </svg>
            </button>
          </div>
          <div className="flex items-center justify-center gap-1.5 mt-2">
            <span className="text-[11px]" style={{ color: "#aaa" }}>Powered by</span>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/jenveda%20logo%201.png" alt="JenVeda" style={{ width: 45, height: 45, objectFit: "contain" }} />
            <span
              className="text-[11px] font-bold"
              style={{ background: "linear-gradient(135deg, #6D28D9, #D1008F)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}
            >
              AI
            </span>
          </div>
        </div>
      </div>

      {/* Floating Button */}
      <button
        onClick={() => setOpen((o) => !o)}
        className="fixed bottom-6 right-6 z-50 flex items-center justify-center rounded-full shadow-lg transition-all duration-300 hover:scale-110"
        style={{
          width: 56, height: 56,
          background: "linear-gradient(135deg, #6D28D9 0%, #9333ea 100%)",
          boxShadow: "0 8px 24px rgba(109,40,217,0.4)",
        }}
      >
        {open ? (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        )}
        {showBadge && !open && (
          <span
            className="absolute -top-1 -right-1 flex items-center justify-center rounded-full text-white font-bold text-[10px]"
            style={{ width: 20, height: 20, background: "#ef4444" }}
          >
            1
          </span>
        )}
      </button>
    </>
  );
}
