import React, { FC } from "react";
import SummaryItem from "./SummaryItem";
import { useSelector } from "react-redux";
import { State } from "../../../types";
import { getStatisticValues } from "../../helpers/statisticsPage/getStatisticValues";

const SummaryItemList: FC = () => {
  const { purchases, collections } = useSelector((state: State) => state);
  const statisticsData = getStatisticValues(collections, purchases);

  return (
    <div className={"auto-div"}>
      {Object.keys(statisticsData).map((purchase) => (
        <SummaryItem
          key={purchase}
          name={purchase}
          item={statisticsData[purchase]}
        />
      ))}
    </div>
  );
};

export default SummaryItemList;
