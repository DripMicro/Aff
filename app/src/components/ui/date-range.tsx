import { FormLabel, GridItem } from "@chakra-ui/react";
import { queryTypes, useQueryState } from "next-usequerystate";
import { useState } from "react";
import DatePicker from "react-datepicker";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./select";

export const DateRangeSelect = ({}) => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [userDate, setuserDate] = useState("");
  const [from, setFrom] = useQueryState("from", queryTypes.isoDateTime);
  const [to, setTo] = useQueryState("to", queryTypes.isoDateTime);
  const handleUserDateChange = (userDate: string) => {
    const date = new Date();
    switch (userDate) {
      case "today":
        setStartDate(date);
        setEndDate(date);
        break;
      case "yesterday":
        date.setDate(date.getDate() - 1);
        setStartDate(date);
        setEndDate(date);
        break;
      case "this_week":
        const firstDay = new Date(date.setDate(date.getDate() - date.getDay()));
        const lastDay = new Date(
          date.setDate(date.getDate() - date.getDay() + 6)
        );
        setStartDate(firstDay);
        setEndDate(lastDay);
        break;
      case "this_month":
        const firstDayOfMonth = new Date(
          date.getFullYear(),
          date.getMonth(),
          1
        );
        const lastDayOfMonth = new Date(
          date.getFullYear(),
          date.getMonth() + 1,
          0
        );
        setStartDate(firstDayOfMonth);
        setEndDate(lastDayOfMonth);
        break;
      case "last_month":
        const prevMonthLastDate = new Date(
          date.getFullYear(),
          date.getMonth(),
          0
        );
        const prevMonthFirstDate = new Date(
          date.getFullYear() - (date.getMonth() > 0 ? 0 : 1),
          (date.getMonth() - 1 + 12) % 12,
          1
        );
        setStartDate(prevMonthFirstDate);
        setEndDate(prevMonthLastDate);
        break;
      case "this_year":
        const first_date_of_the_year = new Date(new Date().getFullYear(), 0, 1);
        setStartDate(first_date_of_the_year);
        setEndDate(date);
        break;
      case "last_year":
        const firstDateOfLastYear = new Date(
          new Date().getFullYear() - 1,
          0,
          1
        );
        const lastDateOfLastYear = new Date(
          new Date().getFullYear() - 1,
          11,
          31
        );
        setStartDate(firstDateOfLastYear);
        setEndDate(lastDateOfLastYear);
        break;
      default:
        setStartDate(date);
        setEndDate(date);
        break;
    }
  };
  //   useEffect(() => {
  //     setFrom(startDate);
  //     setTo(endDate);
  //   }, [startDate, endDate]);

  console.log("from", from, "to", to);
  return (
    <>
      <GridItem>
        <div className="mt-2">
          <Select onValueChange={handleUserDateChange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="today">Today</SelectItem>
              <SelectItem value="yesterday">YesterDay</SelectItem>
              <SelectItem value="this_week">This Week</SelectItem>
              <SelectItem value="this_month">This Month</SelectItem>
              <SelectItem value="last_month">Last Month</SelectItem>
              <SelectItem value="this_year">This Year</SelectItem>
              <SelectItem value="last_year">Last Year</SelectItem>
              <SelectItem value="custom">Custom</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </GridItem>
      <GridItem>
        <FormLabel>From: </FormLabel>
        <DatePicker
          selected={startDate}
          onChange={(date: Date) => setStartDate(date)}
          selectsStart
          startDate={startDate}
          endDate={endDate}
        />
      </GridItem>
      <GridItem>
        <FormLabel>To: </FormLabel>
        <DatePicker
          selected={endDate}
          onChange={(date: Date) => setEndDate(date)}
          selectsEnd
          startDate={startDate}
          endDate={endDate}
        />
      </GridItem>
    </>
  );
};
