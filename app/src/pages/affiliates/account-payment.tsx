import styles from "./../index.module.css";
import { type NextPage } from "next";
import Head from "next/head";

import { AccountDetails } from "../../components/affiliates/account/AccountDetails";
import { AccountPaymentDetails } from "../../components/affiliates/account/AccountPaymentDetails";
import type { MyPage } from "../../components/common/types";
const Page: MyPage = () => {
  return (
    <>
      <Head>
        <title>Affiliates Creative Materials</title>
        <meta name="description" content="Affiliates Creative Materials" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <AccountPaymentDetails />
      </main>
    </>
  );
};

export default Page;

Page.Layout = "Affiliates";
