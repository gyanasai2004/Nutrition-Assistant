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

function WeeklyChart({ weeklyData }) {
  const data = {
    labels: weeklyData.map((item) => item.day),
    datasets: [
      {
        label: "Calories",
        data: weeklyData.map((item) => item.calories),
        backgroundColor: "#22c55e",
        borderRadius: 8,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
    },
    scales:{
        y:{
            beginAtZero:true,
            max:3000,
        }
    }
  };

  return (
    <div className="card p-4 shadow-sm border-0">
      <h3 className="mb-3">📊 Weekly Calories</h3>
      <Bar data={data} options={options} />
    </div>
  );
}

export default WeeklyChart;