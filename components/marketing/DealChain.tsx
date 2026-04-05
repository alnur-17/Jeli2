import { ChevronRight } from "lucide-react";

interface DealChainProps {
  steps: string[];
}

export function DealChain({ steps }: DealChainProps) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      {steps.map((step, index) => (
        <div key={step} className="flex items-center gap-2">
          <span className="bg-brand text-white text-sm font-semibold px-4 py-2 rounded-full whitespace-nowrap">
            {step}
          </span>
          {index < steps.length - 1 && (
            <ChevronRight className="w-4 h-4 text-muted-foreground shrink-0" />
          )}
        </div>
      ))}
    </div>
  );
}
