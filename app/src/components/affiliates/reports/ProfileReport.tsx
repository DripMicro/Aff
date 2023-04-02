import { Grid, GridItem } from "@chakra-ui/react";
import { createColumnHelper } from "@tanstack/react-table";
import { useRouter } from "next/router";
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
      <span>0%</span>
    );
  };

  const columns = [
    columnHelper.accessor("id", {
      cell: (info) => info.getValue(),
      header: "Profile ID",
    }),
    columnHelper.accessor("name", {
      cell: (info) => info.getValue(),
      header: "Profile Name",
    }),
    columnHelper.accessor("url", {
      cell: (info) => info.getValue(),
      header: "Profile URL",
    }),
    columnHelper.accessor("views", {
      cell: (info) => info.getValue(),
      header: "Impressions",
    }),
    columnHelper.accessor("clicks", {
      cell: (info) => info.getValue(),
      header: "Clicks",
    }),
    columnHelper.accessor("totalCPI", {
      cell: (info) => info.getValue(),
      header: "Installation",
    }),
    columnHelper.accessor("CTR" as any, {
      cell: ({ row }) => {
        return divCol(row?.original?.clicks, row?.original?.views);
      },
      header: "Click Through Ratio (CTR)",
    }),
    columnHelper.accessor("click-to-account" as any, {
      cell: ({ row }) =>
        divCol(row?.original?.totalReal, row?.original?.clicks),
      header: "Click to Account",
    }),
    columnHelper.accessor("click-to-sale" as any, {
      cell: ({ row }) => divCol(row?.original?.ftd, row?.original?.clicks),
      header: "Click to Sale",
    }),
    columnHelper.accessor("epc" as any, {
      cell: ({ row }) => divCol(row?.original?.totalCom, row?.original?.clicks),
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
    columnHelper.accessor("totalPNL", {
      cell: (info) => info.getValue(),
      header: "Group",
    }),
  ];

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

  let totalImpressions = 0;
  let totalClicks = 0;
  let totalCPIM = 0;
  let totalLeadsAccounts = 0;
  let totalDemoAccounts = 0;
  let totalRealAccounts = 0;
  let totalFTD = 0;
  let totalVolume = 0;
  const totalBonus = 0;
  let totalWithdrawal = 0;
  let totalChargeback = 0;
  const totalNetRevenue = 0;
  const totalFooterPNL = 0;
  const totalActiveTraders = 0;
  let totalComs = 0;
  let group = 0;

  data?.forEach((row: any) => {
    totalImpressions += row?.views ? Number(row?.views) : 0;
    totalClicks += row?.views ? Number(row?.clicks) : 0;
    totalCPIM += row?.views ? Number(row?.totalCPI) : 0;
    totalLeadsAccounts += Number(row?.totalLeads);
    totalDemoAccounts += Number(row?.totalDemo);
    totalRealAccounts += Number(row?.totalReal);
    totalFTD += Number(row?.ftd);
    totalVolume += Number(row?.volume);
    totalWithdrawal += Number(row?.withdrawal);
    totalChargeback += Number(row?.chargeback);
    totalComs += row?.totalCom;
    group += row.totalPNL;
  });

  const totalObj = [];
  totalObj.push({
    id: "",
    name: "",
    totalImpressions,
    totalClicks,
    totalCPIM,
    totalCTR:
      totalImpressions > 0
        ? `${((totalClicks / totalImpressions) * 100).toFixed(2)}%`
        : "0%",
    totalCTA: totalClicks
      ? `${((totalRealAccounts / totalClicks) * 100).toFixed(2)}%`
      : "0%",
    totalCTS: totalClicks
      ? `${((totalFTD / totalClicks) * 100).toFixed(2)}%`
      : "0%",
    totalComission: totalClicks
      ? `${((totalComs / totalClicks) * 100).toFixed(2)}%`
      : "0%",
    totalLeadsAccounts,
    totalDemoAccounts,
    totalRealAccounts,
    totalFTD,
    totalWithdrawal,
    totalChargeback,
    totalVolume,
    group,
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
        <DataTable data={data} columns={columns} footerData={totalObj} />
      </Grid>
    </>
  );
};
