"use client";

import { type ReactNode } from "react";
import { motion } from "framer-motion";

import { cn } from "@/lib/utils";

type IllustrationProps = { active: boolean };

const line = {
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round",
  strokeLinejoin: "round",
} as const;

/** Faces are filled with the card colour so nearer shapes hide the lines behind them. */
const surface = (active: boolean) =>
  cn("transition-[fill] duration-700", active ? "fill-blush-peach" : "fill-mist-gray");

const loop = (duration: number, delay = 0) => ({ duration, delay, repeat: Infinity, ease: "easeInOut" }) as const;
const settle = { duration: 0.7, ease: [0.16, 1, 0.3, 1] } as const;

function Canvas({ children }: { children: ReactNode }) {
  return (
    <svg viewBox="0 0 240 240" fill="none" aria-hidden="true" className="h-full w-auto overflow-visible">
      {children}
    </svg>
  );
}

/* ---------- Isometric helpers (cx fixed at 120) ---------- */

const CX = 120;

function slab(cy: number, a: number, b: number, h: number) {
  return {
    top: `M${CX} ${cy - b}L${CX + a} ${cy}L${CX} ${cy + b}L${CX - a} ${cy}Z`,
    left: `M${CX - a} ${cy}L${CX} ${cy + b}L${CX} ${cy + b + h}L${CX - a} ${cy + h}Z`,
    right: `M${CX + a} ${cy}L${CX} ${cy + b}L${CX} ${cy + b + h}L${CX + a} ${cy + h}Z`,
  };
}

/** A quad on a slab's side face; u runs along the face from the centre edge, v runs down. */
function facet(
  side: "left" | "right",
  cy: number,
  a: number,
  b: number,
  h: number,
  u: [number, number],
  v: [number, number],
) {
  const dir = side === "right" ? 1 : -1;
  const point = (pu: number, pv: number) => `${CX + dir * pu * a} ${cy + b - pu * b + pv * h}`;
  return `M${point(u[0], v[0])}L${point(u[1], v[0])}L${point(u[1], v[1])}L${point(u[0], v[1])}Z`;
}

const WINDOWS: [number, number][] = [
  [0.14, 0.34],
  [0.42, 0.62],
  [0.7, 0.9],
];

function Floor({ cy, active, door }: { cy: number; active: boolean; door?: boolean }) {
  const a = 62;
  const b = 31;
  const h = 30;
  const shape = slab(cy, a, b, h);

  return (
    <>
      <path d={shape.left} className={surface(active)} {...line} />
      <path d={shape.right} className={surface(active)} {...line} />
      <path d={shape.top} className={surface(active)} {...line} />
      {WINDOWS.map((u, index) => (
        <path key={`r${index}`} d={facet("right", cy, a, b, h, u, [0.3, 0.72])} {...line} strokeWidth={1.2} />
      ))}
      {door ? (
        <>
          <path d={facet("left", cy, a, b, h, [0.4, 0.62], [0.28, 1])} {...line} strokeWidth={1.2} />
          <path d={facet("left", cy, a, b, h, [0.14, 0.3], [0.3, 0.72])} {...line} strokeWidth={1.2} />
          <path d={facet("left", cy, a, b, h, [0.72, 0.88], [0.3, 0.72])} {...line} strokeWidth={1.2} />
        </>
      ) : (
        WINDOWS.map((u, index) => (
          <path key={`l${index}`} d={facet("left", cy, a, b, h, u, [0.3, 0.72])} {...line} strokeWidth={1.2} />
        ))
      )}
    </>
  );
}

/** Landlords — a building whose floors lift apart and settle back, like a portfolio being stacked. */
export function FloorsIllustration({ active }: IllustrationProps) {
  const tank = slab(79, 16, 8, 10);

  return (
    <Canvas>
      <ellipse cx="120" cy="214" rx="74" ry="9" className="fill-current opacity-[0.07]" />
      <Floor cy={152} active={active} door />

      <motion.g
        animate={{ y: active ? [0, -13, -13, 0] : 0 }}
        transition={active ? { ...loop(3.6), times: [0, 0.3, 0.62, 0.92] } : settle}
      >
        <Floor cy={122} active={active} />
      </motion.g>

      <motion.g
        animate={{ y: active ? [0, -28, -28, 0] : 0 }}
        transition={active ? { ...loop(3.6), times: [0, 0.26, 0.66, 0.96] } : settle}
      >
        <Floor cy={92} active={active} />
        <path d={tank.left} className={surface(active)} {...line} strokeWidth={1.2} />
        <path d={tank.right} className={surface(active)} {...line} strokeWidth={1.2} />
        <path d={tank.top} className={surface(active)} {...line} strokeWidth={1.2} />
        <path d="M150 84V58" {...line} strokeWidth={1.2} />
        <motion.path
          d="M150 58 164 62 150 67"
          className={surface(active)}
          {...line}
          strokeWidth={1.2}
          animate={{ skewY: active ? [0, 8, -4, 0] : 0 }}
          transition={active ? loop(1.8) : settle}
        />
      </motion.g>
    </Canvas>
  );
}

