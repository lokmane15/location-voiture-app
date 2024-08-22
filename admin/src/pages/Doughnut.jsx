import { useQuery } from "@tanstack/react-query";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut as DoughnutChart } from "react-chartjs-2";
import { getCarsNotDisponible, getDisponibleCars } from "../api/Cars";

// Register the components
ChartJS.register(ArcElement, Tooltip, Legend);

export default function Doughnut() {
  const { data: carDispo, isLoading: isLoadingDispo } = useQuery({
    queryKey: ["disponibleCars"],
    queryFn: getDisponibleCars,
  });
  const { data: carNotDispo, isLoading: isLoadingNotDispo } = useQuery({
    queryKey: ["notDisponibleCars"],
    queryFn: getCarsNotDisponible,
  });

  if (isLoadingDispo || isLoadingNotDispo) {
    return "Loading...";
  }

  const data = {
    labels: ["Available Cars", "Not Available Cars"],
    datasets: [
      {
        label: "# of Cars",
        data: [carDispo.length, carNotDispo.length],
        backgroundColor: ["rgba(75, 192, 192, 0.2)", "rgba(255, 99, 132, 0.2)"],
        borderColor: ["rgba(75, 192, 192, 1)", "rgba(255, 99, 132, 1)"],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            return `${tooltipItem.label}: ${tooltipItem.raw}`;
          },
        },
      },
    },
  };

  return <DoughnutChart data={data} options={options} />;
}
