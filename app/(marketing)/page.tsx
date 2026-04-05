"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  MessageSquare,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { FeatureBar } from "@/components/marketing/FeatureBar";
import { TwoLayerTag } from "@/components/marketing/TwoLayerTag";
import { InfluencerCard } from "@/components/marketing/InfluencerCard";
import { Marquee } from "@/components/marketing/Marquee";

const section = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.45 },
};

const twoLayerTags = [
  {
    parent: "Фитнес",
    children: ["Женский фитнес после родов", "Силовые тренировки для мужчин"],
  },
  { parent: "Еда", children: ["Веганская кухня", "Рестораны Алматы"] },
  {
    parent: "Бьюти",
    children: ["Уходовая косметика", "Макияж для начинающих"],
  },
];

const platformSections = [
  {
    title: "Главная",
    desc: "AI-рекомендации и быстрые действия",
    icon: LayoutDashboard,
  },
  {
    title: "Чат",
    desc: "Общение внутри платформы без директов",
    icon: MessageSquare,
  },
  {
    title: "Сделки",
    desc: "Статусы, история, контроль оплат",
    icon: ShieldCheck,
  },
  {
    title: "Профиль",
    desc: "Аналитика, рейтинг и настройки",
    icon: Sparkles,
  },
];

const keyFeatures = [
  {
    title: "Умный подбор",
    body: "ИИ анализирует ниши и аудиторию, чтобы предложить релевантные пары бренд — инфлюенсер.",
    icon: Sparkles,
  },
  {
    title: "Сделки под защитой",
    body: "Эскроу и прозрачные статусы: меньше риска «оплатил — и тишина».",
    icon: ShieldCheck,
  },
  {
    title: "Всё в одном потоке",
    body: "От брифа до публикации — без бесконечных чатов в сторонних мессенджерах.",
    icon: MessageSquare,
  },
];

const metrics = ["Подбор", "Сделки", "Аналитика", "Безопасность"];

