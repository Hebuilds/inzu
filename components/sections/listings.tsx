"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useSpring, useTransform, type MotionValue } from "framer-motion";
import { MapPin } from "lucide-react";

import { FallingLines } from "@/components/motion/falling-lines";
import { Reveal } from "@/components/motion/reveal";
import { Button, ButtonArrow } from "@/components/ui/button";
import { links, lodges, properties, type Listing } from "@/lib/content";

/** Public listings. Two rails of cards drift in opposite directions as the section scrolls past. */
export function Listings() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 28, mass: 0.4 });

  const forward = useTransform(progress, [0, 1], ["10%", "-16%"]);
  const backward = useTransform(progress, [0, 1], ["-20%", "6%"]);

  return (
    <section id="listings" className="overflow-x-clip bg-paper-white py-24 lg:py-40">
      <div className="shell grid gap-8 lg:grid-cols-2 lg:items-end lg:gap-20">
        <div>
          <p className="tag">Public listings</p>
          <FallingLines
            className="headline mt-4"
            lines={["Homes and lodges,", { text: "open to everyone.", italic: true }]}
          />
        </div>
        <Reveal className="lg:pb-3">
          <p className="max-w-[480px] text-body-lg text-slate-gray">
            List your vacant units publicly. Anyone can browse, filter by amenity and price, and apply online, with no
            account needed.
          </p>
        </Reveal>
      </div>

      <div ref={ref} className="mt-14 space-y-12 lg:mt-20 lg:space-y-16">
        <Rail
          title="Featured properties"
          caption="Verified apartments and houses, available now"
          href={links.properties}
          items={properties}
          x={forward}
        />
        <Rail
          title="Featured lodges"
          caption="Quality rooms for short and long stays"
          href={links.lodges}
          items={lodges}
          x={backward}
        />
      </div>
    </section>
  );
}

function Rail({
  title,
  caption,
  href,
  items,
  x,
}: {
  title: string;
  caption: string;
  href: string;
  items: Listing[];
  x: MotionValue<string>;
}) {
  return (
    <div>
      <div className="shell flex items-end justify-between gap-6">
        <div>
          <h3 className="text-heading-sm font-w450">{title}</h3>
          <p className="mt-1.5 text-caption text-slate-gray">{caption}</p>
        </div>
        <Button asChild variant="link" size="link" className="shrink-0">
          <a href={href}>
            View all <ButtonArrow />
          </a>
        </Button>
      </div>

      <motion.ul className="mt-7 flex w-max gap-5 px-5 will-change-transform md:px-10" style={{ x }}>
        {items.map((item) => (
          <li key={item.title} className="w-[280px] shrink-0 sm:w-[340px]">
            <ListingCard {...item} />
          </li>
        ))}
      </motion.ul>
    </div>
  );
}

function ListingCard({ title, place, price, per, meta, image }: Listing) {
  return (
    <article className="group rounded-card bg-mist-gray p-3 pb-5">
      <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
        <Image
          src={image}
          alt={`${title} in ${place}`}
          fill
          sizes="(min-width: 640px) 340px, 280px"
          className="object-cover transition-transform duration-[1200ms] ease-out-expo group-hover:scale-[1.06]"
        />
      </div>
      <div className="px-2 pt-4">
        <p className="tag">{meta}</p>
        <h4 className="mt-1.5 text-body-lg font-medium">{title}</h4>
        <p className="mt-1 flex items-center gap-1.5 text-caption text-slate-gray">
          <MapPin className="size-3.5" strokeWidth={1.75} />
          {place}
        </p>
        <p className="mt-4 text-[16px]">
          <span className="font-medium">{price}</span>
          <span className="text-slate-gray"> / {per}</span>
        </p>
      </div>
    </article>
  );
}
