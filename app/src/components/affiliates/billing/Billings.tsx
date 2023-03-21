import { Stack, Button, HStack, useToast, Flex } from "@chakra-ui/react";
import { DataTable } from "../../common/data-table/DataTable";
import { api } from "../../../utils/api";
import type { PaymentsPaidType } from "../../../server/db-types";
import { createColumnHelper } from "@tanstack/react-table";
import {
  AddIcon,
  CheckIcon,
  DeleteIcon,
  EditIcon,
  ViewIcon,
} from "@chakra-ui/icons";
import React, { useState } from "react";
import { useRouter } from "next/router";
import { QueryText } from "../../common/QueryText";
import NextLink from "next/link";
import { formatPrice } from "../../../utils/format";

const columnHelper = createColumnHelper<PaymentsPaidType>();

export const Billings = () => {
  const router = useRouter();
  const { search } = router.query;

  const { data } = api.affiliates.getPaymentsPaid.useQuery(
    {
      search: search ? String(search) : undefined,
    },
    { keepPreviousData: true }
  );

  const columns = [
    columnHelper.accessor("paymentID", {
      cell: (info) => info.getValue(),
      header: "Payment ID",
    }),
    columnHelper.accessor("month", {
      cell: (info) => `${info.getValue()}/${info.row.original.year}`,
      header: "Month",
    }),
    columnHelper.accessor("totalFTD", {
      cell: (info) => info.getValue(),
      header: "Total FTD",
      meta: {
        isNumeric: true,
      },
    }),
    columnHelper.accessor("total", {
      cell: (info) => formatPrice(info.getValue()),
      header: "Amount",
      meta: {
        isNumeric: true,
      },
    }),
    columnHelper.accessor("paid", {
      cell: (info) => (info.getValue() ? "Paid" : "Pending"),
      header: "Status",
    }),
    columnHelper.accessor("action" as any, {
      cell: (info) => {
        return (
          <NextLink
            target="_blank"
            href={`/affiliates/payment-view/${info.row.original.paymentID}`}
            passHref
          >
            <Button as="a" leftIcon={<ViewIcon />}>
              View
            </Button>
          </NextLink>
        );
      },
      header: "",
    }),
  ];

  if (!data) {
    return null;
  }

  return (
    <Stack m={12} gap={2}>
      <Flex direction="row" gap={2}>
        <QueryText varName="search" label="Search Payment ID" />
      </Flex>

      <DataTable data={data} columns={columns} />
    </Stack>
  );
};
