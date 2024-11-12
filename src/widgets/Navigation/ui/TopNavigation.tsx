import React, { ReactNode } from "react";
import Link from "entities/Link/ui/Link.tsx";

const TopNavigation = (): ReactNode => {
  return (
    <div className="w-full flex">
      <Link path="/" text="Главная" />
      <Link path="/settings" text="Менеджер" />
      <Link path="/stats" text="Статистика" />
    </div>
  );
};

export default TopNavigation;
