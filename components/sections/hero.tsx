"use client";

import { useMemo, useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";

import { Dashboard } from "@/components/hero/dashboard";
import { HeroContext, TIMELINE, type HeroScene } from "@/components/hero/hero-context";
import { Button, ButtonArrow } from "@/components/ui/button";
import { DESKTOP_QUERY, useMediaQuery } from "@/hooks/use-media-query";
import { links } from "@/lib/content";

const LINE_ONE = ["Manage", "properties", "smarter,"];
const ITALIC_LINE = "not harder.";
/** Each letter of the italic line starts tilted by this many degrees before it settles. */
const LETTER_TILT = [-16, 12, -9, 0, 14, -12, 9, -15, 11, -8, 13];

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * Pinned opening scene. The headline sits in a collage of floating product cards;
 * scrolling clears the headline and flies the cards into a dashboard that
 * assembles in the centre of the viewport.
 */
export function Hero() {
  const trackRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const pinned = useMediaQuery(DESKTOP_QUERY);

  const { scrollYProgress } = useScroll({ target: trackRef, offset: ["start start", "end end"] });
  const progress = useSpring(scrollYProgress, { stiffness: 170, damping: 30, mass: 0.3, restDelta: 0.0005 });
  const scene = useMemo<HeroScene>(() => ({ progress, stageRef, pinned }), [progress, pinned]);

  const [outStart, outEnd] = TIMELINE.headlineOut;
  const headlineOpacity = useTransform(progress, [outStart, outEnd], [1, 0]);
  const headlineY = useTransform(progress, [outStart, outEnd], [0, -90]);
  const headlineScale = useTransform(progress, [outStart, outEnd], [1, 0.94]);
  const headlinePointer = useTransform(progress, (p) => (p > outEnd * 0.6 ? "none" : "auto"));
  const washOpacity = useTransform(progress, [0, 0.55], [1, 0.45]);

  return (
    <HeroContext.Provider value={scene}>
      <section id="top" ref={trackRef} className="relative lg:h-[290vh]">
        <div ref={stageRef} className="relative overflow-hidden lg:sticky lg:top-0 lg:h-screen lg:min-h-[620px]">
          <motion.div
            aria-hidden="true"
            // Below desktop the stage is a long stacked column, so the wash only covers the opening screen.
            className="pointer-events-none absolute inset-x-0 top-0 h-[860px] lg:inset-0 lg:h-auto"
            style={pinned ? { opacity: washOpacity } : undefined}
          >
            <div className="absolute inset-0 bg-[radial-gradient(46%_54%_at_82%_56%,#fbe1d1_0%,rgba(251,225,209,0)_72%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(40%_46%_at_56%_96%,rgba(253,236,224,0.95)_0%,rgba(253,236,224,0)_70%)]" />
            <div className="absolute inset-x-0 bottom-0 h-32 bg-linear-to-b from-transparent to-paper-white" />
          </motion.div>

          <motion.div
            className="relative z-20 flex flex-col items-center px-5 pt-36 pb-14 text-center lg:absolute lg:inset-0 lg:justify-center lg:pt-[72px] lg:pb-0"
            style={
              pinned
                ? { opacity: headlineOpacity, y: headlineY, scale: headlineScale, pointerEvents: headlinePointer }
                : undefined
            }
          >
            <motion.a
              href="#product"
              className="group inline-flex items-center gap-2 rounded-full bg-mist-gray/80 py-2 pr-4 pl-3 text-[15px] backdrop-blur-sm transition-colors duration-300 hover:bg-mist-gray"
              initial={{ opacity: 0, y: -14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: EASE }}
            >
              <span className="relative flex size-2">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-ink-black/30" />
                <span className="relative inline-flex size-2 rounded-full bg-ink-black" />
              </span>
              Property management, simplified
              <span
                aria-hidden="true"
                className="transition-transform duration-300 ease-out-expo group-hover:translate-x-1"
              >
                →
              </span>
            </motion.a>

            <h1
              aria-label={`${LINE_ONE.join(" ")} ${ITALIC_LINE}`}
              className="display mt-7 max-w-[13em] [--display-size:clamp(44px,5.8vw,84px)]"
            >
              <span aria-hidden="true" className="block">
                {LINE_ONE.map((word, index) => (
                  <span key={word}>
                    <motion.span
                      className="inline-block"
                      initial={{ opacity: 0, y: "-0.55em", rotate: -3, filter: "blur(12px)" }}
                      animate={{ opacity: 1, y: "0em", rotate: 0, filter: "blur(0px)" }}
                      transition={{ duration: 1.1, delay: 0.1 + index * 0.09, ease: EASE }}
                    >
                      {word}
                    </motion.span>{" "}
                  </span>
                ))}
              </span>
              <span aria-hidden="true" className="block italic">
                {[...ITALIC_LINE].map((letter, index) => (
                  <motion.span
                    key={index}
                    className="inline-block origin-bottom"
                    initial={{ opacity: 0, y: "-1.1em", rotate: LETTER_TILT[index] }}
                    animate={{ opacity: 1, y: "0em", rotate: 0 }}
                    transition={{
                      opacity: { duration: 0.3, delay: 0.5 + index * 0.045 },
                      default: { type: "spring", stiffness: 260, damping: 15, mass: 0.9, delay: 0.5 + index * 0.045 },
                    }}
                  >
                    {letter === " " ? " " : letter}
                  </motion.span>
                ))}
              </span>
            </h1>

            <motion.p
              className="mt-6 max-w-[620px] text-body-lg text-slate-gray"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.75, ease: EASE }}
            >
              The all-in-one platform for landlords, property managers and real estate companies across Africa. Rent
              collection, tenant management, maintenance workflows and analytics in one place.
            </motion.p>

            <motion.div
              className="mt-8 flex flex-wrap items-center justify-center gap-x-3 gap-y-4"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.9, ease: EASE }}
            >
              <Button asChild size="lg">
                <a href={links.register}>Start free trial</a>
              </Button>
              <Button asChild size="lg" variant="outline">
                <a href={links.pricing}>View pricing</a>
              </Button>
              <Button asChild variant="link" size="link" className="basis-full pt-1 sm:basis-auto sm:pt-0 sm:pl-4">
                <a href={links.listings}>
                  Browse listings <ButtonArrow />
                </a>
              </Button>
            </motion.div>
          </motion.div>

          <div className="relative z-10 px-5 pb-20 lg:absolute lg:inset-0 lg:flex lg:flex-col lg:items-center lg:px-10 lg:pt-[88px] lg:pb-8">
            <Dashboard />
          </div>
        </div>
      </section>
    </HeroContext.Provider>
  );
}
