import type { PropsWithChildren } from "react";
import React from "react";
// components

import AffiliatesNavbar from "../components/common/navbars/AffiliatesNavbar";
import Sidebar from "../components/Sidebar/Sidebar";
// import HeaderStats from "components/Headers/HeaderStats.js";
// import FooterAdmin from "components/Footers/FooterAdmin.js";

const AffiliatesLayout = ({ children }: PropsWithChildren) => {
  const [collapseShow, setCollapseShow] = React.useState(true);
  return (
    <>
      <div
        className={
          (collapseShow ? "md:ml-64 " : "md:ml-32 ") +
          "bg-blueGray-100 sidebar relative z-10 transition-all duration-300"
        }
      >
        <Sidebar collapseShow={collapseShow} />
        <AffiliatesNavbar
          collapseShow={collapseShow}
          setCollapseShow={setCollapseShow}
        />
        <div className="mx-auto min-h-screen w-full bg-[#F5F8FA] px-4 pt-16 pb-4 md:px-10 md:pt-20">
          {children}
        </div>
      </div>
    </>
  );
};

export default AffiliatesLayout;
