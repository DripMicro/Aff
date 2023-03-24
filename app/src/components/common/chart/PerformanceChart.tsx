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
import { CategoryBar } from "@tremor/react";

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
  maintainAspectRatio : false,
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
      ticks: { color: 'black'},
      font: {
        size: 14,
      }
    },
    y1: {
      position: 'right' as const,
      grid: {
        display: false, // only want the grid lines for one axis to show up
      },
      ticks: { color: '#F37A20'},
      font: {
        size: 14,
      }
    }
  },
};

const labels = ["January", "February", "March", "April", "May", "June"];

interface Props {
  performanceChartData: performanceChartDataType[];
}

interface performanceChartDataType {
  Accounts: number|null;
  ActiveTraders: number | null;
  date: string;
  // [index: number]: { Accounts: number; date: string; ActiveTraders: number };
}

const PerformanceChart = ({ performanceChartData }: Props) => {

  const Accounts: (number | null)[] = performanceChartData.map((field, i) => {
    return field.Accounts;
  });

  const ActiveTraders: (number | null)[] = performanceChartData.map((field, i) => {
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
        yAxisID: 'y',
        // maxBarThickness: 30,
        
      },
      {
        label: "FTD",
        data: ActiveTraders,
        backgroundColor: "#2262C6",
        borderRadius: 10,
        yAxisID: 'y1',
        // maxBarThickness: 30 
      },
    ],
  };
  return (
    <>
    <div className="flex justify-between pb-4">
      <div className="text-sm">Conversion</div>
    </div>
    <Bar width={"100%"} options={options} data={data} />
    </>
  );
};

export default PerformanceChart;
