import Head from "next/head";
import type { MyPage } from "../../../components/common/types";
import styles from "./../../index.module.css";
import { FakeTraderReports } from "@/components/affiliates/reports/FakeTraderReports";

const Page: MyPage = () => {
  return (
    <>
      <Head>
        <title>Trader Report</title>
        <meta name="description" content="Creative Report" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main} style={{ marginTop: "20px" }}>
        <FakeTraderReports />
      </main>
    </>
  );
};

export default Page;
Page.Layout = "Affiliates";
