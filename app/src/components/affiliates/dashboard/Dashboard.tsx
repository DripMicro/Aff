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
  console.log("performanceChart");
  console.log(performanceChart);
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

      {/* <div
        className="mt-6 rounded-2xl bg-white shadow-sm px-2 md:px-6 pt-5 pb-2 "
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
                <div className="mt-5">
                  <PerformanceChart performanceChartData={performanceChart} />
                  <div className="w-full h-96" ref={squareRef}>
                    <p>{`The square width is ${width}px and height ${height}px`}</p>
                    <ConversionChart />
                  </div>
                </div>
              </TabPanel>
              <TabPanel>
                <div className="w-full h-96">
                  <ConversionChart />
                </div>
                <LineChart
                  data={conversionChart}
                  dataKey="date"
                  categories={["Conversions"]}
                  colors={["blue"]}
                  valueFormatter={conversionFormatter}
                  marginTop="mt-6"
                  yAxisWidth="w-10"
                />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Stack>
      </div> */}
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
      {/* <Stack mt="5">
        <Heading as="h6" size="xs" mb="2">
          Top Performing Creative
        </Heading>
        <DataTable data={creative} columns={columns} />
      </Stack> */}
    </div>
  );
};

Dashboard.getLayout = Affiliates;
