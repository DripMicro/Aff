import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "../../ui/dialog";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../ui/select";

import { Code2Icon, Copy } from "lucide-react";
import { Button } from "../../ui/button";

interface Props {
  values: valueProps[];
  file?: string;
  alt: string;
  url: string;
}

interface valueProps {
  title: string;
  value: string | undefined;
}

export const CreativeMaterialComponent = ({
  values,
  file,
  alt,
  url,
}: Props) => {
  return (
    <div className=" mb-5 rounded-xl bg-white p-4 shadow">
      <div className="mt-4 flex items-start">
        <div className="w-32 rounded-xl md:w-96">
          <img src={file} className="rounded-xl bg-cover" alt={alt} />
        </div>
        <Dialog>
          <div className="ml-5 w-full rounded-xl">
            <div className=" bg-[#F5F8FA] p-4 md:px-8">
              <div className="justify-between md:flex">
                <div className="">
                  <div className=" text-sm font-medium text-[#717171]">
                    {values[0]?.title}
                  </div>
                  <div className="text-sm font-medium md:mt-3 md:text-lg">
                    {values[0]?.value}
                  </div>
                </div>
                <div className="mt-2 flex justify-between md:block">
                  <div>
                    <div className=" text-sm font-medium text-[#717171]">
                      {values[1]?.title}
                    </div>
                    <div className="text-sm font-medium md:mt-3 md:text-lg">
                      {values[1]?.value}
                    </div>
                  </div>
                  <div className="md:hidden">
                    <div className=" text-sm font-medium text-[#717171]">
                      {values[2]?.title}
                    </div>
                    <div className=" text-sm text-[#353535] md:text-lg">
                      {values[2]?.value}
                    </div>
                  </div>
                </div>
              </div>
              <div className="justify-between pt-1 md:flex md:pt-12 ">
                <div className="mt-2 hidden md:block">
                  <div className=" text-sm font-medium text-[#717171]">
                    {values[2]?.title}
                  </div>
                  <div className=" text-sm text-[#353535] md:text-lg">
                    {values[2]?.value}
                  </div>
                </div>
                <div className="mt-2">
                  <div className=" text-sm font-medium text-[#717171]">
                    {values[3]?.title}
                  </div>
                  <div className=" text-sm text-[#353535] md:text-lg">
                    {values[3]?.value}
                  </div>
                </div>
                <div className="mt-2 flex justify-between md:block">
                  <div>
                    <div className=" text-sm font-medium text-[#717171]">
                      {values[4]?.title}
                    </div>
                    <div className=" text-sm text-[#353535] md:text-lg">
                      {values[4]?.value}
                    </div>
                  </div>
                  <div className="md:hidden">
                    <div className=" text-sm font-medium text-[#717171]">
                      Language
                    </div>
                    <div className=" text-sm text-[#353535] md:text-lg">
                      English
                    </div>
                  </div>
                </div>
                <div className="mt-2 hidden md:block">
                  <div className=" text-sm font-medium text-[#717171]">
                    Language
                  </div>
                  <div className=" text-sm text-[#353535] md:text-lg">
                    English
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-1 hidden items-end justify-between md:mt-3 md:block lg:block xl:flex">
              <div className="">
                <div className="mb-1 ml-2 text-xs font-medium text-[#525252]">
                  Click URL
                </div>
                <div className="rounded border border-[#D7D7D7] bg-[#F9F9FF] py-2 px-3 text-sm font-medium text-[#666666] xl:w-60 2xl:w-96">
                  {url}
                </div>
              </div>
              <div className="mt-5 flex items-end justify-center md:justify-end">
                <div className="">
                  <div className="">
                    <Button variant="azure">
                      <div className="text-white">Copy Click Url</div>
                      <div className="ml-2 items-center">
                        <Copy className="text-white" />
                      </div>
                    </Button>
                  </div>
                </div>
                <div className="ml-2">
                  <div className="">
                    <DialogTrigger>
                      <Button variant="azure-outline">
                        Get HTML Code
                        <div className="ml-2 items-center">
                          <Code2Icon className="text-[#282560]" />
                        </div>
                      </Button>
                    </DialogTrigger>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <DialogContent>
            <DialogHeader className="text-left text-lg font-medium text-azure">
              HTML Code
            </DialogHeader>
            <form className="w-full pt-5">
              <div className="mb-6 justify-between md:flex md:space-x-4">
                <div className="mb-3 w-full md:w-1/2">
                  <label
                    className="mb-2 block  pl-3 text-sm font-medium tracking-wide text-[#525252]"
                    htmlFor="grid-first-name"
                  >
                    Profile
                  </label>
                  <div className="flex">
                    <div className=" relative flex w-full items-center ">
                      <Select defaultValue={"1"}>
                        <SelectTrigger className="border px-4 py-3  text-xs ">
                          <SelectValue placeholder="Select days" />
                        </SelectTrigger>
                        <SelectContent className="border text-xs">
                          <SelectGroup>
                            <SelectItem value={"1"}>Account 1</SelectItem>
                            <SelectItem value={"2"}>Account 2</SelectItem>
                            <SelectItem value={"3"}>Account 3</SelectItem>
                            <SelectItem value={"4"}>Account 4</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                      <Button variant="primary" className="ml-2" size="rec">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          fill="none"
                        >
                          <path
                            d="M15.3 8.82H8.91V15.3H6.36V8.82H0V6.51H6.36V0H8.91V6.51H15.3V8.82Z"
                            fill="white"
                          />
                        </svg>
                      </Button>
                    </div>
                  </div>
                </div>
                <div className="w-full md:w-1/2">
                  <label
                    className="mb-2 block pl-3 text-sm font-medium tracking-wide text-[#525252]"
                    htmlFor="grid-first-name"
                  >
                    Dynamic Parameter
                  </label>
                  <div className="flex">
                    <div className=" relative flex w-full items-center ">
                      <Select defaultValue={"1"}>
                        <SelectTrigger className="border px-4 py-3  text-xs ">
                          <SelectValue placeholder="Select days" />
                        </SelectTrigger>
                        <SelectContent className="border text-xs">
                          <SelectGroup>
                            <SelectItem value={"1"}>Account 1</SelectItem>
                            <SelectItem value={"2"}>Account 2</SelectItem>
                            <SelectItem value={"3"}>Account 3</SelectItem>
                            <SelectItem value={"4"}>Account 4</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                      <Button variant="primary" className="ml-2" size="rec">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          fill="none"
                        >
                          <path
                            d="M15.3 8.82H8.91V15.3H6.36V8.82H0V6.51H6.36V0H8.91V6.51H15.3V8.82Z"
                            fill="white"
                          />
                        </svg>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="-mx-3 mb-6 flex flex-wrap">
                <div className="w-full px-3">
                  <textarea
                    className="border-#D7D7D7 mb-3 h-48 w-full rounded-3xl border bg-[#F0F9FF] py-3 px-4 text-base font-medium text-[#1B48BB]"
                    value='<div class="container"> 
                                                        <img src="img_5terre_wide.jpg" alt="Cinque Terre" width="1000" height="300">
                                                        <div class="topleft">Top Left</div>
                                                      </div>'
                    id="grid-textarea"
                  />
                </div>
              </div>
            </form>
            <div className="justify-between px-2 pl-8 pb-6 md:flex">
              <div className="mb-2 flex justify-between md:block">
                <div className="rounded ">
                  <Button variant="azure" size="md">
                    Get Code
                  </Button>
                </div>
                <div className="rounded md:hidden">
                  <Button variant="azure" size="md">
                    <div className="text-base text-white">Copy Click Url</div>
                    <div className="ml-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="15"
                        height="15"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <path
                          d="M20 2H8C6.897 2 6 2.897 6 4V16C6 17.103 6.897 18 8 18H20C21.103 18 22 17.103 22 16V4C22 2.897 21.103 2 20 2ZM8 16V4H20L20.002 16H8Z"
                          fill="white"
                        />
                        <path
                          d="M4 8H2V20C2 21.103 2.897 22 4 22H16V20H4V8Z"
                          fill="white"
                        />
                      </svg>
                    </div>
                  </Button>
                </div>
              </div>
              <div className="flex justify-between md:justify-center md:space-x-2">
                <div className="hidden rounded md:block">
                  <div className="rounded">
                    <Button variant="azure" size="md">
                      <div className="text-base text-white md:font-medium">
                        Copy Click Url
                      </div>
                      <div className="ml-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="15"
                          height="15"
                          viewBox="0 0 24 24"
                          fill="none"
                        >
                          <path
                            d="M20 2H8C6.897 2 6 2.897 6 4V16C6 17.103 6.897 18 8 18H20C21.103 18 22 17.103 22 16V4C22 2.897 21.103 2 20 2ZM8 16V4H20L20.002 16H8Z"
                            fill="white"
                          />
                          <path
                            d="M4 8H2V20C2 21.103 2.897 22 4 22H16V20H4V8Z"
                            fill="white"
                          />
                        </svg>
                      </div>
                    </Button>
                  </div>
                </div>
                <div className=" rounded">
                  <div className="">
                    <Button variant="azure-outline" size="md">
                      Get HTML Code
                      <div className="ml-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="18"
                          height="18"
                          viewBox="0 0 20 20"
                          fill="none"
                        >
                          <path
                            d="M5.37498 14.781L6.62498 13.219L2.60098 9.99998L6.62498 6.78098L5.37498 5.21898L0.374981 9.21898C0.257826 9.31267 0.163249 9.4315 0.098254 9.5667C0.033259 9.70189 -0.000488281 9.84998 -0.000488281 9.99998C-0.000488281 10.15 0.033259 10.2981 0.098254 10.4333C0.163249 10.5685 0.257826 10.6873 0.374981 10.781L5.37498 14.781ZM14.625 5.21898L13.375 6.78098L17.399 9.99998L13.375 13.219L14.625 14.781L19.625 10.781C19.7421 10.6873 19.8367 10.5685 19.9017 10.4333C19.9667 10.2981 20.0005 10.15 20.0005 9.99998C20.0005 9.84998 19.9667 9.70189 19.9017 9.5667C19.8367 9.4315 19.7421 9.31267 19.625 9.21898L14.625 5.21898ZM12.976 1.21598L8.97598 19.216L7.02298 18.782L11.023 0.781982L12.976 1.21598Z"
                            fill="#282560"
                          />
                        </svg>
                      </div>
                    </Button>
                  </div>
                </div>

                <div className=" rounded">
                  <div className="">
                    <Button variant="azure" size="md">
                      Download Image
                      <div className="ml-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="15"
                          height="15"
                          viewBox="0 0 15 15"
                          fill="none"
                        >
                          <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M13.5938 0H1.40625C1.03329 0 0.675604 0.148158 0.411881 0.411881C0.148158 0.675604 0 1.03329 0 1.40625L0 13.5938C0 13.9667 0.148158 14.3244 0.411881 14.5881C0.675604 14.8518 1.03329 15 1.40625 15H13.5938C13.9667 15 14.3244 14.8518 14.5881 14.5881C14.8518 14.3244 15 13.9667 15 13.5938V1.40625C15 1.03329 14.8518 0.675604 14.5881 0.411881C14.3244 0.148158 13.9667 0 13.5938 0ZM14.0625 9.1825L12.0512 7.17188C11.9634 7.08467 11.8447 7.03572 11.7209 7.03572C11.5972 7.03572 11.4784 7.08467 11.3906 7.17188L8.90625 9.65125L5.9575 6.70312C5.86969 6.61592 5.75095 6.56697 5.62719 6.56697C5.50343 6.56697 5.38469 6.61592 5.29688 6.70312L0.9375 11.0575V1.40625C0.9375 1.28193 0.986886 1.1627 1.07479 1.07479C1.1627 0.986886 1.28193 0.9375 1.40625 0.9375H13.5938C13.7181 0.9375 13.8373 0.986886 13.9252 1.07479C14.0131 1.1627 14.0625 1.28193 14.0625 1.40625V9.1825Z"
                            fill="white"
                          />
                        </svg>
                      </div>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
      <div className="mt-1 items-end md:mt-3 md:hidden">
        <div className="">
          <div className="mb-1 ml-2 text-xs font-medium text-[#525252]">
            Click URL
          </div>
          <div className="rounded border border-[#D7D7D7] bg-[#F9F9FF] py-2 px-3 text-sm font-medium text-[#666666] lg:w-96">
            {url}
          </div>
        </div>
        <div className="mt-5 flex items-end justify-center md:justify-end">
          <div className="">
            <div className="">
              <Button variant="azure" size="md">
                <div className="text-white">Copy Click Url</div>
                <div className="ml-2 items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path
                      d="M20 2H8C6.897 2 6 2.897 6 4V16C6 17.103 6.897 18 8 18H20C21.103 18 22 17.103 22 16V4C22 2.897 21.103 2 20 2ZM8 16V4H20L20.002 16H8Z"
                      fill="white"
                    />
                    <path
                      d="M4 8H2V20C2 21.103 2.897 22 4 22H16V20H4V8Z"
                      fill="white"
                    />
                  </svg>
                </div>
              </Button>
            </div>
          </div>
          <div className="ml-2">
            <div className="">
              <Button variant="azure-outline" size="md">
                Get HTML Code
                <div className="ml-2 items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 22 22"
                    fill="none"
                  >
                    <path
                      d="M5.37498 14.781L6.62498 13.219L2.60098 9.99998L6.62498 6.78098L5.37498 5.21898L0.374981 9.21898C0.257826 9.31267 0.163249 9.4315 0.098254 9.5667C0.033259 9.70189 -0.000488281 9.84998 -0.000488281 9.99998C-0.000488281 10.15 0.033259 10.2981 0.098254 10.4333C0.163249 10.5685 0.257826 10.6873 0.374981 10.781L5.37498 14.781ZM14.625 5.21898L13.375 6.78098L17.399 9.99998L13.375 13.219L14.625 14.781L19.625 10.781C19.7421 10.6873 19.8367 10.5685 19.9017 10.4333C19.9667 10.2981 20.0005 10.15 20.0005 9.99998C20.0005 9.84998 19.9667 9.70189 19.9017 9.5667C19.8367 9.4315 19.7421 9.31267 19.625 9.21898L14.625 5.21898ZM12.976 1.21598L8.97598 19.216L7.02298 18.782L11.023 0.781982L12.976 1.21598Z"
                      fill="#282560"
                    />
                  </svg>
                </div>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
