import Head from "next/head";
import { SubAffiliateReport } from "../../../components/affiliates/reports/SubAffiliateReport";
import type { MyPage } from "../../../components/common/types";
import styles from "./../../index.module.css";
const Page: MyPage = () => {
  return (
    <>
      <Head>
        <title>Sub Affiliate Report</title>
        <meta name="description" content="Sub Affiliate Report" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main} style={{ marginTop: "20px" }}>
        <SubAffiliateReport />
      </main>
    </>
  );
};

export default Page;
Page.Layout = "Affiliates";
