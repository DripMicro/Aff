import { Breadcrumb } from "@/components/common/page/breadcrumb";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/common/page/page-header";
import React from "react";

const meta = {
  component: Breadcrumb,
};

export const BreadcrumbTest = {
  render: () => <Breadcrumb title="Sample Page Title" />,
};

export const PageHeaderTest = {
  render: () => (
    <PageHeader title="Profile">
      <Button variant="primary">Sample Button</Button>
    </PageHeader>
  ),
};

export const PageHeaderWithSearch = {
  render: () => (
    <PageHeader title="Profile">
      <Button variant="primary">Sample Button</Button>
    </PageHeader>
  ),
};

export default meta;
