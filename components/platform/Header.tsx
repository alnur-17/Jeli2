"use client";

import { usePathname } from "next/navigation";
import { Bell, Search } from "lucide-react";
import Link from "next/link";

const routeNames: Record<string, string> = {
  "/app/dashboard": "Главная",
  "/app/influencers": "Блогеры",
  "/app/campaigns": "Кампании",
  "/app/campaigns/new": "Новая кампания",
  "/app/wallet": "Кошелёк",
  "/app/ai-manager": "ИИ-менеджер",
  "/app/notifications": "Уведомления",
  "/app/settings": "Настройки",
};

interface HeaderProps {
  unreadCount?: number;
}

export function Header({ unreadCount = 2 }: HeaderProps) {
  const pathname = usePathname();

  const pageTitle =
    routeNames[pathname] ??
    (pathname.startsWith("/app/influencers/")
      ? "Профиль блогера"
      : pathname.startsWith("/app/campaigns/")
      ? "Детали кампании"
      : "");

  return (
    <header className="fixed top-0 left-0 right-0 lg:left-60 h-14 bg-[#0A0A0A]/95 backdrop-blur-md border-b border-white/5 z-30 flex items-center px-6 gap-4">
      {/* Page title */}
      <h1 className="text-sm font-semibold text-white hidden sm:block">{pageTitle}</h1>

      {/* Search */}
      <div className="relative flex-1 max-w-sm ml-auto sm:ml-0">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-white/30" />
        <input
          type="text"
          placeholder="Поиск по блогерам, кампаниям..."
          className="w-full bg-white/5 border border-white/8 rounded-lg pl-9 pr-4 py-2 text-xs text-white placeholder:text-white/30 focus:outline-none focus:border-white/20 transition-colors"
        />
      </div>

      <div className="flex items-center gap-2 ml-auto">
        {/* Notifications */}
        <Link
          href="/app/notifications"
          className="relative w-9 h-9 flex items-center justify-center rounded-lg text-white/50 hover:text-white hover:bg-white/5 transition-colors"
        >
          <Bell className="w-4 h-4" />
          {unreadCount > 0 && (
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#0064FF] rounded-full" />
          )}
        </Link>

        {/* Avatar */}
        <Link href="/app/settings" className="w-8 h-8 rounded-full bg-gradient-to-br from-[#0064FF] to-[#7C3AED] flex items-center justify-center text-white text-xs font-semibold">
          Б
        </Link>
      </div>
    </header>
  );
}
