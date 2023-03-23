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
import SupportComponent from "./supportComponent";

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
      <div className=" mb-5 block font-medium text-base">
        <span className="text-[#2262C6]">Dashboard</span> - Support - FAQ
        <div className="container mt-3">
          <div className="text-white md:flex justify-between items-center text-center md:text-left">
            <div className="mb-4 md:mb-0 flex items-center flex-wrap justify-center md:justify-start">
              <div className="relative flex">
                <input
                  type="search"
                  id="search"
                  className=" md:w-80 h-10 placeholder:text-[#666666] placeholder:font-medium placeholder:text-xs
                                  pl-4 text-sm rounded"
                  placeholder="Search Merchant.."
                  required
                />
                <svg
                  aria-hidden="true"
                  className="w-5 h-5 mt-4 -ml-10 text-[#B3B3B3] dark:text-gray-400 "
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
            <div className="flex items-center justify-center text-gray-700 font-medium text-xs transition duration-150 ease-in-out">
              <button
                type="submit"
                className="h-10 text-white bg-[#2262C6] hover:bg-blue-800 focus:ring-4 focus:outline-none
                             focus:ring-blue-300
                             font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                FAQ
              </button>

              <button
                type="submit"
                className=" h-10 ml-2 text-white bg-[#2262C6] hover:bg-blue-800 focus:ring-4 focus:outline-none
                             focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700
                              dark:focus:ring-blue-800 "
                onClick={onOpen}
              >
                Add new Ticket
              </button>

              <Modal isOpen={isOpen} size="3xl" onClose={onClose} isCentered>
                <ModalOverlay />
                <ModalContent>
                  <div className="flex pl-5  md:pl-6 pt-4 justify-between items-end">
                    <div className=" text-[#282560] font-medium">
                      Open New Ticket
                    </div>
                    <Image
                      alt="..."
                      className="mr-4 w-10 h-10 rounded-full align-middle "
                      src="/img/icons/close.png"
                      onClick={onClose}
                    />
                  </div>
                  <ModalBody>
                    <form className="w-full pt-5">
                      <div className="flex flex-wrap -mx-3 mb-6">
                        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                          <label
                            className="pl-4 block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                            for="grid-first-name"
                          >
                            Ticket Subject
                          </label>
                          <input
                            className=" w-full placeholder:text-[#D7D7D7] text-gray-700 border border-#D7D7D7 rounded-md py-3 px-4 mb-3 "
                            id="grid-first-name"
                            type="text"
                            placeholder="Type here.."
                          />
                        </div>
                        <div className="w-full md:w-1/2 px-3">
                          <label
                            className="block pl-4 uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                            for="grid-last-name"
                          >
                            Your Email
                          </label>
                          <input
                            className="w-full  placeholder:text-[#D7D7D7] text-gray-700 border border-#D7D7D7 rounded-md py-3 px-4 mb-3 "
                            id="grid-last-name"
                            type="text"
                            placeholder="Type here.."
                          />
                        </div>
                      </div>
                      <div className="flex flex-wrap -mx-3 mb-6">
                        <div className="w-full px-3">
                          <label
                            className="block pl-4 uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                            for="grid-password"
                          >
                            Ticket Subject
                          </label>
                          <textarea
                            className="w-full text-gray-700 border border-#D7D7D7 rounded-md py-3 px-4 mb-3 "
                            id="grid-textarea"
                          />
                        </div>
                      </div>
                    </form>
                  </ModalBody>
                  <div className="flex flex-wrap pl-5 mb-6 md:px-80  font-medium">
                    <button
                      type="submit"
                      className="px-5  h-12  text-white bg-[#1B48BB] hover:bg-blue-800 focus:ring-4 focus:outline-none
                             focus:ring-blue-300 font-medium rounded text-sm dark:bg-blue-600 dark:hover:bg-blue-700
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
      <div className="pt-5 px-2 rounded-md h-auto md:rounded-2xl bg-white shadow-md pb-4 md:mb-10">
        {data.map((data, i) => {
          return <SupportComponent propsdata={data} key={i} />;
        })}
      </div>
    </div>
  );
};

export default Support;

Support.getLayout = Affiliates;
