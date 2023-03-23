import { createTsForm } from "../../libs/react-ts-form";
import { useState } from "react";
import { mapping } from "./mapping";
import type { FormEvent } from "react";
import React from "react";
import { Button, Stack, Link } from "@chakra-ui/react";
import { useSubmitAction } from "./useSubmitAction";
import { Image } from "@chakra-ui/react";
import type { CommonFormProps } from "@/components/common/forms/Form";

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

  return (
    <form onSubmit={handleSubmit} noValidate className="w-full md:w-[33rem]">
      <Stack>
        <div className="mt-20 mb-16 flex flex-col items-center text-4xl text-black md:mt-28 md:mb-24">
          Reset to Your
          <div className="flex items-center">
            <Image className="mt-2" src="/img/logo.png" width="28" alt="logo" />
            <span className="ml-3 text-black">account</span>
          </div>
        </div>

        <div className="pb-4">
          <label className="mb-1.5 ml-2.5 block text-base font-medium text-gray-600">
            Username
          </label>
          <input
            className="w-full rounded-md border py-4 px-3 text-base font-normal text-gray-700"
            id="username"
            type="text"
            placeholder="Type Here..."
          />
        </div>

        <div className="relative pb-14">
          <label className="mb-1.5 ml-2.5 block text-base font-medium text-gray-600">
            Password
          </label>
          <input
            className="w-full rounded-md border py-4 px-3 text-base font-normal text-gray-700"
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

        {/* TODO:MAX use Button control */}
        <button className="w-full rounded-md bg-[#2262C6] py-3 font-semibold text-white">
          {text || "SAVE"}
        </button>
      </Stack>
    </form>
  );
};

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export const FormLostPassword = createTsForm(mapping, {
  FormComponent: CommonForm,
});
