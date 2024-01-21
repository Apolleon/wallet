import React, { memo, ReactNode } from "react";

interface SubTitleItemProps {
  subtitle: string;
}

const SubTitleItem = memo(function SubTitleItem<SubTitleItemProps>({
  subtitle,
}): ReactNode {
  return <h6>{subtitle}</h6>;
});

export default SubTitleItem;
