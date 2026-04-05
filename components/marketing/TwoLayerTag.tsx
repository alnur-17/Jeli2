import { TwoLayerTagProps } from "./types";

export function TwoLayerTag({ parent, items }: TwoLayerTagProps) {
  return (
    <div className="flex flex-col gap-3 rounded-2xl border border-border bg-card p-5 shadow-sm">
      <span className="self-start bg-foreground text-background text-xs font-medium px-3 py-1 rounded-full">
        {parent}
      </span>
      <div className="flex flex-wrap gap-2 pl-1 border-l-2 border-border ml-2">
        {items.map((item) => (
          <span
            key={item}
            className="border border-border bg-background text-muted-foreground text-xs font-medium px-2.5 py-1 rounded-full"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
