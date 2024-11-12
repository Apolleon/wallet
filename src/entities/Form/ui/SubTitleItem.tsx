import React, { FC } from "react";

interface SubTitleItemProps {
  subtitle: string | number;
}

const SubTitleItem: FC<SubTitleItemProps> = ({ subtitle }) => {
  return <h6>{subtitle}</h6>;
};

export default SubTitleItem;
