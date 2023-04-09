import { Flex } from "@chakra-ui/react";
import { api } from "../../../utils/api";
import { Form } from "../../common/forms/Form";
import type { z } from "zod";
import { schema } from "../../../shared-types/forms/payment-details";
import { usePrepareSchema } from "@/components/common/forms/usePrepareSchema";
import { useTranslation } from "next-i18next";

export const AccountPaymentDetails = () => {
  const { t } = useTranslation("affiliate");
  const { data: account, refetch } = api.affiliates.getAccount.useQuery();
  const { data: countries } = api.misc.getCountries.useQuery();
  const updateAccount = api.affiliates.updateAccount.useMutation();
  const formContext = usePrepareSchema(t, schema);

  if (!account) {
    return null;
  }

  const handleSubmit = async (values: z.infer<typeof schema>) => {
    await updateAccount.mutateAsync(values);
    await refetch();
  };

  return (
    <Flex direction="column" gap={2} maxW="4xl" width="100%" m="auto">
      <Form
        formContext={formContext}
        schema={schema}
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        onSubmit={handleSubmit}
        defaultValues={account}
        formProps={{}}
        props={{
          preferredCurrency: {
            choices: ["TBD"],
          },
        }}
      ></Form>
    </Flex>
  );
};
