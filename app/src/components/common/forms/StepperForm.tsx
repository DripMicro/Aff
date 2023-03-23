import { createTsForm } from "../../libs/react-ts-form";
import { mapping } from "./mapping";
import type { FormEvent } from "react";
import React from "react";
import { Button, Stack, Flex } from "@chakra-ui/react";
import { useSubmitAction } from "./useSubmitAction";
import type { CommonFormProps } from "@/components/common/forms/Form";
import { cn } from "@/lib/utils";

export interface FormProps extends CommonFormProps {
  onPrevious?: () => void;
  stepCount?: number;
  activeStep?: number;
}

const CommonForm = ({
  onSubmit,
  children,
  onPrevious,
  stepCount,
  activeStep,
  submit,
  className,
}: FormProps) => {
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
  console.log("stepCount:", stepCount);
  console.log("activeStep:", activeStep);
  return (
    <form onSubmit={handleSubmit} noValidate>
      <Stack>
        <div className={cn("flex flex-col gap-4", className)}>{children}</div>
        {activeStep === stepCount ? (
          <Flex p={4}>
            <Button mx="auto" size="sm">
              Reset
            </Button>
          </Flex>
        ) : (
          <Flex width="100%" justify="flex-start">
            <Button
              minW={36}
              isDisabled={activeStep === 0}
              onClick={onPrevious}
              mr={4}
              size="md"
              variant="ghost"
            >
              Prev
            </Button>
            <Button
              size="md"
              minW={36}
              type="submit"
              variant="solid"
              isLoading={isLoading}
            >
              {stepCount && activeStep
                ? activeStep === stepCount - 1
                  ? "Finish"
                  : "Next"
                : "Next"}
            </Button>
          </Flex>
        )}
        {/* <Button
          minW={36}
          type="submit"
          variant="solid"
          isLoading={isLoading}
          alignSelf="start"
        >
          {submitButtonText ? submitButtonText : "SAVE"}
        </Button> */}
      </Stack>
    </form>
  );
};

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export const StepperForm = createTsForm(mapping, {
  FormComponent: CommonForm,
});
