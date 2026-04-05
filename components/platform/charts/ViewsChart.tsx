"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface ViewsChartProps {
  data: number[];
}

function fmt(v: number) {
  if (v >= 1000000) return `${(v / 1000000).toFixed(1)}M`;
  if (v >= 1000) return `${Math.round(v / 1000)}K`;
  return String(v);
}

interface TooltipProps { active?: boolean; payload?: { value: number }[]; label?: string; }
const CustomTooltip = ({ active, payload, label }: TooltipProps) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#1a1a1a] border border-white/10 rounded-lg px-3 py-2 shadow-xl">
        <p className="text-xs text-white/50 mb-1">Видео #{label}</p>
        <p className="text-sm font-semibold text-white">{fmt(payload[0].value)}</p>
        <p className="text-xs text-white/40">просмотров</p>
      </div>
    );
  }
  return null;
};

export function ViewsChart({ data }: ViewsChartProps) {
  const chartData = data.map((views, i) => ({ index: i + 1, views }));
  return (
    <ResponsiveContainer width="100%" height={160}>
      <LineChart data={chartData} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
        <XAxis
          dataKey="index"
          tick={{ fill: "rgba(255,255,255,0.3)", fontSize: 11 }}
          axisLine={false}
          tickLine={false}
        />
        <YAxis
          tickFormatter={fmt}
          tick={{ fill: "rgba(255,255,255,0.3)", fontSize: 11 }}
          axisLine={false}
          tickLine={false}
        />
        <Tooltip content={<CustomTooltip />} />
        <Line
          type="monotone"
          dataKey="views"
          stroke="#22C55E"
          strokeWidth={2}
          dot={false}
          activeDot={{ r: 4, fill: "#22C55E", stroke: "#fff", strokeWidth: 2 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
