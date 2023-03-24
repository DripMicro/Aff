import {
  Grid, GridItem, useDisclosure, ModalContent, Modal,
  ModalBody, ModalOverlay, Image, SimpleGrid, Box, FormLabel, FormControl
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

export const QuickSummaryReport = () => {
  const router = useRouter();
  const { merchant_id, display } = router.query;
  const [reportFields, setReportFields] = useState<
    { id: number; title: string; value: string; isChecked: boolean }[]
  >([]);
  const { from, to } = useDateRange();

  const { data, isLoading } = api.affiliates.getQuickReportSummary.useQuery({
    from: from,
    to: to,
    display: display ? String(display) : undefined,
    merchant_id: merchant_id ? Number(merchant_id) : 1,
  });
  const { data: merchants } = api.affiliates.getAllMerchants.useQuery();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const columnHelper = createColumnHelper<QuickReportSummary>();
  const { data: reportsHiddenCols } =
    api.affiliates.getReportsHiddenCols.useQuery();

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


  console.log("QuickSummaryReport render", {
    data,
    merchants,
    isLoading,
    from,
    to,
    display,
    merchant_id,
  });

  if (isLoading) {
    return <Loading />;
  }

  const divCol = (
    val: number | null | undefined,
    div: number | null | undefined
  ) => {
    return val && div ? (
      <span>{((val / div) * 100).toFixed(2)}%</span>
    ) : (
      <span>N/A</span>
    );
  };

  const columns = [
    columnHelper.accessor("merchant_id", {
      cell: (info) => info.getValue(),
      header: "Merchant",
    }),
    columnHelper.accessor("Impressions", {
      cell: (info) => info.getValue(),
      header: "Impressions",
    }),
    columnHelper.accessor("Clicks", {
      cell: (info) => info.getValue(),
      header: "Clicks",
    }),
    columnHelper.accessor("Install", {
      cell: (info) => info.getValue(),
      header: "Installation",
      // meta: {
      //   isNumeric: true,
      // },
    }),
    columnHelper.accessor("click-through-ratio" as any, {
      cell: ({ row }) =>
        divCol(row?.original?.Clicks, row.original.Impressions),
      header: "Click Through Ratio(CTR)",
    }),
    columnHelper.accessor("click-to-account" as any, {
      cell: ({ row }) =>
        divCol(row?.original?.RealAccount, row.original.Clicks),
      header: "Click to Account",
    }),
    columnHelper.accessor("Leads", {
      cell: ({ row }) => divCol(row?.original?.FTD, row.original.Clicks),
      header: "Click to Sale",
    }),
    columnHelper.accessor("Demo", {
      cell: (info) => info.getValue(),
      header: "Demo",
    }),
    columnHelper.accessor("RealAccount", {
      cell: (info) => info.getValue(),
      header: "Accounts",
    }),
    columnHelper.accessor("FTD", {
      cell: (info) => info.getValue(),
      header: "FTD",
    }),
    columnHelper.accessor("Volume", {
      cell: (info) => info.getValue(),
      header: "Volume",
    }),
    columnHelper.accessor("Withdrawal", {
      cell: (info) => info.getValue(),
      header: "Withdrawal Amount",
    }),
    columnHelper.accessor("ChargeBack", {
      cell: (info) => info.getValue(),
      header: "ChargeBack Amount",
    }),
    columnHelper.accessor("ActiveTrader", {
      cell: (info) => info.getValue(),
      header: "Active Traders",
    }),
    columnHelper.accessor("Commission", {
      cell: ({ row }) => {
        // console.log("row ---->", row);
        return <span>{row?.original?.Commission?.toFixed(2)}</span>;
      },
      header: "Commission",
    }),
  ];

  const merchant_options = merchants?.map((merchant) => {
    return {
      id: merchant.id,
      title: merchant?.name,
    };
  });

  const displayOptions = [
    {
      id: "monthly",
      title: "monthly",
    },
    {
      id: "weekly",
      title: "weekly",
    },
    {
      id: "daily",
      title: "daily",
    },
  ];

  return (
    <>
      <div className="pt-3.5">
        <div className="block text-base font-medium md:justify-between lg:flex">
          <div className="mb-2.5 flex justify-between items-center md:mb-5 lg:mb-5 ">
            <div>
              <span className="text-[#2262C6]">Affliate Program</span>
              &nbsp;-&nbsp;Quick Summary Report
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
        </div>

        <div>
          <div className="flex justify-between items-center">
            <div className="flex">
              <button
                className="rounded-md bg-white drop-shadow px-2 pt-0.5 pb-1 lg:px-3 lg:pt-1.5 lg:pb-2 "
                onClick={onOpen}
              >
                <SettingsIcon />
              </button>
              <span className="hidden ml-3 lg:flex justify-between items-center font-medium font-sm">
                Report Display
              </span>
            </div>
            <div className="hidden lg:block">
              <DateRangeSelect />
            </div>
            <div className="flex space-x-2 lg:hidden">
              <button className="rounded-md bg-[#2262C6] px-4 py-1 text-white">
                Show Reports
              </button>
              <button className="py-1 px-4 rounded-md text-[#2262C6] text-base font-semibold border border-[#2262C6]">
                Open a Ticket
              </button>
              <button className="rounded-md bg-[#2262C6] px-1 py-1 text-white">
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="24" viewBox="0 0 28 24" fill="none">
                  <path d="M13.5701 16L18.0933 11H14.7009V4H12.4393V11H9.04688L13.5701 16Z" fill="white" />
                  <path d="M22.6161 18H4.52332V11H2.26172V18C2.26172 19.103 3.27605 20 4.52332 20H22.6161C23.8634 20 24.8778 19.103 24.8778 18V11H22.6161V18Z" fill="white" />
                </svg>
              </button>
            </div>
          </div>
        </div>
        <div className="lg:flex justify-between items-end mt-2">
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-5">
            <QuerySelect
              label="Search Type"
              choices={displayOptions}
              varName="display"
            />
            <QuerySelect
              label="Merchant"
              choices={merchant_options}
              varName="merchant_id"
            />
            <QuerySelect
              label="Merchant"
              choices={merchant_options}
              varName="merchant_id"
            />
            <QuerySelect
              label="Merchant"
              choices={merchant_options}
              varName="merchant_id"
            />
            <QuerySelect
              label="Merchant"
              choices={merchant_options}
              varName="merchant_id"
            />
          </div>
          <div className="flex space-x-2">
            <button className="hidden rounded-md bg-[#2262C6] px-8 py-2 text-white lg:block">
              Show Reports
            </button>
            <button className="hidden py-2 px-8 rounded-md text-[#2262C6] text-base font-semibold border border-[#2262C6] lg:block">
              Open a Ticket
            </button>
            <button className="hidden rounded-md bg-[#2262C6] px-2 py-2 text-white lg:block">
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="24" viewBox="0 0 28 24" fill="none">
                <path d="M13.5701 16L18.0933 11H14.7009V4H12.4393V11H9.04688L13.5701 16Z" fill="white" />
                <path d="M22.6161 18H4.52332V11H2.26172V18C2.26172 19.103 3.27605 20 4.52332 20H22.6161C23.8634 20 24.8778 19.103 24.8778 18V11H22.6161V18Z" fill="white" />
              </svg>
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
        <div className="rounded bg-white px-2 py-4 shadow-sm mb-5 mt-4">
          <Grid
            alignContent={"center"}
            alignItems={"center"}
            width="100%"
            alignSelf="center"
            overflow={"scroll"}
          >
            <DataTable data={data} columns={columns} />
          </Grid>
        </div>
      </div>
    </>
  );
};
