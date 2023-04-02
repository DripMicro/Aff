import { FormLabel, Grid, GridItem, Input } from "@chakra-ui/react";
import { createColumnHelper } from "@tanstack/react-table";
import { useRouter } from "next/router";
import { useState } from "react";
import { DataTable } from "../../../components/common/data-table/DataTable";
import { QuerySelect } from "../../../components/common/QuerySelect";
import type { PixelLogsReportType } from "../../../server/db-types";
import { api } from "../../../utils/api";
import { DateRangeSelect, useDateRange } from "../../common/DateRangeSelect";
import { Loading } from "../../common/Loading";

export const PixelLogReports = () => {
  const router = useRouter();
  const { merchant_id, country, groups } = router.query;
  const { from, to } = useDateRange();
  const [traderID, setTraderID] = useState<string>("");

  const { data, isLoading } = api.affiliates.getPixelLogReport.useQuery({
    from,
    to,
    merchant_id: merchant_id ? Number(merchant_id) : undefined,
    country: country ? String(country) : "",
    group_id: groups ? String(groups) : "",
  });
  const { data: merchants } = api.affiliates.getAllMerchants.useQuery();
  const { data: countries } = api.affiliates.getLongCountries.useQuery({});
  const columnHelper = createColumnHelper<PixelLogsReportType>();

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

  const divCol = (valid: number | null | undefined) => {
    return valid === 1 ? <span>Active</span> : <span>Blocked</span>;
  };

  const columns = [
    columnHelper.accessor("plid" as any, {
      cell: (info) => info.getValue() as number,
      header: "Pixel Fire ID",
    }),
    columnHelper.accessor("dateTime", {
      cell: (info) => info.getValue(),
      header: "Date",
    }),
    columnHelper.accessor("type" as any, {
      cell: (info) => info.getValue() as string,
      header: "Type",
    }),
    columnHelper.accessor("method" as any, {
      cell: (info) => info.getValue() as string,
      header: "Method",
    }),
    columnHelper.accessor("firedUrl", {
      cell: (info) => info.getValue(),
      header: "Fired URL",
    }),
    columnHelper.accessor("pixelResponse", {
      cell: (info) => info.getValue(),
      header: "Response",
    }),
    columnHelper.accessor("totalFired" as any, {
      cell: (info) => info.getValue() as number,
      header: "All Time Fired",
    }),
    columnHelper.accessor("pixel-state" as any, {
      cell: ({ row }) => divCol(row?.original?.pixel_monitor?.affiliate?.valid),
      header: "Pixel State",
    }),
    columnHelper.accessor("pixel_monitor.affiliate.id", {
      cell: (info) => info.getValue(),
      header: "Affiliate ID",
    }),
    columnHelper.accessor("pixel_monitor.affiliate.username", {
      cell: (info) => info.getValue(),
      header: "Affiliate Username",
    }),
    columnHelper.accessor("pixel_monitor.merchant.id", {
      cell: (info) => info.getValue(),
      header: "Merchant ID",
    }),
    columnHelper.accessor("pixel_monitor.merchant", {
      cell: (info) => info.getValue(),
      header: "Merchant",
    }),
    columnHelper.accessor("product_id", {
      cell: (info) => info.getValue(),
      header: "Product ID",
    }),
    columnHelper.accessor("banner_id" as any, {
      cell: (info) => info.getValue() as number,
      header: "Banner ID",
    }),
    columnHelper.accessor("group_id" as any, {
      cell: (info) => info.getValue() as number,
      header: "Group ID",
    }),
  ];

  const country_options = countries?.map((country: any) => {
    return {
      id: country.id,
      title: country.title,
    };
  });

  const creativeType = [
    {
      id: "",
      title: "All",
    },
    {
      id: "image",
      title: "Image",
    },
    {
      id: "mobileleader",
      title: "Mobile Leader",
    },
    {
      id: "mobilesplash",
      title: "Mobile Splash",
    },
    {
      id: "flash",
      title: "Flash",
    },
    {
      id: "widget",
      title: "Widget",
    },
    {
      id: "link",
      title: "Text Link",
    },
    {
      id: "mail",
      title: "Email",
    },
    {
      id: "coupon",
      title: "Coupon",
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
          <FormLabel>Banner ID</FormLabel>
          <Input
            value={traderID}
            onChange={(event) => setTraderID(event.target.value)}
          />
        </GridItem>

        <GridItem>
          <QuerySelect
            label="All Groups"
            choices={creativeType}
            varName="groups"
          />
        </GridItem>
      </Grid>
      <h2>Pixel Logs Report</h2>
      <Grid
        alignContent={"center"}
        alignItems={"center"}
        width="100%"
        alignSelf="center"
        overflow={"scroll"}
      >
        <DataTable data={data ? data : []} columns={columns} footerData={[]} />
      </Grid>
    </>
  );
};
