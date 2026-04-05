"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { useState } from "react";
import {
  ArrowLeft, MapPin, CheckCircle2, Star, Clock, FileCheck, CalendarCheck,
  Send, Bookmark, ExternalLink, Zap, TrendingUp, Eye, Heart, Users, Shield
} from "lucide-react";
import { MOCK_INFLUENCERS, Influencer } from "@/lib/mock-data";
import { SubGrowthChart } from "@/components/platform/charts/SubGrowthChart";
import { ViewsChart } from "@/components/platform/charts/ViewsChart";
import { GenderChart, AgeChart, GeoChart } from "@/components/platform/charts/AudienceCharts";

// ─── Helpers ──────────────────────────────────────────────────────────────────

function fmt(n: number) {
  if (n >= 1000000) return `${(n / 1000000).toFixed(1)}M`;
  if (n >= 1000) return `${Math.round(n / 1000)}K`;
  return String(n);
}

function fmtMoney(n: number) {
  return `${n.toLocaleString("ru-KZ")} ₸`;
}

function scoreColor(s: number) {
  if (s >= 80) return "text-[#22C55E] bg-[#22C55E]/10";
  if (s >= 60) return "text-[#EAB308] bg-[#EAB308]/10";
  return "text-[#EF4444] bg-[#EF4444]/10";
}

