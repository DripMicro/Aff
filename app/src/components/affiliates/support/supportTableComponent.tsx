import * as React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import { createColumnHelper } from "@tanstack/react-table";
import { CustomersupportTable } from "./CustomersupportTable";

import { SupportDropdown } from "./supportDropdown";

type UnitConversion = {
  id: string;
  TicketID: string;
  date: string;
  time: string;
  Ticketsub: string;
  lasres: string;
  cstatus: string;
};

const data: UnitConversion[] = [
  {
    id: "1",
    TicketID: "1000045",
    date: "19/04/2021",
    time: "22:01:40",
    Ticketsub: "wwwww",
    lasres: "--",
    cstatus: "open",
  },
  {
    id: "2",
    TicketID: "1000045",
    date: "19/04/2021",
    time: "22:01:40",
    Ticketsub: "wwwww",
    lasres: "--",
    cstatus: "open",
  },
  {
    id: "3",
    TicketID: "1000045",
    date: "19/04/2021",
    time: "22:01:40",
    Ticketsub: "wwwww",
    lasres: "--",
    cstatus: "open",
  },
  {
    id: "4",
    TicketID: "1000045",
    date: "19/04/2021",
    time: "22:01:40",
    Ticketsub: "wwwww",
    lasres: "--",
    cstatus: "open",
  },
  {
    id: "5",
    TicketID: "1000045",
    date: "19/04/2021",
    time: "22:01:40",
    Ticketsub: "wwwww",
    lasres: "--",
    cstatus: "open",
  },
  {
    id: "6",
    TicketID: "1000045",
    date: "19/04/2021",
    time: "22:01:40",
    Ticketsub: "wwwww",
    lasres: "--",
    cstatus: "open",
  },
  {
    id: "7",
    TicketID: "1000045",
    date: "19/04/2021",
    time: "22:01:40",
    Ticketsub: "wwwww",
    lasres: "--",
    cstatus: "open",
  },
  {
    id: "8",
    TicketID: "1000045",
    date: "19/04/2021",
    time: "22:01:40",
    Ticketsub: "wwwww",
    lasres: "--",
    cstatus: "open",
  },
  {
    id: "1",
    TicketID: "1000045",
    date: "19/04/2021",
    time: "22:01:40",
    Ticketsub: "wwwww",
    lasres: "--",
    cstatus: "open",
  },
  {
    id: "2",
    TicketID: "1000045",
    date: "19/04/2021",
    time: "22:01:40",
    Ticketsub: "wwwww",
    lasres: "--",
    cstatus: "open",
  },
  {
    id: "3",
    TicketID: "1000045",
    date: "19/04/2021",
    time: "22:01:40",
    Ticketsub: "wwwww",
    lasres: "--",
    cstatus: "open",
  },
  {
    id: "4",
    TicketID: "1000045",
    date: "19/04/2021",
    time: "22:01:40",
    Ticketsub: "wwwww",
    lasres: "--",
    cstatus: "open",
  },
  {
    id: "5",
    TicketID: "1000045",
    date: "19/04/2021",
    time: "22:01:40",
    Ticketsub: "wwwww",
    lasres: "--",
    cstatus: "open",
  },
  {
    id: "6",
    TicketID: "1000045",
    date: "19/04/2021",
    time: "22:01:40",
    Ticketsub: "wwwww",
    lasres: "--",
    cstatus: "open",
  },
  {
    id: "7",
    TicketID: "1000045",
    date: "19/04/2021",
    time: "22:01:40",
    Ticketsub: "wwwww",
    lasres: "--",
    cstatus: "open",
  },
  {
    id: "8",
    TicketID: "1000045",
    date: "19/04/2021",
    time: "22:01:40",
    Ticketsub: "wwwww",
    lasres: "--",
    cstatus: "open",
  },
];

const columnHelper = createColumnHelper<UnitConversion>();

const columns = [
  columnHelper.accessor("id", {
    cell: (info) => info.getValue(),
    header: "#",
  }),
  columnHelper.accessor("TicketID", {
    cell: (info) => info.getValue(),
    header: "TIcketID",
  }),
  columnHelper.accessor("date", {
    cell: (info) => info.getValue(),
    header: "Date",
  }),
  columnHelper.accessor("time", {
    cell: (info) => info.getValue(),
    header: "Time",
  }),
  columnHelper.accessor("Ticketsub", {
    cell: (info) => info.getValue(),
    header: "TIcketSubject",
  }),
  columnHelper.accessor("lasres", {
    cell: (info) => info.getValue(),
    header: "Las Response",
  }),
  columnHelper.accessor("cstatus", {
    cell: (info) => info.getValue(),
    header: "Current Status",
  }),
  columnHelper.accessor("edit-button" as any, {
    cell: (info) => {
      return (
        <>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="4"
            height="18"
            viewBox="0 0 4 18"
            fill="none"
          >
            <circle cx="2" cy="2" r="2" fill="#B8B8B8" />
            <circle cx="2" cy="9" r="2" fill="#B8B8B8" />
            <circle cx="2" cy="16" r="2" fill="#B8B8B8" />
          </svg>
        </>
        // <SupportDropdown />
      );
    },
    header: "Action",
  }),
];

export default function SupportTableComponent() {
  return (
    <ChakraProvider>
      <CustomersupportTable columns={columns} data={data} />
    </ChakraProvider>
  );
}
