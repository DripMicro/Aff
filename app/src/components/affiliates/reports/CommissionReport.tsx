import { FormLabel, Grid, GridItem, Input } from "@chakra-ui/react";
import { createColumnHelper } from "@tanstack/react-table";
import { useRouter } from "next/router";
import { useState } from "react";
import { DataTable } from "../../../components/common/data-table/DataTable";
import { QuerySelect } from "../../../components/common/QuerySelect";
import type { CommissionReportType } from "../../../server/db-types";
import { api } from "../../../utils/api";
import { DateRangeSelect, useDateRange } from "../../common/DateRangeSelect";
import { Loading } from "../../common/Loading";

export const CommissionReport = () => {
  const router = useRouter();
  const { merchant_id, commission } = router.query;
  const { from, to } = useDateRange();
  const [traderID, setTraderID] = useState<string>("");

  const { data, isLoading } = api.affiliates.getCommissionReport.useQuery({
    from,
    to,
    merchant_id: String(merchant_id),
    commission: String(commission),
    trader_id: traderID,
  });
  const { data: merchants } = api.affiliates.getAllMerchants.useQuery();
  const columnHelper = createColumnHelper<CommissionReportType>();

  console.log("Commission render", {
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
    columnHelper.accessor("merchant.name", {
      cell: (info) => info.getValue(),
      header: "Merchant Name",
    }),
    columnHelper.accessor("merchant_id", {
      cell: (info) => info.getValue(),
      header: "Merchant ID",
    }),
    columnHelper.accessor("traderID", {
      cell: (info) => info.getValue(),
      header: "Trader ID",
    }),
    columnHelper.accessor("transactionID", {
      cell: (info) => info.getValue(),
      header: "Transaction ID",
      // meta: {
      //   isNumeric: true,
      // },
    }),
    columnHelper.accessor("Type", {
      cell: (info) => info.getValue(),
      header: "Type",
    }),
    columnHelper.accessor("Amount", {
      cell: (info) => info.getValue(),
      header: "Amount",
    }),
    columnHelper.accessor("level", {
      cell: (info) => info.getValue(),
      header: "Location",
    }),
    columnHelper.accessor("Commission", {
      cell: (info) => info.getValue(),
      header: "Commission",
    }),
  ];

  const merchant_options = merchants?.map((merchant) => {
    return {
      id: merchant.id,
      title: merchant?.name,
    };
  });

  let totalAmount = 0;
  let totalCommission = 0;
  const totalData = [];
  data?.forEach((item) => {
    totalAmount += item.Amount;
    totalCommission += item.Commission;
  });
  totalData.push({
    totalAmount: totalAmount.toFixed(2),
    totalCommission: totalCommission.toFixed(2),
  });

  console.log("data", totalData);

  const commissionOption = [
    {
      id: "CPA",
      title: "CPA / TierCPA / DCPA",
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
          <FormLabel>Trader ID</FormLabel>
          <Input
            value={traderID}
            onChange={(event) => setTraderID(event.target.value)}
          />
        </GridItem>

        <GridItem>
          <QuerySelect
            label="Commission"
            choices={commissionOption}
            varName="commission"
          />
        </GridItem>
      </Grid>
      <h2>Commission Report</h2>
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
          footerData={totalData}
        />
      </Grid>
    </>
  );
};
