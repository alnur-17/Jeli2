"use client";

const broadNiches = [
  "Фитнес",
  "Мода",
  "Еда",
  "Технологии",
  "Бьюти",
  "Путешествия",
  "Финансы",
];

const specificNiches = [
  "Женский фитнес после родов",
  "Веганская кухня",
  "Рестораны Алматы",
  "Силовые тренировки",
  "Уходовая косметика",
  "Гаджеты и обзоры",
  "Макияж для начинающих",
];

const allPills = [
  ...broadNiches.map((n) => ({ label: n, broad: true })),
  ...specificNiches.map((n) => ({ label: n, broad: false })),
];

const doubled = [...allPills, ...allPills];

export function Marquee() {
  return (
    <div className="overflow-hidden py-4">
      <div className="flex animate-marquee gap-3 w-max">
        {doubled.map((pill, i) => (
          <span
            key={i}
            className={
              pill.broad
                ? "bg-brand text-white text-sm font-semibold px-4 py-2 rounded-full whitespace-nowrap shrink-0"
                : "border-2 border-brand text-brand text-sm font-medium px-4 py-2 rounded-full whitespace-nowrap shrink-0"
            }
          >
            {pill.label}
          </span>
        ))}
      </div>
      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
      `}</style>
    </div>
  );
}
