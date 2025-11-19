"use client";

import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from 'ai';
import { Send } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export default function Home() {
  const { messages, sendMessage, status } =
    useChat({
      transport: new DefaultChatTransport({
        api: '/api/chat',
      }),
    });

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [input, setInput] = useState("");

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    
    await sendMessage({ text: input });
    setInput("");
  };

  return (
    <div className="flex min-h-screen flex-col bg-zinc-50 dark:bg-black">
      {/* Header */}
      <header className="border-b border-zinc-200 bg-white dark:border-zinc-800 dark:bg-black">
        <div className="mx-auto max-w-4xl px-4 py-4 sm:px-6">
          <h1 className="text-2xl font-semibold text-black dark:text-zinc-50">
            AI Chatbot
          </h1>
        </div>
      </header>

      {/* Messages Container */}
      <main className="flex-1 overflow-y-auto bg-white dark:bg-black">
        <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6">
          {messages.length === 0 ? (
            <div className="flex h-full items-center justify-center">
              <div className="text-center">
                <p className="text-lg text-zinc-600 dark:text-zinc-400">
                  Start a conversation by typing a message below.
                </p>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${
                    message.role === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-xs rounded-lg px-4 py-2 sm:max-w-md lg:max-w-2xl ${
                      message.role === "user"
                        ? "bg-blue-500 text-white"
                        : "bg-zinc-200 text-black dark:bg-zinc-800 dark:text-zinc-50"
                    }`}
                  >
                    <p className="whitespace-pre-wrap text-sm sm:text-base">
                    {message.parts.map((part, index) =>
                      part.type === 'text' ? <span key={index}>{part.text}</span> : null,
                    )}
                    </p>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>
      </main>

      {/* Input Area */}
      <footer className="border-t border-zinc-200 bg-white dark:border-zinc-800 dark:bg-black">
        <div className="mx-auto max-w-4xl px-4 py-4 sm:px-6">
          <form onSubmit={handleSubmit} className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 rounded-lg border border-zinc-300 bg-white px-4 py-2 text-black placeholder-zinc-500 outline-none transition-colors hover:border-zinc-400 focus:border-blue-500 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-50 dark:placeholder-zinc-400 dark:focus:border-blue-400 disabled:opacity-50"
            />
            <button
              type="submit"
              disabled={!input.trim()}
              className="flex items-center gap-2 rounded-lg bg-blue-500 px-4 py-2 text-white transition-colors hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-black disabled:cursor-not-allowed disabled:opacity-50"
            >
              <Send size={20} />
              <span className="hidden sm:inline">Send</span>
            </button>
          </form>
        </div>
      </footer>
    </div>
  );
}
