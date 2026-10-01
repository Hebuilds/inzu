import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function clamp01(value: number) {
  return Math.min(1, Math.max(0, value));
}

/** Maps `value` from [start, end] onto 0–1, clamped. */
export function segment(value: number, start: number, end: number) {
  return clamp01((value - start) / (end - start));
}

export function easeInOutCubic(t: number) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

export function easeOutCubic(t: number) {
  return 1 - Math.pow(1 - t, 3);
}
