"use client";

import { useState } from "react";
import Link from "next/link";
import { Plus, Users, Wallet, TrendingUp, Eye, DollarSign, Zap } from "lucide-react";
import { StatCard } from "@/components/platform/StatCard";
import { ReachChart } from "@/components/platform/charts/ReachChart";
import { MOCK_DASHBOARD } from "@/lib/mock-data";

const { kpi, reachData, topInfluencers, activity, aiUsage, walletBalance } = MOCK_DASHBOARD;

function fmt(n: number) {
  if (n >= 1000000) return `${(n / 1000000).toFixed(1)}M`;
  if (n >= 1000) return `${Math.round(n / 1000)}K`;
  return String(n);
}

function fmtMoney(n: number) {
  return `${(n / 1000).toFixed(0)} 000 ₸`;
}

const activityIcons: Record<string, string> = {
  publish: "📤",
  approve: "📋",
  payment: "💸",
  offer: "🤝",
  campaign: "📢",
};

export default function DashboardPage() {
  const [period, setPeriod] = useState<"7d" | "30d" | "90d">("7d");
  const chartData = reachData[period];

  return (
    <div className="flex flex-col gap-6 max-w-7xl mx-auto">
      {/* Top row: greeting + subscription */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-xl font-semibold text-white">Добрый день 👋</h1>
          <p className="text-sm text-white/40 mt-0.5">Вот что происходит сегодня</p>
        </div>
        <div className="flex items-center gap-2 bg-[#111111] border border-white/[0.06] rounded-lg px-3 py-2">
          <span className="w-2 h-2 rounded-full bg-[#22C55E]" />
          <span className="text-xs text-white/60">Стандарт</span>
          <span className="text-xs text-white/30">·</span>
          <span className="text-xs text-white/40">7 дней</span>
        </div>
      </div>

      {/* KPI Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <StatCard
          label="Активные кампании"
          value={kpi.activeCampaigns}
          sub="из 5 всего"
          icon={<Zap className="w-3.5 h-3.5 text-white/60" />}
        />
        <StatCard
          label="Суммарный охват"
          value={fmt(kpi.totalReach)}
          trend={{ value: "+12%", positive: true }}
          icon={<Eye className="w-3.5 h-3.5 text-white/60" />}
        />
        <StatCard
          label="Потрачено бюджета"
          value={fmtMoney(kpi.budgetSpent)}
          sub={`Баланс: ${fmtMoney(walletBalance)}`}
          icon={<DollarSign className="w-3.5 h-3.5 text-white/60" />}
        />
        <StatCard
          label="Средний ROI"
          value={`×${kpi.avgROI}`}
          trend={{ value: "+0.4", positive: true }}
          accent
          icon={<TrendingUp className="w-3.5 h-3.5 text-white/80" />}
        />
      </div>

      {/* Main content: chart + sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Reach Chart */}
        <div className="lg:col-span-2 bg-[#111111] border border-white/[0.06] rounded-xl p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold text-white">Динамика охватов</h2>
            <div className="flex gap-1">
              {(["7d", "30d", "90d"] as const).map((p) => (
                <button
                  key={p}
                  onClick={() => setPeriod(p)}
                  className={`text-xs px-2.5 py-1 rounded-md transition-colors ${
                    period === p
                      ? "bg-[#0064FF] text-white"
                      : "text-white/40 hover:text-white hover:bg-white/5"
                  }`}
                >
                  {p === "7d" ? "7 дней" : p === "30d" ? "30 дней" : "90 дней"}
                </button>
              ))}
            </div>
          </div>
          <ReachChart data={chartData} />
        </div>

        {/* Activity feed */}
        <div className="bg-[#111111] border border-white/[0.06] rounded-xl p-5 flex flex-col gap-4">
          <h2 className="text-sm font-semibold text-white">Активность</h2>
          <div className="flex flex-col gap-3 flex-1">
            {activity.map((item) => (
              <div key={item.id} className="flex items-start gap-3">
                <div
                  className="w-7 h-7 rounded-full shrink-0 flex items-center justify-center text-xs"
                  style={{ background: item.avatarColor ? `${item.avatarColor}22` : "#1a1a1a" }}
                >
                  {activityIcons[item.type]}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-white/70 leading-snug line-clamp-2">{item.text}</p>
                  <p className="text-[11px] text-white/30 mt-0.5">{item.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Top 3 influencers */}
        <div className="lg:col-span-1 bg-[#111111] border border-white/[0.06] rounded-xl p-5">
          <h2 className="text-sm font-semibold text-white mb-4">Топ по ROI</h2>
          <div className="flex flex-col gap-3">
            {topInfluencers.map((inf, i) => (
              <Link
                key={inf.id}
                href={`/app/influencers/${inf.id}`}
                className="flex items-center gap-3 hover:bg-white/[0.03] rounded-lg p-1 -mx-1 transition-colors"
              >
                <span className="text-xs text-white/30 w-4">{i + 1}</span>
                <div
                  className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold text-white shrink-0"
                  style={{ background: inf.avatarColor }}
                >
                  {inf.name.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium text-white truncate">{inf.name}</p>
                  <p className="text-[11px] text-white/40">ER {inf.er}%</p>
                </div>
                <span className="text-xs font-semibold text-[#22C55E]">×{inf.roi}</span>
              </Link>
            ))}
          </div>
        </div>

        {/* Quick actions */}
        <div className="bg-[#111111] border border-white/[0.06] rounded-xl p-5">
          <h2 className="text-sm font-semibold text-white mb-4">Быстрые действия</h2>
          <div className="flex flex-col gap-2">
            <Link
              href="/app/campaigns/new"
              className="flex items-center gap-2.5 bg-[#0064FF] text-white rounded-lg px-4 py-2.5 text-sm font-medium hover:bg-[#0052CC] transition-colors"
            >
              <Plus className="w-4 h-4" />
              Создать кампанию
            </Link>
            <Link
              href="/app/influencers"
              className="flex items-center gap-2.5 bg-white/5 border border-white/8 text-white rounded-lg px-4 py-2.5 text-sm font-medium hover:bg-white/8 transition-colors"
            >
              <Users className="w-4 h-4" />
              Найти блогера
            </Link>
            <Link
              href="/app/wallet"
              className="flex items-center gap-2.5 bg-white/5 border border-white/8 text-white rounded-lg px-4 py-2.5 text-sm font-medium hover:bg-white/8 transition-colors"
            >
              <Wallet className="w-4 h-4" />
              Пополнить кошелёк
            </Link>
          </div>
        </div>

        {/* AI usage */}
        <div className="bg-[#111111] border border-white/[0.06] rounded-xl p-5">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-semibold text-white">ИИ-менеджер</h2>
            <Link href="/app/ai-manager" className="text-xs text-[#0064FF] hover:underline">
              Открыть →
            </Link>
          </div>
          <div className="flex flex-col gap-4">
            <div>
              <div className="flex justify-between text-xs mb-1.5">
                <span className="text-white/40">Диалогов использовано</span>
                <span className="text-white font-medium">{aiUsage.used}/{aiUsage.limit}</span>
              </div>
              <div className="h-1.5 w-full rounded-full bg-white/5 overflow-hidden">
                <div
                  className="h-full rounded-full bg-[#0064FF] transition-all"
                  style={{ width: `${(aiUsage.used / aiUsage.limit) * 100}%` }}
                />
              </div>
              <p className="text-[11px] text-white/30 mt-1.5">Тариф Стандарт — {aiUsage.limit} диалогов/мес</p>
            </div>
            <p className="text-xs text-white/40 leading-relaxed">
              Используй ИИ для поиска блогеров, написания офферов и анализа кампаний.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
