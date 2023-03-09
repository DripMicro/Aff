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

import { useEffect, useState } from "react";

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
import { DateRangeSelect, useDateRange } from "../../common/DateRangeSelect";
import {
  AcauisitionIcon,
  ClicksIcon,
  ComissionIcon,
  SignupIcon,
} from "../../icons";

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
  const { data: creative } = api.affiliates.getTopMerchantCreative.useQuery();
  const { data: report } = api.affiliates.getCountryReport.useQuery();
  const { data: reportsHiddenCols } =
    api.affiliates.getReportsHiddenCols.useQuery();
  const { data: account, refetch } = api.affiliates.getAccount.useQuery();
  const upsertReportsField = api.affiliates.upsertReportsField.useMutation();

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
    <Container maxW="container.lg" py="4">
      <Heading as="h4" size="md">
        Affiliate Program Dashboard
      </Heading>
      <Flex
        display="flex"
        justifyContent="flex-end"
        columnGap="10px"
        marginTop="20px"
      >
        <DateRangeSelect />
      </Flex>
      <Flex justifyContent="space-between" alignItems="center" mt="3">
        <Heading as="h5" size="sm">
          Merchants Performance
        </Heading>
        <IconButton
          variant="outline"
          colorScheme="#0E132B"
          size="sm"
          aria-label="Setting"
          icon={<SettingsIcon />}
          onClick={onOpen}
        />
        <Modal isOpen={isOpen} onClose={onClose} size="2xl">
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>
              <Text fontSize="md">Manage Field On Report - Data</Text>
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Grid templateColumns="repeat(3, 1fr)" gap={6} mt="3">
                {reportFields.map((field) => {
                  return (
                    <GridItem w="100%" key={field.id}>
                      <FormControl display="flex" alignItems="center">
                        <Switch
                          id={`report-field-${field.id}`}
                          isChecked={field.isChecked}
                          value={field.id}
                          onChange={(e) => void handleReportField(e)}
                        />
                        <FormLabel
                          htmlFor={`report-field-${field.id}`}
                          mb="0"
                          mr="0"
                          ml="2"
                          fontSize="sm"
                        >
                          {field.title}
                        </FormLabel>
                      </FormControl>
                    </GridItem>
                  );
                })}
              </Grid>
            </ModalBody>

            <ModalFooter>
              <Button colorScheme="blue" size="sm" onClick={onClose}>
                Close
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Flex>
      <SimpleGrid minChildWidth="200px" spacing="15px" mt="3">
        {reportFields
          .filter((item) => item.isChecked === true)
          .map((item) => {
            interface Sum {
              [index: string]: number;
            }
            const sumObject = data[0]?._sum as Sum;
            console.log(sumObject);
            const value = sumObject ? sumObject[item.value] : 0;

            const icon = () => {
              let result;
              switch (item.title) {
                case "Clicks":
                  result = <ClicksIcon width="40" height="40" fill="#0E132B" />;
                  break;

                case "Real Account":
                  result = <SignupIcon width="40" height="40" fill="#0E132B" />;
                  break;

                case "Active Trader":
                  result = (
                    <AcauisitionIcon width="40" height="40" fill="#0E132B" />
                  );
                  break;

                case "Commission":
                  result = (
                    <ComissionIcon width="40" height="40" fill="#0E132B" />
                  );
                  break;

                default:
                  result = <SignupIcon width="40" height="40" fill="#0E132B" />;
                  break;
              }
              return result;
            };
            return (
              <Box
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
                _hover={{
                  borderColor: "#069731",
                  cursor: "pointer",
                }}
              >
                {icon()}
                {/* <ClicksIcon width="40" height="40" fill="#0E132B" /> */}
                <Box>
                  <Text fontSize="md" fontWeight="normal" color="#0E132B">
                    {item.title}
                  </Text>
                  <Text fontSize="lg" fontWeight="bold">
                    {value}
                  </Text>
                </Box>
              </Box>
            );
          })}
      </SimpleGrid>
      <Stack mt="8">
        <Tabs>
          <Flex direction="row" alignItems="center">
            <TabList>
              <Tab>Performace Chart</Tab>
              <Tab>Conversion Chart</Tab>
            </TabList>
          </Flex>
          <TabPanels>
            <TabPanel>
              <AreaChart
                data={performanceChart}
                categories={["Accounts", "Active Traders"]}
                dataKey="date"
                height="h-72"
                colors={["indigo", "cyan"]}
                valueFormatter={performanceFormatter}
                marginTop="mt-4"
              />
            </TabPanel>
            <TabPanel>
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
      <Stack mt="5">
        <Flex direction="row" columnGap="10px">
          <Box flex="1" bg="white" border="1px solid gray" padding="20px 16px">
            <Heading as="h6" size="xs" mb="2">
              Country Report
            </Heading>
            <DataTable data={report} columns={reportColumns} footerData={[]} />
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
      </Stack>
      <Stack mt="5">
        <Heading as="h6" size="xs" mb="2">
          Top Performing Creative
        </Heading>
        <DataTable data={creative} columns={columns} footerData={[]} />
      </Stack>
    </Container>
  );
};
