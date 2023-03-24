import React from "react";
import { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { CategoryBar } from "@tremor/react";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

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
      ticks: { color: "black" },
      font: {
        size: 14,
      },
    },
  },
};

const labels = ["January", "February", "March", "April", "May", "June"];

interface Props {
  conversionChartData: conversionChartDataType[];
}

interface conversionChartDataType {
  Conversions: number | null;
  date: string;
  // [index: number]: { Accounts: number; date: string; ActiveTraders: number };
}

const ConversionChartData = ({ conversionChartData }: Props) => {
  const Conversions: (number | null)[] = conversionChartData.map((field, i) => {
    return field.Conversions;
  });

  const labels: string[] = conversionChartData.map((field, i) => {
    return field.date;
  });

  const data = {
    labels,
    datasets: [
      {
        label: "Conversation",
        data: Conversions,
        backgroundColor: "#FF8549",
        borderRadius: 10,
        yAxisID: "y",
        // maxBarThickness: 30,
      },
    ],
  };
  return (
    <>
      <div className="flex justify-between pb-4">
        <div className="text-sm">Conversion</div>
      </div>
      <Line width={"100%"} options={options} data={data} />
    </>
  );
};

export default ConversionChartData;
