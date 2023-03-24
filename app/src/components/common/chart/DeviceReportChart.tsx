import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

export const options = {
  responsive: true,
  maintainAspectRatio: false,
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
  labels: ["Red", "Blue", "Yellow"],
  datasets: [
    {
      label: "# of Votes",
      data: [12, 19, 3],
      backgroundColor: ["#2262C6", "#F76F2C", "#FF001B"],
      borderColor: ["#2262C6", "#F76F2C", "#FF001B"],
      borderWidth: 1,
    },
  ],
};

const DeviceReportChart = () => {
  return <Pie options={options} data={data} />;
};

export default DeviceReportChart;
