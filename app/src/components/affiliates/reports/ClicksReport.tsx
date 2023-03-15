import { FormLabel, Grid, GridItem, Input } from "@chakra-ui/react";
import { createColumnHelper } from "@tanstack/react-table";
import { format } from "date-fns";
import { useRouter } from "next/router";
import { useState } from "react";
import { DataTable } from "../../../components/common/data-table/DataTable";
import { QuerySelect } from "../../../components/common/QuerySelect";
import type { ClicksReportType } from "../../../server/db-types";
import { api } from "../../../utils/api";
import { DateRangeSelect, useDateRange } from "../../common/DateRangeSelect";
import { Loading } from "../../common/Loading";

export const ClicksReport = () => {
	const router = useRouter();
	const { merchant_id } = router.query;
	const { from, to } = useDateRange();
	const [traderID, setTraderID] = useState<string>("");

	const { data, isLoading } = api.affiliates.getClicksReport.useQuery({
		from,
		to,
		trader_id: traderID,
	});
	const { data: merchants } = api.affiliates.getAllMerchants.useQuery();
	const columnHelper = createColumnHelper<ClicksReportType>();

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

	const divCol = (rdate: Date | null | undefined) => {
		return rdate ? (
			<span>{format(rdate, "yyyy-MM-dd kk:mm:ss")}</span>
		) : (
			<span></span>
		);
	};

	const columns = [
		columnHelper.accessor("id", {
			cell: (info) => info.getValue(),
			header: "ID",
		}),
		columnHelper.accessor("uid", {
			cell: (info) => info.getValue(),
			header: "UID",
		}),
		columnHelper.accessor("views", {
			cell: (info) => info.getValue(),
			header: "Impression",
		}),
		columnHelper.accessor("clicks", {
			cell: (info) => info.getValue(),
			header: "Click",
		}),
		columnHelper.accessor("rdate", {
			cell: ({ row }) => divCol(row?.original?.rdate),
			header: "Date",
		}),
		columnHelper.accessor("type", {
			cell: (info) => info.getValue(),
			header: "Type",
		}),
		columnHelper.accessor("merchant.name", {
			cell: (info) => info.getValue(),
			header: "Merchant",
		}),
		columnHelper.accessor("banner_id", {
			cell: (info) => info.getValue(),
			header: "Banner ID",
		}),
		columnHelper.accessor("profile_id", {
			cell: (info) => info.getValue(),
			header: "Profile ID",
		}),
		// columnHelper.accessor("profile_name" as any, {
		//   cell: (info) => info.getValue(),
		//   header: "Profile Name",
		// }),
		columnHelper.accessor("param", {
			cell: (info) => info.getValue(),
			header: "Param",
		}),
		columnHelper.accessor("param2", {
			cell: (info) => info.getValue(),
			header: "Param 2",
		}),
		columnHelper.accessor("refer_url", {
			cell: (info) => info.getValue(),
			header: "Refer URL",
		}),
		columnHelper.accessor("country_id", {
			cell: (info) => info.getValue(),
			header: "Country",
		}),
		columnHelper.accessor("ip", {
			cell: (info) => info.getValue(),
			header: "IP",
		}),
		columnHelper.accessor("platform", {
			cell: (info) => info.getValue(),
			header: "Platform",
		}),
		columnHelper.accessor("os", {
			cell: (info) => info.getValue(),
			header: "Operating System",
		}),
		columnHelper.accessor("osVersion", {
			cell: (info) => info.getValue(),
			header: "OS Version",
		}),
		columnHelper.accessor("browser", {
			cell: (info) => info.getValue(),
			header: "Browser",
		}),
		columnHelper.accessor("broswerVersion", {
			cell: (info) => info.getValue(),
			header: "Browser Version",
		}),
		columnHelper.accessor("trader_id", {
			cell: (info) => info.getValue(),
			header: "Trader ID",
		}),
		columnHelper.accessor("trader_alias", {
			cell: (info) => info.getValue(),
			header: "Trader Alias",
		}),
		columnHelper.accessor("lead", {
			cell: (info) => info.getValue(),
			header: "Lead",
		}),
		columnHelper.accessor("demo", {
			cell: (info) => info.getValue(),
			header: "Demo",
		}),
		columnHelper.accessor("sales_status", {
			cell: (info) => info.getValue(),
			header: "Sales Status",
		}),
		columnHelper.accessor("accounts", {
			cell: (info) => info.getValue(),
			header: "Accounts",
		}),
		columnHelper.accessor("ftd", {
			cell: (info) => info.getValue(),
			header: "FTD",
		}),
		columnHelper.accessor("volume", {
			cell: (info) => info.getValue(),
			header: "Volume",
		}),
		columnHelper.accessor("withdrawal", {
			cell: (info) => info.getValue(),
			header: "Withdrawal Amount",
		}),
		columnHelper.accessor("chargeback", {
			cell: (info) => info.getValue(),
			header: "ChargeBack Amount",
		}),
		columnHelper.accessor("traders", {
			cell: (info) => info.getValue(),
			header: "Active Traders",
		}),
	];

	const merchant_options = merchants?.map((merchant) => {
		return {
			id: merchant.id,
			title: merchant?.name,
		};
	});

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
			<h2>Clicks Report</h2>
			<Grid
				alignContent={"center"}
				alignItems={"center"}
				width="100%"
				alignSelf="center"
				overflow={"scroll"}
			>
				<DataTable
					data={data ? data : []}
					columns={columns}
					footerData={[]}
				/>
			</Grid>
		</>
	);
};
