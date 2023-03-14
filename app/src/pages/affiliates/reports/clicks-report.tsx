import { type NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";
import { ClicksReport } from "../../../components/affiliates/reports/ClicksReport";
import { useDateRange } from "../../../components/common/DateRangeSelect";
import { api } from "../../../utils/api";
import styles from "./../../index.module.css";
const Page: NextPage = () => {
  const router = useRouter();
  const { from, to } = useDateRange();
  const [displayType, setDisplayType] = useState("");
  const [type, setType] = useState("");
  const page = parseInt(router?.query?.page as string);
  const items_per_page = parseInt(router?.query?.size as string);
  const [merchantId, setMerchantId] = useState("");
  const { data } = api.affiliates.getClicksReport.useQuery({
    from,
    to,
    merchant_id: Number(merchantId),
    unique_id: "",
    trader_id: "",
    type,
  });
  const { data: merchants } = api.affiliates.getAllMerchants.useQuery();

  console.log("data ----->", data);
  console.log("merchants ----->", merchantId);

  return (
    <>
      <Head>
        <title>Quick Summary Report</title>
        <meta name="description" content="Affiliates Creative Materials" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <ClicksReport />
      </main>
    </>
  );
};

export default Page;
