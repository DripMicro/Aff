import Head from "next/head";
import { PixelLogReports } from "../../../components/affiliates/reports/PixelLogReports";
import type { MyPage } from "../../../components/common/types";
import styles from "./../../index.module.css";
const Page: MyPage = () => {
  return (
    <>
      <Head>
        <title>Pixel Logs Report</title>
        <meta name="description" content="Creative Report" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main} style={{ marginTop: "20px" }}>
        <PixelLogReports />
      </main>
    </>
  );
};

export default Page;
Page.Layout = "NoLayout";
