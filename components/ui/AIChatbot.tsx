"use client";

import { useState, useRef, useEffect } from "react";
import { MessageSquare, X, Send, Loader2 } from "lucide-react";

interface Message { role: "user" | "assistant"; content: string; }

export function AIChatbot() {
  const [open,     setOpen]     = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: "Hello. I am the Thorfinn University assistant. How can I help you today?" },
  ]);
  const [input,   setInput]   = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const send = async () => {
    if (!input.trim() || loading) return;
    const text = input.trim();
    setInput("");
    setMessages(p => [...p, { role: "user", content: text }]);
    setLoading(true);
    try {
      const res  = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text, history: messages }),
      });
      const data = await res.json();
      setMessages(p => [...p, { role: "assistant", content: data.reply || "I could not process that request." }]);
    } catch {
      setMessages(p => [...p, { role: "assistant", content: "Connection error. Please try again." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Trigger button */}
      <button
        onClick={() => setOpen(o => !o)}
        className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-[#1e3a8a] hover:bg-[#1e40af] text-white text-sm font-medium px-4 py-2.5 rounded shadow-lg transition-colors"
        aria-label="Open assistant"
      >
        <MessageSquare className="w-4 h-4" />
        <span className="hidden sm:inline">Ask a Question</span>
      </button>

      {/* Chat window */}
      {open && (
        <div className="fixed bottom-20 right-6 z-50 w-80 sm:w-96 bg-white border border-slate-200 rounded-lg shadow-xl flex flex-col overflow-hidden"
          style={{ height: 460 }}>
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 bg-[#1e3a8a]">
            <div>
              <p className="text-sm font-semibold text-white">Thorfinn Assistant</p>
              <p className="text-xs text-blue-200">Powered by Groq / Llama 3</p>
            </div>
            <button onClick={() => setOpen(false)} className="text-blue-200 hover:text-white transition-colors">
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3 bg-slate-50">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[80%] px-3 py-2 rounded text-sm leading-relaxed ${
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
                <div className="bg-white border border-slate-200 rounded px-3 py-2">
                  <Loader2 className="w-4 h-4 text-slate-400 animate-spin" />
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div className="px-3 py-3 border-t border-slate-200 bg-white flex gap-2">
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === "Enter" && send()}
              placeholder="Type your question..."
              className="input flex-1 text-sm py-2"
            />
            <button
              onClick={send}
              disabled={!input.trim() || loading}
              className="btn-primary px-3 py-2 disabled:opacity-50"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
