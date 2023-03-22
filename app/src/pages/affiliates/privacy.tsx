import Head from "next/head";

import Privacy from "../../components/affiliates/privacy/Privacy";
import type { MyPage } from "../../components/common/types";

const PrivacyPage: MyPage = () => {
  return (
    <>
      <Head>
        <title>Privacy Policy</title>
        <meta name="description" content="Privacy" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Privacy />
    </>
  );
};

export default PrivacyPage;

PrivacyPage.Layout = "Affiliates";
