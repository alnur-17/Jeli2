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

const SPHERES = [
  "Еда и рестораны",
  "Мода и одежда",
  "Технологии",
  "Красота и уход",
  "Фитнес и спорт",
  "Образование",
  "Финансы",
  "Путешествия",
  "Недвижимость",
  "Другое",
];

export function Step3Sphere({ data, onNext, onBack }: Props) {
  const [sphere, setSphere] = useState(data.sphere);
  const [customSphere, setCustomSphere] = useState(
    SPHERES.includes(data.sphere) ? "" : data.sphere
  );

  function handleNext() {
    const finalSphere = sphere === "Другое" ? customSphere : sphere;
    onNext({ sphere: finalSphere });
  }

  return (
    <StepCard
      step={3}
      totalSteps={4}
      onBack={onBack}
      showBack
      ctaLabel="Далее"
      onNext={handleNext}
    >
      <div className="flex flex-col gap-1">
        <h2 className="font-headline text-4xl uppercase text-foreground leading-none">
          Сфера
        </h2>
        <p className="text-sm text-muted-foreground">Шаг 3 из 4</p>
      </div>

      <div className="flex flex-col gap-4">
        <div>
          <label className="text-sm font-medium text-foreground block mb-3">
            Сфера деятельности
          </label>
          <div className="flex flex-wrap gap-2">
            {SPHERES.map((s) => (
              <button
                key={s}
                onClick={() => setSphere(sphere === s ? "" : s)}
                className={`rounded-full px-4 py-2 text-sm font-medium border-2 transition-colors ${
                  sphere === s
                    ? "border-brand bg-brand text-white"
                    : "border-gray-200 dark:border-gray-700 text-foreground hover:border-brand"
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {sphere === "Другое" && (
          <input
            type="text"
            value={customSphere}
            onChange={(e) => setCustomSphere(e.target.value)}
            placeholder="Введите сферу"
            className={inputClass}
          />
        )}
      </div>
    </StepCard>
  );
}
