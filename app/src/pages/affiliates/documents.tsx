import styles from "./../index.module.css";
import { type NextPage } from "next";
import Head from "next/head";

import { Documents } from "../../components/affiliates/documents/Documents";
import type { MyPage } from "../../components/common/types";
const Page: MyPage = () => {
  return (
    <>
      <Head>
        <title>Affiliates Documents</title>
        <meta name="description" content="Affiliates Documents" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* <main className={styles.main}> */}
      <Documents />
      {/* </main> */}
    </>
  );
};

export default Page;
Page.Layout = "Affiliates";
