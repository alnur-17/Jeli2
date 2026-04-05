interface StatCardProps {
  label: string;
  value: string | number;
  sub?: string;
  trend?: { value: string; positive: boolean };
  accent?: boolean;
  icon?: React.ReactNode;
}

export function StatCard({ label, value, sub, trend, accent, icon }: StatCardProps) {
  return (
    <div className={`rounded-xl p-5 flex flex-col gap-3 border transition-colors ${
      accent
        ? "bg-[#0064FF] border-[#0064FF]"
        : "bg-[#111111] border-white/[0.06] hover:border-white/10"
    }`}>
      <div className="flex items-start justify-between">
        <p className={`text-xs font-medium ${accent ? "text-white/70" : "text-white/40"}`}>
          {label}
        </p>
        {icon && (
          <div className={`w-7 h-7 rounded-md flex items-center justify-center ${accent ? "bg-white/20" : "bg-white/5"}`}>
            {icon}
          </div>
        )}
      </div>
      <div>
        <p className={`text-2xl font-semibold tracking-tight ${accent ? "text-white" : "text-white"}`}>
          {value}
        </p>
        {sub && (
          <p className={`text-xs mt-0.5 ${accent ? "text-white/60" : "text-white/40"}`}>{sub}</p>
        )}
      </div>
      {trend && (
        <div className="flex items-center gap-1">
          <span className={`text-xs font-medium ${trend.positive ? "text-[#22C55E]" : "text-[#EF4444]"}`}>
            {trend.positive ? "↑" : "↓"} {trend.value}
          </span>
          <span className="text-xs text-white/30">за 30 дней</span>
        </div>
      )}
    </div>
  );
}
