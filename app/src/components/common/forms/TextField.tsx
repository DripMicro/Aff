import { useMeta, useTsController } from "../../libs/react-ts-form";
import { RadioButtonGroup } from "./RadioButtonGroup";
import type { ChoiceType, ZodMetaDataItem } from "../../../utils/zod-meta";
import { maybeConvertChild } from "@/components/common/wizard/useWizardFlow";
import { FormControl } from "./FormControl";
import { clsx } from "clsx";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export interface Props {
  choices?: ChoiceType[];
  type?: string;
  controlName?: ZodMetaDataItem["control"];
}

export const TextField = (
  // props: Omit<InputHTMLAttributes<HTMLInputElement>, "name" | "value"> & {
  //   // label?: string;
  //   enumValues?: string[];
  // }
  { type, choices: choicesParams, controlName }: Props
) => {
  const { field, error, formContext } = useTsController<string>();
  const meta = useMeta();
  const {
    label,
    placeholder,
    choices: choicesDescription,
    className,
  } = meta || {
    label: "",
    placeholder: "",
  };

  const choices = choicesParams || choicesDescription;

  // const options = parseOptionsString(placeholder);
  // if (options.choices && !choices) {
  //   choices = parseChoices(String(options.choices));
  // }

  controlName = controlName || meta?.control;

  // console.log(
  //   `muly:TextField ${field.name} label:${label}, placeholder:${placeholder}`,
  //   {
  //     error,
  //     meta,
  //     choices,
  //     field,
  //     label,
  //     placeholder,
  //   }
  // );

  let control;
  if (!choices) {
    if (controlName === "Textarea") {
      control = (
        <Textarea
          className={cn({ error: "border-red-500" })}
          name={field.name}
          placeholder={placeholder}
          value={field.value ? field.value + "" : ""}
          onChange={(e) => {
            field.onChange(e.target.value);
          }}
        />
      );
    } else if (controlName === "File") {
      control = (
        <input
          className={clsx([{ error: "file-input-error" }])}
          type="file"
          name={field.name}
          onChange={(e) => {
            let file;

            if (e.target.files) {
              file = e.target.files[0];
            }

            console.log(`muly:set file value`, { file, v: e.target.value });
            // @ts-ignore
            field.onChange(file);
          }}
        />
      );
    } else {
      // console.log(`muly:TextField`, { error });
      control = (
        <Input
          error={error}
          name={field.name}
          id={field.name}
          type={type || undefined}
          placeholder={placeholder}
          value={field.value ? field.value + "" : ""}
          onChange={(e) => {
            field.onChange(e.target.value);
          }}
        />
      );
    }
  } else if (controlName === "Checkbox") {
    const [valueFalse, valueTrue] =
      typeof choices[0] === "string" ? choices : [false, true];

    control = (
      <div className="flex items-center space-x-2">
        <Checkbox
          className={clsx(["checkbox", { error: "checkbox-error" }])}
          id={field.name}
          name={field.name}
          checked={field.value == valueTrue}
          onCheckedChange={(checked) => {
            field.onChange(checked ? String(valueTrue) : String(valueFalse));
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
  } else if (controlName === "Switch") {
    const [valueFalse, valueTrue] =
      typeof choices[0] === "string" ? choices : [false, true];

    control = (
      <div className="flex items-center space-x-2">
        <Switch
          className="border-slate-300 bg-transparent placeholder:text-slate-400 focus:ring-slate-400 dark:border-slate-700 dark:text-slate-50 dark:focus:ring-slate-400 dark:focus:ring-offset-slate-900 flex h-10 w-full rounded-md border py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          id={field.name}
          name={field.name}
          checked={field.value == valueTrue}
          onCheckedChange={(checked) => {
            field.onChange(checked ? String(valueTrue) : String(valueFalse));
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
    // } else if (controlName === "CheckboxGroup") {
    //   control = (
    //     <CheckboxGroup
    //       value={(field.value || "").split(",")}
    //       choices={choices}
    //       onChange={(value) => {
    //         console.log(`muly:onCjange`, { value });
    //         field.onChange(value.join(","));
    //       }}
    //     />
    //   );
  } else if (controlName === "RadioGroup") {
    control = (
      <RadioButtonGroup
        name={field.name}
        value={field.value ? field.value + "" : ""}
        choices={choices}
        onChange={(value) => {
          field.onChange(value);
        }}
      />
    );
  } else {
    control = (
      <Select
        name={field.name}
        value={field.value ? field.value + "" : ""}
        onValueChange={(value) => {
          field.onChange(value);
        }}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>

        <SelectContent>
          {choices.map((choice, idx) => {
            const { id, title } =
              typeof choice === "string"
                ? { id: choice, title: choice }
                : choice;
            return (
              <SelectItem key={idx} value={String(id)}>
                {title}
              </SelectItem>
            );
          })}
        </SelectContent>
      </Select>
    );
  }

  // console.log(`muly:TextField`, { formContext });

  return (
    <FormControl
      showLabel={controlName !== "Checkbox" && controlName !== "Switch"}
    >
      {control}
    </FormControl>
  );
};
