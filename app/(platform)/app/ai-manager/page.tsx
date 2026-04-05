"use client";

import { useState, useRef, useEffect } from "react";
import { Send, Plus, MessageSquare, Zap } from "lucide-react";
import { MOCK_AI_SESSIONS, MOCK_DASHBOARD } from "@/lib/mock-data";

// ─── Types ────────────────────────────────────────────────────────────────────

interface Message {
  id: string;
  role: "user" | "assistant";
  text: string;
}

// ─── Starter prompts ──────────────────────────────────────────────────────────

const STARTERS = [
  { icon: "🔍", text: "Найди блогеров для кампании по фитнесу" },
  { icon: "✍️", text: "Напиши оффер для @aigerim_fit" },
  { icon: "📊", text: "Проанализируй результаты кампании «Фитнес-марафон»" },
  { icon: "⚖️", text: "Сравни @aigerim_fit и @malika_workout" },
];

// ─── Stub AI response ─────────────────────────────────────────────────────────

function getStubReply(query: string): string {
  const q = query.toLowerCase();
  if (q.includes("блогер") || q.includes("найди")) {
    return "Основываясь на вашей нише и бюджете, рекомендую следующих блогеров:\n\n**1. Айгерим Сатпаева** (@aigerim_fit) — 248K подписчиков, ER 6.2%, Jeli Score 89. Отлично подходит для фитнес-брендов.\n\n**2. Малика Ержанова** (@malika_workout) — 134K подписчиков, ER 6.8%. Более доступная цена.\n\n**3. Самал Байжанова** (@samal_life) — 512K подписчиков, но ER немного ниже.\n\nЖелаете отправить оффер кому-то из них?";
  }
  if (q.includes("оффер")) {
    return "Вот предложение для инфлюенсера:\n\n---\nУважаемая Айгерим!\n\nКоманда **Jeli** приглашает вас к сотрудничеству. Мы хотим разместить рекламу нашего продукта в вашем TikTok-контенте.\n\n**Формат:** TikTok-видео (60 сек)\n**Бюджет:** 85 000 ₸\n**Срок выхода:** до 20 апреля 2025\n\nС уважением, команда Jeli\n\n---\n\nОтредактировать или отправить?";
  }
  if (q.includes("анализ") || q.includes("результат")) {
    return "По итогам кампании «Фитнес-марафон апрель»:\n\n- **Охват:** 1.1M просмотров (+24% от прогноза)\n- **ER:** 7.2% (выше среднего по нише на 1.8pp)\n- **CPM:** 218 ₸ — отличный показатель\n- **ROI:** ×4.1\n\n**Лучший блогер:** @samal_life (520K охвата, ER 8.1%)\n\n**Рекомендация:** Повторить формат с теми же блогерами в мае.";
  }
  if (q.includes("сравн")) {
    return "**Сравнение @aigerim_fit vs @malika_workout:**\n\n| Параметр | @aigerim_fit | @malika_workout |\n|---|---|---|\n| Подписчики | 248K | 134K |\n| ER% | 6.2% | 6.8% |\n| Цена видео | 85 000 ₸ | 55 000 ₸ |\n| Jeli Score | 89 | 84 |\n| CPM | 459 ₸ | 1 447 ₸ |\n\n**Вывод:** @aigerim_fit — выше охват и скоринг. @malika_workout — лучше ER и дешевле. Рекомендую @aigerim_fit для максимального охвата.";
  }
  return "Понял! Работаю над вашим запросом... Дайте уточняющий вопрос или выберите одну из быстрых команд ниже.";
}

// ─── Message Bubble ───────────────────────────────────────────────────────────

