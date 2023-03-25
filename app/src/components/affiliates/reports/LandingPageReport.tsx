import { FormLabel, Grid, GridItem, Input } from "@chakra-ui/react";
import { createColumnHelper } from "@tanstack/react-table";
import { useRouter } from "next/router";
import { useState } from "react";
import { DataTable } from "../../../components/common/data-table/DataTable";
import { QuerySelect } from "../../../components/common/QuerySelect";
import type { LandingPageReportType } from "../../../server/db-types";
import { api } from "../../../utils/api";
import { DateRangeSelect, useDateRange } from "../../common/DateRangeSelect";
import { Loading } from "../../common/Loading";

export const LandingPageReport = () => {
  const router = useRouter();
  const { merchant_id } = router.query;
  const { from, to } = useDateRange();
  const [traderID, setTraderID] = useState<string>("");

  const { data, isLoading } = api.affiliates.getLandingPageData.useQuery({
    from,
    to,
  });
  const { data: merchants } = api.affiliates.getAllMerchants.useQuery();
  const { data: countries } = api.affiliates.getLongCountries.useQuery({});
  const columnHelper = createColumnHelper<LandingPageReportType>();

  console.log("Landing Page render", {
    data,
    merchants,
    isLoading,
    from,
    to,
    merchant_id,
  });

  if (isLoading) {
    return <Loading />;
  }

  const divCol = (
    val: number | null | undefined,
    div: number | null | undefined
  ) => {
    return val ? (
      <span>{((val / (div || 1)) * 100).toFixed(2)}%</span>
    ) : (
      <span></span>
    );
  };

  const columns = [
    columnHelper.accessor("url", {
      cell: (info) => info.getValue() as string,
      header: "URL",
    }),
    columnHelper.accessor("merchant.name", {
      cell: (info) => info.getValue() as string,
      header: "Merchant",
    }),
    columnHelper.accessor("_sum.views", {
      cell: (info) => info.getValue() as number,
      header: "Impressions",
    }),
    columnHelper.accessor("_sum.clicks", {
      cell: (info) => info.getValue() as number,
      header: "Clicks",
    }),
    columnHelper.accessor("cpi", {
      cell: (info) => info.getValue() as number,
      header: "Installation",
    }),
    columnHelper.accessor("click-through-ratio" as any, {
      cell: ({ row }) =>
        divCol(row.original?._sum?.clicks, row.original._sum?.views),
      header: "Click Through Ratio (CTR)",
    }),
    columnHelper.accessor("click-to-account" as any, {
      cell: ({ row }) =>
        divCol(row.original?._sum?.clicks, row.original._sum?.views),
      header: "Click to Account",
    }),
    columnHelper.accessor("username", {
      cell: ({ row }) =>
        divCol(row.original?._sum?.clicks, row.original._sum?.views),
      header: "Click to Sale",
    }),
    columnHelper.accessor("merchant_id", {
      cell: (info) => info.getValue() as number,
      header: "EPC",
    }),
    columnHelper.accessor("lead", {
      cell: (info) => info.getValue() as number,
      header: "Lead",
    }),
    columnHelper.accessor("demo", {
      cell: (info) => info.getValue() as number,
      header: "Demo",
    }),
    columnHelper.accessor("accounts", {
      cell: (info) => info.getValue() as number,
      header: "Accounts",
    }),
    columnHelper.accessor("ftd", {
      cell: (info) => info.getValue() as number,
      header: "FTD",
    }),
    columnHelper.accessor("volume", {
      cell: (info) => info.getValue() as number,
      header: "Volume",
    }),
    columnHelper.accessor("chargeback", {
      cell: (info) => info.getValue() as number,
      header: "ChargeBack Amount",
    }),
    columnHelper.accessor("traders", {
      cell: (info) => info.getValue() as number,
      header: "Active Traders",
    }),
  ];

  const merchant_options = merchants?.map((merchant) => {
    return {
      id: merchant.id,
      title: merchant?.name,
    };
  });

  const country_options = countries?.map((country: any) => {
    return {
      id: country.id,
      title: country.title,
    };
  });

  let totalImpressions = 0;
  let totalClicks = 0;
  let totalCPIM = 0;
  let totalLeadsAccounts = 0;
  let totalDemoAccounts = 0;
  let totalRealAccounts = 0;
  let totalFTD = 0;
  const totalFTDAmount = 0;
  const totalRealFtd = 0;
  const totalRealFtdAmount = 0;
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

  const Data = data as LandingPageReportType[];
  Data?.forEach((row: LandingPageReportType) => {
    totalImpressions += row?._sum?.views;
    totalClicks += Number(row?._sum?.clicks);
    totalCPIM += Number(row?.cpi);
    totalLeadsAccounts += Number(row?.lead ?? 0);
    totalDemoAccounts += Number(row?.demo ?? 0);
    totalRealAccounts += Number(row?.real ?? 0);
    totalFTD += Number(row?.ftd ?? 0);
    totalDeposits += Number(row?.deposit ?? 0);
    totalDepositAmount += Number(row?.depositsAmount ?? 0);
    totalVolume += Number(row?.volume ?? 0);
    totalBonus += Number(row?.bonus ?? 0);
    totalWithdrawal += Number(row?.withdrawal ?? 0);
    totalChargeback += Number(row?.chargeBack ?? 0);
    totalNetRevenue += Number(row?.netDeposit ?? 0);
    totalFooterPNL += Number(row?.pnl ?? 0);
    totalActiveTraders += Number(row?.activeTrader ?? 0);
    totalComs += row?.Commission ?? 0;
  });

  const totalObj = [];
  totalObj.push({
    URL: "",
    totalImpressions,
    totalClicks,
    totalCPIM,
    totalCTR: `${((totalClicks / totalImpressions) * 100).toFixed(2)}%`,
    totalCTA: `${((totalRealAccounts / totalClicks) * 100).toFixed(2)}%`,
    totalCTS: `${((totalFTD / totalClicks) * 100).toFixed(2)}%`,
    totalLeadsAccounts,
    totalDemoAccounts,
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
            label="Merchant"
            choices={merchant_options}
            varName="merchant_id"
          />
        </GridItem>
        <GridItem>
          <QuerySelect
            label="Country"
            choices={country_options}
            varName="country"
          />
        </GridItem>
        <GridItem>
          <FormLabel>Trader ID</FormLabel>
          <Input
            value={traderID}
            onChange={(event) => setTraderID(event.target.value)}
          />
        </GridItem>
      </Grid>
      <h2>Landing Page Report</h2>
      <Grid
        alignContent={"center"}
        alignItems={"center"}
        width="100%"
        alignSelf="center"
        overflow={"scroll"}
      >
        <DataTable
          data={Object.values(data || {})}
          columns={columns}
          footerData={totalObj}
        />
      </Grid>
    </>
  );
};
