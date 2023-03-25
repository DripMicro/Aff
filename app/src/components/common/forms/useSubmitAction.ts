import { useState } from "react";
import { castError } from "../../../utils/errors";
import type { CommonFormProps } from "./Form";
import { useFormContext } from "react-hook-form";
import type { FieldValues } from "react-hook-form";
import { useToast } from "@/hooks/use-toast";

export class FormError extends Error {
  formErrors: Record<string, string>;

  constructor(formErrors: Record<string, string>) {
    super("Form validation error");
    this.name = "FormError";
    this.formErrors = formErrors;
  }
}

interface Options {
  onSubmit: CommonFormProps["onSubmit"];

  notification?: boolean;
}

export const useSubmitAction = ({ onSubmit, notification }: Options) => {
  const { toast } = useToast();
  const { handleSubmit, setError } = useFormContext();
  const [isLoading, setIsLoading] = useState(false);

  const save = async (fieldValues: FieldValues) => {
    // console.log(`muly:useSubmitAction:save A`, { fieldValues, onSubmit });
    setIsLoading(true);
    try {
      // await pause(2000);

      // we never get answer, must throw to report errors
      await onSubmit(fieldValues);
      // console.log(`muly:useSubmitAction:save B`, { answer });
      if (notification) {
        toast({
          title: "Saved",
          // description: "We've created your account for you.",
          // status: "success",
          duration: 5000,
          // isClosable: true,
        });
      }
    } catch (_err) {
      const err = castError(_err);
      console.log(`muly:useSubmitAction:save ERROR`, {
        err,
        in: err instanceof FormError,
      });

      if (err instanceof FormError) {
        Object.keys(err.formErrors).forEach((key) => {
          setError(key, {
            type: "custom",
            message: err.formErrors[key],
          });
        });
      } else {
        console.error(`Error submit form ${err.message}`, { err: err.stack });
        if (notification) {
          toast({
            variant: "destructive",
            title: "Failed to save",
            description: `Error: ${err.message}`,
            duration: 10000,
          });
        }
      }
    } finally {
      // console.log(`muly:useSubmitAction:save finally`, {});
      setIsLoading(false);
    }
  };

  return {
    handleSubmit: handleSubmit(save),
    isLoading,
  };
};
