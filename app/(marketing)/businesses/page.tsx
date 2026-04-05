"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  BarChart3,
  Bot,
  GitBranch,
  Layers,
  Package,
  Percent,
  RefreshCw,
  Search,
  Sparkles,
  Target,
  UserCheck,
  Wallet,
} from "lucide-react";
import { DealChain } from "@/components/marketing/DealChain";

const section = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.45 },
};

const profileFields = [
  "Сфера и описание продукта или услуги",
  "Целевая аудитория: кто покупатель, география, возраст, интересы",
  "Tone of voice — с юмором или строго, молодёжно или премиально",
  "Ориентир по бюджету — чтобы подбор не показывал нерелевантных авторов",
];

const campaignFields = [
  "Цель: охват, конверсия или узнаваемость бренда",
  "Аудитория: гео, возраст, пол, интересы",
  "Формат: нативная интеграция, обзор, сторис, рилс",
  "Бюджет: фиксированный или за результат",
  "Бриф: что говорить, что нельзя, ключевые сообщения",
  "Дедлайн",
];

const searchFilters =
  "Сфера, ниша, гео, размер аудитории, формат контента, скоринг — дальше прямой оффер внутри платформы (без директов).";

const escrowFlow = [
  "Оффер / заявка",
  "Одобрение",
  "Эскроу",
  "Бриф",
  "Согласование",
  "Публикация",
  "Выплата",
];

