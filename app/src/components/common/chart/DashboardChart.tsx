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

const DashboardChart = () => {
  return <Bar width={"100%"} height={"50px"} options={options} data={data} />;
};

export default DashboardChart;
