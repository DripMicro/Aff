import { type NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";
import { ClicksReport } from "../../../components/affiliates/reports/ClicksReport";
import { useDateRange } from "../../../components/common/DateRangeSelect";
import { api } from "../../../utils/api";
import styles from "./../../index.module.css";

const Page: NextPage = () => {
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
