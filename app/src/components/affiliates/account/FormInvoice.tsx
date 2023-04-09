import { usePrepareSchema } from "@/components/common/forms/usePrepareSchema";
import type { ChoiceType } from "@/utils/zod-meta";
import { useTranslation } from "next-i18next";
import type { z } from "zod";
import type { AffiliateAccountType } from "../../../server/db-types";
import { schema } from "../../../shared-types/forms/invoice";
import { Form } from "../../common/forms/Form";

interface Props {
  onSubmit: (values: z.infer<typeof schema>) => Promise<void>;
  account: AffiliateAccountType;
  countries: ChoiceType[];
}

export const FormInvoice = ({ account, onSubmit, countries }: Props) => {
  const { t } = useTranslation("affiliate");
  const formContext = usePrepareSchema(t, schema);
  return (
    <Form
      formContext={formContext}
      schema={schema}
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      onSubmit={onSubmit}
      props={{
        country: {
          choices: countries,
        },
      }}
      defaultValues={account}
    ></Form>
  );
};
