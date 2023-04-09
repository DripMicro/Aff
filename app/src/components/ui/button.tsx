import type { VariantProps } from "class-variance-authority";
import { cva } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

const buttonVariants = cva(
  "inline-flex select-none items-center justify-center rounded-md font-medium focus:outline-none active:scale-95 disabled:pointer-events-none disabled:opacity-50 data-[state=open]:bg-slate-100 dark:hover:bg-slate-800 dark:hover:text-slate-100 dark:focus:ring-slate-400 dark:focus:ring-offset-slate-900 dark:data-[state=open]:bg-slate-800",
  {
    variants: {
      variant: {
        primary: "rounded-md bg-primary text-base text-white",
        text: "text-primary",
        azure: "rounded-md bg-azure text-base text-white",
        white: "rounded-md bg-white text-base text-black",
        "primary-outline":
          "rounded-md border border-azure bg-secondary text-base text-azure",
        "azure-outline":
          "rounded-md border border-azure bg-secondary text-base text-paris",
        default:
          "bg-slate-900 text-white hover:bg-slate-700 dark:bg-slate-50 dark:text-slate-900",
        destructive:
          "bg-red-500 text-white hover:bg-red-600 dark:hover:bg-red-600",
        outline: "rounded-md border border-azure bg-white text-base text-azure",
        subtle:
          "bg-slate-100 text-slate-900 hover:bg-slate-200 dark:bg-slate-700 dark:text-slate-100",
        ghost:
          "bg-transparent hover:bg-slate-100 data-[state=open]:bg-transparent dark:text-slate-100 dark:hover:bg-slate-800 dark:hover:text-slate-100 dark:data-[state=open]:bg-transparent",
        link: "bg-transparent text-slate-900 underline-offset-4 hover:bg-transparent hover:underline dark:bg-transparent dark:text-slate-100 dark:hover:bg-transparent",
      },
      size: {
        default: "py-1 px-2 md:py-2 md:px-6",
        sm: "h-9 rounded-md px-2",
        md: "rounded px-3 py-1.5",
        lg: "rounded-md py-3",
        rec: "p-3.5",
        "rec-sm": "p-2.5",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  // TODO:TW need to implement
  isLoading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, isLoading, ...props }, ref) => {
    //TODO: isLoading
    return (
      <>
        <button
          type="button"
          className={cn(buttonVariants({ variant, size, className }))}
          disabled={isLoading}
          ref={ref}
          {...props}
        >
          {isLoading ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            props.children
          )}
        </button>
      </>
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
