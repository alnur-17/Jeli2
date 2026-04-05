"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { FeatureBar } from "@/components/marketing/FeatureBar";
import { TwoLayerTag } from "@/components/marketing/TwoLayerTag";
import { InfluencerCard } from "@/components/marketing/InfluencerCard";
import { Marquee } from "@/components/marketing/Marquee";

const section = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5 },
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
  "Главная — AI-рекомендации и быстрые действия",
  "Чат — общение внутри платформы без директов",
  "Сделки — статусы, история, контроль оплат",
  "Профиль — аналитика, рейтинг и настройки",
];

export default function HomePage() {
  return (
    <div className="flex flex-col">
      {/* HERO */}
      <section className="min-h-screen flex flex-col items-center justify-center px-6 pt-24 pb-16 text-center">
        <motion.div
          initial={{ opacity: 0, y: 0 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto flex flex-col items-center gap-6"
        >
          <h1 className="font-headline text-[clamp(52px,8vw,88px)] leading-none tracking-wide uppercase text-foreground">
            Реклама через инфлюенсеров —<br />
            <span className="text-brand">без хаоса и посредников.</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed">
            Jeli соединяет бренды с инфлюенсерами напрямую. Умный подбор,
            защищённые сделки, и никакой ручной работы.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 mt-2">
            <Link
              href="/register"
              className="bg-brand text-white rounded-lg px-6 py-3 font-semibold hover:bg-brand-hover transition-colors"
            >
              Запустить кампанию
            </Link>
            <Link
              href="/register"
              className="border-2 border-brand text-brand rounded-lg px-6 py-3 font-semibold hover:bg-brand-light dark:hover:bg-brand-dark transition-colors"
            >
              Я инфлюенсер
            </Link>
          </div>

          {/* Product mockup */}
          <div className="mt-10 w-full max-w-sm mx-auto">
            <InfluencerCard
              name="Айгерим С."
              location="Алматы"
              parentNiche="Фитнес"
              childNiches={["Женский фитнес после родов", "Питание"]}
              score={87}
              matchPercent={94}
              avatarColor="#0064FF"
            />
          </div>
        </motion.div>
      </section>

      {/* MARQUEE */}
      <section className="py-8 border-y border-border overflow-hidden">
        <Marquee />
      </section>

      {/* PROBLEM — BRANDS */}
      <motion.section {...section} className="py-20 px-6">
        <div className="max-w-3xl mx-auto flex flex-col gap-8">
          <div>
            <p className="text-xs font-semibold tracking-widest text-brand uppercase mb-2">
              Проблема
            </p>
            <h2 className="font-headline text-5xl md:text-6xl uppercase text-foreground leading-none mb-3">
              Брендам сложно
            </h2>
            <p className="text-muted-foreground text-base">
              Поиск инфлюенсера превращается в отдельный проект.
            </p>
          </div>
          <div className="flex flex-col gap-3">
            <FeatureBar
              text="Ищешь подходящих инфлюенсеров часами — вручную, через директ"
              delay={0}
            />
            <FeatureBar
              text="Не знаешь, реальная ли у них аудитория"
              delay={0.1}
            />
            <FeatureBar
              text="После оплаты — тишина. Контроль нулевой."
              delay={0.2}
            />
          </div>
        </div>
      </motion.section>

      {/* PROBLEM — INFLUENCERS */}
      <motion.section {...section} className="py-20 px-6 bg-muted/40">
        <div className="max-w-3xl mx-auto flex flex-col gap-8">
          <div>
            <h2 className="font-headline text-5xl md:text-6xl uppercase text-foreground leading-none mb-3">
              Инфлюенсерам невыгодно
            </h2>
            <p className="text-muted-foreground text-base">
              Рынок работает через посредников, которые забирают большую часть.
            </p>
          </div>
          <div className="flex flex-col gap-3">
            <FeatureBar
              text="Ищешь бренды сам — наугад, без гарантий"
              delay={0}
            />
            <FeatureBar
              text="Половину съедает менеджер или агентство"
              delay={0.1}
            />
            <FeatureBar
              text="Можешь отработать и не получить оплату"
              delay={0.2}
            />
          </div>
        </div>
      </motion.section>

      {/* SOLUTION */}
      <motion.section {...section} className="py-20 px-6">
        <div className="max-w-3xl mx-auto flex flex-col gap-8">
          <div>
            <p className="text-xs font-semibold tracking-widest text-brand uppercase mb-2">
              Решение
            </p>
            <h2 className="font-headline text-5xl md:text-6xl uppercase text-foreground leading-none mb-3">
              Мы убрали всех лишних из цепочки
            </h2>
            <p className="text-muted-foreground text-base">
              Jeli — это платформа, которая делает работу менеджера сама.
            </p>
          </div>
          <div className="flex flex-col gap-3">
            <FeatureBar
              text="Соединяет бренды и инфлюенсеров без посредников"
              delay={0}
            />
            <FeatureBar
              text="Анализирует аудиторию и подбирает нужных людей"
              delay={0.1}
            />
            <FeatureBar
              text="Ведёт сделку от первого контакта до перевода денег"
              delay={0.2}
            />
            <FeatureBar
              text="Заменяет ручную работу искусственным интеллектом"
              delay={0.3}
            />
          </div>
        </div>
      </motion.section>

      {/* HOW IT WORKS */}
      <motion.section {...section} className="py-20 px-6 bg-muted/40">
        <div className="max-w-3xl mx-auto flex flex-col gap-8">
          <div>
            <h2 className="font-headline text-5xl md:text-6xl uppercase text-foreground leading-none mb-3">
              Как это работает
            </h2>
          </div>
          <div className="flex flex-col gap-3">
            <FeatureBar
              text="Выбери роль — бренд или инфлюенсер — и создай профиль. Это займёт пять минут."
              badge="Шаг 1 — Регистрация"
              delay={0}
            />
            <FeatureBar
              text="ИИ анализирует твои данные и предлагает подходящие варианты для сотрудничества."
              badge="Шаг 2 — AI-подбор"
              delay={0.1}
            />
            <FeatureBar
              text="Договоритесь об условиях в чате. Оплата проходит через safe-сделку — деньги защищены."
              badge="Шаг 3 — Сделка"
              delay={0.2}
            />
          </div>
        </div>
      </motion.section>

      {/* TWO-LAYER TAGS */}
      <motion.section {...section} className="py-20 px-6">
        <div className="max-w-4xl mx-auto flex flex-col gap-10">
          <div className="text-center">
            <h2 className="font-headline text-5xl md:text-6xl uppercase text-foreground leading-none mb-3">
              Точный мэтч, а не просто категория
            </h2>
            <p className="text-muted-foreground text-base max-w-2xl mx-auto">
              Инфлюенсеры в Jeli описывают не просто сферу, а конкретную нишу
              внутри неё. Бренд находит именно свою аудиторию.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {twoLayerTags.map((tag) => (
              <TwoLayerTag key={tag.parent} parent={tag.parent} items={tag.children} />
            ))}
          </div>
        </div>
      </motion.section>

      {/* PLATFORM SECTIONS */}
      <motion.section {...section} className="py-20 px-6 bg-muted/40">
        <div className="max-w-4xl mx-auto flex flex-col gap-10">
          <div className="text-center">
            <p className="text-xs font-semibold tracking-widest text-brand uppercase mb-4">
              Продукт
            </p>
            <h2 className="text-3xl md:text-4xl font-medium text-foreground leading-tight">
              Платформа состоит из{" "}
              <span className="font-headline text-6xl md:text-7xl text-brand align-baseline leading-none">
                ЧЕТЫРЁХ КЛЮЧЕВЫХ
              </span>{" "}
              разделов
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {platformSections.map((item) => (
              <div
                key={item}
                className="rounded-2xl border border-border bg-background px-6 py-5 text-base font-medium text-foreground"
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* FINAL CTA */}
      <section className="py-24 px-6 bg-brand-light dark:bg-brand-dark">
        <motion.div
          {...section}
          className="max-w-2xl mx-auto text-center flex flex-col items-center gap-6"
        >
          <h2 className="font-headline text-5xl md:text-6xl uppercase text-foreground leading-none">
            Готовы попробовать?
          </h2>
          <p className="text-muted-foreground text-lg">
            Регистрация бесплатная. Первая кампания — сегодня.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/register"
              className="bg-brand text-white rounded-lg px-6 py-3 font-semibold hover:bg-brand-hover transition-colors"
            >
              Запустить кампанию
            </Link>
            <Link
              href="/register"
              className="border-2 border-brand text-brand rounded-lg px-6 py-3 font-semibold hover:bg-white dark:hover:bg-brand-dark/50 transition-colors"
            >
              Я инфлюенсер
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
