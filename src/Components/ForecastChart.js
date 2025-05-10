// import React from "react";
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

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const ForecastChart = ({ forecast }) => {
  // Filter forecast to get one data point per day (assuming forecast is in 3-hour intervals)
  // For a 5-day forecast, we can pick every 8th item (8 intervals * 3 hours = 24 hours)
  const dailyForecast = forecast.filter((_, index) => index % 8 === 0);

  const data = {
    labels: dailyForecast.map((item) => new Date(item.dt_txt).toLocaleDateString()),
    datasets: [
      {
        label: "Temperature (°C)",
        data: dailyForecast.map((item) => item.main.temp),
        borderColor: "#007bff",
        backgroundColor: "rgba(0, 123, 255, 0.5)",
        tension: 0.4,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "5-Day Temperature Forecast",
      },
    },
  };

  return <Line data={data} options={options} />;
};

export default ForecastChart;