export default function BusinessesPage() {
  return (
    <div className="flex flex-col pt-14">
      <section className="hero-mesh border-b border-border/60 px-5 py-16 md:py-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="max-w-3xl mx-auto flex flex-col items-center gap-5"
        >
          <p className="text-xs font-semibold uppercase tracking-wider text-brand">Для бизнеса</p>
          <h1 className="text-display-md md:text-display-lg font-semibold tracking-tight text-foreground text-balance">
            AI-платформа инфлюенс-маркетинга в Казахстане
          </h1>
          <p className="text-base text-brand font-medium">Будущее рекламы — без менеджеров.</p>
          <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
            Jeli соединяет бизнес и инфлюенсеров напрямую и берёт на себя рутину, чтобы{" "}
            <strong className="text-foreground">вы не встраивались вручную в каждый этап рекламы</strong> — ни
            поиск, ни бриф, ни согласование, ни оплата не должны съедать команду целиком.
          </p>
          <Link
            href="/register"
            className="inline-flex items-center justify-center rounded-full bg-brand px-6 py-2.5 text-sm font-semibold text-white hover:bg-brand-hover transition-colors"
          >
            Создать аккаунт бизнеса
          </Link>
        </motion.div>
      </section>

      <motion.section {...section} className="py-14 px-5">
        <div className="max-w-3xl mx-auto rounded-2xl border border-border bg-card p-6 md:p-8 shadow-sm">
          <div className="flex items-center gap-2 text-brand mb-3">
            <Percent className="h-5 w-5" />
            <h2 className="text-lg font-semibold text-foreground">Бизнес-модель</h2>
          </div>
          <ul className="space-y-3 text-sm text-muted-foreground leading-relaxed">
            <li>
              <strong className="text-foreground">Транзакционная модель:</strong> с каждой успешной сделки через
              платформу Jeli получает процент. Чем больше честных интеграций, тем сильнее совпадают интересы
              платформы и пользователей.
            </li>
            <li>
              <strong className="text-foreground">Подписка:</strong> базовый доступ бесплатный (регистрация,
              просмотр). Полный функционал — мэтчинг, аналитика, создание кампаний, расширенный поиск — по
              подписке. Тарифы бизнеса: Бесплатно / Стандарт / Про — см. раздел{" "}
              <Link href="/pricing" className="text-brand font-medium hover:underline">
                Цены
              </Link>
              .
            </li>
          </ul>
        </div>
      </motion.section>

      <motion.section {...section} className="py-14 px-5 bg-muted/30 border-y border-border/60">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-2 mb-6">
            <Layers className="h-5 w-5 text-brand" />
            <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-foreground">
              Профиль бизнеса — основа всех кампаний
            </h2>
          </div>
          <p className="text-muted-foreground text-sm md:text-base max-w-2xl mb-8 leading-relaxed">
            Заполняется один раз и подставляется в подбор и брифы.
          </p>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {profileFields.map((item) => (
              <li
                key={item}
                className="rounded-xl border border-border bg-card px-4 py-3 text-sm text-muted-foreground leading-snug"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      </motion.section>

      <motion.section {...section} className="py-14 px-5">
        <div className="max-w-6xl mx-auto space-y-10">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 text-brand mb-3">
              <GitBranch className="h-6 w-6" />
              <p className="text-xs font-semibold uppercase tracking-wider">Две цепочки работы</p>
            </div>
            <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-foreground mb-3">
              Одна цель — меньше ручного контроля на каждом этапе
            </h2>
            <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
              У Jeli два независимых сценария: вы сами ведёте выбор авторов или запускаете кампанию и подключаете
              автоматизацию. В обоих случаях договорённости и деньги живут{" "}
              <strong className="text-foreground">внутри платформы</strong>, а не в десяти чатах.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6">
            <div className="rounded-2xl border border-border bg-card p-6 md:p-8 shadow-sm">
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand text-sm font-bold text-white shrink-0">
                  1
                </span>
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand/10 text-brand">
                  <Search className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-semibold text-foreground">Цепочка 1 — бренд ищет сам</h3>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                Вы заходите в каталог, фильтруете по нишам, гео, скорингу и формату, находите подходящих
                инфлюенсеров и отправляете оффер. {searchFilters}
              </p>
              <p className="text-sm text-foreground font-medium border-l-2 border-brand pl-4 py-1">
                Вся сделка ведётся через платформу: бриф, переписка, эскроу, статусы и история — без «давайте
                продолжим в WhatsApp». Вы подключаетесь там, где нужно решение бренда, а не на каждом микрошаге.
              </p>
            </div>

            <div className="rounded-2xl border-2 border-brand/25 bg-card p-6 md:p-8 shadow-sm ring-1 ring-brand/10">
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand text-sm font-bold text-white shrink-0">
                  2
                </span>
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand/10 text-brand">
                  <Sparkles className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-semibold text-foreground">Цепочка 2 — кампания и интерес инфлюенсеров</h3>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                Вы публикуете кампанию (цель, аудитория, формат, бюджет, бриф, дедлайн). Инфлюенсеры видят задачу
                и откликаются — либо вы выбираете из списка после ИИ-мэтча, либо работаете в формате открытой
                программы с заявками. Дальше возможны{" "}
                <strong className="text-foreground">два подпотока</strong> — в зависимости от типа продукта и того,
                насколько вы доверяете автоматизации.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="rounded-xl border border-border bg-muted/30 p-5 flex flex-col gap-3">
                  <div className="flex items-center gap-2 text-brand">
                    <Bot className="h-5 w-5 shrink-0" />
                    <span className="text-xs font-bold uppercase tracking-wide">2.1</span>
                  </div>
                  <h4 className="text-base font-semibold text-foreground">Цифровой / сервис без логистики товара</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Бренд может <strong className="text-foreground">доверить платформе</strong> подготовку ТЗ (ИИ
                    собирает структуру брифа из ваших вводных), первичную проверку контента ИИ — но{" "}
                    <strong className="text-foreground">финальный аппрув всегда остаётся за человеком</strong>.
                    После вашего одобрения деньги из эскроу{" "}
                    <strong className="text-foreground">зачисляются автоматически</strong> — без ручных переводов
                    после каждой публикации.
                  </p>
                </div>

                <div className="rounded-xl border border-border bg-muted/30 p-5 flex flex-col gap-3">
                  <div className="flex items-center gap-2 text-brand">
                    <Package className="h-5 w-5 shrink-0" />
                    <span className="text-xs font-bold uppercase tracking-wide">2.2</span>
                  </div>
                  <h4 className="text-base font-semibold text-foreground">Физический товар</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    <strong className="text-foreground">Партнёры платформы</strong> организуют отправку продукта
                    инфлюенсеру — вам не нужно вручную встраиваться в каждую накладную. После отгрузки контент
                    проходит проверку; <strong className="text-foreground">аппрув — у человека</strong>, затем
                    начисление автору. Цепочка «товар → контент → оплата» замкнута на Jeli и логистике-партнёре,
                    а не на личных звонках менеджера.
                  </p>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-border">
                <p className="text-xs font-semibold uppercase tracking-wider text-brand mb-2">Поля кампании</p>
                <ul className="text-sm text-muted-foreground grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1.5">
                  {campaignFields.map((f) => (
                    <li key={f} className="flex gap-2">
                      <span className="text-brand shrink-0">·</span>
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-dashed border-brand/40 bg-brand/5 px-5 py-4 flex gap-3 items-start">
            <UserCheck className="h-5 w-5 text-brand shrink-0 mt-0.5" />
            <p className="text-sm text-muted-foreground leading-relaxed">
              <strong className="text-foreground">Зачем это бизнесу:</strong> типичная боль — маркетинг тянет
              основателя или менеджера в каждый чат, каждую правку и каждый перевод. Jeli как раз про то, чтобы
              роль бренда свелась к стратегии и редким решениям (аппрувы), а рутину забрали платформа, ИИ и
              партнёры.
            </p>
          </div>
        </div>
      </motion.section>

      <motion.section {...section} className="py-14 px-5 bg-muted/30">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="h-5 w-5 text-brand" />
            <h2 className="text-2xl font-semibold tracking-tight text-foreground">Органичность рекламы</h2>
          </div>
          <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
            ИИ анализирует стиль контента инфлюенсера и может{" "}
            <strong className="text-foreground">предупредить бренд до оплаты</strong>, если тон брифа не совпадает
            с тем, как автор обычно общается с аудиторией (например, сухой официальный текст vs вечно шутящий
            блогер). Цель — меньше «фальшивой» рекламы и разочарований после съёмки.
          </p>
        </div>
      </motion.section>

      <motion.section {...section} className="py-14 px-5">
        <div className="max-w-4xl mx-auto flex flex-col gap-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-foreground mb-3">
              Цикл сделки end-to-end
            </h2>
            <p className="text-muted-foreground text-sm md:text-base leading-relaxed mb-2">
              Всё внутри Jeli: оффер → одобрение → деньги в escrow → бриф → согласование контента → публикация →
              разблокировка оплаты. Детали этапов, ИИ-проверка черновика и подтверждение через API соцсетей — на
              странице{" "}
              <Link href="/how" className="text-brand font-medium hover:underline">
                Как работает
              </Link>
              .
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-2 md:justify-start">
            <DealChain steps={escrowFlow} />
          </div>
          <div className="rounded-xl border border-dashed border-border bg-muted/20 p-4 text-xs text-muted-foreground leading-relaxed">
            <strong className="text-foreground">Эскроу сейчас описан нейтрально.</strong> В планах — реальное
            резервирование через казахстанское финтех-партнёрство (в обсуждении интеграции уровня Kaspi, Halyk,
            Freedom). Сроки объявим отдельно.
          </div>
        </div>
      </motion.section>

      <motion.section {...section} className="py-14 px-5 bg-muted/30 border-y border-border/60">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <BarChart3 className="h-5 w-5 text-brand" />
              <h2 className="text-xl font-semibold text-foreground">Аналитика и дашборд</h2>
            </div>
            <ul className="text-sm text-muted-foreground space-y-2 leading-relaxed">
              <li>По кампаниям: охваты, показы, engagement, клики, ROI.</li>
              <li>Сравнение инфлюенсеров между собой в рамках одной кампании.</li>
              <li>Со временем — рекомендации по истории: какие форматы и типы авторов давали лучший результат именно для вашего бизнеса.</li>
            </ul>
          </div>
          <div>
            <div className="flex items-center gap-2 mb-4">
              <RefreshCw className="h-5 w-5 text-brand" />
              <h2 className="text-xl font-semibold text-foreground">Анти-bias в выдаче</h2>
            </div>
            <ul className="text-sm text-muted-foreground space-y-2 leading-relaxed">
              <li>Ротация авторов, чтобы не крутить одних и тех же бесконечно.</li>
              <li>Временный буст новым аккаунтам с честным скорингом.</li>
              <li>Баланс микро (10–100k), макро (100k–1M) и мега (1M+): микро с живой аудиторией не прячется за миллионниками с мёртвой подписной базой.</li>
            </ul>
          </div>
        </div>
      </motion.section>

      <motion.section {...section} className="py-14 px-5">
        <div className="max-w-3xl mx-auto flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <Wallet className="h-5 w-5 text-brand" />
            <h2 className="text-xl font-semibold text-foreground">Бартер и сложные схемы</h2>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Отдельный флоу «бартер / продукт вместо денег» запланирован в продуктовой дорожке (v2) из‑за логистики
            и подтверждения получения. Следите за обновлениями.
          </p>
        </div>
      </motion.section>

      <section className="py-16 px-5 border-t border-border bg-muted/20">
        <motion.div
          {...section}
          className="max-w-xl mx-auto flex flex-col items-center text-center gap-6"
        >
          <Target className="h-8 w-8 text-brand" />
          <h2 className="text-2xl font-semibold tracking-tight text-foreground">Готовы описать первую кампанию?</h2>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href="/register"
              className="inline-flex items-center justify-center rounded-full bg-foreground px-6 py-2.5 text-sm font-medium text-background hover:opacity-90 transition-opacity"
            >
              Регистрация бизнеса
            </Link>
            <Link
              href="/how"
              className="inline-flex items-center justify-center rounded-full border border-border bg-background px-6 py-2.5 text-sm font-medium hover:bg-muted/60 transition-colors"
            >
              Как работает
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
