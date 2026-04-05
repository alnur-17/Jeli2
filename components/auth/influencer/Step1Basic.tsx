"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { StepCard } from "../StepCard";
import { InfluencerFormData } from "@/lib/types/auth";

interface Props {
  data: InfluencerFormData;
  onNext: (partial: Partial<InfluencerFormData>) => void;
  onBack: () => void;
}

const inputClass =
  "w-full rounded-lg border border-gray-200 dark:border-gray-700 px-4 py-3 text-sm bg-white dark:bg-gray-900 text-foreground focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand transition-colors";

export function Step1Basic({ data, onNext, onBack }: Props) {
  const [username, setUsername] = useState(data.username);
  const [email, setEmail] = useState(data.email);
  const [password, setPassword] = useState(data.password);
  const [confirm, setConfirm] = useState(data.password);
  const [showPass, setShowPass] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  function validate() {
    const e: Record<string, string> = {};
    if (!username.trim()) e.username = "Введите имя пользователя";
    else if (!/^[a-z0-9_]{3,30}$/.test(username))
      e.username = "Только латиница, цифры и _. От 3 до 30 символов";
    if (!email.trim()) e.email = "Введите email";
    else if (!/\S+@\S+\.\S+/.test(email)) e.email = "Некорректный email";
    if (!password) e.password = "Введите пароль";
    else if (password.length < 6) e.password = "Минимум 6 символов";
    if (password !== confirm) e.confirm = "Пароли не совпадают";
    return e;
  }

  function handleNext() {
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length === 0) {
      onNext({ username: username.toLowerCase(), email, password });
    }
  }

  return (
    <StepCard
      step={1}
      totalSteps={5}
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
          Создай аккаунт
        </h2>
        <p className="text-sm text-muted-foreground">Шаг 1 из 5</p>
      </div>

      <div className="flex flex-col gap-4">
        {/* Username */}
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-foreground">
            Имя пользователя
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">
              @
            </span>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="username"
              className={`${inputClass} pl-7`}
              autoComplete="username"
            />
          </div>
          {errors.username && (
            <p className="text-xs text-red-500">{errors.username}</p>
          )}
        </div>

        {/* Email */}
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-foreground">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
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

        {/* Confirm password */}
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
