import Head from "next/head";
import styles from "./../../index.module.css";

import { ProfileReport } from "../../../components/affiliates/reports/ProfileReport";
import type { MyPage } from "../../../components/common/types";
const Page: MyPage = () => {
  return (
    <>
      <Head>
        <title>Profile Report</title>
        <meta name="description" content="Creative Report" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main} style={{ marginTop: "20px" }}>
        <ProfileReport />
      </main>
    </>
  );
};

export default Page;
Page.Layout = "Affiliates";
