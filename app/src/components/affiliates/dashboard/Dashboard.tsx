import { SettingsIcon } from "@chakra-ui/icons";
import { createColumnHelper } from "@tanstack/react-table";
import { useEffect, useState } from "react";
import ConversionChart from "../../common/chart/ConversionChart";
import DashboardChart from "../../common/chart/DashboardChart";
import PerformanceChart from "../../common/chart/PerformanceChart";
import { Button } from "../../ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../ui/tabs";
import AccountManager from "./AccountManager";
import CountryReport from "./CountryReport";
import DeviceReport from "./DeviceReport";

import type { TopMerchantCreativeType } from "../../../server/db-types";
import { api } from "../../../utils/api";

import type { ChangeEvent } from "react";

import {
  DateRangeSelect,
  useDateRange,
  useDateRangeDefault,
} from "../../common/DateRangeSelect";

import { Loading } from "@/components/common/Loading";
import { Home } from "lucide-react";
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

export const Dashboard = () => {
  const { from, to } = useDateRange();

  const [reportFields, setReportFields] = useState<
    { id: number; title: string; value: string; isChecked: boolean }[]
  >([]);

  const { data } = api.affiliates.getDashboard.useQuery({
    from,
    to,
  });

  const { data: lastMonthData } = api.affiliates.getDashboard.useQuery(
    useDateRangeDefault("last-month")
  );

  const { data: thisMonthData } = api.affiliates.getDashboard.useQuery(
    useDateRangeDefault("month-to-date")
  );

  const { data: performanceChart } =
    api.affiliates.getPerformanceChart.useQuery({ from, to });

  const { data: perAllformanceChart } =
    api.affiliates.getAllPerformanceChart.useQuery({ from, to });

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

  if (
    !data ||
    !creative ||
    !report ||
    !performanceChart ||
    !perAllformanceChart ||
    !conversionChart ||
    !lastMonthData ||
    !thisMonthData
  ) {
    return <Loading />;
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
          <img
            className="w-44 bg-cover md:w-full"
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
    const hiddenCols = value.filter((item) => !item.isChecked);
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
      <Dialog>
        <div className="block text-base font-medium md:justify-between lg:flex">
          <div className="mb-2.5 flex items-center md:mb-5 lg:mb-5">
            <Home className="text-[#2262C6]" />
            &nbsp;/&nbsp;Dashboard
          </div>
          <div className="mb-2.5 flex">
            <DateRangeSelect />
            <Button className="ml-2 hidden lg:block" variant="primary">
              Update
            </Button>
            <DialogTrigger>
              <button className="ml-2 rounded-md bg-white px-2 drop-shadow md:px-3 md:pt-1.5 md:pb-2">
                <SettingsIcon />
              </button>
            </DialogTrigger>
          </div>
          <div className="grid justify-items-stretch lg:hidden">
            <Button className="mb-2 justify-self-end" variant="primary">
              Update
            </Button>
          </div>
        </div>

        <DialogContent>
          <DialogHeader className="text-left text-sm font-medium text-azure">
            Manage Field On Report - Quick Summary
          </DialogHeader>
          <DialogTitle className="text-sm font-normal text-disabled md:mb-6 md:pt-2">
            Please activate the fields you want to display on the report:
          </DialogTitle>
          <div className="grid grid-cols-1 md:mt-10 md:grid-cols-2">
            {reportFields.map((field) => {
              return (
                <div key={field.id}>
                  <div className="mb-6 flex items-center md:mb-10">
                    <input
                      type="checkbox"
                      id={`report-field-${field.id}`}
                      checked={field.isChecked}
                      value={field.id}
                      onChange={(e) => void handleReportField(e)}
                      className="form-checkbox text-blueGray-700 h-4 w-4 rounded border-0 transition-all duration-150 ease-linear"
                    />
                    <div className="ml-5 items-center text-lg font-medium text-black md:ml-10">
                      {field.title}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="flex justify-between pb-5 font-medium md:pb-8 md:pt-12">
            <div className="flex">
              <button
                className="mr-3 rounded-md bg-[#2262C6] p-3 text-white md:px-14"
                onClick={handleSelectAll}
              >
                Select All
              </button>
              <button
                className="rounded-md border border-[#1B48BB] bg-[#EFEEFF] p-3 text-[#1B48BB] md:px-12"
                onClick={handleUnSelectAll}
              >
                Unselect All
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <div className="grid grid-cols-2 gap-5 lg:grid-cols-4">
        {reportFields
          .filter((item) => item.isChecked)
          .map((item, idx) => {
            interface Sum {
              [index: string]: number;
            }
            const sumObject = data[0]?._sum as Sum;
            const value = sumObject ? sumObject[item.value] : 0;
            const lastMonthObject = lastMonthData[0]?._sum as Sum;
            const lastMonth = lastMonthObject ? lastMonthObject[item.value] : 0;
            const thisMonthObject = thisMonthData[0]?._sum as Sum;
            const thisMonth = thisMonthObject ? thisMonthObject[item.value] : 0;

            return (
              <div
                key={idx}
                className="rounded-2xl bg-white px-2 pt-3 pb-2 shadow-sm md:px-6"
              >
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
                    <DashboardChart
                      performanceChartData={perAllformanceChart}
                      value={item.value}
                    />
                  </div>
                </div>
              </div>
            );
          })}
      </div>

      <div className="my-6 rounded-2xl bg-white px-2 py-5 shadow-sm md:px-6">
        <Tabs defaultValue="Performance">
          <TabsList>
            <TabsTrigger value="Performance">Performace Chart</TabsTrigger>
            <TabsTrigger value="conversion">Conversion Chart</TabsTrigger>
          </TabsList>
          <TabsContent className="border-0" value="Performance">
            <div className="mt-5 h-80 pb-5">
              <PerformanceChart performanceChartData={performanceChart} />
            </div>
          </TabsContent>
          <TabsContent className="border-0" value="conversion">
            <div className="mt-5 h-80  pb-5">
              <ConversionChart conversionChartData={conversionChart} />
            </div>
          </TabsContent>
        </Tabs>
      </div>

      <div className="my-6 grid grid-cols-1 gap-5 lg:grid-cols-3">
        <DeviceReport />
        <CountryReport />
        <AccountManager
          first_name={account?.first_name}
          last_name={account?.last_name}
          mail={account?.mail}
        />
      </div>
      {/*  Top Performing Creative Commented for a while will be added later */}
      {/* <div className="mb-5 rounded-2xl bg-white px-2 py-5 shadow-sm md:px-5">
        <div className="text-xl font-bold text-[#2262C6] ">
          Top Performing Creative
        </div>
        <DataTable data={creative} columns={columns} />
      </div> */}
    </div>
  );
};

Dashboard.getLayout = Affiliates;
