import { createTsForm } from "../../libs/react-ts-form";
import { mapping } from "./mapping";
import type { FormEvent } from "react";
import React, { Children } from "react";
import { Button, Stack, Flex } from "@chakra-ui/react";
import { useSubmitAction } from "./useSubmitAction";
import type { CommonFormProps } from "@/components/common/forms/Form";
import { cn } from "@/lib/utils";
import type { Dispatch, SetStateAction } from "react";

export interface FormProps extends CommonFormProps {
  onPrevious?: () => void;
  stepCount?: number;
  activeStep?: number;
  count: number;
  setCount: Dispatch<SetStateAction<number>>;
}

const CommonForm = ({
  onSubmit,
  children,
  onPrevious,
  stepCount,
  activeStep,
  submit,
  className,
  count,
  setCount,
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

  let margin = 0;
  {
    Children.toArray(children).forEach((child: any) => {
      console.log("Children Prop: ", child.props?.children[1]?.props?.label);
      if (child.props?.children[1]?.props?.label === "Select Merchants") {
        margin = 79.5;
      } else if (child.props?.children[1]?.props?.label === "Select Trigger") {
        margin = 168;
      } else if (child.props?.children[1]?.props?.label === "Pixel Code") {
        margin = 20;
      } else if (child.props?.children[1]?.props?.label === "Select Method") {
        margin = 168;
      } else if (child.props?.children[1]?.props?.label === "Select Method") {
        margin = 168;
      }
    });
  }
  const handleAddChange = () => {
    setCount(count + 1);
  };
  const handleMinusChange = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };
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
          <Flex width="100%" justify="flex-start" pt={10} pb={10}>
            <Button
              minW={36}
              mr={4}
              type="submit"
              size="md"
              variant="ghost"
              bgColor="blue.100"
              width="48"
              height="10"
              mt={margin}
              onClick={handleMinusChange}
            >
              Prev
            </Button>
            <Button
              size="md"
              minW={36}
              type="submit"
              variant="solid"
              isLoading={isLoading}
              bgColor="blue.600"
              textColor="white"
              width="48"
              height="10"
              mt={margin}
              onClick={handleAddChange}
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
