"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Plus, TrendingUp, Eye, Users, DollarSign } from "lucide-react";
import { MOCK_CAMPAIGNS, Campaign } from "@/lib/mock-data";

// ─── Helpers ──────────────────────────────────────────────────────────────────

function fmt(n: number) {
  if (n >= 1000000) return `${(n / 1000000).toFixed(1)}M`;
  if (n >= 1000) return `${Math.round(n / 1000)}K`;
  return String(n);
}

function fmtMoney(n: number) {
  if (n >= 1000000) return `${(n / 1000000).toFixed(1)}M ₸`;
  if (n >= 1000) return `${Math.round(n / 1000)}K ₸`;
  return `${n} ₸`;
}

const STATUS_META: Record<Campaign["status"], { label: string; color: string; dot: string }> = {
  draft:     { label: "Черновик",    color: "text-white/40 bg-white/[0.06]",    dot: "bg-white/30" },
  active:    { label: "Активна",     color: "text-[#22C55E] bg-[#22C55E]/10",   dot: "bg-[#22C55E]" },
  review:    { label: "На проверке", color: "text-[#EAB308] bg-[#EAB308]/10",   dot: "bg-[#EAB308]" },
  completed: { label: "Завершена",   color: "text-white/40 bg-white/[0.06]",    dot: "bg-white/30" },
};

const PLATFORM_LABEL: Record<string, string> = {
  tiktok: "TikTok", instagram: "Instagram", youtube: "YouTube",
};

const STATUS_TABS = [
  { value: "all",       label: "Все" },
  { value: "active",    label: "Активные" },
  { value: "review",    label: "На проверке" },
  { value: "draft",     label: "Черновики" },
  { value: "completed", label: "Завершённые" },
] as const;

// ─── Campaign Card ─────────────────────────────────────────────────────────────

function CampaignCard({ c }: { c: Campaign }) {
  const meta = STATUS_META[c.status];
  const budgetPct = c.budget > 0 ? Math.min((c.spent / c.budget) * 100, 100) : 0;

  return (
    <Link
      href={`/app/campaigns/${c.id}`}
      className="bg-[#111] border border-white/[0.06] rounded-xl p-5 flex flex-col gap-4 hover:border-white/10 transition-colors"
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-white truncate">{c.title}</p>
          <p className="text-xs text-white/40 mt-0.5">{c.niche} · {PLATFORM_LABEL[c.platform]}</p>
        </div>
        <span className={`shrink-0 flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full ${meta.color}`}>
          <span className={`w-1.5 h-1.5 rounded-full ${meta.dot}`} />
          {meta.label}
        </span>
      </div>

      {/* Budget bar */}
      <div>
        <div className="flex justify-between text-[11px] mb-1.5">
          <span className="text-white/30">Бюджет</span>
          <span className="text-white/60">{fmtMoney(c.spent)} / {fmtMoney(c.budget)}</span>
        </div>
        <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
          <div
            className="h-full rounded-full bg-[#0064FF] transition-all"
            style={{ width: `${budgetPct}%` }}
          />
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-4 gap-2 pt-1">
        <div>
          <p className="text-[10px] text-white/30">Охват</p>
          <p className="text-xs font-semibold text-white">{c.reach > 0 ? fmt(c.reach) : "—"}</p>
        </div>
        <div>
          <p className="text-[10px] text-white/30">Клики</p>
          <p className="text-xs font-semibold text-white">{c.clicks > 0 ? fmt(c.clicks) : "—"}</p>
        </div>
        <div>
          <p className="text-[10px] text-white/30">ER%</p>
          <p className="text-xs font-semibold text-white">{c.er > 0 ? `${c.er}%` : "—"}</p>
        </div>
        <div>
          <p className="text-[10px] text-white/30">Блогеры</p>
          <p className="text-xs font-semibold text-white">{c.influencersCount}</p>
        </div>
      </div>

      {/* Dates */}
      <p className="text-[11px] text-white/20">{c.startDate} — {c.endDate}</p>

      {/* Influencer avatars */}
      {c.influencers.length > 0 && (
        <div className="flex items-center gap-1.5">
          {c.influencers.slice(0, 4).map((inf) => (
            <div
              key={inf.id}
              className="w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold text-white border border-[#111]"
              style={{ background: inf.avatarColor }}
              title={inf.name}
            >
              {inf.name.charAt(0)}
            </div>
          ))}
          {c.influencers.length > 4 && (
            <span className="text-[10px] text-white/30 ml-1">+{c.influencers.length - 4}</span>
          )}
        </div>
      )}
    </Link>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function CampaignsPage() {
  const [tab, setTab] = useState<"all" | "active" | "review" | "draft" | "completed">("all");

  const filtered = useMemo(() => {
    if (tab === "all") return MOCK_CAMPAIGNS;
    return MOCK_CAMPAIGNS.filter((c) => c.status === tab);
  }, [tab]);

  // Summary KPIs
  const totalReach  = MOCK_CAMPAIGNS.reduce((s, c) => s + c.reach, 0);
  const totalSpent  = MOCK_CAMPAIGNS.reduce((s, c) => s + c.spent, 0);
  const activeCount = MOCK_CAMPAIGNS.filter((c) => c.status === "active").length;

  return (
    <div className="flex flex-col gap-5 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-white">Кампании</h1>
          <p className="text-sm text-white/40 mt-0.5">{MOCK_CAMPAIGNS.length} кампаний</p>
        </div>
        <Link
          href="/app/campaigns/new"
          className="flex items-center gap-2 bg-[#0064FF] text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-[#0052CC] transition-colors"
        >
          <Plus className="w-4 h-4" />
          Новая кампания
        </Link>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {[
          { label: "Активных", value: String(activeCount), icon: <TrendingUp className="w-3.5 h-3.5" /> },
          { label: "Суммарный охват", value: fmt(totalReach), icon: <Eye className="w-3.5 h-3.5" /> },
          { label: "Всего потрачено", value: fmtMoney(totalSpent), icon: <DollarSign className="w-3.5 h-3.5" /> },
          { label: "Всего блогеров", value: String(MOCK_CAMPAIGNS.reduce((s, c) => s + c.influencersCount, 0)), icon: <Users className="w-3.5 h-3.5" /> },
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

      {/* Status tabs */}
      <div className="flex gap-1 bg-[#111] border border-white/[0.06] rounded-xl p-1 w-fit">
        {STATUS_TABS.map(({ value, label }) => (
          <button
            key={value}
            onClick={() => setTab(value)}
            className={`text-xs px-3 py-1.5 rounded-lg transition-colors ${tab === value ? "bg-[#0064FF] text-white font-medium" : "text-white/40 hover:text-white"}`}
          >
            {label}
            {value !== "all" && (
              <span className="ml-1.5 text-[10px] opacity-60">
                {MOCK_CAMPAIGNS.filter((c) => c.status === value).length}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filtered.map((c) => <CampaignCard key={c.id} c={c} />)}
        {filtered.length === 0 && (
          <div className="col-span-3 py-16 text-center text-sm text-white/30">
            Нет кампаний в этом статусе
          </div>
        )}
      </div>
    </div>
  );
}
