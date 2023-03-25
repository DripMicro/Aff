import styles from "../../index.module.css";
import { type NextPage } from "next";
import Head from "next/head";

import { SubCreativeMaterial } from "../../../components/affiliates/sub/SubCreativeMaterial";
import { Billings } from "../../../components/affiliates/billing/Billings";
import { PaymentView } from "../../../components/affiliates/billing/PaymentView";
import { useRouter } from "next/router";
import type { MyPage } from "../../../components/common/types";
const Page: MyPage = () => {
  const router = useRouter();
  const { id } = router.query;

  return (
    <>
      <Head>
        <title>PaymentView</title>
        <meta name="description" content="PaymentView" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <PaymentView id={String(id)} />
      </main>
    </>
  );
};

export default Page;
Page.Layout = "NoLayout";
