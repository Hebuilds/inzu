"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";

import { Reveal } from "@/components/motion/reveal";
import { ScrubWords } from "@/components/motion/scrub-words";
import { storyImage, testimonials } from "@/lib/content";
import { cn } from "@/lib/utils";

const TINTS = ["bg-[#dfe9fb]", "bg-[#dff0e2]", "bg-[#ece6f7]"];

function Monogram({ initials, index }: { initials: string; index: number }) {
  return (
    <span
      className={cn(
        "flex size-10 shrink-0 items-center justify-center rounded-full text-[13px] font-medium",
        TINTS[index % TINTS.length],
      )}
    >
      {initials}
    </span>
  );
}

/** Customer story. The lead quote inks in word by word; the photo drifts against the scroll. */
export function Testimonials() {
  const [lead, ...others] = testimonials;
  const imageRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: imageRef, offset: ["start end", "end start"] });
  const imageY = useTransform(scrollYProgress, [0, 1], ["-9%", "9%"]);

  return (
    <section className="bg-paper-white">
      <div className="shell py-24 lg:pt-40 lg:pb-20">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_1fr] lg:items-center lg:gap-20">
          <figure>
            <p className="tag">Trusted by landlords across Africa</p>
            <ScrubWords
              as="blockquote"
              className="headline-sm mt-6"
              text={`“${lead.quote}”`}
              startAt={0.82}
              endAt={0.42}
            />
            <Reveal>
              <figcaption className="mt-9 flex items-center gap-3.5">
                <Monogram initials={lead.initials} index={0} />
                <span>
                  <span className="block text-[16px] font-medium">{lead.name}</span>
                  <span className="block text-caption text-slate-gray">{lead.role}</span>
                </span>
              </figcaption>
            </Reveal>
          </figure>

          <Reveal y={40}>
            <div ref={imageRef} className="relative aspect-[4/5] overflow-hidden rounded-card lg:aspect-[5/6]">
              <motion.div className="absolute -inset-y-[10%] inset-x-0" style={{ y: imageY }}>
                <Image
                  src={storyImage}
                  alt="An apartment building managed on Inzu Connect"
                  fill
                  sizes="(min-width: 1024px) 520px, 100vw"
                  className="object-cover"
                />
              </motion.div>
            </div>
          </Reveal>
        </div>

        <div className="mt-16 grid gap-5 md:grid-cols-2 lg:mt-24">
          {others.map((testimonial, index) => (
            <Reveal key={testimonial.name} delay={index * 0.1} y={-30}>
              <figure className="flex h-full flex-col rounded-card bg-mist-gray p-8 lg:p-10">
                <blockquote className="text-subheading leading-[1.4] font-w430 tracking-[-0.009em]">
                  “{testimonial.quote}”
                </blockquote>
                <figcaption className="mt-auto flex items-center gap-3.5 pt-9">
                  <Monogram initials={testimonial.initials} index={index + 1} />
                  <span>
                    <span className="block text-[16px] font-medium">{testimonial.name}</span>
                    <span className="block text-caption text-slate-gray">{testimonial.role}</span>
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
