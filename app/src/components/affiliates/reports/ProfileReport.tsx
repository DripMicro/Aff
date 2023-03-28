import { Grid, GridItem } from "@chakra-ui/react";
import { createColumnHelper } from "@tanstack/react-table";
import { useRouter } from "next/router";
import { useState } from "react";
import { DataTable } from "../../../components/common/data-table/DataTable";
import { QuerySelect } from "../../../components/common/QuerySelect";
import type { ProfileReportType } from "../../../server/db-types";
import { api } from "../../../utils/api";
import { DateRangeSelect, useDateRange } from "../../common/DateRangeSelect";
import { Loading } from "../../common/Loading";

export const ProfileReport = () => {
  const router = useRouter();
  const { merchant_id, search_type } = router.query;
  const { from, to } = useDateRange();
  const [traderID, setTraderID] = useState<string>("");

  const { data, isLoading } = api.affiliates.getProfileReportData.useQuery({
    from,
    to,
    merchant_id: merchant_id ? Number(merchant_id) : undefined,
    search_type: search_type ? String(search_type) : undefined,
  });
  const { data: merchants } = api.affiliates.getAllMerchants.useQuery();
  const columnHelper = createColumnHelper<ProfileReportType>();

  // console.log("Clicks render", {
  // 	data,
  // 	merchants,
  // 	isLoading,
  // 	from,
  // 	to,
  // 	merchant_id,
  // });

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
    columnHelper.accessor("id", {
      cell: (info) => info.getValue() as number,
      header: "Profile ID",
    }),
    columnHelper.accessor("name", {
      cell: (info) => info.getValue(),
      header: "Profile Name",
    }),
    columnHelper.accessor("url", {
      cell: (info) => info.getValue() as string,
      header: "Profile URL",
    }),
    columnHelper.accessor("_sum.views", {
      cell: (info) => info.getValue() as number,
      header: "Impressions",
    }),
    columnHelper.accessor("_sum.clicks", {
      cell: (info) => info.getValue(),
      header: "Clicks",
    }),
    columnHelper.accessor("totalCPI", {
      cell: (info) => info.getValue(),
      header: "Installation",
    }),
    columnHelper.accessor("CTR" as any, {
      cell: ({ row }) =>
        divCol(row.original._sum?.clicks, row.original._sum?.views),
      header: "Click Through Ratio (CTR)",
    }),
    columnHelper.accessor("click-to-account" as any, {
      cell: ({ row }) =>
        divCol(row.original.totalReal, row.original._sum?.clicks),
      header: "Click to Account",
    }),
    columnHelper.accessor("click-to-sale" as any, {
      cell: ({ row }) => divCol(row.original.ftd, row.original._sum?.clicks),
      header: "Click to Sale",
    }),
    columnHelper.accessor("epc" as any, {
      cell: ({ row }) =>
        divCol(row.original.totalCom, row.original._sum?.clicks),
      header: "EPC",
    }),
    columnHelper.accessor("totalLeads", {
      cell: (info) => info.getValue(),
      header: "Lead",
    }),
    columnHelper.accessor("totalDemo", {
      cell: (info) => info.getValue(),
      header: "Demo",
    }),
    columnHelper.accessor("totalReal", {
      cell: (info) => info.getValue(),
      header: "Accounts",
    }),
    columnHelper.accessor("ftd", {
      cell: (info) => info.getValue(),
      header: "FTD",
    }),
    columnHelper.accessor("withdrawal", {
      cell: (info) => info.getValue(),
      header: "Withdrawal Amount",
    }),
    columnHelper.accessor("chargeback", {
      cell: (info) => info.getValue(),
      header: "ChargeBack Amount",
    }),
    columnHelper.accessor("volume", {
      cell: (info) => info.getValue(),
      header: "Volume",
    }),
    columnHelper.accessor("affiliate.group_id", {
      cell: (info) => info.getValue(),
      header: "Group",
    }),
  ];

  const merchant_options = merchants?.map((merchant) => {
    return {
      id: merchant.id,
      title: merchant?.name,
    };
  });

  const searchType = [
    {
      id: "daily",
      title: "Daily",
    },
    {
      id: "weekly",
      title: "Weekly",
    },
    {
      id: "monthly",
      title: "Monthly",
    },
  ];

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
            label="Search Type"
            choices={searchType}
            varName="search_type"
          />
        </GridItem>
      </Grid>
      <h2>Profile Report</h2>
      <Grid
        alignContent={"center"}
        alignItems={"center"}
        width="100%"
        alignSelf="center"
        overflow={"scroll"}
      >
        <DataTable
          data={data ? Object.values(data) : []}
          columns={columns}
          footerData={[]}
        />
      </Grid>
    </>
  );
};
