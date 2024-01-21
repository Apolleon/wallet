import React, { FC } from "react";
import SummaryBuys from "./SummaryBuys.tsx";
import { createMonthData } from "../helpers/statisticsPage/createMonthData";
import { useSelector } from "react-redux";
import { State } from "../../types";
import styles from "./Statistics.module.css";
import { getStatisticValues } from "../helpers/statisticsPage/getStatisticValues.js";
import VerticalBar from "../Diagrams.tsx";

const showDiagram = () => {};

const calculateMonthValue = ({ count, month }) => {
  return (
    <div
      onClick={() => console.log()}
      className={styles.statistic_item}
      key={month}
    >
      <span>{month}</span>
      <span>{count}</span>
    </div>
  );
};

const dataForBar = (data: any) => {
  const result: Array<{ collection: string; totalPrice: number }> = [];
  for (let collection in data) {
    result.push({
      collection: collection,
      totalPrice: data[collection].totalPrice,
    });
  }
  return result;
};

const Statistics: FC = () => {
  const purchases = useSelector((state: State) => state.purchases);
  const statisticsData = useSelector((state: State) => state.statisticsData);

  return (
    <div className="container">
      <SummaryBuys />
      {createMonthData(purchases).map((month) => calculateMonthValue(month))}
      <VerticalBar item={dataForBar(statisticsData)} />
    </div>
  );
};
export default Statistics;
