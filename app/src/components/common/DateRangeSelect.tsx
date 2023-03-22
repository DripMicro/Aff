// import DatePicker from "react-datepicker";
import { useState } from "react";
import {
  Box,
  FormControl,
  FormLabel,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  SimpleGrid,
  HStack,
  Image,
  Select,
  useDisclosure,
} from "@chakra-ui/react";
import {
  endOfDay,
  endOfMonth,
  endOfYear,
  format,
  parse,
  startOfDay,
  startOfMonth,
  startOfWeek,
  startOfYear,
  sub,
} from "date-fns";
import { queryTypes, useQueryState } from "next-usequerystate";
import { useRouter } from "next/router";
import { DatePicker } from "./datepicker/Datepicker";

type DateRange =
  | "today"
  | "yesterday"
  | "this-week"
  | "month-to-date"
  | "last-month"
  | "last-6-month"
  | "year-to-date"
  | "last-year";

type CustomDateRange = DateRange | "custom";

const formatValueDateRange = (
  from: Date | null | undefined,
  to: Date | null | undefined
) => {
  return `${format(
    from || sub(new Date(), { months: 6 }),
    "yyyyMMdd"
  )}-${format(to || new Date(), "yyyyMMdd")}`;
};

const getPredefinedDateRange = (value?: string | null) => {
  const setRange = (value: CustomDateRange, from: Date, to: Date) => ({
    name: value,
    from,
    to,
  });

  console.log(`muly:handleSelectDateRange ${value}`, {});
  const today = new Date();
  let range;
  if (value === "today") {
    range = setRange(value, today, today);
  } else if (value === "yesterday") {
    const yesterday = sub(today, { days: 1 });
    range = setRange(value, yesterday, yesterday);
  } else if (value === "this-week") {
    range = setRange(value, startOfWeek(today), today);
  } else if (value === "month-to-date") {
    range = setRange(value, startOfMonth(today), today);
  } else if (value === "last-month") {
    range = setRange(
      value,
      startOfMonth(sub(today, { months: 1 })),
      endOfMonth(sub(today, { months: 1 }))
    );
  } else if (value === "year-to-date") {
    range = setRange(value, startOfYear(today), today);
  } else if (value === "last-year") {
    range = setRange(
      value,
      startOfYear(sub(today, { years: 1 })),
      endOfYear(sub(today, { years: 1 }))
    );
  } /* if (value === "last-6-month") */ else {
    range = setRange(
      "last-6-month",
      startOfMonth(sub(today, { months: 6 })),
      endOfMonth(sub(today, { months: 1 }))
    );
  }

  return range;
};

const getDateRange = (value?: string) => {
  let range;
  const regex = /^(\d{8})-(\d{8})$/gm;

  if (value && regex.exec(value)) {
    console.log(`muly:getDateRange parse dates, are they? ${value}`, {
      re: regex.exec(value),
    });
    const [fromS, toS] = (value || "").split("-");

    const from = parse(fromS || "", "yyyyMMdd", new Date());
    const to = parse(toS || "", "yyyyMMdd", new Date());

    if (isNaN(from.getTime()) || isNaN(to.getTime())) {
      range = getPredefinedDateRange("last-6-month");
    } else {
      range = {
        name: "custom",
        from,
        to,
      };
    }
  } else {
    range = getPredefinedDateRange(value);
  }

  return {
    name: range.name,
    from: startOfDay(range.from),
    to: endOfDay(range.to),
  };
};

interface Props {
  range?: DateRange;
}

export const useDateRange = (defaultRange?: DateRange) => {
  const router = useRouter();
  const { dates } = router.query;

  const value = String(dates);
  return getDateRange(value || defaultRange || "last-6-month");
};

