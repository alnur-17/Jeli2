"use client";

import { motion } from "framer-motion";
import { FeatureBarProps } from "./types";

export function FeatureBar({ text, badge, delay = 0 }: FeatureBarProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay }}
      className="relative flex items-center rounded-xl bg-brand text-white overflow-hidden h-16 w-full"
    >
      <span className="pl-6 pr-4 text-base font-medium flex-1 z-10">{text}</span>
      {badge && (
        <span className="mr-4 shrink-0 bg-white/20 text-white text-sm font-semibold px-4 py-1.5 rounded-full z-10">
          {badge}
        </span>
      )}
      <div className="stripe-overlay absolute right-0 top-0 w-1/4 h-full" />
    </motion.div>
  );
}
