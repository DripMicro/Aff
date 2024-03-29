import React from "react";
import { Stack, Heading } from "@chakra-ui/react";
import { StepperForm } from "../../common/forms/StepperForm";
import { z } from "zod";
import { useTranslation } from "next-i18next";
import { usePrepareSchema } from "@/components/common/forms/usePrepareSchema";

const schema = z.object({
  pixelCode: z.string().describe("Pixel Code").meta({ control: "Textarea" }),
});

interface Props {
  stepCount: number;
  activeStep: number;
  values: object;
  count: number;
  setCount: any;
  onNext: (values: z.infer<typeof schema>) => void;
  onPrevious: () => void;
}

export const PixelCodeForm = ({
  stepCount,
  activeStep,
  values,
  count,
  setCount,
  onNext,
  onPrevious,
}: Props) => {
  const { t } = useTranslation("affiliate");
  const formContext = usePrepareSchema(t, schema);

  return (
    <Stack gap={2}>
      <div className="mt-5 font-medium text-black md:mt-12 md:text-lg">
        Step 3: Create Pixel Code
      </div>
      <StepperForm
        formContext={formContext}
        schema={schema}
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        onSubmit={onNext}
        formProps={{
          stepCount: stepCount,
          activeStep: activeStep,
          onPrevious: onPrevious,
          submit: { notification: false },
          count: count,
          setCount: setCount,
        }}
        defaultValues={values}
      ></StepperForm>
    </Stack>
  );
};
