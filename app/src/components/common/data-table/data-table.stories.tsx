import { DataTable } from "./DataTable";
import {
  columnsCreative,
  creativeSampleData,
} from "./data-table-sample-creative-data";
import { ReportDataTable } from "./ReportDataTable";
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

export const DataTableBase = {
  render: () => (
    <div className="scrollbar-thin relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-left text-sm text-gray-500 dark:text-gray-400">
        <thead className="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              Product name
            </th>
            <th scope="col" className="px-6 py-3">
              Color
            </th>
            <th scope="col" className="px-6 py-3">
              Category
            </th>
            <th scope="col" className="px-6 py-3">
              Price
            </th>
            <th scope="col" className="px-6 py-3">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-b bg-white dark:border-gray-700 dark:bg-gray-900">
            <th
              scope="row"
              className="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white"
            >
              Apple MacBook Pro 17
            </th>
            <td className="px-6 py-4">Silver</td>
            <td className="px-6 py-4">Laptop</td>
            <td className="px-6 py-4">$2999</td>
            <td className="px-6 py-4">
              <a
                href="#"
                className="font-medium text-blue-600 hover:underline dark:text-blue-500"
              >
                Edit
              </a>
            </td>
          </tr>
          <tr className="border-b bg-gray-50 dark:border-gray-700 dark:bg-gray-800">
            <th
              scope="row"
              className="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white"
            >
              Microsoft Surface Pro
            </th>
            <td className="px-6 py-4">White</td>
            <td className="px-6 py-4">Laptop PC</td>
            <td className="px-6 py-4">$1999</td>
            <td className="px-6 py-4">
              <a
                href="#"
                className="font-medium text-blue-600 hover:underline dark:text-blue-500"
              >
                Edit
              </a>
            </td>
          </tr>
          <tr className="border-b bg-white dark:border-gray-700 dark:bg-gray-900">
            <th
              scope="row"
              className="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white"
            >
              Magic Mouse 2
            </th>
            <td className="px-6 py-4">Black</td>
            <td className="px-6 py-4">Accessories</td>
            <td className="px-6 py-4">$99</td>
            <td className="px-6 py-4">
              <a
                href="#"
                className="font-medium text-blue-600 hover:underline dark:text-blue-500"
              >
                Edit
              </a>
            </td>
          </tr>
          <tr className="border-b bg-gray-50 dark:border-gray-700 dark:bg-gray-800">
            <th
              scope="row"
              className="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white"
            >
              Google Pixel Phone
            </th>
            <td className="px-6 py-4">Gray</td>
            <td className="px-6 py-4">Phone</td>
            <td className="px-6 py-4">$799</td>
            <td className="px-6 py-4">
              <a
                href="#"
                className="font-medium text-blue-600 hover:underline dark:text-blue-500"
              >
                Edit
              </a>
            </td>
          </tr>
          <tr>
            <th
              scope="row"
              className="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white"
            >
              Apple Watch 5
            </th>
            <td className="px-6 py-4">Red</td>
            <td className="px-6 py-4">Wearables</td>
            <td className="px-6 py-4">$999</td>
            <td className="px-6 py-4">
              <a
                href="#"
                className="font-medium text-blue-600 hover:underline dark:text-blue-500"
              >
                Edit
              </a>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  ),
};
