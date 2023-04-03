import { createColumnHelper } from "@tanstack/react-table";
import { useRouter } from "next/router";
import { ReportDataTable } from "../../../components/common/data-table/Report_DataTable";
import { QuerySelect } from "../../../components/common/QuerySelect";
import type { QuickReportSummary } from "../../../server/db-types";
import { api } from "../../../utils/api";
import { DateRangeSelect, useDateRange } from "../../common/DateRangeSelect";
import { Loading } from "../../common/Loading";
import { useRef, useEffect, useState } from "react";
import type { ChangeEvent } from "react";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger
} from "../../ui/dialog";
import { Button } from "../../ui/button";

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
    columnHelper.accessor("Leads", {
      cell: (info) => info.getValue(),
      header: "Leads",
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
    columnHelper.accessor("click-to-sale" as any, {
      cell: ({ row }) => divCol(row?.original?.FTD, row.original.Clicks),
      header: "Click to Sale",
    }),

    columnHelper.accessor("Volume", {
      cell: (info) => info.getValue(),
      header: "Volume",
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

  let totalImpressions = 0;
  let totalClicks = 0;
  let totalCPIM = 0;
  let totalLeadsAccounts = 0;
  let totalDemoAccounts = 0;
  let totalRealAccounts = 0;
  let totalFTD = 0;
  let totalFTDAmount = 0;
  let totalRealFtd = 0;
  let totalRealFtdAmount = 0;
  let totalDeposits = 0;
  let totalDepositAmount = 0;
  let totalVolume = 0;
  let totalBonus = 0;
  let totalWithdrawal = 0;
  let totalChargeback = 0;
  let totalNetRevenue = 0;
  let totalFooterPNL = 0;
  let totalActiveTraders = 0;
  let totalComs = 0;

  data?.forEach((row: any) => {
    totalImpressions += row?.Impressions;
    totalClicks += Number(row?.Clicks);
    totalCPIM += Number(row?.Install);
    totalLeadsAccounts += Number(row?.Leads);
    totalDemoAccounts += Number(row?.Demo);
    totalRealAccounts += Number(row?.RealAccount);
    totalFTD += Number(row?.FTD);
    totalFTDAmount += Number(row?.FTDAmount);
    totalRealFtd += Number(row?.RawFTD);
    totalRealFtdAmount += Number(row?.RawFTDAmount);
    totalDeposits += Number(row?.Deposits);
    totalDepositAmount += Number(row?.DepositsAmount);
    totalVolume += Number(row?.Volume);
    totalBonus += Number(row?.Bonus);
    totalWithdrawal += Number(row?.Withdrawal);
    totalChargeback += Number(row?.ChargeBack);
    totalNetRevenue += Number(row?.NetDeposit);
    totalFooterPNL += Number(row?.PNL);
    totalActiveTraders += Number(row?.ActiveTrader);
    totalComs += row?.Commission;
  });

  const totalObj = [];
  totalObj.push({
    totalImpressions,
    totalClicks,
    totalCPIM,
    totalCTR: `${((totalClicks / totalImpressions) * 100).toFixed(2)}%`,
    totalCTA: `${((totalRealAccounts / totalClicks) * 100).toFixed(2)}%`,
    totalCTS: `${((totalFTD / totalClicks) * 100).toFixed(2)}%`,
    totalLeadsAccounts,
    totalDemoAccounts,
    totalRealAccounts,
    totalFTD,
    totalVolume,
    totalWithdrawal,
    totalChargeback,
    totalActiveTraders,
    totalComs,
  });

  return (
    <>
      <div className="pt-3.5 w-full">
        <div className="block text-base font-medium md:justify-between lg:flex">
          <div className="mb-2.5 flex items-center justify-between md:mb-5 lg:mb-5 ">
            <div>
              <span className="text-[#2262C6]">Affliate Program</span>
              &nbsp;-&nbsp;Quick Summary Report
            </div>
            <Button className="lg:hidden">
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
            </Button>
          </div>
        </div>
        <Dialog>
          <div>
            <div className="flex items-center justify-between">
              <div className="flex">
                <DialogTrigger>
                  <Button variant="white" size="rec-sm">
                    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7.07095 0.650238C6.67391 0.650238 6.32977 0.925096 6.24198 1.31231L6.0039 2.36247C5.6249 2.47269 5.26335 2.62363 4.92436 2.81013L4.01335 2.23585C3.67748 2.02413 3.23978 2.07312 2.95903 2.35386L2.35294 2.95996C2.0722 3.2407 2.0232 3.6784 2.23493 4.01427L2.80942 4.92561C2.62307 5.2645 2.47227 5.62594 2.36216 6.00481L1.31209 6.24287C0.924883 6.33065 0.650024 6.6748 0.650024 7.07183V7.92897C0.650024 8.32601 0.924883 8.67015 1.31209 8.75794L2.36228 8.99603C2.47246 9.375 2.62335 9.73652 2.80979 10.0755L2.2354 10.9867C2.02367 11.3225 2.07267 11.7602 2.35341 12.041L2.95951 12.6471C3.24025 12.9278 3.67795 12.9768 4.01382 12.7651L4.92506 12.1907C5.26384 12.377 5.62516 12.5278 6.0039 12.6379L6.24198 13.6881C6.32977 14.0753 6.67391 14.3502 7.07095 14.3502H7.92809C8.32512 14.3502 8.66927 14.0753 8.75705 13.6881L8.99505 12.6383C9.37411 12.5282 9.73573 12.3773 10.0748 12.1909L10.986 12.7653C11.3218 12.977 11.7595 12.928 12.0403 12.6473L12.6464 12.0412C12.9271 11.7604 12.9761 11.3227 12.7644 10.9869L12.1902 10.076C12.3768 9.73688 12.5278 9.37515 12.638 8.99596L13.6879 8.75794C14.0751 8.67015 14.35 8.32601 14.35 7.92897V7.07183C14.35 6.6748 14.0751 6.33065 13.6879 6.24287L12.6381 6.00488C12.528 5.62578 12.3771 5.26414 12.1906 4.92507L12.7648 4.01407C12.9766 3.6782 12.9276 3.2405 12.6468 2.95975L12.0407 2.35366C11.76 2.07292 11.3223 2.02392 10.9864 2.23565L10.0755 2.80989C9.73622 2.62328 9.37437 2.47229 8.99505 2.36209L8.75705 1.31231C8.66927 0.925096 8.32512 0.650238 7.92809 0.650238H7.07095ZM4.92053 3.81251C5.44724 3.44339 6.05665 3.18424 6.71543 3.06839L7.07095 1.50024H7.92809L8.28355 3.06816C8.94267 3.18387 9.5524 3.44302 10.0794 3.81224L11.4397 2.9547L12.0458 3.56079L11.1882 4.92117C11.5573 5.44798 11.8164 6.0575 11.9321 6.71638L13.5 7.07183V7.92897L11.932 8.28444C11.8162 8.94342 11.557 9.55301 11.1878 10.0798L12.0453 11.4402L11.4392 12.0462L10.0787 11.1886C9.55192 11.5576 8.94241 11.8166 8.28355 11.9323L7.92809 13.5002H7.07095L6.71543 11.932C6.0569 11.8162 5.44772 11.5572 4.92116 11.1883L3.56055 12.046L2.95445 11.4399L3.81213 10.0794C3.4431 9.55266 3.18403 8.94326 3.06825 8.2845L1.50002 7.92897V7.07183L3.06818 6.71632C3.18388 6.05765 3.44283 5.44833 3.81171 4.92165L2.95398 3.561L3.56008 2.95491L4.92053 3.81251ZM9.02496 7.50008C9.02496 8.34226 8.34223 9.02499 7.50005 9.02499C6.65786 9.02499 5.97513 8.34226 5.97513 7.50008C5.97513 6.65789 6.65786 5.97516 7.50005 5.97516C8.34223 5.97516 9.02496 6.65789 9.02496 7.50008ZM9.92496 7.50008C9.92496 8.83932 8.83929 9.92499 7.50005 9.92499C6.1608 9.92499 5.07513 8.83932 5.07513 7.50008C5.07513 6.16084 6.1608 5.07516 7.50005 5.07516C8.83929 5.07516 9.92496 6.16084 9.92496 7.50008Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg>
                  </Button>
                </DialogTrigger>
                <span className="font-sm ml-3 hidden items-center justify-between font-medium lg:flex">
                  Report Display
                </span>
              </div>
              <div className="hidden lg:block">
                <DateRangeSelect />
              </div>
              <div className="flex space-x-2 lg:hidden">
                <Button variant="primary">
                  Show Reports
                </Button>
                <Button variant="primary-outline">
                  Reset Search
                </Button>
                <Button>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="28"
                    height="24"
                    viewBox="0 0 28 24"
                    fill="none"
                  >
                    <path
                      d="M13.5701 16L18.0933 11H14.7009V4H12.4393V11H9.04688L13.5701 16Z"
                      fill="white"
                    />
                    <path
                      d="M22.6161 18H4.52332V11H2.26172V18C2.26172 19.103 3.27605 20 4.52332 20H22.6161C23.8634 20 24.8778 19.103 24.8778 18V11H22.6161V18Z"
                      fill="white"
                    />
                  </svg>
                </Button>
              </div>
            </div>
          </div>
          <div className="mt-2 items-end justify-between lg:flex">
            <div className="grid grid-cols-2 gap-4 lg:grid-cols-5">
              <QuerySelect
                label="Period"
                choices={displayOptions}
                varName="display"
              />
              <QuerySelect
                label="From"
                choices={merchant_options}
                varName="merchant_id"
              />
              <QuerySelect
                label="To"
                choices={merchant_options}
                varName="merchant_id"
              />
              <QuerySelect
                label="Merchant"
                choices={merchant_options}
                varName="merchant_id"
              />
              <QuerySelect
                label="Search Type"
                choices={displayOptions}
                varName="display"
              />
            </div>
            <div className="flex space-x-2">
              <button className="hidden rounded-md bg-[#2262C6] px-8 py-2 text-white lg:block">
                Show Reports
              </button>
              <button className="hidden rounded-md border border-[#2262C6] py-2 px-8 text-base font-semibold text-[#2262C6] lg:block">
                Reset Search
              </button>
              <button className="hidden rounded-md bg-[#2262C6] px-2 py-2 text-white lg:block">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="28"
                  height="24"
                  viewBox="0 0 28 24"
                  fill="none"
                >
                  <path
                    d="M13.5701 16L18.0933 11H14.7009V4H12.4393V11H9.04688L13.5701 16Z"
                    fill="white"
                  />
                  <path
                    d="M22.6161 18H4.52332V11H2.26172V18C2.26172 19.103 3.27605 20 4.52332 20H22.6161C23.8634 20 24.8778 19.103 24.8778 18V11H22.6161V18Z"
                    fill="white"
                  />
                </svg>
              </button>
            </div>
          </div>

          <DialogContent>
            <DialogHeader className="text-sm font-medium text-azure text-left">Manage Field On Report - Quick Summary</DialogHeader>
            <DialogTitle className="md:mb-6 font-normal md:pt-2 text-sm text-disabled">Please activate the fields you want to display on the report:</DialogTitle>
            <div className="grid grid-cols-1 md:grid-cols-2 md:mt-10">
              {reportFields.map((field) => {
                return (
                  <div key={field.id}>
                    <div className="flex items-center mb-6 md:mb-10">
                      <input
                        type="checkbox"
                        id={`report-field-${field.id}`}
                        checked={field.isChecked}
                        value={field.id}
                        onChange={(e) => void handleReportField(e)}
                        className="form-checkbox text-blueGray-700 h-4 w-4 rounded border-0 transition-all duration-150 ease-linear"
                      />
                      <div className="ml-5 md:ml-10 text-black text-lg font-medium items-center">
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
            </div>
          </DialogContent>
        </Dialog>

        <div className="mb-5 mt-4 rounded bg-white px-2 py-4 shadow-sm w-full overflow-scroll">
          <ReportDataTable
            data={data}
            columns={columns}
            reportFields={reportFields}
          />
        </div>
      </div>
    </>
  );
};
