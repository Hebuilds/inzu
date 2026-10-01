"use client";

import { useRef, useState, type ComponentType } from "react";
import { motion, useMotionValueEvent, useScroll, useTransform, type MotionValue } from "framer-motion";
import { Check } from "lucide-react";

import { FallingLines } from "@/components/motion/falling-lines";
import { Reveal } from "@/components/motion/reveal";
import { AnalyticsMock, MaintenanceMock, MOCK_SIZE, TenantsMock } from "@/components/product/feature-mocks";
import { ScaledFrame } from "@/components/product/scaled-frame";
import { Button, ButtonArrow } from "@/components/ui/button";
import { DESKTOP_QUERY, useMediaQuery } from "@/hooks/use-media-query";
import { features, links } from "@/lib/content";
import { cn } from "@/lib/utils";

const MOCKS: Record<(typeof features)[number]["id"], ComponentType<{ active: boolean }>> = {
  tenants: TenantsMock,
  maintenance: MaintenanceMock,
  analytics: AnalyticsMock,
};

/**
 * Product tour. On desktop the stage pins and scrolling steps through the
 * tabs while the screen on the right swaps; below desktop each feature is a
 * plain block with its own screen.
 */
export function Features() {
  const trackRef = useRef<HTMLDivElement>(null);
  const pinned = useMediaQuery(DESKTOP_QUERY);
  const [active, setActive] = useState(0);
  const total = features.length;

  const { scrollYProgress } = useScroll({ target: trackRef, offset: ["start start", "end end"] });
  useMotionValueEvent(scrollYProgress, "change", (p) => {
    if (pinned) setActive(Math.min(total - 1, Math.floor(p * total)));
  });

  const goTo = (index: number) => {
    const track = trackRef.current;
    if (!track || !pinned) return;
    const top = track.getBoundingClientRect().top + window.scrollY;
    const distance = track.offsetHeight - window.innerHeight;
    window.scrollTo({ top: top + distance * ((index + 0.2) / total), behavior: "smooth" });
  };

  return (
    <section id="product" className="scroll-mt-10 overflow-x-clip bg-fog-white">
      <div className="shell pt-24 lg:pt-40">
        <p className="tag">Product</p>
        <FallingLines
          className="headline mt-4"
          lines={["Every lease,", "every leak,", { text: "every ledger.", italic: true }]}
        />
        <Reveal className="mt-7 max-w-[540px]">
          <p className="text-body-lg text-slate-gray">
            Tenants, maintenance and money each get their own workspace, with one shared history running underneath.
          </p>
          <Button asChild variant="soft" className="mt-7">
            <a href={links.register}>
              See all features <ButtonArrow />
            </a>
          </Button>
        </Reveal>
      </div>

      <div ref={trackRef} className="relative mt-12 lg:mt-0 lg:h-[330vh]">
        <div className="lg:sticky lg:top-0 lg:flex lg:h-screen lg:min-h-[640px] lg:items-center">
          <div className="shell grid pb-24 lg:grid-cols-[320px_minmax(0,1fr)] lg:items-center lg:gap-14 lg:pt-[72px] lg:pb-0">
            <ol>
              {features.map((feature, index) => {
                const Mock = MOCKS[feature.id];
                const isActive = active === index;

                return (
                  <li key={feature.id} className="relative border-t border-hairline lg:border-t-0">
                    <button
                      type="button"
                      onClick={() => goTo(index)}
                      aria-current={pinned && isActive ? "step" : undefined}
                      className={cn(
                        "block w-full cursor-default pt-8 pb-3 text-left text-body-lg font-medium transition-colors duration-500 lg:cursor-pointer lg:pt-5 lg:pb-5",
                        !isActive && "lg:text-slate-gray lg:hover:text-ink-black",
                      )}
                    >
                      {feature.title}
                    </button>

                    {/* Collapsed on desktop unless active; always open below desktop. */}
                    <div
                      className={cn(
                        "grid transition-[grid-template-rows] duration-700 ease-out-expo",
                        isActive ? "lg:grid-rows-[1fr]" : "lg:grid-rows-[0fr]",
                      )}
                    >
                      <div className="overflow-hidden">
                        <p className="text-[16px] leading-normal text-slate-gray">{feature.body}</p>
                        <ul className="mt-4 space-y-2.5 pb-7">
                          {feature.points.map((point) => (
                            <li key={point} className="flex gap-2.5 text-[15px] leading-normal">
                              <Check className="mt-[5px] size-3.5 shrink-0" strokeWidth={2.25} />
                              {point}
                            </li>
                          ))}
                        </ul>
                        <div className="overflow-hidden rounded-2xl shadow-subtle lg:hidden">
                          <ScaledFrame {...MOCK_SIZE}>
                            <Mock active />
                          </ScaledFrame>
                        </div>
                        <div className="h-9 lg:hidden" />
                      </div>
                    </div>

                    <TabProgress progress={scrollYProgress} index={index} total={total} active={isActive} />
                  </li>
                );
              })}
            </ol>

            <div className="relative hidden lg:block">
              <div
                aria-hidden="true"
                className="absolute -inset-x-20 -inset-y-24 bg-[radial-gradient(48%_48%_at_62%_38%,#fbe1d1_0%,rgba(251,225,209,0)_72%)]"
              />
              <div className="relative overflow-hidden rounded-elevated bg-paper-white shadow-float">
                <ScaledFrame {...MOCK_SIZE}>
                  {features.map((feature, index) => {
                    const Mock = MOCKS[feature.id];
                    const isActive = active === index;

                    return (
                      <motion.div
                        key={feature.id}
                        className="absolute inset-0"
                        initial={false}
                        animate={{
                          opacity: isActive ? 1 : 0,
                          y: isActive ? 0 : index < active ? -28 : 28,
                          scale: isActive ? 1 : 0.985,
                        }}
                        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                        style={{ pointerEvents: isActive ? "auto" : "none" }}
                      >
                        <Mock active={isActive} />
                      </motion.div>
                    );
                  })}
                </ScaledFrame>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/** Hairline under each tab that fills as you scroll through that tab's stretch. */
function TabProgress({
  progress,
  index,
  total,
  active,
}: {
  progress: MotionValue<number>;
  index: number;
  total: number;
  active: boolean;
}) {
  const scaleX = useTransform(progress, [index / total, (index + 1) / total], [0, 1], { clamp: true });

  return (
    <span aria-hidden="true" className="relative hidden h-px w-full bg-[#e2e2e5] lg:block">
      <motion.span
        className={cn(
          "absolute inset-0 origin-left bg-ink-black transition-opacity duration-500",
          !active && "opacity-0",
        )}
        style={{ scaleX }}
      />
    </span>
  );
}
