"use client";

import { HelpUseCaseCard } from "@/components/help/HelpUseCaseCard";
import type { HelpUseCase } from "@/data/help-use-cases";
import { helpUseCasesRowOne, helpUseCasesRowTwo } from "@/data/help-use-cases";

function MarqueeRow({
  items,
  direction,
  selectedId,
  onSelect,
}: {
  items: HelpUseCase[];
  direction: "ltr" | "rtl";
  selectedId: string | null;
  onSelect: (id: string) => void;
}) {
  const track = [...items, ...items, ...items, ...items];

  return (
    <div className="help-marquee-band overflow-hidden py-3">
      <div
        className={
          direction === "ltr"
            ? "flex w-max min-w-full gap-4 pr-4 animate-help-marquee-ltr"
            : "flex w-max min-w-full gap-4 pl-4 animate-help-marquee-rtl"
        }
      >
        {track.map((useCase, index) => (
          <HelpUseCaseCard
            key={`${useCase.id}-${index}`}
            useCase={useCase}
            isSelected={selectedId === useCase.id}
            onSelect={onSelect}
          />
        ))}
      </div>
    </div>
  );
}

export function HelpUseCaseMarquees({
  selectedId,
  onSelect,
}: {
  selectedId: string | null;
  onSelect: (id: string) => void;
}) {
  return (
    <div className="space-y-4" aria-label="Help topics">
      <MarqueeRow
        items={helpUseCasesRowOne}
        direction="ltr"
        selectedId={selectedId}
        onSelect={onSelect}
      />
      <MarqueeRow
        items={helpUseCasesRowTwo}
        direction="rtl"
        selectedId={selectedId}
        onSelect={onSelect}
      />
    </div>
  );
}
