import { usePrepareSchema } from "@/components/common/forms/usePrepareSchema";
import { t } from "../../../../.storybook/stories-utils";
import { Form } from "@/components/common/forms/Form";

export const FormTest = (args: any) => {
  console.log(`muly:FormTest`, { args });
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
