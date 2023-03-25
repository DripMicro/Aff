import AuthenticationFooterComponent from "@/components/common/footer/AuthenticationFooter";
import Sidebar from "@/components/Sidebar/Sidebar";
import AffiliatesNavbar from "@/components/common/navbars/AffiliatesNavbar";
import React, { useState } from "react";

const meta = {
  component: AuthenticationFooterComponent,
};

export default meta;

export const AuthenticationFooter = {
  render: () => <AuthenticationFooterComponent />,
};

export const SidebarOpen = {
  render: () => <Sidebar collapseShow />,
};

export const SidebarCollapse = {
  render: () => <Sidebar collapseShow={false} />,
};

const NavbarTest = (props: any) => {
  const [collapseShow, setCollapseShow] = useState<boolean>(props.open);
  return (
    <AffiliatesNavbar
      collapseShow={collapseShow}
      setCollapseShow={setCollapseShow}
    />
  );
};

export const NavbarOpen = {
  render: () => <NavbarTest open={true} />,
};

export const NavbarCollapse = {
  render: () => <NavbarTest open={false} />,
};
