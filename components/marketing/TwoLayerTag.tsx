import { TwoLayerTagProps } from "./types";

export function TwoLayerTag({ parent, items }: TwoLayerTagProps) {
  return (
    <div className="flex flex-col gap-2">
      <span className="self-start bg-brand text-white text-sm font-semibold px-4 py-1.5 rounded-full">
        {parent}
      </span>
      <div className="flex flex-wrap gap-2 pl-4 border-l-2 border-brand ml-3">
        {items.map((item) => (
          <span
            key={item}
            className="border-2 border-brand text-brand text-sm font-medium px-3 py-1 rounded-full"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
