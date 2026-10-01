"use client";

import { createContext, useContext, type RefObject } from "react";
import { type MotionValue } from "framer-motion";

export type HeroScene = {
  /** 0 at the top of the page, 1 when the pinned scene releases. */
  progress: MotionValue<number>;
  stageRef: RefObject<HTMLDivElement | null>;
  /** False below the desktop breakpoint, where the scene is a plain stacked layout. */
  pinned: boolean;
};

export const HeroContext = createContext<HeroScene | null>(null);

export function useHeroScene() {
  const scene = useContext(HeroContext);
  if (!scene) throw new Error("useHeroScene must be used inside <Hero>");
  return scene;
}

/**
 * Scene timeline, as fractions of the pinned scroll distance.
 * Cards leave their floating spots and dock while the window fades in around them,
 * then the docked dashboard plays out a payment arriving.
 */
export const TIMELINE = {
  headlineOut: [0.02, 0.26],
  fly: [0.05, 0.52],
  chrome: [0.22, 0.52],
  rows: [0.5, 0.62],
  toast: [0.7, 0.8],
  paid: [0.8, 0.88],
} as const;