/** Tenants — a key and its house tag swinging on a ring. */
export function KeysIllustration({ active }: IllustrationProps) {
  // An unpainted rect centred on the ring makes the group's bounding box (and so
  // its rotation origin) sit on the ring, so both pieces swing from it.
  const pivot = <rect x="40" y="-102" width="160" height="320" />;

  return (
    <Canvas>
      <motion.g
        initial={{ rotate: 26 }}
        animate={{ rotate: active ? [30, 18, 30] : 26 }}
        transition={active ? loop(2.2, 0.15) : settle}
      >
        {pivot}
        <path d="M120 71V96" {...line} strokeWidth={1.2} />
        <rect x="98" y="96" width="44" height="66" rx="9" className={surface(active)} {...line} />
        <circle cx="120" cy="108" r="3.2" {...line} strokeWidth={1.2} />
        <path d="M108 142 120 130 132 142V152H108Z" {...line} strokeWidth={1.2} />
        <path d="M117 152V145H123V152" {...line} strokeWidth={1.2} />
      </motion.g>

      <motion.g
        initial={{ rotate: -12 }}
        animate={{ rotate: active ? [-17, -5, -17] : -12 }}
        transition={active ? loop(2.2) : settle}
      >
        {pivot}
        <path d="M120 71V82" {...line} strokeWidth={1.2} />
        <path
          d="M113.5 131V197L120 204 126.500 197V186H135V178H126.500V170H132V162H126.500V131"
          className={surface(active)}
          {...line}
        />
        <circle cx="120" cy="107" r="25" className={surface(active)} {...line} />
        <circle cx="120" cy="98" r="6.500" {...line} strokeWidth={1.2} />
      </motion.g>

      <circle cx="120" cy="58" r="13" className={surface(active)} {...line} />

      {[
        { x: 52, y: 78, delay: 0 },
        { x: 190, y: 54, delay: 0.5 },
        { x: 198, y: 150, delay: 1 },
      ].map((spark) => (
        <motion.path
          key={spark.x}
          d={`M${spark.x} ${spark.y - 6}V${spark.y + 6}M${spark.x - 6} ${spark.y}H${spark.x + 6}`}
          {...line}
          strokeWidth={1.2}
          animate={active ? { scale: [0.4, 1, 0.4], opacity: [0.2, 1, 0.2] } : { scale: 0.7, opacity: 0.45 }}
          transition={active ? loop(1.8, spark.delay) : settle}
        />
      ))}
    </Canvas>
  );
}

/** Agents — a listing pin dropping onto a plot, with interest rippling out from it. */
export function PinIllustration({ active }: IllustrationProps) {
  const plot = slab(174, 86, 43, 9);
  const house = { a: 15, b: 7.5, h: 13 };

  return (
    <Canvas>
      <path d={plot.left} className={surface(active)} {...line} />
      <path d={plot.right} className={surface(active)} {...line} />
      <path d={plot.top} className={surface(active)} {...line} />
      <path d="M64 174 120 202M176 174 120 146" {...line} strokeWidth={1.2} strokeDasharray="1 6" />

      {/* a small neighbour, so the plot reads as a street */}
      <g transform="translate(44 -12)">
        <path d={slab(178, house.a, house.b, house.h).left} className={surface(active)} {...line} strokeWidth={1.2} />
        <path d={slab(178, house.a, house.b, house.h).right} className={surface(active)} {...line} strokeWidth={1.2} />
        <path d={slab(178, house.a, house.b, house.h).top} className={surface(active)} {...line} strokeWidth={1.2} />
      </g>

      {[0, 1].map((ring) => (
        <motion.ellipse
          key={ring}
          cx="120"
          cy="174"
          rx="34"
          ry="17"
          {...line}
          strokeWidth={1.2}
          animate={active ? { scale: [0.3, 1.25], opacity: [0.9, 0] } : { scale: 0.5, opacity: 0.35 }}
          transition={active ? { duration: 2.2, delay: ring * 1.1, repeat: Infinity, ease: "easeOut" } : settle}
        />
      ))}

      <motion.ellipse
        cx="120"
        cy="174"
        rx="11"
        ry="5"
        className="fill-current"
        animate={active ? { scale: [1, 0.55, 1], opacity: [0.28, 0.12, 0.28] } : { scale: 1, opacity: 0.2 }}
        transition={active ? loop(1.5) : settle}
      />

      <motion.g animate={{ y: active ? [0, -22, 0] : -6 }} transition={active ? loop(1.5) : settle}>
        <path
          d="M120 172C120 172 91 139 91 114A29 29 0 1 1 149 114C149 139 120 172 120 172Z"
          className={surface(active)}
          {...line}
        />
        <circle cx="120" cy="113" r="10.500" {...line} strokeWidth={1.2} />
      </motion.g>
    </Canvas>
  );
}
