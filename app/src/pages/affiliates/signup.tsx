import { type NextPage } from "next";
import Head from "next/head";
import type { MyPage } from "../../components/common/types";
import { FormSignup } from "../../components/affiliates/account/FormSignup";
import AuthenticationFooter from "../../components/common/footer/AuthenticationFooter";
const Page: MyPage = () => {
  return (
    <>
      <Head>
        <title>Affiliates create account</title>
        <meta name="description" content="Affiliates Creative Materials" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center px-5">
        <FormSignup />
        <AuthenticationFooter />
      </main>
    </>
  );
};

export default Page;
Page.Layout = "NoLayout";
