"use client";

import { type ReactNode } from "react";
import { motion, useTransform } from "framer-motion";
import {
  Bell,
  Building2,
  ChartColumn,
  Check,
  ChevronDown,
  CircleCheck,
  LayoutGrid,
  ReceiptText,
  Search,
  TrendingUp,
  Users,
  Wrench,
} from "lucide-react";

import { Flyer } from "@/components/hero/flyer";
import { TIMELINE, useHeroScene } from "@/components/hero/hero-context";
import { LogoMark } from "@/components/site/logo";
import { cn } from "@/lib/utils";

/** Rent arrives early in the month: daily collections, 1–31 October. */
const DAILY_RENT = [
  92, 100, 84, 71, 66, 48, 37, 30, 34, 24, 19, 22, 15, 17, 12, 14, 9, 11, 8, 10, 6, 7, 9, 5, 6, 4, 6, 3, 5, 4, 3,
];

const INVOICES = [
  { tenant: "Marie Kalinda", unit: "12A", amount: "35,000", due: "Oct 5", status: "paying" },
  { tenant: "Patrick Habimana", unit: "4B", amount: "35,000", due: "Oct 5", status: "Paid" },
  { tenant: "Aline Mukamana", unit: "7C", amount: "35,000", due: "Oct 5", status: "Paid" },
  { tenant: "Claude Niyonzima", unit: "2A", amount: "35,000", due: "Oct 5", status: "Paid" },
  { tenant: "Grace Uwase", unit: "9D", amount: "35,000", due: "Oct 5", status: "Paid" },
  { tenant: "Eric Mugisha", unit: "3B", amount: "35,000", due: "Oct 5", status: "Paid" },
] as const;

const SIDEBAR = [
  { icon: LayoutGrid, label: "Overview", active: true },
  { icon: Building2, label: "Properties" },
  { icon: Users, label: "Tenants" },
  { icon: ReceiptText, label: "Invoices" },
  { icon: Wrench, label: "Maintenance" },
  { icon: ChartColumn, label: "Reports" },
];

const BUILDINGS = ["Kigali Heights", "Kiyovu Court", "Rebero View"];

const cardSurface = "rounded-elevated bg-paper-white ring-1 ring-ink-black/[0.06]";

/** Parts of the window that are not flying cards; they fade in as the cards arrive. */
function Chrome({
  children,
  className,
  range = TIMELINE.chrome,
}: {
  children?: ReactNode;
  className?: string;
  range?: readonly [number, number];
}) {
  const { progress, pinned } = useHeroScene();
  const opacity = useTransform(progress, [range[0], range[1]], [0, 1]);

  return (
    <motion.div className={cn("lg:opacity-0", className)} style={pinned ? { opacity } : undefined}>
      {children}
    </motion.div>
  );
}

