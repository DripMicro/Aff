import styles from "./../index.module.css";
import { type NextPage } from "next";
import Head from "next/head";

import { Dashboard } from "../../components/affiliates/dashboard/Dashboard";
import type { MyPage } from "../../components/common/types";

const DashboardPage: MyPage = () => {
  return (
    <>
      <Head>
        <title>Affiliates Dashboard</title>
        <meta name="description" content="Affiliates Dashboard" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Dashboard />
    </>
  );
};

export default DashboardPage;

DashboardPage.Layout = "Affiliates";