function MessageBubble({ msg }: { msg: Message }) {
  const isUser = msg.role === "user";
  return (
    <div className={`flex gap-3 ${isUser ? "justify-end" : "justify-start"}`}>
      {!isUser && (
        <div className="w-7 h-7 rounded-full bg-[#0064FF] flex items-center justify-center shrink-0 mt-0.5">
          <Zap className="w-3.5 h-3.5 text-white" />
        </div>
      )}
      <div
        className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed whitespace-pre-wrap ${
          isUser
            ? "bg-[#0064FF] text-white rounded-tr-sm"
            : "bg-[#1a1a1a] border border-white/[0.06] text-white/80 rounded-tl-sm"
        }`}
        dangerouslySetInnerHTML={{ __html: msg.text.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>").replace(/\n/g, "<br/>") }}
      />
      {isUser && (
        <div className="w-7 h-7 rounded-full bg-[#0064FF]/20 flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold text-[#0064FF]">
          Я
        </div>
      )}
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function AIManagerPage() {
  const [sessions, setSessions] = useState(MOCK_AI_SESSIONS);
  const [activeSession, setActiveSession] = useState(MOCK_AI_SESSIONS[0].id);
  const [messages, setMessages] = useState<Message[]>([
    { id: "init", role: "assistant", text: "Привет! Я ваш ИИ-менеджер Jeli. Помогу найти блогеров, написать оффер, проанализировать кампанию или сравнить инфлюенсеров. Что делаем?" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const { aiUsage } = MOCK_DASHBOARD;

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const send = (text: string) => {
    if (!text.trim() || loading) return;
    const userMsg: Message = { id: Date.now().toString(), role: "user", text };
    setMessages((m) => [...m, userMsg]);
    setInput("");
    setLoading(true);
    setTimeout(() => {
      const reply: Message = { id: Date.now().toString() + "r", role: "assistant", text: getStubReply(text) };
      setMessages((m) => [...m, reply]);
      setLoading(false);
    }, 900);
  };

  const newSession = () => {
    const id = `s${Date.now()}`;
    setSessions((s) => [{ id, title: "Новый диалог", date: "Сейчас", preview: "..." }, ...s]);
    setActiveSession(id);
    setMessages([{ id: "init", role: "assistant", text: "Новый диалог начат. Чем могу помочь?" }]);
  };

  return (
    <div className="flex h-[calc(100vh-88px)] gap-0 max-w-6xl mx-auto -m-6 overflow-hidden">
      {/* Sidebar */}
      <div className="w-64 shrink-0 bg-[#0d0d0d] border-r border-white/[0.06] flex flex-col">
        {/* New chat */}
        <div className="p-3 border-b border-white/[0.06]">
          <button
            onClick={newSession}
            className="w-full flex items-center gap-2 text-sm text-white/60 hover:text-white bg-white/[0.04] hover:bg-white/[0.07] border border-white/[0.06] rounded-lg px-3 py-2.5 transition-colors"
          >
            <Plus className="w-4 h-4" />
            Новый диалог
          </button>
        </div>

        {/* Sessions list */}
        <div className="flex-1 overflow-y-auto py-2">
          {sessions.map((s) => (
            <button
              key={s.id}
              onClick={() => setActiveSession(s.id)}
              className={`w-full text-left px-3 py-2.5 flex flex-col gap-0.5 transition-colors ${
                activeSession === s.id ? "bg-white/[0.06]" : "hover:bg-white/[0.03]"
              }`}
            >
              <p className="text-xs font-medium text-white truncate">{s.title}</p>
              <p className="text-[10px] text-white/30 truncate">{s.preview}</p>
              <p className="text-[10px] text-white/20">{s.date}</p>
            </button>
          ))}
        </div>

        {/* Usage */}
        <div className="p-3 border-t border-white/[0.06]">
          <div className="flex justify-between text-[10px] text-white/30 mb-1.5">
            <span>Диалогов</span>
            <span>{aiUsage.used}/{aiUsage.limit}</span>
          </div>
          <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
            <div className="h-full bg-[#0064FF] rounded-full" style={{ width: `${(aiUsage.used / aiUsage.limit) * 100}%` }} />
          </div>
        </div>
      </div>

      {/* Chat area */}
      <div className="flex-1 flex flex-col min-w-0 bg-[#0A0A0A]">
        {/* Chat header */}
        <div className="px-5 py-3.5 border-b border-white/[0.06] flex items-center gap-3 shrink-0">
          <div className="w-7 h-7 rounded-full bg-[#0064FF] flex items-center justify-center">
            <Zap className="w-3.5 h-3.5 text-white" />
          </div>
          <div>
            <p className="text-sm font-semibold text-white">ИИ-менеджер Jeli</p>
            <p className="text-[11px] text-[#22C55E]">● Онлайн</p>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-5 flex flex-col gap-4">
          {messages.map((m) => <MessageBubble key={m.id} msg={m} />)}
          {loading && (
            <div className="flex gap-3 justify-start">
              <div className="w-7 h-7 rounded-full bg-[#0064FF] flex items-center justify-center shrink-0">
                <Zap className="w-3.5 h-3.5 text-white" />
              </div>
              <div className="bg-[#1a1a1a] border border-white/[0.06] rounded-2xl rounded-tl-sm px-4 py-3">
                <div className="flex gap-1.5 items-center h-4">
                  {[0, 0.2, 0.4].map((d) => (
                    <span
                      key={d}
                      className="w-1.5 h-1.5 bg-white/30 rounded-full animate-bounce"
                      style={{ animationDelay: `${d}s` }}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        {/* Starter prompts (only if first message) */}
        {messages.length === 1 && (
          <div className="px-5 pb-3 grid grid-cols-2 gap-2">
            {STARTERS.map((s) => (
              <button
                key={s.text}
                onClick={() => send(s.text)}
                className="flex items-center gap-2 bg-white/[0.04] hover:bg-white/[0.07] border border-white/[0.06] rounded-xl px-3 py-2.5 text-xs text-white/60 hover:text-white transition-colors text-left"
              >
                <span>{s.icon}</span>
                <span>{s.text}</span>
              </button>
            ))}
          </div>
        )}

        {/* Input */}
        <div className="p-4 border-t border-white/[0.06] shrink-0">
          <div className="flex gap-2">
            <div className="flex-1 relative">
              <MessageSquare className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20 pointer-events-none" />
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && send(input)}
                placeholder="Напишите запрос..."
                className="w-full bg-[#111] border border-white/[0.06] rounded-xl pl-9 pr-4 py-3 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-white/20"
              />
            </div>
            <button
              onClick={() => send(input)}
              disabled={!input.trim() || loading}
              className="w-10 h-10 rounded-xl bg-[#0064FF] hover:bg-[#0052CC] flex items-center justify-center transition-colors disabled:opacity-30 disabled:cursor-not-allowed shrink-0 mt-0.5"
            >
              <Send className="w-4 h-4 text-white" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
