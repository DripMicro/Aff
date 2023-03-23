import { type NextPage } from "next";
import Head from "next/head";
import { RecoverLostPassword } from "../../components/affiliates/account/RecoverLostPassword";
import type { MyPage } from "../../components/common/types";

const Page: MyPage = () => {
  return (
    <>
      <Head>
        <title>Affiliates Tickets</title>
        <meta name="description" content="Affiliates Tickets" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center px-5">
        <RecoverLostPassword />
      </main>
    </>
  );
};

export default Page;
Page.Layout = "NoLayout";
