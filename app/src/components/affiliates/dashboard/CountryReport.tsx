import CountryChart from "../../common/chart/CountryChart";
import {
    Select, SelectGroup, SelectValue, SelectTrigger, SelectContent, SelectLabel, SelectItem, SelectSeparator
} from "../../ui/select";

const AccountManager = () => {

    return (
        <div className="rounded-2xl bg-white px-2 py-5 shadow-sm md:px-5">
            <div className="mb-3 text-xl font-bold text-[#2262C6]">
                Country Report
            </div>
            <div className="mb-7 flex justify-between">
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
            <div className="align-center align-center mb-5 flex justify-center">
                <img width="243" src="/img/worldMap.png" alt="worldmap" />
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

            <div className="flex h-48 items-center justify-between">
                <CountryChart />
            </div>
        </div>

    );
};

export default AccountManager;