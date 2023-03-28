import Head from "next/head";
import { TraderReports } from "../../../components/affiliates/reports/TraderReports";
import type { MyPage } from "../../../components/common/types";
import styles from "./../../index.module.css";
const Page: MyPage = () => {
  return (
    <>
      <Head>
        <title>Trader Report</title>
        <meta name="description" content="Creative Report" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main} style={{ marginTop: "20px" }}>
        <TraderReports />
      </main>
    </>
  );
};

export default Page;
Page.Layout = "Affiliates";
