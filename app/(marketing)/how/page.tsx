"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  LayoutDashboard,
  MessageSquare,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { FeatureBar } from "@/components/marketing/FeatureBar";
import { DealTimeline } from "@/components/marketing/DealTimeline";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const section = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.45 },
};

/** Пошаговая сделка: кто инициирует действие и что фиксируется в продукте. */
const dealTimelineSteps = [
  {
    title: "Заявка или приглашение",
    who: "both" as const,
    description:
      "Бренд может опубликовать кампанию с условиями, а автор — откликнуться с предложением. Либо бренд приглашает конкретного автора. На этом этаже видно формат интеграции, ориентир по срокам и вилку вознаграждения — до принятия условий.",
  },
  {
    title: "Согласование участия",
    who: "both" as const,
    description:
      "Когда обе стороны нажимают «согласен», формируется карточка сделки: фиксируются роли, дедлайны и обязательные пункты (например, обязательные хэштеги или запрет на конкурентов). Пока статус не «активна», деньги не блокируются.",
  },
  {
    title: "Резервирование оплаты (эскроу)",
    who: "brand" as const,
    description:
      "Бренд переводит согласованную сумму на защищённый счёт платформы. Средства не уходят автору сразу: они зарезервированы под выполнение условий сделки. Автор видит, что бюджет подтверждён, и может начинать работу.",
  },
  {
    title: "Бриф и уточнения",
    who: "both" as const,
    description:
      "Внутри сделки лежит бриф: о продукте, ключевых сообщениях, формате (сторис, пост, обзор), ссылках и материалах. Переписка идёт в чате сделки, чтобы история решений не терялась в личных мессенджерах.",
  },
  {
    title: "Согласование материалов",
    who: "both" as const,
    description:
      "Автор загружает черновик или скрин публикации; бренд оставляет комментарии или одобряет. Количество итераций можно ограничить в условиях — это снижает бесконечные правки «на глаз».",
  },
  {
    title: "Публикация и подтверждение",
    who: "creator" as const,
    description:
      "Автор выкладывает контент по согласованному формату. В сделке фиксируется факт публикации (ссылка, скрин или отметка в зависимости от площадки). Если что-то не совпало с брифом, статус возвращается на доработку.",
  },
  {
    title: "Закрытие и выплата",
    who: "both" as const,
    description:
      "После выполнения условий платформа разблокирует оплату в пользу автора согласно правилам сделки. Если интеграция сорвана по вине автора или срокам — средства возвращаются бренду в рамках зафиксированных правил.",
  },
];

const brandJourney = [
  "Заполняете профиль компании и цели кампаний.",
  "Ищете авторов по нишам и скорингу или публикуете открытую задачу.",
  "Согласовываете условия и резервируете бюджет в эскроу.",
  "Согласуете контент и принимаете публикацию.",
];

const creatorJourney = [
  "Подключаете соцсети для расчёта скоринга и указываете ниши (родительская + дочерние теги).",
  "Откликаетесь на кампании или получаете приглашения от брендов.",
  "Ведёте бриф и согласование в чате сделки.",
  "Публикуете контент и получаете оплату после закрытия сделки.",
];

const escrowPoints = [
  {
    title: "Когда деньги списываются с бренда",
    text: "После явного согласия с условиями сделки и перехода к этапу резервирования — до начала публикации.",
  },
  {
    title: "Когда автор получает выплату",
    text: "Когда сделка переведена в статус «выполнена»: условия брифа соблюдены, публикация подтверждена, спорных пунктов нет.",
  },
  {
    title: "Если что-то пошло не так",
    text: "Нарушение сроков или невыполнение брифа фиксируется в карточке сделки. Возврат бренду или доработка — по правилам, которые стороны приняли при старте (без устных договорённостей «в обход» платформы).",
  },
];

const whereInApp = [
  {
    title: "Главная",
    desc: "Сводка: рекомендации, открытые действия, вход в активные сделки и кампании.",
    icon: LayoutDashboard,
  },
  {
    title: "Чат",
    desc: "Переписка привязана к сделке или к диалогу до старта — не смешивается с личной почтой.",
    icon: MessageSquare,
  },
  {
    title: "Сделки",
    desc: "Единственное место, где видны статус, дедлайны, бриф, файлы и история согласований.",
    icon: ShieldCheck,
  },
  {
    title: "Профиль",
    desc: "Настройки аккаунта, видимость для брендов, показатели и рейтинг после завершённых интеграций.",
    icon: Sparkles,
  },
];

