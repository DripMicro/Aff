import styles from "./../index.module.css";
import { type NextPage } from "next";
import Head from "next/head";

import { AccountDetails } from "../../components/affiliates/account/AccountDetails";
import type { MyPage } from "../../components/common/types";
const Page: MyPage = () => {
  return (
    <>
      <Head>
        <title>Affiliates My Account</title>
        <meta name="description" content="Affiliates Creative Materials" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <AccountDetails />
    </>
  );
};

export default Page;
Page.Layout = "Affiliates";
