"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { Bell, Check, MapPin } from "lucide-react";

import { FallingLines } from "@/components/motion/falling-lines";
import { Reveal } from "@/components/motion/reveal";
import { Button, ButtonArrow } from "@/components/ui/button";
import { links } from "@/lib/content";

const PROMISES = ["14-day free trial", "No setup fee", "Cancel anytime"];
const AVATAR_TINTS = ["bg-[#ece6f7]", "bg-[#dfe9fb]", "bg-[#dff0e2]", "bg-blush-peach"];

const artifact = "absolute hidden items-center gap-3.5 rounded-elevated bg-paper-white p-4 shadow-float xl:flex";

/** Closing call to action. The hero's floating cards return and drift at different speeds. */
export function Cta() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end end"] });
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 28, mass: 0.4 });

  const slow = useTransform(progress, [0, 1], [120, 0]);
  const medium = useTransform(progress, [0, 1], [220, 0]);
  const fast = useTransform(progress, [0, 1], [340, 0]);
  const wash = useTransform(progress, [0.2, 1], [0, 1]);

  return (
    <section id="contact" ref={ref} className="relative overflow-hidden bg-paper-white">
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(110%_55%_at_50%_108%,#fbe1d1_0%,rgba(251,225,209,0)_70%)] lg:bg-[radial-gradient(52%_60%_at_50%_108%,#fbe1d1_0%,rgba(251,225,209,0)_70%)]"
        style={{ opacity: wash }}
      />

      <motion.div aria-hidden="true" className={`${artifact} top-[24%] left-[3%] -rotate-3`} style={{ y: medium }}>
        <span className="flex size-10 items-center justify-center rounded-full bg-mist-gray">
          <Bell className="size-4" strokeWidth={1.75} />
        </span>
        <span>
          <span className="block text-[14.5px] font-medium">Rent reminder sent</span>
          <span className="block text-[12.5px] text-slate-gray">12 tenants notified via SMS</span>
        </span>
      </motion.div>

      <motion.div aria-hidden="true" className={`${artifact} top-[20%] right-[4%] rotate-2`} style={{ y: fast }}>
        <span className="flex size-10 items-center justify-center rounded-full bg-mist-gray">
          <MapPin className="size-4" strokeWidth={1.75} />
        </span>
        <span>
          <span className="block text-[14.5px] font-medium">Kigali Heights</span>
          <span className="block text-[12.5px] text-slate-gray">Kiyovu, Kigali</span>
        </span>
      </motion.div>

      <motion.div aria-hidden="true" className={`${artifact} right-[7%] bottom-[11%] -rotate-2`} style={{ y: slow }}>
        <span className="flex -space-x-2.5">
          {AVATAR_TINTS.map((tint) => (
            <span key={tint} className={`size-9 rounded-full ring-2 ring-paper-white ${tint}`} />
          ))}
        </span>
        <span>
          <span className="block text-[14.5px] font-medium">340+ tenants</span>
          <span className="block text-[12.5px] text-slate-gray">across 18 properties</span>
        </span>
      </motion.div>

      <div className="shell relative flex flex-col items-center py-28 text-center lg:py-48">
        <FallingLines
          className="display items-center"
          startAt={0.95}
          endAt={0.6}
          lines={["Ready to manage", { text: "properties smarter?", italic: true }]}
        />
        <Reveal className="mt-7 flex flex-col items-center">
          <p className="max-w-[520px] text-body-lg text-slate-gray">
            Start your 14-day free trial. No credit card required. Cancel anytime.
          </p>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
            <Button asChild size="lg">
              <a href={links.register}>
                Get started for free <ButtonArrow />
              </a>
            </Button>
            <Button asChild size="lg" variant="outline">
              <a href={links.contact}>Talk to sales</a>
            </Button>
          </div>
          <ul className="mt-9 flex flex-wrap items-center justify-center gap-x-7 gap-y-2 text-caption text-slate-gray">
            {PROMISES.map((promise) => (
              <li key={promise} className="inline-flex items-center gap-2">
                <Check className="size-3.5 text-ink-black" strokeWidth={2.25} />
                {promise}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
