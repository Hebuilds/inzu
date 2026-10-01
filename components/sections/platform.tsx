"use client";

import { useRef, useState, type ComponentType } from "react";
import { motion, useMotionValueEvent, useScroll, useTransform, type MotionValue } from "framer-motion";

import { FallingLines } from "@/components/motion/falling-lines";
import { Reveal } from "@/components/motion/reveal";
import { ScrubWords } from "@/components/motion/scrub-words";
import { FloorsIllustration, KeysIllustration, PinIllustration } from "@/components/platform/illustrations";
import { Button, ButtonArrow } from "@/components/ui/button";
import { DESKTOP_QUERY, useMediaQuery } from "@/hooks/use-media-query";
import { audiences, links } from "@/lib/content";
import { cn } from "@/lib/utils";

const ILLUSTRATIONS: Record<(typeof audiences)[number]["id"], ComponentType<{ active: boolean }>> = {
  landlords: FloorsIllustration,
  tenants: KeysIllustration,
  agents: PinIllustration,
};

/**
 * "Who it's for". The headline falls in line by line, then the three audience
 * cards pin to the viewport and scrolling moves the highlight from one to the next.
 */
export function Platform() {
  const trackRef = useRef<HTMLDivElement>(null);
  const pinned = useMediaQuery(DESKTOP_QUERY);
  const [active, setActive] = useState(0);

  const { scrollYProgress } = useScroll({ target: trackRef, offset: ["start start", "end end"] });
  useMotionValueEvent(scrollYProgress, "change", (p) => {
    if (pinned) setActive(Math.min(audiences.length - 1, Math.floor(p * audiences.length)));
  });

  const goTo = (index: number) => {
    const track = trackRef.current;
    if (!track || !pinned) return;
    const top = track.getBoundingClientRect().top + window.scrollY;
    const distance = track.offsetHeight - window.innerHeight;
    window.scrollTo({ top: top + distance * ((index + 0.5) / audiences.length), behavior: "smooth" });
  };

  return (
    <section className="bg-paper-white">
      <div className="shell grid gap-10 pt-24 lg:grid-cols-2 lg:items-end lg:gap-20 lg:pt-40">
        <div>
          <p className="tag">Our platform</p>
          <FallingLines
            className="headline mt-4"
            lines={["Built for", "everyone", "under", { text: "one roof.", italic: true }]}
          />
        </div>
        <div className="lg:pb-3">
          <ScrubWords
            className="text-subheading leading-[1.4] font-w430 tracking-[-0.009em]"
            text="Streamline every part of your rental portfolio from a single dashboard. List properties, screen tenants, collect rent and track maintenance, whether you manage one unit or hundreds."
          />
          <Reveal className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3" delay={0.1}>
            <Button asChild variant="soft">
              <a href={links.contact}>
                Get in touch <ButtonArrow />
              </a>
            </Button>
            <Button asChild variant="link" size="link">
              <a href={links.register}>
                See how it works <ButtonArrow />
              </a>
            </Button>
          </Reveal>
        </div>
      </div>

      <div ref={trackRef} className="relative mt-14 lg:mt-0 lg:h-[270vh]">
        <div className="lg:sticky lg:top-0 lg:flex lg:h-screen lg:min-h-[640px] lg:items-center">
          <div className="shell pb-24 lg:pt-[72px] lg:pb-0">
            <div className="mb-6 hidden items-center justify-between lg:flex">
              <p className="tag">Who it&apos;s for</p>
              <div className="flex items-center gap-2" aria-hidden="true">
                {audiences.map((audience, index) => (
                  <Meter key={audience.id} progress={scrollYProgress} index={index} total={audiences.length} />
                ))}
              </div>
            </div>

            <div className="grid gap-5 lg:h-[520px] lg:grid-cols-3 lg:items-end">
              {audiences.map((audience, index) => {
                const Illustration = ILLUSTRATIONS[audience.id];
                const isActive = active === index;

                return (
                  <motion.article
                    key={audience.id}
                    onClick={() => goTo(index)}
                    // Below desktop nothing is pinned: whichever card crosses mid-screen lights up.
                    onViewportEnter={() => {
                      if (!pinned) setActive(index);
                    }}
                    viewport={{ margin: "-45% 0px -45% 0px" }}
                    className={cn(
                      "relative flex flex-col overflow-hidden rounded-card p-7 transition-[background-color,color,height] duration-700 ease-out-expo lg:cursor-pointer lg:p-8",
                      isActive
                        ? "bg-blush-peach text-sienna-brown lg:h-[520px]"
                        : "bg-mist-gray text-ink-black/75 lg:h-[404px]",
                    )}
                  >
                    <h3 className="text-heading-sm font-w450">{audience.title}</h3>

                    <div className="flex h-[230px] shrink-0 items-center justify-center py-2 lg:mt-3 lg:h-[250px]">
                      <Illustration active={isActive} />
                    </div>

                    <p
                      className={cn(
                        "mt-auto text-[18px] leading-[1.39] font-w430 tracking-[-0.009em] transition-[opacity,transform] duration-700 ease-out-expo",
                        !isActive && "lg:translate-y-4 lg:opacity-0",
                      )}
                    >
                      {audience.body}
                    </p>
                  </motion.article>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/** One segment of the scroll meter above the cards; fills while its card is the active one. */
function Meter({ progress, index, total }: { progress: MotionValue<number>; index: number; total: number }) {
  const scaleX = useTransform(progress, [index / total, (index + 1) / total], [0, 1], { clamp: true });

  return (
    <span className="relative h-[3px] w-12 overflow-hidden rounded-full bg-mist-gray">
      <motion.span className="absolute inset-0 origin-left rounded-full bg-ink-black" style={{ scaleX }} />
    </span>
  );
}
