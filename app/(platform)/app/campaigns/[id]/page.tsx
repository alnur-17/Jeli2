"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { useState } from "react";
import { ArrowLeft, ExternalLink, Eye, MousePointerClick, TrendingUp, Users, DollarSign } from "lucide-react";
import { MOCK_CAMPAIGNS, Campaign, CampaignInfluencer } from "@/lib/mock-data";

// ─── Helpers ──────────────────────────────────────────────────────────────────

function fmt(n: number) {
  if (n >= 1000000) return `${(n / 1000000).toFixed(1)}M`;
  if (n >= 1000) return `${Math.round(n / 1000)}K`;
  return String(n);
}

function fmtMoney(n: number) {
  return `${n.toLocaleString("ru-KZ")} ₸`;
}

const STATUS_META: Record<Campaign["status"], { label: string; color: string }> = {
  draft:     { label: "Черновик",    color: "text-white/40 bg-white/[0.06]" },
  active:    { label: "Активна",     color: "text-[#22C55E] bg-[#22C55E]/10" },
  review:    { label: "На проверке", color: "text-[#EAB308] bg-[#EAB308]/10" },
  completed: { label: "Завершена",   color: "text-white/40 bg-white/[0.06]" },
};

const INF_STATUS: Record<CampaignInfluencer["status"], { label: string; color: string }> = {
  invited:   { label: "Приглашён",    color: "text-white/40 bg-white/[0.06]" },
  accepted:  { label: "Принял",       color: "text-[#EAB308] bg-[#EAB308]/10" },
  review:    { label: "На проверке",  color: "text-[#3B82F6] bg-[#3B82F6]/10" },
  published: { label: "Опубликовано", color: "text-[#22C55E] bg-[#22C55E]/10" },
};

const TABS = ["Обзор", "Блогеры", "Аналитика", "Финансы"] as const;
type Tab = typeof TABS[number];

// ─── Tab: Overview ────────────────────────────────────────────────────────────

