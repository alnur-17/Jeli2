"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Search, Scissors, ShieldOff } from "lucide-react";
import { FeatureBar } from "@/components/marketing/FeatureBar";
import { TwoLayerTag } from "@/components/marketing/TwoLayerTag";
import { ScoreBreakdown } from "@/components/marketing/ScoreBreakdown";

const section = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5 },
};

const painCards = [
  {
    icon: Search,
    title: "Ищешь сам",
    text: "Пишешь брендам первым, тратишь время, получаешь отказы или молчание.",
  },
  {
    icon: Scissors,
    title: "Посредник забирает часть",
    text: "Агентства и менеджеры берут свои проценты за то, что ты мог сделать сам.",
  },
  {
    icon: ShieldOff,
    title: "Нет гарантий",
    text: "Работу сделал, а деньги могут прийти с задержкой или не прийти вообще.",
  },
];

const twoLayerTags = [
  {
    parent: "Фитнес",
    children: ["Женский фитнес после родов", "Силовые тренировки"],
  },
  {
    parent: "Бьюти",
    children: ["Уходовая косметика", "Макияж для начинающих"],
  },
];

const scoreItems = [
  { label: "Engagement Rate", percent: 40 },
  { label: "Качество комментариев (AI)", percent: 25 },
  { label: "Стабильность охватов", percent: 20 },
  { label: "Динамика роста", percent: 15 },
];

export default function InfluencersPage() {
  return (
    <div className="flex flex-col pt-16">
      {/* HERO */}
      <section className="py-24 px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 0 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto flex flex-col items-center gap-6"
        >
          <p className="text-xs font-semibold tracking-widest text-brand uppercase">
            Для инфлюенсеров
          </p>
          <h1 className="font-headline text-[clamp(44px,7vw,76px)] leading-none uppercase text-foreground">
            Работай с брендами{" "}
            <span className="text-brand">на своих условиях.</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-xl leading-relaxed">
            Jeli подбирает кампании под твою нишу и аудиторию. Оплата
            гарантирована ещё до начала работы.
          </p>
          <Link
            href="/register"
            className="bg-brand text-white rounded-lg px-6 py-3 font-semibold hover:bg-brand-hover transition-colors"
          >
            Зарегистрироваться
          </Link>
        </motion.div>
      </section>

      {/* PAIN CARDS */}
      <motion.section {...section} className="py-16 px-6">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          {painCards.map(({ icon: Icon, title, text }) => (
            <div
              key={title}
              className="rounded-2xl border border-border bg-card p-6 flex flex-col gap-4"
            >
              <div className="w-10 h-10 rounded-xl bg-brand/10 flex items-center justify-center">
                <Icon className="w-5 h-5 text-brand" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-1">{title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {text}
                </p>
              </div>
            </div>
          ))}
        </div>
      </motion.section>

      {/* STEPS */}
      <motion.section {...section} className="py-16 px-6 bg-muted/40">
        <div className="max-w-3xl mx-auto flex flex-col gap-8">
          <p className="text-xs font-semibold tracking-widest text-brand uppercase">
            Как это работает для инфлюенсеров
          </p>
          <div className="flex flex-col gap-3">
            <FeatureBar
              text="Подключи Instagram, TikTok или YouTube — ИИ сам соберёт твой профиль из данных аккаунта."
              badge="Шаг 1"
              delay={0}
            />
            <FeatureBar
              text="Смотри подборку кампаний, которые подходят под твою нишу и аудиторию. Подавай заявку в один клик."
              badge="Шаг 2"
              delay={0.1}
            />
            <FeatureBar
              text="Создай контент, загрузи на согласование. Деньги переводятся сразу после публикации."
              badge="Шаг 3"
              delay={0.2}
            />
          </div>
        </div>
      </motion.section>

      {/* TWO-LAYER TAGS */}
      <motion.section {...section} className="py-20 px-6">
        <div className="max-w-4xl mx-auto flex flex-col gap-10">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="font-headline text-5xl md:text-6xl uppercase text-foreground leading-none mb-4">
              Платформа знает твою нишу
            </h2>
            <p className="text-muted-foreground text-base leading-relaxed">
              Ты указываешь не просто категорию, а конкретную аудиторию — и
              получаешь кампании, которые реально совпадают с твоим контентом.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-2xl mx-auto w-full">
            {twoLayerTags.map((tag) => (
              <TwoLayerTag key={tag.parent} parent={tag.parent} items={tag.children} />
            ))}
          </div>
        </div>
      </motion.section>

      {/* SCORING */}
      <motion.section {...section} className="py-20 px-6 bg-muted/40">
        <div className="max-w-3xl mx-auto flex flex-col gap-10">
          <div>
            <h2 className="font-headline text-5xl md:text-6xl uppercase text-foreground leading-none mb-4">
              Честный скоринг — больше кампаний
            </h2>
            <p className="text-muted-foreground text-base leading-relaxed">
              Jeli оценивает реальный engagement, а не количество подписчиков.
              Чем честнее твоя аудитория — тем выше ты в подборках.
            </p>
          </div>
          <ScoreBreakdown items={scoreItems} />
        </div>
      </motion.section>

      {/* ESCROW */}
      <motion.section {...section} className="py-20 px-6">
        <div className="max-w-3xl mx-auto flex flex-col gap-6">
          <h2 className="font-headline text-5xl md:text-6xl uppercase text-foreground leading-none">
            Деньги уже есть до того, как ты начал
          </h2>
          <p className="text-muted-foreground text-base leading-relaxed">
            Когда бренд одобряет твою заявку — деньги сразу замораживаются на
            платформе. Ты видишь сумму и работаешь спокойно.
          </p>
          <div className="flex flex-col gap-3 mt-4">
            <div className="rounded-xl border border-brand/30 bg-brand/5 p-4 flex items-center gap-3">
              <span className="text-2xl">🔒</span>
              <span className="text-foreground font-medium">
                Сумма зафиксирована. Платёж защищён.
              </span>
            </div>
          </div>
        </div>
      </motion.section>

      {/* AFFILIATE */}
      <motion.section {...section} className="py-20 px-6 bg-muted/40">
        <div className="max-w-3xl mx-auto flex flex-col gap-6">
          <h2 className="font-headline text-5xl md:text-6xl uppercase text-foreground leading-none">
            Приводи коллег — получай бонусы
          </h2>
          <p className="text-muted-foreground text-base leading-relaxed">
            У каждого инфлюенсера есть реферальная ссылка. Приведи коллегу —
            получи приоритет в выдаче или бонус от его первой сделки.
          </p>
          <div className="flex items-center gap-3 bg-brand rounded-xl p-4 text-white font-medium text-sm w-fit">
            <span>🔗</span>
            <span>jeli.kz/ref/твой-ник</span>
          </div>
        </div>
      </motion.section>

      {/* FINAL CTA */}
      <section className="py-20 px-6 bg-brand-light dark:bg-brand-dark text-center">
        <motion.div
          {...section}
          className="max-w-xl mx-auto flex flex-col items-center gap-6"
        >
          <h2 className="font-headline text-5xl uppercase text-foreground leading-none">
            Начни зарабатывать с Jeli
          </h2>
          <Link
            href="/register"
            className="bg-brand text-white rounded-lg px-6 py-3 font-semibold hover:bg-brand-hover transition-colors"
          >
            Зарегистрироваться бесплатно
          </Link>
        </motion.div>
      </section>
    </div>
  );
}
