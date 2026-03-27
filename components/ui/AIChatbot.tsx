"use client";

import { useState, useRef, useEffect } from "react";
import { MessageSquare, X, Send, Loader2 } from "lucide-react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export function AIChatbot() {
  const [open,     setOpen]     = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: "Hello. I am the Thorfinn University assistant. How can I help you today?" },
  ]);
  const [input,   setInput]   = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open) bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, open]);

  const send = async () => {
    if (!input.trim() || loading) return;
    const text = input.trim();
    setInput("");
    setMessages(prev => [...prev, { role: "user", content: text }]);
    setLoading(true);
    try {
      const res  = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text, history: messages }),
      });

      if (!res.ok) throw new Error(`HTTP ${res.status}`);

      const data = await res.json();
      setMessages(prev => [...prev, {
        role: "assistant",
        content: data.reply || "I could not process that request.",
      }]);
    } catch {
      setMessages(prev => [...prev, {
        role: "assistant",
        content: "Connection error. Please check your network and try again.",
      }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Trigger */}
      <button
        onClick={() => setOpen(o => !o)}
        className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-[#1e3a8a] hover:bg-[#1e40af] text-white text-sm font-medium px-4 py-2.5 rounded shadow-lg transition-colors duration-150"
        aria-label="Open university assistant"
      >
        <MessageSquare className="w-4 h-4" />
        <span className="hidden sm:inline">Ask a Question</span>
      </button>

      {/* Chat window */}
      {open && (
        <div
          className="fixed bottom-20 right-6 z-50 w-80 sm:w-96 bg-white border border-slate-200 rounded-lg shadow-xl flex flex-col overflow-hidden"
          style={{ height: 460 }}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 bg-[#1e3a8a] flex-shrink-0">
            <div>
              <p className="text-sm font-semibold text-white">Thorfinn University Assistant</p>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="text-blue-200 hover:text-white transition-colors"
              aria-label="Close"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3 bg-slate-50">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[82%] px-3 py-2 rounded text-sm leading-relaxed ${
                  m.role === "user"
                    ? "bg-[#1e3a8a] text-white"
                    : "bg-white border border-slate-200 text-slate-700"
                }`}>
                  {m.content}
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex justify-start">
                <div className="bg-white border border-slate-200 rounded px-3 py-2.5 flex items-center gap-2">
                  <Loader2 className="w-3.5 h-3.5 text-slate-400 animate-spin" />
                  <span className="text-xs text-slate-400">Thinking...</span>
                </div>
              </div>
            )}

            <div ref={bottomRef} />
          </div>

          {/* Suggested questions — only shown when no user messages yet */}
          {messages.length === 1 && (
            <div className="px-4 py-2 bg-white border-t border-slate-100 flex flex-wrap gap-1.5">
              {["Admission process", "Placement stats", "Available programs", "Contact info"].map(q => (
                <button
                  key={q}
                  onClick={() => { setInput(q); }}
                  className="text-xs px-2.5 py-1 border border-slate-200 rounded-full text-slate-600 hover:border-[#1e3a8a] hover:text-[#1e3a8a] transition-colors"
                >
                  {q}
                </button>
              ))}
            </div>
          )}

          {/* Input */}
          <div className="px-3 py-3 border-t border-slate-200 bg-white flex gap-2 flex-shrink-0">
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === "Enter" && !e.shiftKey && send()}
              placeholder="Type your question..."
              className="flex-1 border border-slate-300 rounded px-3 py-2 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#1e3a8a]/30 focus:border-[#1e3a8a] transition-colors bg-white"
              disabled={loading}
            />
            <button
              onClick={send}
              disabled={!input.trim() || loading}
              className="bg-[#1e3a8a] hover:bg-[#1e40af] disabled:opacity-40 text-white px-3 py-2 rounded transition-colors flex-shrink-0"
              aria-label="Send"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
