import { useMeta, useTsController } from "../../libs/react-ts-form";
import { maybeConvertChild } from "@/components/common/wizard/useWizardFlow";
import { FormControl } from "./FormControl";
import { clsx } from "clsx";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import type { Props } from "./TextField";

export const CheckboxField = ({ controlName }: Props) => {
  const { field, error, formContext } = useTsController<boolean>();
  const meta = useMeta();
  const { label, className } = meta || {
    label: "",
  };

  controlName = controlName || meta?.control;

  let control;
  if (controlName === "Switch") {
    control = (
      <div className="flex items-center space-x-2">
        <Switch
          id={field.name}
          name={field.name}
          checked={field.value}
          onCheckedChange={(checked) => {
            field.onChange(Boolean(checked));
          }}
        />
        <label
          htmlFor={field.name}
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          {maybeConvertChild(label)}
        </label>
      </div>
    );
  } else {
    control = (
      <div className="flex items-center space-x-2">
        <Checkbox
          className={clsx(["checkbox", { error: "checkbox-error" }])}
          id={field.name}
          name={field.name}
          checked={field.value == true}
          onCheckedChange={(checked) => {
            field.onChange(Boolean(checked));
          }}
        />
        <label
          htmlFor={field.name}
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          {maybeConvertChild(label)}
        </label>
      </div>
    );
  }

  return <FormControl showLabel={false}>{control}</FormControl>;
};
