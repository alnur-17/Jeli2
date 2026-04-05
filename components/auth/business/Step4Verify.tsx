"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { BusinessFormData } from "@/lib/types/auth";

interface Props {
  data: BusinessFormData;
  onSubmit: () => void;
  isSubmitting: boolean;
  error: string | null;
  success: boolean;
  onBack: () => void;
}

export function Step4Verify({ data, onSubmit, isSubmitting, error, success, onBack }: Props) {
  const submitted = useRef(false);
  const [resendCooldown, setResendCooldown] = useState(0);

  useEffect(() => {
    if (!submitted.current) {
      submitted.current = true;
      onSubmit();
    }
  }, [onSubmit]);

  function handleResend() {
    if (resendCooldown > 0) return;
    // Would call Supabase resend here
    setResendCooldown(60);
    const timer = setInterval(() => {
      setResendCooldown((v) => {
        if (v <= 1) { clearInterval(timer); return 0; }
        return v - 1;
      });
    }, 1000);
  }

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
        <p className="text-muted-foreground text-sm">Создаём аккаунт...</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-8 flex flex-col items-center gap-6 text-center">
      {/* Envelope animation */}
      <motion.div
        initial={{ scale: 0, rotate: -10 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
        className="w-16 h-16 rounded-2xl bg-brand/10 flex items-center justify-center"
      >
        <svg
          width="32"
          height="32"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#0064FF"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
          <polyline points="22,6 12,13 2,6" />
        </svg>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="flex flex-col gap-3"
      >
        <h2 className="font-headline text-4xl uppercase text-foreground leading-none">
          Проверьте почту
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Мы отправили письмо на{" "}
          <span className="font-medium text-foreground">{data.email}</span>.
          Перейдите по ссылке для подтверждения аккаунта.
        </p>
        <p className="text-xs text-muted-foreground">
          После подтверждения вы сможете войти
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="flex flex-col gap-3 w-full"
      >
        <a
          href={`mailto:${data.email}`}
          className="inline-flex items-center justify-center bg-brand text-white rounded-lg px-6 py-3 font-semibold hover:bg-brand-hover transition-colors"
        >
          Открыть почту
        </a>
        <button
          onClick={handleResend}
          disabled={resendCooldown > 0}
          className="inline-flex items-center justify-center border-2 border-brand text-brand rounded-lg px-6 py-3 font-semibold hover:bg-brand-light dark:hover:bg-brand-dark transition-colors disabled:opacity-50"
        >
          {resendCooldown > 0
            ? `Отправить повторно (${resendCooldown}с)`
            : "Отправить повторно"}
        </button>
        <Link href="/login" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
          Войти после подтверждения →
        </Link>
      </motion.div>
    </div>
  );
}
