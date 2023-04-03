import React from "react";
import { FakeTraderReports } from "@/components/affiliates/reports/FakeTraderReports";

const meta = {
  component: FakeTraderReports,
};

export default meta;

export const FakeTraderReportsComponent = {
  render: () => <FakeTraderReports />,
  name: "FakeTraderReports",
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/CHxJV6V2o7WVj1rsYmRRWe/Affiliate_client_Design?node-id=35-1312&t=iaMez9Khkj5AeV4D-4",
    },
  },
};
