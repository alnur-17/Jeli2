"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";

const navLinks = [
  { label: "Как работает", href: "/how" },
  { label: "Бизнесу", href: "/businesses" },
  { label: "Инфлюенсерам", href: "/influencers" },
  { label: "Цены", href: "/pricing" },
  { label: "Контакты", href: "/contacts" },
];

const LogoPlaceholder = () => (
  <div
    className="logo-placeholder"
    style={{ width: 80, height: 32, background: "#E5E5E5", borderRadius: 4 }}
  />
);

export function Navbar() {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/90 dark:bg-black/90 backdrop-blur-md border-b border-border"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between gap-8">
        {/* Logo */}
        <Link href="/" className="shrink-0">
          <LogoPlaceholder />
        </Link>

        {/* Center Nav */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm transition-colors ${
                pathname === link.href
                  ? "text-brand font-semibold"
                  : "text-foreground/70 hover:text-foreground"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right actions */}
        <div className="flex items-center gap-3 shrink-0">
          {/* Theme toggle */}
          {mounted && (
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="w-9 h-9 flex items-center justify-center rounded-lg text-foreground/70 hover:text-foreground hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label="Переключить тему"
            >
              {theme === "dark" ? (
                <Sun className="w-4 h-4" />
              ) : (
                <Moon className="w-4 h-4" />
              )}
            </button>
          )}

          {/* Войти */}
          <Link
            href="/login"
            className="hidden sm:inline-flex items-center border-2 border-brand text-brand rounded-lg px-4 py-1.5 text-sm font-semibold hover:bg-brand-light dark:hover:bg-brand-dark transition-colors"
          >
            Войти
          </Link>

          {/* Начать бесплатно */}
          <Link
            href="/register"
            className="inline-flex items-center bg-brand text-white rounded-lg px-4 py-1.5 text-sm font-semibold hover:bg-brand-hover transition-colors"
          >
            Начать бесплатно
          </Link>
        </div>
      </div>
    </header>
  );
}
