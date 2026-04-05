import { MapPin } from "lucide-react";
import { InfluencerCardProps } from "./types";
import { TwoLayerTag } from "./TwoLayerTag";

export function InfluencerCard({
  name,
  location,
  parentNiche,
  childNiches,
  score,
  matchPercent,
  avatarColor = "#0064FF",
}: InfluencerCardProps) {
  return (
    <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 shadow-sm flex flex-col gap-4">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div
          className="w-12 h-12 rounded-full shrink-0 flex items-center justify-center text-white font-bold text-lg"
          style={{
            background: `linear-gradient(135deg, ${avatarColor}, ${avatarColor}99)`,
          }}
        >
          {name.charAt(0)}
        </div>
        <div>
          <p className="font-semibold text-foreground">{name}</p>
          <p className="text-sm text-muted-foreground flex items-center gap-1">
            <MapPin className="w-3 h-3" />
            {location}
          </p>
        </div>
        {matchPercent !== undefined && (
          <span className="ml-auto text-xs font-semibold bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 px-2.5 py-1 rounded-full">
            {matchPercent}% совпадение
          </span>
        )}
      </div>

      {/* Niches */}
      <TwoLayerTag parent={parentNiche} items={childNiches} />

      {/* Score */}
      <div className="flex flex-col gap-1.5">
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground font-medium">Скоринг</span>
          <span className="font-bold text-brand">{score}/100</span>
        </div>
        <div className="h-2 rounded-full bg-gray-100 dark:bg-gray-800 overflow-hidden">
          <div
            className="h-full rounded-full bg-brand transition-all"
            style={{ width: `${score}%` }}
          />
        </div>
      </div>
    </div>
  );
}
