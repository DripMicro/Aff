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

export const CreativeReport = () => {
  const router = useRouter();
  const { merchant_id } = router.query;
  const { from, to } = useDateRange();
  const [traderID, setTraderID] = useState<string>("");

  const { data, isLoading } = api.affiliates.getCreativeReport.useQuery({
    from,
    to,
  });
  const { data: merchants } = api.affiliates.getAllMerchants.useQuery();
  const columnHelper = createColumnHelper<InstallReportType>();

  console.log("Install render", {
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
    columnHelper.accessor("banner_id", {
      cell: (info) => info.getValue() as number,
      header: "Creative ID",
    }),
    columnHelper.accessor("title", {
      cell: (info) => info.getValue() as string,
      header: "Creative Name",
    }),
    columnHelper.accessor("name", {
      cell: (info) => info.getValue() as string,
      header: "Merchant",
    }),
    columnHelper.accessor("type", {
      cell: (info) => info.getValue() as string,
      header: "Type",
    }),
    columnHelper.accessor("totalViews", {
      cell: (info) => info.getValue() as string,
      header: "Impressions",
    }),
    columnHelper.accessor("totalClicks", {
      cell: (info) => info.getValue() as string,
      header: "Clicks",
    }),
    columnHelper.accessor("cpi_amount", {
      cell: (info) => info.getValue() as number,
      header: "Installation",
    }),
    columnHelper.accessor("ctr" as any, {
      cell: ({ row }) =>
        divCol(row?.original?.totalClicks, row.original.totalViews),
      header: "Click Through Ratio (CTR)",
    }),
    columnHelper.accessor("click-to-account" as any, {
      cell: ({ row }) =>
        divCol(row?.original?.total_real, row.original.totalClicks),
      header: "Click to Account",
    }),
    columnHelper.accessor("click-to-sale" as any, {
      cell: ({ row }) => divCol(row?.original?.ftd, row.original.totalClicks),
      header: "Click to Sale",
    }),
    columnHelper.accessor("leads", {
      cell: (info) => info.getValue() as number,
      header: "Leads",
    }),
    columnHelper.accessor("demo", {
      cell: (info) => info.getValue() as string,
      header: "Demo",
    }),
    columnHelper.accessor("accounts", {
      cell: (info) => info.getValue() as string,
      header: "Accounts",
    }),
    columnHelper.accessor("ftd", {
      cell: (info) => info.getValue() as string,
      header: "FTD",
    }),
    columnHelper.accessor("volume", {
      cell: (info) => info.getValue() as string,
      header: "Volume",
    }),
    columnHelper.accessor("withdrawal", {
      cell: (info) => info.getValue() as string,
      header: "Withdrawal Amount",
    }),
    columnHelper.accessor("chargeback", {
      cell: (info) => info.getValue() as string,
      header: "ChargeBack Amount",
    }),
  ];

  const merchant_options = merchants?.map((merchant) => {
    return {
      id: merchant.id,
      title: merchant?.name,
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
          <FormLabel>Trader ID</FormLabel>
          <Input
            value={traderID}
            onChange={(event) => setTraderID(event.target.value)}
          />
        </GridItem>
      </Grid>
      <h2>Creative Report</h2>
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
