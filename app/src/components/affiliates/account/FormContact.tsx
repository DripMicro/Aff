import type { AffiliateAccountType } from "../../../server/db-types";
import { Flex } from "@chakra-ui/react";
import type { z } from "zod";
import { Form } from "../../common/forms/Form";
import { schema } from "../../../shared-types/forms/contact";
import { imUserTypes } from "../../../shared-types/forms/common";
import { useTranslation } from "next-i18next";
import { usePrepareSchema } from "@/components/common/forms/usePrepareSchema";
import { useState } from "react";

interface Props {
  onSubmit: (values: z.infer<typeof schema>) => Promise<void>;
  account: AffiliateAccountType;
}

export const FormContact = ({ account, onSubmit }: Props) => {
  const { t } = useTranslation("affiliate");
  const formContext = usePrepareSchema(t, schema);
  const [showaccount, setShowaccount] = useState(false);
  const [accounts, setAccount] = useState("");

  const showAccount = () => {
    setShowaccount(!showaccount);
  };
  const handleChange = (value: string) => {
    setAccount(value);
  };
  const account_options = [
    { value: "account 1", label: "Account 1" },
    { value: "account 2", label: "Account 2" },
    { value: "account 3", label: "Account 3" },
    { value: "account 4", label: "Account 4" },
  ];

  return (
    <>
      <div className="w-full pt-5">
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label className="block text-gray-600 mb-1.5 ml-2.5 text-base  font-medium">
              Username
            </label>
            <input
              className=" border-1 px-3 py-4 placeholder-blueGray-300 text-blueGray-700 bg-white rounded shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150 text-base "
              id="grid-first-name"
              type="text"
              placeholder="Type here.."
            />
          </div>
          <div className="w-full md:w-1/2 px-3">
            <label className="block text-gray-600 mb-1.5 ml-2.5 text-base  font-medium">
              Salutation
            </label>
            <div className="relative w-full">
              <select
                className="border-1 px-3 py-4 placeholder-blueGray-300 text-blueGray-700 bg-white rounded shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150 text-base appearance-none"
                placeholder="Select "
                onClick={showAccount}
                onChange={(event) => {
                  if (event.target.value !== "custom") {
                    void handleChange(event.target.value);
                  }
                }}
              >
                <option value="Account 1">Account 1</option>
                <option value="Account 2">Account 2</option>
                <option value="Account 3">Account 3</option>
                <option value="account 4">Account 4</option>
              </select>

              <div className="absolute -mt-8 right-2 md:right-6 cursor-pointer ">
                <div className={" " + (showaccount ? " " : "rotate-180")}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="12"
                    height="8"
                    viewBox="0 0 12 8"
                    fill="none"
                  >
                    <path
                      d="M11.9999 5.70697L6.29294 -2.75885e-05L0.585938 5.70697L1.99994 7.12097L6.29294 2.82797L10.5859 7.12097L11.9999 5.70697Z"
                      fill="#828282"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label className="block text-gray-600 mb-1.5 ml-2.5 text-base  font-medium">
              First Name
            </label>
            <input
              className=" border-1 px-3 py-4 placeholder-blueGray-300 text-blueGray-700 bg-white rounded shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150 text-base "
              id="grid-first-name"
              type="text"
              placeholder="Type here.."
            />
          </div>
          <div className="w-full md:w-1/2 px-3">
            <label className="block text-gray-600 mb-1.5 ml-2.5 text-base  font-medium">
              Last Name
            </label>
            <input
              className="border-1 px-3 py-4 placeholder-blueGray-300 text-blueGray-700 bg-white rounded shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150 text-base "
              id="grid-last-name"
              type="text"
              placeholder="Type here.."
            />
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label className="block text-gray-600 mb-1.5 ml-2.5 text-base  font-medium">
              Email
            </label>
            <input
              className=" border-1 px-3 py-4 placeholder-blueGray-300 text-blueGray-700 bg-white rounded shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150 text-base "
              id="grid-first-name"
              type="text"
              placeholder="Type here.."
            />
          </div>
          <div className="w-full md:w-1/2 px-3">
            <label className="block text-gray-600 mb-1.5 ml-2.5 text-base  font-medium">
              Phone #
            </label>
            <input
              className=" border-1 px-3 py-4 placeholder-blueGray-300 text-blueGray-700 bg-white rounded shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150 text-base "
              id="grid-first-name"
              type="text"
              placeholder="Type here.."
            />
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label className="block text-gray-600 mb-1.5 ml-2.5 text-base  font-medium">
              Instant Messaging
            </label>
            <div className="relative w-full">
              <select
                className="border-1 px-3 py-4 placeholder-blueGray-300 text-blueGray-700 bg-white rounded shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150 text-base appearance-none"
                placeholder="Select "
                onClick={showAccount}
                onChange={(event) => {
                  if (event.target.value !== "custom") {
                    void handleChange(event.target.value);
                  }
                }}
              >
                <option value="Account 1">Account 1</option>
                <option value="Account 2">Account 2</option>
                <option value="Account 3">Account 3</option>
                <option value="account 4">Account 4</option>
              </select>

              <div className="absolute -mt-8 right-2 md:right-6 cursor-pointer ">
                <div className={" " + (showaccount ? " " : "rotate-180")}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="12"
                    height="8"
                    viewBox="0 0 12 8"
                    fill="none"
                  >
                    <path
                      d="M11.9999 5.70697L6.29294 -2.75885e-05L0.585938 5.70697L1.99994 7.12097L6.29294 2.82797L10.5859 7.12097L11.9999 5.70697Z"
                      fill="#828282"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full md:w-1/2 px-3">
            <label className="block text-gray-600 mb-1.5 ml-2.5 text-base  font-medium">
              Instant Messaging Account
            </label>
            <input
              className="border-1 px-3 py-4 placeholder-blueGray-300 text-blueGray-700 bg-white rounded shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150 text-base "
              id="grid-last-name"
              type="text"
              placeholder="Type here.."
            />
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3">
            <button className="md:w-36 w-full bg-[#1B48BB] mt-8 text-base  text-white font-medium  py-4 px-12 rounded-md">
              Save
            </button>
          </div>
        </div>
      </div>
    </>
    // <Form
    //   formContext={formContext}
    //   schema={schema}
    //   // eslint-disable-next-line @typescript-eslint/no-misused-promises
    //   onSubmit={onSubmit}
    //   defaultValues={account}
    // ></Form>
  );
};