export const DateRangeSelect = ({ range: defaultRange }: Props) => {
  const range = defaultRange || "last-6-month";
  const [value, setValue] = useQueryState(
    "dates",
    queryTypes.string.withDefault(range)
  );

  const { name, from, to } = getDateRange(value);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const [fromDate, setFromDate] = useState(new Date());
  const [toDate, setToDate] = useState(new Date());

  const setDateRange = async (from: Date | null, to: Date | null) => {
    return setValue(formatValueDateRange(from, to));
  };

  const handleOnchage = async () => {
    await setDateRange(fromDate, toDate);
  };

  const handleSelectDateRange = async (value: DateRange) => {
    await setValue(value);
  };

  console.log(`muly:DateRangeSelect render ${name}`, { from, to });

  const month: string[] = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  return (
    <>
      <FormControl>
        <HStack>
          <div className="flex">
            <div className="relative">
              <select
                className="pl-2 pr-8 md:pl-6 md:pr-14 py-2 flex space-x-2 items-center border rounded border-[#D7D7D7] bg-white appearance-none cursor-pointer text-xs md:text-base"
                placeholder="Select date range"
                value={name}
                onChange={(event) => {
                  if (event.target.value !== "custom") {
                    void handleSelectDateRange(event.target.value as DateRange);
                  }
                }}
              >
                <option value="today">Today</option>
                <option value="yesterday">Yesterday</option>
                <option value="this-week">This Week</option>
                <option value="month-to-date">Month to Date</option>
                <option value="last-month">Last Month</option>
                <option value="last-6-month">Last 6 Month</option>
                <option value="year-to-date">Year to Date</option>
                <option value="last-year">Last Year</option>
                <option value="custom">Custom</option>
              </select>

              <div className="absolute -mt-7 md:-mt-8 right-2 md:right-6 cursor-pointer ">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                >
                  <path
                    d="M17 3.00024H16V1.00024C16 0.735028 15.8946 0.480674 15.7071 0.293137C15.5196 0.105601 15.2652 0.000244141 15 0.000244141C14.7348 0.000244141 14.4804 0.105601 14.2929 0.293137C14.1054 0.480674 14 0.735028 14 1.00024V3.00024H6V1.00024C6 0.735028 5.89464 0.480674 5.70711 0.293137C5.51957 0.105601 5.26522 0.000244141 5 0.000244141C4.73478 0.000244141 4.48043 0.105601 4.29289 0.293137C4.10536 0.480674 4 0.735028 4 1.00024V3.00024H3C2.20435 3.00024 1.44129 3.31631 0.87868 3.87892C0.316071 4.44153 0 5.20459 0 6.00024V7.00024H20V6.00024C20 5.20459 19.6839 4.44153 19.1213 3.87892C18.5587 3.31631 17.7956 3.00024 17 3.00024Z"
                    fill="#2262C6"
                  />
                  <path
                    d="M0 17.0002C0 17.7959 0.316071 18.5589 0.87868 19.1216C1.44129 19.6842 2.20435 20.0002 3 20.0002H17C17.7956 20.0002 18.5587 19.6842 19.1213 19.1216C19.6839 18.5589 20 17.7959 20 17.0002V9.00024H0V17.0002Z"
                    fill="#2262C6"
                  />
                </svg>
              </div>
            </div>

            <div
              className="px-2 md:px-4 py-2 ml-2 border rounded border-[#D7D7D7] bg-white cursor-pointer text-xs md:text-base"
              onClick={onOpen}
            >
              {from.getDate()} {month[from.getMonth()]} {from.getFullYear()}{" "}
              &nbsp;&nbsp; TO &nbsp;&nbsp;
              {to.getDate()} {month[to.getMonth()]} {to.getFullYear()}
            </div>
          </div>

          {/* <DatePicker
          selected={from}
          onChange={(date) => setDateRange(date, to)}
        />
        <DatePicker
          selected={to}
          onChange={(date) => setDateRange(from, date)}
        /> */}
        </HStack>
      </FormControl>
      <Modal isOpen={isOpen} size="3xl" onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent ml={4} mr={4}>
          <div className="flex pl-6 md:pl-8 pt-4 justify-between items-end">
            <div className="text-[#282560] font-medium">Add Date</div>
            <Image
              alt="..."
              className="mr-4 w-10 h-10 rounded-full align-middle "
              src="/img/icons/close.png"
              onClick={onClose}
            />
          </div>

          <ModalBody>
            <div className="max-w-lg mt-2 md:mt-7">
              <label className="text-[#525252] px-0 md:px-4 font-medium text-sm">
                Start Date
              </label>
              <div className="px-0 md:px-2 pt-2">
                <DatePicker
                  date={fromDate}
                  onChange={setFromDate}
                  handleOnchage={handleOnchage}
                ></DatePicker>
              </div>
            </div>

            <div className="max-w-lg mt-2 md:mt-7 pb-10 md:pb-80">
              <label className="text-[#525252] px-0 md:px-4 font-medium text-sm">
                End Date
              </label>
              <div className="px-0 md:px-2 pt-2">
                <DatePicker
                  date={toDate}
                  onChange={setToDate}
                  handleOnchage={handleOnchage}
                ></DatePicker>
              </div>
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
