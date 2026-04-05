"use client";

import { motion } from "framer-motion";
import { Role } from "@/lib/types/auth";

interface RoleSelectorProps {
  onSelect: (role: Role) => void;
}

export function RoleSelector({ onSelect }: RoleSelectorProps) {
  return (
    <div className="w-full max-w-md flex flex-col gap-6">
      <div className="text-center">
        <h1 className="font-headline text-5xl uppercase text-foreground leading-none mb-2">
          Добро пожаловать
        </h1>
        <p className="text-muted-foreground text-base">
          Выбери свою роль на платформе
        </p>
      </div>

      <div className="flex flex-col gap-3">
        <motion.button
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
          onClick={() => onSelect("business")}
          className="w-full rounded-2xl border-2 border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 text-left hover:border-brand transition-colors group"
        >
          <div className="flex items-start gap-4">
            <span className="text-2xl">🏢</span>
            <div>
              <p className="font-semibold text-foreground group-hover:text-brand transition-colors">
                Я — бренд
              </p>
              <p className="text-sm text-muted-foreground mt-0.5">
                Запускаю кампании и ищу инфлюенсеров
              </p>
            </div>
          </div>
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
          onClick={() => onSelect("influencer")}
          className="w-full rounded-2xl border-2 border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 text-left hover:border-brand transition-colors group"
        >
          <div className="flex items-start gap-4">
            <span className="text-2xl">✨</span>
            <div>
              <p className="font-semibold text-foreground group-hover:text-brand transition-colors">
                Я — инфлюенсер
              </p>
              <p className="text-sm text-muted-foreground mt-0.5">
                Создаю контент и сотрудничаю с брендами
              </p>
            </div>
          </div>
        </motion.button>
      </div>

      <p className="text-center text-sm text-muted-foreground">
        Уже есть аккаунт?{" "}
        <a href="/login" className="text-brand hover:underline font-medium">
          Войти
        </a>
      </p>
    </div>
  );
}
