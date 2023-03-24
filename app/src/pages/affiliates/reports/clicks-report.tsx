import Head from "next/head";
import { ClicksReport } from "../../../components/affiliates/reports/ClicksReport";
import styles from "./../../index.module.css";

import type { MyPage } from "../../../components/common/types";

const Page: MyPage = () => {
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
Page.Layout = "Affiliates";
