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
  const [displayType, setDisplayType] = useState("");
  const [type, setType] = useState("");
  const page = parseInt(router?.query?.page as string);
  const items_per_page = parseInt(router?.query?.size as string);
  const [merchantId, setMerchantId] = useState("");
  const { data } = api.affiliates.getClicksReport.useQuery({
    from,
    to,
    merchant_id: parseInt(merchantId),
    unique_id: "",
    trader_id: "",
    type,
  });
  const { data: merchants } = api.affiliates.getAllMerchants.useQuery();

  console.log("data ----->", data);
  console.log("merchants ----->", merchantId);

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
              onChange={(event) => setType(event.target.value)}
            >
              <option value="clicks">clicks</option>
              <option value="views">views</option>
            </Select>
            <Select
              placeholder="Select option"
              onChange={(event) => setMerchantId(event.target.value)}
            >
              {merchants?.map((merchant, i) => {
                return (
                  <option key={i} value={merchant.id}>
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
Page.Layout = "Affiliates";
