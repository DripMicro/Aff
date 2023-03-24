import type { PropsWithChildren } from "react";
import React from "react";

const NoLayout = ({ children }: PropsWithChildren) => {
  return <>{children}</>;
};

export default NoLayout;
