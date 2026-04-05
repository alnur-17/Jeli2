"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { StepCard } from "../StepCard";
import { BusinessFormData } from "@/lib/types/auth";

interface Props {
  data: BusinessFormData;
  onNext: (partial: Partial<BusinessFormData>) => void;
  onBack: () => void;
}

const inputClass =
  "w-full rounded-lg border border-gray-200 dark:border-gray-700 px-4 py-3 text-sm bg-white dark:bg-gray-900 text-foreground focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand transition-colors";

const COMPANY_TYPES = ["ТОО", "ИП", "АО", "Другое"] as const;
type CompanyType = (typeof COMPANY_TYPES)[number] | "";

export function Step1Company({ data, onNext, onBack }: Props) {
  const [company_name, setCompanyName] = useState(data.company_name);
  const [company_type, setCompanyType] = useState<CompanyType>(data.company_type);
  const [bin, setBin] = useState(data.bin);
  const [email, setEmail] = useState(data.email);
  const [password, setPassword] = useState(data.password);
  const [confirm, setConfirm] = useState(data.password);
  const [showPass, setShowPass] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  function validate() {
    const e: Record<string, string> = {};
    if (!company_name.trim()) e.company_name = "Введите название компании";
    if (!email.trim()) e.email = "Введите email";
    else if (!/\S+@\S+\.\S+/.test(email)) e.email = "Некорректный email";
    if (!password) e.password = "Введите пароль";
    else if (password.length < 6) e.password = "Минимум 6 символов";
    if (password !== confirm) e.confirm = "Пароли не совпадают";
    if (bin && !/^\d{12}$/.test(bin)) e.bin = "БИН/ИИН — 12 цифр";
    return e;
  }

  function handleNext() {
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length === 0) {
      onNext({ company_name, company_type, bin, email, password });
    }
  }

  return (
    <StepCard
      step={1}
      totalSteps={4}
      onBack={onBack}
      showBack={false}
      ctaLabel="Далее"
      onNext={handleNext}
      secondaryAction={
        <p className="text-center text-sm text-muted-foreground">
          Уже есть аккаунт?{" "}
          <a href="/login" className="text-brand hover:underline font-medium">
            Войти
          </a>
        </p>
      }
    >
      <div className="flex flex-col gap-1">
        <h2 className="font-headline text-4xl uppercase text-foreground leading-none">
          О компании
        </h2>
        <p className="text-sm text-muted-foreground">Шаг 1 из 4</p>
      </div>

      <div className="flex flex-col gap-4">
        {/* Company name */}
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-foreground">
            Название компании
          </label>
          <input
            type="text"
            value={company_name}
            onChange={(e) => setCompanyName(e.target.value)}
            placeholder="ТОО «Ромашка»"
            className={inputClass}
          />
          {errors.company_name && (
            <p className="text-xs text-red-500">{errors.company_name}</p>
          )}
        </div>

        {/* Company type */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-foreground">Тип</label>
          <div className="flex flex-wrap gap-2">
            {COMPANY_TYPES.map((t) => (
              <button
                key={t}
                onClick={() => setCompanyType(company_type === t ? "" : t)}
                className={`rounded-full px-4 py-2 text-sm font-medium border-2 transition-colors ${
                  company_type === t
                    ? "border-brand bg-brand text-white"
                    : "border-gray-200 dark:border-gray-700 text-foreground hover:border-brand"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        {/* BIN */}
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-foreground">
            БИН / ИИН{" "}
            <span className="text-muted-foreground font-normal text-xs">
              — для верификации в будущем
            </span>
          </label>
          <input
            type="text"
            value={bin}
            onChange={(e) => setBin(e.target.value.replace(/\D/g, "").slice(0, 12))}
            placeholder="123456789012"
            className={inputClass}
          />
          {errors.bin && <p className="text-xs text-red-500">{errors.bin}</p>}
        </div>

        {/* Email */}
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-foreground">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="info@company.kz"
            className={inputClass}
            autoComplete="email"
          />
          {errors.email && (
            <p className="text-xs text-red-500">{errors.email}</p>
          )}
        </div>

        {/* Password */}
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-foreground">Пароль</label>
          <div className="relative">
            <input
              type={showPass ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Минимум 6 символов"
              className={`${inputClass} pr-10`}
              autoComplete="new-password"
            />
            <button
              type="button"
              onClick={() => setShowPass(!showPass)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
          {errors.password && (
            <p className="text-xs text-red-500">{errors.password}</p>
          )}
        </div>

        {/* Confirm */}
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-foreground">
            Повторите пароль
          </label>
          <input
            type={showPass ? "text" : "password"}
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            placeholder="Повторите пароль"
            className={inputClass}
            autoComplete="new-password"
          />
          {errors.confirm && (
            <p className="text-xs text-red-500">{errors.confirm}</p>
          )}
        </div>
      </div>
    </StepCard>
  );
}
