"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  LayoutDashboard,
  Users,
  Megaphone,
  Wallet,
  Bot,
  Bell,
  Settings,
  LogOut,
  Menu,
  X,
} from "lucide-react";

const navItems = [
  { href: "/app/dashboard", icon: LayoutDashboard, label: "Главная" },
  { href: "/app/influencers", icon: Users, label: "Блогеры" },
  { href: "/app/campaigns", icon: Megaphone, label: "Кампании" },
  { href: "/app/wallet", icon: Wallet, label: "Кошелёк" },
  { href: "/app/ai-manager", icon: Bot, label: "ИИ-менеджер" },
  { href: "/app/notifications", icon: Bell, label: "Уведомления" },
];

const LogoPlaceholder = () => (
  <div style={{ width: 72, height: 28, background: "#2a2a2a", borderRadius: 4 }} />
);

export function Sidebar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const isActive = (href: string) =>
    pathname === href || (href !== "/app/dashboard" && pathname.startsWith(href));

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="px-5 py-5 border-b border-white/5">
        <Link href="/app/dashboard" onClick={() => setMobileOpen(false)}>
          <LogoPlaceholder />
        </Link>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 flex flex-col gap-0.5 overflow-y-auto">
        {navItems.map(({ href, icon: Icon, label }) => (
          <Link
            key={href}
            href={href}
            onClick={() => setMobileOpen(false)}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all ${
              isActive(href)
                ? "bg-white/10 text-white font-medium"
                : "text-white/50 hover:text-white hover:bg-white/5"
            }`}
          >
            <Icon className="w-4 h-4 shrink-0" />
            {label}
          </Link>
        ))}
      </nav>

      {/* Bottom */}
      <div className="px-3 py-4 border-t border-white/5 flex flex-col gap-0.5">
        <Link
          href="/app/settings"
          onClick={() => setMobileOpen(false)}
          className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all ${
            pathname.startsWith("/app/settings")
              ? "bg-white/10 text-white font-medium"
              : "text-white/50 hover:text-white hover:bg-white/5"
          }`}
        >
          <Settings className="w-4 h-4 shrink-0" />
          Настройки
        </Link>
        <button
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-white/50 hover:text-red-400 hover:bg-red-400/5 transition-all w-full"
          onClick={async () => {
            const { createClient } = await import("@/lib/supabase/client");
            const supabase = createClient();
            await supabase.auth.signOut();
            window.location.href = "/login";
          }}
        >
          <LogOut className="w-4 h-4 shrink-0" />
          Выйти
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden lg:flex flex-col fixed left-0 top-0 h-screen w-60 bg-[#0f0f0f] border-r border-white/5 z-40">
        <SidebarContent />
      </aside>

      {/* Mobile burger */}
      <button
        className="lg:hidden fixed top-4 left-4 z-50 w-9 h-9 flex items-center justify-center rounded-lg bg-[#111] border border-white/10 text-white"
        onClick={() => setMobileOpen(!mobileOpen)}
      >
        {mobileOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
      </button>

      {/* Mobile overlay */}
      {mobileOpen && (
        <>
          <div
            className="lg:hidden fixed inset-0 bg-black/60 z-40"
            onClick={() => setMobileOpen(false)}
          />
          <aside className="lg:hidden fixed left-0 top-0 h-screen w-60 bg-[#0f0f0f] border-r border-white/5 z-50">
            <SidebarContent />
          </aside>
        </>
      )}
    </>
  );
}
