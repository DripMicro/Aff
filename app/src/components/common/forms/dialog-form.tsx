import type { DialogProps } from "@/components/common/dialog";
import { Dialog } from "@/components/common/dialog";
import { DialogFooter } from "@/components/ui/dialog";
import * as React from "react";
import { useSubmitAction } from "@/components/common/forms/useSubmitAction";
import { useFormContext } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { createTsForm } from "@/components/libs/react-ts-form";
import { mapping } from "@/components/common/forms/mapping";
import { useState } from "react";
import { map } from "rambda";

interface Props extends Omit<DialogProps, "isOpen" | "setIsOpen"> {
  onSubmit: (values: unknown) => Promise<void>;
  actionName: string;
}

export const DialogFormControl = ({
  trigger,
  title,
  description,
  children,
  actions,

  actionName,
  onSubmit,
}: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const { reset, formState, getValues } = useFormContext();
  const { handleSubmit, isLoading } = useSubmitAction({
    onSubmit: async (values: unknown) => {
      await onSubmit(values);
      console.log(`muly:onSubmit`, {
        reset,
        values,
        formState,
        getValues: getValues(),
      });
      reset(map(() => null, getValues()));
      setIsOpen(false);
    },
  });

  return (
    <Dialog
      trigger={trigger}
      title={title}
      description={description}
      actions={actions}
      isOpen={isOpen}
      setIsOpen={setIsOpen}
    >
      <form onSubmit={handleSubmit} noValidate>
        {children}
        <DialogFooter className="flex flex-row justify-between gap-2">
          {actions}
          <Button type="submit" variant="primary" isLoading={isLoading}>
            {actionName}
          </Button>
        </DialogFooter>
      </form>
    </Dialog>
  );
};

export const DialogForm = createTsForm(mapping, {
  FormComponent: DialogFormControl,
});
