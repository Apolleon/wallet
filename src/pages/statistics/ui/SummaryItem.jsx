import React, { memo } from "react";
import SubTitleItem from "entities/Form/ui/SubTitleItem";

const SummaryItem = ({ item, name }) => {
  return (
    <div className="column secondary">
      <SubTitleItem subtitle={name} />
      <SubTitleItem subtitle={item.monthPrice} />
      <SubTitleItem subtitle={item.totalPrice} />
    </div>
  );
};

export default memo(SummaryItem);
