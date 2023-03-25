import { Heading, Stack } from "@chakra-ui/react";
import { z } from "zod";
import { StepperForm } from "../../common/forms/StepperForm";
import { useTranslation } from "next-i18next";
import { usePrepareSchema } from "@/components/common/forms/usePrepareSchema";

const schema = z.object({
  merchant_id: z.any().describe("Select Merchants // Select Merchants"),
  creative: z
    .string()
    .optional()
    .describe(
      "What creative you would like to relate this pixel to // All Creatives"
    ),
});

interface Props {
  stepCount: number;
  activeStep: number;
  values: object;
  merchants: any;
  merchant_creative: any;
  count: number;
  setCount: any;
  onNext: (values: z.infer<typeof schema>) => void;
  onPrevious: () => void;
}

export const PixelTypeForm = ({
  stepCount,
  activeStep,
  values,
  merchants,
  merchant_creative,
  count,
  setCount,
  onNext,
  onPrevious,
}: Props) => {
  const { t } = useTranslation("affiliate");
  const formContext = usePrepareSchema(t, schema);

  return (
    <Stack mt={12} gap={2}>
      <Heading as="h6" size="xs">
        Step 1: Select Pixel Type
      </Heading>
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
        props={{
          merchant_id: {
            choices: merchants,
          },
          creative: {
            choices: merchant_creative,
          },
        }}
        defaultValues={values}
      ></StepperForm>
    </Stack>
  );
};
