"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Gift, Link2, Search, ShieldOff, UserPlus } from "lucide-react";
import { FeatureBar } from "@/components/marketing/FeatureBar";
import { TwoLayerTag } from "@/components/marketing/TwoLayerTag";
import { ScoreBreakdown } from "@/components/marketing/ScoreBreakdown";

const section = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.45 },
};

const painCards = [
  {
    icon: Search,
    title: "Ищешь бренды наугад",
    text: "Пишешь первым в директ, ждёшь ответов, половина переписок ни к чему не ведёт.",
  },
  {
    icon: ShieldOff,
    title: "Нет гарантии оплаты",
    text: "Сделал интеграцию — а перевод задерживают или исчезают после публикации.",
  },
  {
    icon: UserPlus,
    title: "Посредники забирают долю",
    text: "Менеджеры и агентства оставляют себе заметный процент за то, что можно делать напрямую.",
  },
];

const parentSpheres = [
  "Фитнес",
  "Мода",
  "Еда",
  "Технологии",
  "Бьюти",
  "Путешествия",
  "Образование",
  "Финансы",
];

const twoLayerExamples = [
  {
    parent: "Фитнес",
    children: ["Женский фитнес после родов", "Силовые тренировки для мужчин"],
  },
  {
    parent: "Еда",
    children: ["Веганская кухня", "Ресторанные обзоры Алматы"],
  },
];

const scoreItems = [
  { label: "Engagement Rate", percent: 40 },
  { label: "Качество комментариев (ИИ)", percent: 25 },
  { label: "Стабильность охватов", percent: 20 },
  { label: "Динамика роста", percent: 15 },
];

