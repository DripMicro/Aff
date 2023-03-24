import { SettingsIcon } from "@chakra-ui/icons";
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
import { AreaChart, LineChart } from "@tremor/react";
import { SingleDatepicker } from "chakra-dayzed-datepicker";
import DashboardChart from "../../common/chart/DashboardChart";
import PerformanceChart from "../../common/chart/PerformanceChart";
import ConversionChart from "../../common/chart/ConversionChart";
import DeviceReportChart from "../../common/chart/DeviceReportChart";
import DoughnutChart from "../../common/chart/DoughnutChart";
import CountryChart from "../../common/chart/CountryChart";

import { useRef, useLayoutEffect, useEffect, useState } from "react";
import { useElementSize } from "usehooks-ts";

import type {
  CountryReportType,
  TopMerchantCreativeType,
} from "../../../server/db-types";
import { api } from "../../../utils/api";
import {
  conversionFormatter,
  performanceFormatter,
} from "../../../utils/format";

import { DataTable } from "../../common/data-table/DataTable";

import type { ChangeEvent } from "react";
import {
  AcauisitionIcon,
  ClicksIcon,
  ComissionIcon,
  SignupIcon,
} from "../../icons";
import { DateRangeSelect, useDateRange } from "../../common/DateRangeSelect";

import Affiliates from "../../../layouts/AffiliatesLayout";

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
const columnHelper = createColumnHelper<TopMerchantCreativeType>();
const reportColumnHelper = createColumnHelper<CountryReportType>();

