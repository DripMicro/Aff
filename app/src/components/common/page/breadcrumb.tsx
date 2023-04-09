import { Home } from "lucide-react";
import React from "react";

interface Props {
  title: string;
}

export const Breadcrumb = ({ title }: Props) => {
  return (
    <div className="flex items-center px-4 text-base font-medium">
      <Home />
      &nbsp;/&nbsp;{title}
    </div>
  );
};
