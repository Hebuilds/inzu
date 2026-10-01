"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";

import { cn } from "@/lib/utils";

type ScrubWordsProps = {
  text: string;
  as?: "p" | "h2" | "h3" | "blockquote";
  className?: string;
  startAt?: number;
  endAt?: number;
};

/** Wrapped text whose words ink in one after another as the block scrolls through the viewport. */
export function ScrubWords({ text, as = "p", className, startAt = 0.85, endAt = 0.4 }: ScrubWordsProps) {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: [`start ${startAt}`, `end ${endAt}`],
  });
  const words = text.split(" ");
  const Tag = as as "p";

  return (
    <Tag ref={ref} aria-label={text} className={cn(className)}>
      {words.map((word, index) => (
        <Word key={`${word}-${index}`} progress={scrollYProgress} index={index} total={words.length}>
          {word}
        </Word>
      ))}
    </Tag>
  );
}

function Word({
  progress,
  index,
  total,
  children,
}: {
  progress: MotionValue<number>;
  index: number;
  total: number;
  children: string;
}) {
  const start = index / total;
  const opacity = useTransform(progress, [start, start + 2.5 / total], [0.14, 1], { clamp: true });
  const y = useTransform(progress, [start, start + 2.5 / total], ["-0.18em", "0em"], { clamp: true });

  return (
    <>
      <motion.span aria-hidden="true" className="inline-block" style={{ opacity, y }}>
        {children}
      </motion.span>{" "}
    </>
  );
}
