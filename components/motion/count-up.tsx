"use client";

import { useEffect, useRef } from "react";
import { animate, useInView } from "framer-motion";

type CountUpProps = {
  value: number;
  suffix?: string;
  className?: string;
};

const format = (n: number) => Math.round(n).toLocaleString("en-US");

/** Counts from zero to `value` the first time it enters the viewport. */
export function CountUp({ value, suffix = "", className }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });

  useEffect(() => {
    const node = ref.current;
    if (!inView || !node) return;

    const controls = animate(0, value, {
      duration: 1.8,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (latest) => {
        node.textContent = format(latest) + suffix;
      },
    });
    return () => controls.stop();
  }, [inView, value, suffix]);

  // Server render carries the final value so the number is right without JS.
  return (
    <span ref={ref} className={className}>
      {format(value) + suffix}
    </span>
  );
}