export function Dashboard() {
  const { progress, pinned } = useHeroScene();
  const surfaceScale = useTransform(progress, [TIMELINE.chrome[0], TIMELINE.chrome[1]], [0.955, 1]);
  const surfaceOpacity = useTransform(progress, [TIMELINE.chrome[0], TIMELINE.chrome[1]], [0, 1]);

  return (
    <div className="relative w-full max-w-[1140px] lg:my-auto lg:h-[640px] lg:shrink-0" aria-hidden="true">
      <motion.div
        className="absolute inset-0 rounded-elevated bg-paper-white shadow-float lg:opacity-0"
        style={pinned ? { opacity: surfaceOpacity, scale: surfaceScale } : undefined}
      />

      <div className="relative flex h-full">
        <Chrome className="hidden w-[212px] shrink-0 flex-col rounded-l-elevated border-r border-hairline bg-fog-white p-4 lg:flex">
          <div className="flex gap-1.5 pt-0.5 pb-5">
            <span className="size-2.5 rounded-full bg-ink-black/10" />
            <span className="size-2.5 rounded-full bg-ink-black/10" />
            <span className="size-2.5 rounded-full bg-ink-black/10" />
          </div>
          <div className="flex items-center gap-2.5 px-1">
            <span className="flex size-7 items-center justify-center rounded-lg bg-ink-black text-paper-white">
              <LogoMark className="h-3.5" />
            </span>
            <span className="text-[14px] font-medium">Green Valley</span>
            <Search className="ml-auto size-3.5 text-smoke-gray" />
          </div>
          <ul className="mt-5 space-y-0.5">
            {SIDEBAR.map(({ icon: Icon, label, active }) => (
              <li
                key={label}
                className={cn(
                  "flex items-center gap-2.5 rounded-lg px-2 py-[7px] text-[13.5px]",
                  active ? "bg-mist-gray font-medium text-ink-black" : "text-slate-gray",
                )}
              >
                <Icon className="size-[15px]" strokeWidth={1.75} />
                {label}
              </li>
            ))}
          </ul>
          <p className="mt-6 px-2 text-[11.5px] text-smoke-gray">Buildings</p>
          <ul className="mt-2 space-y-0.5">
            {BUILDINGS.map((name, index) => (
              <li key={name} className="flex items-center gap-2.5 px-2 py-[6px] text-[13.5px] text-slate-gray">
                <span
                  className={cn(
                    "flex size-[15px] items-center justify-center rounded-[4px] text-[9px] font-medium text-ink-black",
                    ["bg-blush-peach", "bg-[#dfe9fb]", "bg-[#dff0e2]"][index],
                  )}
                >
                  {name[0]}
                </span>
                {name}
              </li>
            ))}
          </ul>
        </Chrome>

        <div className="flex min-w-0 flex-1 flex-col">
          <Chrome className="flex h-14 shrink-0 items-center justify-between border-b border-hairline px-5 lg:px-6">
            <span className="text-[14px] font-medium">Overview</span>
            <span className="flex items-center gap-3">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-mist-gray px-3 py-1.5 text-[12.5px]">
                October 2026
                <ChevronDown className="size-3" />
              </span>
              <span className="flex size-7 items-center justify-center rounded-full bg-[#dfe9fb] text-[11px] font-medium">
                AU
              </span>
            </span>
          </Chrome>

          <div className="flex min-h-0 flex-1 flex-col gap-4 p-4 sm:p-5 lg:p-6">
            <Chrome>
              <p className="text-[20px] font-medium tracking-[-0.01em]">Good morning, Alice</p>
              <p className="mt-0.5 text-[13.5px] text-slate-gray">24 of 26 units occupied · October invoices are out</p>
            </Chrome>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-12">
              <Flyer
                spot={{ right: -0.06, top: 0.11, rotate: 2.5, scale: 0.9 }}
                delay={0.1}
                lag={0.02}
                className="sm:col-span-2 lg:col-span-5"
              >
                <RentCard />
              </Flyer>
              <Flyer spot={{ right: 0.045, bottom: 0.07, rotate: -2 }} delay={0.3} className="lg:col-span-3">
                <OccupancyCard />
              </Flyer>
              <Flyer
                spot={{ left: -0.015, top: 0.115, rotate: -3, scale: 0.9 }}
                delay={0}
                lag={0.04}
                className="lg:col-span-4"
              >
                <MaintenanceCard />
              </Flyer>
            </div>

            <div className="grid min-h-0 flex-1 gap-4 lg:grid-cols-12">
              <div className="flex flex-col gap-4 lg:col-span-4">
                <Flyer spot={{ left: 0.05, bottom: 0.2, rotate: 2 }} delay={0.2} lag={0.01}>
                  <TenantCard />
                </Flyer>
                <Flyer spot={{ left: 0.2, bottom: 0.045, rotate: -1.5 }} delay={0.4} lag={0.05}>
                  <ReminderCard />
                </Flyer>
              </div>
              <Chrome className={cn(cardSurface, "relative overflow-hidden lg:col-span-8")}>
                <InvoiceTable />
              </Chrome>
            </div>
          </div>
        </div>
      </div>

      <PaymentToast />
    </div>
  );
}

function RentCard() {
  return (
    <div className={cn(cardSurface, "relative flex h-full flex-col p-5 lg:h-[204px]")}>
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-[13.5px] text-slate-gray">October rent</p>
          <p className="mt-1.5 text-[30px] leading-none font-medium tracking-[-0.02em]">RWF 840k</p>
          <p className="mt-2 text-[12.5px] text-slate-gray">All 24 units · this month</p>
        </div>
        <span className="inline-flex items-center gap-1 rounded-full bg-mist-gray py-1 pr-2.5 pl-2 text-[12px]">
          <Check className="size-3" strokeWidth={2.5} />
          Collected
        </span>
      </div>
      <div className="mt-6 flex h-[58px] items-end gap-[3px] lg:mt-auto">
        {DAILY_RENT.map((value, day) => (
          <span
            key={day}
            className="min-w-0 flex-1 rounded-[2px] bg-ink-black"
            style={{ height: `${Math.max(value, 5)}%`, opacity: 0.28 + (value / 100) * 0.72 }}
          />
        ))}
      </div>
      <div className="mt-1.5 flex justify-between text-[10.5px] text-smoke-gray">
        <span>1 Oct</span>
        <span>15</span>
        <span>31</span>
      </div>
    </div>
  );
}

