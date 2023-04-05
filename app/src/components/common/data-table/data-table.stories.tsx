import { createColumnHelper } from "@tanstack/react-table";
import { DataTable } from "./DataTable";
import {
  columnsCreative,
  creativeSampleData,
} from "./data-table-sample-creative-data";
import { ReportDataTable } from "./ReportDataTable";
import { AffiliateProfileType } from "@/server/db-types";
import { Button } from "@/components/ui/button";
import { EditIcon } from "lucide-react";
import {
  profileColumns,
  sampleData,
} from "@/components/common/data-table/data-table-sample-profile-data";

const meta = {
  component: DataTable,
};

export default meta;

export const DataTables = {
  render: () => (
    <div className="mb-5 rounded-2xl bg-white px-2 py-5 shadow-sm md:px-5">
      <div className="text-xl font-bold text-[#2262C6] ">
        Top Performing Creative
      </div>
      <DataTable data={creativeSampleData} columns={columnsCreative} />
    </div>
  ),
  name: "DataTable with Creative",
};

const data = sampleData.map((item) => {
  return {
    ...item,
    rdate: new Date(item.rdate),
  };
});

export const DataTableComponent = {
  render: () => <DataTable data={data} columns={profileColumns} />,
  name: "DataTable with Profile",
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/CHxJV6V2o7WVj1rsYmRRWe/Affiliate_client_Design?node-id=35-1312&t=iaMez9Khkj5AeV4D-4",
    },
  },
};

export const ReportDataTableComponent = {
  render: () => <ReportDataTable data={data} columns={profileColumns} />,
  name: "ReportDataTable",
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/CHxJV6V2o7WVj1rsYmRRWe/Affiliate_client_Design?node-id=35-1312&t=iaMez9Khkj5AeV4D-4",
    },
  },
};
