"use client";

import { ArrowLeft } from "lucide-react";
import { ProgressBar } from "./ProgressBar";

interface StepCardProps {
  children: React.ReactNode;
  step: number;
  totalSteps: number;
  onBack?: () => void;
  showBack?: boolean;
  ctaLabel?: string;
  onNext?: () => void;
  ctaDisabled?: boolean;
  isLoading?: boolean;
  secondaryAction?: React.ReactNode;
}

export function StepCard({
  children,
  step,
  totalSteps,
  onBack,
  showBack = true,
  ctaLabel = "Далее",
  onNext,
  ctaDisabled = false,
  isLoading = false,
  secondaryAction,
}: StepCardProps) {
  return (
    <div className="w-full max-w-md flex flex-col gap-0 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm overflow-hidden">
      {/* Progress bar at top */}
      <ProgressBar current={step} total={totalSteps} />

      <div className="p-8 flex flex-col gap-6">
        {/* Back button */}
        {showBack && onBack && (
          <button
            onClick={onBack}
            className="self-start flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Назад
          </button>
        )}

        {/* Step content */}
        {children}

        {/* CTA */}
        {onNext && (
          <div className="flex flex-col gap-2">
            <button
              onClick={onNext}
              disabled={ctaDisabled || isLoading}
              className="bg-brand text-white w-full rounded-lg py-3 font-semibold hover:bg-brand-hover transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Загрузка...
                </>
              ) : (
                ctaLabel
              )}
            </button>
            {secondaryAction}
          </div>
        )}
      </div>
    </div>
  );
}
