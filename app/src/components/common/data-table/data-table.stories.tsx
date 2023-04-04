import { createColumnHelper } from "@tanstack/react-table";
import type { TopMerchantCreativeType } from "../../../server/db-types";
import { DataTable } from "./DataTable";

const meta = {
  component: DataTable,
};

export default meta;

const creative: any = [
  {
    id: 86,
    rdate: "2017-10-03T08:27:36.000Z",
    last_update: "2018-03-08T12:02:44.000Z",
    valid: 1,
    admin_id: 1,
    merchant_id: 1,
    product_id: 0,
    language_id: 1,
    promotion_id: 0,
    title: "CKcasino Free spins _6",
    type: "image",
    width: 728,
    height: 90,
    url: "https://ckcasino.com/#/lobby",
    iframe_url: "",
    alt: "CKcasino Free spins ",
    scriptCode: "",
    affiliate_id: 0,
    category_id: 3,
    featured: 1,
    affiliateReady: 1,
    merchant: {
      name: "CKCasino",
    },
    language: {
      title: "English",
    },
    category: {
      categoryname: "Free Spins ",
    },
    file: "https://go.best-brokers-partners.com/files/banners/1507019256y56Xq.png",
  },
  {
    id: 85,
    rdate: "2017-10-03T08:27:36.000Z",
    last_update: "2018-03-08T12:02:39.000Z",
    valid: 1,
    admin_id: 1,
    merchant_id: 1,
    product_id: 0,
    language_id: 1,
    promotion_id: 0,
    title: "CKcasino Free spins _5",
    type: "image",
    width: 468,
    height: 60,
    url: "https://ckcasino.com/#/lobby",
    iframe_url: "",
    alt: "CKcasino Free spins ",
    scriptCode: "",
    affiliate_id: 0,
    category_id: 3,
    featured: 1,
    affiliateReady: 1,
    merchant: {
      name: "CKCasino",
    },
    language: {
      title: "English",
    },
    category: {
      categoryname: "Free Spins ",
    },
    file: "https://go.best-brokers-partners.com/files/banners/1507019256u56PO.png",
  },
  {
    id: 11,
    rdate: "2017-06-19T08:59:55.000Z",
    last_update: "2017-09-27T12:22:16.000Z",
    valid: 1,
    admin_id: 1,
    merchant_id: 1,
    product_id: 0,
    language_id: 1,
    promotion_id: 0,
    title: "CKcasino Exclusive offer  _4",
    type: "image",
    width: 300,
    height: 250,
    url: "https://ckcasino.com/#/lobby",
    iframe_url: "",
    alt: "CKcasino  Exclusive offer  ",
    scriptCode: "",
    affiliate_id: 0,
    category_id: 1,
    featured: 1,
    affiliateReady: 1,
    merchant: {
      name: "CKCasino",
    },
    language: {
      title: "English",
    },
    category: {
      categoryname: "Welcome Bonus ",
    },
    file: "https://go.best-brokers-partners.com/files/banners/1497862795p95FJ.gif",
  },
];

const columnHelper = createColumnHelper<TopMerchantCreativeType>();

const columns = [
  columnHelper.accessor("merchant.name", {
    cell: (info) => info.getValue(),
    header: "Merchant",
  }),
  columnHelper.accessor("language.title", {
    cell: (info) => info.getValue(),
    header: "Language",
  }),
  columnHelper.accessor("title", {
    cell: (info) => info.getValue(),
    header: "Creative Name",
  }),
  columnHelper.accessor("file", {
    cell: ({ row }) => {
      return !!row.original.file ? (
        <img
          className="w-44 bg-cover md:w-full"
          src={row.original.file}
          alt={row.original.alt}
        />
      ) : null;
    },
    header: "Preview",
  }),
  columnHelper.accessor("width", {
    cell: ({ row }) => {
      return (
        <span>
          {row.original.width}x{row.original.height}
        </span>
      );
    },
    header: "LP Preview",
  }),
];

export const DataTables = {
  render: () => (
    <div className="mb-5 rounded-2xl bg-white px-2 py-5 shadow-sm md:px-5">
      <div className="text-xl font-bold text-[#2262C6] ">
        Top Performing Creative
      </div>
      <DataTable data={creative} columns={columns} />
    </div>
  ),
};
