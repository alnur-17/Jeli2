"use client";

import { motion } from "framer-motion";
import { FeatureBarProps } from "./types";

function isPercentBadge(badge?: string) {
  return Boolean(badge && /^\d+%$/.test(badge.trim()));
}

export function FeatureBar({ text, badge, delay = 0 }: FeatureBarProps) {
  const percent = isPercentBadge(badge);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay }}
      className="relative flex flex-row items-center gap-4 rounded-xl border border-border bg-card px-5 py-4 w-full shadow-sm"
    >
      <span className="text-sm sm:text-[15px] text-foreground leading-snug flex-1 min-w-0">{text}</span>
      {badge && (
        <span
          className={
            percent
              ? "shrink-0 tabular-nums text-sm font-semibold text-brand bg-brand/10 px-3 py-1 rounded-full"
              : "shrink-0 text-xs font-medium text-muted-foreground uppercase tracking-wide"
          }
        >
          {badge}
        </span>
      )}
    </motion.div>
  );
}
