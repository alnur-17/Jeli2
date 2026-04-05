"use client";

import { useState } from "react";
import { StepCard } from "../StepCard";
import { InfluencerFormData } from "@/lib/types/auth";

interface Props {
  data: InfluencerFormData;
  onNext: (partial: Partial<InfluencerFormData>) => void;
  onBack: () => void;
}

const inputClass =
  "w-full rounded-lg border border-gray-200 dark:border-gray-700 px-4 py-3 text-sm bg-white dark:bg-gray-900 text-foreground focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand transition-colors";

const MAX_BIO = 200;

export function Step2Bio({ data, onNext, onBack }: Props) {
  const [full_name, setFullName] = useState(data.full_name);
  const [bio, setBio] = useState(data.bio);

  return (
    <StepCard
      step={2}
      totalSteps={5}
      onBack={onBack}
      showBack
      ctaLabel="Далее"
      onNext={() => onNext({ full_name, bio })}
      secondaryAction={
        <button
          onClick={() => onNext({ full_name: "", bio: "" })}
          className="text-sm text-muted-foreground hover:text-foreground text-center transition-colors"
        >
          Пропустить
        </button>
      }
    >
      <div className="flex flex-col gap-1">
        <h2 className="font-headline text-4xl uppercase text-foreground leading-none">
          Расскажи о себе
        </h2>
        <p className="text-sm text-muted-foreground">Шаг 2 из 5 — необязательно</p>
      </div>

      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-foreground">
            Ваше имя
          </label>
          <input
            type="text"
            value={full_name}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="Айгерим Сатпаева"
            className={inputClass}
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-foreground flex justify-between">
            Коротко о себе
            <span className="text-muted-foreground font-normal">
              {bio.length}/{MAX_BIO}
            </span>
          </label>
          <textarea
            value={bio}
            onChange={(e) => {
              if (e.target.value.length <= MAX_BIO) setBio(e.target.value);
            }}
            placeholder="Фитнес-тренер, мама троих детей. Помогаю женщинам восстановиться после родов..."
            rows={4}
            className={`${inputClass} resize-none`}
          />
        </div>
      </div>
    </StepCard>
  );
}
