import { Container, Flex } from "@chakra-ui/react";
import Pagination from "@etchteam/next-pagination";
import { RangeDatepicker } from "chakra-dayzed-datepicker";
import { type NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";
import { api } from "../../../utils/api";
import styles from "./../../index.module.css";
import { SubAffiliateReport } from "../../../components/affiliates/reports/SubAffiliateReport";
import type { MyPage } from "../../../components/common/types";
const Page: MyPage = () => {
  const router = useRouter();
  const page = parseInt(router?.query?.page as string);
  const items_per_page = parseInt(router?.query?.size as string);
  const [selectedDates, setSelectedDates] = useState<Date[]>([
    new Date(),
    new Date(),
  ]);
  const { data } = api.affiliates.getSubAffiliateReport.useQuery({
    from: selectedDates[0],
    to: selectedDates[1],
  });
  const { data: merchants } = api.affiliates.getAllMerchants.useQuery();

  console.log("sub affiliate data ----->", data);
  console.log("merchants ----->", merchants);

  return (
    <>
      <Head>
        <title>Creative Report</title>
        <meta name="description" content="Creative Report" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <SubAffiliateReport />
        {/* <Flex direction="column" gap={2}>
          <Flex direction="row" gap={2}>
            <RangeDatepicker
              selectedDates={selectedDates}
              onDateChange={setSelectedDates}
            />
          </Flex>
        </Flex>
        <Container marginTop={"45%"}>
          <Pagination total={100} />
        </Container> */}
      </main>
    </>
  );
};

export default Page;
Page.Layout = "Affiliates";
