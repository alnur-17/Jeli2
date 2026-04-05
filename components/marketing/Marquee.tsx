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
    <div className="overflow-hidden py-3 border-y border-border/60 bg-muted/20">
      <div className="flex animate-marquee gap-2 w-max">
        {doubled.map((pill, i) => (
          <span
            key={i}
            className={
              pill.broad
                ? "bg-foreground text-background text-xs font-medium px-3 py-1.5 rounded-full whitespace-nowrap shrink-0"
                : "border border-border bg-background text-muted-foreground text-xs font-medium px-3 py-1.5 rounded-full whitespace-nowrap shrink-0"
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
          animation: marquee 40s linear infinite;
        }
      `}</style>
    </div>
  );
}
