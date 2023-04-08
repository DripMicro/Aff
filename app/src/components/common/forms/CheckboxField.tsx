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

  let control;
  if (controlName === "Switch") {
    control = (
      <div className="flex items-center space-x-2">
        <Switch
          className="border-slate-300 placeholder:text-slate-400 focus:ring-slate-400 dark:border-slate-700 dark:text-slate-50 dark:focus:ring-slate-400 dark:focus:ring-offset-slate-900 flex h-10 w-full rounded-md border bg-transparent py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
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
