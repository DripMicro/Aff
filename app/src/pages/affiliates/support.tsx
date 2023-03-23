import Head from "next/head";

import Support from "../../components/affiliates/support/support";
import type { MyPage } from "../../components/common/types";

const Page: MyPage = () => {
  return (
    <>
      <Head>
        <title>Supporrt - FAQ</title>
        <meta name="description" content="Privacy" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Support />
    </>
  );
};

export default Page;

Page.Layout = "Affiliates";
