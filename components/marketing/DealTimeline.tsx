import { Building2, UserRound, Users } from "lucide-react";

export type DealTimelineStep = {
  title: string;
  description: string;
  who: "brand" | "creator" | "both";
};

const whoLabel: Record<DealTimelineStep["who"], string> = {
  brand: "Бренд",
  creator: "Автор",
  both: "Обе стороны",
};

const whoIcon = {
  brand: Building2,
  creator: UserRound,
  both: Users,
} as const;

export function DealTimeline({ steps }: { steps: DealTimelineStep[] }) {
  return (
    <ol className="relative max-w-2xl mx-auto md:mx-0 border-l border-border pl-6 space-y-10">
      {steps.map((step, i) => {
        const Icon = whoIcon[step.who];
        return (
          <li key={step.title} className="relative">
            <span className="absolute -left-[1.4rem] top-0 flex h-6 w-6 items-center justify-center rounded-full border border-border bg-background text-xs font-semibold text-foreground">
              {i + 1}
            </span>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-muted/50 px-2.5 py-0.5 text-xs font-medium text-muted-foreground">
                <Icon className="h-3.5 w-3.5" aria-hidden />
                {whoLabel[step.who]}
              </span>
              <h3 className="text-base font-semibold text-foreground">{step.title}</h3>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
          </li>
        );
      })}
    </ol>
  );
}
