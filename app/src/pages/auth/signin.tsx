import { Loading } from "@/components/common/Loading";
import { useAuth } from "@/hooks/useAuth";
import Head from "next/head";
import { FormSignin } from "../../components/affiliates/account/FormSignin";
import AuthenticationFooter from "../../components/common/footer/AuthenticationFooter";
import type { MyPage } from "../../components/common/types";

const Page: MyPage = () => {
  const redirected = useAuth();

  if (redirected) {
    return <Loading />;
  }

  return (
    <>
      <Head>
        <title>Affiliates create account</title>
        <meta name="description" content="Affiliates Creative Materials" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center px-5">
        <FormSignin />
        <AuthenticationFooter />
      </main>
    </>
  );
};

export default Page;
Page.Layout = "NoLayout";
