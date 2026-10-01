"use client";

import { useCallback, useSyncExternalStore } from "react";

/** Subscribes to a media query; `false` during SSR so the mobile layout is the baseline. */
export function useMediaQuery(query: string) {
  const subscribe = useCallback(
    (onChange: () => void) => {
      const mql = window.matchMedia(query);
      mql.addEventListener("change", onChange);
      return () => mql.removeEventListener("change", onChange);
    },
    [query],
  );

  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(query).matches,
    () => false,
  );
}

/** Pinned scroll scenes only run at this width and up. */
export const DESKTOP_QUERY = "(min-width: 1024px)";
