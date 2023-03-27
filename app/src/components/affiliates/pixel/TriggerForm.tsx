import { Heading, Stack } from "@chakra-ui/react";
import { z } from "zod";
import { StepperForm } from "../../common/forms/StepperForm";
import { useTranslation } from "next-i18next";
import { usePrepareSchema } from "@/components/common/forms/usePrepareSchema";

const schema = z.object({
  type: z
    .enum(["lead", "account", "sale", "qftd"])
    .describe("Select Trigger // Select Trigger"),
});

interface Props {
  stepCount: number;
  activeStep: number;
  values: object;
  type: any;
  count: number;
  setCount: any;
  onNext: (values: z.infer<typeof schema>) => void;
  onPrevious: () => void;
}

export const TriggerForm = ({
  stepCount,
  activeStep,
  values,
  type,
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
        Step 2: Select Trigger
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
        props={{
          type: {
            choices: type,
          },
        }}
        defaultValues={values}
      ></StepperForm>
    </Stack>
  );
};
