import styles from "./../index.module.css";
import { type NextPage } from "next";
import Head from "next/head";

import { SubCreativeMaterial } from "../../components/affiliates/sub/SubCreativeMaterial";
import { Billings } from "../../components/affiliates/billing/Billings";
import type { MyPage } from "../../components/common/types";
const Page: MyPage = () => {
  return (
    <>
      <Head>
        <title>Billing</title>
        <meta name="description" content="Billing" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* <main className={styles.main}> */}
      <Billings />
      {/* </main> */}
    </>
  );
};

export default Page;
Page.Layout = "Affiliates";
