import React from "react";
import { DataTable } from "./DataTable";
import { sampleData } from "./data-table-sample-data";
import { createColumnHelper } from "@tanstack/react-table";
import { AffiliateProfileType } from "@/server/db-types";
import { Button } from "@chakra-ui/react";
import { EditIcon } from "@chakra-ui/icons";
import { ReportDataTable } from "./ReportDataTable";

const meta = {
  component: DataTable,
};

export default meta;

const columnHelper = createColumnHelper<AffiliateProfileType>();

const createColumn = (id: keyof AffiliateProfileType, header: string) =>
  columnHelper.accessor(id, {
    cell: (info) => info.getValue(),
    header,
  });

const columns = [
  createColumn("id", "#"),
  createColumn("name", "Profile Name"),
  createColumn("url", "URL"),
  createColumn("description", "Description"),
  createColumn("source_traffic", "Traffic Source"),
  columnHelper.accessor("valid", {
    // cell: (info) => info.getValue(),
    cell: (info) => {
      return info.getValue() ? (
        <div className="flex justify-center text-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="12"
            height="10"
            viewBox="0 0 12 10"
            fill="none"
          >
            <path
              d="M0.951172 5.85409L4.28451 8.97909L10.9512 0.645752"
              stroke="#50B8B6"
              stroke-width="2"
              stroke-linejoin="round"
            />
          </svg>
        </div>
      ) : (
        <div className="flex justify-center text-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="8"
            height="8"
            viewBox="0 0 8 8"
            fill="none"
          >
            <path
              d="M1.52576 8L4 5.52576L6.47424 8L8 6.47424L5.52576 4L8 1.52576L6.47424 0L4 2.47424L1.52576 0L0 1.52576L2.47424 4L0 6.47424L1.52576 8Z"
              fill="#FE6969"
            />
          </svg>
        </div>
      );
    },
    header: "Available",
  }),
  columnHelper.accessor("edit-button" as any, {
    cell: (info) => {
      return (
        <Button
          leftIcon={<EditIcon />}
          onClick={() => {
            console.log(`muly:Action`, {});
          }}
          fontSize="text-xs"
          px={2}
          height={8}
        >
          Edit
        </Button>
      );
    },
    header: "Action",
  }),
];

const data = sampleData.map((item) => {
  return {
    ...item,
    rdate: new Date(item.rdate),
  };
});

export const DataTableComponent = {
  render: () => <DataTable data={data} columns={columns} />,
  name: "DataTable",
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/CHxJV6V2o7WVj1rsYmRRWe/Affiliate_client_Design?node-id=37-2842&t=iaMez9Khkj5AeV4D-4",
    },
  },
};

export const ReportDataTableComponent = {
  render: () => <ReportDataTable data={data} columns={columns} />,
  name: "ReportDataTable",
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/CHxJV6V2o7WVj1rsYmRRWe/Affiliate_client_Design?node-id=35-1312&t=iaMez9Khkj5AeV4D-4",
    },
  },
};
