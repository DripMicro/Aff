import Affiliates from "../../../layouts/AffiliatesLayout";
import {
  Box,
  Button,
  Container,
  Flex,
  FormControl,
  FormLabel,
  Grid,
  GridItem,
  Heading,
  IconButton,
  Image,
  Link,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  SimpleGrid,
  Stack,
  Switch,
  Checkbox,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  useDisclosure,
} from "@chakra-ui/react";

const Support = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

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
        <span className="text-[#2262C6]">Dashboard</span> - Support - FAQ
        <div className="container mt-3">
          <div className="items-center justify-between text-center text-white md:flex md:text-left">
            <div className="mb-4 flex flex-wrap items-center justify-center md:mb-0 md:justify-start">
              <div className="relative flex">
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
                  className="mt-4 -ml-10 h-5 w-5 text-[#B3B3B3] dark:text-gray-400 "
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
              {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" className="w-4 h-4 mr-2">
                                <path fill="currentColor"
                                    d="M216 23.86c0-23.8-30.65-32.77-44.15-13.04C48 191.85 224 200 224 288c0 35.63-29.11 64.46-64.85 63.99-35.17-.45-63.15-29.77-63.15-64.94v-85.51c0-21.7-26.47-32.23-41.43-16.5C27.8 213.16 0 261.33 0 320c0 105.87 86.13 192 192 192s192-86.13 192-192c0-170.29-168-193-168-296.14z" />
                            </svg>
                            <strong className="mr-1">Limited offer!</strong> Get it now before it's to late */}
            </div>
            {/* <div className="flex items-center justify-center"> */}
            <div className="flex items-center justify-center text-xs font-medium text-gray-700 transition duration-150 ease-in-out">
              <button
                type="submit"
                className="h-10 rounded-lg bg-[#2262C6] px-4 py-2 text-sm
                             font-medium
                             text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                FAQ
              </button>

              <button
                type="submit"
                className=" ml-2 h-10 rounded-lg bg-[#2262C6] px-4 py-2 text-sm
                             font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700
                              dark:focus:ring-blue-800 "
                onClick={onOpen}
              >
                Add new Ticket
              </button>

              <Modal isOpen={isOpen} size="3xl" onClose={onClose} isCentered>
                <ModalOverlay />
                <ModalContent>
                  <div className="flex items-end  justify-between pl-5 pt-4 md:pl-6">
                    <div className=" font-medium text-[#282560]">
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
                            className="mb-2 block pl-4 text-xs font-bold uppercase tracking-wide text-gray-700"
                            htmlFor="grid-first-name"
                          >
                            Ticket Subject
                          </label>
                          <input
                            className=" border-#D7D7D7 mb-3 w-full rounded-md border py-3 px-4 text-gray-700 placeholder:text-[#D7D7D7] "
                            id="grid-first-name"
                            type="text"
                            placeholder="Type here.."
                          />
                        </div>
                        <div className="w-full px-3 md:w-1/2">
                          <label
                            className="mb-2 block pl-4 text-xs font-bold uppercase tracking-wide text-gray-700"
                            htmlFor="grid-last-name"
                          >
                            Your Email
                          </label>
                          <input
                            className="border-#D7D7D7  mb-3 w-full rounded-md border py-3 px-4 text-gray-700 placeholder:text-[#D7D7D7] "
                            id="grid-last-name"
                            type="text"
                            placeholder="Type here.."
                          />
                        </div>
                      </div>
                      <div className="-mx-3 mb-6 flex flex-wrap">
                        <div className="w-full px-3">
                          <label
                            className="mb-2 block pl-4 text-xs font-bold uppercase tracking-wide text-gray-700"
                            htmlFor="grid-password"
                          >
                            Ticket Subject
                          </label>
                          <textarea
                            className="border-#D7D7D7 mb-3 w-full rounded-md border py-3 px-4 text-gray-700 "
                            id="grid-textarea"
                          />
                        </div>
                      </div>
                    </form>
                  </ModalBody>
                  <div className="mb-6 flex flex-wrap pl-5 font-medium  md:px-80">
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
      {/* <div className="pt-5 px-2 rounded-md h-auto md:rounded-2xl bg-white shadow-md pb-4 md:mb-10">
        {data.map((data, i) => {
          return <SupportComponent propsdata={data} key={i} />;
        })}
      </div> */}
    </div>
  );
};

export default Support;

Support.getLayout = Affiliates;
