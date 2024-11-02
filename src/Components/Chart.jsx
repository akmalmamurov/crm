import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  // Title,
  // Tooltip,
  // Legend
);
const Chart = () => {
  const options = {
    responsive: true
  };
  const data = {
    labels: [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ],
    datasets: [
      {
        label: "line",
        data: [3000, 4000, 2000, 2500, 7000, 8000, 5000],
        borderColor: "rgba(75,192,192)",
      },
    ],
  };
  return (
    <>
      
        <Line options={options} data={data} className="pl-[20px] w-full"/>
      
    </>
  );
};
export default Chart;
