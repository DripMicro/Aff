import { Breadcrumb } from "@/components/common/page/breadcrumb";
import React from "react";

interface Props {
  title: string;
  children?: React.ReactNode;
}

export const PageHeader = ({ children, title }: Props) => {
  return (
    <div className="my-3 flex flex-row items-center justify-between">
      <Breadcrumb title={title} />
      <div className="flex flex-row gap-2 px-4">{children}</div>
    </div>
  );
};
