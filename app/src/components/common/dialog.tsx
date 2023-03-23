import {
  Dialog as DialogUI,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import * as React from "react";

export interface DialogProps {
  trigger: React.ReactNode;
  title?: string;
  description?: string;
  children: React.ReactNode;
  actions?: React.ReactNode;

  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export const Dialog = ({
  trigger,
  title,
  description,
  children,
  actions,
  setIsOpen,
  isOpen,
}: DialogProps) => {
  return (
    <DialogUI open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        {children}
      </DialogContent>
    </DialogUI>
  );
};
