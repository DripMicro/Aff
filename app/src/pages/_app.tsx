import type { AppProps } from "next/app";
import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { ChakraProvider } from "@chakra-ui/react";
import type { ReactNode } from "react";
import type { LayoutKeys } from "../layouts/Layouts";

import type { NextComponentType, NextPage, NextPageContext } from "next";

import "../styles/globals.css";
import "@tremor/react/dist/esm/tremor.css";
import "react-datepicker/dist/react-datepicker.css";
import "@etchteam/next-pagination/dist/index.css";

import { api } from "../utils/api";
import { theme } from "../components/chakra-ui-theme";

import { Layouts } from "../layouts/Layouts";

type MyAppProps = AppProps<{ session: Session | null }> & {
  Component: NextComponentType<NextPageContext, any, any> & {
    Layout: LayoutKeys;
  };
};

const MyApp = ({
  Component,
  pageProps: { session, ...pageProps },
}: MyAppProps) => {
  // const Layout = Layouts[Component.Layout] ?? ((page) => page);
  const Layout = Layouts[Component.Layout] ?? ((page) => page);

  return (
    <SessionProvider session={session}>
      <ChakraProvider theme={theme}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ChakraProvider>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);

// import "../styles/globals.css";
// import { MyAppProps } from "components/common/types";
// import { Layouts } from "components/common/Layouts";
// function MyApp({ Component, pageProps }: MyAppProps) {
//   const Layout = Layouts[Component.Layout] ?? ((page) => page);
//   return (
//     <Layout>
//       <Component {...pageProps} />
//     </Layout>
//   );
// }
// export default MyApp;