function OccupancyCard() {
  const radius = 38;
  const circumference = 2 * Math.PI * radius;

  return (
    <div className={cn(cardSurface, "relative flex h-full flex-col p-5 lg:h-[204px]")}>
      <p className="text-[13.5px] text-slate-gray">Occupancy rate</p>
      <div className="relative mx-auto mt-2 size-[92px]">
        <svg viewBox="0 0 92 92" className="size-full -rotate-90">
          <circle cx="46" cy="46" r={radius} fill="none" strokeWidth="7" className="stroke-mist-gray" />
          <circle
            cx="46"
            cy="46"
            r={radius}
            fill="none"
            strokeWidth="7"
            strokeLinecap="round"
            strokeDasharray={`${circumference * 0.94} ${circumference}`}
            className="stroke-ink-black"
          />
        </svg>
        <span className="absolute inset-0 flex items-center justify-center text-[20px] font-medium tracking-[-0.02em]">
          94%
        </span>
      </div>
      <div className="mt-auto flex items-center justify-between pt-3 text-[12.5px] text-slate-gray">
        <span>24 / 26 units</span>
        <span className="inline-flex items-center gap-1 text-ink-black">
          <TrendingUp className="size-3" />
          +3%
        </span>
      </div>
    </div>
  );
}

function MaintenanceCard() {
  return (
    <div className={cn(cardSurface, "relative flex h-full flex-col p-5 lg:h-[204px]")}>
      <div className="flex items-center gap-3">
        <span className="flex size-9 items-center justify-center rounded-xl bg-mist-gray">
          <Wrench className="size-4" strokeWidth={1.75} />
        </span>
        <p className="text-[14.5px] font-medium">Maintenance request</p>
      </div>
      <p className="mt-4 text-[14px] leading-[1.45] text-slate-gray">
        Leaking pipe in bathroom. Needs urgent attention.
      </p>
      <div className="mt-auto flex items-center justify-between pt-4 text-[12.5px]">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-mist-gray px-2.5 py-1">
          <span className="relative flex size-1.5">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-ink-black/40" />
            <span className="relative inline-flex size-1.5 rounded-full bg-ink-black" />
          </span>
          In progress
        </span>
        <span className="text-slate-gray">Unit 4B</span>
      </div>
    </div>
  );
}

function TenantCard() {
  return (
    <div className={cn(cardSurface, "relative flex items-center gap-4 p-4")}>
      <span className="relative shrink-0">
        <span className="flex size-10 items-center justify-center rounded-full bg-[#dff0e2] text-[13px] font-medium">
          MK
        </span>
        {/* Presence cursor — the live-interaction motif */}
        <svg viewBox="0 0 14 14" className="absolute -top-2 -left-2.5 size-3.5" fill="none">
          <path d="M1.2 1.2 12.4 5.6 7.6 7.6 5.6 12.4 1.2 1.2Z" fill="#17191c" stroke="#fff" strokeWidth="1" />
        </svg>
      </span>
      <div className="min-w-0">
        <p className="text-[14.5px] leading-tight font-medium">Marie Kalinda</p>
        <p className="mt-0.5 text-[12.5px] text-slate-gray">Tenant · Unit 12A</p>
        <p className="mt-1 inline-flex items-center gap-1 text-[12.5px]">
          <CircleCheck className="size-3.5" strokeWidth={1.75} />
          Lease active
        </p>
      </div>
    </div>
  );
}

function ReminderCard() {
  return (
    <div className={cn(cardSurface, "relative flex items-center gap-4 p-4")}>
      <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-mist-gray">
        <Bell className="size-4" strokeWidth={1.75} />
      </span>
      <div className="min-w-0">
        <p className="text-[14.5px] leading-tight font-medium">Rent reminder sent</p>
        <p className="mt-0.5 text-[12.5px] text-slate-gray">12 tenants notified via SMS</p>
      </div>
    </div>
  );
}

