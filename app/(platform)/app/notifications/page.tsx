"use client";

import { useState } from "react";
import { MOCK_NOTIFICATIONS } from "@/lib/mock-data";
import { CheckCheck } from "lucide-react";

type Notification = typeof MOCK_NOTIFICATIONS[0];

const TYPE_ICONS: Record<string, string> = {
  publish: "📤", review: "📋", payment: "💸", accept: "🤝", system: "⚙️", campaign: "📢",
};

function NotifItem({ n, onRead }: { n: Notification; onRead: () => void }) {
  return (
    <div
      onClick={onRead}
      className={`flex items-start gap-4 px-5 py-4 border-b border-white/[0.04] cursor-pointer transition-colors hover:bg-white/[0.02] ${!n.read ? "bg-white/[0.02]" : ""}`}
    >
      <div
        className="w-9 h-9 rounded-full flex items-center justify-center text-base shrink-0"
        style={{ background: n.avatarColor ? `${n.avatarColor}22` : "#1a1a1a" }}
      >
        {TYPE_ICONS[n.type] || "🔔"}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <p className={`text-sm font-medium ${n.read ? "text-white/70" : "text-white"}`}>{n.title}</p>
          {!n.read && <span className="w-2 h-2 rounded-full bg-[#0064FF] shrink-0 mt-1.5" />}
        </div>
        <p className="text-xs text-white/40 mt-0.5 leading-relaxed">{n.body}</p>
        <p className="text-[11px] text-white/20 mt-1">{n.time}</p>
      </div>
    </div>
  );
}

export default function NotificationsPage() {
  const [notifs, setNotifs] = useState(MOCK_NOTIFICATIONS);
  const unreadCount = notifs.filter((n) => !n.read).length;

  const markRead = (id: string) =>
    setNotifs((ns) => ns.map((n) => n.id === id ? { ...n, read: true } : n));

  const markAllRead = () => setNotifs((ns) => ns.map((n) => ({ ...n, read: true })));

  return (
    <div className="max-w-2xl mx-auto flex flex-col gap-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-white">Уведомления</h1>
          {unreadCount > 0 && (
            <p className="text-sm text-white/40 mt-0.5">{unreadCount} непрочитанных</p>
          )}
        </div>
        {unreadCount > 0 && (
          <button
            onClick={markAllRead}
            className="flex items-center gap-1.5 text-sm text-white/40 hover:text-white transition-colors"
          >
            <CheckCheck className="w-4 h-4" />
            Прочитать все
          </button>
        )}
      </div>

      <div className="bg-[#111] border border-white/[0.06] rounded-xl overflow-hidden">
        {notifs.map((n) => (
          <NotifItem key={n.id} n={n} onRead={() => markRead(n.id)} />
        ))}
        {notifs.length === 0 && (
          <div className="py-16 text-center text-sm text-white/30">Нет уведомлений</div>
        )}
      </div>
    </div>
  );
}
