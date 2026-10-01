"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { Menu, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Logo } from "@/components/site/logo";
import { links, nav } from "@/lib/content";
import { cn } from "@/lib/utils";

export function Header() {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useMotionValueEvent(scrollY, "change", (y) => setScrolled(y > 12));

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,backdrop-filter] duration-500",
          scrolled || open
            ? "bg-paper-white/85 shadow-[0_1px_0_0_rgba(23,25,28,0.06)] backdrop-blur-xl"
            : "bg-transparent",
        )}
      >
        <div className="shell flex h-[72px] items-center justify-between">
          <a href="#top" aria-label="Inzu Connect home" className="rounded-full">
            <Logo />
          </a>

          <nav aria-label="Main" className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-9 lg:flex">
            {nav.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="relative py-0.5 text-[16px] after:absolute after:inset-x-0 after:-bottom-0.5 after:h-px after:origin-left after:scale-x-0 after:bg-ink-black after:transition-transform after:duration-300 after:ease-out-expo hover:after:scale-x-100"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="hidden items-center gap-6 lg:flex">
            <a href={links.login} className="text-[16px] underline-offset-4 hover:underline">
              Sign in
            </a>
            <Button asChild size="sm" className="h-10 px-[18px] text-[16px]">
              <a href={links.register}>Start free trial</a>
            </Button>
          </div>

          <button
            type="button"
            className="-mr-2 inline-flex size-11 items-center justify-center rounded-full lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </header>

      {/* Outside the header: its backdrop-filter would otherwise become the containing block for this fixed panel. */}
      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            className="fixed inset-x-0 top-[72px] bottom-0 z-40 overflow-y-auto bg-paper-white lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <nav aria-label="Mobile" className="shell flex h-full flex-col pt-6 pb-10">
              {nav.map((item, index) => (
                <motion.a
                  key={item.label}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="border-b border-hairline py-4 font-serif text-[34px] leading-tight tracking-[-0.015em]"
                  initial={{ opacity: 0, y: -18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.04 * index, ease: [0.16, 1, 0.3, 1] }}
                >
                  {item.label}
                </motion.a>
              ))}
              <div className="mt-auto flex flex-col gap-3 pt-10">
                <Button asChild size="lg">
                  <a href={links.register}>Start free trial</a>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <a href={links.login}>Sign in</a>
                </Button>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
