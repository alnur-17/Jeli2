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

type Gender = "male" | "female" | "other" | "";

const genders: { value: Gender; label: string }[] = [
  { value: "male", label: "Мужской" },
  { value: "female", label: "Женский" },
  { value: "other", label: "Другой" },
];

export function Step3Demographics({ data, onNext, onBack }: Props) {
  const [gender, setGender] = useState<Gender>(data.gender);
  const [age, setAge] = useState(data.age);

  function handleNext() {
    onNext({ gender, age });
  }

  return (
    <StepCard
      step={3}
      totalSteps={5}
      onBack={onBack}
      showBack
      ctaLabel="Далее"
      onNext={handleNext}
      secondaryAction={
        <button
          onClick={() => onNext({ gender: "", age: "" })}
          className="text-sm text-muted-foreground hover:text-foreground text-center transition-colors"
        >
          Пропустить
        </button>
      }
    >
      <div className="flex flex-col gap-1">
        <h2 className="font-headline text-4xl uppercase text-foreground leading-none">
          О тебе
        </h2>
        <p className="text-sm text-muted-foreground">Шаг 3 из 5 — необязательно</p>
      </div>

      <div className="flex flex-col gap-6">
        {/* Gender */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-foreground">Пол</label>
          <div className="flex gap-2 flex-wrap">
            {genders.map((g) => (
              <button
                key={g.value}
                onClick={() => setGender(gender === g.value ? "" : g.value)}
                className={`rounded-full px-4 py-2 text-sm font-medium border-2 transition-colors ${
                  gender === g.value
                    ? "border-brand bg-brand text-white"
                    : "border-gray-200 dark:border-gray-700 text-foreground hover:border-brand"
                }`}
              >
                {g.label}
              </button>
            ))}
          </div>
        </div>

        {/* Age */}
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-foreground">Возраст</label>
          <input
            type="number"
            min={13}
            max={100}
            value={age}
            onChange={(e) => setAge(e.target.value)}
            placeholder="25"
            className={inputClass}
          />
        </div>
      </div>
    </StepCard>
  );
}
