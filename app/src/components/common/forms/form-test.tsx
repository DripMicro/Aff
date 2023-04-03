import { usePrepareSchema } from "@/components/common/forms/usePrepareSchema";
import { Form } from "@/components/common/forms/Form";
import { useTranslation } from "next-i18next";

const FormTestComponent = (args: any) => {
  const { t } = useTranslation("affiliate");
  const formContext = usePrepareSchema(t, args.schema);

  const onSubmit = (values: any) => {
    console.log(`muly:onSubmit`, { values });
  };

  return (
    <Form
      formContext={formContext}
      schema={args.schema}
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      onSubmit={onSubmit}
      props={{}}
      formProps={{
        submit: {
          notification: false,
          text: "Next",
        },
      }}
    ></Form>
  );
};

export const FormTest = {
  render: (args: any) => <FormTestComponent {...args} />,
};