export default function InfluencersPage() {
  return (
    <div className="flex flex-col pt-14">
      <section className="hero-mesh border-b border-border/60 px-5 py-16 md:py-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="max-w-3xl mx-auto flex flex-col items-center gap-5"
        >
          <p className="text-xs font-semibold uppercase tracking-wider text-brand">Для инфлюенсеров</p>
          <h1 className="text-display-md md:text-display-lg font-semibold tracking-tight text-foreground text-balance">
            Бренды, ниша и оплата — в одной платформе
          </h1>
          <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
            Jeli подбирает кампании под ваш контент и аудиторию, фиксирует бриф и сделку внутри сервиса и
            страхует оплату через escrow. Без бесконечных директов и «устных договорённостей».
          </p>
          <Link
            href="/register"
            className="inline-flex items-center justify-center rounded-full bg-brand px-6 py-2.5 text-sm font-semibold text-white hover:bg-brand-hover transition-colors"
          >
            Зарегистрироваться
          </Link>
        </motion.div>
      </section>

      <motion.section {...section} className="py-14 px-5">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          {painCards.map(({ icon: Icon, title, text }) => (
            <div
              key={title}
              className="rounded-2xl border border-border bg-card p-6 flex flex-col gap-4 shadow-sm"
            >
              <div className="w-10 h-10 rounded-xl bg-brand/10 flex items-center justify-center">
                <Icon className="w-5 h-5 text-brand" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-1">{title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{text}</p>
              </div>
            </div>
          ))}
        </div>
      </motion.section>

      <motion.section {...section} className="py-14 px-5 bg-muted/30 border-y border-border/60">
        <div className="max-w-3xl mx-auto flex flex-col gap-6">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-brand mb-2">Регистрация и профиль</p>
            <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-foreground mb-3">
              Подключение соцсетей и данные аудитории
            </h2>
            <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
              На старте — <strong className="text-foreground">TikTok и Instagram</strong> через OAuth: платформа
              получает реальные сигналы об аудитории (гео, возраст, пол — из аналитики подключённых аккаунтов).
              YouTube на первом этапе не подключаем; другие площадки возможны позже.
            </p>
          </div>
          <div className="flex flex-col gap-3">
            <FeatureBar
              text="ИИ разбирает ваш контент и помогает собрать профиль: преобладающие форматы (рилсы, сторис, длинные видео, фото-посты)."
              badge="Профиль"
              delay={0}
            />
            <FeatureBar
              text="Если OAuth ещё не доступен для всех сценариев, возможен ручной ввод с пометкой в профиле до полноценного подключения API."
              badge="В разработке"
              delay={0.06}
            />
          </div>
        </div>
      </motion.section>

      <motion.section {...section} className="py-14 px-5">
        <div className="max-w-4xl mx-auto flex flex-col gap-10">
          <div>
            <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-foreground mb-3">
              Двухслойные теги — ядро мэтчинга
            </h2>
            <p className="text-muted-foreground text-sm md:text-base leading-relaxed mb-4">
              Первый слой — широкая сфера ({parentSpheres.slice(0, 5).join(", ")} и др.). Второй — конкретная ниша
              внутри неё. Так бизнес ищет не «фитнес вообще», а ту аудиторию, которая совпадает с вашим
              контентом.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {twoLayerExamples.map((tag) => (
              <TwoLayerTag key={tag.parent} parent={tag.parent} items={tag.children} />
            ))}
          </div>
        </div>
      </motion.section>

      <motion.section {...section} className="py-14 px-5 bg-muted/30">
        <div className="max-w-3xl mx-auto flex flex-col gap-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-foreground mb-3">
              Скоринг и отсев «мёртвых» аккаунтов
            </h2>
            <p className="text-muted-foreground text-sm md:text-base leading-relaxed mb-2">
              Считается при регистрации и обновляется. Это защита бизнеса и честная конкуренция между авторами.
            </p>
          </div>
          <ScoreBreakdown items={scoreItems} />
          <div className="rounded-xl border border-border bg-card p-5 text-sm text-muted-foreground leading-relaxed space-y-2">
            <p className="font-medium text-foreground">На что смотрим при входе</p>
            <p>
              Соотношение вовлечённости к подписчикам, аномальные скачки роста (признак накрутки), качество
              комментариев: живые ответы и диалог vs шаблоны вроде «Nice post!» и бессмысленные эмодзи, стабильность
              охватов во времени. Аккаунты с критически низким скорингом не допускаются к платформе.
            </p>
          </div>
        </div>
      </motion.section>

      <motion.section {...section} className="py-14 px-5">
        <div className="max-w-3xl mx-auto flex flex-col gap-6">
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-foreground">
            Оплата до начала работы
          </h2>
          <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
            После одобрения сделки бренд резервирует сумму в escrow: вы видите, что бюджет есть, прежде чем
            тратить время на съёмку. Реализация резерва в продакшене будет через казахстанское финтех-партнёрство
            (в планах API уровня Kaspi, Halyk, Freedom и аналогов) — пока на сайте формулировки нейтральные.
          </p>
        </div>
      </motion.section>

      <motion.section {...section} className="py-14 px-5 bg-muted/30 border-y border-border/60">
        <div className="max-w-3xl mx-auto flex flex-col gap-5">
          <div className="flex items-center gap-2">
            <Gift className="h-6 w-6 text-brand" />
            <h2 className="text-2xl font-semibold tracking-tight text-foreground">Аффилиат для авторов</h2>
          </div>
          <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
            У каждого инфлюенсера будет реферальная ссылка в профиле. Привели коллегу — получаете бонус: приоритет
            в выдаче, скидку на подписку или долю от первой сделки приведённого автора (конкретика — в правилах
            программы на момент запуска).
          </p>
          <div className="inline-flex items-center gap-2 rounded-xl border border-border bg-card px-4 py-3 text-sm text-muted-foreground">
            <Link2 className="h-4 w-4 text-brand shrink-0" aria-hidden />
            <span>Ссылка появится в личном кабинете после регистрации.</span>
          </div>
        </div>
      </motion.section>

      <section className="py-16 px-5 border-t border-border bg-muted/20">
        <motion.div
          {...section}
          className="max-w-xl mx-auto flex flex-col items-center text-center gap-6"
        >
          <h2 className="text-2xl font-semibold tracking-tight text-foreground">Подключить аккаунты и ниши</h2>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href="/register"
              className="inline-flex items-center justify-center rounded-full bg-brand px-6 py-2.5 text-sm font-semibold text-white hover:bg-brand-hover transition-colors"
            >
              Регистрация бесплатно
            </Link>
            <Link
              href="/how"
              className="inline-flex items-center justify-center rounded-full border border-border bg-background px-6 py-2.5 text-sm font-medium hover:bg-muted/60 transition-colors"
            >
              Как работает
            </Link>
            <Link
              href="/pricing"
              className="inline-flex items-center justify-center rounded-full border border-border bg-background px-6 py-2.5 text-sm font-medium hover:bg-muted/60 transition-colors"
            >
              Тарифы
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
