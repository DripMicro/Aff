import CountryChart from "./CountryChart";
import ConversionChart from "./ConversionChart";
import PerformanceChart from "./PerformanceChart";
import DeviceReportChart from "./DeviceReportChart";
import DoughnutChart from "./DoughnutChart";
import PerformanceLineChart from "./PerformanceLineChart";

const meta = {
  component: CountryChart,
};

export default meta;

const conversionChartData = [
  {
    date: "Oct, 2022",
    Conversions: 20,
  },
  {
    date: "Nov, 2022",
    Conversions: 25,
  },
  {
    date: "Dec, 2022",
    Conversions: 16.666666666666664,
  },
  {
    date: "Jan, 2023",
    Conversions: 0,
  },
  {
    date: "Feb, 2023",
    Conversions: 0,
  },
  {
    date: "Mar, 2023",
    Conversions: 0,
  },
];

const performanceChart = [
  {
    date: "Oct, 2022",
    Accounts: 5,
    ActiveTraders: 1,
  },
  {
    date: "Nov, 2022",
    Accounts: 4,
    ActiveTraders: 1,
  },
  {
    date: "Dec, 2022",
    Accounts: 6,
    ActiveTraders: 1,
  },
  {
    date: "Jan, 2023",
    Accounts: 0,
    ActiveTraders: 0,
  },
  {
    date: "Feb, 2023",
    Accounts: 0,
    ActiveTraders: 0,
  },
  {
    date: "Mar, 2023",
    Accounts: 0,
    ActiveTraders: 0,
  },
];

export const ConversionCharts = {
  render: () => (
    <div className="mt-5 h-80  pb-5">
      <ConversionChart conversionChartData={conversionChartData} />
    </div>
  ),
};

export const PerformanceCharts = {
  render: () => (
    <div className="mt-5 h-80  pb-5">
      <PerformanceChart performanceChartData={performanceChart} />
    </div>
  ),
};

export const PerformanceLineCharts = {
  render: () => (
    <div className="mt-5 h-80  pb-5">
      <PerformanceLineChart performanceChartData={performanceChart} />
    </div>
  ),
};

export const CountryCharts = {
  render: () => <CountryChart />,
};

export const DeviceReportCharts = {
  render: () => <DeviceReportChart />,
};

export const DoughnutCharts = {
  render: () => <DoughnutChart value={30} color="#f0f" />,
};
