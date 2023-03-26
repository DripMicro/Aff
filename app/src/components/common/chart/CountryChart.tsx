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
  responsive: true,
  maintainAspectRatio: false,
  legend: {
    display: false,
  },
  indexAxis: "y" as const,

  plugins: {
    legend: {
      display: false,
    },
  },
  scales: {
    y: {
      grid: {
        display: false,
      },
      ticks: { color: "#000" },
      font: {
        size: 16,
      },
    },
  },
};

const labels = ["Israel", "Brazil", "Canada", "USA", "Somalia"];

export const data = {
  labels,
  datasets: [
    {
      label: "Dataset 1",
      data: [60, 10, 40, 30, 70],
      backgroundColor: "#3B5EC2",
      maxBarThickness: 17,
      borderRadius: 3,
    },
  ],
};

const CountryChart = () => {
  return <Bar options={options} data={data} />;
};

export default CountryChart;