function OverviewTab({ c }: { c: Campaign }) {
  const budgetPct = c.budget > 0 ? Math.min((c.spent / c.budget) * 100, 100) : 0;
  return (
    <div className="flex flex-col gap-4">
      {/* KPI grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {[
          { label: "Охват",    value: c.reach  > 0 ? fmt(c.reach)  : "—", icon: <Eye className="w-3.5 h-3.5" /> },
          { label: "Клики",    value: c.clicks > 0 ? fmt(c.clicks) : "—", icon: <MousePointerClick className="w-3.5 h-3.5" /> },
          { label: "ER%",      value: c.er     > 0 ? `${c.er}%`    : "—", icon: <TrendingUp className="w-3.5 h-3.5" /> },
          { label: "Блогеры",  value: String(c.influencersCount),            icon: <Users className="w-3.5 h-3.5" /> },
        ].map(({ label, value, icon }) => (
          <div key={label} className="bg-[#111] border border-white/[0.06] rounded-xl p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] text-white/30">{label}</span>
              <span className="text-white/30">{icon}</span>
            </div>
            <p className="text-xl font-bold text-white">{value}</p>
          </div>
        ))}
      </div>

      {/* Campaign details */}
      <div className="bg-[#111] border border-white/[0.06] rounded-xl p-5">
        <h3 className="text-sm font-semibold text-white mb-4">Детали кампании</h3>
        <div className="grid grid-cols-2 gap-4">
          {[
            { label: "Ниша", value: c.niche },
            { label: "Платформа", value: { tiktok: "TikTok", instagram: "Instagram", youtube: "YouTube" }[c.platform] || c.platform },
            { label: "Начало", value: c.startDate },
            { label: "Конец", value: c.endDate },
          ].map(({ label, value }) => (
            <div key={label}>
              <p className="text-[11px] text-white/30 mb-0.5">{label}</p>
              <p className="text-sm text-white">{value}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Budget */}
      <div className="bg-[#111] border border-white/[0.06] rounded-xl p-5">
        <h3 className="text-sm font-semibold text-white mb-4">Бюджет</h3>
        <div className="flex justify-between text-xs mb-2">
          <span className="text-white/40">Потрачено</span>
          <span className="text-white">{fmtMoney(c.spent)} / {fmtMoney(c.budget)}</span>
        </div>
        <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden mb-3">
          <div className="h-full rounded-full bg-[#0064FF]" style={{ width: `${budgetPct}%` }} />
        </div>
        <div className="flex justify-between text-[11px] text-white/30">
          <span>{budgetPct.toFixed(0)}% использовано</span>
          <span>Остаток: {fmtMoney(c.budget - c.spent)}</span>
        </div>
      </div>
    </div>
  );
}

// ─── Tab: Influencers ─────────────────────────────────────────────────────────

function InfluencersTab({ c }: { c: Campaign }) {
  if (c.influencers.length === 0) {
    return (
      <div className="bg-[#111] border border-white/[0.06] rounded-xl p-10 text-center">
        <p className="text-sm text-white/30">Блогеры ещё не добавлены</p>
        <Link href="/app/influencers" className="mt-3 inline-block text-sm text-[#0064FF] hover:underline">
          Найти блогеров →
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-[#111] border border-white/[0.06] rounded-xl overflow-hidden">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-white/[0.06]">
            <th className="text-left text-xs text-white/30 font-normal px-5 py-3.5">Блогер</th>
            <th className="text-right text-xs text-white/30 font-normal px-5 py-3.5">Цена</th>
            <th className="text-right text-xs text-white/30 font-normal px-5 py-3.5">Охват</th>
            <th className="text-center text-xs text-white/30 font-normal px-5 py-3.5">Статус</th>
            <th className="px-5 py-3.5" />
          </tr>
        </thead>
        <tbody className="divide-y divide-white/[0.04]">
          {c.influencers.map((inf) => {
            const s = INF_STATUS[inf.status];
            return (
              <tr key={inf.id} className="group hover:bg-white/[0.02] transition-colors">
                <td className="px-5 py-3.5">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0"
                      style={{ background: inf.avatarColor }}
                    >
                      {inf.name.charAt(0)}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-white">{inf.name}</p>
                      <p className="text-[11px] text-white/30">@{inf.username}</p>
                    </div>
                  </div>
                </td>
                <td className="px-5 py-3.5 text-right text-sm text-white">{fmtMoney(inf.price)}</td>
                <td className="px-5 py-3.5 text-right text-sm text-white/60">
                  {inf.reach > 0 ? fmt(inf.reach) : "—"}
                </td>
                <td className="px-5 py-3.5 text-center">
                  <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${s.color}`}>{s.label}</span>
                </td>
                <td className="px-5 py-3.5 text-right">
                  <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Link href={`/app/influencers/${inf.id}`} className="text-xs text-white/40 hover:text-white">
                      Профиль
                    </Link>
                    {inf.contentUrl && (
                      <a href={inf.contentUrl} className="text-xs text-[#0064FF] flex items-center gap-0.5">
                        Контент <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

// ─── Tab: Analytics ───────────────────────────────────────────────────────────

function AnalyticsTab({ c }: { c: Campaign }) {
  const ctr = c.reach > 0 ? ((c.clicks / c.reach) * 100).toFixed(2) : "—";
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {[
        { label: "Суммарный охват", value: c.reach > 0 ? fmt(c.reach) : "—", sub: "уникальных просмотров" },
        { label: "Кликов по ссылке", value: c.clicks > 0 ? fmt(c.clicks) : "—", sub: "переходов" },
        { label: "CTR", value: typeof ctr === "string" ? `${ctr}%` : "—", sub: "кликов / охват" },
        { label: "Engagement Rate", value: c.er > 0 ? `${c.er}%` : "—", sub: "вовлечённость аудитории" },
      ].map(({ label, value, sub }) => (
        <div key={label} className="bg-[#111] border border-white/[0.06] rounded-xl p-5">
          <p className="text-xs text-white/30 mb-2">{label}</p>
          <p className="text-2xl font-bold text-white mb-1">{value}</p>
          <p className="text-[11px] text-white/20">{sub}</p>
        </div>
      ))}
    </div>
  );
}

// ─── Tab: Finance ─────────────────────────────────────────────────────────────

function FinanceTab({ c }: { c: Campaign }) {
  const commission = Math.round(c.spent * 0.075);
  return (
    <div className="bg-[#111] border border-white/[0.06] rounded-xl overflow-hidden">
      <div className="px-5 py-4 border-b border-white/[0.06]">
        <h3 className="text-sm font-semibold text-white">Финансовый отчёт</h3>
      </div>
      <div className="divide-y divide-white/[0.04]">
        {[
          { label: "Бюджет кампании",     value: fmtMoney(c.budget),                color: "" },
          { label: "Потрачено (блогеры)", value: `−${fmtMoney(c.spent - commission)}`, color: "text-[#EF4444]" },
          { label: "Комиссия Jeli (7.5%)", value: `−${fmtMoney(commission)}`,          color: "text-[#EF4444]" },
          { label: "Остаток",              value: fmtMoney(c.budget - c.spent),        color: "text-[#22C55E]" },
        ].map(({ label, value, color }) => (
          <div key={label} className="flex items-center justify-between px-5 py-4">
            <span className="text-sm text-white/60">{label}</span>
            <span className={`text-sm font-semibold ${color || "text-white"}`}>{value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center py-32 gap-4">
      <p className="text-white/30 text-sm">Кампания не найдена</p>
      <Link href="/app/campaigns" className="text-sm text-[#0064FF] hover:underline flex items-center gap-1">
        <ArrowLeft className="w-3.5 h-3.5" /> К кампаниям
      </Link>
    </div>
  );
}

export default function CampaignDetailPage() {
  const { id } = useParams<{ id: string }>();
  const c = MOCK_CAMPAIGNS.find((x) => x.id === id);
  const [tab, setTab] = useState<Tab>("Обзор");

  if (!c) return <NotFound />;

  const meta = STATUS_META[c.status];

  return (
    <div className="flex flex-col gap-5 max-w-5xl mx-auto">
      {/* Back */}
      <Link href="/app/campaigns" className="inline-flex items-center gap-1.5 text-sm text-white/40 hover:text-white transition-colors w-fit">
        <ArrowLeft className="w-4 h-4" />
        Кампании
      </Link>

      {/* Header */}
      <div className="bg-[#111] border border-white/[0.06] rounded-xl p-5 flex items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5 mb-1">
            <h1 className="text-xl font-bold text-white">{c.title}</h1>
            <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${meta.color}`}>{meta.label}</span>
          </div>
          <p className="text-sm text-white/40">{c.niche} · {c.startDate} — {c.endDate}</p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <div className="text-right">
            <p className="text-[11px] text-white/30">Бюджет</p>
            <p className="text-sm font-semibold text-white">{fmtMoney(c.budget)}</p>
          </div>
          <DollarSign className="w-4 h-4 text-white/20" />
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-[#111] border border-white/[0.06] rounded-xl p-1 w-fit">
        {TABS.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`text-xs px-3 py-1.5 rounded-lg transition-colors ${tab === t ? "bg-[#0064FF] text-white font-medium" : "text-white/40 hover:text-white"}`}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Content */}
      {tab === "Обзор"    && <OverviewTab c={c} />}
      {tab === "Блогеры"  && <InfluencersTab c={c} />}
      {tab === "Аналитика" && <AnalyticsTab c={c} />}
      {tab === "Финансы"  && <FinanceTab c={c} />}
    </div>
  );
}
