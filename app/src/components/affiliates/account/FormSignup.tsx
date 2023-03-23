import { api } from "../../../utils/api";
import { FormSignUp } from "../../common/forms/FormSignUp";
import type { z } from "zod";
import { schema } from "../../../shared-types/forms/register";
import { useTranslation } from "next-i18next";
import { usePrepareSchema } from "@/components/common/forms/usePrepareSchema";

export const FormSignup = () => {
  const { t } = useTranslation("affiliate");
  const formContext = usePrepareSchema(t, schema);
  const { data: languages } = api.misc.getLanguages.useQuery();

  const registerAccount = api.affiliates.registerAccount.useMutation();
  const handleSubmit = async (values: z.infer<typeof schema>) => {
    await registerAccount.mutateAsync(values);
  };

  return (
    <FormSignUp
      formContext={formContext}
      schema={schema}
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      formProps={{ submit: { text: "Sign Up", notification: false } }}
      onSubmit={handleSubmit}
      props={{
        lang: {
          choices: languages,
        },
      }}
    />
  );
};
