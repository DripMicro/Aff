import { createColumnHelper } from "@tanstack/react-table";
import type { AffiliateProfileType } from "@/server/db-types";
import { TopMerchantCreativeType } from "@/server/db-types";
import { Button } from "@/components/ui/button";
import { EditIcon } from "lucide-react";

export const sampleData = [
  {
    id: 112,
    rdate: "2023-03-22T20:33:13.000Z",
    valid: 1,
    affiliate_id: 500,
    name: "sas4",
    url: "http://localhost:3001/affiliates/profiles",
    description: "",
    source_traffic: "",
  },
  {
    id: 113,
    rdate: "2023-03-22T20:33:24.000Z",
    valid: 1,
    affiliate_id: 500,
    name: "sas4",
    url: "http://localhost:3001/affiliates/profiles",
    description: "",
    source_traffic: "",
  },
  {
    id: 110,
    rdate: "2023-03-22T20:32:17.000Z",
    valid: 1,
    affiliate_id: 500,
    name: "sas2",
    url: "http://localhost:3001/affiliates/profiles",
    description: "",
    source_traffic: "",
  },
  {
    id: 69,
    rdate: "2023-01-27T09:49:36.000Z",
    valid: 1,
    affiliate_id: 500,
    name: "sas",
    url: "http://localhost:3001/affiliates/profiles",
    description: "",
    source_traffic: "",
  },
  {
    id: 70,
    rdate: "2023-01-27T10:01:44.000Z",
    valid: 1,
    affiliate_id: 500,
    name: "sdada",
    url: "http://localhost:3001/affiliates/profiles",
    description: "",
    source_traffic: "",
  },
  {
    id: 72,
    rdate: "2023-01-27T10:18:46.000Z",
    valid: 1,
    affiliate_id: 500,
    name: "dsdas",
    url: "http://localhost:3001/affiliates/profiles",
    description: "",
    source_traffic: "",
  },
  {
    id: 73,
    rdate: "2023-01-27T10:18:49.000Z",
    valid: 1,
    affiliate_id: 500,
    name: "dsdas",
    url: "http://localhost:3001/affiliates/profiles",
    description: "",
    source_traffic: "",
  },
  {
    id: 74,
    rdate: "2023-01-27T10:18:52.000Z",
    valid: 1,
    affiliate_id: 500,
    name: "dsdas",
    url: "http://localhost:3001/affiliates/profiles",
    description: "",
    source_traffic: "",
  },
  {
    id: 75,
    rdate: "2023-01-27T10:18:56.000Z",
    valid: 1,
    affiliate_id: 500,
    name: "dsdas",
    url: "http://localhost:3001/affiliates/profiles",
    description: "",
    source_traffic: "",
  },
  {
    id: 76,
    rdate: "2023-01-27T10:19:40.000Z",
    valid: 1,
    affiliate_id: 500,
    name: "sasa",
    url: "http://localhost:3001/affiliates/profiles",
    description: "",
    source_traffic: "",
  },
  {
    id: 77,
    rdate: "2023-01-27T10:19:46.000Z",
    valid: 1,
    affiliate_id: 500,
    name: "sasa",
    url: "http://localhost:3001/affiliates/profiles",
    description: "",
    source_traffic: "",
  },
  {
    id: 78,
    rdate: "2023-01-27T10:20:09.000Z",
    valid: 1,
    affiliate_id: 500,
    name: "sasa",
    url: "http://localhost:3001/affiliates/profiles",
    description: "",
    source_traffic: "",
  },
  {
    id: 79,
    rdate: "2023-01-27T10:28:48.000Z",
    valid: 1,
    affiliate_id: 500,
    name: "dsad",
    url: "http://localhost:3001/affiliates/profiles",
    description: "",
    source_traffic: "",
  },
  {
    id: 80,
    rdate: "2023-01-27T10:28:52.000Z",
    valid: 1,
    affiliate_id: 500,
    name: "dsad",
    url: "http://localhost:3001/affiliates/profiles",
    description: "",
    source_traffic: "",
  },
  {
    id: 81,
    rdate: "2023-01-27T10:29:00.000Z",
    valid: 1,
    affiliate_id: 500,
    name: "dsad",
    url: "http://localhost:3001/affiliates/profiles",
    description: "",
    source_traffic: "",
  },
  {
    id: 82,
    rdate: "2023-01-27T10:29:56.000Z",
    valid: 0,
    affiliate_id: 500,
    name: "dsad",
    url: "http://localhost:3001/affiliates/profiles",
    description: "",
    source_traffic: "",
  },
  {
    id: 83,
    rdate: "2023-01-27T10:30:07.000Z",
    valid: 0,
    affiliate_id: 500,
    name: "dsad",
    url: "http://localhost:3001/affiliates/profiles",
    description: "",
    source_traffic: "",
  },
  {
    id: 84,
    rdate: "2023-01-27T10:30:11.000Z",
    valid: 1,
    affiliate_id: 500,
    name: "dsad",
    url: "http://localhost:3001/affiliates/profiles",
    description: "",
    source_traffic: "",
  },
  {
    id: 85,
    rdate: "2023-01-27T10:30:33.000Z",
    valid: 0,
    affiliate_id: 500,
    name: "asdsd",
    url: "http://localhost:3001/affiliates/profiles",
    description: "",
    source_traffic: "",
  },
  {
    id: 86,
    rdate: "2023-01-27T10:32:00.000Z",
    valid: 0,
    affiliate_id: 500,
    name: "asdsd",
    url: "http://localhost:3001/affiliates/profiles",
    description: "",
    source_traffic: "",
  },
  {
    id: 87,
    rdate: "2023-01-27T10:32:27.000Z",
    valid: 1,
    affiliate_id: 500,
    name: "ddd87",
    url: "http://localhost:3001/affiliates/profiles",
    description: "",
    source_traffic: "",
  },
  {
    id: 98,
    rdate: "2023-03-22T15:42:54.000Z",
    valid: 1,
    affiliate_id: 500,
    name: "Flash",
    url: "https://facebook.com",
    description: "Deathfalsh",
    source_traffic: "It is difficult",
  },
  {
    id: 115,
    rdate: "2023-03-22T20:40:13.000Z",
    valid: 1,
    affiliate_id: 500,
    name: "new34",
    url: "http://localhost:3001/affiliates/profiles",
    description: "desc",
    source_traffic: "gaga",
  },
  {
    id: 116,
    rdate: "2023-03-22T20:41:54.000Z",
    valid: 1,
    affiliate_id: 500,
    name: "new34",
    url: "http://localhost:3001/affiliates/profiles",
    description: "desc",
    source_traffic: "gaga",
  },
  {
    id: 117,
    rdate: "2023-03-22T20:46:17.000Z",
    valid: 1,
    affiliate_id: 500,
    name: "new34",
    url: "http://localhost:3001/affiliates/profiles",
    description: "desc",
    source_traffic: "gaga",
  },
  {
    id: 118,
    rdate: "2023-03-22T20:51:20.000Z",
    valid: 1,
    affiliate_id: 500,
    name: "new34",
    url: "http://localhost:3001/affiliates/profiles",
    description: "desc",
    source_traffic: "gaga",
  },
  {
    id: 119,
    rdate: "2023-03-22T20:51:52.000Z",
    valid: 1,
    affiliate_id: 500,
    name: "new34",
    url: "http://localhost:3001/affiliates/profiles",
    description: "desc",
    source_traffic: "gaga",
  },
  {
    id: 120,
    rdate: "2023-03-22T20:56:37.000Z",
    valid: 1,
    affiliate_id: 500,
    name: "new34",
    url: "http://localhost:3001/affiliates/profiles",
    description: "desc",
    source_traffic: "gaga",
  },
  {
    id: 121,
    rdate: "2023-03-22T20:57:26.000Z",
    valid: 1,
    affiliate_id: 500,
    name: "new34",
    url: "http://localhost:3001/affiliates/profiles",
    description: "desc",
    source_traffic: "gaga",
  },
  {
    id: 122,
    rdate: "2023-03-22T20:59:29.000Z",
    valid: 1,
    affiliate_id: 500,
    name: "sadsa",
    url: "http://localhost:3001/affiliates/profiles",
    description: "desc",
    source_traffic: "gaga",
  },
  {
    id: 123,
    rdate: "2023-03-22T21:00:48.000Z",
    valid: 1,
    affiliate_id: 500,
    name: "sajdal;s",
    url: "http://localhost:3001/affiliates/profiles",
    description: "fsdfds",
    source_traffic: "dfsd",
  },
  {
    id: 124,
    rdate: "2023-03-22T21:05:09.000Z",
    valid: 1,
    affiliate_id: 500,
    name: "sajdal;s",
    url: "http://localhost:3001/affiliates/profiles",
    description: "fsdfds",
    source_traffic: "dfsd",
  },
  {
    id: 125,
    rdate: "2023-03-22T21:05:16.000Z",
    valid: 1,
    affiliate_id: 500,
    name: "sajdal;s",
    url: "http://localhost:3001/affiliates/profiles",
    description: "fsdfds",
    source_traffic: "dfsd",
  },
  {
    id: 126,
    rdate: "2023-03-22T21:08:21.000Z",
    valid: 1,
    affiliate_id: 500,
    name: "sajdal;s",
    url: "http://localhost:3001/affiliates/profiles",
    description: "fsdfds",
    source_traffic: "dfsd",
  },
  {
    id: 127,
    rdate: "2023-03-22T21:09:39.000Z",
    valid: 1,
    affiliate_id: 500,
    name: "sajdal;s",
    url: "http://localhost:3001/affiliates/profiles",
    description: "fsdfds",
    source_traffic: "dfsd",
  },
  {
    id: 128,
    rdate: "2023-03-22T21:10:17.000Z",
    valid: 1,
    affiliate_id: 500,
    name: "sajdal;s",
    url: "http://localhost:3001/affiliates/profiles",
    description: "fsdfds",
    source_traffic: "dfsd",
  },
  {
    id: 129,
    rdate: "2023-03-22T21:12:19.000Z",
    valid: 1,
    affiliate_id: 500,
    name: "sajdal;s",
    url: "http://localhost:3001/affiliates/profiles",
    description: "fsdfds",
    source_traffic: "dfsd",
  },
  {
    id: 130,
    rdate: "2023-03-22T21:21:14.000Z",
    valid: 1,
    affiliate_id: 500,
    name: "sajdal;s",
    url: "http://localhost:3001/affiliates/profiles",
    description: "fsdfds",
    source_traffic: "dfsd",
  },
  {
    id: 131,
    rdate: "2023-03-22T21:24:00.000Z",
    valid: 1,
    affiliate_id: 500,
    name: "sajdal;s",
    url: "http://localhost:3001/affiliates/profiles",
    description: "fsdfds",
    source_traffic: "dfsd11",
  },
  {
    id: 132,
    rdate: "2023-03-22T21:24:13.000Z",
    valid: 1,
    affiliate_id: 500,
    name: "sajdal;s",
    url: "http://localhost:3001/affiliates/profiles",
    description: "fsdfds",
    source_traffic: "dfsd12",
  },
  {
    id: 138,
    rdate: "2023-03-23T06:08:56.000Z",
    valid: 1,
    affiliate_id: 500,
    name: "ok100",
    url: "http://localhost:3001/affiliates/profiles",
    description: "http://localhost:3001/affiliates/profiles",
    source_traffic: "http://localhost:3001/affiliates/profiles",
  },
];

export const creativeSampleData: any = [
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

const columnHelper = createColumnHelper<AffiliateProfileType>();

const createColumn = (id: keyof AffiliateProfileType, header: string) =>
  columnHelper.accessor(id, {
    cell: (info) => info.getValue(),
    header,
  });

export const profileColumns = [
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
          onClick={() => {
            console.log(`muly:Action`, {});
          }}
        >
          <EditIcon className="mr-2 h-4 w-4" />
          Edit
        </Button>
      );
    },
    header: "Action",
  }),
];
