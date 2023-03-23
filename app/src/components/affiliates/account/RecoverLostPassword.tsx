import { Box, Flex, Image, Link, Stack, Text } from "@chakra-ui/react";
import { api } from "../../../utils/api";
import { FormLostPassword } from "../../common/forms/FormLostPassword";
import type { z } from "zod";
import { schema } from "../../../shared-types/forms/lost-password";
import { useTranslation } from "next-i18next";
import { usePrepareSchema } from "@/components/common/forms/usePrepareSchema";
import React from "react";
import { Form } from "@/components/common/forms/Form";

export const RecoverLostPassword = () => {
  const { t } = useTranslation("affiliate");
  const formContext = usePrepareSchema(t, schema);
  const mutation = api.affiliates.recoverPassword.useMutation();
  const handleSubmit = async (values: z.infer<typeof schema>) => {
    await mutation.mutateAsync(values);
  };

  return (
    <div>
      <div className="mt-20 mb-16 flex flex-col items-center text-4xl text-black md:mt-28 md:mb-24">
        Reset to Your
        <div className="flex items-center">
          <Image className="mt-2" src="/img/logo.png" width="28" alt="logo" />
          <span className="ml-3 text-black">account</span>
        </div>
      </div>
      <Form
        formContext={formContext}
        schema={schema}
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        onSubmit={handleSubmit}
        formProps={{
          submit: { text: "Reset Password", notification: false },
        }}
      />
    </div>
  );
};
