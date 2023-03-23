import { Box, Flex, Link, Stack, Text } from "@chakra-ui/react";
import { api } from "../../../utils/api";
import { FormLostPassword } from "../../common/forms/FormLostPassword";
import type { z } from "zod";
import { schema } from "../../../shared-types/forms/lost-password";
import { useTranslation } from "next-i18next";
import { usePrepareSchema } from "@/components/common/forms/usePrepareSchema";

export const RecoverLostPassword = () => {
  const { t } = useTranslation("affiliate");
  const formContext = usePrepareSchema(t, schema);
  const mutation = api.affiliates.recoverPassword.useMutation();
  const handleSubmit = async (values: z.infer<typeof schema>) => {
    await mutation.mutateAsync(values);
  };

  return (
    <FormLostPassword
      formContext={formContext}
      schema={schema}
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      onSubmit={handleSubmit}
      formProps={{
        submit: { text: "Reset Password", notification: false },
      }}
    />
  );
};
