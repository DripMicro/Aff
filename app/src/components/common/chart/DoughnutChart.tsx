import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

export const options = {
  responsive: true,
  maintainAspectRatio: false,
  legend: {
    display: false,
  },
  plugins: {
    legend: {
      display: false,
    },
    title: {
      display: false,
      text: "",
    },
  },
};

export const data = {
  labels: ["", "", ""],
  datasets: [
    {
      data: [12, 19],
      backgroundColor: ["#2262C6", "#EEEEEE"],
      borderColor: ["#2262C6", "#EEEEEE"],
      borderWidth: 1,
    },
  ],
};

const DoughnutChart = () => {
  return <Doughnut options={options} data={data} />;
};

export default DoughnutChart;
