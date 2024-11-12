import React, { memo } from "react";
import TopNavigation from "../../Navigation/ui/TopNavigation.tsx";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="layout">
      <div className="container">
        <div className="mb-12">
          <TopNavigation />
        </div>
        <Outlet />
      </div>
    </div>
  );
};

export default memo(Layout);
