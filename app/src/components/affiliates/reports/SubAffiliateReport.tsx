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
import { createColumnHelper } from "@tanstack/react-table";
import { useRouter } from "next/router";
import { SettingsIcon } from "@chakra-ui/icons";
import { DataTable } from "../../../components/common/data-table/DataTable";
import { QuerySelect } from "../../../components/common/QuerySelect";
import type { QuickReportSummary } from "../../../server/db-types";
import { api } from "../../../utils/api";
import { DateRangeSelect, useDateRange } from "../../common/DateRangeSelect";
import { Loading } from "../../common/Loading";
import { useRef, useEffect, useState } from "react";
import type { ChangeEvent } from "react";
import PerformanceLineChart from "../../common/chart/PerformanceLineChart";
import ConversionChart from "../../common/chart/ConversionChart";

const fields = [
  "Impressions",
  "Clicks",
  "Install",
  "Leads",
  "Demo",
  "Real Account",
  "FTD",
  "Withdrawal",
  "ChargeBack",
  "Active Trader",
  "Commission",
];

export const SubAffiliateReport = () => {
  const router = useRouter();
  const { merchant_id, display } = router.query;
  const { from, to } = useDateRange();
  const [reportFields, setReportFields] = useState<
    { id: number; title: string; value: string; isChecked: boolean }[]
  >([]);

  const { data, isLoading } = api.affiliates.getQuickReportSummary.useQuery({
    from: from,
    to: to,
    display: display ? String(display) : undefined,
    merchant_id: merchant_id ? Number(merchant_id) : 1,
  });

  const { isOpen, onOpen, onClose } = useDisclosure();
  const { data: reportsHiddenCols } =
    api.affiliates.getReportsHiddenCols.useQuery();

  const upsertReportsField = api.affiliates.upsertReportsField.useMutation();

  const { data: performanceChart } =
    api.affiliates.getPerformanceChart.useQuery({ from, to });

  const { data: conversionChart } = api.affiliates.getConversionChart.useQuery({
    from,
    to,
  });

  useEffect(() => {
    const fieldsArray = fields.map((field, i) => {
      return {
        id: i,
        title: field,
        value: field.replace(/\s/g, ""),
        isChecked: !reportsHiddenCols?.includes(field),
      };
    });
    setReportFields(fieldsArray);
  }, [reportsHiddenCols]);

  if (!data || !performanceChart || !conversionChart) {
    return null;
  }

  const handleReportField = async (event: ChangeEvent<HTMLInputElement>) => {
    const value = reportFields.map((item) => {
      const temp = Object.assign({}, item);
      if (temp.id === parseInt(event.target.value)) {
        temp.isChecked = event.target.checked;
      }
      return temp;
    });
    setReportFields(value);
    const hiddenCols = value.filter((item) => item.isChecked === false);
    const remove_fields = hiddenCols
      .map((item) => {
        return item.value;
      })
      .join("|");
    await upsertReportsField.mutateAsync({
      remove_fields,
    });
  };

  const handleSelectAll = async () => {
    const value = reportFields.map((item) => {
      const temp = Object.assign({}, item);
      temp.isChecked = true;
      return temp;
    });
    setReportFields(value);
    const hiddenCols = value.filter((item) => item.isChecked === false);
    const remove_fields = hiddenCols
      .map((item) => {
        return item.value;
      })
      .join("|");
    await upsertReportsField.mutateAsync({
      remove_fields,
    });
  };

  const handleUnSelectAll = async () => {
    const value = reportFields.map((item) => {
      const temp = Object.assign({}, item);
      temp.isChecked = false;
      return temp;
    });
    setReportFields(value);
    const hiddenCols = value.filter((item) => item.isChecked === false);
    const remove_fields = hiddenCols
      .map((item) => {
        return item.value;
      })
      .join("|");
    await upsertReportsField.mutateAsync({
      remove_fields,
    });
  };

  return (
    <>
      <div className="pt-3.5">
        <div className="block text-base font-medium md:justify-between lg:flex">
          <div className="mb-2.5 flex items-center justify-between md:mb-5 lg:mb-5">
            <div className="">
              <span className="text-[#2262C6]">Affliate Program</span>
              &nbsp;-&nbsp;Sub Affiliate Report
            </div>
            <button className="lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
              >
                <path
                  d="M17 3.00024H16V1.00024C16 0.735028 15.8946 0.480674 15.7071 0.293137C15.5196 0.105601 15.2652 0.000244141 15 0.000244141C14.7348 0.000244141 14.4804 0.105601 14.2929 0.293137C14.1054 0.480674 14 0.735028 14 1.00024V3.00024H6V1.00024C6 0.735028 5.89464 0.480674 5.70711 0.293137C5.51957 0.105601 5.26522 0.000244141 5 0.000244141C4.73478 0.000244141 4.48043 0.105601 4.29289 0.293137C4.10536 0.480674 4 0.735028 4 1.00024V3.00024H3C2.20435 3.00024 1.44129 3.31631 0.87868 3.87892C0.316071 4.44153 0 5.20459 0 6.00024V7.00024H20V6.00024C20 5.20459 19.6839 4.44153 19.1213 3.87892C18.5587 3.31631 17.7956 3.00024 17 3.00024Z"
                  fill="#2262C6"
                />
                <path
                  d="M0 17.0002C0 17.7959 0.316071 18.5589 0.87868 19.1216C1.44129 19.6842 2.20435 20.0002 3 20.0002H17C17.7956 20.0002 18.5587 19.6842 19.1213 19.1216C19.6839 18.5589 20 17.7959 20 17.0002V9.00024H0V17.0002Z"
                  fill="#2262C6"
                />
              </svg>
            </button>
          </div>
          <div className="hidden lg:block">
            <DateRangeSelect />
          </div>
        </div>

        <div className="item-center mt-2.5 flex justify-between md:items-start">
          <div className="flex">
            <button
              className="rounded-md bg-white px-2 pt-0.5 pb-1 drop-shadow lg:px-3 lg:pt-1.5 lg:pb-2 "
              onClick={onOpen}
            >
              <SettingsIcon />
            </button>
            <span className="font-sm ml-3 hidden items-center justify-between font-medium lg:flex">
              Report Display
            </span>
          </div>

          <div className="flex items-center lg:items-end">
            <div>
              <div className="ml-2 hidden text-base font-medium lg:block">
                Your Active Link
              </div>
              <input
                className="rounded border border-[#D7D7D7] bg-[#F9F9FF] py-2 px-4 text-xs font-medium text-[#2262C6] lg:w-96 lg:text-base "
                type="text"
                value={"https://affiliates.evotrade.com/click.php"}
              />
            </div>
            <button className="ml-5 flex rounded-md bg-[#2262C6] px-4 py-1 text-white lg:px-8 lg:py-2">
              Copy Link
              <div className="ml-2">
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
            </button>
          </div>
        </div>

        <Modal isOpen={isOpen} size="3xl" onClose={onClose} isCentered>
          <ModalOverlay />
          <ModalContent ml={4} mr={4}>
            <div className="flex items-end justify-between pl-6 pt-4 md:pl-8">
              <div className="font-medium text-[#282560]">
                Manage Field On Report - Quick Summary
              </div>
              <Image
                alt="..."
                className="mr-4 h-10 w-10 rounded-full align-middle "
                src="/img/icons/close.png"
                onClick={onClose}
              />
            </div>
            <div className="mb-6 w-64 pl-6 pt-2 text-sm text-[#717171] md:mb-16 md:w-full md:pl-8">
              Please activate the fields you want to display on the report:
            </div>

            <ModalBody>
              <div className="px-0 md:px-2">
                <SimpleGrid minChildWidth="300px" spacing="35px">
                  {reportFields.map((field) => {
                    return (
                      <Box key={field.id}>
                        <FormControl display="flex" alignItems="center">
                          <input
                            type="checkbox"
                            id={`report-field-${field.id}`}
                            checked={field.isChecked}
                            value={field.id}
                            onChange={(e) => void handleReportField(e)}
                            className="form-checkbox text-blueGray-700 ml-1 h-5 w-5 rounded border-0 transition-all duration-150 ease-linear"
                          />
                          <FormLabel
                            htmlFor={`report-field-${field.id}`}
                            mb="0"
                            mr="0"
                            ml="4"
                            color="black"
                            fontSize="md"
                          >
                            {field.title}
                          </FormLabel>
                        </FormControl>
                      </Box>
                    );
                  })}
                </SimpleGrid>
              </div>
            </ModalBody>

            <div className="flex justify-between p-6 font-medium md:p-8 md:pt-20">
              <div className="flex">
                <button
                  className="mr-3 rounded-md bg-[#2262C6] px-3 py-3 text-white md:px-14"
                  onClick={handleSelectAll}
                >
                  Select All
                </button>
                <button
                  className="rounded-md border border-[#1B48BB] bg-[#EFEEFF] px-3 py-3 text-[#1B48BB] md:px-12"
                  onClick={handleUnSelectAll}
                >
                  Unselect All
                </button>
              </div>
              <button
                className="rounded-md bg-[#2262C6] px-6 py-3 text-white md:px-14"
                onClick={onClose}
              >
                Save
              </button>
            </div>
          </ModalContent>
        </Modal>

        <div
          className="my-6 rounded-2xl bg-white px-2 pt-5 pb-5 shadow-sm md:px-6 "
          id="myID"
        >
          <Stack>
            <Tabs>
              <Flex direction="row" alignItems="center">
                <TabList>
                  <Tab>Performace Chart</Tab>
                  <Tab>Conversion Chart</Tab>
                </TabList>
              </Flex>
              <TabPanels>
                <TabPanel>
                  <div className="mt-5 h-80 pb-5">
                    <PerformanceLineChart
                      performanceChartData={performanceChart}
                    />
                  </div>
                </TabPanel>
                <TabPanel>
                  <div className="mt-5 h-80 pb-5">
                    <ConversionChart conversionChartData={conversionChart} />
                  </div>
                </TabPanel>
              </TabPanels>
            </Tabs>
          </Stack>
        </div>

        <div className="grid grid-cols-2 gap-4 lg:grid-cols-5">
          <div className="rounded-2xl bg-white p-4 shadow-sm ">
            <div className="flex items-center justify-between">
              <div className="text-sm font-medium text-[#0085FF] ">Click</div>
              <div className="items-center rounded bg-[#F4F7F9] py-2 px-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="26"
                  height="26"
                  viewBox="0 0 26 26"
                  fill="none"
                >
                  <path
                    d="M22.7258 14.3108C22.7702 14.1042 22.7533 13.8891 22.6771 13.692C22.6009 13.4949 22.4687 13.3244 22.2968 13.2015L7.13009 2.36813C6.95942 2.24541 6.75671 2.17505 6.54671 2.16564C6.33671 2.15623 6.12851 2.20818 5.94755 2.31515C5.76659 2.42211 5.6207 2.57947 5.5277 2.76798C5.4347 2.9565 5.39861 3.16802 5.42384 3.37671L7.59051 21.7934C7.61545 22.0045 7.70196 22.2036 7.83927 22.366C7.97658 22.5283 8.15861 22.6466 8.36269 22.7062C8.56677 22.7658 8.78387 22.764 8.98696 22.7011C9.19004 22.6382 9.37012 22.5169 9.50476 22.3524L13.4178 17.5684L17.0762 23.4834L18.9189 22.3437L15.2822 16.4634L21.8786 15.1439C22.0859 15.1033 22.2767 15.0027 22.4273 14.8546C22.5779 14.7065 22.6817 14.5174 22.7258 14.3108ZM13.3289 14.6466C13.083 14.6957 12.8617 14.8285 12.7028 15.0225L9.44409 19.006L7.86134 5.55421L19.0013 13.5113L13.3289 14.6466Z"
                    fill="#0084FF"
                  />
                </svg>
              </div>
            </div>
            <div className="mt-1 text-xl font-semibold text-[#1A1A1A]">02</div>
            <div className="mt-6">
              <div className="h-1 w-3/4 bg-[#0085FF]"></div>
            </div>
          </div>

          <div className="rounded-2xl bg-white p-4 shadow-sm ">
            <div className="flex items-center justify-between">
              <div className="text-sm font-medium text-[#F6B816] ">Signup</div>
              <div className="items-center rounded bg-[#F4F7F9] py-2 px-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="26"
                  height="26"
                  viewBox="0 0 26 26"
                  fill="none"
                >
                  <path
                    d="M10.5251 13C11.772 13 12.6917 12.0802 12.6917 10.8333C12.6917 9.58638 11.772 8.66663 10.5251 8.66663C9.27815 8.66663 8.3584 9.58638 8.3584 10.8333C8.3584 12.0802 9.27707 13 10.5251 13Z"
                    fill="#F6B816"
                  />
                  <path
                    d="M21.667 4.33337H4.33366C3.13874 4.33337 2.16699 5.24446 2.16699 6.36462V19.6355C2.16699 20.7556 3.13874 21.6667 4.33366 21.6667H21.667C22.8619 21.6667 23.8337 20.7556 23.8337 19.6355V6.36462C23.8337 5.24446 22.8619 4.33337 21.667 4.33337ZM21.667 19.5L4.33366 19.4881V6.50004L21.667 6.51196V19.5Z"
                    fill="#F6B816"
                  />
                  <path
                    d="M15.1667 9.75H19.5V11.9167H15.1667V9.75ZM16.25 14.0833H19.5V16.25H16.25V14.0833ZM14.5492 16.8307C14.5492 15.3422 12.7335 13.8125 10.5246 13.8125C8.31567 13.8125 6.5 15.3422 6.5 16.8307V17.3333H14.5492V16.8307Z"
                    fill="#F6B816"
                  />
                </svg>
              </div>
            </div>
            <div className="mt-1 text-xl font-semibold text-[#1A1A1A]">06</div>
            <div className="mt-6">
              <div className="h-1 w-3/4 bg-[#F6B816]"></div>
            </div>
          </div>

          <div className="rounded-2xl bg-white p-4 shadow-sm ">
            <div className="flex items-center justify-between">
              <div className="text-sm font-medium text-[#F8712E] ">
                Acquisition
              </div>
              <div className="items-center rounded bg-[#F4F7F9] py-2 px-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="26"
                  height="26"
                  viewBox="0 0 26 26"
                  fill="none"
                >
                  <path
                    d="M20.5837 8.66664H18.417V11.9166H15.167V14.0833H18.417V17.3333H20.5837V14.0833H23.8337V11.9166H20.5837V8.66664ZM4.33366 8.66664C4.32032 9.23935 4.42328 9.80881 4.63633 10.3406C4.84938 10.8724 5.16808 11.3554 5.57316 11.7605C5.97823 12.1655 6.46127 12.4842 6.99304 12.6973C7.52482 12.9103 8.09428 13.0133 8.66699 13C9.2397 13.0133 9.80917 12.9103 10.3409 12.6973C10.8727 12.4842 11.3558 12.1655 11.7608 11.7605C12.1659 11.3554 12.4846 10.8724 12.6977 10.3406C12.9107 9.80881 13.0137 9.23935 13.0003 8.66664C13.0137 8.09393 12.9107 7.52446 12.6977 6.99269C12.4846 6.46091 12.1659 5.97788 11.7608 5.5728C11.3558 5.16772 10.8727 4.84902 10.3409 4.63598C9.80917 4.42293 9.2397 4.31996 8.66699 4.3333C8.09428 4.31996 7.52482 4.42293 6.99304 4.63598C6.46127 4.84902 5.97823 5.16772 5.57316 5.5728C5.16808 5.97788 4.84938 6.46091 4.63633 6.99269C4.42328 7.52446 4.32032 8.09393 4.33366 8.66664ZM10.8337 8.66664C10.8476 8.95486 10.8011 9.24281 10.6971 9.51199C10.5932 9.78117 10.4341 10.0256 10.23 10.2297C10.026 10.4337 9.78152 10.5928 9.51234 10.6968C9.24316 10.8007 8.95521 10.8472 8.66699 10.8333C8.37877 10.8472 8.09082 10.8007 7.82164 10.6968C7.55246 10.5928 7.308 10.4337 7.10396 10.2297C6.89992 10.0256 6.74081 9.78117 6.63685 9.51199C6.5329 9.24281 6.48639 8.95486 6.50033 8.66664C6.48639 8.37841 6.5329 8.09047 6.63685 7.82128C6.74081 7.5521 6.89992 7.30764 7.10396 7.1036C7.308 6.89956 7.55246 6.74045 7.82164 6.6365C8.09082 6.53254 8.37877 6.48604 8.66699 6.49997C8.95521 6.48604 9.24316 6.53254 9.51234 6.6365C9.78152 6.74045 10.026 6.89956 10.23 7.1036C10.4341 7.30764 10.5932 7.5521 10.6971 7.82128C10.8011 8.09047 10.8476 8.37841 10.8337 8.66664ZM4.33366 19.5C4.33366 18.638 4.67607 17.8114 5.28556 17.2019C5.89506 16.5924 6.72171 16.25 7.58366 16.25H9.75033C10.6123 16.25 11.4389 16.5924 12.0484 17.2019C12.6579 17.8114 13.0003 18.638 13.0003 19.5V20.5833H15.167V19.5C15.167 18.7886 15.0269 18.0843 14.7547 17.4271C14.4825 16.7699 14.0835 16.1728 13.5805 15.6698C13.0775 15.1668 12.4804 14.7678 11.8232 14.4956C11.166 14.2234 10.4617 14.0833 9.75033 14.0833H7.58366C6.14707 14.0833 4.76932 14.654 3.7535 15.6698C2.73768 16.6856 2.16699 18.0634 2.16699 19.5V20.5833H4.33366V19.5Z"
                    fill="#F87230"
                  />
                </svg>
              </div>
            </div>
            <div className="mt-1 text-xl font-semibold text-[#1A1A1A]">86</div>
            <div className="mt-6">
              <div className="h-1 w-3/4 bg-[#F8712E]"></div>
            </div>
          </div>

          <div className="rounded-2xl bg-white p-4 shadow-sm ">
            <div className="flex items-center justify-between">
              <div className="text-sm font-medium text-[#048D85] ">
                Acquisition
              </div>
              <div className="items-center rounded bg-[#F4F7F9] py-2 px-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="26"
                  height="26"
                  viewBox="0 0 26 26"
                  fill="none"
                >
                  <path
                    d="M20.5837 8.66664H18.417V11.9166H15.167V14.0833H18.417V17.3333H20.5837V14.0833H23.8337V11.9166H20.5837V8.66664ZM4.33366 8.66664C4.32032 9.23935 4.42328 9.80881 4.63633 10.3406C4.84938 10.8724 5.16808 11.3554 5.57316 11.7605C5.97823 12.1655 6.46127 12.4842 6.99304 12.6973C7.52482 12.9103 8.09428 13.0133 8.66699 13C9.2397 13.0133 9.80917 12.9103 10.3409 12.6973C10.8727 12.4842 11.3558 12.1655 11.7608 11.7605C12.1659 11.3554 12.4846 10.8724 12.6977 10.3406C12.9107 9.80881 13.0137 9.23935 13.0003 8.66664C13.0137 8.09393 12.9107 7.52446 12.6977 6.99269C12.4846 6.46091 12.1659 5.97788 11.7608 5.5728C11.3558 5.16772 10.8727 4.84902 10.3409 4.63598C9.80917 4.42293 9.2397 4.31996 8.66699 4.3333C8.09428 4.31996 7.52482 4.42293 6.99304 4.63598C6.46127 4.84902 5.97823 5.16772 5.57316 5.5728C5.16808 5.97788 4.84938 6.46091 4.63633 6.99269C4.42328 7.52446 4.32032 8.09393 4.33366 8.66664ZM10.8337 8.66664C10.8476 8.95486 10.8011 9.24281 10.6971 9.51199C10.5932 9.78117 10.4341 10.0256 10.23 10.2297C10.026 10.4337 9.78152 10.5928 9.51234 10.6968C9.24316 10.8007 8.95521 10.8472 8.66699 10.8333C8.37877 10.8472 8.09082 10.8007 7.82164 10.6968C7.55246 10.5928 7.308 10.4337 7.10396 10.2297C6.89992 10.0256 6.74081 9.78117 6.63685 9.51199C6.5329 9.24281 6.48639 8.95486 6.50033 8.66664C6.48639 8.37841 6.5329 8.09047 6.63685 7.82128C6.74081 7.5521 6.89992 7.30764 7.10396 7.1036C7.308 6.89956 7.55246 6.74045 7.82164 6.6365C8.09082 6.53254 8.37877 6.48604 8.66699 6.49997C8.95521 6.48604 9.24316 6.53254 9.51234 6.6365C9.78152 6.74045 10.026 6.89956 10.23 7.1036C10.4341 7.30764 10.5932 7.5521 10.6971 7.82128C10.8011 8.09047 10.8476 8.37841 10.8337 8.66664ZM4.33366 19.5C4.33366 18.638 4.67607 17.8114 5.28556 17.2019C5.89506 16.5924 6.72171 16.25 7.58366 16.25H9.75033C10.6123 16.25 11.4389 16.5924 12.0484 17.2019C12.6579 17.8114 13.0003 18.638 13.0003 19.5V20.5833H15.167V19.5C15.167 18.7886 15.0269 18.0843 14.7547 17.4271C14.4825 16.7699 14.0835 16.1728 13.5805 15.6698C13.0775 15.1668 12.4804 14.7678 11.8232 14.4956C11.166 14.2234 10.4617 14.0833 9.75033 14.0833H7.58366C6.14707 14.0833 4.76932 14.654 3.7535 15.6698C2.73768 16.6856 2.16699 18.0634 2.16699 19.5V20.5833H4.33366V19.5Z"
                    fill="#048D85"
                  />
                </svg>
              </div>
            </div>
            <div className="mt-1 text-xl font-semibold text-[#1A1A1A]">02</div>
            <div className="mt-6">
              <div className="h-1 w-3/4 bg-[#048D85]"></div>
            </div>
          </div>

          <div className="rounded-2xl bg-white p-4 shadow-sm ">
            <div className="flex items-center justify-between">
              <div className="text-sm font-medium text-[#2DBF3C] ">
                Your Comission
              </div>
              <div className="items-center rounded bg-[#F4F7F9] py-2 px-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="26"
                  height="26"
                  viewBox="0 0 26 26"
                  fill="none"
                >
                  <path
                    d="M17.3324 9.20829H19.499C19.499 6.13488 16.5144 4.73304 14.0824 4.41021V2.16663H11.9157V4.41021C9.48361 4.73304 6.49902 6.13488 6.49902 9.20829C6.49902 12.1398 9.38719 13.664 11.9157 14.0075V19.3916C10.347 19.1197 8.66569 18.2823 8.66569 16.7916H6.49902C6.49902 19.5964 9.12611 21.2539 11.9157 21.5973V23.8333H14.0824V21.5908C16.5144 21.268 19.499 19.865 19.499 16.7916C19.499 13.7182 16.5144 12.3164 14.0824 11.9935V6.60829C15.5232 6.86721 17.3324 7.62771 17.3324 9.20829ZM8.66569 9.20829C8.66569 7.62771 10.4749 6.86721 11.9157 6.60829V11.8072C10.4304 11.5331 8.66569 10.7217 8.66569 9.20829ZM17.3324 16.7916C17.3324 18.3722 15.5232 19.1327 14.0824 19.3916V14.1916C15.5232 14.4505 17.3324 15.211 17.3324 16.7916Z"
                    fill="#2DBF3C"
                  />
                </svg>
              </div>
            </div>
            <div className="mt-1 text-xl font-semibold text-[#1A1A1A]">
              $570,871.05
            </div>
            <div className="mt-6">
              <div className="h-1 w-3/4 bg-[#2DBF3C]"></div>
            </div>
          </div>

          <div className="rounded-2xl bg-white p-4 shadow-sm ">
            <div className="flex items-center justify-between">
              <div className="text-sm font-medium text-[#F34485] ">
                FTP Amoint
              </div>
              <div className="items-center rounded bg-[#F4F7F9] py-2 px-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="26"
                  height="26"
                  viewBox="0 0 26 26"
                  fill="none"
                >
                  <path
                    d="M21.5613 9.30146C21.5099 9.18388 21.438 9.0764 21.3489 8.98404L14.8489 2.48404C14.7566 2.39497 14.6491 2.32307 14.5315 2.27171C14.499 2.25654 14.4643 2.24788 14.4297 2.23596C14.339 2.20511 14.2447 2.18653 14.1491 2.18071C14.1263 2.17854 14.1058 2.16663 14.083 2.16663H6.49967C5.30476 2.16663 4.33301 3.13838 4.33301 4.33329V21.6666C4.33301 22.8615 5.30476 23.8333 6.49967 23.8333H19.4997C20.6946 23.8333 21.6663 22.8615 21.6663 21.6666V9.74996C21.6663 9.72721 21.6544 9.70663 21.6523 9.68279C21.647 9.58715 21.6284 9.49272 21.597 9.40221C21.5862 9.36754 21.5764 9.33396 21.5613 9.30146ZM17.9678 8.66663H15.1663V5.86513L17.9678 8.66663ZM6.49967 21.6666V4.33329H12.9997V9.74996C12.9997 10.0373 13.1138 10.3128 13.317 10.516C13.5201 10.7192 13.7957 10.8333 14.083 10.8333H19.4997L19.5018 21.6666H6.49967Z"
                    fill="#F34485"
                  />
                  <path
                    d="M8.66699 13H17.3337V15.1666H8.66699V13ZM8.66699 17.3333H17.3337V19.5H8.66699V17.3333ZM8.66699 8.66663H10.8337V10.8333H8.66699V8.66663Z"
                    fill="#F34485"
                  />
                </svg>
              </div>
            </div>
            <div className="mt-1 text-xl font-semibold text-[#1A1A1A]">
              20,110
            </div>
            <div className="mt-6">
              <div className="h-1 w-3/4 bg-[#F34485]"></div>
            </div>
          </div>

          <div className="rounded-2xl bg-white p-4 shadow-sm ">
            <div className="flex items-center justify-between">
              <div className="text-sm font-medium text-[#6148BA] ">
                Accounts
              </div>
              <div className="items-center rounded bg-[#F4F7F9] py-2 px-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="26"
                  height="26"
                  viewBox="0 0 26 26"
                  fill="none"
                >
                  <path
                    d="M21.667 2.16663H10.8337C9.63874 2.16663 8.66699 3.13838 8.66699 4.33329V8.66663H4.33366C3.13874 8.66663 2.16699 9.63838 2.16699 10.8333V21.6666C2.16699 22.8615 3.13874 23.8333 4.33366 23.8333H15.167C16.3619 23.8333 17.3337 22.8615 17.3337 21.6666V17.3333H21.667C22.8619 17.3333 23.8337 16.3615 23.8337 15.1666V4.33329C23.8337 3.13838 22.8619 2.16663 21.667 2.16663ZM4.33366 21.6666V10.8333H15.167L15.1692 21.6666H4.33366ZM21.667 15.1666H17.3337V10.8333C17.3337 9.63838 16.3619 8.66663 15.167 8.66663H10.8337V4.33329H21.667V15.1666Z"
                    fill="#6148BA"
                  />
                  <path
                    d="M6.5 13H13V15.1667H6.5V13ZM6.5 17.3333H13V19.5H6.5V17.3333Z"
                    fill="#6148BA"
                  />
                </svg>
              </div>
            </div>
            <div className="mt-1 text-xl font-semibold text-[#1A1A1A]">03</div>
            <div className="mt-6">
              <div className="h-1 w-3/4 bg-[#6148BA]"></div>
            </div>
          </div>

          <div className="rounded-2xl bg-white p-4 shadow-sm ">
            <div className="flex items-center justify-between">
              <div className="text-sm font-medium text-[#5E9CDF] ">
                Acquisition
              </div>
              <div className="items-center rounded bg-[#F4F7F9] py-2 px-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="26"
                  height="26"
                  viewBox="0 0 26 26"
                  fill="none"
                >
                  <path
                    d="M13 9.75C12.1398 9.75568 11.3164 10.0999 10.7082 10.7082C10.0999 11.3164 9.75568 12.1398 9.75 13C9.75 14.7788 11.2212 16.25 13 16.25C14.7778 16.25 16.25 14.7788 16.25 13C16.25 11.2222 14.7778 9.75 13 9.75Z"
                    fill="#5E9CDF"
                  />
                  <path
                    d="M13.0002 5.41663C4.73115 5.41663 2.24598 12.585 2.22323 12.6576L2.1084 13L2.22215 13.3423C2.24598 13.4149 4.73115 20.5833 13.0002 20.5833C21.2693 20.5833 23.7545 13.4149 23.7772 13.3423L23.8921 13L23.7783 12.6576C23.7545 12.585 21.2693 5.41663 13.0002 5.41663ZM13.0002 18.4166C7.20332 18.4166 4.95756 14.2501 4.41373 13C4.95973 11.7455 7.20656 7.58329 13.0002 7.58329C18.7971 7.58329 21.0429 11.7498 21.5867 13C21.0407 14.2545 18.7939 18.4166 13.0002 18.4166Z"
                    fill="#5E9CDF"
                  />
                </svg>
              </div>
            </div>
            <div className="mt-1 text-xl font-semibold text-[#1A1A1A]">
              1000
            </div>
            <div className="mt-6">
              <div className="h-1 w-3/4 bg-[#5E9CDF]"></div>
            </div>
          </div>

          <div className="rounded-2xl bg-white p-4 shadow-sm ">
            <div className="flex items-center justify-between">
              <div className="text-sm font-medium text-[#DC5EDF] ">
                Acquisition
              </div>
              <div className="items-center rounded bg-[#F4F7F9] py-2 px-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="26"
                  height="26"
                  viewBox="0 0 26 26"
                  fill="none"
                >
                  <path
                    d="M13 9.75C12.1398 9.75568 11.3164 10.0999 10.7082 10.7082C10.0999 11.3164 9.75568 12.1398 9.75 13C9.75 14.7788 11.2212 16.25 13 16.25C14.7778 16.25 16.25 14.7788 16.25 13C16.25 11.2222 14.7778 9.75 13 9.75Z"
                    fill="#E586E7"
                  />
                  <path
                    d="M13.0002 5.41663C4.73115 5.41663 2.24598 12.585 2.22323 12.6576L2.1084 13L2.22215 13.3423C2.24598 13.4149 4.73115 20.5833 13.0002 20.5833C21.2693 20.5833 23.7545 13.4149 23.7772 13.3423L23.8921 13L23.7783 12.6576C23.7545 12.585 21.2693 5.41663 13.0002 5.41663ZM13.0002 18.4166C7.20332 18.4166 4.95756 14.2501 4.41373 13C4.95973 11.7455 7.20656 7.58329 13.0002 7.58329C18.7971 7.58329 21.0429 11.7498 21.5867 13C21.0407 14.2545 18.7939 18.4166 13.0002 18.4166Z"
                    fill="#E586E7"
                  />
                </svg>
              </div>
            </div>
            <div className="mt-1 text-xl font-semibold text-[#1A1A1A]">05</div>
            <div className="mt-6">
              <div className="h-1 w-3/4 bg-[#DC5EDF]"></div>
            </div>
          </div>

          <button className="h-10 rounded-md border border-dashed border-[#3B5EC2] bg-[#EBF0FF] px-4">
            <div className="flex items-center justify-center">
              <div className="items-center rounded">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="28"
                  height="24"
                  viewBox="0 0 28 24"
                  fill="none"
                >
                  <path
                    d="M14.2879 16L18.8111 11H15.4187V4H13.1571V11H9.76465L14.2879 16Z"
                    fill="#1B48BB"
                  />
                  <path
                    d="M23.3339 18H5.2411V11H2.97949V18C2.97949 19.103 3.99382 20 5.2411 20H23.3339C24.5812 20 25.5955 19.103 25.5955 18V11H23.3339V18Z"
                    fill="#1B48BB"
                  />
                </svg>
              </div>
              <div className="pl-5 text-sm font-medium text-[#1B48BB]">
                Download
              </div>
            </div>
          </button>
        </div>

        <div className="mb-5 mt-5 rounded-2xl bg-white px-2 py-5 shadow-sm md:px-5">
          <div className="text-sm font-bold text-[#282560] ">
            Sub Affiliate Performance
          </div>

          <div className="flex"></div>
        </div>
      </div>
    </>
  );
};
