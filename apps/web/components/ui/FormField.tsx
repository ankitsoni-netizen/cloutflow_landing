import { cn } from "@/lib/cn";

export function FormField({
  label,
  id,
  error,
  children,
  className,
}: {
  label: string;
  id: string;
  error?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <label htmlFor={id} className="text-sm text-text-secondary">
        {label}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} className="text-xs text-red-600" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

export const inputClass =
  "w-full h-12 px-4 border border-border-light rounded-md bg-background-page text-text-primary text-base focus:outline-none focus:border-primary";

export const textareaClass =
  "w-full min-h-[120px] p-4 border border-border-light rounded-md bg-background-page text-text-primary text-base focus:outline-none focus:border-primary resize-y";
