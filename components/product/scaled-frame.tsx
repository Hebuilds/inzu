"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

import { cn } from "@/lib/utils";

type ScaledFrameProps = {
  /** The size the contents are designed at; they are scaled as one piece to fit the frame. */
  width: number;
  height: number;
  className?: string;
  children: ReactNode;
};

/** Renders a product mock at a fixed design size and scales it to the available width, like a screenshot. */
export function ScaledFrame({ width, height, className, children }: ScaledFrameProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState<number | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new ResizeObserver(([entry]) => setScale(entry.contentRect.width / width));
    observer.observe(el);
    return () => observer.disconnect();
  }, [width]);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className={cn("relative w-full overflow-hidden", className)}
      style={{ aspectRatio: `${width} / ${height}` }}
    >
      <div
        className="absolute top-0 left-0 origin-top-left transition-opacity duration-300"
        style={{ width, height, transform: `scale(${scale ?? 1})`, opacity: scale === null ? 0 : 1 }}
      >
        {children}
      </div>
    </div>
  );
}
