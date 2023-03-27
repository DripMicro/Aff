import Affiliates from "../../../layouts/AffiliatesLayout";
import {
  Image,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import SupportComponent from "./supportComponent";
import SupportTableComponent from "./supportTableComponent";
import { useState } from "react";

const Support = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [flag, setFlag] = useState(false);
  console.log(flag);
  const data = [
    {
      title: "New minimum withdrawal amount for stablecoins",
      time: "2023-07-02 17:21:04",
      content:
        "Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. demonstrate the visual form of a document or a typeface without relying on meaningful content. demonstrate the visual form of a document or a typeface without relying on meaningful content.",
    },
    {
      title: "New minimum withdrawal amount for stablecoins",
      time: "2023-07-02 17:21:04",
      content:
        "Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. demonstrate the visual form of a document or a typeface without relying on meaningful content. demonstrate the visual form of a document or a typeface without relying on meaningful content.",
    },
    {
      title: "New minimum withdrawal amount for stablecoins",
      time: "2023-07-02 17:21:04",
      content:
        "Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. demonstrate the visual form of a document or a typeface without relying on meaningful content. demonstrate the visual form of a document or a typeface without relying on meaningful content.",
    },
  ];

  return (
    <div className="pt-5 pb-4">
      <div className=" mb-5 block text-base font-medium">
        <span className="text-[#2262C6]">Dashboard</span> - Support
        <div className="container mt-3">
          <div className="items-center justify-between text-center text-white md:flex md:text-left">
            <div className="mb-4 flex flex-wrap items-center justify-start md:mb-0 md:justify-start">
              <div className="relative flex items-center justify-between">
                <input
                  type="search"
                  id="search"
                  className=" h-10 rounded pl-4 text-sm placeholder:text-xs
                                  placeholder:font-medium placeholder:text-[#666666] md:w-80"
                  placeholder="Search Merchant.."
                  required
                />
                <svg
                  aria-hidden="true"
                  className="-ml-10 h-5  w-5 text-[#B3B3B3] dark:text-gray-400 "
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  ></path>
                </svg>
              </div>
            </div>
            <div className="flex items-center justify-end text-xs font-medium text-gray-700 transition duration-150 ease-in-out">
              <button
                type="submit"
                onClick={() => setFlag(!flag)}
                className="h-10 rounded-lg bg-[#2262C6] px-4 py-2 text-sm font-medium  text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                FAQ
              </button>

              <button
                type="submit"
                className=" ml-2 h-10 rounded-lg bg-[#2262C6] px-4 py-2 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                onClick={onOpen}
              >
                Add new Ticket
              </button>

              <Modal isOpen={isOpen} size="3xl" onClose={onClose} isCentered>
                <ModalOverlay />
                <ModalContent ml={4} mr={4}>
                  <div className="flex items-end  justify-between pl-5 pt-4 md:pl-6">
                    <div className=" text-sm font-medium text-[#282560] md:text-xl">
                      Open New Ticket
                    </div>
                    <Image
                      alt="..."
                      className="mr-4 h-10 w-10 rounded-full align-middle "
                      src="/img/icons/close.png"
                      onClick={onClose}
                    />
                  </div>
                  <ModalBody>
                    <form className="w-full pt-5">
                      <div className="-mx-3 mb-6 flex flex-wrap">
                        <div className="mb-6 w-full px-3 md:mb-0 md:w-1/2">
                          <label
                            className="mb-2 block  pl-4 text-sm font-medium tracking-wide text-[#525252] md:text-base"
                            htmlFor="grid-first-name"
                          >
                            Ticket Subject
                          </label>
                          <input
                            className=" border-#D7D7D7 mb-3 w-full rounded-md border py-3 px-4 text-[#525252] placeholder:text-[#D7D7D7] "
                            id="grid-first-name"
                            type="text"
                            placeholder="Type here.."
                          />
                        </div>
                        <div className="-mt-5 w-full px-3 md:mt-0 md:w-1/2">
                          <label
                            className="mb-2 block  pl-4 text-sm font-medium tracking-wide text-[#525252] md:text-base"
                            htmlFor="grid-last-name"
                          >
                            Your Email
                          </label>
                          <input
                            className="border-#D7D7D7  mb-3 w-full rounded-md border py-3 px-4 text-[#525252] placeholder:text-[#D7D7D7] "
                            id="grid-last-name"
                            type="text"
                            placeholder="Type here.."
                          />
                        </div>
                      </div>
                      <div className="-mx-3 -mt-4 mb-3 flex flex-wrap md:-mt-5 ">
                        <div className="w-full px-3">
                          <label
                            className="mb-2 block  pl-4 text-sm font-medium tracking-wide text-[#525252] md:text-base"
                            htmlFor="grid-password"
                          >
                            Ticket Subject
                          </label>
                          <textarea className="border-#D7D7D7 mb-3 h-32 w-full rounded-md border py-2 px-4 text-[#525252] md:h-40 " />
                        </div>
                      </div>
                    </form>
                  </ModalBody>
                  <div className="mb-12 flex flex-wrap pl-5 font-medium  md:px-80">
                    <button
                      type="submit"
                      className="h-12  rounded  bg-[#1B48BB] px-5 text-sm font-medium text-white
                             hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700
                              dark:focus:ring-blue-800 "
                      onClick={onClose}
                    >
                      Send Ticket
                    </button>
                  </div>
                </ModalContent>
              </Modal>
            </div>
          </div>
        </div>
      </div>
      {flag ? (
        <div className="h-auto rounded-md bg-white  px-2 pt-5 pb-4 shadow-md md:mb-10 md:rounded-2xl">
          {data.map((data, i) => {
            return <SupportComponent propsdata={data} key={i} />;
          })}
        </div>
      ) : (
        <div className=" rounded-2xl bg-[#FFFFFF] px-3 py-3 shadow-[0_35px_60px_-15px_rgba(0,0,0,0.05)]">
          <SupportTableComponent />
        </div>
      )}
    </div>
  );
};

export default Support;

Support.getLayout = Affiliates;
