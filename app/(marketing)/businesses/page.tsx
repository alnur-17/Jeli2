"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Clock, AlertTriangle, BarChart2 } from "lucide-react";
import { FeatureBar } from "@/components/marketing/FeatureBar";
import { InfluencerCard } from "@/components/marketing/InfluencerCard";
import { DealChain } from "@/components/marketing/DealChain";

const section = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5 },
};

const painCards = [
  {
    icon: Clock,
    title: "Часы на поиск",
    text: "Руками через директ, знакомых и агентства. Дорого и медленно.",
  },
  {
    icon: AlertTriangle,
    title: "Риск на ботов",
    text: "Без проверки аудитории легко заплатить за пустые охваты.",
  },
  {
    icon: BarChart2,
    title: "Ноль аналитики",
    text: "После публикации непонятно, сработало ли вообще.",
  },
];

const influencers = [
  {
    name: "Айгерим С.",
    location: "Алматы",
    parentNiche: "Фитнес",
    childNiches: ["Женский фитнес"],
    score: 91,
    matchPercent: 94,
    avatarColor: "#0064FF",
  },
  {
    name: "Данияр М.",
    location: "Астана",
    parentNiche: "Технологии",
    childNiches: ["Гаджеты", "Обзоры"],
    score: 84,
    matchPercent: 87,
    avatarColor: "#7C3AED",
  },
  {
    name: "Алина К.",
    location: "Алматы",
    parentNiche: "Еда",
    childNiches: ["Рестораны Алматы"],
    score: 78,
    matchPercent: 79,
    avatarColor: "#059669",
  },
];

const escrowSteps = [
  "Кампания запущена",
  "Деньги заморожены",
  "Контент на согласовании",
  "Публикация",
  "Оплата переведена",
];

const metricCards = [
  { label: "Охваты", value: "—" },
  { label: "Вовлечённость", value: "—" },
  { label: "ROI", value: "—" },
];

const barHeights = [40, 65, 50, 80, 60];

export default function BusinessesPage() {
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
            Для брендов
          </p>
          <h1 className="font-headline text-[clamp(44px,7vw,76px)] leading-none uppercase text-foreground">
            Запускай кампании{" "}
            <span className="text-brand">без лишней головной боли.</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-xl leading-relaxed">
            Опиши задачу — Jeli сам найдёт нужных инфлюенсеров, защитит бюджет
            и покажет результат.
          </p>
          <Link
            href="/register"
            className="bg-brand text-white rounded-lg px-6 py-3 font-semibold hover:bg-brand-hover transition-colors"
          >
            Создать кампанию
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
          <div>
            <p className="text-xs font-semibold tracking-widest text-brand uppercase mb-2">
              Как это работает для брендов
            </p>
          </div>
          <div className="flex flex-col gap-3">
            <FeatureBar
              text="Заполни бриф: цель, аудитория, бюджет и формат. Занимает несколько минут."
              badge="Шаг 1"
              delay={0}
            />
            <FeatureBar
              text="Получай заявки от инфлюенсеров, которые сами хотят работать с твоим брендом."
              badge="Шаг 2"
              delay={0.1}
            />
            <FeatureBar
              text="Контент выходит — деньги переводятся автоматически. Дашборд показывает всё."
              badge="Шаг 3"
              delay={0.2}
            />
          </div>
        </div>
      </motion.section>

      {/* MATCHING */}
      <motion.section {...section} className="py-20 px-6">
        <div className="max-w-5xl mx-auto flex flex-col gap-10">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="font-headline text-5xl md:text-6xl uppercase text-foreground leading-none mb-4">
              Платформа находит — ты выбираешь
            </h2>
            <p className="text-muted-foreground text-base leading-relaxed">
              ИИ смотрит на нишу, реальную аудиторию и скоринг каждого
              инфлюенсера. Ты видишь только тех, кто реально подходит под твой
              бриф.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {influencers.map((inf) => (
              <InfluencerCard key={inf.name} {...inf} />
            ))}
          </div>
        </div>
      </motion.section>

      {/* ESCROW */}
      <motion.section {...section} className="py-20 px-6 bg-muted/40">
        <div className="max-w-4xl mx-auto flex flex-col gap-8">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="font-headline text-5xl md:text-6xl uppercase text-foreground leading-none mb-4">
              Платишь только за вышедший контент
            </h2>
            <p className="text-muted-foreground text-base leading-relaxed">
              Деньги замораживаются в начале — инфлюенсер знает, что оплата
              есть. Ты знаешь, что заплатишь только после результата.
            </p>
          </div>
          <div className="flex justify-center">
            <DealChain steps={escrowSteps} />
          </div>
        </div>
      </motion.section>

      {/* ANALYTICS MOCKUP */}
      <motion.section {...section} className="py-20 px-6">
        <div className="max-w-4xl mx-auto flex flex-col gap-10">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="font-headline text-5xl md:text-6xl uppercase text-foreground leading-none mb-4">
              Видишь что работает
            </h2>
            <p className="text-muted-foreground text-base leading-relaxed">
              По каждой кампании — охваты, вовлечённость, клики и ROI. Со
              временем платформа подскажет, какие инфлюенсеры дают лучший
              результат именно для твоего бренда.
            </p>
          </div>

          {/* Dashboard mockup */}
          <div className="rounded-2xl border border-border bg-card p-6 flex flex-col gap-6">
            {/* Metric cards */}
            <div className="grid grid-cols-3 gap-4">
              {metricCards.map(({ label, value }) => (
                <div
                  key={label}
                  className="rounded-xl bg-background border border-border p-4"
                >
                  <p className="text-xs text-muted-foreground mb-1">{label}</p>
                  <p className="text-2xl font-bold text-foreground">{value}</p>
                </div>
              ))}
            </div>

            {/* Bar chart */}
            <div className="h-32 flex items-end gap-3 px-2">
              {barHeights.map((h, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-1">
                  <div
                    className="w-full rounded-t-md bg-brand/80"
                    style={{ height: `${h}%` }}
                  />
                </div>
              ))}
            </div>
            <p className="text-xs text-muted-foreground text-center">
              Динамика по кампании
            </p>
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
            Начни прямо сейчас
          </h2>
          <Link
            href="/register"
            className="bg-brand text-white rounded-lg px-6 py-3 font-semibold hover:bg-brand-hover transition-colors"
          >
            Создать первую кампанию
          </Link>
        </motion.div>
      </section>
    </div>
  );
}