function InvoiceTable() {
  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center justify-between px-5 pt-4 pb-3">
        <p className="text-[14.5px] font-medium">October invoices</p>
        <p className="text-[12.5px] text-slate-gray">24 sent on 1 Oct</p>
      </div>
      <div className="grid grid-cols-[1.6fr_0.6fr_1fr_0.8fr] border-y border-hairline px-5 py-2 text-[11.5px] text-smoke-gray sm:grid-cols-[1.6fr_0.6fr_1fr_0.8fr_0.8fr]">
        <span>Tenant</span>
        <span>Unit</span>
        <span>Amount</span>
        <span className="hidden sm:block">Due</span>
        <span className="text-right">Status</span>
      </div>
      {INVOICES.map((invoice, index) => (
        <InvoiceRow key={invoice.tenant} index={index} {...invoice} />
      ))}
    </div>
  );
}

function InvoiceRow({ tenant, unit, amount, due, status, index }: (typeof INVOICES)[number] & { index: number }) {
  const { progress, pinned } = useHeroScene();
  const [start, end] = TIMELINE.rows;
  const at = start + index * 0.025;
  const opacity = useTransform(progress, [at, at + (end - start)], [0, 1]);
  const y = useTransform(progress, [at, at + (end - start)], [-10, 0]);

  return (
    <motion.div
      className="grid grid-cols-[1.6fr_0.6fr_1fr_0.8fr] items-center border-b border-hairline px-5 py-[9px] text-[13px] last:border-b-0 sm:grid-cols-[1.6fr_0.6fr_1fr_0.8fr_0.8fr]"
      style={pinned ? { opacity, y } : undefined}
    >
      <span className="truncate font-medium">{tenant}</span>
      <span className="text-slate-gray">{unit}</span>
      <span className="whitespace-nowrap text-slate-gray">
        <span className="hidden sm:inline">RWF </span>
        {amount}
      </span>
      <span className="hidden text-slate-gray sm:block">{due}</span>
      <span className="flex justify-end">{status === "paying" ? <PayingStatus /> : <StatusPill paid />}</span>
    </motion.div>
  );
}

function StatusPill({ paid }: { paid?: boolean }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11.5px]",
        paid ? "bg-mist-gray text-ink-black" : "bg-blush-peach text-sienna-brown",
      )}
    >
      {paid && <Check className="size-2.5" strokeWidth={3} />}
      {paid ? "Paid" : "Due"}
    </span>
  );
}

/** Marie's invoice flips from Due to Paid once her payment lands. */
function PayingStatus() {
  const { progress, pinned } = useHeroScene();
  const [start, end] = TIMELINE.paid;
  const due = useTransform(progress, [start, end], [1, 0]);
  const paid = useTransform(progress, [start, end], [0, 1]);
  const paidY = useTransform(progress, [start, end], [-8, 0]);

  if (!pinned) return <StatusPill paid />;

  return (
    <span className="relative inline-flex">
      <motion.span style={{ opacity: due }}>
        <StatusPill />
      </motion.span>
      <motion.span className="absolute top-0 right-0" style={{ opacity: paid, y: paidY }}>
        <StatusPill paid />
      </motion.span>
    </span>
  );
}

function PaymentToast() {
  const { progress, pinned } = useHeroScene();
  const [start, end] = TIMELINE.toast;
  const opacity = useTransform(progress, [start, end], [0, 1]);
  const y = useTransform(progress, [start, end], [-24, 0]);
  const scale = useTransform(progress, [start, end], [0.94, 1]);

  if (!pinned) return null;

  return (
    <motion.div
      className="absolute top-[68px] right-6 flex w-[296px] items-center gap-3 rounded-2xl bg-ink-black p-3.5 text-paper-white shadow-overlay"
      style={{ opacity, y, scale }}
    >
      <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-paper-white/12">
        <Check className="size-4" strokeWidth={2.25} />
      </span>
      <span className="min-w-0">
        <span className="block text-[13.5px] font-medium">Payment received</span>
        <span className="block text-[12.5px] text-paper-white/60">RWF 35,000 · Unit 12A · MoMo</span>
      </span>
    </motion.div>
  );
}
