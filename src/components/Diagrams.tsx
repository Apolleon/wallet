import React, { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { useDispatch, useSelector } from "react-redux";
import { State } from "../types/types";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

type stat = {
  collection: string;
  monthPrice: number;
};

const dataForBar = (data: any) => {
  const result: Array<{ collection: string; monthPrice: number }> = [];
  for (let collection in data) {
    result.push({
      collection: collection,
      monthPrice: data[collection].monthPrice,
    });
  }
  return result;
};

const VerticalBar = () => {
  const statisticMonth = useSelector((state: State) => state.statisticMonth);
  const [statistics, setStatistics] = useState([]);

  useEffect(() => {
    window.electronAPI.getMonthStatistics(statisticMonth);
    window.electronAPI.handleMonthStatistics((event, statistics) => {
      const data = dataForBar(statistics);
      setStatistics(data);
    });
  }, [statisticMonth]);

  const data = {
    labels: statistics.map((i) => i.collection),
    datasets: [
      {
        label: "Потрачено",
        data: statistics.map((i) => i.monthPrice),
        backgroundColor: statistics.map(() => "rgba(250, 250, 250, 0.8)"),
        borderColor: statistics.map(() => "rgba(255, 255, 255, 1)"),
        borderWidth: 0,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Chart.js Bar Chart",
        color: "white",
      },
    },
  };

  return (
    <div style={{ marginTop: "40px" }}>
      <Bar data={data} options={options} />
    </div>
  );
};

export default VerticalBar;
