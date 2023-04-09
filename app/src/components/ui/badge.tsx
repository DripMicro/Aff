import type { VariantProps } from "class-variance-authority";
import { cva } from "class-variance-authority";
import * as React from "react";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "mr-2 rounded bg-red-100 px-2.5 py-0.5 text-xs font-medium text-red-800",
  {
    variants: {
      variant: {
        red: "bg-red-100 text-red-800",
        green: "bg-green-100 text-green-800",
        blue: "bg-blue-100 text-blue-800",
      },
      size: {
        default: "",
      },
    },
    defaultVariants: {
      variant: "green",
      size: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof badgeVariants> {}

const Badge = React.forwardRef<HTMLButtonElement, BadgeProps>(
  ({ className, variant, size, ...props }, ref) => {
    //TODO: isLoading
    return (
      <span
        className={cn(badgeVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      >
        {props.children}
      </span>
    );
  }
);
Badge.displayName = "Badge";

export { Badge, badgeVariants };
