import type { AffiliateAccountType } from "../../../server/db-types";
import { Flex } from "@chakra-ui/react";
import { z } from "zod";
import { Form } from "../../common/forms/Form";
import { useTranslation } from "next-i18next";
import { usePrepareSchema } from "@/components/common/forms/usePrepareSchema";

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
        <div className="pb-4 mt-6 w-full md:w-1/2 text-base md:text-sm">
          <label className="block text-gray-600 mb-1.5 ml-2.5 text-base  font-medium">
            Website1
          </label>
          <input
            className="border-1 px-3 py-4 placeholder-blueGray-300 text-blueGray-700 bg-white rounded shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150 text-base"
            id="username"
            type="text"
            placeholder="Link..."
          />
        </div>
        <div className="pb-4 mt-6 w-full md:w-1/2 text-base md:text-sm">
          <label className="block text-gray-600 mb-1.5 ml-2.5 text-base  font-medium">
            Website2
          </label>
          <input
            className="border-1 px-3 py-4 placeholder-blueGray-300 text-blueGray-700 bg-white rounded shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150 text-base"
            id="username"
            type="text"
            placeholder="Link..."
          />
        </div>
        <div className="pb-4 mt-6 w-full md:w-1/2 text-base md:text-sm">
          <label className="block text-gray-600 mb-1.5 ml-2.5 text-base  font-medium">
            Website3
          </label>
          <input
            className="border-1 px-3 py-4 placeholder-blueGray-300 text-blueGray-700 bg-white rounded shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150 text-base"
            id="username"
            type="text"
            placeholder="Link..."
          />
        </div>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3">
            <button className="md:w-36 w-full bg-[#1B48BB] mt-8 text-base  text-white font-medium  py-3 px-12 rounded-md">
              Save
            </button>
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
