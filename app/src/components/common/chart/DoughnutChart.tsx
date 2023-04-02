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

interface Props {
  value: number;
  color: string;
}

const DoughnutChart = ({value, color}:Props) => {

  const data = {
    labels: ["", "", ""],
    datasets: [
      {
        data: [value, 100-value],
        backgroundColor: [color, "#EEEEEE"],
        borderColor: [color, "#EEEEEE"],
        borderWidth: 1,
      },
    ],
  };

  return <Doughnut options={options} data={data} />;
};

export default DoughnutChart;
