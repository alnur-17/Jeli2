"use client";

import { useState } from "react";
import { StepCard } from "../StepCard";
import { BusinessFormData } from "@/lib/types/auth";

interface Props {
  data: BusinessFormData;
  onNext: (partial: Partial<BusinessFormData>) => void;
  onBack: () => void;
}

const inputClass =
  "w-full rounded-lg border border-gray-200 dark:border-gray-700 px-4 py-3 text-sm bg-white dark:bg-gray-900 text-foreground focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand transition-colors";

const MAX_BIO = 300;

export function Step2Bio({ data, onNext, onBack }: Props) {
  const [bio, setBio] = useState(data.bio);
  const [website, setWebsite] = useState(data.website);

  return (
    <StepCard
      step={2}
      totalSteps={4}
      onBack={onBack}
      showBack
      ctaLabel="Далее"
      onNext={() => onNext({ bio, website })}
    >
      <div className="flex flex-col gap-1">
        <h2 className="font-headline text-4xl uppercase text-foreground leading-none">
          О компании
        </h2>
        <p className="text-sm text-muted-foreground">Шаг 2 из 4</p>
      </div>

      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-foreground flex justify-between">
            О компании
            <span className="text-muted-foreground font-normal">
              {bio.length}/{MAX_BIO}
            </span>
          </label>
          <textarea
            value={bio}
            onChange={(e) => {
              if (e.target.value.length <= MAX_BIO) setBio(e.target.value);
            }}
            placeholder="Мы производим органические продукты питания..."
            rows={5}
            className={`${inputClass} resize-none`}
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-foreground">Сайт</label>
          <input
            type="url"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
            placeholder="https://yourcompany.kz"
            className={inputClass}
          />
        </div>
      </div>
    </StepCard>
  );
}
