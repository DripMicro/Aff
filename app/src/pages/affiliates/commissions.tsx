import styles from "./../index.module.css";
import { type NextPage } from "next";
import Head from "next/head";

import { Commissions } from "../../components/affiliates/commissions/Commissions";
import type { MyPage } from "../../components/common/types";
const Page: MyPage = () => {
  return (
    <>
      <Head>
        <title>Affiliates Commission Structure</title>
        <meta name="description" content="Affiliates Commission Structure" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <Commissions />
      </main>
    </>
  );
};

export default Page;
Page.Layout = "Affiliates";
