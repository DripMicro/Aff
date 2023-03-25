import type { AffiliateAccountType } from "../../../server/db-types";
import { Flex } from "@chakra-ui/react";
import type { z } from "zod";
import { Form } from "../../common/forms/Form";
import { schema } from "../../../shared-types/forms/contact";
import { imUserTypes } from "../../../shared-types/forms/common";
import { useTranslation } from "next-i18next";
import { usePrepareSchema } from "@/components/common/forms/usePrepareSchema";

interface Props {
  onSubmit: (values: z.infer<typeof schema>) => Promise<void>;
  account: AffiliateAccountType;
}

export const FormContact = ({ account, onSubmit }: Props) => {
  const { t } = useTranslation("affiliate");
  const formContext = usePrepareSchema(t, schema);

  return (
    <Form
      formContext={formContext}
      schema={schema}
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      onSubmit={onSubmit}
      defaultValues={account}
    ></Form>
  );
};
