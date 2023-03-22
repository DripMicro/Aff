import React from "react";
import { useEffect, useState } from "react";
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
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
    title: {
      display: false,
      text: "",
    },
  },
  scales: {
    x: {
      grid: {
        display: false,
      },
    },
    y: {
      grid: {
        display: true,
      },
      left: {
        enable: true,
      },
    },
  },
};

const labels = ["January", "February", "March", "April", "May", "June"];

interface Props {
  performanceChartData: performanceChartDataType[];
}

interface performanceChartDataType {
  Accounts: number;
  ActiveTraders: number;
  date: string;
  [index: number]: { Accounts: number; date: string; ActiveTraders: number };
}

const PerformanceChart = ({ performanceChartData }: Props) => {
  console.log("PerformanceChart");
  console.log(performanceChartData);

  const Accounts: number[] = performanceChartData.map((field, i) => {
    return field.Accounts;
  });

  const ActiveTraders: number[] = performanceChartData.map((field, i) => {
    return field.ActiveTraders;
  });

  const labels: string[] = performanceChartData.map((field, i) => {
    return field.date;
  });

  const data = {
    labels,
    datasets: [
      {
        label: "Account",
        data: Accounts,
        backgroundColor: "#FF8549",
        borderRadius: 10,
      },
      {
        label: "FTD",
        data: ActiveTraders,
        backgroundColor: "#2262C6",
        borderRadius: 10,
      },
    ],
  };
  return <Bar width={"100%"} height={"30"} options={options} data={data} />;
};

export default PerformanceChart;
