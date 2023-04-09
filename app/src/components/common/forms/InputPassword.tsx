import { Input } from "@/components/ui/input";
import { ChoiceType } from "@/utils/zod-meta";
import { useMeta, useTsController } from "@/components/libs/react-ts-form";
import { useState } from "react";

interface Props {
  type: string;
}

export const InputPassword = () => {
  const [showPassword, setShowPassword] = useState(false);
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

  return (
    <div className="flex flex-row items-center">
      <Input
        error={error}
        name={field.name}
        id={field.name}
        type={showPassword ? "text" : "password"}
        placeholder={placeholder}
        value={field.value ? field.value + "" : ""}
        onChange={(e) => {
          field.onChange(e.target.value);
        }}
      />
      <label
        onClick={() => setShowPassword(!showPassword)}
        className="m-[-2rem]"
        htmlFor="toggle"
      >
        {showPassword ? (
          <svg
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            ></path>
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
            ></path>
          </svg>
        ) : (
          <svg
            className="h-6 w-6 opacity-60"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
            ></path>
          </svg>
        )}
      </label>
    </div>
  );
};
