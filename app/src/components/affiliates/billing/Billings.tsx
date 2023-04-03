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
    total: 50,
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
    total: 50,
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

  console.log("UserQuery data: ", data);
  console.log("Example Data: ", ex_data);
  const paid_payment = (
    <button className="bg-green-200 text-green-800 h-5 w-16 rounded-md  ">
      Paid
    </button>
  );
  const pending_payment = (
    <button className="bg-red-200 text-red-800 h-5 w-16 rounded-md ">
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
      <div className=" text-base font-medium md:flex md:justify-between lg:flex">
        <div className="mb-2.5 hidden items-center md:flex ">
          <span className="text-[#2262C6]">Dashboard</span>
          &nbsp;-&nbsp;Billings
        </div>
        <div className="md:flex">
          <div className="relative hidden flex-1  rounded-md p-2 px-2 drop-shadow md:ml-5 md:block md:px-3 md:pt-1.5 md:pb-2">
            <input
              className="placeholder-blueGray-300 text-blueGray-700 mr-5 w-40 rounded  border bg-white px-3 py-3 text-sm shadow transition-all duration-150 ease-linear focus:outline-none focus:ring  md:w-96"
              placeholder="Search Merchant.."
            />
            <label className="right-8 mt-2  pr-4 md:absolute">
              <SearchIcon color="#B3B3B3" />
            </label>
          </div>
        </div>
      </div>
      <div className="flex justify-between font-medium">
        <div className="mb-2.5 flex items-center md:hidden">
          <span className="text-[#2262C6]">Dashboard</span>
          &nbsp;-&nbsp;Billings
        </div>
        <div className="flex md:hidden">
          <div className="relative flex-1 rounded-md p-2 drop-shadow md:ml-5 md:px-3 md:pt-1.5 md:pb-2">
            <input
              className="placeholder-blueGray-300 text-blueGray-700 dm:mr-5 rounded border bg-white px-3 py-3 text-sm shadow transition-all duration-150 ease-linear focus:outline-none  focus:ring"
              placeholder="Search Merchant.."
            />
            <label className="absolute left-44 pt-2">
              <SearchIcon color="#B3B3B3" />
            </label>
          </div>
        </div>
      </div>

      <div className="hidden rounded-[5px] bg-white px-3 pt-3 pb-20 shadow-md md:mb-10 md:block md:rounded-[15px]">
        <DataTable data={data} columns={columns} />
      </div>
      <div className="">
        <PaymentView id={""} />
      </div>
      <div className="md:hidden">
        <div className="rounded-lg bg-white shadow-md ">
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
