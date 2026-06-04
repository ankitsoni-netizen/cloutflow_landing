import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";
import { cn } from "@/lib/cn";

const WHATSAPP_URL = "https://wa.me/";

export function WhatsAppButton({ className }: { className?: string }) {
  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "mt-6 inline-flex w-full items-center justify-center gap-3 h-12 px-6",
        "bg-[#25D366] text-white text-sm font-medium uppercase tracking-tight rounded-md",
        "border border-[#25D366] hover:bg-[#1da851] hover:border-[#1da851]",
        "transition-probe shadow-sm hover:shadow-md",
        className
      )}
    >
      <WhatsAppIcon className="h-5 w-5 shrink-0" />
      Open WhatsApp
    </a>
  );
}
