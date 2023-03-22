import { api } from "../../../utils/api";
import { FormSignUp } from "../../common/forms/FormSignUp";
import { Link } from "@chakra-ui/react";
import type { z } from "zod";
import { schema } from "../../../shared-types/forms/register";
import { imUserTypes } from "../../../shared-types/forms/common";

export const FormSignup = () => {
  const { data: languages } = api.misc.getLanguages.useQuery();

  const registerAccount = api.affiliates.registerAccount.useMutation();
  const handleSubmit = async (values: z.infer<typeof schema>) => {
    await registerAccount.mutateAsync(values);
  };

  return (
    <FormSignUp
      schema={schema}
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      formProps={{ submitButtonText: "Sign Up", submitNotification: false }}
      onSubmit={handleSubmit}
      props={{
        mail: {
          type: "email",
        },
        IMUserType: {
          choices: imUserTypes,
        },
        lang: {
          choices: languages,
        },
      }}
    />
  );
};
