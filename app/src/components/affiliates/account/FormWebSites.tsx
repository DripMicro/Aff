import type { AffiliateAccountType } from "../../../server/db-types";
import { Flex } from "@chakra-ui/react";
import { z } from "zod";
import { Form } from "../../common/forms/Form";
import { useTranslation } from "next-i18next";
import { usePrepareSchema } from "@/components/common/forms/usePrepareSchema";
import { Button } from "../../ui/button";

const Schema = z.object({
  website: z.string().url().optional().describe("WebSite 1"),
  website2: z.string().url().optional().describe("WebSite 2"),
  website3: z.string().url().optional().describe("WebSite 3"),
});

interface Props {
  onSubmit: (values: z.infer<typeof Schema>) => Promise<void>;
  account: AffiliateAccountType;
}

export const FormWebSites = ({ account, onSubmit }: Props) => {
  const { t } = useTranslation("affiliate");
  const formContext = usePrepareSchema(t, Schema);

  return (
    <Form
      formContext={formContext}
      schema={Schema}
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      onSubmit={onSubmit}
      defaultValues={account}
    ></Form>
  );
};
