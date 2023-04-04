import React from "react";

interface Props {
  id: string;
}

interface payment_data {
  id: number;
  paid: boolean;
  paymentID: string;
  month: string;
  totalFTD: string;
  total: string;
}

interface Pyament_array<Array> {
  array: payment_data;
}

interface PaymentViewProps<Data extends object> {
  data: Data[] | null | undefined;
}

const data = [
  {
    id: 1,
    paymentID: "#021362",
    month: "March",
    totalFTD: "2",
    total: 60,
    paid: true,
  },
  {
    id: 2,
    paymentID: "#021362",
    month: "March",
    totalFTD: "2",
    total: 60,
    pending: true,
  },
  {
    id: 3,
    paymentID: "#021362",
    month: "March",
    totalFTD: "2",
    total: 60,
    paid: true,
  },
  {
    id: 4,
    paymentID: "#021362",
    month: "March",
    totalFTD: "2",
    total: 60,
    pending: true,
  },
  {
    id: 5,
    paymentID: "#021362",
    month: "March",
    totalFTD: "2",
    total: 60,
    paid: true,
  },
];

export const PaymentView = ({ id }: Props) => {
  // const { data } = api.affiliates.getPaymentDetails.useQuery({ paymentId: id });

  const paid_payment = (
    <button className="bg-green-200 text-green-800 h-6  w-16 rounded-md ">
      Paid
    </button>
  );
  const pending_payment = (
    <button className="bg-red-200 text-red-800 h-6  w-16 rounded-md ">
      Pending
    </button>
  );

  return (
    <div className="ml-5 mr-5 md:hidden ">
      {data
        ? data.map((data, index) => {
            return (
              <div
                key={index}
                className="mb-3 w-full rounded-xl border bg-white shadow-lg"
              >
                <div className=" h-20 ">
                  <div className="flex h-12 justify-between pt-6">
                    <div className="ml-6 text-base font-normal">
                      #0{data.id}
                    </div>
                    <div className="mr-6">
                      {data.paid ? paid_payment : pending_payment}
                    </div>
                  </div>
                  <div className="flex"></div>
                </div>
                <div className="flex justify-between pb-6 ">
                  <div className="ml-6 ">
                    <div className="text-sm">Payment ID</div>
                    <div className="font-bold">{data.paymentID}</div>
                  </div>
                  <div className="">
                    <div className="text-sm">Month</div>
                    <div className="font-bold">${data.month}</div>
                  </div>
                  <div className="">
                    <div className="text-sm">Total FTD</div>
                    <div className="font-bold">${data.totalFTD}</div>
                  </div>
                  <div className="mr-7">
                    <div className="text-sm">Amount</div>
                    <div className="font-bold">${data.total}</div>
                  </div>
                </div>
              </div>
            );
          })
        : null}
    </div>
  );
};
