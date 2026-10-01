"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { animate, motion, useMotionValue, useTime, useTransform } from "framer-motion";

import { TIMELINE, useHeroScene } from "@/components/hero/hero-context";
import { cn, easeInOutCubic, segment } from "@/lib/utils";

/** Where the card floats before it docks, as fractions of the stage; anchor by one edge per axis. */
export type FloatSpot = {
  left?: number;
  right?: number;
  top?: number;
  bottom?: number;
  rotate?: number;
  scale?: number;
};

type FlyerProps = {
  spot: FloatSpot;
  /** Stagger for the entrance on load, in seconds. */
  delay?: number;
  /** Shifts this card's window inside the fly range so cards do not land in unison. */
  lag?: number;
  className?: string;
  children: ReactNode;
};

/**
 * A dashboard card that starts life floating around the headline and travels to its
 * slot in the dashboard as the hero scrolls. The card is laid out in its docked
 * position; the float is a measured transform offset that eases to zero.
 */
export function Flyer({ spot, delay = 0, lag = 0, className, children }: FlyerProps) {
  const { progress, stageRef, pinned } = useHeroScene();
  const ref = useRef<HTMLDivElement>(null);

  const offsetX = useMotionValue(0);
  const offsetY = useMotionValue(0);
  const appear = useMotionValue(0);
  const time = useTime();

  const floatScale = spot.scale ?? 1;
  const floatRotate = spot.rotate ?? 0;
  const { left, right, top, bottom } = spot;

  useEffect(() => {
    const el = ref.current;
    const stage = stageRef.current;
    if (!pinned || !el || !stage) return;

    const measure = () => {
      // offsetLeft/Top ignore transforms, so this is the docked position even mid-flight.
      let dockedX = 0;
      let dockedY = 0;
      let node: HTMLElement | null = el;
      while (node && node !== stage) {
        dockedX += node.offsetLeft;
        dockedY += node.offsetTop;
        node = node.offsetParent as HTMLElement | null;
      }

      const stageW = stage.offsetWidth;
      const stageH = stage.offsetHeight;
      const w = el.offsetWidth * floatScale;
      const h = el.offsetHeight * floatScale;

      const floatX = left !== undefined ? left * stageW : stageW - (right ?? 0) * stageW - w;
      const floatY = top !== undefined ? top * stageH : stageH - (bottom ?? 0) * stageH - h;

      offsetX.set(floatX - dockedX);
      offsetY.set(floatY - dockedY);
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(stage);
    observer.observe(el);

    const entrance = animate(appear, 1, { duration: 1.2, delay: 0.35 + delay, ease: [0.16, 1, 0.3, 1] });

    return () => {
      observer.disconnect();
      entrance.stop();
    };
  }, [pinned, stageRef, offsetX, offsetY, appear, delay, floatScale, left, right, top, bottom]);

  const [flyStart, flyEnd] = TIMELINE.fly;
  const docked = useTransform(progress, (p) => easeInOutCubic(segment(p, flyStart + lag, flyEnd + lag)));

  const x = useTransform(() => offsetX.get() * (1 - docked.get()));
  const y = useTransform(() => {
    const adrift = 1 - docked.get();
    const bob = Math.sin(time.get() / 1100 + delay * 9) * 7 * adrift;
    const rise = (1 - appear.get()) * 28;
    return offsetY.get() * adrift + bob + rise;
  });
  const rotate = useTransform(() => floatRotate * (1 - docked.get()));
  const scale = useTransform(() => (1 + (floatScale - 1) * (1 - docked.get())) * (0.94 + 0.06 * appear.get()));
  const lift = useTransform(() => 1 - docked.get());

  return (
    <motion.div
      ref={ref}
      // Hidden on desktop until measured; the inline opacity takes over once pinned.
      className={cn("relative lg:origin-top-left lg:opacity-0 lg:will-change-transform", className)}
      style={pinned ? { x, y, rotate, scale, opacity: appear } : undefined}
    >
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 hidden rounded-elevated shadow-float lg:block"
        style={pinned ? { opacity: lift } : undefined}
      />
      {children}
    </motion.div>
  );
}
