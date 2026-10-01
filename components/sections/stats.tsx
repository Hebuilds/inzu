import { CountUp } from "@/components/motion/count-up";
import { Reveal } from "@/components/motion/reveal";
import { stats } from "@/lib/content";

export function Stats() {
  return (
    <section className="bg-paper-white">
      <div className="shell pt-10 pb-4 lg:pt-24">
        <Reveal>
          <p className="tag text-center">Running rentals from Kigali to the coast</p>
        </Reveal>
        <dl className="mt-8 grid grid-cols-2 lg:mt-10 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <Reveal
              key={stat.label}
              delay={index * 0.08}
              y={-24}
              className="border-t border-hairline px-1 py-7 text-center odd:border-r lg:border-r lg:py-9 lg:last:border-r-0"
            >
              <dt className="sr-only">{stat.label}</dt>
              <dd>
                <CountUp
                  value={stat.value}
                  suffix={stat.suffix}
                  className="font-serif text-[clamp(38px,4.6vw,64px)] leading-none tracking-[-0.02em] tabular-nums"
                />
                <span aria-hidden="true" className="mt-3 block text-caption text-slate-gray">
                  {stat.label}
                </span>
              </dd>
            </Reveal>
          ))}
        </dl>
      </div>
    </section>
  );
}
