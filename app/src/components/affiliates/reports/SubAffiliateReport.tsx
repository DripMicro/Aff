import { DataTable } from "@/components/common/data-table/DataTable";
import { QuerySelect } from "@/components/common/QuerySelect";
import { FormLabel, Grid, GridItem, Input, Text } from "@chakra-ui/react";
import { createColumnHelper } from "@tanstack/react-table";
import { useRouter } from "next/router";
import { useState } from "react";
import type { SubAffiliateReportType } from "../../../server/db-types";
import { api } from "../../../utils/api";
import { DateRangeSelect, useDateRange } from "../../common/DateRangeSelect";
import { Loading } from "../../common/Loading";

export const SubAffiliateReport = () => {
  const router = useRouter();
  const { merchant_id } = router.query;
  const { from, to } = useDateRange();
  const [traderID, setTraderID] = useState<string>("");

  const { data, isLoading } = api.affiliates.getSubAffiliateReport.useQuery({
    from,
    to,
    user_level: "admin",
  });
  const { data: merchants } = api.affiliates.getAllMerchants.useQuery();
  const columnHelper = createColumnHelper<SubAffiliateReportType>();

  console.log("sub affiliate render", {
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
    columnHelper.accessor("id", {
      cell: ({ row }) => <div>Total</div>,
      header: "Affiliate ID",
    }),
    columnHelper.accessor("", {
      cell: (info) => info.getValue() as string,
      header: "Affiliate Username",
    }),
    columnHelper.accessor("", {
      cell: (info) => info.getValue() as string,
      header: "Tier Level",
    }),
    columnHelper.accessor("clicksSum", {
      cell: (info) => info.getValue() as number,
      header: "Clicks",
    }),
    columnHelper.accessor("totalCPI", {
      cell: (info) => info.getValue() as number,
      header: "Installation",
    }),
    columnHelper.accessor("totalLeads", {
      cell: (info) => info.getValue() as number,
      header: "Leads",
    }),
    columnHelper.accessor("totalDemo", {
      cell: (info) => info.getValue() as number,
      header: "Demo",
    }),
    columnHelper.accessor("totalVolume", {
      cell: (info) => info.getValue() as number,
      header: "Volume",
    }),
    columnHelper.accessor("totalWithdrawal", {
      cell: (info) => info.getValue() as number,
      header: "Withdrawal Amount",
    }),
    columnHelper.accessor("totalChargeback", {
      cell: (info) => info.getValue() as number,
      header: "ChargeBack Amount",
    }),
    columnHelper.accessor("totalLots", {
      cell: (info) => info.getValue() as number,
      header: "Lots",
    }),
    columnHelper.accessor("totalPNL", {
      cell: (info) => info.getValue() as number,
      header: "PNL",
    }),
    columnHelper.accessor("totalVolume", {
      cell: (info) => info.getValue() as number,
      header: "Total Volume",
    }),
    columnHelper.accessor("totalCommission", {
      cell: (info) => info.getValue() as number,
      header: "Your Commission",
    }),
  ];

  const merchant_options = merchants?.map((merchant: any) => {
    return {
      id: merchant.id,
      title: merchant?.name,
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
            choices={merchant_options}
            varName="merchant_id"
          />
        </GridItem>{" "}
        <GridItem>
          <FormLabel>Trader ID</FormLabel>
          <Input
            value={traderID}
            onChange={(event) => setTraderID(event.target.value)}
          />
        </GridItem>
        <GridItem>
          <QuerySelect
            label="Creative Type"
            choices={creativeType}
            varName="creative_type"
          />
        </GridItem>
      </Grid>
      <h2>Sub Affiliates Report</h2>
      <Grid
        templateColumns="repeat(6, 1fr)"
        gap={6}
        alignContent={"center"}
        alignItems={"center"}
        width="100%"
      >
        {data?.map((item: SubAffiliateReportType) => {
          console.log("item", item);
          return (
            <>
              <GridItem>
                <Text>Impressions</Text>
                <Text>{item.viewsSum}</Text>
              </GridItem>
              <GridItem>
                <Text>Clicks</Text>
                <Text>{item.clicksSum}</Text>
              </GridItem>
              <GridItem>
                <Text>Installation</Text>
                <Text>{item.totalCPI}</Text>
              </GridItem>
              <GridItem>
                <Text>Leads</Text>
                <Text>{item.totalLeads}</Text>
              </GridItem>
              <GridItem>
                <Text>Demo</Text>
                <Text>{item.totalDemo}</Text>
              </GridItem>
              <GridItem>
                <Text>Real Account</Text>
                <Text>{item.totalReal}</Text>
              </GridItem>
              <GridItem>
                <Text>FTD</Text>
                <Text>{item.newFTD}</Text>
              </GridItem>
              <GridItem>
                <Text>Withdrawal</Text>
                <Text>{item.totalWithdrawal}</Text>
              </GridItem>
              <GridItem>
                <Text>ChargeBack</Text>
                <Text>{item.totalChargeback}</Text>
              </GridItem>
              <GridItem>
                <Text>Lots</Text>
                <Text>{item.totalLots}</Text>
              </GridItem>
              <GridItem>
                <Text>PNL</Text>
                <Text>{item.totalPNL}</Text>
              </GridItem>
              <GridItem>
                <Text> Total Volume</Text>
                <Text>{item.totalVolume}</Text>
              </GridItem>
              <GridItem>
                <Text>Your commission</Text>
                <Text>{item.totalCommission}</Text>
              </GridItem>
            </>
          );
        })}
      </Grid>
      <Grid
        alignContent={"center"}
        alignItems={"center"}
        width="100%"
        alignSelf="center"
        overflow={"scroll"}
      >
        <DataTable data={data} columns={columns} footerData={[]} />
      </Grid>
    </>
  );
};
