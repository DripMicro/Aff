import React from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

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
        display: false
    },
    indexAxis: 'y' as const,

    plugins: {
        legend: {
            display: false
        },
    },
    scales: {
        y: {
          grid: {
            display: false,
          },
          ticks: { color: '#000'},
          font: {
            size: 16,
          }
        },
    }
};

const labels = ['January', 'February', 'March', 'April', 'May'];

export const data = {
    labels,
    datasets: [
        {
            label: 'Dataset 1',
            data: [10, 20, 30, 50, 70],
            backgroundColor: '#3B5EC2',
            maxBarThickness: 17,
            borderRadius: 3,
        },
    ],
};

const CountryChart = () => {
    return <Bar options={options} data={data} />;
}

export default CountryChart;

