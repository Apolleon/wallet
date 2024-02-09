import React, { ReactNode, memo } from "react";
import TopNavigation from "../TopNavigation/TopNavigation.tsx";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="container main-div">
      <TopNavigation />
      {children}
    </div>
  );
};

export default memo(Layout);
