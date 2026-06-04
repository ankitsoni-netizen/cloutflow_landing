"use client";

import type { HelpUseCase } from "@/data/help-use-cases";
import { cn } from "@/lib/cn";

export function HelpUseCaseCard({
  useCase,
  isSelected,
  onSelect,
}: {
  useCase: HelpUseCase;
  isSelected: boolean;
  onSelect: (id: string) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => onSelect(useCase.id)}
      className={cn(
        "shrink-0 w-[min(72vw,280px)] text-left rounded-md border p-5 transition-probe",
        "bg-background-page hover:border-primary hover:shadow-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
        isSelected
          ? "border-primary ring-2 ring-primary/20 shadow-soft"
          : "border-border-light"
      )}
      aria-pressed={isSelected}
    >
      <h3 className="font-medium text-sm mb-1.5">{useCase.label}</h3>
      <p className="text-xs text-text-secondary leading-relaxed">
        {useCase.description}
      </p>
    </button>
  );
}