const faqItems = [
  {
    q: "Обязательно ли проходить все этапы, как в описании?",
    a: "Логика одна, но часть шагов может сжиматься: например, если бренд и автор уже знакомы и бриф минимальный. Важно, чтобы критичные вещи — условия, эскроу при оплате, фиксация публикации — остались внутри платформы.",
  },
  {
    q: "Кто видит мой скоринг?",
    a: "Скоринг и связанные с ним сигналы видят бренды при поиске и в карточке автора в объёме, необходимом для принятия решения. Точные формулы и сырые данные API не раскрываются третьим лицам.",
  },
  {
    q: "Можно ли вывести общение в WhatsApp или Instagram?",
    a: "Технически никто не запрещает, но юридически и операционно безопаснее держать бриф, согласование и споры в чате сделки — иначе платформа не сможет восстановить историю при конфликте.",
  },
  {
    q: "Какие сети учитываются в скоринге?",
    a: "На старте — Instagram, TikTok и YouTube через официальные подключения. Ручной ввод метрик для скоринга не используется.",
  },
  {
    q: "Платит ли автор за использование Jeli?",
    a: "Базовый доступ есть и для брендов, и для авторов; расширенные функции зависят от тарифа. Актуальные условия — в разделе «Цены».",
  },
];

export default function HowPage() {
  return (
    <div className="flex flex-col pt-14">
      <section className="hero-mesh border-b border-border/60 px-5 py-16 md:py-20">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className="flex flex-col gap-5"
          >
            <p className="text-sm font-medium text-muted-foreground">Документация процесса</p>
            <h1 className="text-display-md md:text-display-lg font-semibold tracking-tight text-foreground text-balance">
              Как устроена работа в Jeli
            </h1>
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed text-balance">
              Здесь — не рекламный тезис, а схема: какие роли есть, в каком порядке двигается сделка, где
              лежат деньги и какие решения фиксируются в интерфейсе. Если чего-то ещё нет в продукте, мы так и
              напишем в FAQ по мере запуска.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Два параллельных пути — на главной этого блока нет */}
      <motion.section {...section} className="py-16 md:py-20 px-5">
        <div className="max-w-6xl mx-auto">
          <div className="max-w-2xl mb-10 md:mb-12">
            <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-foreground">
              Два входа — одна логика сделки
            </h2>
            <p className="mt-3 text-muted-foreground text-sm md:text-base leading-relaxed">
              Бренд и автор начинают с разных задач, но сходятся в одной карточке сделки с чатом, брифом и
              статусами.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="rounded-2xl border border-border bg-card p-6 md:p-8 shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-wider text-brand mb-4">Со стороны бренда</p>
              <ol className="space-y-4">
                {brandJourney.map((item, i) => (
                  <li key={i} className="flex gap-3 text-sm text-muted-foreground leading-relaxed">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-muted text-xs font-semibold text-foreground">
                      {i + 1}
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ol>
            </div>
            <div className="rounded-2xl border border-border bg-card p-6 md:p-8 shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-wider text-brand mb-4">Со стороны автора</p>
              <ol className="space-y-4">
                {creatorJourney.map((item, i) => (
                  <li key={i} className="flex gap-3 text-sm text-muted-foreground leading-relaxed">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-muted text-xs font-semibold text-foreground">
                      {i + 1}
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Таймлайн сделки — детализация, не дубль «трёх шагов» с главной */}
      <motion.section {...section} className="py-16 md:py-20 px-5 bg-muted/30 border-y border-border/60">
        <div className="max-w-6xl mx-auto">
          <div className="max-w-2xl mb-10 md:mb-14">
            <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-foreground">
              Этапы одной интеграции
            </h2>
            <p className="mt-3 text-muted-foreground text-sm md:text-base leading-relaxed">
              Ниже — типовой маршрут от первого контакта до выплаты. Названия статусов в продукте могут слегка
              отличаться, но смысл этапов сохраняется.
            </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            <DealTimeline steps={dealTimelineSteps} />
            <div className="rounded-2xl border border-border bg-card p-6 text-sm text-muted-foreground leading-relaxed space-y-3">
              <p className="font-medium text-foreground">Зачем столько шагов</p>
              <p>
                Каждый этап оставляет след в системе: проще разобрать спор, передать кампанию другому
                менеджеру и понять, на каком месте «застряла» интеграция.
              </p>
              <p>
                Для повторных коллабораций между теми же сторонами часть шагов проходит быстрее — шаблоны брифа
                и доверие к процессу уже есть.
              </p>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Деньги — отдельный фокус; на главной только кратко */}
      <motion.section {...section} className="py-16 md:py-20 px-5">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-foreground mb-3">
            Деньги и обязательства
          </h2>
          <p className="text-muted-foreground text-sm md:text-base max-w-2xl leading-relaxed mb-10">
            Эскроу в Jeli — это не отдельный «банк», а правило платформы: деньги резервируются под конкретную
            сделку и двигаются по понятным триггерам.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {escrowPoints.map((block) => (
              <div
                key={block.title}
                className="rounded-2xl border border-border bg-card p-5 shadow-sm flex flex-col gap-2"
              >
                <h3 className="text-sm font-semibold text-foreground leading-snug">{block.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{block.text}</p>
              </div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Скоринг — формула, без повтора «проблемы рынка» с главной */}
      <motion.section {...section} className="py-16 md:py-20 px-5 bg-muted/30">
        <div className="max-w-3xl mx-auto flex flex-col gap-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-foreground mb-3">
              Из чего складывается скоринг автора
            </h2>
            <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
              Скоринг — не «оценка творчества», а сводный сигнал для бренда: насколько аудитория похожа на
              живую и стабильную. Веса ниже — ориентир; мы можем менять их, чтобы лучше отражать качество
              площадок.
            </p>
          </div>
          <div className="flex flex-col gap-3">
            <FeatureBar
              text="Вовлечённость аудитории (реакции и комментарии относительно охвата)"
              badge="40%"
              delay={0}
            />
            <FeatureBar
              text="Качество комментариев — отсев шаблонных и ботоподобных ответов"
              badge="25%"
              delay={0.06}
            />
            <FeatureBar text="Стабильность охватов от поста к посту" badge="20%" delay={0.12} />
            <FeatureBar text="Динамика роста аккаунта без аномальных скачков" badge="15%" delay={0.18} />
          </div>
        </div>
      </motion.section>

      {/* Матчинг по нишам — теория, без трёх демо-карточек как на главной */}
      <motion.section {...section} className="py-16 md:py-20 px-5">
        <div className="max-w-3xl mx-auto space-y-6">
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-foreground">
            Почему у нас два уровня ниш
          </h2>
          <div className="max-w-none text-sm md:text-base text-muted-foreground leading-relaxed space-y-4">
            <p>
              Категория вроде «фитнес» слишком широкая: и постpartum, и бодибилдинг попадают в один ящик. В
              Jeli автор указывает <strong className="text-foreground">родительскую сферу</strong> и одну или
              несколько <strong className="text-foreground">узких ниш</strong> внутри неё.
            </p>
            <p>
              Бренд при создании кампании задаёт те же оси: не только «кто мы», но и «какая аудитория нам
              нужна». Подбор и рекомендации сравнивают эти деревья тегов, а не только общую категорию.
            </p>
            <p className="rounded-xl border border-border bg-muted/40 px-4 py-3 text-foreground">
              Пример: родительский тег «Еда» + дочерние «веганская кухня» и «рестораны Алматы» дают совсем
              разные мэтчи — и бренд это видит до старта переговоров.
            </p>
          </div>
        </div>
      </motion.section>

      {/* Где в интерфейсе — не дублируем маркетинговые формулировки главной */}
      <motion.section {...section} className="py-16 md:py-20 px-5 bg-muted/30 border-t border-border/60">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-foreground mb-3 text-center md:text-left">
            Куда нажимать в продукте
          </h2>
          <p className="text-muted-foreground text-sm md:text-base max-w-2xl mx-auto md:mx-0 mb-10 text-center md:text-left">
            Коротко: за какой раздел отвечает какая задача, чтобы не искать переписку в пяти вкладках.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {whereInApp.map(({ title, desc, icon: Icon }) => (
              <div
                key={title}
                className="rounded-2xl border border-border bg-card px-5 py-4 flex gap-4 shadow-sm text-left"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-muted text-foreground">
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

      <motion.section {...section} className="py-16 md:py-20 px-5">
        <div className="max-w-3xl mx-auto flex flex-col gap-8">
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-foreground">
            Вопросы по процессу
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

      <section className="py-14 px-5 border-t border-border bg-muted/20">
        <div className="max-w-3xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <p className="text-sm text-muted-foreground leading-relaxed">
            Дальше — тарифы и ответы про оплату сервиса, или напишите нам через контакты.
          </p>
          <div className="flex flex-wrap gap-3 shrink-0">
            <Link
              href="/pricing"
              className="inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-2.5 text-sm font-medium text-background hover:opacity-90 transition-opacity"
            >
              Тарифы
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/contacts"
              className="inline-flex items-center rounded-full border border-border bg-background px-5 py-2.5 text-sm font-medium text-foreground hover:bg-muted/60 transition-colors"
            >
              Контакты
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
