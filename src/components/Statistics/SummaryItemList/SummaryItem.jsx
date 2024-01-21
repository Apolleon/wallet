import React from "react";
import SubTitleItem from "../SubTitleItem.tsx";

const SummaryItem = ({ item, name }) => {
  return (
    <div className="column secondary">
      <SubTitleItem subtitle={name} />
      <SubTitleItem subtitle={item.monthPrice} />
      <SubTitleItem subtitle={item.totalPrice} />
    </div>
  );
};

export default SummaryItem;
