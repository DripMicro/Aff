import {
  Stack,
  Button,
  HStack,
  useToast,
  Flex,
  SimpleGrid,
} from "@chakra-ui/react";
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
  SearchIcon,
  
} from "@chakra-ui/icons";
import React, { useState } from "react";
import { useRouter } from "next/router";
import { QueryText } from "../../common/QueryText";
import NextLink from "next/link";
import { formatPrice } from "../../../utils/format";

import Affiliates from "../../../layouts/AffiliatesLayout";
import { PaymentView } from "./PaymentView";

const columnHelper = createColumnHelper<PaymentsPaidType>();

const ex_data = [
  {
    totalFTD: 60,
    id: 1,
    rdate: Date,
    month: "March",
    year: "2005",
    affiliate_id: 500,
    paid: 20,
    transaction_id: "string",
    notes: "string",
    extras: "string",
    total: 50
  },
  {
    totalFTD: 60,
    id: 1,
    rdate: Date,
    month: "March",
    year: "2005",
    affiliate_id: 500,
    paid: 20,
    transaction_id: "string",
    notes: "string",
    extras: "string",
    total: 50
  },
];

export const Billings = () => {
  const router = useRouter();
  const { search } = router.query;

  const { data } = api.affiliates.getPaymentsPaid.useQuery(
    {
      search: search ? String(search) : undefined,
    },
    { keepPreviousData: true }
  );

  console.log("UserQuery data: ",data);
    console.log("Example Data: ", ex_data)
  const paid_payment = (
    <button className="w-16 h-5 bg-green-200 text-green-800 rounded-md  ">
      Paid
    </button>
  );
  const pending_payment = (
    <button className="w-16 h-5 bg-red-200 text-red-800 rounded-md ">
      Pending
    </button>
  );

  const columns = [
    columnHelper.accessor("id", {
      cell: (info) => info.getValue(),
      header: "#",
    }),
    columnHelper.accessor("paymentID", {
      cell: (info) => info.getValue(),
      header: "Payment ID",
    }),
    columnHelper.accessor("month", {
      cell: (info) => `${info.getValue()}`,
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
      cell: (info) => (info.getValue() ? paid_payment : pending_payment),
      header: "Status",
    }),
  ];

  if (!data) {
    return null;
  }

  return (
    <div className="pt-5 pb-4 ">
      <div className=" lg:flex md:justify-between font-medium text-base md:flex">
        <div className="md:flex items-center mb-2.5 hidden ">
          <span className="text-[#2262C6]">Dashboard</span>
          &nbsp;-&nbsp;Billings
        </div>
        <div className="md:flex">
          <div className="flex-1 p-2 relative  md:ml-5 px-2 md:px-3 md:pt-1.5 md:pb-2 rounded-md drop-shadow md:block hidden">
            <input
              className="border px-3 py-3 w-40 md:w-96  placeholder-blueGray-300 text-blueGray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring ease-linear transition-all duration-150  mr-5"
              placeholder="Search Merchant.."
            />
            <label className="md:absolute right-8  mt-2 pr-4">
              <SearchIcon color="#B3B3B3" />
            </label>
          </div>
        </div>
      </div>
      <div className="flex justify-between font-medium">
        <div className="flex items-center mb-2.5 md:hidden">
          <span className="text-[#2262C6]">Dashboard</span>
          &nbsp;-&nbsp;Billings
        </div>
        <div className="md:hidden flex">
          <div className=" flex-1 p-2 relative ml-5 px-3 md:pt-1.5 md:pb-2 rounded-md drop-shadow">
            <input
              className="border px-3 py-3   placeholder-blueGray-300 text-blueGray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring ease-linear transition-all duration-150  mr-5"
              placeholder="Search Merchant.."
            />
            <label className="absolute left-44 pt-2">
              <SearchIcon color="#B3B3B3" />
            </label>
          </div>
        </div>
      </div>

      <div className="md:block hidden pt-3 pl-3 rounded-[5px] md:rounded-[15px] bg-white shadow-md pb-20 md:mb-10">
        <DataTable data={data} columns={columns} />
      </div>
      <div className="">
        <PaymentView />
      </div>
      <div className="md:hidden">
        <div className="bg-white shadow-md rounded-lg ">
          {/* {
            ex_data.map((ex, index)) => {
              return <div key={index}>
                <div className="flex">

                </div>
              </div>
            })
          }
             */}
        </div>

      </div>
    </div>
  );
};

Billings.getLayout = Affiliates;
