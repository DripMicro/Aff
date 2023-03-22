import { FormLabel, Grid, GridItem, Input } from "@chakra-ui/react";
import { createColumnHelper } from "@tanstack/react-table";
import { useRouter } from "next/router";
import { useState } from "react";
import { DataTable } from "../../../components/common/data-table/DataTable";
import { QuerySelect } from "../../../components/common/QuerySelect";
import type { InstallReportType } from "../../../server/db-types";
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
  const columnHelper = createColumnHelper<InstallReportType>();

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

  console.log("countries ----->", countries);

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
          footerData={[]}
        />
      </Grid>
    </>
  );
};