export default function HomePage() {
  return (
    <div className="flex flex-col">
      {/* HERO — Peec-style: mesh bg, tight headline, metric line, dual CTAs, product mock */}
      <section className="hero-mesh min-h-[min(100vh,920px)] flex flex-col items-center px-5 pt-28 pb-16 text-center">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto flex flex-col items-center gap-5"
        >
          <p className="text-sm font-medium text-muted-foreground">
            AI-платформа инфлюенс-маркетинга в Казахстане
          </p>
          <h1 className="text-balance text-display-md md:text-display-lg lg:text-display-xl text-foreground max-w-[18ch] md:max-w-none">
            Реклама через инфлюенсеров — без хаоса и посредников
          </h1>
          <p className="text-sm font-medium text-brand">Будущее рекламы — без менеджеров.</p>
          <p className="text-base md:text-lg text-muted-foreground max-w-xl leading-relaxed">
            Jeli соединяет бизнес и инфлюенсеров напрямую: умный мэтчинг, весь цикл сделки внутри платформы и
            защита денег через escrow. Мы берём процент с успешных сделок и предлагаем подписку на полный
            функционал — чем больше честных интеграций, тем совпадают наши интересы с вашими.
          </p>

          <div
            className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-sm text-muted-foreground"
            aria-hidden
          >
            {metrics.map((m, i) => (
              <span key={m} className="inline-flex items-center gap-3">
                {i > 0 && <span className="text-border select-none">·</span>}
                <span>{m}</span>
              </span>
            ))}
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 mt-2">
            <Link
              href="/register"
              className="inline-flex items-center justify-center rounded-full bg-foreground px-6 py-2.5 text-sm font-medium text-background hover:opacity-90 transition-opacity"
            >
              Запустить кампанию
            </Link>
            <Link
              href="/register"
              className="inline-flex items-center justify-center rounded-full border border-border bg-background px-6 py-2.5 text-sm font-medium text-foreground shadow-sm hover:bg-muted/60 transition-colors"
            >
              Я инфлюенсер
            </Link>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.1 }}
          className="mt-14 w-full max-w-md mx-auto px-1 flex flex-col items-center gap-3"
        >
          <p className="text-xs text-muted-foreground text-center max-w-sm">
            Пример экрана: так может выглядеть карточка в каталоге (данные вымышленные, для демонстрации
            интерфейса).
          </p>
          <div className="w-full rounded-2xl border border-border bg-card p-1 shadow-[0_32px_64px_-32px_rgba(15,23,42,0.2)]">
            <div className="rounded-xl bg-muted/40 px-3 py-2 flex items-center gap-2 text-xs text-muted-foreground border-b border-border/60">
              <span className="font-medium text-foreground">Каталог</span>
              <span className="opacity-40">|</span>
              <span>Город</span>
              <span className="opacity-40">|</span>
              <span>Ниша</span>
            </div>
            <div className="p-4">
              <InfluencerCard
                name="Профиль (пример)"
                location="Казахстан"
                parentNiche="Фитнес"
                childNiches={["Подниша 1", "Подниша 2"]}
                score={87}
                matchPercent={94}
                avatarColor="#0064FF"
              />
            </div>
          </div>
        </motion.div>
      </section>

      <section className="py-10 px-5 border-b border-border/60 bg-background">
        <p className="text-center text-sm font-medium text-muted-foreground">
          Ниши и форматы — от lifestyle до B2B
        </p>
      </section>

      <section className="py-6 border-b border-border/60 overflow-hidden">
        <Marquee />
      </section>

      {/* KEY FEATURES — grid like Peec */}
      <motion.section {...section} className="py-20 md:py-28 px-5">
        <div className="max-w-6xl mx-auto">
          <div className="max-w-2xl mb-12 md:mb-16">
            <p className="text-xs font-semibold uppercase tracking-wider text-brand mb-3">Ключевые возможности</p>
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-foreground">
              От инсайтов к сделкам — в одной платформе
            </h2>
            <p className="mt-4 text-muted-foreground text-base leading-relaxed">
              Точный мэтч, прозрачные условия и меньше операционки для команд и авторов.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
            {keyFeatures.map(({ title, body, icon: Icon }) => (
              <div
                key={title}
                className="rounded-2xl border border-border bg-card p-6 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-brand/10 text-brand">
                  <Icon className="h-5 w-5" strokeWidth={1.75} />
                </div>
                <h3 className="text-lg font-semibold tracking-tight text-foreground">{title}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* PROBLEM — BRANDS */}
      <motion.section {...section} className="py-16 md:py-20 px-5 bg-muted/25">
        <div className="max-w-3xl mx-auto flex flex-col gap-8">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-brand mb-2">Проблема</p>
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-foreground mb-3">
              Брендам сложно
            </h2>
            <p className="text-muted-foreground text-base leading-relaxed">
              Поиск инфлюенсера превращается в отдельный проект.
            </p>
          </div>
          <div className="flex flex-col gap-3">
            <FeatureBar
              text="Ищешь подходящих инфлюенсеров часами — вручную, через директ"
              delay={0}
            />
            <FeatureBar text="Не знаешь, реальная ли у них аудитория" delay={0.08} />
            <FeatureBar text="После оплаты — тишина. Контроль нулевой." delay={0.16} />
          </div>
        </div>
      </motion.section>

      {/* PROBLEM — INFLUENCERS */}
      <motion.section {...section} className="py-16 md:py-20 px-5">
        <div className="max-w-3xl mx-auto flex flex-col gap-8">
          <div>
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-foreground mb-3">
              Инфлюенсерам невыгодно
            </h2>
            <p className="text-muted-foreground text-base leading-relaxed">
              Рынок работает через посредников, которые забирают большую часть.
            </p>
          </div>
          <div className="flex flex-col gap-3">
            <FeatureBar text="Ищешь бренды сам — наугад, без гарантий" delay={0} />
            <FeatureBar text="Половину съедает менеджер или агентство" delay={0.08} />
            <FeatureBar text="Можешь отработать и не получить оплату" delay={0.16} />
          </div>
        </div>
      </motion.section>

      {/* SOLUTION */}
      <motion.section {...section} className="py-16 md:py-20 px-5 bg-muted/25">
        <div className="max-w-3xl mx-auto flex flex-col gap-8">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-brand mb-2">Решение</p>
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-foreground mb-3">
              Мы убрали всех лишних из цепочки
            </h2>
            <p className="text-muted-foreground text-base leading-relaxed">
              Jeli — это платформа, которая делает работу менеджера сама.
            </p>
          </div>
          <div className="flex flex-col gap-3">
            <FeatureBar text="Соединяет бренды и инфлюенсеров без посредников" delay={0} />
            <FeatureBar text="Анализирует аудиторию и подбирает нужных людей" delay={0.08} />
            <FeatureBar text="Ведёт сделку от первого контакта до перевода денег" delay={0.16} />
            <FeatureBar text="Заменяет ручную работу искусственным интеллектом" delay={0.24} />
          </div>
        </div>
      </motion.section>

      {/* HOW IT WORKS */}
      <motion.section {...section} className="py-16 md:py-20 px-5">
        <div className="max-w-3xl mx-auto flex flex-col gap-8">
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-foreground">
            Как это работает
          </h2>
          <div className="flex flex-col gap-3">
            <FeatureBar
              text="Выбери роль — бренд или инфлюенсер — и создай профиль. Это займёт пять минут."
              badge="Шаг 1"
              delay={0}
            />
            <FeatureBar
              text="ИИ анализирует твои данные и предлагает подходящие варианты для сотрудничества."
              badge="Шаг 2"
              delay={0.08}
            />
            <FeatureBar
              text="Договоритесь об условиях в чате. Оплата проходит через safe-сделку — деньги защищены."
              badge="Шаг 3"
              delay={0.16}
            />
          </div>
        </div>
      </motion.section>

      {/* TWO-LAYER TAGS */}
      <motion.section {...section} className="py-16 md:py-24 px-5 bg-muted/25">
        <div className="max-w-5xl mx-auto flex flex-col gap-10">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-foreground mb-3">
              Точный мэтч, а не просто категория
            </h2>
            <p className="text-muted-foreground text-base leading-relaxed">
              Инфлюенсеры в Jeli описывают не просто сферу, а конкретную нишу внутри неё. Бренд находит
              именно свою аудиторию.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {twoLayerTags.map((tag) => (
              <TwoLayerTag key={tag.parent} parent={tag.parent} items={tag.children} />
            ))}
          </div>
        </div>
      </motion.section>

      {/* PLATFORM SECTIONS */}
      <motion.section {...section} className="py-16 md:py-24 px-5">
        <div className="max-w-6xl mx-auto flex flex-col gap-12">
          <div className="text-center max-w-2xl mx-auto">
            <p className="text-xs font-semibold uppercase tracking-wider text-brand mb-3">Продукт</p>
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-foreground">
              Четыре раздела платформы
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {platformSections.map(({ title, desc, icon: Icon }) => (
              <div
                key={title}
                className="rounded-2xl border border-border bg-card px-6 py-5 flex gap-4 text-left shadow-sm"
              >
                <div className="shrink-0 flex h-11 w-11 items-center justify-center rounded-xl bg-muted text-foreground">
                  <Icon className="h-5 w-5" strokeWidth={1.5} />
                </div>
                <div>
                  <p className="font-semibold text-foreground">{title}</p>
                  <p className="text-sm text-muted-foreground mt-1 leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* FINAL CTA */}
      <section className="py-20 md:py-28 px-5">
        <motion.div
          {...section}
          className="max-w-2xl mx-auto text-center flex flex-col items-center gap-6 rounded-3xl border border-border bg-muted/30 px-6 py-14 md:px-10"
        >
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-foreground">
            Готовы попробовать?
          </h2>
          <p className="text-muted-foreground text-base max-w-md">
            Регистрация бесплатная. Первая кампания — когда будете готовы.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/register"
              className="inline-flex items-center justify-center rounded-full bg-foreground px-6 py-2.5 text-sm font-medium text-background hover:opacity-90 transition-opacity"
            >
              Запустить кампанию
            </Link>
            <Link
              href="/register"
              className="inline-flex items-center justify-center rounded-full border border-border bg-background px-6 py-2.5 text-sm font-medium text-foreground shadow-sm hover:bg-muted/60 transition-colors"
            >
              Я инфлюенсер
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
