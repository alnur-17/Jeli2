"use client";

import { motion } from "framer-motion";
import { Mail } from "lucide-react";

const section = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5 },
};

function InstagramIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function TelegramIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 2L11 13" />
      <path d="M22 2L15 22L11 13L2 9L22 2Z" />
    </svg>
  );
}

export default function ContactsPage() {
  return (
    <div className="flex flex-col pt-16">
      {/* HERO */}
      <section className="py-24 px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 0 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mx-auto flex flex-col items-center gap-4"
        >
          <h1 className="text-display-md md:text-display-lg font-semibold tracking-tight text-foreground text-balance">
            Свяжитесь с нами
          </h1>
          <p className="text-lg text-muted-foreground">
            Есть вопросы? Напишите нам — ответим быстро.
          </p>
        </motion.div>
      </section>

      {/* CONTACT CARDS */}
      <motion.section {...section} className="py-10 px-6">
        <div className="max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="rounded-2xl border border-border bg-card p-6 flex flex-col gap-3">
            <div className="w-10 h-10 rounded-xl bg-brand/10 flex items-center justify-center">
              <Mail className="w-5 h-5 text-brand" />
            </div>
            <div>
              <p className="font-semibold text-foreground mb-1">Для брендов</p>
              <a
                href="mailto:ersultan.aryn.wk@gmail.com"
                className="text-brand hover:underline text-sm"
              >
                ersultan.aryn.wk@gmail.com
              </a>
            </div>
          </div>
          <div className="rounded-2xl border border-border bg-card p-6 flex flex-col gap-3">
            <div className="w-10 h-10 rounded-xl bg-brand/10 flex items-center justify-center">
              <Mail className="w-5 h-5 text-brand" />
            </div>
            <div>
              <p className="font-semibold text-foreground mb-1">
                Для инфлюенсеров
              </p>
              <a
                href="mailto:ersultan.aryn.wk@gmail.com"
                className="text-brand hover:underline text-sm"
              >
                ersultan.aryn.wk@gmail.com
              </a>
            </div>
          </div>
        </div>
      </motion.section>

      {/* CONTACT FORM */}
      <motion.section {...section} className="py-16 px-6 pb-24">
        <div className="max-w-xl mx-auto">
          <form
            onSubmit={(e) => e.preventDefault()}
            className="flex flex-col gap-5 rounded-2xl border border-border bg-card p-8"
          >
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-foreground">Имя</label>
              <input
                type="text"
                placeholder="Ваше имя"
                className="rounded-lg border border-border bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand transition-all"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-foreground">
                Email
              </label>
              <input
                type="email"
                placeholder="you@example.com"
                className="rounded-lg border border-border bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand transition-all"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-foreground">Я:</label>
              <div className="flex items-center gap-6">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="role"
                    value="brand"
                    defaultChecked
                    className="accent-brand"
                  />
                  <span className="text-sm text-foreground">Бренд</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="role"
                    value="influencer"
                    className="accent-brand"
                  />
                  <span className="text-sm text-foreground">Инфлюенсер</span>
                </label>
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-foreground">
                Сообщение
              </label>
              <textarea
                rows={5}
                placeholder="Опишите вашу задачу..."
                className="rounded-lg border border-border bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand transition-all resize-none"
              />
            </div>

            <button
              type="submit"
              className="bg-brand text-white rounded-lg px-6 py-3 font-semibold hover:bg-brand-hover transition-colors"
            >
              Отправить
            </button>
          </form>
        </div>
      </motion.section>

      {/* SOCIAL */}
      <motion.section
        {...section}
        className="py-12 px-6 bg-muted/40 border-t border-border"
      >
        <div className="max-w-xl mx-auto flex flex-col items-center gap-4">
          <p className="text-sm text-muted-foreground">Мы в соцсетях</p>
          <div className="flex items-center gap-6">
            <a
              href="#"
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <InstagramIcon />
              <span className="text-sm font-medium">Instagram</span>
            </a>
            <a
              href="#"
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <TelegramIcon />
              <span className="text-sm font-medium">Telegram</span>
            </a>
          </div>
        </div>
      </motion.section>
    </div>
  );
}