function platformLabel(p: string) {
  return { tiktok: "TikTok", instagram: "Instagram", youtube: "YouTube" }[p] || p;
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function KpiCard({ label, value, sub, icon, accent }: {
  label: string; value: string; sub?: string; icon: React.ReactNode; accent?: boolean;
}) {
  return (
    <div className={`rounded-xl p-4 flex flex-col gap-2 ${accent ? "bg-[#0064FF]/10 border border-[#0064FF]/20" : "bg-[#111] border border-white/[0.06]"}`}>
      <div className="flex items-center justify-between">
        <span className="text-[11px] text-white/40">{label}</span>
        <span className={accent ? "text-[#0064FF]" : "text-white/30"}>{icon}</span>
      </div>
      <p className={`text-xl font-bold ${accent ? "text-[#0064FF]" : "text-white"}`}>{value}</p>
      {sub && <p className="text-[11px] text-white/30">{sub}</p>}
    </div>
  );
}

function RatingBar({ label, value }: { label: string; value: number }) {
  return (
    <div className="flex items-center gap-3">
      <span className="text-xs text-white/40 w-36 shrink-0">{label}</span>
      <div className="flex-1 h-1.5 bg-white/5 rounded-full overflow-hidden">
        <div className="h-full bg-[#0064FF] rounded-full" style={{ width: `${(value / 5) * 100}%` }} />
      </div>
      <span className="text-xs font-semibold text-white w-6 text-right">{value.toFixed(1)}</span>
    </div>
  );
}

// ─── Not Found ────────────────────────────────────────────────────────────────

function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center py-32 gap-4">
      <p className="text-white/30 text-sm">Блогер не найден</p>
      <Link href="/app/influencers" className="text-sm text-[#0064FF] hover:underline flex items-center gap-1">
        <ArrowLeft className="w-3.5 h-3.5" /> Вернуться к каталогу
      </Link>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function InfluencerProfilePage() {
  const { id } = useParams<{ id: string }>();
  const inf: Influencer | undefined = MOCK_INFLUENCERS.find((i) => i.id === id);
  const [saved, setSaved] = useState(false);

  if (!inf) return <NotFound />;

  const growthDelta = inf.subscriberGrowth.length >= 2
    ? inf.subscriberGrowth[inf.subscriberGrowth.length - 1].subscribers - inf.subscriberGrowth[0].subscribers
    : 0;

  return (
    <div className="flex flex-col gap-6 max-w-6xl mx-auto">
      {/* Back */}
      <Link
        href="/app/influencers"
        className="inline-flex items-center gap-1.5 text-sm text-white/40 hover:text-white transition-colors w-fit"
      >
        <ArrowLeft className="w-4 h-4" />
        Каталог блогеров
      </Link>

      {/* ── 1. Header ──────────────────────────────────────────────────────── */}
      <div className="bg-[#111] border border-white/[0.06] rounded-2xl p-6 flex flex-col lg:flex-row gap-6">
        {/* Left: avatar + info */}
        <div className="flex items-start gap-4 flex-1">
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center text-white text-2xl font-bold shrink-0"
            style={{ background: inf.avatarColor }}
          >
            {inf.name.charAt(0)}
          </div>
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="text-xl font-bold text-white">{inf.name}</h1>
              {inf.verified && <CheckCircle2 className="w-4.5 h-4.5 text-[#0064FF]" />}
              <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${scoreColor(inf.jeliScore)}`}>
                Jeli Score {inf.jeliScore}
              </span>
            </div>
            <p className="text-sm text-white/40">@{inf.username}</p>
            <div className="flex items-center gap-3 flex-wrap mt-0.5">
              <span className="flex items-center gap-1 text-xs text-white/40">
                <MapPin className="w-3 h-3" />{inf.city}
              </span>
              <span className="text-xs bg-white/[0.06] text-white/60 px-2 py-0.5 rounded-full">
                {platformLabel(inf.platform)}
              </span>
              {inf.niches.map((n) => (
                <span key={n} className="text-xs bg-[#0064FF]/10 text-[#0064FF] px-2 py-0.5 rounded-full">
                  {n}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Right: actions */}
        <div className="flex flex-col gap-2 lg:items-end">
          <button className="flex items-center gap-2 bg-[#0064FF] text-white text-sm font-semibold px-5 py-2.5 rounded-xl hover:bg-[#0052CC] transition-colors">
            <Send className="w-4 h-4" />
            Отправить оффер
          </button>
          <div className="flex gap-2">
            <button
              onClick={() => setSaved(!saved)}
              className={`flex items-center gap-1.5 text-sm px-3 py-2 rounded-lg border transition-colors ${saved ? "bg-[#0064FF]/10 border-[#0064FF]/30 text-[#0064FF]" : "border-white/[0.06] text-white/40 hover:text-white hover:border-white/20"}`}
            >
              <Bookmark className="w-4 h-4" />
              {saved ? "Сохранено" : "Сохранить"}
            </button>
            <button className="flex items-center gap-1.5 text-sm px-3 py-2 rounded-lg border border-white/[0.06] text-white/40 hover:text-white hover:border-white/20 transition-colors">
              <ExternalLink className="w-4 h-4" />
              Профиль
            </button>
          </div>
          {inf.matchPercent !== undefined && (
            <p className="text-xs text-[#22C55E] font-medium">{inf.matchPercent}% совпадение с кампанией</p>
          )}
        </div>
      </div>

      {/* ── 2. KPI Grid ────────────────────────────────────────────────────── */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        <KpiCard label="Подписчики" value={fmt(inf.followers)} icon={<Users className="w-3.5 h-3.5" />} />
        <KpiCard label="Ср. просмотры" value={fmt(inf.avgViews)} icon={<Eye className="w-3.5 h-3.5" />} />
        <KpiCard label="ER%" value={`${inf.erPercent}%`} icon={<Heart className="w-3.5 h-3.5" />} />
        <KpiCard
          label="Индекс спроса"
          value={String(inf.demandIndex)}
          sub="из 100"
          icon={<TrendingUp className="w-3.5 h-3.5" />}
        />
        <KpiCard
          label="Лояльность"
          value={String(inf.loyaltyIndex)}
          sub="из 100"
          icon={<Zap className="w-3.5 h-3.5" />}
          accent
        />
        <KpiCard
          label="Живая аудитория"
          value={`${inf.realFollowersPercent}%`}
          icon={<Shield className="w-3.5 h-3.5" />}
        />
      </div>

      {/* ── 3. Charts ──────────────────────────────────────────────────────── */}
      {(inf.subscriberGrowth.length > 0 || inf.recentViews.length > 0) && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Subscriber Growth */}
          {inf.subscriberGrowth.length > 0 && (
            <div className="bg-[#111] border border-white/[0.06] rounded-xl p-5">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-sm font-semibold text-white">Рост подписчиков</h2>
                  <p className="text-[11px] text-white/30 mt-0.5">12 месяцев</p>
                </div>
                {growthDelta > 0 && (
                  <span className="text-xs text-[#22C55E] bg-[#22C55E]/10 px-2.5 py-1 rounded-full font-medium">
                    +{fmt(growthDelta)} за год
                  </span>
                )}
              </div>
              <SubGrowthChart data={inf.subscriberGrowth} />
            </div>
          )}

          {/* Recent Views */}
          {inf.recentViews.length > 0 && (
            <div className="bg-[#111] border border-white/[0.06] rounded-xl p-5">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-sm font-semibold text-white">Просмотры по видео</h2>
                  <p className="text-[11px] text-white/30 mt-0.5">Последние {inf.recentViews.length} публикаций</p>
                </div>
                <span className="text-xs text-white/40">
                  Ср: {fmt(Math.round(inf.recentViews.reduce((a, b) => a + b, 0) / inf.recentViews.length))}
                </span>
              </div>
              <ViewsChart data={inf.recentViews} />
            </div>
          )}
        </div>
      )}

      {/* ── 4. Audience Demographics ───────────────────────────────────────── */}
      <div className="bg-[#111] border border-white/[0.06] rounded-xl p-5">
        <h2 className="text-sm font-semibold text-white mb-5">Аудитория</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Gender */}
          <div>
            <p className="text-xs text-white/40 mb-3">Пол</p>
            <GenderChart male={inf.audience.gender.male} female={inf.audience.gender.female} />
          </div>
          {/* Age */}
          <div>
            <p className="text-xs text-white/40 mb-1">Возраст</p>
            <AgeChart data={inf.audience.age} />
          </div>
          {/* Geo */}
          <div>
            <p className="text-xs text-white/40 mb-3">География</p>
            <GeoChart cities={inf.audience.topCities} />
            <div className="mt-4 pt-4 border-t border-white/[0.06] flex items-center gap-2">
              <Shield className="w-3.5 h-3.5 text-[#22C55E]" />
              <span className="text-xs text-white/40">Живая аудитория</span>
              <span className="text-xs font-semibold text-[#22C55E] ml-auto">{inf.realFollowersPercent}%</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── 5. Content Analysis ────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Top Rubrics */}
        {inf.topRubrics.length > 0 && (
          <div className="bg-[#111] border border-white/[0.06] rounded-xl p-5">
            <h2 className="text-sm font-semibold text-white mb-4">Топ рубрики</h2>
            <div className="flex flex-col gap-3">
              {inf.topRubrics.map((r, i) => (
                <div key={r.name} className="flex items-center gap-3">
                  <span className="text-xs text-white/20 w-4">{i + 1}</span>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs text-white/70">{r.name}</span>
                      <span className="text-xs text-white/40">{fmt(r.avgReach)}</span>
                    </div>
                    <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full bg-[#0064FF]"
                        style={{ width: `${(r.avgReach / inf.topRubrics[0].avgReach) * 100}%`, opacity: 1 - i * 0.12 }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Trending + Frequency */}
        <div className="flex flex-col gap-4">
          {inf.trendingTopics.length > 0 && (
            <div className="bg-[#111] border border-white/[0.06] rounded-xl p-5">
              <h2 className="text-sm font-semibold text-white mb-3">Трендовые темы</h2>
              <div className="flex flex-wrap gap-2">
                {inf.trendingTopics.map((t) => (
                  <span key={t} className="text-xs bg-[#22C55E]/10 text-[#22C55E] px-3 py-1.5 rounded-full border border-[#22C55E]/20">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          )}
          <div className="bg-[#111] border border-white/[0.06] rounded-xl p-5">
            <h2 className="text-sm font-semibold text-white mb-3">Частота публикаций</h2>
            <p className="text-3xl font-bold text-white">
              {inf.publishFrequency}
              <span className="text-sm font-normal text-white/30 ml-1">раз/нед</span>
            </p>
            <p className="text-xs text-white/30 mt-1">
              {inf.publishFrequency >= 3 ? "Высокая активность" : inf.publishFrequency >= 2 ? "Средняя активность" : "Низкая активность"}
            </p>
          </div>
        </div>
      </div>

      {/* ── 6. Reviews & Collaborations ────────────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Reviews */}
        <div className="bg-[#111] border border-white/[0.06] rounded-xl p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold text-white">Оценки от брендов</h2>
            <div className="flex items-center gap-1.5">
              <Star className="w-3.5 h-3.5 text-[#EAB308] fill-[#EAB308]" />
              <span className="text-sm font-bold text-white">{inf.reviews.avgRating.toFixed(1)}</span>
            </div>
          </div>
          <div className="flex flex-col gap-3 mb-5">
            <RatingBar label="Время ответа" value={inf.reviews.responseTime} />
            <RatingBar label="Соответствие брифу" value={inf.reviews.briefCompliance} />
            <RatingBar label="Пунктуальность" value={inf.reviews.punctuality} />
          </div>
          {inf.reviews.comments.length > 0 && (
            <div className="flex flex-col gap-3">
              <p className="text-xs text-white/30">Отзывы</p>
              {inf.reviews.comments.map((c, i) => (
                <div key={i} className="bg-white/[0.03] border border-white/[0.04] rounded-lg p-3">
                  <p className="text-xs text-white/60 leading-relaxed">{c}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Collaborations */}
        <div className="bg-[#111] border border-white/[0.06] rounded-xl p-5">
          <h2 className="text-sm font-semibold text-white mb-4">Коллаборации</h2>
          <div className="flex flex-col gap-3">
            {inf.reviews.collaborations.map((c, i) => (
              <div key={i} className="flex items-center gap-3 py-2.5 border-b border-white/[0.04] last:border-0">
                <div className="w-8 h-8 rounded-lg bg-white/[0.06] flex items-center justify-center text-xs font-bold text-white/60">
                  {c.brand.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium text-white truncate">{c.brand}</p>
                  <p className="text-[11px] text-white/30">{c.niche}</p>
                </div>
                <span className="text-[11px] text-white/30 shrink-0">{c.date}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── 7. Price List ──────────────────────────────────────────────────── */}
      <div className="bg-[#111] border border-white/[0.06] rounded-xl p-5">
        <div className="flex items-start justify-between mb-5">
          <div>
            <h2 className="text-sm font-semibold text-white">Прайс-лист</h2>
            <p className="text-[11px] text-white/30 mt-0.5">Рекомендованные форматы размещения</p>
          </div>
          {/* AI Recommendation */}
          <div className="bg-[#0064FF]/10 border border-[#0064FF]/20 rounded-xl px-4 py-3 max-w-xs">
            <div className="flex items-center gap-1.5 mb-1.5">
              <Zap className="w-3.5 h-3.5 text-[#0064FF]" />
              <span className="text-xs font-semibold text-[#0064FF]">ИИ-рекомендация</span>
            </div>
            <p className="text-xs text-white/60 leading-relaxed">
              Лучший формат для вашей кампании — <strong className="text-white">TikTok видео</strong>. CPM {fmt(inf.priceList.find(p => p.format === "TikTok видео")?.cpm || 0)} ₸ — самый низкий в вашей категории.
            </p>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/[0.06]">
                <th className="text-left text-xs text-white/30 font-normal pb-3">Формат</th>
                <th className="text-right text-xs text-white/30 font-normal pb-3">Цена</th>
                <th className="text-right text-xs text-white/30 font-normal pb-3">Прогноз охвата</th>
                <th className="text-right text-xs text-white/30 font-normal pb-3">CPM</th>
                <th className="text-right pb-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.04]">
              {inf.priceList.map((row, i) => (
                <tr key={i} className="group">
                  <td className="py-3.5 text-sm text-white font-medium">{row.format}</td>
                  <td className="py-3.5 text-right text-sm text-white font-semibold">{fmtMoney(row.price)}</td>
                  <td className="py-3.5 text-right text-xs text-white/50">{fmt(row.reachForecast)}</td>
                  <td className="py-3.5 text-right">
                    <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${row.cpm < 600 ? "text-[#22C55E] bg-[#22C55E]/10" : row.cpm < 1500 ? "text-[#EAB308] bg-[#EAB308]/10" : "text-white/40 bg-white/5"}`}>
                      {row.cpm} ₸
                    </span>
                  </td>
                  <td className="py-3.5 text-right">
                    <button className="text-xs text-[#0064FF] opacity-0 group-hover:opacity-100 transition-opacity hover:underline">
                      Добавить
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-5 pt-4 border-t border-white/[0.06] flex items-center justify-between">
          <p className="text-xs text-white/30">Цены актуальны на апрель 2025 · Возможен торг</p>
          <button className="flex items-center gap-2 bg-[#0064FF] text-white text-sm font-semibold px-5 py-2.5 rounded-xl hover:bg-[#0052CC] transition-colors">
            <Send className="w-4 h-4" />
            Отправить оффер
          </button>
        </div>
      </div>

      {/* Rating icons legend */}
      <div className="flex items-center gap-4 text-[11px] text-white/20 pb-2">
        <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> Время ответа</span>
        <span className="flex items-center gap-1"><FileCheck className="w-3 h-3" /> Бриф</span>
        <span className="flex items-center gap-1"><CalendarCheck className="w-3 h-3" /> Пунктуальность</span>
      </div>
    </div>
  );
}
