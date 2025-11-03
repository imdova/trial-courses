import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/util";

const badgeVariants = cva(
  "inline-flex items-center justify-center rounded-md border px-2 py-0.5 font-medium w-fit whitespace-nowrap shrink-0  gap-1 [&>svg]:pointer-events-none aria-disabled:opacity-50 focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow]  overflow-hidden",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground [a&]:hover:bg-primary/90",
        ghost:
          "border-transparent bg-transparent text-foreground [a&]:hover:bg-primary/10",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground [a&]:hover:bg-secondary/90",
        destructive:
          "border-transparent bg-destructive text-white [a&]:hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        destructiveOutline:
          "border-destructive/15 bg-destructive/10 text-destructive/70 [a&]:hover:bg-destructive/20 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline:
          "text-foreground [a&]:hover:bg-accent [a&]:hover:text-accent-foreground",
        success:
          "bg-green-100 text-green-800 border-green-200 [a&]:hover:bg-green-200",
        warning:
          "bg-yellow-100 text-yellow-800 border-yellow-200 [a&]:hover:bg-yellow-200",
        info: "bg-blue-100 text-blue-800 border-blue-200 [a&]:hover:bg-blue-200",
        neutral:
          "bg-gray-100 text-gray-800 border-gray-200 [a&]:hover:bg-gray-200",
        premium:
          "bg-purple-100 text-purple-800 border-purple-200 [a&]:hover:bg-purple-200", // Added for premium
      },
      size: {
        default: "[&>svg]:size-3 text-xs",
        lg: "[&>svg]:size-4 text-sm",
        xl: "[&>svg]:size-5 text-base",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

function Badge({
  className,
  variant,
  disabled,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"span"> &
  VariantProps<typeof badgeVariants> & {
    asChild?: boolean;
    disabled?: boolean;
  }) {
  const Comp = asChild ? Slot : "span";

  return (
    <Comp
      data-slot="badge"
      aria-disabled={disabled}
      className={cn(badgeVariants({ variant, size }), className)}
      {...props}
    />
  );
}

export { Badge, badgeVariants };
