import { useQuery } from "@tanstack/react-query";
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
import { Line } from "react-chartjs-2";
import { fetchReservation } from "../api/Cars";

// Register the components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function Graph() {
  const { data: reservationData, isLoading } = useQuery({
    queryKey: ["reservation"],
    queryFn: fetchReservation,
  });

  if (isLoading) {
    return <div>Loading...</div>; // Handle loading state
  }

  // Process the reservation data to count reservations per month
  const reservationCounts = reservationData.reduce((acc, reservation) => {
    const month = new Date(reservation.date_debut).toLocaleString("default", {
      month: "long",
    });
    acc[month] = (acc[month] || 0) + 1;
    return acc;
  }, {});

  const labels = Object.keys(reservationCounts); // Labels are months
  const dataPoints = Object.values(reservationCounts); // Data points are counts of reservations

  const data = {
    labels: labels,
    datasets: [
      {
        axis: "y",
        label: "Number of Reservations per Month",
        data: dataPoints,
        fill: false,
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 2,
      },
    ],
  };

  const options = {
    indexAxis: "x", // Switches the months to the Y-axis
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return <Line data={data} options={options} />;
}
