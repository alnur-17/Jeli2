"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { InfluencerFormData } from "@/lib/types/auth";

interface Props {
  data: InfluencerFormData;
  onSubmit: () => void;
  isSubmitting: boolean;
  error: string | null;
  success: boolean;
  onBack: () => void;
}

export function Step5Welcome({ data, onSubmit, isSubmitting, error, success, onBack }: Props) {
  const submitted = useRef(false);

  useEffect(() => {
    if (!submitted.current) {
      submitted.current = true;
      onSubmit();
    }
  }, [onSubmit]);

  if (error) {
    return (
      <div className="w-full max-w-md rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-8 flex flex-col gap-6">
        <div className="rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 p-4">
          <p className="text-sm text-red-700 dark:text-red-400">{error}</p>
        </div>
        <button
          onClick={onBack}
          className="text-sm text-brand hover:underline text-center"
        >
          ← Назад
        </button>
      </div>
    );
  }

  if (isSubmitting || !success) {
    return (
      <div className="w-full max-w-md rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-8 flex flex-col items-center gap-6">
        <div className="w-12 h-12 border-4 border-brand/30 border-t-brand rounded-full animate-spin" />
        <p className="text-muted-foreground text-sm">Создаём профиль...</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-8 flex flex-col items-center gap-6 text-center">
      {/* Animated checkmark */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
        className="w-16 h-16 rounded-full bg-brand flex items-center justify-center"
      >
        <motion.svg
          width="32"
          height="32"
          viewBox="0 0 32 32"
          fill="none"
          stroke="white"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <motion.path
            d="M6 16 L13 23 L26 10"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          />
        </motion.svg>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="flex flex-col gap-2"
      >
        <h2 className="font-headline text-4xl uppercase text-foreground leading-none">
          Добро пожаловать в Jeli!
        </h2>
        <p className="text-brand font-semibold text-lg">@{data.username}</p>
        <p className="text-muted-foreground text-sm">
          Твой профиль готов. Начни находить кампании.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
      >
        <Link
          href="/app/dashboard"
          className="inline-flex items-center gap-2 bg-brand text-white rounded-lg px-6 py-3 font-semibold hover:bg-brand-hover transition-colors"
        >
          Перейти в дашборд →
        </Link>
      </motion.div>
    </div>
  );
}
