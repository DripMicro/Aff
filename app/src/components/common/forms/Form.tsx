import { createTsForm } from "../../libs/react-ts-form";
import { mapping } from "./mapping";
import React from "react";
import { useSubmitAction } from "./useSubmitAction";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export interface CommonFormProps {
  onSubmit: (values: unknown) => Promise<void>;
  children: React.ReactNode;

  submit?: {
    className?: string;
    text?: string;
    notification?: boolean;
  };

  className?: string;
}

const CommonForm = ({
  onSubmit,
  children,
  submit,
  className,
}: CommonFormProps) => {
  const {
    text,
    notification,
    className: buttonClassName,
  } = submit || {
    text: "Save",
    notification: false,
  };
  const { handleSubmit, isLoading } = useSubmitAction({
    onSubmit,
    notification,
  });

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className="flex flex-col items-center">
        <div className={cn("flex flex-col gap-4", className)}>{children}</div>
        <Button
          variant="primary"
          className={buttonClassName}
          isLoading={isLoading}
          type="submit"
        >
          {text}
        </Button>
      </div>
    </form>
  );
};

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export const Form = createTsForm(mapping, {
  FormComponent: CommonForm,
});
