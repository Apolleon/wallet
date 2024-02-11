import React, { FC, memo, useEffect, useState } from "react";
import SummaryBuys from "./SummaryBuys.tsx";
import { createMonthData } from "../helpers/statisticsPage/createMonthData";
import { useDispatch, useSelector } from "react-redux";
import { ReduxActions, State } from "../../types/types.ts";
import styles from "./Statistics.module.css";
import VerticalBar from "../Diagrams.tsx";
import Layout from "../Layout/Layout.tsx";

const Statistics: FC = () => {
  const purchases = useSelector((state: State) => state.purchases);
  //const statisticsData = useSelector((state: State) => state.statisticsData);
  const [statisticsData, setStatisticsData] = useState();
  const dispatch = useDispatch();

  const calculateMonthValue = ({ count, month }, index: number) => {
    return (
      <div
        onClick={() =>
          dispatch({ type: ReduxActions.SetStatisticMonth, payload: index })
        }
        className={styles.statistic_item}
        key={month}
      >
        <span>{month}</span>
        <span>{count}</span>
      </div>
    );
  };

  useEffect(() => {
    window.electronAPI.getAllStatistics();
    window.electronAPI.handleStatistics((event, stats) => {
      setStatisticsData(stats);
    });
  }, []);

  return (
    <Layout>
      <SummaryBuys />
      {createMonthData(purchases).map((month, index) =>
        calculateMonthValue(month, index)
      )}
      <VerticalBar />
    </Layout>
  );
};
export default memo(Statistics);
