import type { AffiliateAccountType } from "../../../server/db-types";
import type { z } from "zod";
import { Form } from "../../common/forms/Form";
import { schema } from "../../../shared-types/forms/account";
import { useTranslation } from "next-i18next";
import { usePrepareSchema } from "@/components/common/forms/usePrepareSchema";
import { useState } from "react";

interface Props {
  onSubmit: (values: z.infer<typeof schema>) => Promise<void>;
  account: AffiliateAccountType;
}

export const FormAccount = ({ account, onSubmit }: Props) => {
  const { t } = useTranslation("affiliate");
  const formContext = usePrepareSchema(t, schema);
  const [showPassword, setShowPassword] = useState(false);

  return (
    <>
      <div className="w-full">
        <div className="mt-6 w-full pb-4 text-base md:w-1/2 md:text-sm">
          <label className="mb-1.5 ml-2.5 block text-base font-medium  text-gray-600">
            Username
          </label>
          <input
            className="border-1 placeholder-blueGray-300 text-blueGray-700 w-full rounded bg-white px-3 py-4 text-base shadow transition-all duration-150 ease-linear focus:outline-none focus:ring"
            id="username"
            type="text"
            placeholder="Type Here..."
          />
        </div>
        <div className="relative w-full pb-2.5 pt-5  text-base md:w-1/2 md:text-sm">
          <label className="mb-1.5 ml-2.5 block text-base font-medium  text-gray-600">
            Password
          </label>
          <input
            className="border-1 placeholder-blueGray-300 text-blueGray-700 w-full rounded bg-white px-3 py-4 text-base shadow transition-all duration-150 ease-linear focus:outline-none focus:ring"
            id="username"
            type={showPassword ? "text" : "password"}
            placeholder="Type Here..."
          />
          <label
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 mt-4 cursor-pointer "
            htmlFor="toggle"
          >
            {showPassword ? (
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                ></path>
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                ></path>
              </svg>
            ) : (
              <svg
                className="h-6 w-6 opacity-60"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                ></path>
              </svg>
            )}
          </label>
        </div>

        <div className="relative w-full  pb-2.5 pt-5 text-base md:w-1/2 md:text-sm">
          <label className="mb-1.5 ml-2.5 block text-base font-medium  text-gray-600">
            Repeat Password
          </label>
          <input
            className="border-1 placeholder-blueGray-300 text-blueGray-700 w-full rounded bg-white px-3 py-4 text-base shadow transition-all duration-150 ease-linear focus:outline-none focus:ring"
            id="username"
            type={showPassword ? "text" : "password"}
            placeholder="Type Here..."
          />
          <label
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 mt-4 cursor-pointer "
            htmlFor="toggle"
          >
            {showPassword ? (
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                ></path>
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                ></path>
              </svg>
            ) : (
              <svg
                className="h-6 w-6 opacity-60"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                ></path>
              </svg>
            )}
          </label>
        </div>

        <div className="flex items-start space-x-2 py-6 text-sm">
          <input type="checkbox" className="h-5 w-5 rounded border-gray-300" />
          <label className="mt-1 font-medium leading-none text-gray-700">
            Yes, I would like to receive the Affiliate newsletter
          </label>
        </div>

        <div className="-mx-3 mb-6 flex flex-wrap">
          <div className="w-full px-3">
            <button className="mt-8 w-full rounded-md bg-[#1B48BB] py-4  px-12 text-base  font-medium text-white md:w-36">
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
