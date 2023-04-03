import DeviceReportChart from "../../common/chart/DeviceReportChart";
import DoughnutChart from "../../common/chart/DoughnutChart";
import {
  Select,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectLabel,
  SelectItem,
  SelectSeparator,
} from "../../ui/select";

const reportInfo = [
  {
    title: "Desktop",
    percentValue: 72,
    increaseValue: 7,
    color: "#2262C6",
    amount: 600,
  },
  {
    title: "Tablet",
    percentValue: 18,
    increaseValue: 7,
    color: "#F76F2C",
    amount: 500,
  },
  {
    title: "Mobile",
    percentValue: 10,
    increaseValue: 7,
    color: "#FF001B",
    amount: 300,
  },
];

const DeviceReport = () => {
  return (
    <div className="rounded-2xl bg-white px-2 py-5 shadow-sm md:px-5">
      <div className="mb-3 text-xl font-bold text-primary">Device Report</div>
      <div className="mb-5 flex justify-between">
        <div className="text-base font-light">session by device</div>
        <div className="flex items-center justify-center text-xs font-light">
          <Select defaultValue={"90"}>
            <SelectTrigger className="pr-2 text-xs font-light text-black">
              <SelectValue placeholder="Select days" />
            </SelectTrigger>
            <SelectContent className="pr-2 text-xs font-light text-black">
              <SelectGroup>
                <SelectItem value={"90"}>Last 90 Days</SelectItem>
                <SelectItem value={"30"}>Last 30 Days</SelectItem>
                <SelectItem value={"1"}>Last 1 Day</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="align-center mb-5">
        <DeviceReportChart />
      </div>
      <div className="mb-3 flex justify-between">
        <div className="text-base font-medium text-[#2262C6]">Report</div>
        <div className="flex w-48 items-center justify-center text-xs">
          <Select>
            <SelectTrigger className="w-full rounded-sm bg-[#EDF2F7] py-1 px-2">
              <SelectValue placeholder="Clicks" />
            </SelectTrigger>
            <SelectContent className="">
              <SelectGroup>
                <SelectItem value={"SignUp"}>SignUp</SelectItem>
                <SelectItem value={"Acquisition"}>Acquisition</SelectItem>
                <SelectItem value={"Demo"}>Demo</SelectItem>
                <SelectItem value={"FTD"}>FTD</SelectItem>
                <SelectItem value={"Account"}>Account</SelectItem>
                <SelectItem value={"FTD"}>FTD Account</SelectItem>
                <SelectItem value={"Withdrawal"}>Withdrawal</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>

      {reportInfo.map((report, index) => {
        return (
          <div
            className={
              "flex items-center justify-between" + (index == 2 ? "" : " mb-7")
            }
            key={report.title}
          >
            <div className="flex items-center justify-center">
              <div className="h-10 w-10 ">
                <DoughnutChart
                  value={report.percentValue}
                  color={report.color}
                />
              </div>
              <div className="ml-3 text-base">
                <div className="text-black">{report.title}</div>
                <div className="text-[#717579]">{report.percentValue}</div>
              </div>
              <div className="ml-2.5">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="12"
                  height="6"
                  viewBox="0 0 12 6"
                  fill="none"
                >
                  <path d="M12 6L6 7.15493e-08L0 6" fill="#04B042" />
                </svg>
              </div>
              <div className="ml-1 text-base text-[#04B042]">
                {report.increaseValue}%
              </div>
            </div>
            <div className="text-base font-bold text-black">
              {report.amount}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default DeviceReport;
