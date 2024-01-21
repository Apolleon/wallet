import React, { ReactNode } from "react";
import Link from "./Link/Link.tsx";

const TopNavigation = (): ReactNode => {
  return (
    <div style={{ display: "flex" }}>
      <Link path="/" text="Главная" />
      <Link path="/manager" text="Менеджер" />
      <Link path="/stats" text="Статистика" />
    </div>
  );
};

export default TopNavigation;
