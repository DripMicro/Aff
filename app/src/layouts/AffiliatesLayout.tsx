import type { PropsWithChildren } from "react";
import React, { useState } from "react";
// components

import AffiliatesNavbar from "../components/affiliates/layout/AffiliatesNavbar";
import Sidebar from "../components/affiliates/layout/Sidebar";
import { cn } from "@/lib/utils";
import { useMediaQuery } from "usehooks-ts";
import { isSSR } from "@/utils/nextjs-utils";
// import HeaderStats from "components/Headers/HeaderStats.js";
// import FooterAdmin from "components/Footers/FooterAdmin.js";

const AffiliatesLayout = ({ children }: PropsWithChildren) => {
  const desktop = useMediaQuery("(min-width: 768px)");
  const [collapseShow, setCollapseShow] = React.useState(false);
  const [tempCollapseShow, setTempCollapseShow] =
    useState<boolean>(collapseShow);

  const handleChangeCollapseShow = () => {
    if (desktop) {
      setCollapseShow(!collapseShow);
    }
    setTempCollapseShow(!collapseShow);
  };

  const maybeSetTempCollapseShow = (value: boolean) => {
    console.log(`muly:maybeSetTempCollapseShow`, {
      collapseShow,
      tempCollapseShow,
    });
    if (!collapseShow && tempCollapseShow !== value) {
      setTempCollapseShow(!tempCollapseShow);
    }
  };

  return (
    <>
      <div
        className={cn([
          { "md:ml-64": tempCollapseShow, "md:ml-14": !tempCollapseShow },
          "bg-blueGray-100 sidebar relative z-10 transition-all duration-300",
        ])}
      >
        <Sidebar
          collapseShow={collapseShow}
          tempCollapseShow={tempCollapseShow}
          setTempCollapseShow={maybeSetTempCollapseShow}
        />
        <AffiliatesNavbar
          collapseShow={tempCollapseShow}
          setCollapseShow={handleChangeCollapseShow}
        />
        <div className="mx-auto min-h-screen w-full bg-[#F5F8FA] px-4 pt-16 pb-4 md:px-10 md:pt-20">
          {children}
        </div>
      </div>
    </>
  );
};

export default AffiliatesLayout;
