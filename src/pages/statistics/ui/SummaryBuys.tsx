import React, { memo } from "react";
import SubTitleItem from "../../../entities/Form/ui/SubTitleItem.tsx";
import SummaryItemList from "./SummaryItemList.tsx";
import { getSummary } from "../../../shared/statisticsPage/getSummary.ts";
import styles from "./Statistics.module.css";
import { useSelector } from "react-redux";
import { State } from "../../../shared/types/types.ts";
import { getStatisticValues } from "../../../shared/statisticsPage/getStatisticValues.js";

const SummaryBuys = () => {
  const { purchases, collections } = useSelector((state: State) => state);
  const statisticsData = getStatisticValues(collections, purchases);

  return (
    <div className={styles.summary}>
      <div className={styles.column}>
        <SubTitleItem subtitle="период" />
        <SubTitleItem subtitle="за текущий месяц" />
        <SubTitleItem subtitle="за всё время" />
      </div>
      <SummaryItemList />
      <div className={styles.column}>
        <SubTitleItem subtitle="всего" />
        <SubTitleItem subtitle={getSummary(statisticsData, "monthPrice")} />
        <SubTitleItem subtitle={getSummary(statisticsData, "totalPrice")} />
      </div>
    </div>
  );
};

export default memo(SummaryBuys);
