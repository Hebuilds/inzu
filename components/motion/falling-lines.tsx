"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";

import { cn } from "@/lib/utils";

export type FallingLine = string | { text: string; italic?: boolean };

type FallingLinesProps = {
  lines: readonly FallingLine[];
  as?: "h1" | "h2" | "h3" | "p";
  className?: string;
  /** How far down the viewport the block is when the first line starts to fall (0 = top, 1 = bottom). */
  startAt?: number;
  endAt?: number;
};

const lineText = (line: FallingLine) => (typeof line === "string" ? line : line.text);

/**
 * Headline set one phrase per line. Each line drops into place as the block
 * travels up the viewport, scrubbed by scroll rather than played once.
 */
export function FallingLines({ lines, as = "h2", className, startAt = 0.92, endAt = 0.5 }: FallingLinesProps) {
  const ref = useRef<HTMLHeadingElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: [`start ${startAt}`, `end ${endAt}`],
  });
  const Tag = as as "h2";

  return (
    <Tag ref={ref} aria-label={lines.map(lineText).join(" ")} className={cn("flex flex-col", className)}>
      {lines.map((line, index) => (
        <Line
          key={lineText(line)}
          progress={scrollYProgress}
          index={index}
          total={lines.length}
          italic={typeof line !== "string" && line.italic}
        >
          {lineText(line)}
        </Line>
      ))}
    </Tag>
  );
}

function Line({
  progress,
  index,
  total,
  italic,
  children,
}: {
  progress: MotionValue<number>;
  index: number;
  total: number;
  italic?: boolean;
  children: string;
}) {
  // Lines overlap so the cascade reads as one continuous fall.
  const span = 1 / (total * 0.62 + 0.38);
  const start = index * span * 0.62;
  const t = useTransform(progress, [start, start + span], [0, 1], { clamp: true });

  const opacity = useTransform(t, [0, 0.35, 1], [0, 0.22, 1]);
  const y = useTransform(t, [0, 1], ["-0.7em", "0em"]);
  const rotate = useTransform(t, [0, 1], [-4, 0]);
  const filter = useTransform(t, (v) => `blur(${((1 - v) * 10).toFixed(2)}px)`);

  return (
    <span aria-hidden="true" className="-mb-[0.12em] block">
      <motion.span
        className={cn("inline-block origin-[0%_100%] will-change-transform", italic && "italic")}
        style={{ opacity, y, rotate, filter }}
      >
        {children}
      </motion.span>
    </span>
  );
}
