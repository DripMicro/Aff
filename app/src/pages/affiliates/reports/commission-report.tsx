import { Container, Flex, Select } from "@chakra-ui/react";
import Pagination from "@etchteam/next-pagination";
import { RangeDatepicker } from "chakra-dayzed-datepicker";
import { type NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";
import { api } from "../../../utils/api";
import styles from "./../../index.module.css";
import {
  DateRangeSelect,
  useDateRange,
} from "../../../components/common/DateRangeSelect";
import type { MyPage } from "../../../components/common/types";
const Page: MyPage = () => {
  const router = useRouter();
  const { from, to } = useDateRange();
  const page = parseInt(router?.query?.page as string);
  const items_per_page = parseInt(router?.query?.size as string);
  const [displayType, setDisplayType] = useState("");
  const { data } = api.affiliates.getCommissionReport.useQuery({
    from,
    to,
    page: isNaN(page) ? 1 : page,
    items_per_page: isNaN(items_per_page) ? 10 : items_per_page,
  });
  const { data: merchants } = api.affiliates.getAllMerchants.useQuery();

  console.log("data ----->", data);
  // console.log("merchants ----->", merchants);
  console.log("item per page", isNaN(items_per_page) ? 10 : items_per_page);
  return (
    <>
      <Head>
        <title>Quick Summary Report</title>
        <meta name="description" content="Affiliates Creative Materials" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <Flex direction="column" gap={2}>
          <Flex direction="row" gap={2}>
            <DateRangeSelect />
            <Select
              placeholder="Select option"
              onChange={(event) => setDisplayType(event.target.value)}
            >
              <option value="monthly">monthly</option>
              <option value="weekly">weekly</option>
              <option value="daily">daily</option>
            </Select>
            <Select
              placeholder="Select option"
              onChange={(event) => setDisplayType(event.target.value)}
            >
              {merchants?.map((merchant, i) => {
                return (
                  <option key={i} value={merchant.name}>
                    {merchant.name}
                  </option>
                );
              })}
            </Select>
          </Flex>
        </Flex>
        <Container marginTop={"45%"}>
          <Pagination total={100} />
        </Container>
      </main>
    </>
  );
};

export default Page;
Page.Layout = "NoLayout";
