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
    <>
      <div className="w-full">
        <div className="mt-6 w-full pb-4 text-base md:w-1/2 md:text-sm">
          <label className="mb-1.5 ml-2.5 block text-base font-medium  text-gray-600">
            Website1
          </label>
          <input
            className="border-1 placeholder-blueGray-300 text-blueGray-700 w-full rounded bg-white px-3 py-4 text-base shadow transition-all duration-150 ease-linear focus:outline-none focus:ring"
            id="username"
            type="text"
            placeholder="Link..."
          />
        </div>
        <div className="mt-6 w-full pb-4 text-base md:w-1/2 md:text-sm">
          <label className="mb-1.5 ml-2.5 block text-base font-medium  text-gray-600">
            Website2
          </label>
          <input
            className="border-1 placeholder-blueGray-300 text-blueGray-700 w-full rounded bg-white px-3 py-4 text-base shadow transition-all duration-150 ease-linear focus:outline-none focus:ring"
            id="username"
            type="text"
            placeholder="Link..."
          />
        </div>
        <div className="mt-6 w-full pb-4 text-base md:w-1/2 md:text-sm">
          <label className="mb-1.5 ml-2.5 block text-base font-medium  text-gray-600">
            Website3
          </label>
          <input
            className="border-1 placeholder-blueGray-300 text-blueGray-700 w-full rounded bg-white px-3 py-4 text-base shadow transition-all duration-150 ease-linear focus:outline-none focus:ring"
            id="username"
            type="text"
            placeholder="Link..."
          />
        </div>
        <div className="-mx-3 mb-6 flex flex-wrap">
          <div className="w-full px-3">
            <Button variant="azure" size="lg" className="mt-8 px-12">
              Save
            </Button>
          </div>
        </div>
      </div>
    </>
    // <Form
    //   formContext={formContext}
    //   schema={Schema}
    //   // eslint-disable-next-line @typescript-eslint/no-misused-promises
    //   onSubmit={onSubmit}
    //   defaultValues={account}
    // ></Form>
  );
};
