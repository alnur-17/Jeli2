"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { PricingPlan } from "@/components/marketing/types";

const section = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5 },
};

const bizPlans: PricingPlan[] = [
  {
    name: "Бесплатно",
    description: "Чтобы познакомиться с платформой",
    features: [
      "Регистрация и профиль",
      "Просмотр профилей инфлюенсеров",
      "Базовый поиск по каталогу",
    ],
    ctaLabel: "Начать бесплатно",
  },
  {
    name: "Стандарт",
    description: "Для регулярных кампаний",
    features: [
      "Создание кампаний",
      "AI-мэтчинг",
      "Safe-сделка (escrow)",
      "Базовая аналитика",
    ],
    highlighted: true,
    ctaLabel: "Попробовать",
  },
  {
    name: "Про",
    description: "Для масштабного маркетинга",
    features: [
      "Всё из Стандарт",
      "Расширенная аналитика и ROI",
      "Приоритетная поддержка",
      "Расширенные фильтры поиска",
    ],
    ctaLabel: "Попробовать",
  },
];

const infPlans: PricingPlan[] = [
  {
    name: "Бесплатно",
    description: "Чтобы начать",
    features: ["Профиль и скоринг", "Доступ к открытым кампаниям"],
    ctaLabel: "Зарегистрироваться",
  },
  {
    name: "Про",
    description: "Чтобы зарабатывать больше",
    features: [
      "Приоритет в выдаче брендам",
      "Доступ к большему числу кампаний",
      "Расширенная аналитика профиля",
    ],
    highlighted: true,
    ctaLabel: "Попробовать",
  },
];

const faqItems = [
  {
    q: "Когда списывается комиссия с транзакции?",
    a: "Комиссия платформы списывается в момент перевода оплаты инфлюенсеру — то есть только после того, как контент вышел.",
  },
  {
    q: "Можно ли отменить подписку в любое время?",
    a: "Да, подписку можно отменить в любой момент из профиля. Доступ сохраняется до конца оплаченного периода.",
  },
  {
    q: "Что входит в бесплатный тариф?",
    a: "Для брендов: регистрация и просмотр профилей инфлюенсеров. Для инфлюенсеров: профиль и доступ к открытым кампаниям. Создание кампаний и AI-мэтчинг требуют подписки.",
  },
];

function PlanCard({ plan }: { plan: PricingPlan }) {
  return (
    <div
      className={`rounded-2xl border-2 bg-card p-6 flex flex-col gap-5 transition-all ${
        plan.highlighted
          ? "border-brand shadow-lg shadow-brand/10"
          : "border-border"
      }`}
    >
      {plan.highlighted && (
        <span className="text-xs font-bold text-brand uppercase tracking-widest">
          Рекомендуем
        </span>
      )}
      <div>
        <h3 className="text-xl font-semibold tracking-tight text-foreground">
          {plan.name}
        </h3>
        <p className="text-sm text-muted-foreground mt-1">{plan.description}</p>
      </div>
      <ul className="flex flex-col gap-3 flex-1">
        {plan.features.map((f) => (
          <li key={f} className="flex items-start gap-2 text-sm text-foreground">
            <Check className="w-4 h-4 text-brand shrink-0 mt-0.5" />
            {f}
          </li>
        ))}
      </ul>
      <Link
        href="/register"
        className={`mt-auto inline-flex items-center justify-center rounded-lg px-5 py-2.5 text-sm font-semibold transition-colors ${
          plan.highlighted
            ? "bg-brand text-white hover:bg-brand-hover"
            : "border-2 border-brand text-brand hover:bg-brand-light dark:hover:bg-brand-dark"
        }`}
      >
        {plan.ctaLabel}
      </Link>
    </div>
  );
}

export default function PricingPage() {
  return (
    <div className="flex flex-col pt-14">
      <section className="py-16 md:py-20 px-5 text-center border-b border-border/60">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="max-w-2xl mx-auto flex flex-col items-center gap-4"
        >
          <h1 className="text-display-md md:text-display-lg font-semibold tracking-tight text-foreground text-balance">
            Тарифы и монетизация
          </h1>
          <p className="text-base text-muted-foreground leading-relaxed">
            <strong className="text-foreground">Комиссия с сделки</strong> — основной доход Jeli: мы заинтересованы
            в том, чтобы интеграции завершались честно. <strong className="text-foreground">Подписка</strong> —
            за полный функционал (мэтчинг, кампании, расширенная аналитика, приоритеты). Базовый доступ бесплатный:
            регистрация и просмотр.
          </p>
        </motion.div>
      </section>

      {/* PLANS */}
      <motion.section {...section} className="py-8 px-6 pb-24">
        <div className="max-w-5xl mx-auto">
          <Tabs defaultValue="brands" className="flex flex-col gap-10">
            <TabsList className="self-center">
              <TabsTrigger value="brands">Для брендов</TabsTrigger>
              <TabsTrigger value="influencers">Для инфлюенсеров</TabsTrigger>
            </TabsList>

            <TabsContent value="brands">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {bizPlans.map((plan) => (
                  <PlanCard key={plan.name} plan={plan} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="influencers">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
                {infPlans.map((plan) => (
                  <PlanCard key={plan.name} plan={plan} />
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </motion.section>

      {/* FAQ */}
      <motion.section {...section} className="py-20 px-6 bg-muted/40">
        <div className="max-w-3xl mx-auto flex flex-col gap-8">
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-foreground">
            Частые вопросы
          </h2>
          <Accordion>
            {faqItems.map((item, i) => (
              <AccordionItem key={i} value={String(i)}>
                <AccordionTrigger className="text-left text-base font-medium py-4">
                  {item.q}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-sm leading-relaxed pb-4">
                  {item.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </motion.section>
    </div>
  );
}
