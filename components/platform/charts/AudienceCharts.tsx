"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

// ─── Gender Split ─────────────────────────────────────────────────────────────

interface GenderChartProps {
  male: number;
  female: number;
}

export function GenderChart({ male, female }: GenderChartProps) {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-3">
        <span className="text-xs text-white/40 w-14">Мужчины</span>
        <div className="flex-1 h-2 rounded-full bg-white/5 overflow-hidden">
          <div className="h-full bg-[#3B82F6] rounded-full" style={{ width: `${male}%` }} />
        </div>
        <span className="text-xs font-medium text-white w-8 text-right">{male}%</span>
      </div>
      <div className="flex items-center gap-3">
        <span className="text-xs text-white/40 w-14">Женщины</span>
        <div className="flex-1 h-2 rounded-full bg-white/5 overflow-hidden">
          <div className="h-full bg-[#EC4899] rounded-full" style={{ width: `${female}%` }} />
        </div>
        <span className="text-xs font-medium text-white w-8 text-right">{female}%</span>
      </div>
    </div>
  );
}

// ─── Age Chart ────────────────────────────────────────────────────────────────

interface AgeChartProps {
  data: Record<string, number>;
}

const AGE_COLORS = ["#0064FF", "#3B82F6", "#22C55E", "#EAB308", "#EF4444"];

export function AgeChart({ data }: AgeChartProps) {
  const chartData = Object.entries(data).map(([age, percent]) => ({ age, percent }));
  return (
    <ResponsiveContainer width="100%" height={140}>
      <BarChart data={chartData} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
        <XAxis
          dataKey="age"
          tick={{ fill: "rgba(255,255,255,0.3)", fontSize: 10 }}
          axisLine={false}
          tickLine={false}
        />
        <YAxis
          tick={{ fill: "rgba(255,255,255,0.3)", fontSize: 10 }}
          axisLine={false}
          tickLine={false}
          tickFormatter={(v) => `${v}%`}
        />
        <Tooltip
          contentStyle={{ background: "#1a1a1a", border: "1px solid rgba(255,255,255,0.1)", color: "#fff", borderRadius: 8, fontSize: 12 }}
          formatter={(val) => [`${val}%`, "Доля"]}
        />
        <Bar dataKey="percent" radius={[3, 3, 0, 0]}>
          {chartData.map((_, i) => (
            <Cell key={i} fill={AGE_COLORS[i % AGE_COLORS.length]} opacity={0.85} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}

// ─── Geo Bars ─────────────────────────────────────────────────────────────────

interface GeoChartProps {
  cities: { city: string; percent: number }[];
}

export function GeoChart({ cities }: GeoChartProps) {
  return (
    <div className="flex flex-col gap-2.5">
      {cities.map(({ city, percent }, i) => (
        <div key={city} className="flex items-center gap-3">
          <span className="text-xs text-white/40 w-20 truncate">{city}</span>
          <div className="flex-1 h-1.5 rounded-full bg-white/5 overflow-hidden">
            <div
              className="h-full rounded-full"
              style={{
                width: `${percent}%`,
                background: i === 0 ? "#0064FF" : `rgba(0,100,255,${0.7 - i * 0.12})`,
              }}
            />
          </div>
          <span className="text-xs font-medium text-white/60 w-8 text-right">{percent}%</span>
        </div>
      ))}
    </div>
  );
}
