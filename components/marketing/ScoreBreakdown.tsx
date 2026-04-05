"use client";

import { motion } from "framer-motion";

interface ScoreItem {
  label: string;
  percent: number;
}

interface ScoreBreakdownProps {
  items: ScoreItem[];
}

export function ScoreBreakdown({ items }: ScoreBreakdownProps) {
  return (
    <div className="flex flex-col gap-4">
      {items.map((item, index) => (
        <div key={item.label} className="flex items-center gap-4">
          <span className="text-sm font-medium text-foreground w-52 shrink-0">
            {item.label}
          </span>
          <div className="flex-1 h-3 rounded-full bg-gray-100 dark:bg-gray-800 overflow-hidden">
            <motion.div
              className="h-full rounded-full bg-brand"
              initial={{ width: 0 }}
              whileInView={{ width: `${item.percent}%` }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            />
          </div>
          <span className="text-sm font-bold text-brand w-10 text-right shrink-0">
            {item.percent}%
          </span>
        </div>
      ))}
    </div>
  );
}
