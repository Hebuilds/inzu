"use client";

import { useId, type ReactNode } from "react";
import { motion, type Variants } from "framer-motion";
import { Camera, Check, ChevronDown, Download, FileText, Plus, Search } from "lucide-react";

import { cn } from "@/lib/utils";

type MockProps = { active: boolean };

/** Design size shared by every feature screen; see ScaledFrame. */
export const MOCK_SIZE = { width: 920, height: 580 } as const;

const group: Variants = {
  hide: {},
  show: { transition: { staggerChildren: 0.055, delayChildren: 0.2 } },
};

const drop: Variants = {
  hide: { opacity: 0, y: -12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
};

const AVATAR_TINTS = ["bg-[#dff0e2]", "bg-[#dfe9fb]", "bg-blush-peach", "bg-[#ece6f7]", "bg-mist-gray"];

function Avatar({ initials, index = 0, className }: { initials: string; index?: number; className?: string }) {
  return (
    <span
      className={cn(
        "flex size-9 shrink-0 items-center justify-center rounded-full text-[12px] font-medium text-ink-black",
        AVATAR_TINTS[index % AVATAR_TINTS.length],
        className,
      )}
    >
      {initials}
    </span>
  );
}

function Pill({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-1 rounded-full bg-mist-gray px-2.5 py-1 text-[12px]", className)}>
      {children}
    </span>
  );
}

/* ---------- Tenants ---------- */

const TENANTS = [
  { initials: "MK", name: "Marie Kalinda", unit: "12A", note: "Active" },
  { initials: "PH", name: "Patrick Habimana", unit: "4B", note: "Active" },
  { initials: "AM", name: "Aline Mukamana", unit: "7C", note: "Active" },
  { initials: "CN", name: "Claude Niyonzima", unit: "2A", note: "Ends in 14 days" },
  { initials: "GU", name: "Grace Uwase", unit: "9D", note: "Active" },
  { initials: "EM", name: "Eric Mugisha", unit: "3B", note: "Active" },
  { initials: "SI", name: "Sandrine Ishimwe", unit: "5A", note: "Active" },
];

const PROFILE = [
  ["National ID", "•••• •••• 8421"],
  ["Lease", "Mar 2026 – Mar 2027"],
  ["Monthly rent", "RWF 35,000"],
  ["Employment", "Teacher"],
  ["Vehicle", "RAE 412 K"],
  ["Emergency contact", "Jean Kalinda"],
];

const DOCUMENTS = ["Lease agreement.pdf", "National ID.pdf", "Insurance.pdf"];

const TIMELINE = [
  { text: "Payment received · RWF 35,000 via MoMo", date: "1 Oct" },
  { text: "Rent reminder sent by SMS", date: "28 Sep" },
  { text: "Maintenance request closed · leaking tap", date: "14 Sep" },
  { text: "Lease renewed for 12 months", date: "2 Mar" },
];

export function TenantsMock({ active }: MockProps) {
  return (
    <div className="flex h-full bg-paper-white text-[13.5px]">
      <div className="flex w-[300px] shrink-0 flex-col border-r border-hairline">
        <div className="flex items-center justify-between px-5 pt-5">
          <p className="text-[15px] font-medium">
            Tenants <span className="ml-1 font-normal text-smoke-gray">340</span>
          </p>
          <span className="inline-flex items-center gap-1 rounded-full bg-ink-black py-1 pr-2.5 pl-2 text-[12px] text-paper-white">
            <Plus className="size-3" />
            Add
          </span>
        </div>
        <div className="mx-5 mt-4 flex h-9 items-center gap-2 rounded-xl bg-mist-gray px-3 text-[13px] text-smoke-gray">
          <Search className="size-3.5" />
          Search name or unit
        </div>
        <motion.ul className="mt-3" variants={group} initial="hide" animate={active ? "show" : "hide"}>
          {TENANTS.map((tenant, index) => (
            <motion.li
              key={tenant.name}
              variants={drop}
              className={cn("flex h-[58px] items-center gap-3 px-5", index === 0 && "bg-fog-white")}
            >
              <Avatar initials={tenant.initials} index={index} />
              <span className="min-w-0 flex-1">
                <span className="block truncate font-medium">{tenant.name}</span>
                <span className="block text-[12px] text-slate-gray">Unit {tenant.unit}</span>
              </span>
              <span className={cn("text-[11.5px]", tenant.note === "Active" ? "text-smoke-gray" : "text-sienna-brown")}>
                {tenant.note}
              </span>
            </motion.li>
          ))}
        </motion.ul>
      </div>

      <div className="min-w-0 flex-1 p-7">
        <div className="flex items-center gap-4">
          <Avatar initials="MK" className="size-[52px] text-[16px]" />
          <div>
            <p className="text-[20px] leading-tight font-medium tracking-[-0.01em]">Marie Kalinda</p>
            <p className="mt-0.5 text-[13px] text-slate-gray">Unit 12A · Kigali Heights</p>
          </div>
          <Pill className="ml-auto">
            <Check className="size-3" strokeWidth={2.5} />
            Lease active
          </Pill>
        </div>

        <dl className="mt-7 grid grid-cols-3 gap-x-6 gap-y-5">
          {PROFILE.map(([label, value]) => (
            <div key={label}>
              <dt className="text-[11.5px] text-smoke-gray">{label}</dt>
              <dd className="mt-1">{value}</dd>
            </div>
          ))}
        </dl>

        <div className="mt-7 border-t border-hairline pt-5">
          <div className="flex items-baseline justify-between">
            <p className="font-medium">Timeline</p>
            <p className="text-[12px] text-smoke-gray">Every action, logged automatically</p>
          </div>
          <motion.ol className="mt-4" variants={group} initial="hide" animate={active ? "show" : "hide"}>
            {TIMELINE.map((event, index) => (
              <motion.li
                key={event.text}
                variants={drop}
                className="relative flex items-center gap-4 pb-[18px] last:pb-0"
              >
                {index < TIMELINE.length - 1 && (
                  <span className="absolute top-[14px] left-[4.5px] h-full w-px bg-hairline" />
                )}
                <span
                  className={cn(
                    "relative size-2.5 rounded-full ring-4 ring-paper-white",
                    index === 0 ? "bg-ink-black" : "bg-[#d9d9dc]",
                  )}
                />
                <span className="flex-1">{event.text}</span>
                <span className="text-[12px] text-smoke-gray">{event.date}</span>
              </motion.li>
            ))}
          </motion.ol>
        </div>

        <div className="mt-6 flex items-center gap-2 border-t border-hairline pt-5">
          <p className="mr-2 font-medium">Documents</p>
          {DOCUMENTS.map((name) => (
            <Pill key={name} className="py-1.5">
              <FileText className="size-3 text-slate-gray" />
              {name}
            </Pill>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ---------- Maintenance ---------- */

const BOARD = [
  {
    title: "Submitted",
    cards: [
      { title: "Leaking pipe in bathroom", unit: "Unit 4B", urgent: true, photos: 2 },
      { title: "Gate remote not working", unit: "Unit 2A", photos: 1 },
      { title: "Bedroom light flickers", unit: "Unit 5A", photos: 1 },
    ],
  },
  {
    title: "Assigned",
    cards: [
      { title: "Power outlet sparks", unit: "Unit 7C", urgent: true, assignee: "EM", role: "Electrician" },
      { title: "Water heater is noisy", unit: "Unit 12A", assignee: "JN", role: "Plumber" },
      { title: "Door lock is stiff", unit: "Unit 3B", assignee: "DK", role: "Locksmith" },
    ],
  },
  {
    title: "Resolved",
    cards: [
      { title: "Broken window latch", unit: "Unit 9D", closed: "Closed in 2 h" },
      { title: "Blocked kitchen sink", unit: "Unit 3B", closed: "Closed in 45 min" },
      { title: "Ceiling stain inspected", unit: "Unit 2A", closed: "Closed in 1 day" },
    ],
  },
] as const;

const AUDIT = ["09:12 Submitted with photos", "09:20 Assigned to a specialist", "11:05 Resolved and closed"];

export function MaintenanceMock({ active }: MockProps) {
  return (
    <div className="flex h-full flex-col bg-paper-white p-7 text-[13.5px]">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-[18px] font-medium tracking-[-0.01em]">Maintenance</p>
          <p className="mt-0.5 text-[13px] text-slate-gray">6 open · average response 10 min</p>
        </div>
        <div className="flex gap-2">
          <Pill>
            All units <ChevronDown className="size-3" />
          </Pill>
          <Pill>
            This week <ChevronDown className="size-3" />
          </Pill>
        </div>
      </div>

      <motion.div
        className="mt-6 grid flex-1 grid-cols-3 gap-4"
        variants={group}
        initial="hide"
        animate={active ? "show" : "hide"}
      >
        {BOARD.map((column) => (
          <div key={column.title} className="flex flex-col gap-3 rounded-2xl bg-mist-gray p-3">
            <p className="flex items-center justify-between px-1.5 pt-1 font-medium">
              {column.title}
              <span className="text-[12px] font-normal text-smoke-gray">{column.cards.length}</span>
            </p>
            {column.cards.map((card) => (
              <motion.div key={card.title} variants={drop} className="rounded-xl bg-paper-white p-3.5">
                <p className="font-medium">{card.title}</p>
                <p className="mt-0.5 text-[12px] text-slate-gray">{card.unit}</p>
                <div className="mt-3 flex items-center justify-between text-[11.5px]">
                  {"closed" in card ? (
                    <span className="inline-flex items-center gap-1 text-slate-gray">
                      <Check className="size-3" strokeWidth={2.5} />
                      {card.closed}
                    </span>
                  ) : (
                    <span
                      className={cn(
                        "rounded-full px-2 py-0.5",
                        "urgent" in card ? "bg-blush-peach text-sienna-brown" : "bg-mist-gray text-slate-gray",
                      )}
                    >
                      {"urgent" in card ? "Urgent" : "Normal"}
                    </span>
                  )}
                  {"photos" in card && (
                    <span className="inline-flex items-center gap-1 text-smoke-gray">
                      <Camera className="size-3" />
                      {card.photos}
                    </span>
                  )}
                  {"assignee" in card && (
                    <span className="inline-flex items-center gap-1.5 text-slate-gray">
                      {card.role}
                      <Avatar initials={card.assignee} index={1} className="size-5 text-[9px]" />
                    </span>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        ))}
      </motion.div>

      <div className="mt-5 flex items-center gap-3 border-t border-hairline pt-4 text-[12.5px] whitespace-nowrap text-slate-gray">
        <span className="font-medium text-ink-black">Audit trail · Unit 9D</span>
        {AUDIT.map((entry, index) => (
          <span key={entry} className="inline-flex items-center gap-3">
            {index > 0 && <span className="h-px w-5 bg-[#d9d9dc]" />}
            {entry}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ---------- Analytics ---------- */

const KPIS = [
  { label: "Revenue, 12 months", value: "RWF 9.8M", delta: "+12%" },
  { label: "Occupancy", value: "94%", delta: "+3%" },
  { label: "Overdue invoices", value: "3", delta: "−5" },
  { label: "Avg. response", value: "10 min", delta: "−4 min" },
];

const REVENUE = [52, 55, 53, 60, 64, 62, 70, 74, 72, 80, 86, 92];
const LAST_YEAR = [44, 46, 49, 48, 52, 55, 54, 58, 61, 60, 64, 67];
const MONTHS = ["N", "D", "J", "F", "M", "A", "M", "J", "J", "A", "S", "O"];

const BUILDINGS = ["Kigali Heights", "Kiyovu Court", "Rebero View", "Kacyiru Flats", "Gacuriro Row", "Remera House"];
/** Occupancy per building per month as a cell opacity; integer maths keeps server and client renders identical. */
const HEAT = BUILDINGS.map((_, row) =>
  MONTHS.map((_, col) => (8 + 9 * ((row * 7 + col * 13 + row * col * 3) % 10)) / 100),
);

const CHART = { width: 500, height: 190, pad: 6 };

function curve(values: number[]) {
  const step = (CHART.width - CHART.pad * 2) / (values.length - 1);
  const point = (value: number, index: number) => ({
    x: CHART.pad + index * step,
    y: CHART.height - 10 - ((value - 38) / 58) * (CHART.height - 24),
  });
  return values.reduce((d, value, index) => {
    const p = point(value, index);
    return `${d}${index === 0 ? "M" : "L"}${p.x} ${p.y}`;
  }, "");
}

export function AnalyticsMock({ active }: MockProps) {
  const gradientId = useId();
  const line = curve(REVENUE);
  const area = `${line}L${CHART.width - CHART.pad} ${CHART.height}L${CHART.pad} ${CHART.height}Z`;

  return (
    <div className="flex h-full flex-col bg-paper-white p-7 text-[13.5px]">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <p className="text-[18px] font-medium tracking-[-0.01em]">Reports</p>
          <Pill>
            Last 12 months <ChevronDown className="size-3" />
          </Pill>
        </div>
        <div className="flex gap-2">
          {["PDF", "Excel", "CSV"].map((format) => (
            <Pill key={format}>
              <Download className="size-3" />
              {format}
            </Pill>
          ))}
        </div>
      </div>

      <motion.div
        className="mt-6 grid grid-cols-4 gap-4"
        variants={group}
        initial="hide"
        animate={active ? "show" : "hide"}
      >
        {KPIS.map((kpi) => (
          <motion.div key={kpi.label} variants={drop} className="rounded-2xl bg-mist-gray p-4">
            <p className="text-[12px] text-slate-gray">{kpi.label}</p>
            <p className="mt-2 flex items-baseline justify-between">
              <span className="text-[22px] leading-none font-medium tracking-[-0.02em]">{kpi.value}</span>
              <span className="text-[12px] text-slate-gray">{kpi.delta}</span>
            </p>
          </motion.div>
        ))}
      </motion.div>

      <div className="mt-4 grid min-h-0 flex-1 grid-cols-[1.45fr_1fr] gap-4">
        <div className="flex flex-col rounded-2xl p-5 ring-1 ring-ink-black/[0.07]">
          <div className="flex items-center justify-between">
            <p className="font-medium">Revenue trend</p>
            <p className="flex items-center gap-4 text-[12px] text-slate-gray">
              <span className="inline-flex items-center gap-1.5">
                <span className="h-0.5 w-3 rounded-full bg-sienna-brown" />
                This year
              </span>
              <span className="inline-flex items-center gap-1.5">
                <span className="h-0.5 w-3 rounded-full bg-[#c9c9cd]" />
                Last year
              </span>
            </p>
          </div>
          <svg viewBox={`0 0 ${CHART.width} ${CHART.height}`} className="mt-4 w-full flex-1" preserveAspectRatio="none">
            <defs>
              <linearGradient id={gradientId} x1="0" x2="0" y1="0" y2="1">
                <stop offset="0" stopColor="#fbe1d1" stopOpacity="0.9" />
                <stop offset="1" stopColor="#fbe1d1" stopOpacity="0" />
              </linearGradient>
            </defs>
            <motion.path
              d={area}
              fill={`url(#${gradientId})`}
              initial={{ opacity: 0 }}
              animate={{ opacity: active ? 1 : 0 }}
              transition={{ duration: 0.9, delay: active ? 0.9 : 0 }}
            />
            <path
              d={curve(LAST_YEAR)}
              fill="none"
              stroke="#c9c9cd"
              strokeWidth="1.5"
              strokeDasharray="3 5"
              strokeLinecap="round"
              vectorEffect="non-scaling-stroke"
            />
            <motion.path
              d={line}
              fill="none"
              stroke="#5d2a1a"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              vectorEffect="non-scaling-stroke"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: active ? 1 : 0 }}
              transition={{ duration: active ? 1.5 : 0.3, delay: active ? 0.25 : 0, ease: [0.65, 0, 0.35, 1] }}
            />
          </svg>
          <div className="mt-2 flex justify-between px-1 text-[11px] text-smoke-gray">
            {MONTHS.map((month, index) => (
              <span key={index}>{month}</span>
            ))}
          </div>
        </div>

        <div className="flex flex-col rounded-2xl p-5 ring-1 ring-ink-black/[0.07]">
          <p className="font-medium">Occupancy by building</p>
          <motion.div
            className="mt-4 flex flex-1 flex-col justify-between"
            variants={group}
            initial="hide"
            animate={active ? "show" : "hide"}
          >
            {HEAT.map((row, rowIndex) => (
              <motion.div key={BUILDINGS[rowIndex]} variants={drop}>
                <p className="mb-1 text-[11px] text-slate-gray">{BUILDINGS[rowIndex]}</p>
                <div className="grid grid-cols-12 gap-[3px]">
                  {row.map((value, colIndex) => (
                    <span key={colIndex} className="h-[13px] rounded-[3px] bg-ink-black" style={{ opacity: value }} />
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
