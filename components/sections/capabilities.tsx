"use client";

import { motion } from "framer-motion";
import { Bell, Building2, ChartColumn, Globe, ShieldCheck, Users, Wrench, Zap, type LucideIcon } from "lucide-react";

import { FallingLines } from "@/components/motion/falling-lines";
import { Reveal } from "@/components/motion/reveal";
import { capabilities } from "@/lib/content";

const ICONS: Record<(typeof capabilities)[number]["icon"], LucideIcon> = {
  building: Building2,
  users: Users,
  wrench: Wrench,
  chart: ChartColumn,
  globe: Globe,
  bell: Bell,
  shield: ShieldCheck,
  zap: Zap,
};

export function Capabilities() {
  return (
    <section className="bg-fog-white">
      <div className="shell py-24 lg:py-40">
        <div className="grid gap-8 lg:grid-cols-2 lg:items-end lg:gap-20">
          <div>
            <p className="tag">Built-in capabilities</p>
            <FallingLines
              className="headline mt-4"
              lines={["Everything you need.", { text: "Nothing you don’t.", italic: true }]}
            />
          </div>
          <Reveal className="lg:pb-3">
            <p className="max-w-[480px] text-body-lg text-slate-gray">
              Built by property managers, for property managers. Every feature earns its place.
            </p>
          </Reveal>
        </div>

        <motion.ul
          className="mt-14 grid gap-5 sm:grid-cols-2 lg:mt-20 lg:grid-cols-4"
          initial="hide"
          whileInView="show"
          viewport={{ once: true, margin: "0px 0px -15% 0px" }}
          variants={{ hide: {}, show: { transition: { staggerChildren: 0.07 } } }}
        >
          {capabilities.map((capability) => {
            const Icon = ICONS[capability.icon];

            return (
              <motion.li
                key={capability.title}
                className="group rounded-card bg-mist-gray px-6 pt-7 pb-8"
                variants={{
                  hide: { opacity: 0, y: -36, rotate: -1.5 },
                  show: { opacity: 1, y: 0, rotate: 0, transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] } },
                }}
              >
                <span className="flex size-11 items-center justify-center rounded-full bg-paper-white transition-transform duration-500 ease-out-expo group-hover:-translate-y-1 group-hover:rotate-[-8deg]">
                  <Icon className="size-[18px]" strokeWidth={1.6} />
                </span>
                <h3 className="mt-10 text-body-lg font-medium">{capability.title}</h3>
                <p className="mt-2 text-[16px] leading-normal text-slate-gray">{capability.body}</p>
              </motion.li>
            );
          })}
        </motion.ul>
      </div>
    </section>
  );
}
