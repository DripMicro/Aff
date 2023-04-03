"use client";

import { cn } from "@/lib/utils";
import { cva } from "class-variance-authority";
import { ChevronsLeft, ChevronsRight } from "lucide-react";
import * as React from "react";

export interface PaginationProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: any;
  count: number;
  variant?: string;
}

const paginationVariants = cva(
  "inline-flex h-10 w-10 items-center rounded-md",
  {
    variants: {
      variant: {
        focus: "bg-blue-500 p-4 text-sm font-medium text-white",
        secondary: "p-4 text-sm font-medium text-gray-500 hover:text-blue-600",
      },
    },
    defaultVariants: {
      variant: "focus",
    },
  }
);
const Pagination = React.forwardRef<HTMLInputElement, PaginationProps>(
  ({ error, className, variant, ...props }, ref) => {
    const pages = [];

    for (let i = 1; i <= props.count; i++) {
      pages.push(i);
    }
    return (
      <nav
        className="flex items-center justify-start space-x-2"
        ref={ref}
        {...props}
      >
        <a className="inline-flex items-center gap-2 rounded-md p-4 text-gray-500 hover:text-blue-600">
          <ChevronsLeft />
        </a>

        {pages.map((item, key) => {
          return (
            <a
              className={
                item === 1
                  ? cn(paginationVariants({ variant: "focus" }))
                  : cn(paginationVariants({ variant: "secondary" }))
              }
              href="#"
              aria-current="page"
              key={key}
            >
              {item}
            </a>
          );
        })}
        <a className="inline-flex items-center gap-2 rounded-md p-4 text-gray-500 hover:text-blue-600">
          <ChevronsRight />
        </a>
      </nav>
    );
  }
);
Pagination.displayName = "Input";

export { Pagination };
