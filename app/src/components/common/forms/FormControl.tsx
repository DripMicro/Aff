import { maybeConvertChild } from "@/components/common/wizard/useWizardFlow";
import { useMeta, useTsController } from "@/components/libs/react-ts-form";
import { Label } from "@/components/ui/label";
import { clsx } from "clsx";
import React from "react";

interface Props {
  showLabel?: boolean;
  children: React.ReactNode;
}

export const FormControl = ({ children, showLabel }: Props) => {
  const { field, error, formContext } = useTsController<string>();
  const meta = useMeta();
  const { label, className } = meta || {
    label: "",
    placeholder: "",
  };

  return (
    <div className={clsx([{ "w-full max-w-xs": !className }, className])}>
      {showLabel !== false && (
        <Label htmlFor={field.name}>{maybeConvertChild(label)}</Label>
      )}
      {children}
      <label className="label">
        {!error ? null : (
          <p className="text-sm text-red-500">
            {formContext.t(error?.errorMessage)}
          </p>
        )}

        {/*<span className="label-text-alt">Bottom Left label</span>*/}
        {/*<span className="label-text-alt">Bottom Right label</span>*/}
      </label>
    </div>
  );
};
