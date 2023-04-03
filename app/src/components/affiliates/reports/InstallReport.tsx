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

export const InstallReport = () => {
  const router = useRouter();
  const { merchant_id, country } = router.query;
  const { from, to } = useDateRange();
  const [traderID, setTraderID] = useState<string>("");

  const { data, isLoading } = api.affiliates.getInstallReport.useQuery({
    from,
    to,
    country: country ? String(country) : undefined,
    trader_id: traderID ? Number(traderID) : undefined,
  });
  const { data: merchants } = api.affiliates.getAllMerchants.useQuery();
  const { data: countries } = api.affiliates.getLongCountries.useQuery({});
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

  console.log("countries ----->", countries);

  const columns = [
    columnHelper.accessor("type", {
      cell: (info) => info.getValue() as string,
      header: "Event Type",
    }),
    columnHelper.accessor("rdate", {
      cell: (info) => info.getValue() as Date,
      header: "Event Date",
    }),
    columnHelper.accessor("trader_id", {
      cell: (info) => info.getValue() as number,
      header: "Trader ID",
    }),
    columnHelper.accessor("trader_alias", {
      cell: (info) => info.getValue() as string,
      header: "Trader Alias",
    }),
    columnHelper.accessor("type", {
      cell: (info) => info.getValue() as string,
      header: "Trader Status",
    }),
    columnHelper.accessor("country", {
      cell: (info) => info.getValue() as string,
      header: "Country",
    }),
    columnHelper.accessor("affiliate_id", {
      cell: (info) => info.getValue() as number,
      header: "Affiliate ID",
    }),
    columnHelper.accessor("username", {
      cell: (info) => info.getValue() as string,
      header: "Affiliate Username",
    }),
    columnHelper.accessor("merchant_id", {
      cell: (info) => info.getValue() as number,
      header: "Merchant ID",
    }),
    columnHelper.accessor("name", {
      cell: (info) => info.getValue() as string,
      header: "Merchant Name",
    }),
    columnHelper.accessor("id", {
      cell: (info) => info.getValue() as number,
      header: "Creative ID",
    }),
    columnHelper.accessor("title", {
      cell: (info) => info.getValue() as string,
      header: "Creative Name",
    }),
  ];

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
            choices={merchants}
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
      <h2>Install Report</h2>
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
