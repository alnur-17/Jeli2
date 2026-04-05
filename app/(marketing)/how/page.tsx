"use client";

import { motion } from "framer-motion";
import { FeatureBar } from "@/components/marketing/FeatureBar";
import { TwoLayerTag } from "@/components/marketing/TwoLayerTag";
import { DealChain } from "@/components/marketing/DealChain";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const section = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5 },
};

const dealSteps = [
  "Оффер / Заявка",
  "Одобрение",
  "Деньги в escrow",
  "Бриф",
  "Согласование контента",
  "Публикация",
  "Оплата",
];

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

const faqItems = [
  {
    q: "Как работает safe-сделка?",
    a: "Когда бренд одобряет заявку инфлюенсера, деньги замораживаются на платформе. Инфлюенсер создаёт контент, загружает на согласование. После публикации деньги автоматически переводятся. Ни одна сторона не может забрать деньги в обход условий сделки.",
  },
  {
    q: "Как инфлюенсер подтверждает реальность аудитории?",
    a: "При регистрации инфлюенсер подключает аккаунты через официальные API (Instagram, TikTok, YouTube). Платформа получает реальные данные об аудитории и считает скоринг. Ручной ввод данных невозможен.",
  },
  {
    q: "Какие социальные сети поддерживаются?",
    a: "На старте — Instagram, TikTok и YouTube. Другие платформы появятся позже.",
  },
  {
    q: "Что происходит если контент не вышел?",
    a: "Если инфлюенсер не выполнил условия в срок — деньги возвращаются бренду. Все условия и дедлайны фиксируются внутри сделки.",
  },
  {
    q: "Можно ли пользоваться платформой бесплатно?",
    a: "Да. Базовый доступ бесплатный: регистрация, просмотр профилей, доступ к открытым кампаниям. Полный функционал открывается по подписке.",
  },
];

export default function HowPage() {
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
          <h1 className="font-headline text-[clamp(44px,7vw,76px)] leading-none uppercase text-foreground">
            Всё в одном месте
          </h1>
          <p className="text-lg text-muted-foreground max-w-xl leading-relaxed">
            От первого контакта до перевода денег — внутри одной платформы. Ни
            одного лишнего шага.
          </p>
        </motion.div>
      </section>

      {/* DEAL CYCLE */}
      <motion.section {...section} className="py-16 px-6 bg-muted/40">
        <div className="max-w-4xl mx-auto flex flex-col gap-8">
          <h2 className="font-headline text-5xl md:text-6xl uppercase text-foreground leading-none">
            Цикл сделки
          </h2>
          <DealChain steps={dealSteps} />
        </div>
      </motion.section>

      {/* SCORING */}
      <motion.section {...section} className="py-20 px-6">
        <div className="max-w-3xl mx-auto flex flex-col gap-8">
          <div>
            <p className="text-xs font-semibold tracking-widest text-brand uppercase mb-2">
              Как считается скоринг
            </p>
            <h2 className="font-headline text-5xl md:text-6xl uppercase text-foreground leading-none mb-3">
              Только живые аккаунты
            </h2>
            <p className="text-muted-foreground text-base">
              Фейки и накрутка отсекаются ещё при регистрации. Скоринг
              обновляется постоянно.
            </p>
          </div>
          <div className="flex flex-col gap-3">
            <FeatureBar
              text="Вовлечённость аудитории — основной показатель"
              badge="40%"
              delay={0}
            />
            <FeatureBar
              text="Качество комментариев — ИИ отличает живые от ботных"
              badge="25%"
              delay={0.1}
            />
            <FeatureBar
              text="Стабильность охватов от поста к посту"
              badge="20%"
              delay={0.2}
            />
            <FeatureBar
              text="Динамика роста аккаунта"
              badge="15%"
              delay={0.3}
            />
          </div>
        </div>
      </motion.section>

      {/* TWO-LAYER TAGS */}
      <motion.section {...section} className="py-20 px-6 bg-muted/40">
        <div className="max-w-4xl mx-auto flex flex-col gap-10">
          <div>
            <h2 className="font-headline text-5xl md:text-6xl uppercase text-foreground leading-none mb-3">
              Двухслойные теги
            </h2>
            <p className="text-muted-foreground text-base max-w-xl">
              Первый слой — широкая сфера. Второй — конкретная ниша внутри неё.
              Это даёт точный мэтч, а не просто категорию.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {twoLayerTags.map((tag) => (
              <TwoLayerTag key={tag.parent} parent={tag.parent} items={tag.children} />
            ))}
          </div>
        </div>
      </motion.section>

      {/* FAQ */}
      <motion.section {...section} className="py-20 px-6">
        <div className="max-w-3xl mx-auto flex flex-col gap-8">
          <h2 className="font-headline text-5xl md:text-6xl uppercase text-foreground leading-none">
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
