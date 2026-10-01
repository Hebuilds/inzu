"use client";

import { type ReactNode } from "react";
import { MotionConfig } from "framer-motion";

/** Honours the visitor's reduced-motion setting for every animation on the page. */
export function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
