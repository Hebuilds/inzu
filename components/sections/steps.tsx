"use client";

import { useRef, useState } from "react";
import { motion, useMotionValueEvent, useScroll, useSpring, useTransform, type MotionValue } from "framer-motion";

import { FallingLines } from "@/components/motion/falling-lines";
import { Reveal } from "@/components/motion/reveal";
import { Button, ButtonArrow } from "@/components/ui/button";
import { automations, links, steps } from "@/lib/content";
import { cn } from "@/lib/utils";

/** How it works — the one dark band on the page. A rail draws itself across the four steps as you scroll. */
export function Steps() {
  const railRef = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: railRef, offset: ["start 0.82", "end 0.55"] });
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 26, mass: 0.4 });

  return (
    <section className="bg-ink-black text-paper-white">
      <div className="shell py-24 lg:py-40">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="tag text-paper-white/50">How it works</p>
            <FallingLines className="headline mt-4" lines={["Up and running", { text: "in minutes.", italic: true }]} />
          </div>
          <Reveal>
            <Button asChild variant="outline-inverse">
              <a href={links.register}>
                Create your company <ButtonArrow />
              </a>
            </Button>
          </Reveal>
        </div>

        <ol ref={railRef} className="relative mt-14 grid gap-10 lg:mt-24 lg:grid-cols-4 lg:gap-8">
          <span aria-hidden="true" className="absolute top-[7px] right-0 left-0 hidden h-px bg-paper-white/15 lg:block">
            <motion.span className="absolute inset-0 origin-left bg-paper-white" style={{ scaleX: progress }} />
          </span>
          {steps.map((step, index) => (
            <Step key={step.title} progress={progress} index={index} total={steps.length} {...step} />
          ))}
        </ol>

        <AutomationRibbon />
      </div>
    </section>
  );
}

function Step({
  progress,
  index,
  total,
  title,
  body,
}: {
  progress: MotionValue<number>;
  index: number;
  total: number;
  title: string;
  body: string;
}) {
  const at = index / total;
  const lit = useTransform(progress, [at - 0.04, at + 0.12], [0, 1], { clamp: true });
  const opacity = useTransform(lit, [0, 1], [0.32, 1]);
  const y = useTransform(lit, [0, 1], [-14, 0]);
  const dotScale = useTransform(lit, [0, 1], [0.5, 1]);

  return (
    <li className="relative">
      <span
        aria-hidden="true"
        className="relative hidden size-[15px] items-center justify-center rounded-full bg-ink-black ring-1 ring-paper-white/30 lg:flex"
      >
        <motion.span className="size-[7px] rounded-full bg-paper-white" style={{ scale: dotScale, opacity: lit }} />
      </span>
      <motion.div className="lg:mt-8" style={{ opacity, y }}>
        <p className="font-serif text-[44px] leading-none tracking-[-0.015em] italic">{index + 1}</p>
        <h3 className="mt-5 text-body-lg font-medium">{title}</h3>
        <p className="mt-2 max-w-[300px] text-[16px] leading-normal text-paper-white/60">{body}</p>
      </motion.div>
    </li>
  );
}

const DAYS = 30;
const dayPosition = (day: number) => ((day - 1) / (DAYS - 1)) * 100;

/** Step four, spelled out: what the background jobs do across a month. */
function AutomationRibbon() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.6"] });
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 26, mass: 0.4 });
  const left = useTransform(progress, [0, 1], ["0%", "100%"]);
  const [day, setDay] = useState(1);

  useMotionValueEvent(progress, "change", (p) => setDay(Math.round(1 + Math.min(1, Math.max(0, p)) * (DAYS - 1))));

  return (
    <div ref={ref} className="mt-20 rounded-card bg-paper-white/[0.06] p-7 lg:mt-28 lg:p-12">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
        <h3 className="text-heading-sm font-w450">Then the month runs itself.</h3>
        <p className="max-w-[380px] text-[16px] leading-normal text-paper-white/60">
          Background jobs handle the calendar, so nobody has to remember the 1st.
        </p>
      </div>

      {/* Desktop: a 30-day track with a marker that travels as you scroll. */}
      <div aria-hidden="true" className="relative mt-10 hidden h-[236px] lg:block">
        <div className="absolute inset-x-0 top-1/2 h-px bg-paper-white/15">
          <motion.span className="absolute inset-0 origin-left bg-paper-white/70" style={{ scaleX: progress }} />
        </div>

        {Array.from({ length: DAYS }, (_, index) => (
          <span
            key={index}
            className="absolute top-1/2 h-2 w-px -translate-y-1/2 bg-paper-white/20"
            style={{ left: `${dayPosition(index + 1)}%` }}
          />
        ))}

        {automations.map((job, index) => (
          <Job key={job.label} progress={progress} above={index % 2 === 0} {...job} />
        ))}

        <motion.div className="absolute top-1/2 z-10" style={{ left }}>
          <span className="absolute -top-[7px] -left-[7px] size-[15px] rounded-full bg-paper-white shadow-[0_0_0_6px_rgba(255,255,255,0.14)]" />
          <span className="absolute top-4 left-0 -translate-x-1/2 rounded-full bg-paper-white px-2.5 py-1 text-[12px] whitespace-nowrap text-ink-black tabular-nums">
            Day {day}
          </span>
        </motion.div>
      </div>

      {/* Below desktop (and for screen readers): the same schedule as a list. */}
      <ul className="mt-8 divide-y divide-paper-white/10 lg:sr-only">
        {automations.map((job) => (
          <li key={job.label} className="flex items-baseline gap-5 py-4">
            <span className="w-14 shrink-0 font-serif text-[26px] leading-none italic">{job.day}</span>
            <span>
              <span className="block text-[17px] font-medium">{job.label}</span>
              <span className="mt-0.5 block text-[15px] text-paper-white/60">{job.detail}</span>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Job({
  progress,
  day,
  label,
  detail,
  above,
}: {
  progress: MotionValue<number>;
  day: number;
  label: string;
  detail: string;
  above: boolean;
}) {
  const at = (day - 1) / (DAYS - 1);
  const lit = useTransform(progress, [at - 0.06, at + 0.01], [0, 1], { clamp: true });
  const opacity = useTransform(lit, [0, 1], [0.3, 1]);
  const lift = useTransform(lit, [0, 1], [above ? -8 : 8, 0]);
  const align = at < 0.1 ? "items-start text-left" : at > 0.9 ? "items-end text-right" : "items-center text-center";
  const shift = at < 0.1 ? "" : at > 0.9 ? "-translate-x-full" : "-translate-x-1/2";

  return (
    <div
      className={cn(
        "absolute flex w-[190px] flex-col",
        shift,
        align,
        above ? "bottom-1/2 flex-col" : "top-1/2 flex-col-reverse",
      )}
      style={{ left: `${dayPosition(day)}%` }}
    >
      <motion.div className={cn("flex flex-col", align)} style={{ opacity, y: lift }}>
        <span className="font-serif text-[26px] leading-none italic">{day}</span>
        <span className="mt-1.5 text-[15px] font-medium">{label}</span>
        <span className="text-[13.5px] leading-snug text-paper-white/55">{detail}</span>
      </motion.div>
      <motion.span className="my-2 h-6 w-px bg-paper-white" style={{ opacity: lit }} />
    </div>
  );
}
