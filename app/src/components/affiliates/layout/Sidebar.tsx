import {
  navigationData,
  type NavigationLinkData,
} from "@/components/affiliates/layout/navigation-data";
import { cn } from "@/lib/utils";
import React, { useState } from "react";
import DropdownLink from "./DropdownLink";
import SingleLink from "./SingleLink";
import { useOnClickOutside } from "usehooks-ts";

interface Props {
  collapseShow: boolean;
  tempCollapseShow: boolean;
  setTempCollapseShow: (value: boolean) => void;
}

const renderLink = (
  item: NavigationLinkData,
  index: number,
  setActiveName: React.Dispatch<React.SetStateAction<string>>,
  setDropdown: React.Dispatch<React.SetStateAction<string>>,
  activeName: string,
  dropdown: string,
  collapseShow: boolean,
  setCollapseShow: (value: boolean) => void
) => {
  if (item.type === "single") {
    return (
      <li key={index}>
        <SingleLink
          setactiveName={setActiveName}
          setdropdown={setDropdown}
          activeName={activeName}
          collapseShow={collapseShow}
          setCollapseShow={setCollapseShow}
          link={item.link}
          linkName={item.linkName}
        />
      </li>
    );
  } else if (item.type === "dropdown") {
    return (
      <li key={index}>
        <DropdownLink
          setactiveName={setActiveName}
          setCollapseShow={setCollapseShow}
          setdropdown={setDropdown}
          dropdown={dropdown}
          activeName={activeName}
          collapseShow={collapseShow}
          linkName={item.links}
          defaultLink={item.defaultLink}
          dropdownName={item.dropdownName}
          navbarName={item.linkName}
          parentLink={item.parentLink || ""}
        />
      </li>
    );
  }
};

const Sidebar: React.FC<Props> = ({
  collapseShow,
  tempCollapseShow,
  setTempCollapseShow,
}) => {
  const [activeName, setActiveName] = React.useState("dashboard");
  const [dropdown, setDropdown] = React.useState("");
  const sidebarRef = React.useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: { target: any }) => {
    if (!collapseShow && tempCollapseShow) {
      setTempCollapseShow(false);
    }
  };

  useOnClickOutside(sidebarRef, handleClickOutside);

  const sidebarClassName = cn(
    tempCollapseShow ? "w-64 rounded-tr-[50px] md:rounded-none" : "w-0 md:w-14",
    "sidebar fixed top-16 left-0 z-10 flex h-full flex-col bg-white text-white transition-all duration-300 dark:bg-gray-900 md:top-20"
  );

  return (
    <div className={sidebarClassName} ref={sidebarRef}>
      <div className="flex flex-grow flex-col justify-between overflow-y-auto overflow-x-hidden">
        <ul className="relative min-h-full space-y-1 overflow-y-auto py-5 md:py-16">
          {navigationData.map((item, index) =>
            renderLink(
              item,
              index,
              setActiveName,
              setDropdown,
              activeName,
              dropdown,
              tempCollapseShow,
              setTempCollapseShow
            )
          )}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
