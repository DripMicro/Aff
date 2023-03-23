import { createTsForm } from "../../libs/react-ts-form";
import { useState } from "react";
import { mapping } from "./mapping";
import type { FormEvent } from "react";
import React from "react";
import { Button, Stack, Link } from "@chakra-ui/react";
import type { GridProps } from "@chakra-ui/layout/dist/grid";
import { useSubmitAction } from "./useSubmitAction";
import NextLink from "next/link";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/material.css";
import { FormControl, HStack } from "@chakra-ui/react";
import { Image } from "@chakra-ui/react";
import type { CommonFormProps } from "@/components/common/forms/Form";
// import Select from "react-tailwindcss-select";
// import { Select, Option } from "@material-tailwind/react";

const CommonForm = ({
  onSubmit,
  children,
  submit,
  className,
}: CommonFormProps) => {
  const {
    text,
    notification,
    className: buttonClassName,
  } = submit || {
    text: "Save",
    notification: false,
  };
  const { handleSubmit, isLoading } = useSubmitAction({
    onSubmit,
    notification,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [phone, setPhone] = useState("");
  const [showaccount, setShowaccount] = useState(false);
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [account, setAccount] = useState("");

  const handleOnChange = (value: string) => {
    console.log(value);
    setPhone(value);
  };

  const showAccount = () => {
    setShowaccount(!showaccount);
  };

  const account_options = [
    { value: "account 1", label: "Account 1" },
    { value: "account 2", label: "Account 2" },
    { value: "account 3", label: "Account 3" },
    { value: "account 4", label: "Account 4" },
  ];

  const handleChange = (value: string) => {
    setAccount(value);
  };

  return (
    <form
      onSubmit={(e: FormEvent) => {
        e.preventDefault();
        void handleSubmit(e);
      }}
      noValidate
      className="w-full md:w-[56rem]"
    >
      <Stack>
        {/* <FormLayout grid={grid}>{children}</FormLayout> */}
        {/* <Button
          className="w-full bg-[#4262C6]"
          minW={36}
          type="submit"
          variant="solid"
          isLoading={isLoading}
          alignSelf="start"
        >
          {submitButtonText ? submitButtonText : "SAVE"}
        </Button> */}

        <div className="mt-20 mb-16 flex flex-col items-center text-4xl text-black md:mt-28 md:mb-24">
          Register to Your
          <div className="flex items-center">
            <Image className="mt-2" src="/img/logo.png" width="28" alt="Logo" />
            <span className="ml-3 text-black">account</span>
          </div>
        </div>

        <div className="p-2">
          <label className="mb-1.5 ml-2.5 block text-base font-medium  text-gray-600">
            Username
          </label>
          <input
            className="placeholder-blueGray-300 text-blueGray-700 w-full rounded border bg-white px-3 py-4 text-base shadow transition-all duration-150 ease-linear focus:outline-none focus:ring"
            id="username"
            type="text"
            placeholder="Type Here..."
          />
        </div>

        <div className="md:flex">
          <div className="flex-1 p-2">
            <label className="mb-1.5 ml-2.5 block text-base font-medium  text-gray-600">
              First Name
            </label>
            <input
              className="placeholder-blueGray-300 text-blueGray-700 w-full rounded border bg-white px-3 py-4 text-base shadow transition-all duration-150 ease-linear focus:outline-none focus:ring"
              id="username"
              type="text"
              placeholder="Type Here..."
            />
          </div>

          <div className="flex-1 p-2">
            <label className="mb-1.5 ml-2.5 block text-base font-medium  text-gray-600">
              Last Name
            </label>
            <input
              className="placeholder-blueGray-300 text-blueGray-700 w-full rounded border bg-white px-3 py-4 text-base shadow transition-all duration-150 ease-linear focus:outline-none focus:ring"
              id="username"
              type="text"
              placeholder="Type Here..."
            />
          </div>
        </div>

        <div className="md:flex">
          <div className="flex-1 p-2">
            <label className="mb-1.5 ml-2.5 block text-base font-medium  text-gray-600">
              Email
            </label>
            <input
              className="placeholder-blueGray-300 text-blueGray-700 w-full rounded border bg-white px-3 py-4 text-base shadow transition-all duration-150 ease-linear focus:outline-none focus:ring"
              id="username"
              type="text"
              placeholder="Type Here..."
            />
          </div>

          <div className="flex-1 p-2">
            <label className="mb-1.5 ml-2.5 block text-base font-medium  text-gray-600">
              Confirm Email
            </label>
            <input
              className="placeholder-blueGray-300 text-blueGray-700 w-full rounded border bg-white px-3 py-4 text-base shadow transition-all duration-150 ease-linear focus:outline-none focus:ring"
              id="username"
              type="text"
              placeholder="Type Here..."
            />
          </div>
        </div>

        <div className="md:flex">
          <div className="relative flex-1 p-2">
            <label className="mb-1.5 ml-2.5 block text-base font-medium  text-gray-600">
              Password
            </label>
            <input
              className="placeholder-blueGray-300 text-blueGray-700 w-full rounded border bg-white px-3 py-4 text-base shadow transition-all duration-150 ease-linear focus:outline-none focus:ring"
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
          <div className="relative flex-1 p-2">
            <label className="mb-1.5 ml-2.5 block text-base font-medium  text-gray-600">
              Confirm Password
            </label>
            <input
              className="placeholder-blueGray-300 text-blueGray-2000 w-full rounded border bg-white px-3 py-4 text-base shadow transition-all duration-150 ease-linear focus:outline-none focus:ring"
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
        </div>

        <div className="md:flex">
          <div className="flex-1 p-2">
            <label className="mb-1.5  ml-2.5 block text-base  font-medium">
              Phone
            </label>
            <div className="shadow">
              <PhoneInput
                inputProps={{
                  name: "phone",
                  required: true,
                  autoFocus: true,
                }}
                inputStyle={{
                  width: "100%",
                  height: "57px",
                  borderColor: "#e2e8f0",
                }}
                specialLabel=""
                country={"us"}
                value={phone}
                onChange={handleOnChange}
              />
            </div>
          </div>
          <div className="flex-1 p-2">
            <label className="mb-1.5 ml-2.5 block text-base font-medium  text-gray-600">
              Account Type
            </label>

            <div className="flex">
              <div className="relative w-full">
                <select
                  className="flex w-full cursor-pointer appearance-none items-center space-x-2 rounded border border-[##e2e8f0] bg-white py-4 pl-6 text-base shadow"
                  placeholder="Select date range"
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

                <div className="absolute right-2 -mt-8 cursor-pointer md:right-6 ">
                  <div className={`${showaccount && "rotate-180"}`}>
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
        </div>

        <div className="md:flex">
          <div className="flex-1 p-2">
            <label className="mb-1.5 ml-2.5 block text-base font-medium  text-gray-600">
              Skype username
            </label>
            <input
              className="placeholder-blueGray-300 text-blueGray-700 w-full rounded border bg-white px-3 py-4 text-base shadow transition-all duration-150 ease-linear focus:outline-none focus:ring"
              id="skype"
              type="text"
              placeholder="Type Here..."
            />
          </div>

          <div className="flex-1 p-2">
            <label className="mb-1.5 ml-2.5 block text-base font-medium  text-gray-600">
              Telegram username
            </label>
            <input
              className="placeholder-blueGray-300 text-blueGray-700 w-full rounded border bg-white px-3 py-4 text-base shadow transition-all duration-150 ease-linear focus:outline-none focus:ring"
              id="telegram"
              type="text"
              placeholder="Type Here..."
            />
          </div>
        </div>

        <div className="md:flex">
          <div className="flex-1 p-2">
            <label className="mb-1.5 ml-2.5 block text-base font-medium  text-gray-600">
              Website(Optional)
            </label>
            <input
              className="placeholder-blueGray-300 text-blueGray-700 w-full rounded border bg-white px-3 py-4 text-base shadow transition-all duration-150 ease-linear focus:outline-none focus:ring"
              id="website"
              type="text"
              placeholder="Type Here..."
            />
          </div>

          <div className="flex-1 p-2">
            <label className="mb-1.5 ml-2.5 block text-base font-medium  text-gray-600">
              Other Traffic Sources(Optional)
            </label>
            <input
              className="placeholder-blueGray-300 text-blueGray-700 w-full rounded border bg-white px-3 py-4 text-base shadow transition-all duration-150 ease-linear focus:outline-none focus:ring"
              id="traffic"
              type="text"
              placeholder="Type Here..."
            />
          </div>
        </div>
        <div>
          <label className="inline-flex cursor-pointer items-center">
            <input
              id="customCheckLogin"
              type="checkbox"
              className="form-checkbox text-blueGray-700 ml-2 h-5 w-5 rounded border transition-all duration-150 ease-linear"
            />
            <span className="text-blueGray-600 ml-2 text-sm font-semibold">
              I agree with the{" "}
              <Link as={NextLink} href="/affiliates/signin">
                <span className="text-sm text-[#2262C6] ">
                  Terms & Condition
                </span>
              </Link>
            </span>
          </label>
        </div>

        <div className="pt-3 text-center md:pt-10">
          <button className="w-full rounded-md bg-[#2262C6] py-3 font-semibold text-white md:w-6/12">
            {text || "SAVE"}
          </button>
        </div>

        <div className="pt-6 text-center text-sm md:pt-14 md:text-xl">
          Do you have an account?
          <Link as={NextLink} href="/affiliates/signin">
            <span className="pl-2 text-sm font-bold text-[#2262C6] md:text-xl">
              Sign In
            </span>
          </Link>
        </div>
      </Stack>
    </form>
  );
};

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export const FormSignUp = createTsForm(mapping, {
  FormComponent: CommonForm,
});
