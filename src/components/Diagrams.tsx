import React from "react";
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
  totalPrice: number;
};

const VerticalBar = ({ item }: { item?: stat[] }) => {
  const data = {
    labels: item?.map((i) => i.collection),
    datasets: [
      {
        label: "Потрачено",
        data: item?.map((i) => i.totalPrice),
        backgroundColor: item?.map(() => "rgba(250, 250, 250, 0.8)"),
        borderColor: item?.map(() => "rgba(255, 255, 255, 1)"),
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
