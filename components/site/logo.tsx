import { cn } from "@/lib/utils";

/** House mark; swap for /Inzu_Connect_Logo.png via next/image if the bitmap is preferred. */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 28 32" fill="none" aria-hidden="true" className={cn("h-7 w-auto", className)}>
      <path
        d="M14 1.5 26 12.4V28a2.5 2.5 0 0 1-2.5 2.5H18v-8.2a4 4 0 0 0-8 0v8.2H4.5A2.5 2.5 0 0 1 2 28V12.4L14 1.5Z"
        fill="currentColor"
      />
      <path d="M14 1.5 2 12.4V17l12-10.6V1.5Z" fill="currentColor" opacity="0.55" />
    </svg>
  );
}

export function Logo({ className }: { className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <LogoMark />
      <span className="text-[19px] font-medium tracking-[-0.01em]">Inzu Connect</span>
    </span>
  );
}
