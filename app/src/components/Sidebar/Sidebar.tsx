import {
  navigationData,
  type NavigationLinkData,
} from "@/components/Sidebar/navigation-data";
import { cn } from "@/lib/utils";
import React from "react";
import DropdownLink from "../common/menubar/DropdownLink";
import SingleLink from "../common/menubar/SingleLink";

interface Props {
  collapseShow: boolean;
  setCollapseShow: React.Dispatch<React.SetStateAction<boolean>>;
  navbarRef: React.RefObject<HTMLDivElement>;
}

const renderLink = (
  item: NavigationLinkData,
  index: number,
  setActiveName: React.Dispatch<React.SetStateAction<string>>,
  setDropdown: React.Dispatch<React.SetStateAction<string>>,
  activeName: string,
  dropdown: string,
  collapseShow: boolean,
  setCollapseShow: React.Dispatch<React.SetStateAction<boolean>>
) => {
  if (item.type === "single") {
    return (
      <li key={index}>
        <SingleLink
          setactiveName={setActiveName}
          setdropdown={setDropdown}
          setCollapseShow={setCollapseShow}
          activeName={activeName}
          collapseShow={collapseShow}
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
  setCollapseShow,
  navbarRef,
}) => {
  const [activeName, setActiveName] = React.useState("dashboard");
  const [dropdown, setDropdown] = React.useState("");

  const sidebarRef = React.useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: { target: any }) => {
    if (
      sidebarRef.current &&
      !sidebarRef.current.contains(event.target) &&
      navbarRef.current &&
      !navbarRef.current.contains(event.target)
    ) {
      setCollapseShow(false);
    }
  };

  React.useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const sidebarClassName = cn(
    collapseShow ? "w-64 rounded-tr-[50px] md:rounded-none" : "w-0 md:w-32",
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
              collapseShow,
              setCollapseShow
            )
          )}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
