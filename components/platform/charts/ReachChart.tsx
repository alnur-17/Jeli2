"use client";

import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
} from "recharts";

interface ReachChartProps {
  data: { date: string; reach: number }[];
}

function formatReach(v: number) {
  if (v >= 1000000) return `${(v / 1000000).toFixed(1)}M`;
  if (v >= 1000) return `${Math.round(v / 1000)}K`;
  return String(v);
}

interface TooltipProps { active?: boolean; payload?: { value: number }[]; label?: string; }
const CustomTooltip = ({ active, payload, label }: TooltipProps) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#1a1a1a] border border-white/10 rounded-lg px-3 py-2 shadow-xl">
        <p className="text-xs text-white/50 mb-1">{label}</p>
        <p className="text-sm font-semibold text-white">{formatReach(payload[0].value)}</p>
        <p className="text-xs text-white/40">охват</p>
      </div>
    );
  }
  return null;
};

export function ReachChart({ data }: ReachChartProps) {
  return (
    <ResponsiveContainer width="100%" height={200}>
      <AreaChart data={data} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
        <defs>
          <linearGradient id="reachGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#0064FF" stopOpacity={0.3} />
            <stop offset="95%" stopColor="#0064FF" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
        <XAxis
          dataKey="date"
          tick={{ fill: "rgba(255,255,255,0.3)", fontSize: 11 }}
          axisLine={false}
          tickLine={false}
        />
        <YAxis
          tickFormatter={formatReach}
          tick={{ fill: "rgba(255,255,255,0.3)", fontSize: 11 }}
          axisLine={false}
          tickLine={false}
        />
        <Tooltip content={<CustomTooltip />} />
        <Area
          type="monotone"
          dataKey="reach"
          stroke="#0064FF"
          strokeWidth={2}
          fill="url(#reachGrad)"
          dot={false}
          activeDot={{ r: 4, fill: "#0064FF", stroke: "#fff", strokeWidth: 2 }}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
