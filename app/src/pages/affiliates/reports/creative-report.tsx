import { type NextPage } from "next";
import Head from "next/head";
import { CreativeReport } from "../../../components/affiliates/reports/CreativeReport";
import styles from "./../../index.module.css";

import type { MyPage } from "../../../components/common/types";

const Page: MyPage = () => {
  return (
    <>
      <Head>
        <title>Creative Report</title>
        <meta name="description" content="Creative Report" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <CreativeReport />
      </main>
    </>
  );
};

export default Page;
Page.Layout = "Affiliates";
