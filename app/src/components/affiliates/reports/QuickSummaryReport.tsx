import { Grid, GridItem } from "@chakra-ui/react";
import { createColumnHelper } from "@tanstack/react-table";
import { useRouter } from "next/router";
import { DataTable } from "../../../components/common/data-table/DataTable";
import { QuerySelect } from "../../../components/common/QuerySelect";
import type { QuickReportSummary } from "../../../server/db-types";
import { api } from "../../../utils/api";
import { DateRangeSelect, useDateRange } from "../../common/DateRangeSelect";
import { Loading } from "../../common/Loading";

export const QuickSummaryReport = () => {
  const router = useRouter();
  const { merchant_id, display } = router.query;
  const { from, to } = useDateRange();

  const { data, isLoading } = api.affiliates.getQuickReportSummary.useQuery({
    from: from,
    to: to,
    display: display ? String(display) : undefined,
    merchant_id: merchant_id ? Number(merchant_id) : 1,
  });
  const { data: merchants } = api.affiliates.getAllMerchants.useQuery();
  const columnHelper = createColumnHelper<QuickReportSummary>();

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
    columnHelper.accessor("click-to-sale" as any, {
      cell: ({ row }) => divCol(row?.original?.FTD, row.original.Clicks),
      header: "Click to Sale",
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
      <Grid
        templateColumns="repeat(4, 1fr)"
        gap={6}
        alignContent={"center"}
        width="90%"
        alignItems={"center"}
        alignSelf="center"
      >
        <GridItem>
          <DateRangeSelect />
        </GridItem>
        <GridItem>
          <QuerySelect
            label="Search Type"
            choices={displayOptions}
            varName="display"
          />
        </GridItem>
        <GridItem>
          <QuerySelect
            label="Merchant"
            choices={merchant_options}
            varName="merchant_id"
          />
        </GridItem>
      </Grid>
      <h2>Quick Summary Report</h2>
      <Grid
        alignContent={"center"}
        alignItems={"center"}
        width="100%"
        alignSelf="center"
        overflow={"scroll"}
      >
        <DataTable data={data} columns={columns} footerData={totalObj} />
      </Grid>
    </>
  );
};
