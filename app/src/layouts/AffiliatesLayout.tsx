import type { PropsWithChildren } from "react";
import React from "react";
// components

import AffiliatesNavbar from "../components/common/navbars/AffiliatesNavbar";
import Sidebar from "../components/Sidebar/Sidebar";
// import HeaderStats from "components/Headers/HeaderStats.js";
// import FooterAdmin from "components/Footers/FooterAdmin.js";

const AffiliatesLayout = ({ children }: PropsWithChildren) => {
  const [collapseShow, setCollapseShow] = React.useState(false);
  return (
    <>
      <div
        className={
          (collapseShow ? "md:ml-64 " : "md:ml-32 ") +
          "relative bg-blueGray-100 transition-all duration-300 z-10 sidebar"
        }
      >
        <Sidebar collapseShow={collapseShow} />
        <AffiliatesNavbar
          collapseShow={collapseShow}
          setCollapseShow={setCollapseShow}
        />
        <div className="px-4 md:px-10 pt-16 md:pt-20 mx-auto w-full bg-[#F5F8FA]">
          {children}
          {/* <FooterAdmin /> */}
        </div>
      </div>
    </>
  );
};

export default AffiliatesLayout;
