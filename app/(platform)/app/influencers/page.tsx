"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Search, SlidersHorizontal, CheckSquare } from "lucide-react";
import { MOCK_INFLUENCERS, Influencer } from "@/lib/mock-data";

// ─── Helpers ──────────────────────────────────────────────────────────────────

function fmt(n: number) {
  if (n >= 1000000) return `${(n / 1000000).toFixed(1)}M`;
  if (n >= 1000) return `${Math.round(n / 1000)}K`;
  return String(n);
}

function scoreColor(s: number) {
  if (s >= 80) return "text-[#22C55E] bg-[#22C55E]/10";
  if (s >= 60) return "text-[#EAB308] bg-[#EAB308]/10";
  return "text-[#EF4444] bg-[#EF4444]/10";
}

function platformBadge(p: string) {
  const map: Record<string, string> = { tiktok: "TikTok", instagram: "Instagram", youtube: "YouTube" };
  return map[p] || p;
}

const NICHES = ["Еда", "Фитнес", "Технологии", "Бьюти", "Авто", "Финансы", "Лайфстайл", "Мода", "Образование", "Путешествия"];

// ─── Influencer Card ──────────────────────────────────────────────────────────

function InfluencerCard({ inf, selected, onToggle }: { inf: Influencer; selected: boolean; onToggle: () => void }) {
  return (
    <div className={`bg-[#111111] border rounded-xl p-5 flex flex-col gap-4 transition-colors ${selected ? "border-[#0064FF]/50" : "border-white/[0.06] hover:border-white/10"}`}>
      {/* Header */}
      <div className="flex items-start gap-3">
        <div
          className="w-11 h-11 rounded-full flex items-center justify-center text-white font-semibold text-base shrink-0"
          style={{ background: inf.avatarColor }}
        >
          {inf.name.charAt(0)}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5">
            <p className="text-sm font-semibold text-white truncate">{inf.name}</p>
            {inf.verified && <span className="text-[#0064FF] text-xs">✓</span>}
          </div>
          <p className="text-xs text-white/40">@{inf.username} · {inf.city}</p>
        </div>
        <button
          onClick={onToggle}
          className={`shrink-0 w-5 h-5 rounded flex items-center justify-center border transition-colors ${selected ? "bg-[#0064FF] border-[#0064FF]" : "border-white/20 hover:border-white/40"}`}
        >
          {selected && <span className="text-white text-[10px]">✓</span>}
        </button>
      </div>

      {/* Platform + niche */}
      <div className="flex items-center gap-2 flex-wrap">
        <span className="text-[11px] bg-white/[0.06] text-white/60 px-2 py-0.5 rounded-full">
          {platformBadge(inf.platform)}
        </span>
        {inf.niches.slice(0, 2).map((n) => (
          <span key={n} className="text-[11px] bg-[#0064FF]/10 text-[#0064FF] px-2 py-0.5 rounded-full">
            {n}
          </span>
        ))}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-2">
        <div>
          <p className="text-[11px] text-white/30">Подписчики</p>
          <p className="text-sm font-semibold text-white">{fmt(inf.followers)}</p>
        </div>
        <div>
          <p className="text-[11px] text-white/30">Просмотры</p>
          <p className="text-sm font-semibold text-white">{fmt(inf.avgViews)}</p>
        </div>
        <div>
          <p className="text-[11px] text-white/30">ER%</p>
          <p className="text-sm font-semibold text-white">{inf.erPercent}%</p>
        </div>
      </div>

      {/* Score + match */}
      <div className="flex items-center justify-between">
        <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${scoreColor(inf.jeliScore)}`}>
          Скоринг {inf.jeliScore}
        </span>
        {inf.matchPercent !== undefined && (
          <span className="text-xs text-[#22C55E] font-medium">{inf.matchPercent}% совпадение</span>
        )}
      </div>

      <Link
        href={`/app/influencers/${inf.id}`}
        className="mt-auto block text-center text-sm font-medium text-white bg-white/5 border border-white/8 rounded-lg py-2 hover:bg-white/10 transition-colors"
      >
        Открыть профиль
      </Link>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function InfluencersPage() {
  const [query, setQuery] = useState("");
  const [platform, setPlatform] = useState<string>("all");
  const [niche, setNiche] = useState<string>("all");
  const [city, setCity] = useState<string>("all");
  const [followers, setFollowers] = useState<string>("all");
  const [minER, setMinER] = useState<string>("all");
  const [minScore, setMinScore] = useState<string>("all");
  const [sort, setSort] = useState<"score" | "reach" | "er">("score");
  const [selected, setSelected] = useState<string[]>([]);
  const [filtersOpen, setFiltersOpen] = useState(false);

  const filtered = useMemo(() => {
    let list = [...MOCK_INFLUENCERS];
    if (query) list = list.filter((i) => i.name.toLowerCase().includes(query.toLowerCase()) || i.username.toLowerCase().includes(query.toLowerCase()));
    if (platform !== "all") list = list.filter((i) => i.platform === platform);
    if (niche !== "all") list = list.filter((i) => i.niches.some((n) => n.includes(niche)));
    if (city !== "all") list = list.filter((i) => i.city === city);
    if (followers !== "all") {
      const ranges: Record<string, [number, number]> = {
        "1k-10k": [1000, 10000], "10k-100k": [10000, 100000],
        "100k-500k": [100000, 500000], "500k+": [500000, Infinity],
      };
      const [min, max] = ranges[followers];
      list = list.filter((i) => i.followers >= min && i.followers < max);
    }
    if (minER !== "all") list = list.filter((i) => i.erPercent >= Number(minER));
    if (minScore !== "all") list = list.filter((i) => i.jeliScore >= Number(minScore));
    list.sort((a, b) =>
      sort === "score" ? b.jeliScore - a.jeliScore :
      sort === "reach" ? b.avgViews - a.avgViews :
      b.erPercent - a.erPercent
    );
    return list;
  }, [query, platform, niche, city, followers, minER, minScore, sort]);

  const toggleSelect = (id: string) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : prev.length < 3 ? [...prev, id] : prev
    );
  };

  return (
    <div className="flex flex-col gap-5 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-white">Каталог блогеров</h1>
          <p className="text-sm text-white/40 mt-0.5">{filtered.length} из {MOCK_INFLUENCERS.length} блогеров</p>
        </div>
        {selected.length >= 2 && (
          <button className="flex items-center gap-2 bg-[#0064FF] text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-[#0052CC] transition-colors">
            <CheckSquare className="w-4 h-4" />
            Сравнить {selected.length}
          </button>
        )}
      </div>

      {/* Search + filter bar */}
      <div className="flex gap-2">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Поиск по имени или @username..."
            className="w-full bg-[#111111] border border-white/[0.06] rounded-lg pl-9 pr-4 py-2.5 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-white/20 transition-colors"
          />
        </div>
        <button
          onClick={() => setFiltersOpen(!filtersOpen)}
          className={`flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm border transition-colors ${filtersOpen ? "bg-[#0064FF] border-[#0064FF] text-white" : "bg-[#111] border-white/[0.06] text-white/60 hover:text-white hover:border-white/20"}`}
        >
          <SlidersHorizontal className="w-4 h-4" />
          Фильтры
        </button>
        {/* Sort */}
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value as "score" | "reach" | "er")}
          className="bg-[#111111] border border-white/[0.06] text-white/60 text-sm rounded-lg px-3 py-2.5 focus:outline-none focus:border-white/20 appearance-none cursor-pointer"
        >
          <option value="score">По скорингу</option>
          <option value="reach">По охватам</option>
          <option value="er">По ER%</option>
        </select>
      </div>

      {/* Filters panel */}
      {filtersOpen && (
        <div className="bg-[#111111] border border-white/[0.06] rounded-xl p-5 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {/* Platform */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs text-white/40">Платформа</label>
            <select value={platform} onChange={(e) => setPlatform(e.target.value)} className="bg-[#1a1a1a] border border-white/[0.06] text-white text-xs rounded-lg px-3 py-2 focus:outline-none appearance-none">
              <option value="all">Все</option>
              <option value="tiktok">TikTok</option>
              <option value="instagram">Instagram</option>
              <option value="youtube">YouTube</option>
            </select>
          </div>
          {/* Niche */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs text-white/40">Ниша</label>
            <select value={niche} onChange={(e) => setNiche(e.target.value)} className="bg-[#1a1a1a] border border-white/[0.06] text-white text-xs rounded-lg px-3 py-2 focus:outline-none appearance-none">
              <option value="all">Все</option>
              {NICHES.map((n) => <option key={n} value={n}>{n}</option>)}
            </select>
          </div>
          {/* City */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs text-white/40">Город</label>
            <select value={city} onChange={(e) => setCity(e.target.value)} className="bg-[#1a1a1a] border border-white/[0.06] text-white text-xs rounded-lg px-3 py-2 focus:outline-none appearance-none">
              <option value="all">Все</option>
              <option value="Алматы">Алматы</option>
              <option value="Астана">Астана</option>
              <option value="Шымкент">Шымкент</option>
            </select>
          </div>
          {/* Followers */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs text-white/40">Подписчики</label>
            <select value={followers} onChange={(e) => setFollowers(e.target.value)} className="bg-[#1a1a1a] border border-white/[0.06] text-white text-xs rounded-lg px-3 py-2 focus:outline-none appearance-none">
              <option value="all">Все</option>
              <option value="1k-10k">1к–10к</option>
              <option value="10k-100k">10к–100к</option>
              <option value="100k-500k">100к–500к</option>
              <option value="500k+">500к+</option>
            </select>
          </div>
          {/* ER */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs text-white/40">ER% от</label>
            <select value={minER} onChange={(e) => setMinER(e.target.value)} className="bg-[#1a1a1a] border border-white/[0.06] text-white text-xs rounded-lg px-3 py-2 focus:outline-none appearance-none">
              <option value="all">Любой</option>
              <option value="1">1%</option>
              <option value="3">3%</option>
              <option value="5">5%</option>
            </select>
          </div>
          {/* Score */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs text-white/40">Скоринг от</label>
            <select value={minScore} onChange={(e) => setMinScore(e.target.value)} className="bg-[#1a1a1a] border border-white/[0.06] text-white text-xs rounded-lg px-3 py-2 focus:outline-none appearance-none">
              <option value="all">Любой</option>
              <option value="50">50</option>
              <option value="70">70</option>
              <option value="90">90</option>
            </select>
          </div>
        </div>
      )}

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filtered.map((inf) => (
          <InfluencerCard
            key={inf.id}
            inf={inf}
            selected={selected.includes(inf.id)}
            onToggle={() => toggleSelect(inf.id)}
          />
        ))}
        {filtered.length === 0 && (
          <div className="col-span-3 text-center py-16 text-white/30 text-sm">
            Блогеры не найдены. Попробуйте изменить фильтры.
          </div>
        )}
      </div>
    </div>
  );
}