export const Dashboard = () => {
  const { from, to } = useDateRange();

  const [reportFields, setReportFields] = useState<
    { id: number; title: string; value: string; isChecked: boolean }[]
  >([]);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { data } = api.affiliates.getDashboard.useQuery({
    from,
    to,
  });
  const { data: performanceChart } =
    api.affiliates.getPerformanceChart.useQuery({ from, to });

  const { data: conversionChart } = api.affiliates.getConversionChart.useQuery({
    from,
    to,
  });

  console.log("conversionChart");
  console.log(conversionChart);

  const { data: creative } = api.affiliates.getTopMerchantCreative.useQuery();
  const { data: report } = api.affiliates.getCountryReport.useQuery();
  const { data: reportsHiddenCols } =
    api.affiliates.getReportsHiddenCols.useQuery();
  const { data: account, refetch } = api.affiliates.getAccount.useQuery();
  const upsertReportsField = api.affiliates.upsertReportsField.useMutation();
  const refChart = useRef<null | HTMLDivElement>(null);
  // const [width, setWidth] = useState<number | undefined>(0);

  // useLayoutEffect(() => {
  //   console.log("refChart.current?.offsetWidth");
  //   console.log(refChart.current?.offsetWidth);

  //   const getwidth = () => {
  //     setWidth(refChart.current?.offsetWidth);
  //   };

  //   window.addEventListener("resize", getwidth);

  //   return () => window.removeEventListener("resize", getwidth);
  // });

  const [squareRef, { width, height }] = useElementSize();

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

  if (!data || !creative || !report || !performanceChart || !conversionChart) {
    return null;
  }

  const columns = [
    columnHelper.accessor("merchant.name", {
      cell: (info) => info.getValue(),
      header: "Merchant",
    }),
    columnHelper.accessor("language.title", {
      cell: (info) => info.getValue(),
      header: "Language",
    }),
    columnHelper.accessor("title", {
      cell: (info) => info.getValue(),
      header: "Creative Name",
    }),
    columnHelper.accessor("file", {
      cell: ({ row }) => {
        return !!row.original.file ? (
          <Image
            objectFit="cover"
            maxW={{ base: "100%", sm: "173px" }}
            src={row.original.file}
            alt={row.original.alt}
          />
        ) : null;
      },
      header: "Preview",
    }),
    columnHelper.accessor("width", {
      cell: ({ row }) => {
        return (
          <span>
            {row.original.width}x{row.original.height}
          </span>
        );
      },
      header: "LP Preview",
    }),
  ];

  const reportColumns = [
    reportColumnHelper.accessor("merchant_id", {
      cell: (info) => info.getValue(),
      header: "#",
    }),
    reportColumnHelper.accessor("country", {
      cell: (info) => info.getValue(),
      header: "Country",
    }),
    reportColumnHelper.accessor("_sum.Commission", {
      cell: (info) => info.getValue(),
      header: "Report",
    }),
  ];

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

  return (
    <div className="pt-3.5">
      <div className="block text-base font-medium md:justify-between lg:flex">
        <div className="mb-2.5 flex items-center md:mb-5 lg:mb-5 ">
          <span className="text-[#2262C6]">Affliate Program</span>
          &nbsp;-&nbsp;Dashboard
        </div>
        <div className="mb-2.5 flex">
          <DateRangeSelect />
          <button className="ml-5 hidden justify-self-end rounded-md bg-[#2262C6] px-8 py-2 text-white lg:block">
            Update
          </button>

          <button
            className="ml-2 rounded-md bg-white px-2 drop-shadow md:ml-5 md:px-3 md:pt-1.5 md:pb-2"
            onClick={onOpen}
          >
            <SettingsIcon />
          </button>
        </div>
        <div className="grid justify-items-stretch lg:hidden">
          <button className="ml-5 justify-self-end rounded-md bg-[#2262C6] px-2 py-1 text-white md:px-8 md:py-2 ">
            Update
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

      <div className="grid grid-cols-2 gap-5 lg:grid-cols-4">
        {reportFields
          .filter((item) => item.isChecked === true)
          .map((item) => {
            interface Sum {
              [index: string]: number;
            }
            const sumObject = data[0]?._sum as Sum;
            console.log(sumObject);
            const value = sumObject ? sumObject[item.value] : 0;

            return (
              <>
                <div className="rounded-2xl bg-white px-2 pt-3 pb-2 shadow-sm md:px-6">
                  <div className="text-sm font-semibold text-[#2262C6] md:text-base">
                    {item.title}{" "}
                    <span className="hidden text-xs font-normal text-[#B9B9B9] md:inline-flex md:text-sm">
                      ( Last 6 Month )
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <div className="flex-1">
                      <div className="flex h-12 items-center">
                        <div className="flex items-center">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="12"
                            height="13"
                            viewBox="0 0 12 13"
                            fill="none"
                          >
                            <path
                              d="M6.66685 13.0001L6.66685 3.27612L10.1955 6.80479L11.1382 5.86212L6.00018 0.724121L0.862183 5.86212L1.80485 6.80479L5.33352 3.27612L5.33352 13.0001L6.66685 13.0001Z"
                              fill="#50B8B6"
                            />
                          </svg>
                        </div>
                        <span className="ml-1 text-xl font-bold md:ml-3">
                          {value}
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-1 justify-end">
                      <DashboardChart />
                    </div>
                  </div>
                  <div className="flex justify-between pt-5 md:pt-3">
                    <div className="text-center">
                      <div className="text-sm">Last Month</div>
                      <div className="text-base font-bold">643</div>
                    </div>
                    <div className="text-center">
                      <div className="text-sm">This Month</div>
                      <div className="text-base font-bold">432</div>
                    </div>
                  </div>
                </div>
                {/* <Box
                  key={item.id}
                  width="100%"
                  border="1px solid gray"
                  borderRadius="5"
                  bg="white"
                  p="4"
                  display="flex"
                  alignItems="center"
                  columnGap="5"
                  color="#0E132B"
                  _hover={{ borderColor: "#069731", cursor: "pointer" }}
                >
                  <Box>
                    <Text fontSize="md" fontWeight="normal" color="#0E132B">
                      {item.title}
                    </Text>
                    <Text fontSize="lg" fontWeight="bold">
                      {value}
                    </Text>
                  </Box>
                </Box> */}
              </>
            );
          })}
      </div>

      <div
        className="my-6 rounded-2xl bg-white shadow-sm px-2 md:px-6 pt-5 pb-5 "
        id="myID"
        ref={refChart}
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
                <div className="mt-5 h-80">
                  <PerformanceChart performanceChartData={performanceChart} />
                  {/* <div className="w-full h-96" ref={squareRef}>
                    <p>{`The square width is ${width}px and height ${height}px`}</p>
                    <ConversionChart />
                  </div> */}
                  {/* <ConversionChart conversionChartData={conversionChart} /> */}
                </div>
              </TabPanel>
              <TabPanel>
                <div className="mt-5 h-80">
                  <ConversionChart conversionChartData={conversionChart} />
                </div>
                {/* <LineChart
                  data={conversionChart}
                  dataKey="date"
                  categories={["Conversions"]}
                  colors={["blue"]}
                  valueFormatter={conversionFormatter}
                  marginTop="mt-6"
                  yAxisWidth="w-10"
                /> */}
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Stack>
      </div>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-3 my-6">
        <div className="rounded-2xl bg-white px-2 py-5 shadow-sm md:px-5">
          <div className="text-[#2262C6] font-bold text-xl mb-3">
            Device Report
          </div>
          <div className="flex justify-between mb-5">
            <div className="text-base font-light">session by device</div>
            <div className="font-light text-xs items-center justify-center flex">
              <select className="font-light text-xs text-black pr-2">
                <option>Last 90 Days</option>
                <option>Signup</option>
                <option>Signup</option>
                <option>Signup</option>
                <option>Signup</option>
                <option>Signup</option>
              </select>
            </div>
          </div>
          <div className="align-center mb-5">
            <DeviceReportChart />
          </div>
          <div className="flex justify-between mb-3">
            <div className="text-[#2262C6] text-base font-medium">
              Report
            </div>
            <div className="text-xs w-48 items-center justify-center flex">
              <select className="w-full bg-[#EDF2F7] py-1 px-2 rounded-sm">
                <option>SignUp</option>
                <option>Acquisition</option>
                <option>Demo</option>
                <option>FTD</option>
                <option>Account</option>
                <option>FTD Account</option>
                <option>Withdrawal</option>
              </select>
            </div>
          </div>

          <div className="flex justify-between items-center mb-7">
            <div className="flex items-center justify-center">
              <div className="w-10 h-10 ">
                <DoughnutChart />
              </div>
              <div className="text-base ml-3">
                <div className="text-black">
                  Desktop
                </div>
                <div className="text-[#717579]">
                  72%
                </div>
              </div>
              <div className="ml-2.5">
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="6" viewBox="0 0 12 6" fill="none">
                  <path d="M12 6L6 7.15493e-08L0 6" fill="#04B042" />
                </svg>
              </div>
              <div className="text-[#04B042] ml-1 text-base">
                7%
              </div>
            </div>
            <div className="font-bold text-black text-base">
              16,369
            </div>
          </div>

          <div className="flex justify-between items-center mb-7">
            <div className="flex items-center justify-center">
              <div className="w-10 h-10 ">
                <DoughnutChart />
              </div>
              <div className="text-base ml-3">
                <div className="text-black">
                  Desktop
                </div>
                <div className="text-[#717579]">
                  72%
                </div>
              </div>
              <div className="ml-2.5">
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="6" viewBox="0 0 12 6" fill="none">
                  <path d="M12 6L6 7.15493e-08L0 6" fill="#04B042" />
                </svg>
              </div>
              <div className="text-[#04B042] ml-1 text-base">
                7%
              </div>
            </div>
            <div className="font-bold text-black text-base">
              16,369
            </div>
          </div>

          <div className="flex justify-between items-center ">
            <div className="flex items-center justify-center">
              <div className="w-10 h-10 ">
                <DoughnutChart />
              </div>
              <div className="text-base ml-3">
                <div className="text-black">
                  Desktop
                </div>
                <div className="text-[#717579]">
                  72%
                </div>
              </div>
              <div className="ml-2.5">
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="6" viewBox="0 0 12 6" fill="none">
                  <path d="M12 6L6 7.15493e-08L0 6" fill="#04B042" />
                </svg>
              </div>
              <div className="text-[#04B042] ml-1 text-base">
                7%
              </div>
            </div>
            <div className="font-bold text-black text-base">
              16,369
            </div>
          </div>

        </div>

        <div className="rounded-2xl bg-white px-2 py-5 shadow-sm md:px-5">
          <div className="text-[#2262C6] font-bold text-xl mb-3">
            Country Report
          </div>
          <div className="flex justify-between mb-7">
            <div className="text-base font-light">session by device</div>
            <div className="font-light text-xs items-center justify-center flex">
              <select className="font-light text-xs text-black pr-2">
                <option>Last 90 Days</option>
                <option>Signup</option>
                <option>Signup</option>
                <option>Signup</option>
                <option>Signup</option>
                <option>Signup</option>
              </select>
            </div>
          </div>
          <div className="align-center mb-5 align-center flex justify-center">
            <Image width={"243px"} src="/img/worldMap.png" alt="worldmap" />
          </div>
          <div className="flex justify-between mb-3">
            <div className="text-[#2262C6] text-base font-medium">
              Report
            </div>
            <div className="text-xs w-48 items-center justify-center flex">
              <select className="w-full bg-[#EDF2F7] py-1 px-2 rounded-sm">
                <option>SignUp</option>
                <option>Acquisition</option>
                <option>Demo</option>
                <option>FTD</option>
                <option>Account</option>
                <option>FTD Account</option>
                <option>Withdrawal</option>
              </select>
            </div>
          </div>

          <div className="flex justify-between items-center h-48">
            <CountryChart />
          </div>

        </div>

        <div className="rounded-2xl bg-white px-2 py-5 shadow-sm md:px-5">
          <div className="text-[#2262C6] font-bold text-xl mb-3">
            Your Account Manager
          </div>
          <div className="align-center mb-2 align-center flex justify-center">
            <Image width={"100px"} src="/img/icons/user.png" alt="worldmap" />
          </div>
          <div className="align-center mb-5 text-center text-base">
            <div className="text-black font-bold"> {account?.first_name} {account?.last_name} </div>
            <div className="text-[#717579]">Project Manager</div>
          </div>
          <div className="bg-[#F4F7F9] mx-4 py-5 rounded-2xl drop-shadow">
            <div className="flex mb-5">
              <div className="flex justify-center items-center px-10">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="16" viewBox="0 0 20 16" fill="none">
                  <path d="M18 0H2C0.897 0 0 0.897 0 2V14C0 15.103 0.897 16 2 16H18C19.103 16 20 15.103 20 14V2C20 0.897 19.103 0 18 0ZM18 2V2.511L10 8.734L2 2.512V2H18ZM2 14V5.044L9.386 10.789C9.56111 10.9265 9.77733 11.0013 10 11.0013C10.2227 11.0013 10.4389 10.9265 10.614 10.789L18 5.044L18.002 14H2Z" fill="#404040" />
                </svg>
              </div>
              <div className="font-medium text-[#3D3D3D]">
                <Link
                  href={`mailto:${account?.mail || ""}`}
                  textDecoration="none"
                  _hover={{ textDecoration: "none" }}
                >
                  {account?.mail}
                </Link>
              </div>
            </div>
            <div className="flex mb-5">
              <div className="flex justify-center items-center px-10">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M10 0C4.486 0 0 4.486 0 10V14.143C0 15.167 0.897 16 2 16H3C3.26522 16 3.51957 15.8946 3.70711 15.7071C3.89464 15.5196 4 15.2652 4 15V9.857C4 9.59178 3.89464 9.33743 3.70711 9.14989C3.51957 8.96236 3.26522 8.857 3 8.857H2.092C2.648 4.987 5.978 2 10 2C14.022 2 17.352 4.987 17.908 8.857H17C16.7348 8.857 16.4804 8.96236 16.2929 9.14989C16.1054 9.33743 16 9.59178 16 9.857V16C16 17.103 15.103 18 14 18H12V17H8V20H14C16.206 20 18 18.206 18 16C19.103 16 20 15.167 20 14.143V10C20 4.486 15.514 0 10 0Z" fill="#404040" />
                </svg>
              </div>
              <div className="font-medium text-[#3D3D3D]">
                + 1122 222 222 ext. 2064
              </div>
            </div>
            <div className="flex mb-5">
              <div className="flex justify-center items-center px-10">
                <Image width={"23px"} src="/img/icons/skype.png" alt="worldmap" />
              </div>
              <div className="font-medium text-[#3D3D3D]">
                Skypeaccount
              </div>
            </div>
            <div className="flex ">
              <div className="flex justify-center items-center px-10">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M12.0002 0.499984C8.91979 0.472243 5.95411 1.66736 3.75364 3.82321C1.55317 5.97907 0.297564 8.91964 0.262207 12C0.297564 15.0803 1.55317 18.0209 3.75364 20.1768C5.95411 22.3326 8.91979 23.5277 12.0002 23.5C14.3581 23.508 16.6647 22.8116 18.6242 21.5C18.7605 21.4085 18.8775 21.2911 18.9684 21.1544C19.0593 21.0178 19.1225 20.8645 19.1542 20.7035C19.1859 20.5424 19.1856 20.3767 19.1532 20.2157C19.1209 20.0548 19.0572 19.9018 18.9657 19.7655C18.8742 19.6292 18.7568 19.5122 18.6202 19.4213C18.4835 19.3303 18.3302 19.2672 18.1692 19.2355C18.0081 19.2038 17.8424 19.2041 17.6815 19.2365C17.5205 19.2688 17.3675 19.3325 17.2312 19.424C15.6836 20.4589 13.862 21.0078 12.0002 21C9.58265 21.0283 7.25252 20.0968 5.52077 18.4096C3.78902 16.7225 2.79699 14.4175 2.76221 12C2.79699 9.58251 3.78902 7.27749 5.52077 5.59035C7.25252 3.90321 9.58265 2.97167 12.0002 2.99998C14.4178 2.97167 16.7479 3.90321 18.4796 5.59035C20.2114 7.27749 21.2034 9.58251 21.2382 12V12.891C21.222 13.3952 21.0103 13.8734 20.6479 14.2244C20.2855 14.5754 19.8007 14.7717 19.2962 14.7717C18.7917 14.7717 18.3069 14.5754 17.9445 14.2244C17.5821 13.8734 17.3704 13.3952 17.3542 12.891V12C17.3729 10.937 17.0747 9.89255 16.4977 8.99963C15.9207 8.1067 15.091 7.40573 14.1142 6.986C13.1375 6.56627 12.0579 6.44678 11.0129 6.64275C9.96803 6.83871 9.0051 7.34127 8.24679 8.0864C7.48849 8.83153 6.96914 9.78551 6.7549 10.8268C6.54065 11.8681 6.64121 12.9497 7.04376 13.9336C7.44631 14.9176 8.13264 15.7595 9.01532 16.352C9.898 16.9446 10.9371 17.261 12.0002 17.261C12.7204 17.2611 13.4333 17.1166 14.0966 16.8359C14.7598 16.5552 15.3599 16.1441 15.8612 15.627C16.4364 16.3324 17.2147 16.844 18.0904 17.0922C18.9661 17.3405 19.897 17.3134 20.7569 17.0147C21.6168 16.7161 22.364 16.1602 22.8973 15.4226C23.4306 14.6849 23.7241 13.8011 23.7382 12.891V12C23.7029 8.91964 22.4472 5.97907 20.2468 3.82321C18.0463 1.66736 15.0806 0.472243 12.0002 0.499984ZM12.0002 14.761C11.4579 14.7431 10.9328 14.566 10.4905 14.2516C10.0483 13.9373 9.70832 13.4996 9.51314 12.9933C9.31796 12.487 9.27618 11.9345 9.39301 11.4046C9.50984 10.8747 9.7801 10.3909 10.1701 10.0137C10.5601 9.63638 11.0525 9.38228 11.586 9.28306C12.1195 9.18385 12.6703 9.24391 13.1699 9.45574C13.6694 9.66758 14.0956 10.0218 14.3951 10.4743C14.6946 10.9267 14.8543 11.4574 14.8542 12C14.8408 12.7442 14.5328 13.4528 13.9978 13.9703C13.4629 14.4879 12.7445 14.7722 12.0002 14.761Z" fill="#404040" />
                </svg>
              </div>
              <div className="font-medium text-[#3D3D3D]">
                support@avapartner.com
              </div>
            </div>

          </div>

          <div className="px-4 mt-5">
            <button className="w-full py-3 rounded-md text-[#2262C6] text-base font-semibold border border-[#2262C6]">
              Open a Ticket
            </button>
          </div>

        </div>

      </div>


      {/* <Stack mt="5">
        <Flex direction="row" columnGap="10px">
          <Box flex="1" bg="white" border="1px solid gray" padding="20px 16px">
            <Heading as="h6" size="xs" mb="2">
              Country Report
            </Heading>
            <DataTable data={report} columns={reportColumns} />
          </Box>
          <Box
            width="35%"
            bg="white"
            border="1px solid gray"
            padding="20px 16px"
          >
            <Heading as="h6" size="xs" mb="2">
              Your Account Manager
            </Heading>
            <Box
              display="flex"
              flexDirection="column"
              justifyContent="flex-start"
              rowGap="5px"
            >
              <Box display="flex" flexDirection="row" columnGap="5px">
                <Text width="100px" color="#8f8f8f" flex="0 0 100px">
                  Name:
                </Text>
                <Text color="#0E132B">
                  {account?.first_name} {account?.last_name}
                </Text>
              </Box>
              <Box display="flex" flexDirection="row" columnGap="5px">
                <Text width="100px" color="#8f8f8f" flex="0 0 100px">
                  Email:
                </Text>
                <Text cursor="pointer" wordBreak="break-word">
                  <Link
                    href={`mailto:${account?.mail || ""}`}
                    textDecoration="none"
                    _hover={{ textDecoration: "none" }}
                  >
                    {account?.mail}
                  </Link>
                </Text>
              </Box>
              <Box display="flex" flexDirection="row" columnGap="5px">
                <Text width="100px" color="#8f8f8f" flex="0 0 100px">
                  Skype:
                </Text>
                <Text cursor="pointer" wordBreak="break-word">
                  <Link
                    href={`skype:${account?.mail || ""}?call`}
                    textDecoration="none"
                    _hover={{ textDecoration: "none" }}
                  >
                    {account?.mail}
                  </Link>
                </Text>
              </Box>
              <Box display="flex" flexDirection="row" columnGap="5px">
                <Text width="100px" color="#8f8f8f" flex="0 0 100px">
                  Desk:
                </Text>
                <Text color="#0E132B">VIP01</Text>
              </Box>
              <Box display="flex" flexDirection="row" columnGap="5px">
                <Text width="100px" color="#8f8f8f" flex="0 0 100px">
                  Sub Affiliates Link:
                </Text>
                <Text
                  color="#f1792f"
                  fontWeight="semibold"
                  wordBreak="break-word"
                >
                  <Link href="https://go.gamingaffiliates.co/?ctag=a500-b0-p">
                    https://go.gamingaffiliates.co/?ctag=a500-b0-p
                  </Link>
                </Text>
              </Box>
              <Box display="flex" flexDirection="row" columnGap="5px">
                <Text width="100px" color="#8f8f8f" flex="0 0 100px">
                  Commission:
                </Text>
                <Text color="#069731" fontWeight="bold">
                  <Link
                    href="https://go.gamingaffiliates.co/affiliate/account.php?act=commission"
                    textDecoration="none"
                    _hover={{ textDecoration: "none" }}
                  >
                    $13,857.00
                  </Link>
                </Text>
              </Box>
              <Box mt="8">
                <Text color="#F37A20" fontWeight="semibold">
                  Need some help?{" "}
                  <Link href="https://go.gamingaffiliates.co/affiliate/tickets.php?act=new">
                    Click Here
                  </Link>
                </Text>
              </Box>
            </Box>
          </Box>
        </Flex>
      </Stack> */}
      <div className="rounded-2xl bg-white px-2 py-5 shadow-sm md:px-5 mb-5">
        <div className="text-[#2262C6] font-bold text-xl ">
          Top Performing Creative
        </div>
        <DataTable data={creative} columns={columns} />
      </div>
    </div>
  );
};

Dashboard.getLayout = Affiliates;
