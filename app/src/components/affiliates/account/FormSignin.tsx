import { Box, Flex, Link, Stack, Text } from "@chakra-ui/react";
import { Form } from "../../common/forms/Form";
import type { z } from "zod";
import { schema } from "../../../shared-types/forms/login";
import { signIn, useSession } from "next-auth/react";
import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from "@chakra-ui/react";
import { useState } from "react";
import NextLink from "next/link";
import { useTranslation } from "next-i18next";
import { usePrepareSchema } from "@/components/common/forms/usePrepareSchema";

// Sample user
// user001
// password user1

export const FormSignin = () => {
  const { t } = useTranslation("affiliate");
  const formContext = usePrepareSchema(t, schema);
  const [loginError, setLoginError] = useState<string | null>(null);
  const { data: session } = useSession();

  const handleSubmit = async (values: z.infer<typeof schema>) => {
    const callbackUrl = "/";
    setLoginError(null);

    const answer = await signIn("credentials", {
      username: values.username,
      password: values.password,
      redirect: false,
      callbackUrl,
    });

    console.log(`muly:handleSubmit`, { answer });

    if (answer && !answer.ok && answer.error) {
      console.error(`authorize ERROR: ${answer.error}`);
      setLoginError(answer.error);
    }
  };

  console.log(`muly:FormSignin`, { session });

  return (
    <>
      <Form
        formContext={formContext}
        schema={schema}
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        onSubmit={handleSubmit}
        // TODO:muly move to meta
        formProps={{ submit: { text: "Sign In", notification: false } }}
      ></Form>

      {!!loginError && (
        <Alert status="error">
          <AlertIcon />
          {loginError}
        </Alert>
      )}
    </>
  );
};
