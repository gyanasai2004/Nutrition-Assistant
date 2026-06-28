import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

import { Doughnut } from "react-chartjs-2";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend
);

function CaloriesChart({ consumed, goal }) {
  const remaining = Math.max(goal - consumed, 0);

  const data = {
    labels: ["Consumed", "Remaining"],
    datasets: [
      {
        data: [consumed, remaining],
        backgroundColor: [
          "#4CAF50",
          "#E0E0E0",
        ],
      },
    ],
  };

  return (
    <div className="card shadow mt-4">
      <div className="card-body text-center">

        <h3>🔥 Calories Progress</h3>

        <div
          style={{
            width: "320px",
            margin: "20px auto",
          }}
        >
          <Doughnut data={data} />
        </div>

        <h5 className="mt-3">
          {consumed} / {goal} kcal
        </h5>

      </div>
    </div>
  );
}

export default CaloriesChart;