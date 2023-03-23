import type { AppProps } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";

import { appWithTranslation } from "next-i18next";
import { i18nConfig } from "../../next-i18next.config.mjs";

import { api } from "../utils/api";

import type { LayoutKeys } from "../layouts/Layouts";
import { Layouts } from "../layouts/Layouts";
import type { NextComponentType, NextPage, NextPageContext } from "next";

import { missingKeyHandler } from "../utils/i18n-utils";
import "../utils/zod-meta";
import { useFlags } from "../flags/client";
import { FlagBagProvider } from "@happykit/flags/context";
import { Toaster } from "@/components/ui/toaster";

import "../styles/globals.css";
import "@tremor/react/dist/esm/tremor.css";
import "react-datepicker/dist/react-datepicker.css";
import "@etchteam/next-pagination/dist/index.css";

import { ChakraProvider } from "@chakra-ui/react";
import { theme } from "../components/chakra-ui-theme";

type MyAppProps = AppProps<{ session: Session | null }> & {
  Component: NextComponentType<NextPageContext, any, any> & {
    Layout: LayoutKeys;
  };
};

const MyApp = ({
  Component,
  pageProps: { session, ...pageProps },
}: MyAppProps) => {
  const flagBag = useFlags({});

  const Layout = Layouts[Component.Layout] ?? ((page) => page);

  return (
    <FlagBagProvider value={flagBag}>
      <SessionProvider session={session}>
        <ChakraProvider theme={theme}>
          <Layout>
            <Component {...pageProps} />
            <Toaster />
          </Layout>
        </ChakraProvider>
      </SessionProvider>
    </FlagBagProvider>
  );
};

const I18nApp = appWithTranslation(MyApp, {
  ...i18nConfig,
  missingKeyHandler,
});
export default api.withTRPC(I18nApp);
