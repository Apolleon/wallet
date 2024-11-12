import React, { FC, memo, useState } from "react";
import SummaryBuys from "./ui/SummaryBuys.tsx";
import { createMonthData } from "../../shared/statisticsPage/createMonthData.js";
import { useDispatch, useSelector } from "react-redux";
import { ReduxActions, State } from "../../shared/types/types.ts";
import styles from "./ui/Statistics.module.css";
import VerticalBar from "./ui/VerticalBar.tsx";
import Layout from "../../widgets/Layout/ui/Layout.tsx";
import { setMonthData } from "shared/lib/slices/statisticsSlice.ts";

const Statistics: FC = () => {
  const purchases = useSelector((state: State) => state.purchases);
  const dispatch = useDispatch();
  const [showDiagram, setShowDiagram] = useState<boolean>(false);

  const calculateMonthValue = ({ count, month }: { count: number; month: number }, index: number) => {
    return (
      <div
        onClick={() => {
          dispatch(setMonthData({ payload: index }));
          setShowDiagram(true);
        }}
        className={styles.statistic_item}
        key={month}
      >
        <span>{month}</span>
        <span>{count}</span>
      </div>
    );
  };

  return (
    <>
      <SummaryBuys />
      {createMonthData(purchases).map((month, index) => calculateMonthValue(month, index))}
      {showDiagram && <VerticalBar displaiingChange={setShowDiagram} />}
    </>
  );
};
export default memo(Statistics);
