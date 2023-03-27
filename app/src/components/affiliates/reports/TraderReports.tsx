import { DataTable } from "@/components/common/data-table/DataTable";
import { QuerySelect } from "@/components/common/QuerySelect";
import { FormLabel, Grid, GridItem, Input } from "@chakra-ui/react";
import { createColumnHelper } from "@tanstack/react-table";
import { useRouter } from "next/router";
import { useState } from "react";
import type { TraderReportType } from "../../../server/db-types";
import { api } from "../../../utils/api";
import { DateRangeSelect, useDateRange } from "../../common/DateRangeSelect";
import { Loading } from "../../common/Loading";

export const TraderReports = () => {
  const router = useRouter();
  const { merchant_id } = router.query;
  const { from, to } = useDateRange();
  const [traderID, setTraderID] = useState<string>("");

  const { data, isLoading } = api.affiliates.getTraderReport.useQuery({
    from,
    to,
    merchant_id: merchant_id ? Number(merchant_id) : undefined,
    trader_id: traderID,
  });
  const { data: merchants } = api.affiliates.getAllMerchants.useQuery();
  const columnHelper = createColumnHelper<TraderReportType>();

  console.log("trader render", {
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
    columnHelper.accessor("TraderID", {
      cell: (info) => info.getValue(),
      header: "Trader ID",
    }),
    columnHelper.accessor("sub_trader_count", {
      cell: (info) => info.getValue(),
      header: "Trader Sub Accounts",
    }),
    columnHelper.accessor("RegistrationDate", {
      cell: (info) => info.getValue(),
      header: "Registration Date",
    }),
    columnHelper.accessor("TraderStatus", {
      cell: (info) => info.getValue(),
      header: "Trader Status",
    }),
    columnHelper.accessor("Country", {
      cell: (info) => info.getValue(),
      header: "Country",
    }),
    columnHelper.accessor("affiliate_id", {
      cell: (info) => info.getValue(),
      header: "Affiliate ID",
    }),
    columnHelper.accessor("AffiliateUsername", {
      cell: (info) => info.getValue(),
      header: "Affiliate Username",
    }),
    columnHelper.accessor("merchant_id", {
      cell: (info) => info.getValue(),
      header: "Merchant ID",
    }),
    columnHelper.accessor("MerchantName", {
      cell: (info) => info.getValue(),
      header: "Merchant Name",
    }),
    columnHelper.accessor("CreativeID", {
      cell: (info) => info.getValue(),
      header: "Creative ID",
    }),
    columnHelper.accessor("CreativeName", {
      cell: (info) => info.getValue(),
      header: "Creative Name",
    }),
    columnHelper.accessor("Type", {
      cell: (info) => info.getValue(),
      header: "Type",
    }),
    columnHelper.accessor("CreativeLanguage", {
      cell: (info) => info.getValue(),
      header: "Creative Language",
    }),
    columnHelper.accessor("ProfileID", {
      cell: (info) => info.getValue(),
      header: "Profile ID",
    }),
    columnHelper.accessor("ProfileName", {
      cell: (info) => info.getValue(),
      header: "Profile Name",
    }),
    columnHelper.accessor("Param", {
      cell: (info) => info.getValue(),
      header: "Param",
    }),
    columnHelper.accessor("Param2", {
      cell: (info) => info.getValue(),
      header: "Param2",
    }),
    columnHelper.accessor("Param3", {
      cell: (info) => info.getValue(),
      header: "Param3",
    }),
    columnHelper.accessor("Param4", {
      cell: (info) => info.getValue(),
      header: "Param4",
    }),
    columnHelper.accessor("Param5", {
      cell: (info) => info.getValue(),
      header: "Param5",
    }),
    columnHelper.accessor("FirstDeposit", {
      cell: (info) => info.getValue(),
      header: "First Deposit",
    }),
    columnHelper.accessor("Volume", {
      cell: (info) => info.getValue(),
      header: "Volume",
    }),
    columnHelper.accessor("WithdrawalAmount", {
      cell: (info) => info.getValue(),
      header: "Withdrawal Amount",
    }),
    columnHelper.accessor("ChargeBackAmount", {
      cell: (info) => info.getValue(),
      header: "ChargeBack Amount",
    }),
    columnHelper.accessor("totalLots", {
      cell: (info) => info.getValue(),
      header: "Lots",
    }),
    columnHelper.accessor("SaleStatus", {
      cell: (info) => info.getValue(),
      header: "Sale Status",
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

  let totalVolume = 0;
  let totalLots = 0;
  let totalWithdrawal = 0;
  let totalChargeback = 0;

  data?.forEach((row: any) => {
    totalVolume += Number(row?.Volume);
    totalLots += Number(row?.totalLots);
    totalWithdrawal += Number(row?.WithdrawalAmount);
    totalChargeback += Number(row?.ChargeBackAmount);
  });

  const totalObj = [];
  totalObj.push({
    TraderID: "",
    sub_trader_count: "",
    RegistrationDate: "",
    TraderStatus: "",
    Country: "",
    affiliate_id: "",
    AffiliateUsername: "",
    merchant_id: "",
    MerchantName: "",
    CreativeID: "",
    CreativeName: "",
    Type: "",
    CreativeLanguage: "",
    ProfileID: "",
    ProfileName: "",
    Param: "",
    Param2: "",
    Param3: "",
    Param4: "",
    Param5: "",
    totalVolume,
    totalWithdrawal,
    totalChargeback,
    totalLots,
    SaleStatus: "",
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
      <h2>Trader Report</h2>
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
