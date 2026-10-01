import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "group/button inline-flex shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-full text-[16px] font-normal transition-[background-color,color,border-color,transform] duration-300 ease-out-expo active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        // Pill — Filled: the solid black lozenge
        default: "border border-ink-black bg-ink-black text-paper-white hover:bg-[#2a2d32] hover:border-[#2a2d32]",
        // Pill — Ghost: matched pair for the filled pill
        outline: "border border-ink-black bg-transparent text-ink-black hover:bg-ink-black hover:text-paper-white",
        soft: "border border-transparent bg-mist-gray text-ink-black hover:bg-[#e8e8ea]",
        inverse: "border border-paper-white bg-paper-white text-ink-black hover:bg-mist-gray hover:border-mist-gray",
        "outline-inverse":
          "border border-paper-white/40 bg-transparent text-paper-white hover:border-paper-white hover:bg-paper-white hover:text-ink-black",
        // Text link with arrow: lowest emphasis, underline only on hover
        link: "rounded-none text-ink-black underline-offset-4 hover:underline",
      },
      size: {
        default: "h-11 px-5",
        sm: "h-9 px-4 text-[15px]",
        lg: "h-[52px] px-7 text-[17px]",
        link: "h-auto p-0",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> & VariantProps<typeof buttonVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "button";

  return <Comp data-slot="button" className={cn(buttonVariants({ variant, size, className }))} {...props} />;
}

/** The → glyph that carries link affordance; nudges right when the parent button is hovered. */
function ButtonArrow({ className }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "inline-block transition-transform duration-300 ease-out-expo group-hover/button:translate-x-1",
        className,
      )}
    >
      →
    </span>
  );
}

export { Button, ButtonArrow, buttonVariants };
