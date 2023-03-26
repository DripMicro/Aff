import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: false,
  plugins: {
    legend: {
      display: false,
      position: "top" as const,
    },
    title: {
      display: false,
      text: "",
    },
  },
  legend: {
    display: false,
  },
  scales: {
    x: {
      display: false,
      grid: {
        display: false,
      },
    },
    y: {
      display: false,
      grid: {
        display: false,
      },
    },
  },
  maintainAspectRatio: false,
};

const labels = ["", "", "", "", "", ""];

export const data = {
  labels,
  datasets: [
    {
      label: "",
      data: [5, 10, 8, 15, 20, 13],
      backgroundColor: "#2262C6",
    },
  ],
};

interface Props {
  performanceChartData: performanceChartDataType[];
  value: string;
}

interface performanceChartDataType {
  Clicks: number | null,
  Impressions: number | null,
  Install: number | null,
  Leads: number | null,
  Demo: number | null,
  RealAccount: number | null,
  FTD: number | null,
  FTDAmount: number | null,
  Deposits: number | null,
  DepositsAmount: number | null,
  Bonus: number | null,
  RawFTD: number | null,
  RawFTDAmount: number | null,
  Withdrawal: number | null,
  ChargeBack: number | null,
  NetDeposit: number | null,
  PNL: number | null,
  ActiveTrader: number | null,
  Commission: number | null,
  PendingDeposits: number | null,
  PendingDepositsAmount: number | null,
  date: string;
}

const DashboardChart = ({ performanceChartData, value }: Props) => {
  const dataValue: (number | null)[] = performanceChartData.map((field, i) => {

    interface Sum {
      [index: string]: number;
    }

    const fieldObject = field as unknown as Sum;
    const fieldValue = fieldObject ? fieldObject[value] : 0;

    return field.RealAccount;
  });

  const data = {
    labels,
    datasets: [
      {
        label: "",
        data: dataValue,
        backgroundColor: "#2262C6",
      },
    ],
  };

  
  return <Bar width={"100%"} height={"50px"} options={options} data={data} />;
};

export default DashboardChart;
